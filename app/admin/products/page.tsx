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
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-forest">Inventory Management</h1>
          <p className="text-gray-600 mt-1">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>
        <Link 
          href="/admin/products/new" 
          className="btn-primary flex items-center justify-center space-x-2 px-6 py-4 bg-forest text-white rounded-2xl hover:bg-forest-light transition-all shadow-lg hover:shadow-forest/20"
        >
          <Plus className="w-5 h-5" />
          <span className="font-bold">Add New Product</span>
        </Link>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-3xl shadow-soft p-6 mb-8 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-forest/10 focus:border-forest outline-none transition-all text-lg font-medium"
            />
          </div>

          {/* Category Filter */}
          <div className="md:w-64">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-forest/10 focus:border-forest outline-none transition-all text-lg font-bold text-forest appearance-none cursor-pointer"
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
      <div className="bg-white rounded-3xl shadow-soft overflow-hidden border border-gray-100">
        {filteredProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-cream-50 text-gray-700 font-bold uppercase tracking-wider text-xs">
                <tr>
                  <th className="px-8 py-5">Product</th>
                  <th className="px-8 py-5">Category</th>
                  <th className="px-8 py-5">Pricing</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {filteredProducts.map((product) => (
                  <tr key={product.slug} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 rounded-2xl bg-cream-100 p-2 border border-cream-200">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <p className="font-black text-forest text-lg">{product.name}</p>
                          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black bg-forest/5 text-forest border border-forest/10 uppercase tracking-widest">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="font-black text-forest text-xl">₹{product.price}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-xs text-red-500 line-through font-bold">₹{product.originalPrice}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black bg-green-50 text-green-600 border border-green-100 uppercase tracking-widest">
                        {product.featured ? '★ Featured' : 'Listed'}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link 
                          href={`/admin/products/${product.slug}`}
                          className="p-3 text-gray-400 hover:text-forest hover:bg-forest/5 rounded-xl transition-all"
                          title="Edit product"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(product.slug, product.name)}
                          className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                          title="Delete product"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-20 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-2xl font-black text-forest mb-2">
              {searchQuery || categoryFilter !== 'all' 
                ? 'No matches found' 
                : 'Your inventory is empty'}
            </h3>
            <p className="text-gray-500 font-medium mb-8">
              {searchQuery || categoryFilter !== 'all'
                ? 'Try a different search term or clear filters'
                : 'Start building your catalog now'}
            </p>
            {!searchQuery && categoryFilter === 'all' && (
              <Link 
                href="/admin/products/new"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-forest text-white rounded-2xl font-bold hover:bg-forest-light transition-all shadow-lg hover:shadow-forest/20"
              >
                <Plus className="w-5 h-5" />
                <span>Add Your First Product</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
