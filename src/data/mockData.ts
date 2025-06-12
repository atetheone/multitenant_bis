import { User, Tenant, Product, Order } from '../types';

export const users: User[] = [
  {
    id: '1',
    name: 'Jean Dupont',
    email: 'jean@exemple.com',
    role: 'customer',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    isActive: true,
    createdAt: '2023-01-15T08:00:00Z',
  },
  {
    id: '2',
    name: 'Marie Martin',
    email: 'marie@exemple.com',
    role: 'seller',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
    tenantId: '1',
    isActive: true,
    createdAt: '2023-01-20T10:00:00Z',
  },
  {
    id: '3',
    name: 'Pierre Durand',
    email: 'pierre@exemple.com',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
    tenantId: '2',
    isActive: true,
    createdAt: '2023-02-01T09:00:00Z',
  },
  {
    id: '4',
    name: 'Amadou Ba',
    email: 'amadou@exemple.com',
    role: 'delivery',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
    phone: '+221 77 123 45 67',
    isActive: true,
    createdAt: '2023-03-01T14:00:00Z',
  },
  {
    id: '5',
    name: 'Fatou Sall',
    email: 'fatou@exemple.com',
    role: 'manager',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
    tenantId: '1',
    isActive: true,
    createdAt: '2023-03-15T11:00:00Z',
  },
  {
    id: '6',
    name: 'Admin Système',
    email: 'admin@jeffel.com',
    role: 'super-admin',
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
  }
];

export const tenants: Tenant[] = [
  {
    id: '1',
    name: 'Tech Paradise',
    description: 'Gadgets technologiques premium et accessoires pour tous vos besoins.',
    logo: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600',
    ownerId: '2',
    createdAt: '2023-01-15T08:00:00Z',
    rating: 4.8,
    isActive: true,
    deliveryZones: ['1', '2', '3'],
    settings: {
      allowCustomManagers: true,
      maxManagers: 3,
      autoAssignDeliveries: false,
      requireOrderConfirmation: true
    }
  },
  {
    id: '2',
    name: 'Éco Produits',
    description: 'Produits durables et écologiques pour les consommateurs conscients.',
    logo: 'https://images.pexels.com/photos/6758773/pexels-photo-6758773.jpeg?auto=compress&cs=tinysrgb&w=600',
    ownerId: '3',
    createdAt: '2023-02-20T10:30:00Z',
    rating: 4.6,
    isActive: true,
    deliveryZones: ['1', '2', '4', '5'],
    settings: {
      allowCustomManagers: false,
      maxManagers: 2,
      autoAssignDeliveries: true,
      requireOrderConfirmation: false
    }
  },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Écouteurs Sans Fil',
    description: 'Écouteurs sans fil premium avec réduction de bruit et autonomie de 24 heures.',
    price: 129.99,
    images: [
      'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    category: 'Électronique',
    tenantId: '1',
    tenantName: 'Tech Paradise',
    stock: 50,
    rating: 4.7,
    createdAt: '2023-03-10T09:00:00Z',
    isActive: true,
    createdBy: '2'
  },
  {
    id: '2',
    name: 'Montre Connectée',
    description: 'Montre intelligente avec suivi de santé, notifications et bien plus encore.',
    price: 199.99,
    images: [
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    category: 'Électronique',
    tenantId: '1',
    tenantName: 'Tech Paradise',
    stock: 35,
    rating: 4.5,
    createdAt: '2023-03-15T11:00:00Z',
    isActive: true,
    createdBy: '5' // Créé par le gestionnaire
  },
  {
    id: '3',
    name: 'Set de Brosses à Dents en Bambou',
    description: 'Pack de 4 brosses à dents écologiques en bambou avec poils au charbon.',
    price: 14.99,
    images: [
      'https://images.pexels.com/photos/3737605/pexels-photo-3737605.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    category: 'Santé & Beauté',
    tenantId: '2',
    tenantName: 'Éco Produits',
    stock: 100,
    rating: 4.8,
    createdAt: '2023-03-20T13:30:00Z',
    isActive: true,
    createdBy: '3'
  },
  {
    id: '4',
    name: 'Sacs à Légumes Réutilisables',
    description: 'Set de 8 sacs en filet pour les courses, réduisant les déchets plastiques.',
    price: 19.99,
    images: [
      'https://images.pexels.com/photos/5217288/pexels-photo-5217288.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    category: 'Maison & Cuisine',
    tenantId: '2',
    tenantName: 'Éco Produits',
    stock: 75,
    rating: 4.6,
    createdAt: '2023-03-25T10:15:00Z',
    isActive: true,
    createdBy: '3'
  },
  {
    id: '5',
    name: 'Haut-parleur Bluetooth',
    description: 'Haut-parleur Bluetooth portable avec son 360° et design étanche.',
    price: 79.99,
    images: [
      'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    category: 'Électronique',
    tenantId: '1',
    tenantName: 'Tech Paradise',
    stock: 40,
    rating: 4.4,
    createdAt: '2023-04-02T14:45:00Z',
    isActive: true,
    createdBy: '2'
  },
  {
    id: '6',
    name: 'Bouteille en Acier Inoxydable',
    description: 'Bouteille isotherme à double paroi qui garde les boissons froides 24h ou chaudes 12h.',
    price: 34.99,
    images: [
      'https://images.pexels.com/photos/1282278/pexels-photo-1282278.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    category: 'Maison & Cuisine',
    tenantId: '2',
    tenantName: 'Éco Produits',
    stock: 60,
    rating: 4.9,
    createdAt: '2023-04-10T09:30:00Z',
    isActive: true,
    createdBy: '3'
  },
];

export const orders: Order[] = [
  {
    id: '1',
    userId: '1',
    tenantId: '1',
    items: [
      {
        productId: '1',
        quantity: 1,
        product: products.find(p => p.id === '1')!,
      },
      {
        productId: '2',
        quantity: 1,
        product: products.find(p => p.id === '2')!,
      },
    ],
    status: 'delivered',
    total: 329.98,
    createdAt: '2023-05-10T15:30:00Z',
    shippingAddress: {
      street: '123 Rue de la Paix',
      city: 'Dakar',
      region: 'Dakar',
      zipCode: '10000',
      country: 'Sénégal',
    },
    deliveryZone: {
      id: '1',
      name: 'Dakar Centre',
      region: 'Dakar',
      cities: ['Dakar', 'Plateau', 'Médina'],
      deliveryFee: 1500,
      estimatedDeliveryTime: '2-4 heures',
      isActive: true
    },
    deliveryFee: 1500,
    estimatedDeliveryTime: '2-4 heures',
    assignedDeliveryUser: '4',
    processedBy: '2'
  },
  {
    id: '2',
    userId: '1',
    tenantId: '2',
    items: [
      {
        productId: '3',
        quantity: 2,
        product: products.find(p => p.id === '3')!,
      },
    ],
    status: 'in_transit',
    total: 29.98,
    createdAt: '2023-06-05T11:45:00Z',
    shippingAddress: {
      street: '123 Rue de la Paix',
      city: 'Pikine',
      region: 'Dakar',
      zipCode: '12000',
      country: 'Sénégal',
    },
    deliveryZone: {
      id: '2',
      name: 'Dakar Banlieue',
      region: 'Dakar',
      cities: ['Pikine', 'Guédiawaye'],
      deliveryFee: 2000,
      estimatedDeliveryTime: '4-6 heures',
      isActive: true
    },
    deliveryFee: 2000,
    estimatedDeliveryTime: '4-6 heures',
    assignedDeliveryUser: '4',
    processedBy: '3'
  },
];