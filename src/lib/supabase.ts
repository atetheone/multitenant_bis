import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: number;
          username: string;
          email: string;
          first_name: string;
          last_name: string;
          password: string;
          status: 'active' | 'inactive' | 'suspended' | 'pending';
          last_login_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          username: string;
          email: string;
          first_name: string;
          last_name: string;
          password: string;
          status?: 'active' | 'inactive' | 'suspended' | 'pending';
          last_login_at?: string | null;
        };
        Update: {
          username?: string;
          email?: string;
          first_name?: string;
          last_name?: string;
          password?: string;
          status?: 'active' | 'inactive' | 'suspended' | 'pending';
          last_login_at?: string | null;
        };
      };
      user_profiles: {
        Row: {
          id: number;
          user_id: number;
          bio: string | null;
          phone: string | null;
          avatar_url: string | null;
          website: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: number;
          bio?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          website?: string | null;
        };
        Update: {
          bio?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          website?: string | null;
        };
      };
      tenants: {
        Row: {
          id: number;
          slug: string;
          name: string;
          domain: string;
          description: string | null;
          status: 'active' | 'inactive' | 'suspended' | 'pending';
          rating: number;
          logo: string | null;
          cover_image: string | null;
          product_count: number;
          is_featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          slug: string;
          name: string;
          domain: string;
          description?: string | null;
          status?: 'active' | 'inactive' | 'suspended' | 'pending';
          rating?: number;
          logo?: string | null;
          cover_image?: string | null;
          is_featured?: boolean;
        };
        Update: {
          slug?: string;
          name?: string;
          domain?: string;
          description?: string | null;
          status?: 'active' | 'inactive' | 'suspended' | 'pending';
          rating?: number;
          logo?: string | null;
          cover_image?: string | null;
          is_featured?: boolean;
        };
      };
      products: {
        Row: {
          id: number;
          name: string;
          description: string | null;
          price: number;
          sku: string;
          is_active: boolean;
          tenant_id: number;
          is_marketplace_visible: boolean;
          marketplace_priority: number;
          average_rating: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          description?: string | null;
          price: number;
          sku: string;
          tenant_id: number;
          is_active?: boolean;
          is_marketplace_visible?: boolean;
          marketplace_priority?: number;
          average_rating?: number;
        };
        Update: {
          name?: string;
          description?: string | null;
          price?: number;
          sku?: string;
          is_active?: boolean;
          is_marketplace_visible?: boolean;
          marketplace_priority?: number;
          average_rating?: number;
        };
      };
      orders: {
        Row: {
          id: number;
          user_id: number | null;
          tenant_id: number;
          payment_method: string | null;
          subtotal: number;
          delivery_fee: number;
          total: number;
          address_id: number | null;
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id?: number | null;
          tenant_id: number;
          payment_method?: string | null;
          subtotal: number;
          delivery_fee: number;
          total: number;
          address_id?: number | null;
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
        };
        Update: {
          payment_method?: string | null;
          subtotal?: number;
          delivery_fee?: number;
          total?: number;
          address_id?: number | null;
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      permission_scope: 'all' | 'tenant' | 'own' | 'dept';
    };
  };
}