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
  Store,
  Plus,
  Eye,
  BarChart3
} from 'lucide-react';
import { usePermissions } from '../../hooks/usePermissions';
import { useAuth } from '../../contexts/AuthContext';
import PermissionGate from '../../components/common/PermissionGate';
import StatsCard from '../../components/dashboard/StatsCard';
import Chart from '../../components/dashboard/Chart';
import DataTable from '../../components/dashboard/DataTable';
import ActivityFeed from '../../components/dashboard/ActivityFeed';
import QuickActions from '../../components/dashboard/QuickActions';
import MetricCard from '../../components/dashboard/MetricCard';
import ProgressCard from '../../components/dashboard/ProgressCard';

const DashboardHomePage: React.FC = () => {
  const { isDelivery, isManager, isAdmin, isSuperAdmin } = usePermissions();
  const { currentUser } = useAuth();
  
  // Mock data - in real app, this would come from API based on user role and permissions
  const stats = {
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

  // Chart data
  const salesData = [
    { label: 'Jan', value: 65000 },
    { label: 'Fév', value: 78000 },
    { label: 'Mar', value: 82000 },
    { label: 'Avr', value: 91000 },
    { label: 'Mai', value: 87000 },
    { label: 'Jun', value: 95000 },
  ];

  const categoryData = [
    { label: 'Électronique', value: 45, color: '#3B82F6' },
    { label: 'Mode', value: 30, color: '#10B981' },
    { label: 'Maison', value: 15, color: '#F59E0B' },
    { label: 'Autres', value: 10, color: '#EF4444' },
  ];

  const topProductsData = [
    { label: 'Écouteurs Sans Fil', value: 156 },
    { label: 'Montre Connectée', value: 134 },
    { label: 'Smartphone', value: 98 },
    { label: 'Ordinateur Portable', value: 87 },
    { label: 'Tablette', value: 76 },
  ];

  // Recent orders data
  const recentOrders = [
    { 
      id: 'CMD-001', 
      customer: 'Aminata Diallo', 
      total: '45 000 FCFA', 
      status: 'En attente',
      date: '2024-01-15',
      tenant: 'Tech Paradise'
    },
    { 
      id: 'CMD-002', 
      customer: 'Moussa Sow', 
      total: '78 000 FCFA', 
      status: 'Confirmée',
      date: '2024-01-15',
      tenant: 'Éco Produits'
    },
    { 
      id: 'CMD-003', 
      customer: 'Fatou Ndiaye', 
      total: '32 000 FCFA', 
      status: 'Livrée',
      date: '2024-01-14',
      tenant: 'Tech Paradise'
    },
  ];

  const orderColumns = [
    { key: 'id', label: 'ID Commande', sortable: true },
    { key: 'customer', label: 'Client', sortable: true },
    { key: 'total', label: 'Total', sortable: true },
    { 
      key: 'status', 
      label: 'Statut', 
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Livrée' ? 'bg-green-100 text-green-800' :
          value === 'Confirmée' ? 'bg-blue-100 text-blue-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'tenant', label: 'Vendeur' },
  ];

  // Activities data
  const activities = [
    {
      id: '1',
      type: 'order' as const,
      title: 'Nouvelle commande reçue',
      description: 'Commande CMD-001 de Aminata Diallo pour 45 000 FCFA',
      timestamp: '2024-01-15T10:30:00Z',
      status: 'info' as const,
      user: { name: 'Aminata Diallo' }
    },
    {
      id: '2',
      type: 'product' as const,
      title: 'Produit ajouté',
      description: 'Nouveau produit "Écouteurs Bluetooth" ajouté au catalogue',
      timestamp: '2024-01-15T09:15:00Z',
      status: 'success' as const,
      user: { name: 'Marie Martin' }
    },
    {
      id: '3',
      type: 'delivery' as const,
      title: 'Livraison terminée',
      description: 'Commande CMD-002 livrée avec succès à Dakar Centre',
      timestamp: '2024-01-15T08:45:00Z',
      status: 'success' as const,
      user: { name: 'Amadou Ba' }
    },
  ];

  // Quick actions
  const quickActions = [
    {
      id: '1',
      title: isSuperAdmin ? 'Créer Tenant' : 'Ajouter Produit',
      description: isSuperAdmin ? 'Créer un nouveau tenant vendeur' : 'Ajouter un nouveau produit',
      icon: isSuperAdmin ? Building : Plus,
      color: 'blue' as const,
      onClick: () => console.log('Action 1'),
    },
    {
      id: '2',
      title: isDelivery ? 'Mes Livraisons' : 'Commandes en Attente',
      description: isDelivery ? 'Voir mes livraisons assignées' : 'Gérer les commandes en attente',
      icon: isDelivery ? Truck : Clock,
      color: 'yellow' as const,
      onClick: () => console.log('Action 2'),
      badge: stats.pendingOrders > 0 ? { text: stats.pendingOrders.toString(), color: 'red' as const } : undefined,
    },
    {
      id: '3',
      title: 'Statistiques',
      description: isSuperAdmin ? 'Analytics globales' : 'Voir les performances',
      icon: BarChart3,
      color: 'green' as const,
      onClick: () => console.log('Action 3'),
    },
    {
      id: '4',
      title: isSuperAdmin ? 'Gérer Tenants' : isDelivery ? 'Mes Zones' : 'Clients',
      description: isSuperAdmin ? 'Administrer les tenants' : isDelivery ? 'Zones de livraison' : 'Gérer les clients',
      icon: isSuperAdmin ? Building : isDelivery ? MapPin : Users,
      color: 'purple' as const,
      onClick: () => console.log('Action 4'),
    },
  ];

  // Progress data
  const progressItems = [
    { label: 'Objectif Mensuel', value: 87000, target: 100000 },
    { label: 'Commandes Traitées', value: 156, target: 200 },
    { label: 'Satisfaction Client', value: 4.8, target: 5.0 },
  ];

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
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{getRoleTitle()}</h1>
        <p className="mt-2 text-gray-600">{getRoleDescription()}</p>
        {currentUser?.tenantId && currentUser.tenantId !== '0' && (
          <p className="mt-1 text-sm text-blue-600">Tenant ID: {currentUser.tenantId}</p>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <PermissionGate permissions={['view_orders']} fallback={
          isDelivery ? (
            <StatsCard
              title="Livraisons Assignées"
              value={stats.assignedDeliveries || 0}
              icon={Truck}
              color="blue"
              change={{ value: 8.2, type: 'increase' }}
            />
          ) : null
        }>
          <StatsCard
            title="Total Commandes"
            value={stats.totalOrders.toLocaleString()}
            icon={ShoppingCart}
            color="blue"
            change={{ value: 12.5, type: 'increase' }}
          />
        </PermissionGate>

        <PermissionGate permissions={['view_financial_reports']} fallback={
          isDelivery ? (
            <StatsCard
              title="Livraisons Complétées"
              value={stats.completedDeliveries || 0}
              icon={CheckCircle}
              color="green"
              change={{ value: 15.3, type: 'increase' }}
            />
          ) : null
        }>
          <StatsCard
            title={isSuperAdmin ? 'CA Total Marketplace' : 'Chiffre d\'Affaires'}
            value={`${stats.totalRevenue.toLocaleString()} FCFA`}
            icon={DollarSign}
            color="green"
            change={{ value: 18.7, type: 'increase' }}
          />
        </PermissionGate>

        <PermissionGate permissions={['view_products', 'view_all_tenants']}>
          <StatsCard
            title={isSuperAdmin ? 'Tenants Actifs' : 'Produits Actifs'}
            value={isSuperAdmin ? stats.totalTenants : stats.totalProducts}
            icon={isSuperAdmin ? Building : Package}
            color="purple"
            change={{ value: 5.2, type: 'increase' }}
          />
        </PermissionGate>

        <PermissionGate permissions={['view_customers']}>
          <StatsCard
            title={isSuperAdmin ? 'Commissions Marketplace' : 'Clients'}
            value={isSuperAdmin 
              ? `${stats.totalCommissions?.toLocaleString()} FCFA`
              : stats.totalCustomers.toLocaleString()
            }
            icon={isSuperAdmin ? Store : Users}
            color="yellow"
            change={{ value: 7.8, type: 'increase' }}
          />
        </PermissionGate>
      </div>

      {/* Charts Section */}
      <PermissionGate permissions={['view_analytics']}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Chart
            title="Évolution des Ventes"
            data={salesData}
            type="line"
            height={300}
          />
          
          <Chart
            title="Répartition par Catégorie"
            data={categoryData}
            type="doughnut"
            height={300}
          />
        </div>
      </PermissionGate>

      {/* Metrics and Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <PermissionGate permissions={['view_analytics']}>
            <Chart
              title="Top Produits"
              data={topProductsData}
              type="bar"
              height={300}
              showLegend={false}
            />
          </PermissionGate>
        </div>
        
        <PermissionGate permissions={['view_analytics']}>
          <ProgressCard
            title="Objectifs du Mois"
            icon={TrendingUp}
            items={progressItems}
          />
        </PermissionGate>
      </div>

      {/* Quick Actions and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <QuickActions actions={quickActions} />
        <ActivityFeed activities={activities} />
      </div>

      {/* Recent Orders Table */}
      <PermissionGate permissions={['view_orders']}>
        <DataTable
          title="Commandes Récentes"
          columns={orderColumns}
          data={recentOrders}
          actions={{
            view: (row) => console.log('View', row),
            edit: (row) => console.log('Edit', row),
          }}
        />
      </PermissionGate>

      {/* Performance Metrics */}
      <PermissionGate permissions={['view_analytics']}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Taux de Conversion"
            value="3.2"
            format="percentage"
            trend="up"
            trendValue={0.5}
            subtitle="vs mois dernier"
            color="green"
          />
          
          <MetricCard
            title="Panier Moyen"
            value={67500}
            format="currency"
            trend="up"
            trendValue={12.3}
            subtitle="vs mois dernier"
            color="blue"
          />
          
          <MetricCard
            title="Satisfaction Client"
            value="4.8"
            previousValue="4.6"
            trend="up"
            trendValue={4.3}
            subtitle="sur 5 étoiles"
            color="yellow"
          />
        </div>
      </PermissionGate>
    </div>
  );
};

export default DashboardHomePage;