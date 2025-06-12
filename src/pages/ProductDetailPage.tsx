import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products, tenants } from '../data/mockData';
import { ShoppingCart, Store, Star, Minus, Plus, ArrowLeft, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import Button from '../components/common/Button';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Produit Non Trouvé</h2>
        <p className="text-gray-600 mb-8">Le produit que vous recherchez n'existe pas ou a été supprimé.</p>
        <Button 
          variant="primary" 
          onClick={() => window.history.back()}
          className="flex items-center mx-auto"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Retour
        </Button>
      </div>
    );
  }
  
  const tenant = tenants.find(t => t.id === product.tenantId);
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/marketplace" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeft className="w-4 h-4 mr-1" />
        Retour au Marketplace
      </Link>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Product Images */}
          <div className="md:w-1/2 p-6">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img 
                src={product.images[activeImage] || product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="flex space-x-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`w-20 h-20 rounded-md overflow-hidden border-2 ${
                      activeImage === index ? 'border-blue-600' : 'border-transparent'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} miniature ${index + 1}`} 
                      className="w-full h-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div className="md:w-1/2 p-6 flex flex-col">
            <div className="mb-4">
              <div className="flex justify-between items-start">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <button 
                  onClick={toggleFavorite}
                  className="text-gray-400 hover:text-red-500 focus:outline-none transition-colors"
                >
                  <Heart className={`w-6 h-6 ${isFavorite ? 'text-red-500 fill-current' : ''}`} />
                </button>
              </div>
              
              <div className="flex items-center mb-2">
                <div className="flex items-center mr-4">
                  <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  <span className="ml-1 text-gray-700">{product.rating}</span>
                </div>
                <span className="text-gray-500">|</span>
                <span className="ml-4 text-gray-500">
                  {product.stock > 0 ? (
                    <span className="text-green-600">En Stock</span>
                  ) : (
                    <span className="text-red-600">Rupture de Stock</span>
                  )}
                </span>
              </div>
              
              <div className="text-2xl font-bold text-blue-600 mb-4">
                {product.price.toFixed(2)}€
              </div>
              
              <p className="text-gray-700 mb-6">{product.description}</p>
            </div>
            
            {/* Seller Info */}
            {tenant && (
              <Link 
                to={`/sellers/${tenant.id}`}
                className="flex items-center p-4 border border-gray-200 rounded-lg mb-6 hover:bg-gray-50 transition-colors"
              >
                <img 
                  src={tenant.logo} 
                  alt={tenant.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium text-gray-900 mr-2">{tenant.name}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                      {tenant.rating}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Voir la Boutique</p>
                </div>
                <Store className="w-5 h-5 text-blue-600 ml-auto" />
              </Link>
            )}
            
            {/* Quantity Selector */}
            <div className="flex items-center mb-6">
              <span className="text-gray-700 mr-4">Quantité :</span>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button 
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-1 border-l border-r border-gray-300 min-w-[40px] text-center">
                  {quantity}
                </span>
                <button 
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= product.stock}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-4 mt-auto">
              <Button 
                variant="primary" 
                size="lg" 
                fullWidth
                onClick={handleAddToCart}
                className="flex items-center justify-center"
                disabled={product.stock <= 0}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Ajouter au Panier
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => {
                  handleAddToCart();
                  window.location.href = '/cart';
                }}
                disabled={product.stock <= 0}
              >
                Acheter Maintenant
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;