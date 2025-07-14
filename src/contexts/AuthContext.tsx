import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface UserProfile {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  profile?: {
    bio: string | null;
    phone: string | null;
    avatar_url: string | null;
    website: string | null;
  };
  roles?: Array<{
    role: {
      name: string;
    };
  }>;
  tenants?: Array<{
    tenant: {
      id: number;
      name: string;
      slug: string;
    };
  }>;
}

interface AuthContextType {
  user: SupabaseUser | null;
  userProfile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: {
    first_name: string;
    last_name: string;
    username: string;
  }) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.email!);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await fetchUserProfile(session.user.email!);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (email: string) => {
    try {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select(`
          *,
          user_profiles!inner(bio, phone, avatar_url, website),
          user_roles!inner(
            roles!inner(name)
          ),
          user_tenants!inner(
            tenants!inner(id, name, slug)
          )
        `)
        .eq('email', email)
        .single();

      if (userError) {
        console.error('Error fetching user profile:', userError);
        return;
      }

      if (userData) {
        setUserProfile({
          id: userData.id,
          username: userData.username,
          email: userData.email,
          first_name: userData.first_name,
          last_name: userData.last_name,
          status: userData.status,
          profile: userData.user_profiles?.[0] || null,
          roles: userData.user_roles || [],
          tenants: userData.user_tenants || []
        });
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
    } catch (error: any) {
      throw new Error(error.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData: {
    first_name: string;
    last_name: string;
    username: string;
  }) => {
    setLoading(true);
    try {
      // First create the auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // Create user record in our users table
        const { error: userError } = await supabase
          .from('users')
          .insert({
            email,
            username: userData.username,
            first_name: userData.first_name,
            last_name: userData.last_name,
            password: '', // We don't store the actual password
            status: 'active'
          });

        if (userError) throw userError;

        // Get the created user to create profile
        const { data: createdUser } = await supabase
          .from('users')
          .select('id')
          .eq('email', email)
          .single();

        if (createdUser) {
          // Create user profile
          const { error: profileError } = await supabase
            .from('user_profiles')
            .insert({
              user_id: createdUser.id,
              bio: null,
              phone: null,
              avatar_url: null,
              website: null
            });

          if (profileError) throw profileError;

          // Assign default customer role
          const { data: customerRole } = await supabase
            .from('roles')
            .select('id')
            .eq('name', 'customer')
            .single();

          if (customerRole) {
            await supabase
              .from('user_roles')
              .insert({
                user_id: createdUser.id,
                role_id: customerRole.id
              });
          }

          // Assign to default tenant (marketplace)
          const { data: defaultTenant } = await supabase
            .from('tenants')
            .select('id')
            .eq('slug', 'jeffel-marketplace')
            .single();

          if (defaultTenant) {
            await supabase
              .from('user_tenants')
              .insert({
                user_id: createdUser.id,
                tenant_id: defaultTenant.id
              });
          }
        }
      }
    } catch (error: any) {
      throw new Error(error.message || 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!userProfile) return;

    try {
      // Update user table
      if (updates.first_name || updates.last_name || updates.username) {
        const { error: userError } = await supabase
          .from('users')
          .update({
            first_name: updates.first_name,
            last_name: updates.last_name,
            username: updates.username,
          })
          .eq('id', userProfile.id);

        if (userError) throw userError;
      }

      // Update profile table
      if (updates.profile) {
        const { error: profileError } = await supabase
          .from('user_profiles')
          .update(updates.profile)
          .eq('user_id', userProfile.id);

        if (profileError) throw profileError;
      }

      // Refresh user profile
      await fetchUserProfile(userProfile.email);
    } catch (error: any) {
      throw new Error(error.message || 'Erreur lors de la mise à jour du profil');
    }
  };

  const value = {
    user,
    userProfile,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};