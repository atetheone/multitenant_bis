import { Role, Permission } from '../types/permissions';

export const systemRoles: Role[] = [
  {
    id: 'super-admin',
    name: 'Super Administrateur',
    description: 'Accès complet au système, gestion du marketplace et création de tenants',
    isSystemRole: true,
    permissions: [
      'create_tenant',
      'edit_tenant',
      'delete_tenant',
      'view_all_tenants',
      'create_user',
      'edit_user',
      'delete_user',
      'view_all_users',
      'assign_roles',
      'view_orders',
      'edit_order_status',
      'cancel_order',
      'process_refund',
      'view_deliveries',
      'assign_delivery',
      'update_delivery_status',
      'manage_delivery_zones',
      'view_customers',
      'edit_customer',
      'view_customer_orders',
      'view_analytics',
      'view_financial_reports',
      'export_data',
      'manage_settings',
      'manage_payment_methods',
      'manage_delivery_settings',
      'view_marketplace_analytics',
      'manage_commissions',
      'moderate_content'
    ]
  },
  {
    id: 'admin',
    name: 'Administrateur',
    description: 'Gestion complète d\'un tenant spécifique ou du marketplace',
    isSystemRole: true,
    permissions: [
      'create_user',
      'edit_user',
      'view_all_users',
      'assign_roles',
      'create_product',
      'edit_product',
      'delete_product',
      'view_products',
      'manage_inventory',
      'view_orders',
      'edit_order_status',
      'cancel_order',
      'process_refund',
      'view_deliveries',
      'assign_delivery',
      'update_delivery_status',
      'view_customers',
      'edit_customer',
      'view_customer_orders',
      'view_analytics',
      'view_financial_reports',
      'export_data',
      'manage_settings'
    ]
  },
  {
    id: 'manager',
    name: 'Gestionnaire',
    description: 'Représentant du tenant avec permissions personnalisables',
    isSystemRole: true,
    permissions: [
      'view_products',
      'view_orders',
      'view_customers',
      'view_analytics'
    ]
  },
  {
    id: 'delivery',
    name: 'Livreur',
    description: 'Gestion des livraisons et zones assignées',
    isSystemRole: true,
    permissions: [
      'view_deliveries',
      'update_delivery_status',
      'view_customers'
    ]
  },
  {
    id: 'customer',
    name: 'Client',
    description: 'Accès client standard',
    isSystemRole: true,
    permissions: []
  }
];

export const getPermissionsForRole = (roleId: string): Permission[] => {
  const role = systemRoles.find(r => r.id === roleId);
  return role ? role.permissions : [];
};

export const hasPermission = (userPermissions: Permission[], requiredPermission: Permission): boolean => {
  return userPermissions.includes(requiredPermission);
};

export const hasAnyPermission = (userPermissions: Permission[], requiredPermissions: Permission[]): boolean => {
  return requiredPermissions.some(permission => userPermissions.includes(permission));
};

export const hasAllPermissions = (userPermissions: Permission[], requiredPermissions: Permission[]): boolean => {
  return requiredPermissions.every(permission => userPermissions.includes(permission));
};