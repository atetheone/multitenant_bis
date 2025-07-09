import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import { ApiResponse } from '../types/database';

interface UseApiOptions {
  immediate?: boolean;
  dependencies?: any[];
}

export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  options: UseApiOptions = {}
) {
  const { immediate = true, dependencies = [] } = options;
  
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiCall();
      
      if (response.success) {
        setData(response.data || null);
      } else {
        setError(response.message || 'Une erreur est survenue');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, dependencies);

  return {
    data,
    loading,
    error,
    execute,
    refetch: execute
  };
}

// Hooks spécialisés pour les différentes ressources
export function useUsers() {
  return useApi(() => apiService.getUsers());
}

export function useUser(id: number) {
  return useApi(() => apiService.getUserById(id), {
    dependencies: [id]
  });
}

export function useTenants() {
  return useApi(() => apiService.getTenants());
}

export function useTenant(id: number) {
  return useApi(() => apiService.getTenantById(id), {
    dependencies: [id]
  });
}

export function useProducts(params?: any) {
  return useApi(() => apiService.getProducts(params), {
    dependencies: [JSON.stringify(params)]
  });
}

export function useProduct(id: number) {
  return useApi(() => apiService.getProductById(id), {
    dependencies: [id]
  });
}

export function useProductsByTenant(tenantId: number) {
  return useApi(() => apiService.getProductsByTenant(tenantId), {
    dependencies: [tenantId]
  });
}

export function useCategories() {
  return useApi(() => apiService.getCategories());
}

export function useCategoriesByTenant(tenantId: number) {
  return useApi(() => apiService.getCategoriesByTenant(tenantId), {
    dependencies: [tenantId]
  });
}

export function useInventory() {
  return useApi(() => apiService.getInventory());
}

export function useInventoryByProduct(productId: number) {
  return useApi(() => apiService.getInventoryByProduct(productId), {
    dependencies: [productId]
  });
}

export function useDeliveryZones() {
  return useApi(() => apiService.getDeliveryZones());
}

export function useDeliveryZonesByTenant(tenantId: number) {
  return useApi(() => apiService.getDeliveryZonesByTenant(tenantId), {
    dependencies: [tenantId]
  });
}

// Hook pour les mutations (CREATE, UPDATE, DELETE)
export function useMutation<T, P = any>(
  mutationFn: (params: P) => Promise<ApiResponse<T>>
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (params: P): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await mutationFn(params);
      
      if (response.success) {
        return response.data || null;
      } else {
        setError(response.message || 'Une erreur est survenue');
        return null;
      }
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

// Hooks de mutation spécialisés
export function useCreateUser() {
  return useMutation((userData: any) => apiService.createUser(userData));
}

export function useUpdateUser() {
  return useMutation(({ id, userData }: { id: number; userData: any }) => 
    apiService.updateUser(id, userData)
  );
}

export function useDeleteUser() {
  return useMutation((id: number) => apiService.deleteUser(id));
}

export function useCreateTenant() {
  return useMutation((tenantData: any) => apiService.createTenant(tenantData));
}

export function useUpdateTenant() {
  return useMutation(({ id, tenantData }: { id: number; tenantData: any }) => 
    apiService.updateTenant(id, tenantData)
  );
}

export function useDeleteTenant() {
  return useMutation((id: number) => apiService.deleteTenant(id));
}

export function useCreateProduct() {
  return useMutation((productData: any) => apiService.createProduct(productData));
}

export function useUpdateProduct() {
  return useMutation(({ id, productData }: { id: number; productData: any }) => 
    apiService.updateProduct(id, productData)
  );
}

export function useDeleteProduct() {
  return useMutation((id: number) => apiService.deleteProduct(id));
}