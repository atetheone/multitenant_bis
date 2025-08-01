import { DeliveryZone } from '../types';

export const deliveryZones: DeliveryZone[] = [
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
  },
  {
    id: '4',
    name: 'Thiès',
    region: 'Thiès',
    cities: ['Thiès', 'Mbour', 'Tivaouane'],
    deliveryFee: 3500,
    estimatedDeliveryTime: '1-2 jours',
    isActive: true,
  },
  {
    id: '5',
    name: 'Saint-Louis',
    region: 'Saint-Louis',
    cities: ['Saint-Louis', 'Richard Toll', 'Dagana'],
    deliveryFee: 4000,
    estimatedDeliveryTime: '2-3 jours',
    isActive: true,
  },
  {
    id: '6',
    name: 'Kaolack',
    region: 'Kaolack',
    cities: ['Kaolack', 'Kaffrine', 'Nioro du Rip'],
    deliveryFee: 3500,
    estimatedDeliveryTime: '1-2 jours',
    isActive: true,
  },
  {
    id: '7',
    name: 'Ziguinchor',
    region: 'Ziguinchor',
    cities: ['Ziguinchor', 'Oussouye', 'Bignona'],
    deliveryFee: 5000,
    estimatedDeliveryTime: '3-4 jours',
    isActive: true,
  },
];