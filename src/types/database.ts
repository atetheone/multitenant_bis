// Types basés sur la structure de base de données PostgreSQL
export interface DatabaseUser {
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
}

export interface DatabaseUserProfile {
  id: number;
  user_id: number;
  bio?: string;
  phone?: string;
  avatar_url?: string;
  website?: string;
  created_at: string;
  updated_at: string;
}

export interface DatabaseTenant {
  id: number;
  slug: string;
  name: string;
  domain: string;
  description?: string;
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  rating: number;
  logo?: string;
  cover_image?: string;
  product_count: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface DatabaseProduct {
  id: number;
  name: string;
  description?: string;
  price: number;
  sku: string;
  is_active: boolean;
  tenant_id: number;
  created_at: string;
  updated_at: string;
  is_marketplace_visible: boolean;
  marketplace_priority: number;
  average_rating: number;
}

export interface DatabaseProductImage {
  id: number;
  url: string;
  filename: string;
  alt_text?: string;
  is_cover: boolean;
  display_order: number;
  product_id: number;
  created_at: string;
  updated_at: string;
}

export interface DatabaseCategory {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  parent_id?: number;
  tenant_id: number;
  created_at: string;
  updated_at: string;
}

export interface DatabaseInventory {
  id: number;
  product_id: number;
  tenant_id: number;
  quantity: number;
  reorder_point: number;
  reorder_quantity: number;
  low_stock_threshold: number;
  reserved_quantity: number;
  created_at: string;
  updated_at: string;
}

export interface DatabaseOrder {
  id: number;
  user_id?: number;
  tenant_id: number;
  payment_method?: string;
  subtotal: number;
  delivery_fee: number;
  total: number;
  address_id?: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface DatabaseOrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  created_at: string;
  updated_at: string;
}

export interface DatabaseAddress {
  id: number;
  type: 'shipping' | 'billing';
  address_line1: string;
  address_line2?: string;
  city: string;
  state?: string;
  country: string;
  postal_code?: string;
  phone?: string;
  is_default: boolean;
  tenant_id: number;
  zone_id?: number;
  created_at: string;
  updated_at: string;
}

export interface DatabaseDeliveryZone {
  id: number;
  tenant_id: number;
  name?: string;
  fee: number;
  created_at: string;
  updated_at: string;
}

export interface DatabaseDeliveryPerson {
  id: number;
  user_id: number;
  tenant_id: number;
  is_active: boolean;
  is_available: boolean;
  last_active_at?: string;
  last_delivery_at?: string;
  vehicle_type: 'motorcycle' | 'bicycle' | 'car' | 'van';
  vehicle_plate_number: string;
  vehicle_model?: string;
  vehicle_year?: number;
  license_number: string;
  license_expiry: string;
  license_type?: string;
  total_deliveries?: number;
  completed_deliveries: number;
  returned_deliveries: number;
  average_delivery_time?: number;
  rating?: number;
  total_reviews: number;
  notes?: string;
  created_at: string;
  updated_at: string;
  verified_at?: string;
}

export interface DatabaseDelivery {
  id: number;
  order_id: number;
  delivery_person_id: number;
  notes?: string;
  assigned_at?: string;
  picked_at?: string;
  delivered_at?: string;
  created_at: string;
  updated_at: string;
}

export interface DatabaseRole {
  id: number;
  name: string;
  tenant_id?: number;
  created_at: string;
  updated_at: string;
}

export interface DatabasePermission {
  id: number;
  resource: string;
  action: string;
  tenant_id?: number;
  resource_id?: number;
  scope: 'all' | 'tenant' | 'own' | 'dept';
  created_at: string;
  updated_at: string;
}

export interface DatabaseUserRole {
  id: number;
  user_id: number;
  role_id: number;
  created_at: string;
  updated_at: string;
}

export interface DatabaseUserTenant {
  id: number;
  user_id: number;
  tenant_id: number;
  created_at: string;
  updated_at: string;
}

export interface DatabaseCart {
  id: number;
  user_id: number;
  tenant_id: number;
  status: 'active' | 'ordered' | 'archived';
  created_at: string;
  updated_at: string;
}

export interface DatabaseCartItem {
  id: number;
  cart_id: number;
  tenant_id: number;
  product_id: number;
  quantity: number;
  created_at: string;
  updated_at: string;
}

export interface DatabasePayment {
  id: number;
  order_id: number;
  payment_method: string;
  status: 'pending' | 'success' | 'failed' | 'refunded';
  transaction_id?: string;
  amount: number;
  created_at: string;
  updated_at: string;
}

export interface DatabaseNotification {
  id: number;
  type: string;
  title: string;
  message: string;
  data?: any;
  user_id?: number;
  tenant_id?: number;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  meta?: PaginationMeta;
  errors?: ApiError[];
}

export interface PaginationMeta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
}

export interface ApiError {
  field?: string;
  message: string;
  code?: string;
}