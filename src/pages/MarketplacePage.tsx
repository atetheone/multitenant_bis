import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useProducts } from '../hooks/useSupabase';
import ProductCard from '../components/common/ProductCard';
import ProductFilters from '../components/marketplace/ProductFilters';
import Input from '../components/common/Input';

const MarketplacePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategoryParam = searchParams.get('category');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategoryParam);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  
  const { data: allProducts, loading, error } = useProducts({ is_active: true });
  
  // Filter products based on search and filters
  const filteredProducts = React.useMemo(() => {
    if (!allProducts) return [];
    
    let filtered = allProducts;
    
    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        product => 
          product.name.toLowerCase().includes(search) || 
          (product.description && product.description.toLowerCase().includes(search)) ||
          (product.tenants?.name && product.tenants.name.toLowerCase().includes(search))
      );
    }
    
    // Apply category filter (you might want to add category relation to products)
    if (selectedCategory) {
      // For now, we'll skip category filtering since it's not in the current schema
      // You can add a categories table and relation later
    }
    
    // Apply price range filter
    filtered = filtered.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    return filtered;
  }, [allProducts, searchTerm, selectedCategory, priceRange]);
  
  // Extract unique categories from products (placeholder for now)
  const categories = ['Électronique', 'Mode', 'Maison & Cuisine', 'Santé & Beauté'];
  
  // Find max price from products
  const maxPrice = allProducts ? Math.max(...allProducts.map(product => product.price)) : 1000000;
  
  useEffect(() => {
    // Update URL params
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    if (searchTerm) params.set('search', searchTerm);
    setSearchParams(params);
  }, [selectedCategory, searchTerm, setSearchParams]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };
  
  const handlePriceRangeChange = (range: [number, number]) => {
    setPriceRange(range);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Marketplace</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-80 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Marketplace</h1>
        <p className="text-red-600">Erreur lors du chargement des produits</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Marketplace</h1>
      
      {/* Search Bar */}
      <div className="relative mb-8">
        <Input
          type="text"
          placeholder="Rechercher des produits, catégories ou vendeurs..."
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters */}
        <div className="lg:w-1/4">
          <ProductFilters 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            priceRange={priceRange}
            onPriceRangeChange={handlePriceRangeChange}
            maxPrice={maxPrice}
          />
        </div>
        
        {/* Product Grid */}
        <div className="lg:w-3/4">
          {filteredProducts.length > 0 ? (
            <>
              <div className="mb-4 text-gray-600">
                {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun produit trouvé</h3>
              <p className="text-gray-600">
                Essayez d'ajuster vos critères de recherche ou de filtrage.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;