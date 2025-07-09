import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Eye, 
  Edit, 
  Trash2,
  Search,
  Filter,
  Download,
  Shield,
  Mail,
  Phone,
  Calendar,
  Building,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock
} from 'lucide-react';
import { usePermissions } from '../../hooks/usePermissions';
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser } from '../../hooks/useApi';
import DataTable from '../../components/dashboard/DataTable';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const UsersPage: React.FC = () => {
  const { isSuperAdmin, isAdmin } = usePermissions();
  const { data: users, loading, error, refetch } = useUsers();
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();
  
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
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

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super-admin': return 'bg-purple-100 text-purple-800';
      case 'admin': return 'bg-blue-100 text-blue-800';
      case 'manager': return 'bg-indigo-100 text-indigo-800';
      case 'delivery': return 'bg-yellow-100 text-yellow-800';
      case 'customer': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'super-admin': return 'Super Admin';
      case 'admin': return 'Administrateur';
      case 'manager': return 'Gestionnaire';
      case 'delivery': return 'Livreur';
      case 'customer': return 'Client';
      default: return role;
    }
  };

  const columns = [
    { 
      key: 'name', 
      label: 'Utilisateur', 
      sortable: true,
      render: (value: string, row: any) => (
        <div className="flex items-center">
          {row.avatar_url ? (
            <img 
              src={row.avatar_url} 
              alt={value} 
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
              <Users className="w-5 h-5 text-gray-500" />
            </div>
          )}
          <div>
            <p className="font-medium text-gray-900">{`${row.first_name} ${row.last_name}`}</p>
            <p className="text-sm text-gray-500">{row.username}</p>
          </div>
        </div>
      )
    },
    { 
      key: 'email', 
      label: 'Email', 
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center">
          <Mail className="w-4 h-4 text-gray-400 mr-2" />
          <span>{value}</span>
        </div>
      )
    },
    { 
      key: 'role', 
      label: 'Rôle', 
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center w-fit ${getRoleColor(value)}`}>
          <Shield className="w-3 h-3 mr-1" />
          {getRoleText(value)}
        </span>
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
      key: 'last_login_at', 
      label: 'Dernière connexion', 
      sortable: true,
      render: (value: string) => value ? (
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-1" />
          {new Date(value).toLocaleDateString('fr-FR')}
        </div>
      ) : (
        <span className="text-gray-400">Jamais</span>
      )
    },
    { 
      key: 'created_at', 
      label: 'Créé le', 
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString('fr-FR')
    }
  ];

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDeleteUser = async (user: any) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur "${user.first_name} ${user.last_name}" ?`)) {
      const result = await deleteUserMutation.mutate(user.id);
      if (result) {
        refetch();
      }
    }
  };

  const UserDetailModal = ({ user, onClose }: { user: any; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">
              Profil utilisateur - {user.first_name} {user.last_name}
            </h2>
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
                <p className="text-sm text-gray-600">Nom d'utilisateur</p>
                <p className="font-medium">{user.username}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  {user.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Prénom</p>
                <p className="font-medium">{user.first_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Nom</p>
                <p className="font-medium">{user.last_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Téléphone</p>
                <p className="font-medium flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  {user.phone || 'Non renseigné'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Statut</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center w-fit ${getStatusColor(user.status)}`}>
                  {getStatusIcon(user.status)}
                  <span className="ml-1">{getStatusText(user.status)}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Rôles et permissions */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Rôles et Permissions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Rôle principal</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center w-fit ${getRoleColor(user.role)}`}>
                  <Shield className="w-3 h-3 mr-1" />
                  {getRoleText(user.role)}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tenant associé</p>
                <p className="font-medium flex items-center">
                  <Building className="w-4 h-4 mr-1" />
                  {user.tenant_name || 'Aucun'}
                </p>
              </div>
            </div>
          </div>

          {/* Activité */}
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Activité
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Compte créé le</p>
                <p className="font-medium">
                  {new Date(user.created_at).toLocaleDateString('fr-FR')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Dernière connexion</p>
                <p className="font-medium">
                  {user.last_login_at 
                    ? new Date(user.last_login_at).toLocaleDateString('fr-FR')
                    : 'Jamais connecté'
                  }
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Dernière mise à jour</p>
                <p className="font-medium">
                  {new Date(user.updated_at).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4 pt-4 border-t">
            <Button variant="primary" onClick={() => handleEditUser(user)}>
              <Edit className="w-4 h-4 mr-2" />
              Modifier
            </Button>
            <Button variant="outline">
              Réinitialiser mot de passe
            </Button>
            <Button variant="outline">
              Envoyer un email
            </Button>
            {user.status === 'active' ? (
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
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
          <p className="text-gray-600">Gérez les utilisateurs de la plateforme et leurs permissions</p>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline" className="flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
          <Button 
            variant="primary" 
            className="flex items-center"
            onClick={() => setShowCreateModal(true)}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Ajouter Utilisateur
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
              <p className="text-sm text-gray-600">Total Utilisateurs</p>
              <p className="text-2xl font-bold text-gray-900">{users?.length || 0}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Utilisateurs Actifs</p>
              <p className="text-2xl font-bold text-gray-900">
                {users?.filter((u: any) => u.status === 'active').length || 0}
              </p>
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
                {users?.filter((u: any) => u.status === 'pending').length || 0}
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
              <p className="text-sm text-gray-600">Suspendus</p>
              <p className="text-2xl font-bold text-gray-900">
                {users?.filter((u: any) => u.status === 'suspended').length || 0}
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
              placeholder="Rechercher par nom, email..."
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
          <select 
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tous les rôles</option>
            <option value="super-admin">Super Admin</option>
            <option value="admin">Administrateur</option>
            <option value="manager">Gestionnaire</option>
            <option value="delivery">Livreur</option>
            <option value="customer">Client</option>
          </select>
          <Button variant="outline" className="flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Plus de filtres
          </Button>
        </div>
      </div>

      {/* Table des utilisateurs */}
      <DataTable
        title="Liste des Utilisateurs"
        columns={columns}
        data={users || []}
        actions={{
          view: handleViewUser,
          edit: handleEditUser,
          delete: handleDeleteUser,
        }}
        pagination={{
          pageSize: 10,
          currentPage: 1,
          totalItems: users?.length || 0,
          onPageChange: (page) => console.log('Page change:', page)
        }}
      />

      {/* Modal de détails */}
      {selectedUser && !showEditModal && (
        <UserDetailModal 
          user={selectedUser} 
          onClose={() => setSelectedUser(null)} 
        />
      )}
    </div>
  );
};

export default UsersPage;