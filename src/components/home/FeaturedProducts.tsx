import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../hooks/useSupabase';
import ProductCard from '../common/ProductCard';

const FeaturedProducts: React.FC = () => {
  const { data: products, loading, error } = useProducts({ is_active: true });
  
  // Get first 4 products for featured section
  const featuredProducts = products?.slice(0, 4) || [];
  
  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Produits en Vedette</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-80 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-600">Erreur lors du chargement des produits</p>
        </div>
      </section>
    );
  }
  
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