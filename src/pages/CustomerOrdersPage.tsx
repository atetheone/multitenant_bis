import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle, 
  Truck, 
  Package, 
  AlertTriangle,
  ChevronRight,
  Search
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/apiService';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const CustomerOrdersPage: React.FC = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Check for order success message from checkout
  const orderSuccess = location.state?.orderSuccess;
  const orderTotal = location.state?.orderTotal;
  const deliveryZone = location.state?.deliveryZone;
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await apiService.getOrders({ user_id: currentUser?.id });
        if (response.success) {
          setOrders(response.data || []);
        } else {
          setError(response.message || 'Erreur lors du chargement des commandes');
        }
      } catch (err) {
        setError('Une erreur est survenue lors du chargement des commandes');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [currentUser]);
  
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { 
          label: 'En attente', 
          color: 'bg-yellow-100 text-yellow-800',
          icon: <Clock className="w-4 h-4" />
        };
      case 'processing':
        return { 
          label: 'En traitement', 
          color: 'bg-blue-100 text-blue-800',
          icon: <Package className="w-4 h-4" />
        };
      case 'shipped':
        return { 
          label: 'Expédiée', 
          color: 'bg-purple-100 text-purple-800',
          icon: <Truck className="w-4 h-4" />
        };
      case 'delivered':
        return { 
          label: 'Livrée', 
          color: 'bg-green-100 text-green-800',
          icon: <CheckCircle className="w-4 h-4" />
        };
      case 'cancelled':
        return { 
          label: 'Annulée', 
          color: 'bg-red-100 text-red-800',
          icon: <AlertTriangle className="w-4 h-4" />
        };
      default:
        return { 
          label: status, 
          color: 'bg-gray-100 text-gray-800',
          icon: <Clock className="w-4 h-4" />
        };
    }
  };
  
  const filteredOrders = orders.filter(order => {
    // Apply status filter
    if (statusFilter !== 'all' && order.status !== statusFilter) {
      return false;
    }
    
    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        order.id.toString().includes(searchLower) ||
        (order.items && order.items.some((item: any) => 
          item.product?.name.toLowerCase().includes(searchLower)
        ))
      );
    }
    
    return true;
  });
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes Commandes</h1>
      <p className="text-gray-600 mb-8">Suivez l'état de vos commandes et leur livraison</p>
      
      {/* Success Message */}
      {orderSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3" />
            <div>
              <h3 className="text-lg font-medium text-green-800">Commande Confirmée!</h3>
              <p className="text-green-700 mt-1">
                Votre commande d'un montant de {orderTotal?.toLocaleString()} FCFA a été confirmée.
                {deliveryZone && ` Elle sera livrée dans la zone "${deliveryZone}".`}
              </p>
              <p className="text-green-700 mt-2">
                Vous recevrez un email de confirmation avec les détails de votre commande.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Rechercher par numéro de commande..."
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
            <option value="processing">En traitement</option>
            <option value="shipped">Expédiée</option>
            <option value="delivered">Livrée</option>
            <option value="cancelled">Annulée</option>
          </select>
          
          <select
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Plus récentes d'abord</option>
            <option value="oldest">Plus anciennes d'abord</option>
            <option value="highest">Prix le plus élevé</option>
            <option value="lowest">Prix le plus bas</option>
          </select>
        </div>
      </div>
      
      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de vos commandes...</p>
        </div>
      )}
      
      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 mr-3" />
            <div>
              <h3 className="text-lg font-medium text-red-800">Erreur</h3>
              <p className="text-red-700 mt-1">{error}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => window.location.reload()}
              >
                Réessayer
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* No Orders State */}
      {!loading && !error && filteredOrders.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune commande trouvée</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || statusFilter !== 'all' 
              ? 'Aucune commande ne correspond à vos critères de recherche.' 
              : 'Vous n\'avez pas encore passé de commande.'}
          </p>
          <Link to="/marketplace">
            <Button variant="primary">Commencer vos achats</Button>
          </Link>
        </div>
      )}
      
      {/* Orders List */}
      {!loading && !error && filteredOrders.length > 0 && (
        <div className="space-y-6">
          {filteredOrders.map((order) => {
            const statusInfo = getStatusInfo(order.status);
            
            return (
              <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-lg font-medium text-gray-900">
                          Commande #{order.id}
                        </h3>
                        <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium flex items-center ${statusInfo.color}`}>
                          {statusInfo.icon}
                          <span className="ml-1">{statusInfo.label}</span>
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Passée le {new Date(order.created_at).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <p className="text-lg font-bold text-blue-600">
                        {order.total.toLocaleString()} FCFA
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  {/* Order Items */}
                  <div className="space-y-4 mb-6">
                    <h4 className="font-medium text-gray-900">Articles</h4>
                    {order.items && order.items.map((item: any, index: number) => (
                      <div key={index} className="flex items-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center mr-4">
                          <Package className="w-6 h-6 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{item.product?.name || `Produit #${item.product_id}`}</p>
                          <p className="text-sm text-gray-500">
                            Qté: {item.quantity} × {item.unit_price.toLocaleString()} FCFA
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Delivery Info */}
                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">Livraison</h4>
                    <div className="flex items-start">
                      <Truck className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                      <div>
                        <p className="text-gray-900">
                          {order.address?.address_line1}, {order.address?.city}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Zone: {order.delivery_zone?.name} - Frais: {order.delivery_fee.toLocaleString()} FCFA
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">
                        Paiement: {order.payment_method}
                      </p>
                    </div>
                    <Link 
                      to={`/customer/orders/${order.id}`}
                      className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Détails
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomerOrdersPage;