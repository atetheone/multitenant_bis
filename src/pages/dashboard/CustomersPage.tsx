import React, { useState } from 'react';
import { 
  Users, 
  Eye, 
  Edit, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  ShoppingCart,
  DollarSign,
  Search,
  Filter,
  Download,
  UserPlus,
  Star,
  TrendingUp
} from 'lucide-react';
import DataTable from '../../components/dashboard/DataTable';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Chart from '../../components/dashboard/Chart';

const CustomersPage: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock customers data
  const mockCustomers = [
    {
      id: '1',
      name: 'Aminata Diallo',
      email: 'aminata@example.com',
      phone: '+221 77 123 45 67',
      address: '123 Rue de la Paix, Dakar',
      city: 'Dakar',
      registrationDate: '2023-12-15T10:30:00Z',
      lastOrderDate: '2024-01-15T10:30:00Z',
      totalOrders: 12,
      totalSpent: 450000,
      averageOrderValue: 37500,
      status: 'active',
      customerSince: '3 mois',
      favoriteCategory: 'Électronique'
    },
    {
      id: '2',
      name: 'Moussa Sow',
      email: 'moussa@example.com',
      phone: '+221 77 234 56 78',
      address: '456 Avenue Bourguiba, Pikine',
      city: 'Pikine',
      registrationDate: '2023-11-20T09:15:00Z',
      lastOrderDate: '2024-01-14T14:20:00Z',
      totalOrders: 8,
      totalSpent: 320000,
      averageOrderValue: 40000,
      status: 'active',
      customerSince: '4 mois',
      favoriteCategory: 'Mode'
    },
    {
      id: '3',
      name: 'Fatou Ndiaye',
      email: 'fatou@example.com',
      phone: '+221 77 345 67 89',
      address: '789 Boulevard de la République, Rufisque',
      city: 'Rufisque',
      registrationDate: '2023-10-10T16:45:00Z',
      lastOrderDate: '2024-01-10T11:30:00Z',
      totalOrders: 15,
      totalSpent: 675000,
      averageOrderValue: 45000,
      status: 'vip',
      customerSince: '5 mois',
      favoriteCategory: 'Maison & Cuisine'
    },
    {
      id: '4',
      name: 'Ibrahima Fall',
      email: 'ibrahima@example.com',
      phone: '+221 77 456 78 90',
      address: '321 Rue de Thiès, Thiès',
      city: 'Thiès',
      registrationDate: '2024-01-05T08:20:00Z',
      lastOrderDate: '2024-01-13T16:45:00Z',
      totalOrders: 3,
      totalSpent: 125000,
      averageOrderValue: 41667,
      status: 'new',
      customerSince: '2 semaines',
      favoriteCategory: 'Électronique'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'vip': return 'bg-purple-100 text-purple-800';
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'vip': return 'VIP';
      case 'new': return 'Nouveau';
      case 'inactive': return 'Inactif';
      default: return status;
    }
  };

  const columns = [
    { key: 'name', label: 'Nom', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'phone', label: 'Téléphone' },
    { key: 'city', label: 'Ville', sortable: true },
    { 
      key: 'totalOrders', 
      label: 'Commandes', 
      sortable: true,
      render: (value: number) => `${value} commandes`
    },
    { 
      key: 'totalSpent', 
      label: 'Total dépensé', 
      sortable: true,
      render: (value: number) => `${value.toLocaleString()} FCFA`
    },
    { 
      key: 'status', 
      label: 'Statut', 
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(value)}`}>
          {getStatusText(value)}
        </span>
      )
    },
    { 
      key: 'registrationDate', 
      label: 'Inscription', 
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString('fr-FR')
    }
  ];

  const handleViewCustomer = (customer: any) => {
    setSelectedCustomer(customer);
  };

  // Données pour les graphiques
  const customerGrowthData = [
    { label: 'Jan', value: 45 },
    { label: 'Fév', value: 52 },
    { label: 'Mar', value: 48 },
    { label: 'Avr', value: 61 },
    { label: 'Mai', value: 55 },
    { label: 'Jun', value: 67 },
  ];

  const customerSegmentData = [
    { label: 'Nouveaux', value: 25, color: '#3B82F6' },
    { label: 'Actifs', value: 60, color: '#10B981' },
    { label: 'VIP', value: 10, color: '#8B5CF6' },
    { label: 'Inactifs', value: 5, color: '#6B7280' },
  ];

  const CustomerDetailModal = ({ customer, onClose }: { customer: any; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Profil Client - {customer.name}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              ×
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Informations personnelles */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Informations Personnelles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Nom complet</p>
                <p className="font-medium">{customer.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  {customer.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Téléphone</p>
                <p className="font-medium flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  {customer.phone}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Adresse</p>
                <p className="font-medium flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {customer.address}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Date d'inscription</p>
                <p className="font-medium flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(customer.registrationDate).toLocaleDateString('fr-FR')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Client depuis</p>
                <p className="font-medium">{customer.customerSince}</p>
              </div>
            </div>
          </div>

          {/* Statistiques d'achat */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center">
                <ShoppingCart className="w-8 h-8 text-blue-600" />
                <div className="ml-3">
                  <p className="text-sm text-gray-600">Total Commandes</p>
                  <p className="text-2xl font-bold text-blue-600">{customer.totalOrders}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center">
                <DollarSign className="w-8 h-8 text-green-600" />
                <div className="ml-3">
                  <p className="text-sm text-gray-600">Total Dépensé</p>
                  <p className="text-2xl font-bold text-green-600">
                    {customer.totalSpent.toLocaleString()} FCFA
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-purple-600" />
                <div className="ml-3">
                  <p className="text-sm text-gray-600">Panier Moyen</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {customer.averageOrderValue.toLocaleString()} FCFA
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Préférences */}
          <div className="bg-yellow-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <Star className="w-5 h-5 mr-2" />
              Préférences et Comportement
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Catégorie préférée</p>
                <p className="font-medium">{customer.favoriteCategory}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Dernière commande</p>
                <p className="font-medium">
                  {new Date(customer.lastOrderDate).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4">
            <Button variant="primary">Envoyer un email</Button>
            <Button variant="outline">Voir les commandes</Button>
            <Button variant="outline">Modifier le profil</Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Clients</h1>
          <p className="text-gray-600">Gérez votre base de clients et analysez leur comportement</p>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline" className="flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
          <Button variant="primary" className="flex items-center">
            <UserPlus className="w-4 h-4 mr-2" />
            Ajouter Client
          </Button>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Clients</p>
              <p className="text-2xl font-bold text-gray-900">{mockCustomers.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Clients Actifs</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockCustomers.filter(c => c.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Clients VIP</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockCustomers.filter(c => c.status === 'vip').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <UserPlus className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Nouveaux ce mois</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockCustomers.filter(c => c.status === 'new').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart
          title="Croissance des Clients"
          data={customerGrowthData}
          type="line"
          height={300}
        />
        <Chart
          title="Segmentation des Clients"
          data={customerSegmentData}
          type="doughnut"
          height={300}
        />
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Rechercher par nom, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              fullWidth
            />
          </div>
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="all">Tous les statuts</option>
            <option value="active">Actifs</option>
            <option value="vip">VIP</option>
            <option value="new">Nouveaux</option>
            <option value="inactive">Inactifs</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="all">Toutes les villes</option>
            <option value="dakar">Dakar</option>
            <option value="pikine">Pikine</option>
            <option value="rufisque">Rufisque</option>
            <option value="thies">Thiès</option>
          </select>
        </div>
      </div>

      {/* Table des clients */}
      <DataTable
        title="Liste des Clients"
        columns={columns}
        data={mockCustomers}
        actions={{
          view: handleViewCustomer,
          edit: (row) => console.log('Edit', row),
        }}
        pagination={{
          pageSize: 10,
          currentPage: 1,
          totalItems: mockCustomers.length,
          onPageChange: (page) => console.log('Page change:', page)
        }}
      />

      {/* Modal de détails */}
      {selectedCustomer && (
        <CustomerDetailModal 
          customer={selectedCustomer} 
          onClose={() => setSelectedCustomer(null)} 
        />
      )}
    </div>
  );
};

export default CustomersPage;