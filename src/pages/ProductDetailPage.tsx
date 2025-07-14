import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Store, Star, Minus, Plus, ArrowLeft, Heart } from 'lucide-react';
import { useProduct } from '../hooks/useSupabase';
import { useCart } from '../contexts/CartContext';
import Button from '../components/common/Button';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const { data: product, loading, error } = useProduct(productId ? parseInt(productId) : 0);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-32 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-200 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
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
  
  const handleQuantityChange = (newQuantity: number) => {
    const maxQuantity = product.inventory?.[0]?.quantity || 0;
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    // Transform Supabase product to cart format
    const cartProduct = {
      id: product.id.toString(),
      name: product.name,
      description: product.description || '',
      price: product.price,
      images: product.product_images?.map((img: any) => img.url) || [],
      category: 'Général',
      tenantId: product.tenant_id?.toString() || '',
      tenantName: product.tenants?.name || 'Vendeur',
      stock: product.inventory?.[0]?.quantity || 0,
      rating: product.average_rating || 0,
      createdAt: product.created_at,
      isActive: product.is_active,
      createdBy: ''
    };
    
    addToCart(cartProduct, quantity);
  };
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const images = product.product_images?.sort((a: any, b: any) => a.display_order - b.display_order) || [];
  const coverImage = images.find((img: any) => img.is_cover) || images[0];
  const stock = product.inventory?.[0]?.quantity || 0;
  
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
                src={images[activeImage]?.url || coverImage?.url || 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600'} 
                alt={product.name} 
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            {images.length > 1 && (
              <div className="flex space-x-4">
                {images.map((image: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`w-20 h-20 rounded-md overflow-hidden border-2 ${
                      activeImage === index ? 'border-blue-600' : 'border-transparent'
                    }`}
                  >
                    <img 
                      src={image.url} 
                      alt={image.alt_text || `${product.name} image ${index + 1}`} 
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
                  <span className="ml-1 text-gray-700">{product.average_rating?.toFixed(1) || '0.0'}</span>
                </div>
                <span className="text-gray-500">|</span>
                <span className="ml-4 text-gray-500">
                  {stock > 0 ? (
                    <span className="text-green-600">En Stock ({stock})</span>
                  ) : (
                    <span className="text-red-600">Rupture de Stock</span>
                  )}
                </span>
              </div>
              
              <div className="text-2xl font-bold text-blue-600 mb-4">
                {product.price.toLocaleString()} FCFA
              </div>
              
              <p className="text-gray-700 mb-6">{product.description}</p>
            </div>
            
            {/* Seller Info */}
            {product.tenants && (
              <Link 
                to={`/sellers/${product.tenants.id}`}
                className="flex items-center p-4 border border-gray-200 rounded-lg mb-6 hover:bg-gray-50 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <Store className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium text-gray-900 mr-2">{product.tenants.name}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                      {product.tenants.rating?.toFixed(1) || '0.0'}
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
                  disabled={quantity >= stock}
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
                disabled={stock <= 0}
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
                disabled={stock <= 0}
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