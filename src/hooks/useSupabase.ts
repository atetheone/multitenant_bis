import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { PostgrestError } from '@supabase/supabase-js';

interface UseSupabaseQueryOptions {
  enabled?: boolean;
  dependencies?: any[];
}

export function useSupabaseQuery<T>(
  queryFn: () => Promise<{ data: T | null; error: PostgrestError | null }>,
  options: UseSupabaseQueryOptions = {}
) {
  const { enabled = true, dependencies = [] } = options;
  
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async () => {
    if (!enabled) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const result = await queryFn();
      
      if (result.error) {
        setError(result.error.message);
      } else {
        setData(result.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    execute();
  }, [enabled, ...dependencies]);

  return {
    data,
    loading,
    error,
    refetch: execute
  };
}

export function useSupabaseMutation<T, P = any>(
  mutationFn: (params: P) => Promise<{ data: T | null; error: PostgrestError | null }>
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (params: P): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await mutationFn(params);
      
      if (result.error) {
        setError(result.error.message);
        return null;
      }
      
      return result.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    mutate,
    loading,
    error
  };
}

// Specific hooks for common operations
export function useProducts(filters?: { tenant_id?: number; is_active?: boolean }) {
  return useSupabaseQuery(async () => {
    let query = supabase
      .from('products')
      .select(`
        *,
        product_images(url, alt_text, is_cover),
        tenants(name, slug),
        inventory(quantity)
      `)
      .eq('is_marketplace_visible', true);

    if (filters?.tenant_id) {
      query = query.eq('tenant_id', filters.tenant_id);
    }

    if (filters?.is_active !== undefined) {
      query = query.eq('is_active', filters.is_active);
    }

    return query.order('marketplace_priority', { ascending: false });
  }, {
    dependencies: [JSON.stringify(filters)]
  });
}

export function useProduct(id: number) {
  return useSupabaseQuery(async () => {
    return supabase
      .from('products')
      .select(`
        *,
        product_images(url, alt_text, is_cover, display_order),
        tenants(name, slug, rating),
        inventory(quantity, low_stock_threshold)
      `)
      .eq('id', id)
      .single();
  }, {
    dependencies: [id]
  });
}

export function useTenants(filters?: { is_featured?: boolean; status?: string }) {
  return useSupabaseQuery(async () => {
    let query = supabase
      .from('tenants')
      .select('*');

    if (filters?.is_featured !== undefined) {
      query = query.eq('is_featured', filters.is_featured);
    }

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    return query.order('created_at', { ascending: false });
  }, {
    dependencies: [JSON.stringify(filters)]
  });
}

export function useOrders(filters?: { user_id?: number; tenant_id?: number; status?: string }) {
  return useSupabaseQuery(async () => {
    let query = supabase
      .from('orders')
      .select(`
        *,
        order_items(
          quantity,
          unit_price,
          products(name, product_images(url))
        ),
        addresses(address_line1, city, country),
        tenants(name)
      `);

    if (filters?.user_id) {
      query = query.eq('user_id', filters.user_id);
    }

    if (filters?.tenant_id) {
      query = query.eq('tenant_id', filters.tenant_id);
    }

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    return query.order('created_at', { ascending: false });
  }, {
    dependencies: [JSON.stringify(filters)]
  });
}

export function useCreateOrder() {
  return useSupabaseMutation(async (orderData: {
    user_id?: number;
    tenant_id: number;
    subtotal: number;
    delivery_fee: number;
    total: number;
    payment_method?: string;
    items: Array<{
      product_id: number;
      quantity: number;
      unit_price: number;
    }>;
  }) => {
    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: orderData.user_id,
        tenant_id: orderData.tenant_id,
        subtotal: orderData.subtotal,
        delivery_fee: orderData.delivery_fee,
        total: orderData.total,
        payment_method: orderData.payment_method,
        status: 'pending'
      })
      .select()
      .single();

    if (orderError) return { data: null, error: orderError };

    // Create order items
    const orderItems = orderData.items.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.unit_price
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) return { data: null, error: itemsError };

    return { data: order, error: null };
  });
}