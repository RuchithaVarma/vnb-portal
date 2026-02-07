'use client';

import { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '@/lib/firestore/products';
import { Product } from '@/lib/products';
import Link from 'next/link';
import { Edit, Trash2, Plus, Search } from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [categories, setCategories] = useState<string[]>([]);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
      setFilteredProducts(data);
      
      // Extract unique categories
      const uniqueCategories = Array.from(new Set(data.map(p => p.category)));
      setCategories(uniqueCategories.filter(Boolean));
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on search and category
  useEffect(() => {
    let filtered = products;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, categoryFilter, products]);

  const handleDelete = async (slug: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteProduct(slug);
        fetchProducts(); // Refresh list
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-forest">Product Management</h1>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'} total
          </p>
        </div>
        <Link 
          href="/admin/products/new" 
          className="flex items-center justify-center space-x-2 px-5 py-2.5 bg-forest text-white rounded-xl hover:bg-forest-light transition-all shadow-md text-sm"
        >
          <Plus className="w-4 h-4" />
          <span className="font-bold">Add Product</span>
        </Link>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-6 py-2.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-4 focus:ring-forest/10 focus:border-forest outline-none transition-all text-sm font-medium"
            />
          </div>

          {/* Category Filter */}
          <div className="md:w-56">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-4 focus:ring-forest/10 focus:border-forest outline-none transition-all text-sm font-bold text-forest appearance-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        {filteredProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 text-gray-400 font-bold uppercase tracking-widest text-[9px]">
                <tr>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-xs">
                {filteredProducts.map((product) => (
                  <tr key={product.slug} className="hover:bg-gray-50/20 transition-colors group">
                    <td className="px-4 py-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-lg bg-cream-50 p-1 border border-cream-100 flex-shrink-0">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-forest leading-tight truncate max-w-[150px]">{product.name}</p>
                          <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-md font-bold bg-forest/5 text-forest border border-forest/10 uppercase tracking-widest text-[8px]">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex flex-col">
                        <span className="font-bold text-forest">₹{product.price}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded-md font-bold border uppercase tracking-widest text-[8px] ${
                        product.featured ? 'bg-green-50 text-green-600 border-green-100' : 'bg-gray-50 text-gray-400 border-gray-100'
                      }`}>
                        {product.featured ? 'Featured' : 'Listed'}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <Link 
                          href={`/admin/products/${product.slug}`}
                          className="p-2 text-gray-400 hover:text-forest hover:bg-forest/5 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(product.slug, product.name)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-forest mb-1">
              {searchQuery || categoryFilter !== 'all' 
                ? 'No matches found' 
                : 'Your inventory is empty'}
            </h3>
            <p className="text-xs text-gray-400 font-medium mb-6">
              {searchQuery || categoryFilter !== 'all'
                ? 'Try a different search term or clear filters'
                : 'Start building your catalog now'}
            </p>
            {!searchQuery && categoryFilter === 'all' && (
              <Link 
                href="/admin/products/new"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-forest text-white rounded-xl font-bold hover:bg-forest-light transition-all shadow-md text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Your First Product</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
