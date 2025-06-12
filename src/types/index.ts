export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin' | 'super-admin' | 'manager' | 'delivery';
  avatar?: string;
  phone?: string;
  address?: Address;
  tenantId?: string; // Pour les utilisateurs liés à un tenant spécifique
  isActive: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

export interface Tenant {
  id: string;
  name: string;
  description: string;
  logo: string;
  type: 'marketplace' | 'seller'; // Type de tenant
  ownerId?: string; // Propriétaire du tenant (pour les vendeurs)
  createdAt: string;
  rating?: number; // Seulement pour les vendeurs
  isActive: boolean;
  deliveryZones: string[];
  settings: TenantSettings;
  isDefault?: boolean; // Pour identifier le tenant marketplace (tenant 0)
}

export interface TenantSettings {
  allowCustomManagers: boolean;
  maxManagers: number;
  autoAssignDeliveries: boolean;
  requireOrderConfirmation: boolean;
  commissionRate?: number; // Taux de commission pour le marketplace
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  tenantId: string;
  tenantName: string;
  stock: number;
  rating: number;
  createdAt: string;
  isActive: boolean;
  createdBy: string; // ID de l'utilisateur qui a créé le produit
}

export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

export interface Order {
  id: string;
  userId: string;
  tenantId: string;
  items: CartItem[];
  status: 'pending' | 'confirmed' | 'preparing' | 'ready_for_delivery' | 'assigned_to_delivery' | 'in_transit' | 'delivered' | 'canceled';
  total: number;
  createdAt: string;
  shippingAddress: Address;
  deliveryZone: DeliveryZone;
  deliveryFee: number;
  estimatedDeliveryTime: string;
  assignedDeliveryUser?: string; // ID du livreur assigné
  deliveryNotes?: string;
  processedBy?: string; // ID de l'utilisateur qui a traité la commande
  marketplaceCommission?: number; // Commission du marketplace
}

export interface Address {
  street: string;
  city: string;
  region: string;
  zipCode: string;
  country: string;
}

export interface DeliveryZone {
  id: string;
  name: string;
  region: string;
  cities: string[];
  deliveryFee: number;
  estimatedDeliveryTime: string;
  isActive: boolean;
  tenantId?: string; // Zones spécifiques à un tenant
}

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  totalCustomers: number;
  pendingOrders: number;
  monthlyGrowth: number;
  assignedDeliveries?: number; // Pour les livreurs
  completedDeliveries?: number; // Pour les livreurs
  totalTenants?: number; // Pour le super-admin
  totalCommissions?: number; // Pour le marketplace
}

export interface DeliveryAssignment {
  id: string;
  orderId: string;
  deliveryUserId: string;
  zoneId: string;
  assignedAt: string;
  status: 'assigned' | 'picked_up' | 'in_transit' | 'delivered' | 'failed';
  notes?: string;
  completedAt?: string;
}