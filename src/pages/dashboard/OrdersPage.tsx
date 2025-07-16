import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Eye, 
  Edit, 
  Truck, 
  CheckCircle, 
  XCircle, 
  Clock,
  Package,
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Filter,
  Download,
  Search
} from 'lucide-react';
import { usePermissions } from '../../hooks/usePermissions';
import { useOrders } from '../../hooks/useSupabase';
import DataTable from '../../components/dashboard/DataTable';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const OrdersPage: React.FC = () => {
  const { isDelivery, isSuperAdmin } = usePermissions();
  const { data: orders, loading, error, refetch } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock orders data with more details
  const mockOrders = [
    {
      id: 'CMD-001',
      customer: 'Aminata Diallo',
      customerEmail: 'aminata@example.com',
      customerPhone: '+221 77 123 45 67',
      total: 45000,
      status: 'pending',
      date: '2024-01-15T10:30:00Z',
      tenant: 'Tech Paradise',
      items: 2,
      deliveryZone: 'Dakar Centre',
      address: '123 Rue de la Paix, Dakar',
      paymentMethod: 'Mobile Money',
      deliveryFee: 1500
    },
    {
      id: 'CMD-002',
      customer: 'Moussa Sow',
      customerEmail: 'moussa@example.com',
      customerPhone: '+221 77 234 56 78',
      total: 78000,
      status: 'confirmed',
      date: '2024-01-15T09:15:00Z',
      tenant: 'Éco Produits',
      items: 1,
      deliveryZone: 'Dakar Banlieue',
      address: '456 Avenue Bourguiba, Pikine',
      paymentMethod: 'Carte Bancaire',
      deliveryFee: 2000
    },
    {
      id: 'CMD-003',
      customer: 'Fatou Ndiaye',
      customerEmail: 'fatou@example.com',
      customerPhone: '+221 77 345 67 89',
      total: 32000,
      status: 'delivered',
      date: '2024-01-14T14:20:00Z',
      tenant: 'Tech Paradise',
      items: 3,
      deliveryZone: 'Rufisque',
      address: '789 Boulevard de la République, Rufisque',
      paymentMethod: 'Paiement à la livraison',
      deliveryFee: 2500
    },
    {
      id: 'CMD-004',
      customer: 'Ibrahima Fall',
      customerEmail: 'ibrahima@example.com',
      customerPhone: '+221 77 456 78 90',
      total: 125000,
      status: 'in_transit',
      date: '2024-01-13T16:45:00Z',
      tenant: 'Tech Paradise',
      items: 4,
      deliveryZone: 'Thiès',
      address: '321 Rue de Thiès, Thiès',
      paymentMethod: 'Mobile Money',
      deliveryFee: 3500
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-purple-100 text-purple-800';
      case 'ready_for_delivery': return 'bg-indigo-100 text-indigo-800';
      case 'in_transit': return 'bg-orange-100 text-orange-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'canceled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'confirmed': return 'Confirmée';
      case 'preparing': return 'En préparation';
      case 'ready_for_delivery': return 'Prête pour livraison';
      case 'in_transit': return 'En transit';
      case 'delivered': return 'Livrée';
      case 'canceled': return 'Annulée';
      default: return status;
    }
  };

  const columns = [
    { key: 'id', label: 'ID Commande', sortable: true },
    { key: 'customer', label: 'Client', sortable: true },
    { 
      key: 'total', 
      label: 'Total', 
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
      key: 'date', 
      label: 'Date', 
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString('fr-FR')
    },
    { key: 'tenant', label: 'Vendeur' },
    { key: 'deliveryZone', label: 'Zone de livraison' }
  ];

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
  };

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    console.log(`Updating order ${orderId} to status ${newStatus}`);
    // Ici on mettrait à jour le statut dans la base de données
  };

  const OrderDetailModal = ({ order, onClose }: { order: any; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Détails de la commande {order.id}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <XCircle className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Informations client */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Informations Client
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Nom</p>
                <p className="font-medium">{order.customer}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  {order.customerEmail}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Téléphone</p>
                <p className="font-medium flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  {order.customerPhone}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Adresse de livraison</p>
                <p className="font-medium flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {order.address}
                </p>
              </div>
            </div>
          </div>

          {/* Détails de la commande */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Détails de la Commande
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Date de commande</p>
                <p className="font-medium flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(order.date).toLocaleDateString('fr-FR')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Nombre d'articles</p>
                <p className="font-medium">{order.items} articles</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Mode de paiement</p>
                <p className="font-medium">{order.paymentMethod}</p>
              </div>
            </div>
          </div>

          {/* Livraison */}
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <Truck className="w-5 h-5 mr-2" />
              Informations de Livraison
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Zone de livraison</p>
                <p className="font-medium">{order.deliveryZone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Frais de livraison</p>
                <p className="font-medium">{order.deliveryFee.toLocaleString()} FCFA</p>
              </div>
            </div>
          </div>

          {/* Résumé financier */}
          <div className="bg-yellow-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Résumé Financier
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span>{(order.total - order.deliveryFee).toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between">
                <span>Frais de livraison</span>
                <span>{order.deliveryFee.toLocaleString()} FCFA</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-blue-600">{order.total.toLocaleString()} FCFA</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4">
            <select 
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
              defaultValue={order.status}
            >
              <option value="pending">En attente</option>
              <option value="confirmed">Confirmée</option>
              <option value="preparing">En préparation</option>
              <option value="ready_for_delivery">Prête pour livraison</option>
              <option value="in_transit">En transit</option>
              <option value="delivered">Livrée</option>
              <option value="canceled">Annulée</option>
            </select>
            <Button variant="primary">Mettre à jour le statut</Button>
            <Button variant="outline">Imprimer la commande</Button>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-600">Erreur: {error}</p>
        <Button onClick={refetch} className="mt-4">Réessayer</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Commandes</h1>
          <p className="text-gray-600">Suivez et gérez toutes les commandes</p>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline" className="flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
          <Button variant="outline" className="flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filtres
          </Button>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Commandes</p>
              <p className="text-2xl font-bold text-gray-900">{mockOrders.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">En Attente</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockOrders.filter(o => o.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-full">
              <Truck className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">En Transit</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockOrders.filter(o => o.status === 'in_transit').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Livrées</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockOrders.filter(o => o.status === 'delivered').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Rechercher par ID, client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              fullWidth
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="confirmed">Confirmées</option>
            <option value="in_transit">En transit</option>
            <option value="delivered">Livrées</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="all">Toutes les zones</option>
            <option value="dakar-centre">Dakar Centre</option>
            <option value="dakar-banlieue">Dakar Banlieue</option>
            <option value="rufisque">Rufisque</option>
          </select>
        </div>
      </div>

      {/* Table des commandes */}
      <DataTable
        title="Liste des Commandes"
        columns={columns}
        data={orders || []}
        actions={{
          view: handleViewOrder,
          edit: (row) => console.log('Edit', row),
        }}
        pagination={{
          pageSize: 10,
          currentPage: 1,
          totalItems: orders?.length || 0,
          onPageChange: (page) => console.log('Page change:', page)
        }}
      />

      {/* Modal de détails */}
      {selectedOrder && (
        <OrderDetailModal 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
        />
      )}
    </div>
  );
};

export default OrdersPage;