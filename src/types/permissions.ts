export type Permission = 
  // Gestion des tenants
  | 'create_tenant'
  | 'edit_tenant'
  | 'delete_tenant'
  | 'view_all_tenants'
  
  // Gestion des utilisateurs
  | 'create_user'
  | 'edit_user'
  | 'delete_user'
  | 'view_all_users'
  | 'assign_roles'
  
  // Gestion des produits
  | 'create_product'
  | 'edit_product'
  | 'delete_product'
  | 'view_products'
  | 'manage_inventory'
  
  // Gestion des commandes
  | 'view_orders'
  | 'edit_order_status'
  | 'cancel_order'
  | 'process_refund'
  
  // Gestion des livraisons
  | 'view_deliveries'
  | 'assign_delivery'
  | 'update_delivery_status'
  | 'manage_delivery_zones'
  
  // Gestion des clients
  | 'view_customers'
  | 'edit_customer'
  | 'view_customer_orders'
  
  // Statistiques et rapports
  | 'view_analytics'
  | 'view_financial_reports'
  | 'export_data'
  
  // Paramètres système
  | 'manage_settings'
  | 'manage_payment_methods'
  | 'manage_delivery_settings';

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  isSystemRole: boolean; // Les rôles système ne peuvent pas être supprimés
}

export interface UserRole {
  userId: string;
  roleId: string;
  tenantId?: string; // Pour les rôles spécifiques à un tenant
  assignedBy: string;
  assignedAt: string;
  customPermissions?: Permission[]; // Permissions supplémentaires spécifiques
}

export interface DeliveryZoneAssignment {
  deliveryUserId: string;
  zoneId: string;
  assignedAt: string;
  isActive: boolean;
}