import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import Button from './Button';

interface ProductCardProps {
  product: any; // Using any for now since we're working with Supabase data
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Transform Supabase product to cart format
    const cartProduct = {
      id: product.id.toString(),
      name: product.name,
      description: product.description || '',
      price: product.price,
      images: product.product_images?.map((img: any) => img.url) || [],
      category: 'Général', // You might want to add category relation
      tenantId: product.tenant_id?.toString() || '',
      tenantName: product.tenants?.name || 'Vendeur',
      stock: product.inventory?.[0]?.quantity || 0,
      rating: product.average_rating || 0,
      createdAt: product.created_at,
      isActive: product.is_active,
      createdBy: ''
    };
    
    addToCart(cartProduct, 1);
  };
  
  const coverImage = product.product_images?.find((img: any) => img.is_cover)?.url || 
                    product.product_images?.[0]?.url || 
                    'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600';
  
  return (
    <Link to={`/products/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-[1.02] hover:shadow-lg">
        <div className="relative h-48 overflow-hidden bg-gray-200">
          <img 
            src={coverImage} 
            alt={product.name} 
            className="w-full h-full object-cover object-center transition-transform group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-sm font-medium flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            {product.average_rating?.toFixed(1) || '0.0'}
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-medium text-gray-900 line-clamp-1">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.tenants?.name || 'Vendeur'}</p>
            </div>
            <p className="text-lg font-bold text-blue-600">{product.price.toLocaleString()} FCFA</p>
          </div>
          
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              Stock: {product.inventory?.[0]?.quantity || 0}
            </span>
            <Button 
              variant="primary" 
              size="sm" 
              onClick={handleAddToCart}
              className="flex items-center"
              disabled={!product.inventory?.[0]?.quantity}
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              Ajouter
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;