import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, Home, ShoppingBag, Brush, Coffee, Shirt } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

const FeaturedCategories: React.FC = () => {
  const navigate = useNavigate();
  
  const categories: Category[] = [
    {
      id: 'electronics',
      name: 'Électronique',
      icon: <Smartphone className="w-8 h-8" />,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      id: 'home-kitchen',
      name: 'Maison & Cuisine',
      icon: <Home className="w-8 h-8" />,
      color: 'bg-green-100 text-green-600',
    },
    {
      id: 'health-beauty',
      name: 'Santé & Beauté',
      icon: <Brush className="w-8 h-8" />,
      color: 'bg-pink-100 text-pink-600',
    },
    {
      id: 'fashion',
      name: 'Mode',
      icon: <Shirt className="w-8 h-8" />,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      id: 'food-drinks',
      name: 'Alimentation',
      icon: <Coffee className="w-8 h-8" />,
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      id: 'accessories',
      name: 'Accessoires',
      icon: <ShoppingBag className="w-8 h-8" />,
      color: 'bg-red-100 text-red-600',
    },
  ];
  
  const handleCategoryClick = (categoryId: string) => {
    navigate(`/marketplace?category=${categoryId}`);
  };
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Acheter par Catégorie</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explorez notre large gamme de catégories et trouvez exactement ce que vous cherchez.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105"
            >
              <div className={`p-4 rounded-full ${category.color} mb-4`}>
                {category.icon}
              </div>
              <h3 className="font-medium text-gray-900">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;