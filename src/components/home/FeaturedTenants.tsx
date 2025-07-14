import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { useTenants } from '../../hooks/useSupabase';

const FeaturedTenants: React.FC = () => {
  const { data: tenants, loading, error } = useTenants({ is_featured: true, status: 'active' });

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Vendeurs en Vedette</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-48 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !tenants?.length) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">Aucun vendeur en vedette pour le moment</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Vendeurs en Vedette</h2>
          <Link 
            to="/sellers" 
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            Voir Tout
            <ArrowRight className="w-5 h-5 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tenants.slice(0, 4).map((tenant) => (
            <Link 
              key={tenant.id} 
              to={`/sellers/${tenant.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col sm:flex-row hover:shadow-lg transition-shadow"
            >
              <div className="w-full sm:w-1/3 h-48 sm:h-auto bg-gray-200">
                {tenant.logo ? (
                  <img 
                    src={tenant.logo} 
                    alt={tenant.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {tenant.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="w-full sm:w-2/3 p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{tenant.name}</h3>
                  <div className="flex items-center bg-blue-50 text-blue-700 px-2 py-1 rounded-md">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="font-medium">{tenant.rating.toFixed(1)}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">{tenant.description}</p>
                
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{tenant.product_count} produits</span>
                  <span className="text-blue-600 font-medium">Voir la Boutique →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTenants;