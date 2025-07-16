import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  Search,
  Filter,
  Download,
  Upload,
  Star,
  DollarSign,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { usePermissions } from '../../hooks/usePermissions';
import { products } from '../../data/mockData';
import DataTable from '../../components/dashboard/DataTable';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const ProductsPage: React.FC = () => {
  const { isSuperAdmin } = usePermissions();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock products data with additional fields
  const mockProducts = [
    {
      id: '1',
      name: 'Écouteurs Sans Fil Premium',
      description: 'Écouteurs sans fil premium avec réduction de bruit et autonomie de 24 heures.',
      price: 129.99,
      cost: 80.00,
      margin: 38.46,
      category: 'Électronique',
      tenant: 'Tech Paradise',
      stock: 50,
      lowStockThreshold: 10,
      rating: 4.7,
      reviews: 156,
      sales: 89,
      revenue: 11569.11,
      status: 'active',
      createdAt: '2024-01-10T09:00:00Z',
      lastUpdated: '2024-01-15T14:30:00Z',
      images: ['https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg'],
      sku: 'ECO-001',
      weight: 0.2,
      dimensions: '15x10x5 cm'
    },
    {
      id: '2',
      name: 'Montre Connectée Sport',
      description: 'Montre intelligente avec suivi de santé, notifications et résistance à l\'eau.',
      price: 199.99,
      cost: 120.00,
      margin: 40.00,
      category: 'Électronique',
      tenant: 'Tech Paradise',
      stock: 35,
      lowStockThreshold: 15,
      rating: 4.5,
      reviews: 203,
      sales: 67,
      revenue: 13399.33,
      status: 'active',
      createdAt: '2024-01-08T11:00:00Z',
      lastUpdated: '2024-01-14T16:20:00Z',
      images: ['https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg'],
      sku: 'MON-001',
      weight: 0.15,
      dimensions: '4x4x1 cm'
    },
    {
      id: '3',
      name: 'Set Brosses à Dents Bambou',
      description: 'Pack de 4 brosses à dents écologiques en bambou avec poils au charbon.',
      price: 14.99,
      cost: 8.00,
      margin: 46.63,
      category: 'Santé & Beauté',
      tenant: 'Éco Produits',
      stock: 5,
      lowStockThreshold: 20,
      rating: 4.8,
      reviews: 89,
      sales: 234,
      revenue: 3507.66,
      status: 'low_stock',
      createdAt: '2024-01-05T13:30:00Z',
      lastUpdated: '2024-01-13T10:15:00Z',
      images: ['https://images.pexels.com/photos/3737605/pexels-photo-3737605.jpeg'],
      sku: 'BRO-001',
      weight: 0.08,
      dimensions: '20x2x2 cm'
    },
    {
      id: '4',
      name: 'Smartphone Dernière Génération',
      description: 'Smartphone haut de gamme avec appareil photo 108MP et 5G.',
      price: 899.99,
      cost: 650.00,
      margin: 27.78,
      category: 'Électronique',
      tenant: 'Tech Paradise',
      stock: 0,
      lowStockThreshold: 5,
      rating: 4.9,
      reviews: 45,
      sales: 23,
      revenue: 20699.77,
      status: 'out_of_stock',
      createdAt: '2024-01-01T08:00:00Z',
      lastUpdated: '2024-01-12T09:45:00Z',
      images: ['https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg'],
      sku: 'SMT-001',
      weight: 0.18,
      dimensions: '15x7x0.8 cm'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'low_stock': return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'inactive': return 'Inactif';
      case 'low_stock': return 'Stock faible';
      case 'out_of_stock': return 'Rupture';
      case 'draft': return 'Brouillon';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'low_stock': return <AlertTriangle className="w-4 h-4" />;
      case 'out_of_stock': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const columns = [
    { 
      key: 'name', 
      label: 'Produit', 
      sortable: true,
      render: (value: string, row: any) => (
        <div className="flex items-center">
          <img 
            src={row.images[0]} 
            alt={value} 
            className="w-10 h-10 rounded-md object-cover mr-3"
          />
          <div>
            <p className="font-medium text-gray-900">{value}</p>
            <p className="text-sm text-gray-500">SKU: {row.sku}</p>
          </div>
        </div>
      )
    },
    { key: 'category', label: 'Catégorie', sortable: true },
    { key: 'tenant', label: 'Vendeur', sortable: true },
    { 
      key: 'price', 
      label: 'Prix', 
      sortable: true,
      render: (value: number) => `${value.toLocaleString()} FCFA`
    },
    { 
      key: 'stock', 
      label: 'Stock', 
      sortable: true,
      render: (value: number, row: any) => (
        <div className="flex items-center">
          <span className={`font-medium ${
            value === 0 ? 'text-red-600' : 
            value <= row.lowStockThreshold ? 'text-yellow-600' : 
            'text-green-600'
          }`}>
            {value}
          </span>
          {value <= row.lowStockThreshold && value > 0 && (
            <AlertTriangle className="w-4 h-4 text-yellow-500 ml-1" />
          )}
          {value === 0 && (
            <XCircle className="w-4 h-4 text-red-500 ml-1" />
          )}
        </div>
      )
    },
    { 
      key: 'rating', 
      label: 'Note', 
      sortable: true,
      render: (value: number, row: any) => (
        <div className="flex items-center">
          <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
          <span>{value}</span>
          <span className="text-sm text-gray-500 ml-1">({row.reviews})</span>
        </div>
      )
    },
    { 
      key: 'sales', 
      label: 'Ventes', 
      sortable: true,
      render: (value: number) => `${value} vendus`
    },
    { 
      key: 'status', 
      label: 'Statut', 
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(value)}`}>
          {getStatusIcon(value)}
          <span className="ml-1">{getStatusText(value)}</span>
        </span>
      )
    }
  ];

  const handleViewProduct = (product: any) => {
    setSelectedProduct(product);
  };

  const handleDeleteProduct = (product: any) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le produit "${product.name}" ?`)) {
      console.log('Delete product:', product.id);
      // Ici on supprimerait le produit
    }
  };

  const ProductDetailModal = ({ product, onClose }: { product: any; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Détails du produit - {product.name}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              ×
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Image et informations de base */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Informations Produit</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">SKU:</span>
                    <span className="font-medium">{product.sku}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Poids:</span>
                    <span className="font-medium">{product.weight} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dimensions:</span>
                    <span className="font-medium">{product.dimensions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Créé le:</span>
                    <span className="font-medium">
                      {new Date(product.createdAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Détails et statistiques */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="flex items-center">
                      <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
                      <div>
                        <p className="text-sm text-gray-600">Prix de vente</p>
                        <p className="text-lg font-bold text-blue-600">{product.price.toFixed(2)}€</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="flex items-center">
                      <BarChart3 className="w-5 h-5 text-green-600 mr-2" />
                      <div>
                        <p className="text-sm text-gray-600">Marge</p>
                        <p className="text-lg font-bold text-green-600">{product.margin.toFixed(1)}%</p>
                      <p className="text-lg font-bold text-blue-600">{product.price.toLocaleString()} FCFA</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistiques de vente */}
              <div className="bg-yellow-50 rounded-lg p-4">
                <h4 className="text-md font-medium text-gray-900 mb-3">Performances de Vente</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Unités vendues</p>
                    <p className="text-xl font-bold text-gray-900">{product.sales}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Chiffre d'affaires</p>
                    <p className="text-xl font-bold text-gray-900">{product.revenue.toFixed(2)}€</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Note moyenne</p>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                      <span className="font-bold">{product.rating}</span>
                      <span className="text-sm text-gray-500 ml-1">({product.reviews} avis)</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Stock actuel</p>
                    <p className={`text-xl font-bold ${
                      product.stock === 0 ? 'text-red-600' : 
                      product.stock <= product.lowStockThreshold ? 'text-yellow-600' : 
                      'text-green-600'
                    }`}>
                      {product.stock}
                    </p>
                  </div>
                </div>
              </div>

              {/* Informations financières */}
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="text-md font-medium text-gray-900 mb-3">Analyse Financière</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Prix de revient:</span>
                    <span className="font-medium">{product.cost.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Prix de vente:</span>
                    <span className="font-medium">{product.price.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Marge unitaire:</span>
                    <span className="font-medium text-green-600">
                      {(product.price - product.cost).toLocaleString()} FCFA
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-600">Bénéfice total:</span>
                    <span className="font-bold text-green-600">
                      {((product.price - product.cost) * product.sales).toLocaleString()} FCFA
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4 pt-4 border-t">
            <Button variant="primary" className="flex items-center">
              <Edit className="w-4 h-4 mr-2" />
              Modifier
            </Button>
            <Button variant="outline">Dupliquer</Button>
            <Button variant="outline">Voir sur le site</Button>
            <Button variant="danger" className="flex items-center ml-auto">
              <Trash2 className="w-4 h-4 mr-2" />
              Supprimer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Produits</h1>
          <p className="text-gray-600">Gérez votre catalogue de produits et suivez les performances</p>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline" className="flex items-center">
            <Upload className="w-4 h-4 mr-2" />
            Importer
          </Button>
          <Button variant="outline" className="flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
          <Button variant="primary" className="flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter Produit
          </Button>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Produits</p>
              <p className="text-2xl font-bold text-gray-900">{mockProducts.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Produits Actifs</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockProducts.filter(p => p.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Stock Faible</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockProducts.filter(p => p.status === 'low_stock').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-full">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Ruptures</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockProducts.filter(p => p.status === 'out_of_stock').length}
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
              placeholder="Rechercher par nom, SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              fullWidth
            />
          </div>
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Toutes les catégories</option>
            <option value="Électronique">Électronique</option>
            <option value="Santé & Beauté">Santé & Beauté</option>
            <option value="Mode">Mode</option>
            <option value="Maison & Cuisine">Maison & Cuisine</option>
          </select>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actifs</option>
            <option value="inactive">Inactifs</option>
            <option value="low_stock">Stock faible</option>
            <option value="out_of_stock">Rupture</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="all">Tous les vendeurs</option>
            <option value="tech-paradise">Tech Paradise</option>
            <option value="eco-produits">Éco Produits</option>
          </select>
        </div>
      </div>

      {/* Table des produits */}
      <DataTable
        title="Liste des Produits"
        columns={columns}
        data={mockProducts}
        actions={{
          view: handleViewProduct,
          edit: (row) => console.log('Edit', row),
          delete: handleDeleteProduct,
        }}
        pagination={{
          pageSize: 10,
          currentPage: 1,
          totalItems: mockProducts.length,
          onPageChange: (page) => console.log('Page change:', page)
        }}
      />

      {/* Modal de détails */}
      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

export default ProductsPage;