import { supabase } from './supabase';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  username: string;
  account_type?: 'customer' | 'seller';
  business_name?: string;
  business_description?: string;
}

export interface UserProfile {
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

export const authService = {
  async signIn(credentials: LoginCredentials) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) throw error;
    return data;
  },

  async signUp(userData: RegisterData) {
    // First create the auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
    });

    if (authError) throw authError;

    if (authData.user) {
      // Create user record in our users table
      const { error: userError } = await supabase
        .from('users')
        .insert({
          email: userData.email,
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
        .eq('email', userData.email)
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

        // If seller, create tenant
        if (userData.account_type === 'seller' && userData.business_name) {
          const slug = userData.business_name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

          const { data: newTenant, error: tenantError } = await supabase
            .from('tenants')
            .insert({
              slug: slug,
              name: userData.business_name,
              domain: `${slug}.jeffel.com`,
              description: userData.business_description || '',
              status: 'pending',
              rating: 0,
              product_count: 0,
              is_featured: false
            })
            .select()
            .single();

          if (!tenantError && newTenant) {
            // Assign seller as admin of their tenant
            const { data: adminRole } = await supabase
              .from('roles')
              .select('id')
              .eq('name', 'admin')
              .single();

            if (adminRole) {
              await supabase
                .from('user_roles')
                .insert({
                  user_id: createdUser.id,
                  role_id: adminRole.id
                });
            }

            // Associate seller with their tenant
            await supabase
              .from('user_tenants')
              .insert({
                user_id: createdUser.id,
                tenant_id: newTenant.id
              });
          }
        }
      }
    }

    return authData;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  async getUserProfile(email: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
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

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    if (data) {
      return {
        id: data.id,
        username: data.username,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        status: data.status,
        profile: data.user_profiles?.[0] || null,
        roles: data.user_roles || [],
        tenants: data.user_tenants || []
      };
    }

    return null;
  },

  async updateProfile(userId: number, updates: Partial<UserProfile>) {
    // Update user table
    if (updates.first_name || updates.last_name || updates.username) {
      const { error: userError } = await supabase
        .from('users')
        .update({
          first_name: updates.first_name,
          last_name: updates.last_name,
          username: updates.username,
        })
        .eq('id', userId);

      if (userError) throw userError;
    }

    // Update profile table
    if (updates.profile) {
      const { error: profileError } = await supabase
        .from('user_profiles')
        .update(updates.profile)
        .eq('user_id', userId);

      if (profileError) throw profileError;
    }
  }
};