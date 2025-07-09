import { mockApiCalls } from '../data/mockDatabase';
import { ApiResponse } from '../types/database';

// Service pour simuler les appels API
class ApiService {
  private baseUrl = '/api'; // URL de base pour les vraies API
  private useMockData = true; // Flag pour utiliser les données mockées

  // Méthode générique pour les appels API
  private async makeRequest<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    if (this.useMockData) {
      // Simuler un délai réseau
      await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 700));
      
      // Router vers les bonnes données mockées
      return this.routeMockRequest<T>(endpoint, options);
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`,
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  private routeMockRequest<T>(endpoint: string, options?: RequestInit): ApiResponse<T> {
    const method = options?.method || 'GET';
    const [, resource, id] = endpoint.split('/');

    switch (resource) {
      case 'users':
        if (method === 'GET' && id) {
          return mockApiCalls.getUserById(parseInt(id));
        }
        return mockApiCalls.getUsers();

      case 'tenants':
        if (method === 'GET' && id) {
          return mockApiCalls.getTenantById(parseInt(id));
        }
        return mockApiCalls.getTenants();

      case 'products':
        if (method === 'GET' && id) {
          return mockApiCalls.getProductById(parseInt(id));
        }
        return mockApiCalls.getProducts();

      case 'categories':
        return mockApiCalls.getCategories();

      case 'inventory':
        return mockApiCalls.getInventory();

      case 'delivery-zones':
        return mockApiCalls.getDeliveryZones();

      case 'roles':
        return mockApiCalls.getRoles();

      default:
        return {
          success: false,
          message: 'Endpoint not found',
          errors: [{ message: 'Endpoint not implemented' }]
        };
    }
  }

  private getAuthToken(): string {
    return localStorage.getItem('authToken') || '';
  }

  // Méthodes publiques pour les différentes ressources

  // Users
  async getUsers() {
    return this.makeRequest('/users');
  }

  async getUserById(id: number) {
    return this.makeRequest(`/users/${id}`);
  }

  async getUserProfile(userId: number) {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockApiCalls.getUserProfile(userId);
    }
    return this.makeRequest(`/users/${userId}/profile`);
  }

  async createUser(userData: any) {
    return this.makeRequest('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(id: number, userData: any) {
    return this.makeRequest(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id: number) {
    return this.makeRequest(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  // Tenants
  async getTenants() {
    return this.makeRequest('/tenants');
  }

  async getTenantById(id: number) {
    return this.makeRequest(`/tenants/${id}`);
  }

  async createTenant(tenantData: any) {
    return this.makeRequest('/tenants', {
      method: 'POST',
      body: JSON.stringify(tenantData),
    });
  }

  async updateTenant(id: number, tenantData: any) {
    return this.makeRequest(`/tenants/${id}`, {
      method: 'PUT',
      body: JSON.stringify(tenantData),
    });
  }

  async deleteTenant(id: number) {
    return this.makeRequest(`/tenants/${id}`, {
      method: 'DELETE',
    });
  }

  // Products
  async getProducts(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.makeRequest(`/products${queryString}`);
  }

  async getProductById(id: number) {
    return this.makeRequest(`/products/${id}`);
  }

  async getProductsByTenant(tenantId: number) {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockApiCalls.getProductsByTenant(tenantId);
    }
    return this.makeRequest(`/tenants/${tenantId}/products`);
  }

  async createProduct(productData: any) {
    return this.makeRequest('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(id: number, productData: any) {
    return this.makeRequest(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }

  async deleteProduct(id: number) {
    return this.makeRequest(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Categories
  async getCategories() {
    return this.makeRequest('/categories');
  }

  async getCategoriesByTenant(tenantId: number) {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockApiCalls.getCategoriesByTenant(tenantId);
    }
    return this.makeRequest(`/tenants/${tenantId}/categories`);
  }

  // Orders
  async getOrders(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.makeRequest(`/orders${queryString}`);
  }

  async getOrderById(id: number) {
    return this.makeRequest(`/orders/${id}`);
  }

  async createOrder(orderData: any) {
    return this.makeRequest('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async updateOrderStatus(id: number, status: string) {
    return this.makeRequest(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // Inventory
  async getInventory() {
    return this.makeRequest('/inventory');
  }

  async getInventoryByProduct(productId: number) {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockApiCalls.getInventoryByProduct(productId);
    }
    return this.makeRequest(`/products/${productId}/inventory`);
  }

  async updateInventory(productId: number, inventoryData: any) {
    return this.makeRequest(`/products/${productId}/inventory`, {
      method: 'PUT',
      body: JSON.stringify(inventoryData),
    });
  }

  // Delivery Zones
  async getDeliveryZones() {
    return this.makeRequest('/delivery-zones');
  }

  async getDeliveryZonesByTenant(tenantId: number) {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockApiCalls.getDeliveryZonesByTenant(tenantId);
    }
    return this.makeRequest(`/tenants/${tenantId}/delivery-zones`);
  }

  // Authentication
  async login(credentials: { email: string; password: string }) {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simuler la logique de connexion
      const { mockUsers, mockUserProfiles, mockUserRoles, mockRoles, mockUserTenants, mockTenants } = await import('../data/mockDatabase');
      
      const user = mockUsers.find(u => u.email.toLowerCase() === credentials.email.toLowerCase());
      if (!user) {
        return {
          success: false,
          message: 'Utilisateur non trouvé',
          errors: [{ message: 'Email ou mot de passe incorrect' }]
        };
      }

      const profile = mockUserProfiles.find(p => p.user_id === user.id);
      const userRoles = mockUserRoles.filter(ur => ur.user_id === user.id);
      const roles = userRoles.map(ur => mockRoles.find(r => r.id === ur.role_id)?.name).filter(Boolean);
      const userTenants = mockUserTenants.filter(ut => ut.user_id === user.id);
      const tenants = userTenants.map(ut => mockTenants.find(t => t.id === ut.tenant_id)).filter(Boolean);

      const authUser = {
        id: user.id,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        role: roles[0] || 'customer',
        avatar: profile?.avatar_url,
        phone: profile?.phone,
        tenantId: tenants[0]?.id?.toString(),
        isActive: user.status === 'active',
        createdAt: user.created_at,
        lastLoginAt: user.last_login_at
      };

      return {
        success: true,
        data: {
          user: authUser,
          token: 'mock-jwt-token',
          expiresIn: 3600
        }
      };
    }

    return this.makeRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: any) {
    return this.makeRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    return this.makeRequest('/auth/logout', {
      method: 'POST',
    });
  }

  // Méthode pour basculer entre mock et vraies données
  setUseMockData(useMock: boolean) {
    this.useMockData = useMock;
  }
}

export const apiService = new ApiService();
export default apiService;