import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { tenants } from '../../data/mockData';

const FeaturedTenants: React.FC = () => {
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
          {tenants.map((tenant) => (
            <Link 
              key={tenant.id} 
              to={`/sellers/${tenant.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col sm:flex-row hover:shadow-lg transition-shadow"
            >
              <div className="w-full sm:w-1/3 h-48 sm:h-auto bg-gray-200">
                <img 
                  src={tenant.logo} 
                  alt={tenant.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="w-full sm:w-2/3 p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{tenant.name}</h3>
                  <div className="flex items-center bg-blue-50 text-blue-700 px-2 py-1 rounded-md">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="font-medium">{tenant.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{tenant.description}</p>
                
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Depuis {new Date(tenant.createdAt).toLocaleDateString('fr-FR')}</span>
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