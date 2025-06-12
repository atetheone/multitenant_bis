import React from 'react';
import { 
  ShoppingCart, 
  Package, 
  Users, 
  TrendingUp, 
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Truck,
  MapPin,
  Building,
  Store
} from 'lucide-react';
import { DashboardStats } from '../../types';
import { usePermissions } from '../../hooks/usePermissions';
import { useAuth } from '../../contexts/AuthContext';
import PermissionGate from '../../components/common/PermissionGate';

const DashboardHomePage: React.FC = () => {
  const { isDelivery, isManager, isAdmin, isSuperAdmin } = usePermissions();
  const { currentUser } = useAuth();
  
  // Mock data - in real app, this would come from API based on user role and permissions
  const stats: DashboardStats = {
    totalOrders: isDelivery ? 45 : isSuperAdmin ? 3247 : 1247,
    totalRevenue: isDelivery ? 0 : isSuperAdmin ? 8750000 : 2850000, // en FCFA
    totalProducts: isDelivery ? 0 : isSuperAdmin ? 456 : 156,
    totalCustomers: isDelivery ? 0 : isSuperAdmin ? 2892 : 892,
    pendingOrders: isDelivery ? 8 : isSuperAdmin ? 67 : 23,
    monthlyGrowth: 12.5,
    assignedDeliveries: isDelivery ? 12 : undefined,
    completedDeliveries: isDelivery ? 37 : undefined,
    totalTenants: isSuperAdmin ? 24 : undefined,
    totalCommissions: isSuperAdmin ? 437500 : undefined // 5% des ventes
  };

  const recentOrders = [
    { id: '1', customer: 'Aminata Diallo', total: 45000, status: 'pending', time: '2h', zone: 'Dakar Centre', tenant: 'Tech Paradise' },
    { id: '2', customer: 'Moussa Sow', total: 78000, status: 'confirmed', time: '4h', zone: 'Pikine', tenant: 'Éco Produits' },
    { id: '3', customer: 'Fatou Ndiaye', total: 32000, status: 'delivered', time: '1j', zone: 'Rufisque', tenant: 'Tech Paradise' },
    { id: '4', customer: 'Ibrahima Fall', total: 95000, status: 'in_transit', time: '2j', zone: 'Thiès', tenant: 'Éco Produits' },
  ];

  const deliveryAssignments = [
    { id: '1', order: 'CMD-001', customer: 'Aminata Diallo', zone: 'Dakar Centre', status: 'assigned', time: '1h' },
    { id: '2', order: 'CMD-002', customer: 'Moussa Sow', zone: 'Pikine', status: 'picked_up', time: '3h' },
    { id: '3', order: 'CMD-003', customer: 'Fatou Ndiaye', zone: 'Dakar Centre', status: 'in_transit', time: '5h' },
  ];

  const topTenants = [
    { id: '1', name: 'Tech Paradise', orders: 156, revenue: 1250000, growth: 15.2 },
    { id: '2', name: 'Éco Produits', orders: 98, revenue: 890000, growth: 8.7 },
    { id: '3', name: 'Mode Africaine', orders: 67, revenue: 567000, growth: 22.1 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'confirmed': return 'text-blue-600 bg-blue-100';
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'in_transit': return 'text-purple-600 bg-purple-100';
      case 'assigned': return 'text-orange-600 bg-orange-100';
      case 'picked_up': return 'text-indigo-600 bg-indigo-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'confirmed': return 'Confirmée';
      case 'delivered': return 'Livrée';
      case 'in_transit': return 'En transit';
      case 'assigned': return 'Assignée';
      case 'picked_up': return 'Récupérée';
      default: return status;
    }
  };

  const getRoleTitle = () => {
    if (isSuperAdmin) return 'Super Administrateur';
    if (isAdmin && currentUser?.tenantId === '0') return 'Administrateur Marketplace';
    if (isAdmin) return 'Administrateur Tenant';
    if (isManager) return 'Gestionnaire';
    if (isDelivery) return 'Livreur';
    return 'Tableau de Bord';
  };

  const getRoleDescription = () => {
    if (isSuperAdmin) return 'Gestion complète de la plateforme JefJel et de tous les tenants';
    if (isAdmin && currentUser?.tenantId === '0') return 'Gestion du marketplace et supervision des tenants';
    if (isAdmin) return 'Gestion de votre tenant et équipe';
    if (isManager) return 'Assistance à la gestion des opérations';
    if (isDelivery) return 'Gestion de vos livraisons et zones assignées';
    return 'Aperçu de votre activité';
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{getRoleTitle()}</h1>
        <p className="mt-1 text-sm text-gray-600">{getRoleDescription()}</p>
        {currentUser?.tenantId && currentUser.tenantId !== '0' && (
          <p className="mt-1 text-xs text-blue-600">Tenant ID: {currentUser.tenantId}</p>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Orders Stats */}
        <PermissionGate permissions={['view_orders']} fallback={
          isDelivery ? (
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Truck className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Livraisons Assignées
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stats.assignedDeliveries}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ) : null
        }>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ShoppingCart className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Commandes
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.totalOrders.toLocaleString()}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </PermissionGate>

        {/* Revenue Stats */}
        <PermissionGate permissions={['view_financial_reports']} fallback={
          isDelivery ? (
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Livraisons Complétées
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stats.completedDeliveries}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ) : null
        }>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <DollarSign className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {isSuperAdmin ? 'CA Total Marketplace' : 'Chiffre d\'Affaires'}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.totalRevenue.toLocaleString()} FCFA
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </PermissionGate>

        {/* Products/Tenants Stats */}
        <PermissionGate permissions={['view_products', 'view_all_tenants']}>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {isSuperAdmin ? (
                    <Building className="h-6 w-6 text-gray-400" />
                  ) : (
                    <Package className="h-6 w-6 text-gray-400" />
                  )}
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {isSuperAdmin ? 'Tenants Actifs' : 'Produits Actifs'}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {isSuperAdmin ? stats.totalTenants : stats.totalProducts}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </PermissionGate>

        {/* Customers/Commissions Stats */}
        <PermissionGate permissions={['view_customers']}>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {isSuperAdmin ? (
                    <Store className="h-6 w-6 text-gray-400" />
                  ) : (
                    <Users className="h-6 w-6 text-gray-400" />
                  )}
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {isSuperAdmin ? 'Commissions Marketplace' : 'Clients'}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {isSuperAdmin 
                        ? `${stats.totalCommissions?.toLocaleString()} FCFA`
                        : stats.totalCustomers.toLocaleString()
                      }
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </PermissionGate>
      </div>

      {/* Quick Actions & Recent Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Actions Rapides
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <PermissionGate permissions={['create_product', 'create_tenant']}>
                <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  {isSuperAdmin ? (
                    <>
                      <Building className="h-8 w-8 text-blue-600 mb-2" />
                      <span className="text-sm font-medium text-gray-900">Créer Tenant</span>
                    </>
                  ) : (
                    <>
                      <Package className="h-8 w-8 text-blue-600 mb-2" />
                      <span className="text-sm font-medium text-gray-900">Ajouter Produit</span>
                    </>
                  )}
                </button>
              </PermissionGate>
              
              <PermissionGate permissions={['view_orders']}>
                <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Clock className="h-8 w-8 text-yellow-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">
                    {isDelivery ? 'Livraisons en Cours' : 'Commandes en Attente'}
                  </span>
                  {stats.pendingOrders > 0 && (
                    <span className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {stats.pendingOrders}
                    </span>
                  )}
                </button>
              </PermissionGate>
              
              <PermissionGate permissions={['view_analytics']}>
                <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <TrendingUp className="h-8 w-8 text-green-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">
                    {isSuperAdmin ? 'Analytics Globales' : 'Statistiques'}
                  </span>
                </button>
              </PermissionGate>
              
              <PermissionGate permissions={['view_customers', 'view_all_tenants']} fallback={
                isDelivery ? (
                  <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <MapPin className="h-8 w-8 text-purple-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900">Mes Zones</span>
                  </button>
                ) : null
              }>
                <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  {isSuperAdmin ? (
                    <>
                      <Building className="h-8 w-8 text-purple-600 mb-2" />
                      <span className="text-sm font-medium text-gray-900">Gérer Tenants</span>
                    </>
                  ) : (
                    <>
                      <Users className="h-8 w-8 text-purple-600 mb-2" />
                      <span className="text-sm font-medium text-gray-900">Clients</span>
                    </>
                  )}
                </button>
              </PermissionGate>
            </div>
          </div>
        </div>

        {/* Recent Orders, Deliveries, or Top Tenants */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              {isDelivery 
                ? 'Livraisons Assignées' 
                : isSuperAdmin 
                  ? 'Top Tenants' 
                  : 'Commandes Récentes'
              }
            </h3>
            <div className="space-y-4">
              {isSuperAdmin ? (
                // Top Tenants for Super Admin
                topTenants.map((tenant) => (
                  <div key={tenant.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{tenant.name}</p>
                      <p className="text-sm text-gray-500">
                        {tenant.orders} commandes • {tenant.revenue.toLocaleString()} FCFA
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        +{tenant.growth}%
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                // Orders or Deliveries
                (isDelivery ? deliveryAssignments : recentOrders).map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {isDelivery ? `${item.order} - ${item.customer}` : item.customer}
                      </p>
                      <p className="text-sm text-gray-500">
                        {isDelivery 
                          ? `Zone: ${item.zone}` 
                          : `${item.total.toLocaleString()} FCFA • ${item.tenant}`
                        }
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {getStatusText(item.status)}
                      </span>
                      <span className="text-xs text-gray-500">{item.time}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Growth Indicator */}
      <PermissionGate permissions={['view_analytics']}>
        <div className="mt-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">
                {isDelivery 
                  ? 'Performance de Livraison' 
                  : isSuperAdmin 
                    ? 'Croissance Marketplace' 
                    : 'Croissance Mensuelle'
                }
              </h3>
              <p className="text-blue-100">
                {isDelivery 
                  ? 'Votre efficacité ce mois-ci' 
                  : isSuperAdmin 
                    ? 'Performance globale de JefJel' 
                    : 'Votre performance ce mois-ci'
                }
              </p>
            </div>
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 mr-2" />
              <span className="text-2xl font-bold">
                {isDelivery ? '95%' : `+${stats.monthlyGrowth}%`}
              </span>
            </div>
          </div>
        </div>
      </PermissionGate>
    </div>
  );
};

export default DashboardHomePage;