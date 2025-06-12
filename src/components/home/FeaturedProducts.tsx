import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../../data/mockData';
import ProductCard from '../common/ProductCard';

const FeaturedProducts: React.FC = () => {
  // Get first 4 products for featured section
  const featuredProducts = products.slice(0, 4);
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Produits en Vedette</h2>
          <Link 
            to="/marketplace" 
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            Voir Tout
            <ArrowRight className="w-5 h-5 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;