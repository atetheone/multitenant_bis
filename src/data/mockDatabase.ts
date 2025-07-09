import { 
  DatabaseUser, 
  DatabaseUserProfile, 
  DatabaseTenant, 
  DatabaseProduct, 
  DatabaseProductImage,
  DatabaseCategory,
  DatabaseInventory,
  DatabaseOrder,
  DatabaseOrderItem,
  DatabaseAddress,
  DatabaseDeliveryZone,
  DatabaseDeliveryPerson,
  DatabaseDelivery,
  DatabaseRole,
  DatabasePermission,
  DatabaseUserRole,
  DatabaseUserTenant,
  DatabaseCart,
  DatabaseCartItem,
  DatabasePayment,
  DatabaseNotification
} from '../types/database';

// Mock data basée sur la structure PostgreSQL
export const mockUsers: DatabaseUser[] = [
  {
    id: 1,
    username: 'jean.dupont',
    email: 'jean@exemple.com',
    first_name: 'Jean',
    last_name: 'Dupont',
    password: '$2b$10$hashedpassword',
    status: 'active',
    last_login_at: '2024-01-15T10:30:00Z',
    created_at: '2023-01-15T08:00:00Z',
    updated_at: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    username: 'marie.martin',
    email: 'marie@exemple.com',
    first_name: 'Marie',
    last_name: 'Martin',
    password: '$2b$10$hashedpassword',
    status: 'active',
    last_login_at: '2024-01-14T15:20:00Z',
    created_at: '2023-01-20T10:00:00Z',
    updated_at: '2024-01-14T15:20:00Z'
  },
  {
    id: 3,
    username: 'pierre.durand',
    email: 'pierre@exemple.com',
    first_name: 'Pierre',
    last_name: 'Durand',
    password: '$2b$10$hashedpassword',
    status: 'active',
    last_login_at: '2024-01-13T09:15:00Z',
    created_at: '2023-02-01T09:00:00Z',
    updated_at: '2024-01-13T09:15:00Z'
  },
  {
    id: 4,
    username: 'amadou.ba',
    email: 'amadou@exemple.com',
    first_name: 'Amadou',
    last_name: 'Ba',
    password: '$2b$10$hashedpassword',
    status: 'active',
    last_login_at: '2024-01-15T08:00:00Z',
    created_at: '2023-03-01T14:00:00Z',
    updated_at: '2024-01-15T08:00:00Z'
  },
  {
    id: 5,
    username: 'fatou.sall',
    email: 'fatou@exemple.com',
    first_name: 'Fatou',
    last_name: 'Sall',
    password: '$2b$10$hashedpassword',
    status: 'active',
    last_login_at: '2024-01-14T11:30:00Z',
    created_at: '2023-03-15T11:00:00Z',
    updated_at: '2024-01-14T11:30:00Z'
  },
  {
    id: 6,
    username: 'admin.jeffel',
    email: 'admin@jeffel.com',
    first_name: 'Super',
    last_name: 'Admin',
    password: '$2b$10$hashedpassword',
    status: 'active',
    last_login_at: '2024-01-15T12:00:00Z',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2024-01-15T12:00:00Z'
  },
  {
    id: 7,
    username: 'marketplace.admin',
    email: 'marketplace@jeffel.com',
    first_name: 'Admin',
    last_name: 'Marketplace',
    password: '$2b$10$hashedpassword',
    status: 'active',
    last_login_at: '2024-01-15T09:30:00Z',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2024-01-15T09:30:00Z'
  }
];

export const mockUserProfiles: DatabaseUserProfile[] = [
  {
    id: 1,
    user_id: 1,
    phone: '+221 77 123 45 67',
    avatar_url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    created_at: '2023-01-15T08:00:00Z',
    updated_at: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    user_id: 2,
    phone: '+221 77 234 56 78',
    avatar_url: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
    created_at: '2023-01-20T10:00:00Z',
    updated_at: '2024-01-14T15:20:00Z'
  },
  {
    id: 3,
    user_id: 3,
    phone: '+221 77 345 67 89',
    avatar_url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
    created_at: '2023-02-01T09:00:00Z',
    updated_at: '2024-01-13T09:15:00Z'
  },
  {
    id: 4,
    user_id: 4,
    phone: '+221 77 456 78 90',
    avatar_url: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
    created_at: '2023-03-01T14:00:00Z',
    updated_at: '2024-01-15T08:00:00Z'
  },
  {
    id: 5,
    user_id: 5,
    phone: '+221 77 567 89 01',
    avatar_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
    created_at: '2023-03-15T11:00:00Z',
    updated_at: '2024-01-14T11:30:00Z'
  },
  {
    id: 6,
    user_id: 6,
    phone: '+221 77 000 00 00',
    avatar_url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2024-01-15T12:00:00Z'
  },
  {
    id: 7,
    user_id: 7,
    phone: '+221 77 111 11 11',
    avatar_url: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2024-01-15T09:30:00Z'
  }
];

export const mockTenants: DatabaseTenant[] = [
  {
    id: 1,
    slug: 'jeffel-marketplace',
    name: 'JefJel Marketplace',
    domain: 'jeffel.com',
    description: 'Plateforme e-commerce multilocataire du Sénégal',
    status: 'active',
    rating: 4.8,
    logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
    product_count: 456,
    is_featured: true,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2024-01-15T12:00:00Z'
  },
  {
    id: 2,
    slug: 'tech-paradise',
    name: 'Tech Paradise',
    domain: 'tech-paradise.jeffel.com',
    description: 'Gadgets technologiques premium et accessoires pour tous vos besoins.',
    status: 'active',
    rating: 4.8,
    logo: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600',
    product_count: 156,
    is_featured: true,
    created_at: '2023-01-15T08:00:00Z',
    updated_at: '2024-01-14T15:20:00Z'
  },
  {
    id: 3,
    slug: 'eco-produits',
    name: 'Éco Produits',
    domain: 'eco-produits.jeffel.com',
    description: 'Produits durables et écologiques pour les consommateurs conscients.',
    status: 'active',
    rating: 4.6,
    logo: 'https://images.pexels.com/photos/6758773/pexels-photo-6758773.jpeg?auto=compress&cs=tinysrgb&w=600',
    product_count: 89,
    is_featured: false,
    created_at: '2023-02-20T10:30:00Z',
    updated_at: '2024-01-13T09:15:00Z'
  }
];

export const mockProducts: DatabaseProduct[] = [
  {
    id: 1,
    name: 'Écouteurs Sans Fil Premium',
    description: 'Écouteurs sans fil premium avec réduction de bruit et autonomie de 24 heures.',
    price: 129.99,
    sku: 'ECO-001',
    is_active: true,
    tenant_id: 2,
    is_marketplace_visible: true,
    marketplace_priority: 10,
    average_rating: 4.7,
    created_at: '2023-03-10T09:00:00Z',
    updated_at: '2024-01-15T14:30:00Z'
  },
  {
    id: 2,
    name: 'Montre Connectée Sport',
    description: 'Montre intelligente avec suivi de santé, notifications et résistance à l\'eau.',
    price: 199.99,
    sku: 'MON-001',
    is_active: true,
    tenant_id: 2,
    is_marketplace_visible: true,
    marketplace_priority: 9,
    average_rating: 4.5,
    created_at: '2023-03-15T11:00:00Z',
    updated_at: '2024-01-14T16:20:00Z'
  },
  {
    id: 3,
    name: 'Set Brosses à Dents Bambou',
    description: 'Pack de 4 brosses à dents écologiques en bambou avec poils au charbon.',
    price: 14.99,
    sku: 'BRO-001',
    is_active: true,
    tenant_id: 3,
    is_marketplace_visible: true,
    marketplace_priority: 7,
    average_rating: 4.8,
    created_at: '2023-03-20T13:30:00Z',
    updated_at: '2024-01-13T10:15:00Z'
  },
  {
    id: 4,
    name: 'Sacs à Légumes Réutilisables',
    description: 'Set de 8 sacs en filet pour les courses, réduisant les déchets plastiques.',
    price: 19.99,
    sku: 'SAC-001',
    is_active: true,
    tenant_id: 3,
    is_marketplace_visible: true,
    marketplace_priority: 6,
    average_rating: 4.6,
    created_at: '2023-03-25T10:15:00Z',
    updated_at: '2024-01-12T09:45:00Z'
  },
  {
    id: 5,
    name: 'Haut-parleur Bluetooth',
    description: 'Haut-parleur Bluetooth portable avec son 360° et design étanche.',
    price: 79.99,
    sku: 'HP-001',
    is_active: true,
    tenant_id: 2,
    is_marketplace_visible: true,
    marketplace_priority: 8,
    average_rating: 4.4,
    created_at: '2023-04-02T14:45:00Z',
    updated_at: '2024-01-11T11:20:00Z'
  },
  {
    id: 6,
    name: 'Bouteille en Acier Inoxydable',
    description: 'Bouteille isotherme à double paroi qui garde les boissons froides 24h ou chaudes 12h.',
    price: 34.99,
    sku: 'BOU-001',
    is_active: true,
    tenant_id: 3,
    is_marketplace_visible: true,
    marketplace_priority: 5,
    average_rating: 4.9,
    created_at: '2023-04-10T09:30:00Z',
    updated_at: '2024-01-10T16:30:00Z'
  }
];

export const mockProductImages: DatabaseProductImage[] = [
  {
    id: 1,
    url: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=600',
    filename: 'ecouteurs-1.jpg',
    alt_text: 'Écouteurs sans fil premium',
    is_cover: true,
    display_order: 1,
    product_id: 1,
    created_at: '2023-03-10T09:00:00Z',
    updated_at: '2023-03-10T09:00:00Z'
  },
  {
    id: 2,
    url: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600',
    filename: 'montre-1.jpg',
    alt_text: 'Montre connectée sport',
    is_cover: true,
    display_order: 1,
    product_id: 2,
    created_at: '2023-03-15T11:00:00Z',
    updated_at: '2023-03-15T11:00:00Z'
  },
  {
    id: 3,
    url: 'https://images.pexels.com/photos/3737605/pexels-photo-3737605.jpeg?auto=compress&cs=tinysrgb&w=600',
    filename: 'brosses-1.jpg',
    alt_text: 'Set brosses à dents bambou',
    is_cover: true,
    display_order: 1,
    product_id: 3,
    created_at: '2023-03-20T13:30:00Z',
    updated_at: '2023-03-20T13:30:00Z'
  },
  {
    id: 4,
    url: 'https://images.pexels.com/photos/5217288/pexels-photo-5217288.jpeg?auto=compress&cs=tinysrgb&w=600',
    filename: 'sacs-1.jpg',
    alt_text: 'Sacs à légumes réutilisables',
    is_cover: true,
    display_order: 1,
    product_id: 4,
    created_at: '2023-03-25T10:15:00Z',
    updated_at: '2023-03-25T10:15:00Z'
  },
  {
    id: 5,
    url: 'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=600',
    filename: 'haut-parleur-1.jpg',
    alt_text: 'Haut-parleur Bluetooth',
    is_cover: true,
    display_order: 1,
    product_id: 5,
    created_at: '2023-04-02T14:45:00Z',
    updated_at: '2023-04-02T14:45:00Z'
  },
  {
    id: 6,
    url: 'https://images.pexels.com/photos/1282278/pexels-photo-1282278.jpeg?auto=compress&cs=tinysrgb&w=600',
    filename: 'bouteille-1.jpg',
    alt_text: 'Bouteille en acier inoxydable',
    is_cover: true,
    display_order: 1,
    product_id: 6,
    created_at: '2023-04-10T09:30:00Z',
    updated_at: '2023-04-10T09:30:00Z'
  }
];

export const mockCategories: DatabaseCategory[] = [
  {
    id: 1,
    name: 'Électronique',
    description: 'Appareils électroniques et gadgets technologiques',
    icon: 'smartphone',
    tenant_id: 1,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Santé & Beauté',
    description: 'Produits de santé et de beauté',
    icon: 'heart',
    tenant_id: 1,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 3,
    name: 'Maison & Cuisine',
    description: 'Articles pour la maison et la cuisine',
    icon: 'home',
    tenant_id: 1,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 4,
    name: 'Mode',
    description: 'Vêtements et accessoires de mode',
    icon: 'shirt',
    tenant_id: 1,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  }
];

export const mockInventory: DatabaseInventory[] = [
  {
    id: 1,
    product_id: 1,
    tenant_id: 2,
    quantity: 50,
    reorder_point: 10,
    reorder_quantity: 100,
    low_stock_threshold: 15,
    reserved_quantity: 5,
    created_at: '2023-03-10T09:00:00Z',
    updated_at: '2024-01-15T14:30:00Z'
  },
  {
    id: 2,
    product_id: 2,
    tenant_id: 2,
    quantity: 35,
    reorder_point: 15,
    reorder_quantity: 50,
    low_stock_threshold: 20,
    reserved_quantity: 3,
    created_at: '2023-03-15T11:00:00Z',
    updated_at: '2024-01-14T16:20:00Z'
  },
  {
    id: 3,
    product_id: 3,
    tenant_id: 3,
    quantity: 100,
    reorder_point: 20,
    reorder_quantity: 200,
    low_stock_threshold: 25,
    reserved_quantity: 10,
    created_at: '2023-03-20T13:30:00Z',
    updated_at: '2024-01-13T10:15:00Z'
  },
  {
    id: 4,
    product_id: 4,
    tenant_id: 3,
    quantity: 75,
    reorder_point: 15,
    reorder_quantity: 150,
    low_stock_threshold: 20,
    reserved_quantity: 8,
    created_at: '2023-03-25T10:15:00Z',
    updated_at: '2024-01-12T09:45:00Z'
  },
  {
    id: 5,
    product_id: 5,
    tenant_id: 2,
    quantity: 40,
    reorder_point: 10,
    reorder_quantity: 80,
    low_stock_threshold: 15,
    reserved_quantity: 4,
    created_at: '2023-04-02T14:45:00Z',
    updated_at: '2024-01-11T11:20:00Z'
  },
  {
    id: 6,
    product_id: 6,
    tenant_id: 3,
    quantity: 60,
    reorder_point: 12,
    reorder_quantity: 120,
    low_stock_threshold: 18,
    reserved_quantity: 6,
    created_at: '2023-04-10T09:30:00Z',
    updated_at: '2024-01-10T16:30:00Z'
  }
];

export const mockDeliveryZones: DatabaseDeliveryZone[] = [
  {
    id: 1,
    tenant_id: 1,
    name: 'Dakar Centre',
    fee: 1500,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 2,
    tenant_id: 1,
    name: 'Dakar Banlieue',
    fee: 2000,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 3,
    tenant_id: 1,
    name: 'Rufisque',
    fee: 2500,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 4,
    tenant_id: 1,
    name: 'Thiès',
    fee: 3500,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  }
];

export const mockRoles: DatabaseRole[] = [
  {
    id: 1,
    name: 'super-admin',
    tenant_id: 1,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'admin',
    tenant_id: 1,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 3,
    name: 'manager',
    tenant_id: 2,
    created_at: '2023-01-15T08:00:00Z',
    updated_at: '2023-01-15T08:00:00Z'
  },
  {
    id: 4,
    name: 'delivery',
    tenant_id: 1,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 5,
    name: 'customer',
    tenant_id: 1,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  }
];

export const mockUserRoles: DatabaseUserRole[] = [
  { id: 1, user_id: 1, role_id: 5, created_at: '2023-01-15T08:00:00Z', updated_at: '2023-01-15T08:00:00Z' }, // Jean - Customer
  { id: 2, user_id: 2, role_id: 2, created_at: '2023-01-20T10:00:00Z', updated_at: '2023-01-20T10:00:00Z' }, // Marie - Admin
  { id: 3, user_id: 3, role_id: 2, created_at: '2023-02-01T09:00:00Z', updated_at: '2023-02-01T09:00:00Z' }, // Pierre - Admin
  { id: 4, user_id: 4, role_id: 4, created_at: '2023-03-01T14:00:00Z', updated_at: '2023-03-01T14:00:00Z' }, // Amadou - Delivery
  { id: 5, user_id: 5, role_id: 3, created_at: '2023-03-15T11:00:00Z', updated_at: '2023-03-15T11:00:00Z' }, // Fatou - Manager
  { id: 6, user_id: 6, role_id: 1, created_at: '2023-01-01T00:00:00Z', updated_at: '2023-01-01T00:00:00Z' }, // Super Admin
  { id: 7, user_id: 7, role_id: 2, created_at: '2023-01-01T00:00:00Z', updated_at: '2023-01-01T00:00:00Z' }  // Marketplace Admin
];

export const mockUserTenants: DatabaseUserTenant[] = [
  { id: 1, user_id: 1, tenant_id: 1, created_at: '2023-01-15T08:00:00Z', updated_at: '2023-01-15T08:00:00Z' },
  { id: 2, user_id: 2, tenant_id: 2, created_at: '2023-01-20T10:00:00Z', updated_at: '2023-01-20T10:00:00Z' },
  { id: 3, user_id: 3, tenant_id: 3, created_at: '2023-02-01T09:00:00Z', updated_at: '2023-02-01T09:00:00Z' },
  { id: 4, user_id: 4, tenant_id: 1, created_at: '2023-03-01T14:00:00Z', updated_at: '2023-03-01T14:00:00Z' },
  { id: 5, user_id: 5, tenant_id: 2, created_at: '2023-03-15T11:00:00Z', updated_at: '2023-03-15T11:00:00Z' },
  { id: 6, user_id: 6, tenant_id: 1, created_at: '2023-01-01T00:00:00Z', updated_at: '2023-01-01T00:00:00Z' },
  { id: 7, user_id: 7, tenant_id: 1, created_at: '2023-01-01T00:00:00Z', updated_at: '2023-01-01T00:00:00Z' }
];

// Fonction utilitaire pour simuler les réponses API
export const createApiResponse = <T>(data: T, success = true, message?: string): any => ({
  success,
  message,
  data,
  meta: {
    total: Array.isArray(data) ? data.length : 1,
    per_page: 10,
    current_page: 1,
    last_page: 1,
    from: 1,
    to: Array.isArray(data) ? data.length : 1
  }
});

// Fonctions pour simuler les appels API
export const mockApiCalls = {
  // Users
  getUsers: () => createApiResponse(mockUsers),
  getUserById: (id: number) => createApiResponse(mockUsers.find(u => u.id === id)),
  getUserProfile: (userId: number) => createApiResponse(mockUserProfiles.find(p => p.user_id === userId)),
  
  // Tenants
  getTenants: () => createApiResponse(mockTenants),
  getTenantById: (id: number) => createApiResponse(mockTenants.find(t => t.id === id)),
  
  // Products
  getProducts: () => createApiResponse(mockProducts),
  getProductById: (id: number) => createApiResponse(mockProducts.find(p => p.id === id)),
  getProductsByTenant: (tenantId: number) => createApiResponse(mockProducts.filter(p => p.tenant_id === tenantId)),
  
  // Categories
  getCategories: () => createApiResponse(mockCategories),
  getCategoriesByTenant: (tenantId: number) => createApiResponse(mockCategories.filter(c => c.tenant_id === tenantId)),
  
  // Inventory
  getInventory: () => createApiResponse(mockInventory),
  getInventoryByProduct: (productId: number) => createApiResponse(mockInventory.find(i => i.product_id === productId)),
  
  // Delivery Zones
  getDeliveryZones: () => createApiResponse(mockDeliveryZones),
  getDeliveryZonesByTenant: (tenantId: number) => createApiResponse(mockDeliveryZones.filter(z => z.tenant_id === tenantId)),
  
  // Roles & Permissions
  getRoles: () => createApiResponse(mockRoles),
  getUserRoles: (userId: number) => createApiResponse(mockUserRoles.filter(ur => ur.user_id === userId)),
  getUserTenants: (userId: number) => createApiResponse(mockUserTenants.filter(ut => ut.user_id === userId))
};