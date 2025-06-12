import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import Button from '../common/Button';

interface ProductFiltersProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  maxPrice: number;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  maxPrice,
}) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const handleCategoryChange = (category: string | null) => {
    onCategoryChange(category);
  };
  
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    onPriceRangeChange([value, priceRange[1]]);
  };
  
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    onPriceRangeChange([priceRange[0], value]);
  };
  
  const handleClearFilters = () => {
    onCategoryChange(null);
    onPriceRangeChange([0, maxPrice]);
  };
  
  const filterContent = (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Catégories</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              id="all-categories"
              type="radio"
              name="category"
              checked={selectedCategory === null}
              onChange={() => handleCategoryChange(null)}
              className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="all-categories" className="ml-3 text-sm text-gray-600">
              Toutes les Catégories
            </label>
          </div>
          
          {categories.map((category) => (
            <div key={category} className="flex items-center">
              <input
                id={`category-${category}`}
                type="radio"
                name="category"
                checked={selectedCategory === category}
                onChange={() => handleCategoryChange(category)}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor={`category-${category}`} className="ml-3 text-sm text-gray-600">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Price Range Filter */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Gamme de Prix</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-full mr-2">
              <label htmlFor="min-price" className="text-sm text-gray-600 mb-1 block">
                Prix Min
              </label>
              <input
                type="number"
                id="min-price"
                min={0}
                max={priceRange[1]}
                value={priceRange[0]}
                onChange={handleMinPriceChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div className="w-full ml-2">
              <label htmlFor="max-price" className="text-sm text-gray-600 mb-1 block">
                Prix Max
              </label>
              <input
                type="number"
                id="max-price"
                min={priceRange[0]}
                max={maxPrice}
                value={priceRange[1]}
                onChange={handleMaxPriceChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="price-range" className="text-sm text-gray-600 mb-1 block">
              Fourchette
            </label>
            <input
              type="range"
              id="price-range"
              min={0}
              max={maxPrice}
              value={priceRange[1]}
              onChange={handleMaxPriceChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{priceRange[0]}€</span>
              <span>{priceRange[1]}€</span>
            </div>
          </div>
        </div>
      </div>
      
      <Button 
        variant="secondary" 
        onClick={handleClearFilters} 
        fullWidth
        className="mt-4"
      >
        Effacer les Filtres
      </Button>
    </div>
  );
  
  return (
    <>
      {/* Mobile Filter Dialog */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 flex z-40 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setMobileFiltersOpen(false)} />
          
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
            <div className="flex items-center justify-between px-4 mb-4">
              <h2 className="text-lg font-medium text-gray-900">Filtres</h2>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="px-4">
              {filterContent}
            </div>
          </div>
        </div>
      )}
      
      {/* Mobile Filter Button */}
      <div className="flex items-center justify-between py-4 border-b border-gray-200 lg:hidden">
        <h2 className="text-lg font-medium text-gray-900">Produits</h2>
        <Button 
          variant="outline" 
          onClick={() => setMobileFiltersOpen(true)} 
          className="flex items-center"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filtres
        </Button>
      </div>
      
      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Filtres</h2>
        {filterContent}
      </div>
    </>
  );
};

export default ProductFilters;