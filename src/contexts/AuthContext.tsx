import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { authService, UserProfile, LoginCredentials, RegisterData } from '../lib/auth';

interface AuthContextType {
  user: SupabaseUser | null;
  userProfile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  signIn: (credentials: LoginCredentials) => Promise<void>;
  signUp: (userData: RegisterData) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  // Legacy support for existing components
  currentUser?: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
    phone?: string;
    tenantId?: string;
    isActive: boolean;
    createdAt: string;
    lastLoginAt?: string;
  } | null;
  logout: () => Promise<void>;
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
      const profile = await authService.getUserProfile(email);
      if (profile) {
        setUserProfile(profile);
      } else {
        console.warn(`User profile not found for ${email}. User may need to complete setup in custom database tables.`);
        setUserProfile(null);
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      setUserProfile(null);
    }
  };

  const signIn = async (credentials: LoginCredentials) => {
    setLoading(true);
    try {
      await authService.signIn(credentials);
    } catch (error: any) {
      throw new Error(error.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (userData: RegisterData) => {
    setLoading(true);
    try {
      await authService.signUp(userData);
    } catch (error: any) {
      throw new Error(error.message || 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await authService.signOut();
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!userProfile) return;

    try {
      await authService.updateProfile(userProfile.id, updates);
      // Refresh user profile
      await fetchUserProfile(userProfile.email);
    } catch (error: any) {
      throw new Error(error.message || 'Erreur lors de la mise à jour du profil');
    }
  };

  // Legacy support for existing components
  const currentUser = userProfile ? {
    id: userProfile.id.toString(),
    name: `${userProfile.first_name} ${userProfile.last_name}`,
    email: userProfile.email,
    role: userProfile.roles?.[0]?.role?.name || 'customer',
    avatar: userProfile.profile?.avatar_url || undefined,
    phone: userProfile.profile?.phone || undefined,
    tenantId: userProfile.tenants?.[0]?.tenant?.id?.toString(),
    isActive: userProfile.status === 'active',
    createdAt: new Date().toISOString(),
    lastLoginAt: undefined
  } : null;

  const logout = signOut; // Alias for legacy support

  const value = {
    user,
    userProfile,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    currentUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};