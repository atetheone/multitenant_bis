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

  // Initialize session from localStorage on app start
  initializeSession: () => {
    const stored = localStorage.getItem('mockSession');
    if (stored) {
      currentSession = JSON.parse(stored);
    }
  }
};