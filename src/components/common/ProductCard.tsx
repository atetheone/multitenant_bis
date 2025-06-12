import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import Button from './Button';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };
  
  return (
    <Link to={`/products/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-[1.02] hover:shadow-lg">
        <div className="relative h-48 overflow-hidden bg-gray-200">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover object-center transition-transform group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-sm font-medium flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            {product.rating}
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-medium text-gray-900 line-clamp-1">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.tenantName}</p>
            </div>
            <p className="text-lg font-bold text-blue-600">{product.price.toFixed(2)}€</p>
          </div>
          
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">{product.category}</span>
            <Button 
              variant="primary" 
              size="sm" 
              onClick={handleAddToCart}
              className="flex items-center"
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