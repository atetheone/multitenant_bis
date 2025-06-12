import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Store } from 'lucide-react';
import Button from '../common/Button';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fade-in">
              Découvrez des Produits Extraordinaires de Vendeurs Uniques
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 animate-fade-in-delay">
              Une marketplace, des possibilités infinies. Achetez dans plusieurs boutiques
              et trouvez exactement ce que vous cherchez.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in-delay-2">
              <Button 
                variant="secondary" 
                size="lg" 
                onClick={() => navigate('/marketplace')} 
                className="flex items-center justify-center"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Acheter Maintenant
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => navigate('/register')} 
                className="flex items-center justify-center bg-transparent border-white text-white hover:bg-white/10"
              >
                <Store className="w-5 h-5 mr-2" />
                Devenir Vendeur
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="relative z-10 bg-white p-4 rounded-lg shadow-xl transform rotate-3 md:scale-110 animate-float">
              <img 
                src="https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Marketplace" 
                className="rounded-lg shadow-md"
              />
            </div>
            
            <div className="absolute top-1/2 right-1/4 bg-white p-3 rounded-lg shadow-lg transform -rotate-6 animate-float-delay z-0">
              <img 
                src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Produit" 
                className="w-24 h-24 object-cover rounded-md"
              />
            </div>
            
            <div className="absolute bottom-1/4 left-1/4 bg-white p-3 rounded-lg shadow-lg transform rotate-6 animate-float-delay-2 z-0">
              <img 
                src="https://images.pexels.com/photos/5632397/pexels-photo-5632397.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Produit" 
                className="w-24 h-24 object-cover rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;