import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Users, 
  ShoppingCart,
  Package,
  Calendar,
  Download,
  Filter,
  Eye,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import Chart from '../../components/dashboard/Chart';
import MetricCard from '../../components/dashboard/MetricCard';
import Button from '../../components/common/Button';

const AnalyticsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  // Données pour les graphiques
  const revenueData = [
    { label: 'Jan', value: 125000 },
    { label: 'Fév', value: 142000 },
    { label: 'Mar', value: 138000 },
    { label: 'Avr', value: 156000 },
    { label: 'Mai', value: 149000 },
    { label: 'Jun', value: 167000 },
    { label: 'Jul', value: 178000 },
    { label: 'Aoû', value: 185000 },
    { label: 'Sep', value: 192000 },
    { label: 'Oct', value: 201000 },
    { label: 'Nov', value: 215000 },
    { label: 'Déc', value: 234000 },
  ];

  const ordersData = [
    { label: 'Jan', value: 245 },
    { label: 'Fév', value: 278 },
    { label: 'Mar', value: 265 },
    { label: 'Avr', value: 312 },
    { label: 'Mai', value: 298 },
    { label: 'Jun', value: 334 },
    { label: 'Jul', value: 356 },
    { label: 'Aoû', value: 378 },
    { label: 'Sep', value: 389 },
    { label: 'Oct', value: 412 },
    { label: 'Nov', value: 445 },
    { label: 'Déc', value: 467 },
  ];

  const categoryData = [
    { label: 'Électronique', value: 45, color: '#3B82F6' },
    { label: 'Mode', value: 30, color: '#10B981' },
    { label: 'Maison & Cuisine', value: 15, color: '#F59E0B' },
    { label: 'Santé & Beauté', value: 10, color: '#EF4444' },
  ];

  const topProductsData = [
    { label: 'Écouteurs Sans Fil', value: 156 },
    { label: 'Montre Connectée', value: 134 },
    { label: 'Smartphone', value: 98 },
    { label: 'Ordinateur Portable', value: 87 },
    { label: 'Tablette', value: 76 },
  ];

  const customerAcquisitionData = [
    { label: 'Recherche Organique', value: 35, color: '#10B981' },
    { label: 'Réseaux Sociaux', value: 25, color: '#3B82F6' },
    { label: 'Email Marketing', value: 20, color: '#8B5CF6' },
    { label: 'Publicité Payante', value: 15, color: '#F59E0B' },
    { label: 'Référencement', value: 5, color: '#EF4444' },
  ];

  const conversionFunnelData = [
    { label: 'Visiteurs', value: 10000 },
    { label: 'Vues Produits', value: 6500 },
    { label: 'Ajouts Panier', value: 2100 },
    { label: 'Commandes', value: 650 },
  ];

  // Métriques KPI
  const kpiMetrics = [
    {
      title: 'Chiffre d\'Affaires',
      value: 234000,
      previousValue: 215000,
      format: 'currency' as const,
      trend: 'up' as const,
      trendValue: 8.8,
      subtitle: 'vs mois dernier',
      color: 'green' as const
    },
    {
      title: 'Commandes',
      value: 467,
      previousValue: 445,
      format: 'number' as const,
      trend: 'up' as const,
      trendValue: 4.9,
      subtitle: 'vs mois dernier',
      color: 'blue' as const
    },
    {
      title: 'Panier Moyen',
      value: 501.07,
      previousValue: 483.15,
      format: 'currency' as const,
      trend: 'up' as const,
      trendValue: 3.7,
      subtitle: 'vs mois dernier',
      color: 'purple' as const
    },
    {
      title: 'Taux de Conversion',
      value: 6.5,
      previousValue: 6.1,
      format: 'percentage' as const,
      trend: 'up' as const,
      trendValue: 6.6,
      subtitle: 'vs mois dernier',
      color: 'yellow' as const
    },
    {
      title: 'Nouveaux Clients',
      value: 89,
      previousValue: 76,
      format: 'number' as const,
      trend: 'up' as const,
      trendValue: 17.1,
      subtitle: 'vs mois dernier',
      color: 'green' as const
    },
    {
      title: 'Taux de Rétention',
      value: 73.2,
      previousValue: 71.8,
      format: 'percentage' as const,
      trend: 'up' as const,
      trendValue: 1.9,
      subtitle: 'vs mois dernier',
      color: 'blue' as const
    }
  ];

  // Données de performance par région
  const regionPerformance = [
    { region: 'Dakar', orders: 234, revenue: 156780, growth: 12.5 },
    { region: 'Thiès', orders: 89, revenue: 67890, growth: 8.3 },
    { region: 'Saint-Louis', orders: 67, revenue: 45670, growth: 15.2 },
    { region: 'Kaolack', orders: 45, revenue: 34560, growth: -2.1 },
    { region: 'Ziguinchor', orders: 32, revenue: 23450, growth: 6.7 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Statistiques et Analytics</h1>
          <p className="text-gray-600">Analysez les performances de votre business</p>
        </div>
        <div className="flex space-x-4">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">7 derniers jours</option>
            <option value="30d">30 derniers jours</option>
            <option value="90d">3 derniers mois</option>
            <option value="1y">12 derniers mois</option>
          </select>
          <Button variant="outline" className="flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filtres
          </Button>
          <Button variant="outline" className="flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Métriques KPI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiMetrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            previousValue={metric.previousValue}
            format={metric.format}
            trend={metric.trend}
            trendValue={metric.trendValue}
            subtitle={metric.subtitle}
            color={metric.color}
          />
        ))}
      </div>

      {/* Graphiques principaux */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart
          title="Évolution du Chiffre d'Affaires"
          data={revenueData}
          type="line"
          height={350}
        />
        <Chart
          title="Évolution des Commandes"
          data={ordersData}
          type="bar"
          height={350}
        />
      </div>

      {/* Analyses par catégorie et produits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart
          title="Répartition par Catégorie"
          data={categoryData}
          type="doughnut"
          height={350}
        />
        <Chart
          title="Top Produits (Ventes)"
          data={topProductsData}
          type="bar"
          height={350}
          showLegend={false}
        />
      </div>

      {/* Acquisition clients et entonnoir de conversion */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart
          title="Sources d'Acquisition Client"
          data={customerAcquisitionData}
          type="doughnut"
          height={350}
        />
        <Chart
          title="Entonnoir de Conversion"
          data={conversionFunnelData}
          type="bar"
          height={350}
          showLegend={false}
        />
      </div>

      {/* Performance par région */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Performance par Région</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Région</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Commandes</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Chiffre d'Affaires</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Croissance</th>
              </tr>
            </thead>
            <tbody>
              {regionPerformance.map((region, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{region.region}</td>
                  <td className="py-3 px-4 text-gray-600">{region.orders}</td>
                  <td className="py-3 px-4 text-gray-600">{region.revenue.toLocaleString()} FCFA</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      {region.growth > 0 ? (
                        <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
                      )}
                      <span className={`font-medium ${
                        region.growth > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {Math.abs(region.growth)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights et recommandations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
            Insights Positifs
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Croissance des ventes :</strong> +8.8% ce mois-ci par rapport au mois dernier
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Nouveaux clients :</strong> +17.1% d'acquisition ce mois
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-800">
                <strong>Panier moyen :</strong> Augmentation de 3.7% du panier moyen
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Eye className="w-5 h-5 mr-2 text-blue-600" />
            Recommandations
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Stock :</strong> 3 produits en rupture de stock nécessitent un réapprovisionnement
              </p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <p className="text-sm text-orange-800">
                <strong>Marketing :</strong> Kaolack montre une baisse de -2.1%, considérez une campagne ciblée
              </p>
            </div>
            <div className="p-3 bg-indigo-50 rounded-lg">
              <p className="text-sm text-indigo-800">
                <strong>Produits :</strong> Les écouteurs sans fil sont très performants, envisagez d'étendre la gamme
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;