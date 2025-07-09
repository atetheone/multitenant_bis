import React, { useState } from 'react';
import { 
  Shield, 
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  Search,
  Filter,
  Download,
  Users,
  Lock,
  Unlock,
  CheckCircle,
  XCircle,
  Settings,
  UserCheck
} from 'lucide-react';
import { usePermissions } from '../../hooks/usePermissions';
import DataTable from '../../components/dashboard/DataTable';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

interface Role {
  id: number;
  name: string;
  display_name: string;
  description: string;
  permissions: Permission[];
  users_count: number;
  is_system_role: boolean;
  tenant_id?: number;
  created_at: string;
  updated_at: string;
}

interface Permission {
  id: number;
  resource: string;
  action: string;
  scope: 'all' | 'tenant' | 'own' | 'dept';
  display_name: string;
  description: string;
}

const RolesPage: React.FC = () => {
  const { isSuperAdmin, isAdmin } = usePermissions();
  
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);

  // Mock data pour les rôles
  const mockRoles: Role[] = [
    {
      id: 1,
      name: 'super-admin',
      display_name: 'Super Administrateur',
      description: 'Accès complet au système, gestion du marketplace et création de tenants',
      permissions: [],
      users_count: 1,
      is_system_role: true,
      created_at: '2023-01-01T00:00:00Z',
      updated_at: '2023-01-01T00:00:00Z'
    },
    {
      id: 2,
      name: 'admin',
      display_name: 'Administrateur',
      description: 'Gestion complète d\'un tenant spécifique ou du marketplace',
      permissions: [],
      users_count: 3,
      is_system_role: true,
      created_at: '2023-01-01T00:00:00Z',
      updated_at: '2023-01-01T00:00:00Z'
    },
    {
      id: 3,
      name: 'manager',
      display_name: 'Gestionnaire',
      description: 'Représentant du tenant avec permissions personnalisables',
      permissions: [],
      users_count: 2,
      is_system_role: true,
      created_at: '2023-01-01T00:00:00Z',
      updated_at: '2023-01-01T00:00:00Z'
    },
    {
      id: 4,
      name: 'delivery',
      display_name: 'Livreur',
      description: 'Gestion des livraisons et zones assignées',
      permissions: [],
      users_count: 5,
      is_system_role: true,
      created_at: '2023-01-01T00:00:00Z',
      updated_at: '2023-01-01T00:00:00Z'
    },
    {
      id: 5,
      name: 'customer',
      display_name: 'Client',
      description: 'Accès client standard',
      permissions: [],
      users_count: 150,
      is_system_role: true,
      created_at: '2023-01-01T00:00:00Z',
      updated_at: '2023-01-01T00:00:00Z'
    },
    {
      id: 6,
      name: 'custom-manager',
      display_name: 'Gestionnaire Personnalisé',
      description: 'Rôle personnalisé pour la gestion spécifique',
      permissions: [],
      users_count: 3,
      is_system_role: false,
      tenant_id: 2,
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    }
  ];

  // Mock data pour les permissions
  const mockPermissions: Permission[] = [
    // Gestion des tenants
    { id: 1, resource: 'tenant', action: 'create', scope: 'all', display_name: 'Créer Tenant', description: 'Créer de nouveaux tenants' },
    { id: 2, resource: 'tenant', action: 'read', scope: 'all', display_name: 'Voir Tenants', description: 'Voir tous les tenants' },
    { id: 3, resource: 'tenant', action: 'update', scope: 'tenant', display_name: 'Modifier Tenant', description: 'Modifier les tenants' },
    { id: 4, resource: 'tenant', action: 'delete', scope: 'all', display_name: 'Supprimer Tenant', description: 'Supprimer des tenants' },
    
    // Gestion des utilisateurs
    { id: 5, resource: 'user', action: 'create', scope: 'tenant', display_name: 'Créer Utilisateur', description: 'Créer de nouveaux utilisateurs' },
    { id: 6, resource: 'user', action: 'read', scope: 'tenant', display_name: 'Voir Utilisateurs', description: 'Voir les utilisateurs' },
    { id: 7, resource: 'user', action: 'update', scope: 'tenant', display_name: 'Modifier Utilisateur', description: 'Modifier les utilisateurs' },
    { id: 8, resource: 'user', action: 'delete', scope: 'tenant', display_name: 'Supprimer Utilisateur', description: 'Supprimer des utilisateurs' },
    
    // Gestion des produits
    { id: 9, resource: 'product', action: 'create', scope: 'tenant', display_name: 'Créer Produit', description: 'Créer de nouveaux produits' },
    { id: 10, resource: 'product', action: 'read', scope: 'tenant', display_name: 'Voir Produits', description: 'Voir les produits' },
    { id: 11, resource: 'product', action: 'update', scope: 'tenant', display_name: 'Modifier Produit', description: 'Modifier les produits' },
    { id: 12, resource: 'product', action: 'delete', scope: 'tenant', display_name: 'Supprimer Produit', description: 'Supprimer des produits' },
    
    // Gestion des commandes
    { id: 13, resource: 'order', action: 'read', scope: 'tenant', display_name: 'Voir Commandes', description: 'Voir les commandes' },
    { id: 14, resource: 'order', action: 'update', scope: 'tenant', display_name: 'Modifier Commandes', description: 'Modifier le statut des commandes' },
    { id: 15, resource: 'order', action: 'cancel', scope: 'tenant', display_name: 'Annuler Commandes', description: 'Annuler des commandes' },
    
    // Gestion des livraisons
    { id: 16, resource: 'delivery', action: 'read', scope: 'tenant', display_name: 'Voir Livraisons', description: 'Voir les livraisons' },
    { id: 17, resource: 'delivery', action: 'update', scope: 'own', display_name: 'Modifier Livraisons', description: 'Modifier le statut des livraisons' },
    { id: 18, resource: 'delivery', action: 'assign', scope: 'tenant', display_name: 'Assigner Livraisons', description: 'Assigner des livraisons' },
    
    // Analytics
    { id: 19, resource: 'analytics', action: 'read', scope: 'tenant', display_name: 'Voir Analytics', description: 'Voir les statistiques' },
    { id: 20, resource: 'report', action: 'read', scope: 'tenant', display_name: 'Voir Rapports', description: 'Voir les rapports financiers' },
    
    // Paramètres
    { id: 21, resource: 'settings', action: 'update', scope: 'tenant', display_name: 'Modifier Paramètres', description: 'Modifier les paramètres' }
  ];

  const [roles] = useState<Role[]>(mockRoles);
  const [permissions] = useState<Permission[]>(mockPermissions);
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);

  const columns = [
    { 
      key: 'display_name', 
      label: 'Rôle', 
      sortable: true,
      render: (value: string, row: Role) => (
        <div className="flex items-center">
          <div className={`p-2 rounded-full mr-3 ${
            row.is_system_role ? 'bg-blue-100' : 'bg-green-100'
          }`}>
            <Shield className={`w-4 h-4 ${
              row.is_system_role ? 'text-blue-600' : 'text-green-600'
            }`} />
          </div>
          <div>
            <p className="font-medium text-gray-900">{value}</p>
            <p className="text-sm text-gray-500">{row.name}</p>
          </div>
        </div>
      )
    },
    { 
      key: 'description', 
      label: 'Description', 
      render: (value: string) => (
        <p className="text-sm text-gray-600 max-w-xs truncate">{value}</p>
      )
    },
    { 
      key: 'users_count', 
      label: 'Utilisateurs', 
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center">
          <Users className="w-4 h-4 text-gray-400 mr-1" />
          <span>{value}</span>
        </div>
      )
    },
    { 
      key: 'is_system_role', 
      label: 'Type', 
      render: (value: boolean) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
        }`}>
          {value ? 'Système' : 'Personnalisé'}
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

  const handleViewRole = (role: Role) => {
    setSelectedRole(role);
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setShowEditModal(true);
  };

  const handleDeleteRole = (role: Role) => {
    if (role.is_system_role) {
      alert('Impossible de supprimer un rôle système');
      return;
    }
    if (confirm(`Êtes-vous sûr de vouloir supprimer le rôle "${role.display_name}" ?`)) {
      console.log('Delete role:', role.id);
    }
  };

  const handleManagePermissions = (role: Role) => {
    setSelectedRole(role);
    setSelectedPermissions(role.permissions.map(p => p.id));
    setShowPermissionsModal(true);
  };

  const CreateRoleModal = ({ onClose }: { onClose: () => void }) => {
    const [formData, setFormData] = useState({
      name: '',
      display_name: '',
      description: '',
      permissions: [] as number[]
    });

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Créer un nouveau rôle</h2>
          </div>
          
          <div className="p-6 space-y-4">
            <Input
              label="Nom du rôle *"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="ex: custom-manager"
              fullWidth
            />
            
            <Input
              label="Nom d'affichage *"
              value={formData.display_name}
              onChange={(e) => setFormData({...formData, display_name: e.target.value})}
              placeholder="ex: Gestionnaire Personnalisé"
              fullWidth
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Description du rôle..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
              <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-md p-3">
                {permissions.map((permission) => (
                  <div key={permission.id} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`perm-${permission.id}`}
                      checked={formData.permissions.includes(permission.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            permissions: [...formData.permissions, permission.id]
                          });
                        } else {
                          setFormData({
                            ...formData,
                            permissions: formData.permissions.filter(id => id !== permission.id)
                          });
                        }
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`perm-${permission.id}`} className="ml-2 text-sm text-gray-700">
                      <span className="font-medium">{permission.display_name}</span>
                      <span className="text-gray-500 ml-1">({permission.resource}.{permission.action})</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button variant="primary">
              Créer le rôle
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const PermissionsModal = ({ role, onClose }: { role: Role; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Permissions - {role.display_name}
          </h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['tenant', 'user', 'product', 'order', 'delivery', 'analytics'].map((resource) => (
              <div key={resource} className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-3 capitalize">
                  {resource === 'tenant' && 'Tenants'}
                  {resource === 'user' && 'Utilisateurs'}
                  {resource === 'product' && 'Produits'}
                  {resource === 'order' && 'Commandes'}
                  {resource === 'delivery' && 'Livraisons'}
                  {resource === 'analytics' && 'Analytics'}
                </h3>
                <div className="space-y-2">
                  {permissions
                    .filter(p => p.resource === resource)
                    .map((permission) => (
                      <div key={permission.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`perm-${permission.id}`}
                          checked={selectedPermissions.includes(permission.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedPermissions([...selectedPermissions, permission.id]);
                            } else {
                              setSelectedPermissions(selectedPermissions.filter(id => id !== permission.id));
                            }
                          }}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          disabled={role.is_system_role}
                        />
                        <label htmlFor={`perm-${permission.id}`} className="ml-2 text-sm text-gray-700">
                          {permission.display_name}
                        </label>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
          {!role.is_system_role && (
            <Button variant="primary">
              Sauvegarder
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  const RoleDetailModal = ({ role, onClose }: { role: Role; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">
              Détails du rôle - {role.display_name}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              ×
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Informations générales */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Informations Générales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Nom du rôle</p>
                <p className="font-medium">{role.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Nom d'affichage</p>
                <p className="font-medium">{role.display_name}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600">Description</p>
                <p className="font-medium">{role.description}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Type</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  role.is_system_role ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                }`}>
                  {role.is_system_role ? 'Rôle système' : 'Rôle personnalisé'}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Utilisateurs assignés</p>
                <p className="font-medium flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {role.users_count}
                </p>
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <UserCheck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">{role.users_count}</p>
              <p className="text-sm text-gray-600">Utilisateurs</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">{role.permissions.length}</p>
              <p className="text-sm text-gray-600">Permissions</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <Settings className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-600">
                {role.is_system_role ? 'Système' : 'Custom'}
              </p>
              <p className="text-sm text-gray-600">Type</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4 pt-4 border-t">
            <Button 
              variant="primary" 
              onClick={() => handleManagePermissions(role)}
              className="flex items-center"
            >
              <Shield className="w-4 h-4 mr-2" />
              Gérer les permissions
            </Button>
            {!role.is_system_role && (
              <>
                <Button variant="outline" onClick={() => handleEditRole(role)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Modifier
                </Button>
                <Button variant="danger" className="ml-auto">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Rôles</h1>
          <p className="text-gray-600">Gérez les rôles et leurs permissions</p>
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
            <Plus className="w-4 h-4 mr-2" />
            Créer un rôle
          </Button>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Rôles</p>
              <p className="text-2xl font-bold text-gray-900">{roles.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <Settings className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Rôles Personnalisés</p>
              <p className="text-2xl font-bold text-gray-900">
                {roles.filter(r => !r.is_system_role).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <Lock className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Permissions</p>
              <p className="text-2xl font-bold text-gray-900">{permissions.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Users className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Utilisateurs Assignés</p>
              <p className="text-2xl font-bold text-gray-900">
                {roles.reduce((sum, role) => sum + role.users_count, 0)}
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
              placeholder="Rechercher par nom..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              fullWidth
            />
          </div>
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="all">Tous les types</option>
            <option value="system">Rôles système</option>
            <option value="custom">Rôles personnalisés</option>
          </select>
          <Button variant="outline" className="flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Plus de filtres
          </Button>
        </div>
      </div>

      {/* Table des rôles */}
      <DataTable
        title="Liste des Rôles"
        columns={columns}
        data={roles}
        actions={{
          view: handleViewRole,
          edit: (role: Role) => !role.is_system_role ? handleEditRole(role) : undefined,
          delete: (role: Role) => !role.is_system_role ? handleDeleteRole(role) : undefined,
        }}
        pagination={{
          pageSize: 10,
          currentPage: 1,
          totalItems: roles.length,
          onPageChange: (page) => console.log('Page change:', page)
        }}
      />

      {/* Modals */}
      {showCreateModal && (
        <CreateRoleModal onClose={() => setShowCreateModal(false)} />
      )}

      {selectedRole && !showEditModal && !showPermissionsModal && (
        <RoleDetailModal 
          role={selectedRole} 
          onClose={() => setSelectedRole(null)} 
        />
      )}

      {selectedRole && showPermissionsModal && (
        <PermissionsModal 
          role={selectedRole} 
          onClose={() => {
            setShowPermissionsModal(false);
            setSelectedRole(null);
          }} 
        />
      )}
    </div>
  );
};

export default RolesPage;