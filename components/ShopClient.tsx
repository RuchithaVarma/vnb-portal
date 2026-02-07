'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/products';
import { Filter } from 'lucide-react';

interface ShopClientProps {
  initialProducts: Product[];
}

export default function ShopClient({ initialProducts }: ShopClientProps) {
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = initialProducts.filter(
    (product) => category === 'all' || product.category === category
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'discount') return b.discount - a.discount;
    return 0; // featured
  });

  return (
    <div className="min-h-screen bg-cream pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="section-title text-center mb-4">Shop All Products</h1>
          <p className="text-center text-gray-600 text-lg max-w-3xl mx-auto">
            Browse our complete collection of {initialProducts.length} pure, raw powders. All products are lab-tested, 
            FSSAI certified, and available in multiple pack sizes.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-soft p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest"
              >
                <option value="all">All Categories</option>
                <option value="fruit">Fruit Powders</option>
                <option value="vegetable">Vegetable Powders</option>
                <option value="leafy">Leafy Vegetable Powders</option>
              </select>
            </div>

            <div className="flex-1 md:text-right">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="discount">Highest Discount</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Results Count */}
        <div className="mt-8 text-center text-gray-600">
          Showing {sortedProducts.length} of {initialProducts.length} products
        </div>
      </div>
    </div>
  );
}
