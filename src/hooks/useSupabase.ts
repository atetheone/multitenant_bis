import { useState, useEffect } from 'react';
import { mockAuthService } from '../lib/mockAuth';

interface UseSupabaseQueryOptions {
  enabled?: boolean;
  dependencies?: any[];
}

export function useSupabaseQuery<T>(
  queryFn: () => Promise<T | null>,
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
      
      const data = await queryFn();
      
      setData(data);
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
  mutationFn: (params: P) => Promise<T | null>
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (params: P): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await mutationFn(params);
      
      return data;
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
  return useSupabaseQuery(() => mockAuthService.getProducts(filters), { dependencies: [JSON.stringify(filters)] });
}

export function useProduct(id: number) {
  return useSupabaseQuery(() => mockAuthService.getProduct(id), { dependencies: [id] });
}

export function useTenants(filters?: { is_featured?: boolean; status?: string }) {
  return useSupabaseQuery(() => mockAuthService.getTenants(filters), { dependencies: [JSON.stringify(filters)] });
}

export function useOrders(filters?: { user_id?: number; tenant_id?: number; status?: string }) {
  return useSupabaseQuery(() => Promise.resolve([]), { dependencies: [JSON.stringify(filters)] });
}

export function useCreateOrder() {
  return useSupabaseMutation((orderData: any) => Promise.resolve({ id: Date.now(), ...orderData }));
}