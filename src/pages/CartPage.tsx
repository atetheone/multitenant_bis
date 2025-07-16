import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, X, ArrowRight, Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';

const CartPage: React.FC = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const handleProceedToCheckout = () => {
    if (currentUser) {
      navigate('/checkout');
    } else {
      navigate('/login?redirect=checkout');
    }
  };
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
          <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Votre Panier est Vide</h2>
          <p className="text-gray-600 mb-8">Il semble que vous n'ayez pas encore ajouté de produits à votre panier.</p>
          <Button 
            variant="primary" 
            onClick={() => navigate('/marketplace')}
            className="flex items-center mx-auto"
          >
            Continuer les Achats
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
        <ShoppingCart className="w-8 h-8 mr-3" />
        Votre Panier
      </h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">
                  {items.length} {items.length === 1 ? 'Article' : 'Articles'}
                </h2>
                <button 
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 flex items-center text-sm font-medium"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Vider le Panier
                </button>
              </div>
            </div>
            
            <ul className="divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.productId} className="p-6 flex flex-col sm:flex-row">
                  <div className="sm:w-24 sm:h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden mb-4 sm:mb-0">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  
                  <div className="sm:ml-6 flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          <Link to={`/products/${item.productId}`} className="hover:text-blue-600">
                            {item.product.name}
                          </Link>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">Vendeur : {item.product.tenantName}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.productId)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button 
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 border-l border-r border-gray-300 min-w-[40px] text-center">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-lg font-medium text-gray-900">
                          {(item.product.price * item.quantity).toFixed(2)}€
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.product.price.toFixed(2)}€ chacun
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Résumé de la Commande</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Sous-total</span>
                <span className="text-gray-900">{totalPrice.toLocaleString()} FCFA</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Livraison</span>
                <span className="text-gray-900">Gratuite</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">TVA</span>
                <span className="text-gray-900">{(totalPrice * 0.2).toLocaleString()} FCFA</span>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between font-medium">
                  <span className="text-gray-900">Total</span>
                  <span className="text-blue-600 text-xl">
                    {(totalPrice + (totalPrice * 0.2)).toLocaleString()} FCFA
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">TVA incluse</p>
              </div>
            </div>
            
            <Button 
              variant="primary" 
              size="lg" 
              fullWidth 
              className="mt-6"
              onClick={handleProceedToCheckout}
            >
              Procéder au Paiement
            </Button>
            
            <div className="mt-4">
              <Link 
                to="/marketplace" 
                className="text-blue-600 hover:text-blue-700 flex items-center justify-center text-sm font-medium"
              >
                <ArrowRight className="w-4 h-4 mr-1 transform rotate-180" />
                Continuer les Achats
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;