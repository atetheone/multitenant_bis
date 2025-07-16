import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { mockAuthService } from '../lib/mockAuth';

// Use mock auth instead of real Supabase
const USE_MOCK_AUTH = true;

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

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  username: string;
  account_type?: 'customer';
}

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
    if (USE_MOCK_AUTH) {
      // Initialize mock auth
      mockAuthService.initializeSession();
      checkMockSession();
    } else {
      // Original Supabase auth code
      initializeSupabaseAuth();
    }
  }, []);

  const checkMockSession = async () => {
    try {
      const currentUser = await mockAuthService.getCurrentUser();
      if (currentUser) {
        // Create mock session
        const mockSession = {
          access_token: `mock-token-${currentUser.id}`,
          user: {
            id: currentUser.id,
            email: currentUser.email,
            user_metadata: {
              first_name: currentUser.first_name,
              last_name: currentUser.last_name
            }
          }
        } as any;
        
        setSession(mockSession);
        setUser(mockSession.user);
        await fetchUserProfile(currentUser.email);
      }
    } catch (error) {
      console.error('Error checking mock session:', error);
    } finally {
      setLoading(false);
    }
  };

  const initializeSupabaseAuth = async () => {
    const { supabase } = await import('../lib/supabase');
    const { authService } = await import('../lib/auth');
    
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
  };

  const fetchUserProfile = async (email: string) => {
    try {
      const profile = await mockAuthService.getUserProfile(email);
      if (profile) {
        setUserProfile(profile);
      } else {
        console.warn(`User profile not found for ${email}`);
        setUserProfile(null);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUserProfile(null);
    }
  };

  const signIn = async (credentials: LoginCredentials) => {
    setLoading(true);
    try {
      const result = await mockAuthService.signIn(credentials.email, credentials.password);
      
      // Set session and user
      setSession(result.session as any);
      setUser(result.user as any);
      
      // Fetch profile
      await fetchUserProfile(credentials.email);
    } catch (error: any) {
      throw new Error(error.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (userData: RegisterData) => {
    setLoading(true);
    try {
      await mockAuthService.signUp(userData);
    } catch (error: any) {
      throw new Error(error.message || 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await mockAuthService.signOut();
    setUser(null);
    setUserProfile(null);
    setSession(null);
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    // Mock implementation - in real app this would update the backend
    console.log('Profile update:', updates);
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