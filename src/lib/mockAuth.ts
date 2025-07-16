// Mock Authentication System
interface MockUser {
  id: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  username: string;
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  created_at: string;
  profile?: {
    bio: string | null;
    phone: string | null;
    avatar_url: string | null;
    website: string | null;
  };
  roles: string[];
  tenant_id?: string;
}

// Mock delivery zones
const mockDeliveryZones = [
  {
    id: '1',
    name: 'Dakar Centre',
    region: 'Dakar',
    cities: ['Dakar', 'Plateau', 'Médina', 'Gueule Tapée'],
    deliveryFee: 1500,
    estimatedDeliveryTime: '2-4 heures',
    isActive: true,
  },
  {
    id: '2',
    name: 'Dakar Banlieue',
    region: 'Dakar',
    cities: ['Pikine', 'Guédiawaye', 'Parcelles Assainies', 'Grand Yoff'],
    deliveryFee: 2000,
    estimatedDeliveryTime: '4-6 heures',
    isActive: true,
  },
  {
    id: '3',
    name: 'Rufisque',
    region: 'Dakar',
    cities: ['Rufisque', 'Bargny', 'Diamniadio'],
    deliveryFee: 2500,
    estimatedDeliveryTime: '6-8 heures',
    isActive: true,
  }
];

// Mock Users Database
const mockUsers: MockUser[] = [
  {
    id: '1',
    email: 'admin@jeffel.com',
    password: 'password123',
    first_name: 'Super',
    last_name: 'Admin',
    username: 'admin.jeffel',
    status: 'active',
    created_at: '2023-01-01T00:00:00Z',
    profile: {
      bio: 'Super administrateur de la plateforme JefJel',
      phone: '+221 77 000 00 00',
      avatar_url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
      website: 'https://jeffel.com'
    },
    roles: ['super-admin'],
    tenant_id: '1'
  },
  {
    id: '2',
    email: 'aminata@example.com',
    password: 'password123',
    first_name: 'Aminata',
    last_name: 'Diallo',
    username: 'aminata.diallo',
    status: 'active',
    created_at: '2023-12-15T10:30:00Z',
    profile: {
      bio: null,
      phone: '+221 77 123 45 67',
      avatar_url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
      website: null
    },
    roles: ['customer'],
    tenant_id: '1'
  },
  {
    id: '3',
    email: 'moussa@example.com',
    password: 'password123',
    first_name: 'Moussa',
    last_name: 'Sow',
    username: 'moussa.sow',
    status: 'active',
    created_at: '2023-11-20T09:15:00Z',
    profile: {
      bio: null,
      phone: '+221 77 234 56 78',
      avatar_url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
      website: null
    },
    roles: ['customer'],
    tenant_id: '1'
  },
  {
    id: '4',
    email: 'marie@exemple.com',
    password: 'password123',
    first_name: 'Marie',
    last_name: 'Martin',
    username: 'marie.martin',
    status: 'active',
    created_at: '2023-01-20T10:00:00Z',
    profile: {
      bio: 'Administratrice de Tech Paradise',
      phone: '+221 77 234 56 78',
      avatar_url: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
      website: null
    },
    roles: ['admin'],
    tenant_id: '2'
  },
  {
    id: '5',
    email: 'amadou@exemple.com',
    password: 'password123',
    first_name: 'Amadou',
    last_name: 'Ba',
    username: 'amadou.ba',
    status: 'active',
    created_at: '2023-03-01T14:00:00Z',
    profile: {
      bio: 'Livreur expérimenté',
      phone: '+221 77 123 45 67',
      avatar_url: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
      website: null
    },
    roles: ['delivery'],
    tenant_id: '1'
  }
];

// Mock Tenants
const mockTenants = [
  {
    id: '1',
    name: 'JefJel Marketplace',
    slug: 'jeffel-marketplace',
    domain: 'jeffel.com',
    description: 'Plateforme e-commerce multilocataire du Sénégal',
    status: 'active',
    rating: 4.8,
    logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
    product_count: 456,
    is_featured: true,
    created_at: '2023-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Tech Paradise',
    slug: 'tech-paradise',
    domain: 'tech-paradise.jeffel.com',
    description: 'Gadgets technologiques premium et accessoires pour tous vos besoins.',
    status: 'active',
    rating: 4.8,
    logo: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600',
    product_count: 156,
    is_featured: true,
    created_at: '2023-01-15T08:00:00Z'
  },
  {
    id: '3',
    name: 'Éco Produits',
    slug: 'eco-produits',
    domain: 'eco-produits.jeffel.com',
    description: 'Produits durables et écologiques pour les consommateurs conscients.',
    status: 'active',
    rating: 4.6,
    logo: 'https://images.pexels.com/photos/6758773/pexels-photo-6758773.jpeg?auto=compress&cs=tinysrgb&w=600',
    product_count: 89,
    is_featured: false,
    created_at: '2023-02-20T10:30:00Z'
  }
];

// Mock Products
const mockProducts = [
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
    updated_at: '2024-01-15T14:30:00Z',
    product_images: [
      {
        id: 1,
        url: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=600',
        alt_text: 'Écouteurs sans fil premium',
        is_cover: true,
        display_order: 1
      }
    ],
    tenants: {
      id: 2,
      name: 'Tech Paradise',
      slug: 'tech-paradise',
      rating: 4.8
    },
    inventory: [
      {
        quantity: 50,
        low_stock_threshold: 10
      }
    ]
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
    updated_at: '2024-01-14T16:20:00Z',
    product_images: [
      {
        id: 2,
        url: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600',
        alt_text: 'Montre connectée sport',
        is_cover: true,
        display_order: 1
      }
    ],
    tenants: {
      id: 2,
      name: 'Tech Paradise',
      slug: 'tech-paradise',
      rating: 4.8
    },
    inventory: [
      {
        quantity: 35,
        low_stock_threshold: 15
      }
    ]
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
    updated_at: '2024-01-13T10:15:00Z',
    product_images: [
      {
        id: 3,
        url: 'https://images.pexels.com/photos/3737605/pexels-photo-3737605.jpeg?auto=compress&cs=tinysrgb&w=600',
        alt_text: 'Set brosses à dents bambou',
        is_cover: true,
        display_order: 1
      }
    ],
    tenants: {
      id: 3,
      name: 'Éco Produits',
      slug: 'eco-produits',
      rating: 4.6
    },
    inventory: [
      {
        quantity: 100,
        low_stock_threshold: 20
      }
    ]
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
    updated_at: '2024-01-12T09:45:00Z',
    product_images: [
      {
        id: 4,
        url: 'https://images.pexels.com/photos/5217288/pexels-photo-5217288.jpeg?auto=compress&cs=tinysrgb&w=600',
        alt_text: 'Sacs à légumes réutilisables',
        is_cover: true,
        display_order: 1
      }
    ],
    tenants: {
      id: 3,
      name: 'Éco Produits',
      slug: 'eco-produits',
      rating: 4.6
    },
    inventory: [
      {
        quantity: 75,
        low_stock_threshold: 20
      }
    ]
  }
];

// Session storage for current user
let currentSession: { user: MockUser; token: string } | null = null;

export const mockAuthService = {
  async signIn(email: string, password: string) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid login credentials');
    }
    
    if (user.status !== 'active') {
      throw new Error('Account is not active');
    }
    
    const token = `mock-token-${user.id}-${Date.now()}`;
    currentSession = { user, token };
    
    // Store in localStorage for persistence
    localStorage.setItem('mockSession', JSON.stringify(currentSession));
    
    return {
      user: {
        id: user.id,
        email: user.email,
        user_metadata: {
          first_name: user.first_name,
          last_name: user.last_name
        }
      },
      session: {
        access_token: token,
        user: {
          id: user.id,
          email: user.email
        }
      }
    };
  },

  async signUp(userData: any) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    const newUser: MockUser = {
      id: (mockUsers.length + 1).toString(),
      email: userData.email,
      password: userData.password,
      first_name: userData.first_name,
      last_name: userData.last_name,
      username: userData.username,
      status: 'active',
      created_at: new Date().toISOString(),
      profile: {
        bio: null,
        phone: null,
        avatar_url: null,
        website: null
      },
      roles: ['customer'],
      tenant_id: '1'
    };
    
    mockUsers.push(newUser);
    
    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        user_metadata: {
          first_name: newUser.first_name,
          last_name: newUser.last_name
        }
      }
    };
  },

  async signOut() {
    currentSession = null;
    localStorage.removeItem('mockSession');
  },

  async getCurrentUser() {
    // Check localStorage first
    const stored = localStorage.getItem('mockSession');
    if (stored) {
      currentSession = JSON.parse(stored);
    }
    
    return currentSession?.user || null;
  },

  async getUserProfile(email: string) {
    const user = mockUsers.find(u => u.email === email);
    if (!user) return null;
    
    const tenant = mockTenants.find(t => t.id === user.tenant_id);
    
    return {
      id: parseInt(user.id),
      username: user.username,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      status: user.status,
      profile: user.profile,
      roles: user.roles.map(role => ({ role: { name: role } })),
      tenants: tenant ? [{ tenant: { id: parseInt(tenant.id), name: tenant.name, slug: tenant.slug } }] : []
    };
  },

  // Mock data getters
  getProducts: (filters?: any) => {
    let filtered = [...mockProducts];
    
    if (filters?.tenant_id) {
      filtered = filtered.filter(p => p.tenant_id === filters.tenant_id);
    }
    
    if (filters?.is_active !== undefined) {
      filtered = filtered.filter(p => p.is_active === filters.is_active);
    }
    
    return Promise.resolve(filtered);
  },

  getProduct: (id: number) => {
    const product = mockProducts.find(p => p.id === id);
    return Promise.resolve(product || null);
  },

  getTenants: (filters?: any) => {
    let filtered = [...mockTenants];
    
    if (filters?.is_featured !== undefined) {
      filtered = filtered.filter(t => t.is_featured === filters.is_featured);
    }
    
    if (filters?.status) {
      filtered = filtered.filter(t => t.status === filters.status);
    }
    
    return Promise.resolve(filtered);
  },

  async getDeliveryZonesByCity(city: string) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const matchingZones = mockDeliveryZones.filter(zone => 
      zone.cities.some(zoneCity => 
        zoneCity.toLowerCase().includes(city.toLowerCase())
      )
    );
    return {
      success: true,
      data: matchingZones
    };
  },

  async getDeliveryZonesByTenant(tenantId: number) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      success: true,
      data: mockDeliveryZones
    };
  },

  // Orders
  async getOrders(params?: any) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock orders data
    const mockOrders = [
      {
        id: 1,
        user_id: 1,
        tenant_id: 2,
        payment_method: 'Mobile Money',
        subtotal: 129990,
        delivery_fee: 1500,
        total: 131490,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        address: {
          address_line1: '123 Rue de la Paix',
          city: 'Dakar',
          country: 'Sénégal'
        },
        delivery_zone: {
          name: 'Dakar Centre',
          fee: 1500
        },
        items: [
          {
            product_id: 1,
            quantity: 1,
            unit_price: 129990,
            product: {
              name: 'Écouteurs Sans Fil Premium',
              sku: 'ECO-001'
            }
          }
        ]
      },
      {
        id: 2,
        user_id: 1,
        tenant_id: 3,
        payment_method: 'Paiement à la livraison',
        subtotal: 14990,
        delivery_fee: 2000,
        total: 16990,
        status: 'delivered',
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        address: {
          address_line1: '123 Rue de la Paix',
          city: 'Pikine',
          country: 'Sénégal'
        },
        delivery_zone: {
          name: 'Dakar Banlieue',
          fee: 2000
        },
        items: [
          {
            product_id: 3,
            quantity: 1,
            unit_price: 14990,
            product: {
              name: 'Set Brosses à Dents Bambou',
              sku: 'BRO-001'
            }
          }
        ]
      }
    ];
    
    // Filter orders based on params
    let filteredOrders = [...mockOrders];
    
    if (params?.user_id) {
      filteredOrders = filteredOrders.filter(o => o.user_id === params.user_id);
    }
    
    if (params?.tenant_id) {
      filteredOrders = filteredOrders.filter(o => o.tenant_id === params.tenant_id);
    }
    
    if (params?.status) {
      filteredOrders = filteredOrders.filter(o => o.status === params.status);
    }
    
    return {
      success: true,
      data: filteredOrders,
      meta: {
        total: filteredOrders.length,
        per_page: 10,
        current_page: 1,
        last_page: 1,
        from: 1,
        to: filteredOrders.length
      }
    };
  },

  async createOrder(orderData: any) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newOrder = {
      id: Date.now(),
      ...orderData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: 'pending'
    };
    
    return {
      success: true,
      data: newOrder
    };
  },

  async updateOrderStatus(id: number, status: string) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      data: {
        id,
        status,
        updated_at: new Date().toISOString()
      }
    };
  },

  // Delivery Zones
  async getDeliveryZones() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      success: true,
      data: mockDeliveryZones
    };
  },

  // Authentication
  async login(credentials: { email: string; password: string }) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = mockUsers.find(u => u.email === credentials.email && u.password === credentials.password);
    
    if (!user) {
      throw new Error('Invalid login credentials');
    }
    
    if (user.status !== 'active') {
      throw new Error('Account is not active');
    }
    
    const token = `mock-token-${user.id}-${Date.now()}`;
    currentSession = { user, token };
    
    // Store in localStorage for persistence
    localStorage.setItem('mockSession', JSON.stringify(currentSession));
    
    return {
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          user_metadata: {
            first_name: user.first_name,
            last_name: user.last_name
          }
        },
        session: {
          access_token: token,
          user: {
            id: user.id,
            email: user.email
          }
        }
      }
    };
  },

  // Méthode pour basculer entre mock et vraies données
  setUseMockData(useMock: boolean) {
    // Mock implementation
  },

  // Méthodes pour la gestion des commandes
  async placeOrder(orderData: any) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newOrder = {
      id: Date.now(),
      ...orderData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: 'pending'
    };
    
    return {
      success: true,
      message: 'Commande créée avec succès',
      data: newOrder
    };
  },

  async getOrderById(id: number) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Simulate fetching a specific order
    const order = {
      id,
      user_id: 1,
      tenant_id: 2,
      payment_method: 'Mobile Money',
      subtotal: 129990,
      delivery_fee: 1500,
      total: 131490,
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      address: {
        address_line1: '123 Rue de la Paix',
        city: 'Dakar',
        country: 'Sénégal'
      },
      delivery_zone: {
        name: 'Dakar Centre',
        fee: 1500
      },
      items: [
        {
          product_id: 1,
          quantity: 1,
          unit_price: 129990,
          product: {
            name: 'Écouteurs Sans Fil Premium',
            sku: 'ECO-001'
          }
        }
      ]
    };
    
    return {
      success: true,
      data: order
    };
  },

  async getDeliveries(params?: any) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock deliveries data
    const mockDeliveries = [
      {
        id: 1,
        order_id: 1,
        delivery_person_id: 4,
        notes: 'Appeler avant livraison',
        assigned_at: new Date().toISOString(),
        picked_at: null,
        delivered_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status: 'assigned',
        order: {
          id: 1,
          total: 131490,
          address: {
            address_line1: '123 Rue de la Paix',
            city: 'Dakar'
          },
          user: {
            first_name: 'Jean',
            last_name: 'Dupont',
            phone: '+221 77 123 45 67'
          }
        },
        delivery_person: {
          id: 4,
          user_id: 4,
          first_name: 'Amadou',
          last_name: 'Ba',
          phone: '+221 77 123 45 67'
        },
        zone: {
          name: 'Dakar Centre'
        }
      },
      {
        id: 2,
        order_id: 2,
        delivery_person_id: 4,
        notes: 'Livraison effectuée',
        assigned_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        picked_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
        delivered_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000).toISOString(),
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000).toISOString(),
        status: 'delivered',
        order: {
          id: 2,
          total: 16990,
          address: {
            address_line1: '123 Rue de la Paix',
            city: 'Pikine'
          },
          user: {
            first_name: 'Jean',
            last_name: 'Dupont',
            phone: '+221 77 123 45 67'
          }
        },
        delivery_person: {
          id: 4,
          user_id: 4,
          first_name: 'Amadou',
          last_name: 'Ba',
          phone: '+221 77 123 45 67'
        },
        zone: {
          name: 'Dakar Banlieue'
        }
      }
    ];
    
    // Filter deliveries based on params
    let filteredDeliveries = [...mockDeliveries];
    
    if (params?.delivery_person_id) {
      filteredDeliveries = filteredDeliveries.filter(d => d.delivery_person_id === params.delivery_person_id);
    }
    
    if (params?.status) {
      filteredDeliveries = filteredDeliveries.filter(d => d.status === params.status);
    }
    
    return {
      success: true,
      data: filteredDeliveries,
      meta: {
        total: filteredDeliveries.length,
        per_page: 10,
        current_page: 1,
        last_page: 1,
        from: 1,
        to: filteredDeliveries.length
      }
    };
  },

  async updateDeliveryStatus(id: number, status: string, notes?: string) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let updatedFields: any = { status };
    
    if (status === 'picked_up') {
      updatedFields.picked_at = new Date().toISOString();
    } else if (status === 'delivered') {
      updatedFields.delivered_at = new Date().toISOString();
    }
    
    if (notes) {
      updatedFields.notes = notes;
    }
    
    return {
      success: true,
      message: 'Statut de livraison mis à jour',
      data: {
        id,
        ...updatedFields,
        updated_at: new Date().toISOString()
      }
    };
  },

  // Initialize session from localStorage on app start
  initializeSession: () => {
    const stored = localStorage.getItem('mockSession');
    if (stored) {
      currentSession = JSON.parse(stored);
    }
  }
};