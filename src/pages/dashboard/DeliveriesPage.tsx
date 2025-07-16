import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  User,
  Phone,
  Package,
  Navigation,
  Calendar,
  DollarSign,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit
} from 'lucide-react';
import { usePermissions } from '../../hooks/usePermissions';
import { useDeliveries, useUpdateDeliveryStatus } from '../../hooks/useSupabase';
import DataTable from '../../components/dashboard/DataTable';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const DeliveriesPage: React.FC = () => {
  const { isDelivery } = usePermissions();
  const { data: deliveries, loading, error, refetch } = useDeliveries();
  const updateDeliveryStatus = useUpdateDeliveryStatus();
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock deliveries data
  const mockDeliveries = [
    {
      id: 'LIV-001',
      orderId: 'CMD-001',
      customer: 'Aminata Diallo',
      customerPhone: '+221 77 123 45 67',
      address: '123 Rue de la Paix, Dakar',
      zone: 'Dakar Centre',
      deliveryPerson: 'Amadou Ba',
      deliveryPersonPhone: '+221 77 123 45 67',
      status: 'assigned',
      assignedAt: '2024-01-15T10:30:00Z',
      estimatedDelivery: '2024-01-15T14:30:00Z',
      actualDelivery: null,
      deliveryFee: 1500,
      orderValue: 45000,
      items: 2,
      notes: 'Appeler avant livraison',
      priority: 'normal'
    },
    {
      id: 'LIV-002',
      orderId: 'CMD-002',
      customer: 'Moussa Sow',
      customerPhone: '+221 77 234 56 78',
      address: '456 Avenue Bourguiba, Pikine',
      zone: 'Dakar Banlieue',
      deliveryPerson: 'Amadou Ba',
      deliveryPersonPhone: '+221 77 123 45 67',
      status: 'in_transit',
      assignedAt: '2024-01-15T09:00:00Z',
      estimatedDelivery: '2024-01-15T15:00:00Z',
      actualDelivery: null,
      deliveryFee: 2000,
      orderValue: 78000,
      items: 1,
      notes: 'Fragile - Manipuler avec précaution',
      priority: 'high'
    },
    {
      id: 'LIV-003',
      orderId: 'CMD-003',
      customer: 'Fatou Ndiaye',
      customerPhone: '+221 77 345 67 89',
      address: '789 Boulevard de la République, Rufisque',
      zone: 'Rufisque',
      deliveryPerson: 'Ousmane Diop',
      deliveryPersonPhone: '+221 77 987 65 43',
      status: 'delivered',
      assignedAt: '2024-01-14T08:00:00Z',
      estimatedDelivery: '2024-01-14T16:00:00Z',
      actualDelivery: '2024-01-14T15:30:00Z',
      deliveryFee: 2500,
      orderValue: 32000,
      items: 3,
      notes: 'Livraison réussie',
      priority: 'normal'
    },
    {
      id: 'LIV-004',
      orderId: 'CMD-004',
      customer: 'Ibrahima Fall',
      customerPhone: '+221 77 456 78 90',
      address: '321 Rue de Thiès, Thiès',
      zone: 'Thiès',
      deliveryPerson: 'Mamadou Sy',
      deliveryPersonPhone: '+221 77 111 22 33',
      status: 'failed',
      assignedAt: '2024-01-13T10:00:00Z',
      estimatedDelivery: '2024-01-13T18:00:00Z',
      actualDelivery: null,
      deliveryFee: 3500,
      orderValue: 125000,
      items: 4,
      notes: 'Client absent - Nouvelle tentative programmée',
      priority: 'high'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'picked_up': return 'bg-purple-100 text-purple-800';
      case 'in_transit': return 'bg-orange-100 text-orange-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'assigned': return 'Assignée';
      case 'picked_up': return 'Récupérée';
      case 'in_transit': return 'En transit';
      case 'delivered': return 'Livrée';
      case 'failed': return 'Échec';
      default: return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'normal': return 'text-gray-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const columns = [
    { key: 'id', label: 'ID Livraison', sortable: true },
    { key: 'orderId', label: 'Commande', sortable: true },
    { key: 'customer', label: 'Client', sortable: true },
    { key: 'zone', label: 'Zone', sortable: true },
    { key: 'deliveryPerson', label: 'Livreur', sortable: true },
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
      key: 'priority', 
      label: 'Priorité', 
      render: (value: string) => (
        <span className={`font-medium ${getPriorityColor(value)}`}>
          {value === 'high' ? 'Haute' : value === 'low' ? 'Basse' : 'Normale'}
        </span>
      )
    },
    { 
      key: 'estimatedDelivery', 
      label: 'Livraison prévue', 
      sortable: true,
      render: (value: string) => new Date(value).toLocaleString('fr-FR')
    }
  ];

  const handleViewDelivery = (delivery: any) => {
    setSelectedDelivery(delivery);
  };

  const handleUpdateStatus = async (deliveryId: number, newStatus: string) => {
    try {
      await updateDeliveryStatus.mutate({ 
        id: deliveryId, 
        status: newStatus,
        notes: `Statut mis à jour vers ${newStatus} le ${new Date().toLocaleString()}`
      });
      refetch();
      alert(`Statut de la livraison mis à jour avec succès`);
    } catch (error) {
      console.error('Error updating delivery status:', error);
      alert('Erreur lors de la mise à jour du statut');
    }
  };

  const DeliveryDetailModal = ({ delivery, onClose }: { delivery: any; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Détails de la livraison {delivery.id}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              ×
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Informations de livraison */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <Truck className="w-5 h-5 mr-2" />
              Informations de Livraison
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">ID Livraison</p>
                <p className="font-medium">{delivery.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Commande associée</p>
                <p className="font-medium">{delivery.orderId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Zone de livraison</p>
                <p className="font-medium flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {delivery.zone}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Priorité</p>
                <p className={`font-medium ${getPriorityColor(delivery.priority)}`}>
                  {delivery.priority === 'high' ? 'Haute' : delivery.priority === 'low' ? 'Basse' : 'Normale'}
                </p>
              </div>
            </div>
          </div>

          {/* Informations client */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Informations Client
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Nom du client</p>
                <p className="font-medium">{delivery.customer}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Téléphone</p>
                <p className="font-medium flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  {delivery.customerPhone}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600">Adresse de livraison</p>
                <p className="font-medium flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {delivery.address}
                </p>
              </div>
            </div>
          </div>

          {/* Informations livreur */}
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <Navigation className="w-5 h-5 mr-2" />
              Livreur Assigné
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Nom du livreur</p>
                <p className="font-medium">{delivery.deliveryPerson}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Téléphone</p>
                <p className="font-medium flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  {delivery.deliveryPersonPhone}
                </p>
              </div>
            </div>
          </div>

          {/* Détails de la commande */}
          <div className="bg-yellow-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Détails de la Commande
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Nombre d'articles</p>
                <p className="font-medium">{delivery.items} articles</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Valeur de la commande</p>
                <p className="font-medium">{delivery.orderValue.toLocaleString()} FCFA</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Frais de livraison</p>
                <p className="font-medium">{delivery.deliveryFee.toLocaleString()} FCFA</p>
              </div>
            </div>
          </div>

          {/* Chronologie */}
          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Chronologie
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Assignée le</p>
                <p className="font-medium flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(delivery.assignedAt).toLocaleString('fr-FR')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Livraison prévue</p>
                <p className="font-medium flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {new Date(delivery.estimatedDelivery).toLocaleString('fr-FR')}
                </p>
              </div>
              {delivery.actualDelivery && (
                <div>
                  <p className="text-sm text-gray-600">Livrée le</p>
                  <p className="font-medium flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                    {new Date(delivery.actualDelivery).toLocaleString('fr-FR')}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          {delivery.notes && (
            <div className="bg-orange-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Notes</h3>
              <p className="text-gray-700">{delivery.notes}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-4">
            <select 
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleUpdateStatus(Number(delivery.id), e.target.value)}
              defaultValue={delivery.status}
            >
              <option value="assigned">Assignée</option>
              <option value="picked_up">Récupérée</option>
              <option value="in_transit">En transit</option>
              <option value="delivered">Livrée</option>
              <option value="failed">Échec</option>
            </select>
            <Button variant="primary">Mettre à jour le statut</Button>
            <Button variant="outline">Contacter le client</Button>
            <Button variant="outline">Contacter le livreur</Button>
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
          <h1 className="text-2xl font-bold text-gray-900">
            {isDelivery ? 'Mes Livraisons' : 'Gestion des Livraisons'}
          </h1>
          <p className="text-gray-600">
            {isDelivery 
              ? 'Suivez vos livraisons assignées et mettez à jour leur statut'
              : 'Gérez toutes les livraisons et assignez les livreurs'
            }
          </p>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline" className="flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
          {!isDelivery && (
            <Button variant="primary" className="flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Assigner Livraison
            </Button>
          )}
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <Truck className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">
                {isDelivery ? 'Mes Livraisons' : 'Total Livraisons'}
              </p>
              <p className="text-2xl font-bold text-gray-900">{mockDeliveries.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-full">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">En Transit</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockDeliveries.filter(d => d.status === 'in_transit').length}
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
                {mockDeliveries.filter(d => d.status === 'delivered').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-full">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Échecs</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockDeliveries.filter(d => d.status === 'failed').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            <option value="assigned">Assignées</option>
            <option value="in_transit">En transit</option>
            <option value="delivered">Livrées</option>
            <option value="failed">Échecs</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="all">Toutes les zones</option>
            <option value="dakar-centre">Dakar Centre</option>
            <option value="dakar-banlieue">Dakar Banlieue</option>
            <option value="rufisque">Rufisque</option>
            <option value="thies">Thiès</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="all">Toutes les priorités</option>
            <option value="high">Haute</option>
            <option value="normal">Normale</option>
            <option value="low">Basse</option>
          </select>
        </div>
      </div>

      {/* Table des livraisons */}
      <DataTable
        title="Liste des Livraisons"
        columns={columns}
        data={deliveries || []}
        actions={{
          view: handleViewDelivery,
          edit: (row) => console.log('Edit', row),
        }}
        pagination={{
          pageSize: 10,
          currentPage: 1,
          totalItems: deliveries?.length || 0,
          onPageChange: (page) => console.log('Page change:', page)
        }}
      />

      {/* Modal de détails */}
      {selectedDelivery && (
        <DeliveryDetailModal 
          delivery={selectedDelivery} 
          onClose={() => setSelectedDelivery(null)} 
        />
      )}
    </div>
  );
};

export default DeliveriesPage;