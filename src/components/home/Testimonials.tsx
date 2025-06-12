import React from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sarah Dubois',
      role: 'Cliente',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
      content: 'JefJel a complètement changé ma façon de faire du shopping en ligne. J\'adore pouvoir parcourir différents vendeurs et trouver des produits uniques en un seul endroit !',
      rating: 5,
    },
    {
      id: '2',
      name: 'Michel Leroy',
      role: 'Vendeur',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
      content: 'En tant que propriétaire de petite entreprise, rejoindre JefJel m\'a permis d\'atteindre beaucoup plus de clients. La plateforme est intuitive et l\'équipe de support est incroyable.',
      rating: 5,
    },
    {
      id: '3',
      name: 'Émilie Chen',
      role: 'Cliente',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
      content: 'J\'apprécie la variété des produits disponibles. Le processus de commande est fluide et la livraison est toujours à l\'heure. Définitivement ma marketplace en ligne de référence !',
      rating: 4,
    },
  ];
  
  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ce que Disent les Gens</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ne nous croyez pas sur parole. Voici ce que nos clients et vendeurs disent de JefJel.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-[1.02]"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                    fill={i < testimonial.rating ? 'currentColor' : 'none'} 
                  />
                ))}
              </div>
              
              <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;