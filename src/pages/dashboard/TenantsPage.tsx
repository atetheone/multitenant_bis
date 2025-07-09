import React, { useState } from 'react';
import { 
  Building, 
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  Search,
  Filter,
  Download,
  Star,
  Users,
  Package,
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Globe,
  Mail,
  Calendar
} from 'lucide-react';
import { usePermissions } from '../../hooks/usePermissions';
import { useTenants, useCreateTenant, useUpdateTenant, useDeleteTenant } from '../../hooks/useApi';
import DataTable from '../../components/dashboard/DataTable';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const TenantsPage: React.FC = () => {
  const { isSuperAdmin } = usePermissions();
  const { data: tenants, loading, error, refetch } = useTenants();
  const createTenantMutation = useCreateTenant();
  const updateTenantMutation = useUpdateTenant();
  const deleteTenantMutation = useDeleteTenant();
  
  const [selectedTenant, setSelectedTenant] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'inactive': return 'Inactif';
      case 'suspended': return 'Suspendu';
      case 'pending': return 'En attente';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'inactive': return <XCircle className="w-4 h-4" />;
      case 'suspended': return <AlertCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return null;
    }
  };

  const columns = [
    { 
      key: 'name', 
      label: 'Tenant', 
      sortable: true,
      render: (value: string, row: any) => (
        <div className="flex items-center">
          {row.logo ? (
            <img 
              src={row.logo} 
              alt={value} 
              className="w-10 h-10 rounded-lg object-cover mr-3"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center mr-3">
              <Building className="w-5 h-5 text-gray-500" />
            </div>
          )}
          <div>
            <p className="font-medium text-gray-900">{value}</p>
            <p className="text-sm text-gray-500">{row.slug}</p>
          </div>
        </div>
      )
    },
    { 
      key: 'domain', 
      label: 'Domaine', 
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center">
          <Globe className="w-4 h-4 text-gray-400 mr-2" />
          <span className="text-sm">{value}</span>
        </div>
      )
    },
    { 
      key: 'product_count', 
      label: 'Produits', 
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center">
          <Package className="w-4 h-4 text-gray-400 mr-2" />
          <span>{value}</span>
        </div>
      )
    },
    { 
      key: 'rating', 
      label: 'Note', 
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center">
          <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
          <span>{value.toFixed(1)}</span>
        </div>
      )
    },
    { 
      key: 'status', 
      label: 'Statut', 
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center w-fit ${getStatusColor(value)}`}>
          {getStatusIcon(value)}
          <span className="ml-1">{getStatusText(value)}</span>
        </span>
      )
    },
    { 
      key: 'is_featured', 
      label: 'En vedette', 
      render: (value: boolean) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {value ? 'Oui' : 'Non'}
        </span>
      )
    },
    { 
      key: 'created_at', 
      label: 'Créé le', 
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString('fr-FR')
    }
  ];

  const handleViewTenant = (tenant: any) => {
    setSelectedTenant(tenant);
  };

  const handleEditTenant = (tenant: any) => {
    setSelectedTenant(tenant);
    setShowEditModal(true);
  };

  const handleDeleteTenant = async (tenant: any) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le tenant "${tenant.name}" ?`)) {
      const result = await deleteTenantMutation.mutate(tenant.id);
      if (result) {
        refetch();
      }
    }
  };

  const TenantDetailModal = ({ tenant, onClose }: { tenant: any; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">
              Détails du tenant - {tenant.name}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              ×
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Informations générales */}
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  Informations Générales
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Nom</p>
                    <p className="font-medium">{tenant.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Slug</p>
                    <p className="font-medium">{tenant.slug}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Domaine</p>
                    <p className="font-medium flex items-center">
                      <Globe className="w-4 h-4 mr-1" />
                      {tenant.domain}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Description</p>
                    <p className="font-medium">{tenant.description || 'Aucune description'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Statut</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center w-fit ${getStatusColor(tenant.status)}`}>
                      {getStatusIcon(tenant.status)}
                      <span className="ml-1">{getStatusText(tenant.status)}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Statistiques */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Statistiques
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Package className="w-5 h-5 text-blue-600 mr-1" />
                    </div>
                    <p className="text-2xl font-bold text-blue-600">{tenant.product_count}</p>
                    <p className="text-sm text-gray-600">Produits</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Star className="w-5 h-5 text-yellow-500 mr-1" />
                    </div>
                    <p className="text-2xl font-bold text-yellow-600">{tenant.rating.toFixed(1)}</p>
                    <p className="text-sm text-gray-600">Note moyenne</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image et détails visuels */}
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Identité Visuelle</h3>
                
                {/* Logo */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Logo</p>
                  {tenant.logo ? (
                    <img 
                      src={tenant.logo} 
                      alt={`Logo ${tenant.name}`} 
                      className="w-20 h-20 rounded-lg object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center border border-gray-300">
                      <Building className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Image de couverture */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">Image de couverture</p>
                  {tenant.cover_image ? (
                    <img 
                      src={tenant.cover_image} 
                      alt={`Couverture ${tenant.name}`} 
                      className="w-full h-32 rounded-lg object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="w-full h-32 rounded-lg bg-gray-200 flex items-center justify-center border border-gray-300">
                      <span className="text-gray-400 text-sm">Aucune image</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Paramètres */}
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Paramètres</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">En vedette</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      tenant.is_featured ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {tenant.is_featured ? 'Oui' : 'Non'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activité */}
          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Activité
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Créé le</p>
                <p className="font-medium">
                  {new Date(tenant.created_at).toLocaleDateString('fr-FR')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Dernière mise à jour</p>
                <p className="font-medium">
                  {new Date(tenant.updated_at).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4 pt-4 border-t">
            <Button variant="primary" onClick={() => handleEditTenant(tenant)}>
              <Edit className="w-4 h-4 mr-2" />
              Modifier
            </Button>
            <Button variant="outline">
              Voir les produits
            </Button>
            <Button variant="outline">
              Voir les utilisateurs
            </Button>
            {tenant.status === 'active' ? (
              <Button variant="outline">
                Suspendre
              </Button>
            ) : (
              <Button variant="outline">
                Activer
              </Button>
            )}
            <Button variant="danger" className="ml-auto">
              <Trash2 className="w-4 h-4 mr-2" />
              Supprimer
            </Button>
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
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Tenants</h1>
          <p className="text-gray-600">Gérez les tenants de la plateforme et leurs paramètres</p>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline" className="flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
          {isSuperAdmin && (
            <Button 
              variant="primary" 
              className="flex items-center"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Créer Tenant
            </Button>
          )}
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Tenants</p>
              <p className="text-2xl font-bold text-gray-900">{tenants?.length || 0}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Tenants Actifs</p>
              <p className="text-2xl font-bold text-gray-900">
                {tenants?.filter((t: any) => t.status === 'active').length || 0}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">En Vedette</p>
              <p className="text-2xl font-bold text-gray-900">
                {tenants?.filter((t: any) => t.is_featured).length || 0}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Produits</p>
              <p className="text-2xl font-bold text-gray-900">
                {tenants?.reduce((sum: number, t: any) => sum + t.product_count, 0) || 0}
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
              placeholder="Rechercher par nom, domaine..."
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
            <option value="active">Actifs</option>
            <option value="inactive">Inactifs</option>
            <option value="suspended">Suspendus</option>
            <option value="pending">En attente</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="all">Toutes les catégories</option>
            <option value="featured">En vedette</option>
            <option value="new">Nouveaux</option>
          </select>
          <Button variant="outline" className="flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Plus de filtres
          </Button>
        </div>
      </div>

      {/* Table des tenants */}
      <DataTable
        title="Liste des Tenants"
        columns={columns}
        data={tenants || []}
        actions={{
          view: handleViewTenant,
          edit: handleEditTenant,
          delete: isSuperAdmin ? handleDeleteTenant : undefined,
        }}
        pagination={{
          pageSize: 10,
          currentPage: 1,
          totalItems: tenants?.length || 0,
          onPageChange: (page) => console.log('Page change:', page)
        }}
      />

      {/* Modal de détails */}
      {selectedTenant && !showEditModal && (
        <TenantDetailModal 
          tenant={selectedTenant} 
          onClose={() => setSelectedTenant(null)} 
        />
      )}
    </div>
  );
};

export default TenantsPage;