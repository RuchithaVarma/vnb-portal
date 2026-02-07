'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getProduct, updateProduct } from '@/lib/firestore/products';
import { Product } from '@/lib/products';
import Link from 'next/link';
import { ArrowLeft, Save, X, Package, LayoutDashboard, PlusCircle, Loader2 } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import CategoryDropdown from '@/components/admin/CategoryDropdown';

export default function EditProductPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Product | null>(null);

  const [benefitInput, setBenefitInput] = useState('');
  const [sizeInput, setSizeInput] = useState('');

  useEffect(() => {
    async function fetchProduct() {
      try {
        const product = await getProduct(params.slug);
        if (product) {
          setFormData(product);
        } else {
          alert('Product not found');
          router.push('/admin/products');
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [params.slug, router]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!formData) return;
    const { name, value, type } = e.target;
    
    if (type === 'number') {
        setFormData(prev => prev ? ({ ...prev, [name]: parseFloat(value) }) : null);
    } else if (type === 'checkbox') {
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => prev ? ({ ...prev, [name]: checked }) : null);
    } else {
        setFormData(prev => prev ? ({ ...prev, [name]: value }) : null);
    }
  };

  const handleAddBenefit = () => {
    if (benefitInput.trim() && formData) {
      setFormData(prev => prev ? ({
        ...prev,
        benefits: [...(prev.benefits || []), benefitInput.trim()]
      }) : null);
      setBenefitInput('');
    }
  };

  const handleRemoveBenefit = (index: number) => {
    if(!formData) return;
    setFormData(prev => prev ? ({
      ...prev,
      benefits: prev.benefits?.filter((_, i) => i !== index)
    }) : null);
  };

  const handleAddSize = () => {
    if (sizeInput.trim() && formData) {
      setFormData(prev => prev ? ({
        ...prev,
        sizes: [...(prev.sizes || []), sizeInput.trim()]
      }) : null);
      setSizeInput('');
    }
  };

  const handleRemoveSize = (index: number) => {
    if (!formData) return;
    setFormData(prev => prev ? ({
      ...prev,
      sizes: prev.sizes?.filter((_, i) => i !== index)
    }) : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    setSaving(true);

    try {
      await updateProduct(params.slug, formData);
      router.push('/admin/products');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !formData) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-forest animate-spin" />
        <p className="text-forest font-bold animate-pulse">Fetching product details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/products"
            className="p-3 bg-white hover:bg-forest hover:text-white rounded-2xl shadow-soft transition-all duration-300 group"
          >
            <ArrowLeft className="w-6 h-6 text-forest group-hover:text-white transition-colors" />
          </Link>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl font-extrabold text-forest tracking-tight">Edit Product</h1>
              <span className="px-3 py-1 bg-forest/10 text-forest text-xs font-black rounded-full uppercase tracking-widest">Live</span>
            </div>
            <p className="text-gray-500 font-medium">Modifying: <span className="text-forest font-bold">{formData.name}</span></p>
          </div>
        </div>
        <div className="hidden md:flex flex-col items-end">
          <span className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Product SKU</span>
          <span className="text-sm font-mono font-bold bg-gray-100 px-3 py-1 rounded-lg text-gray-600 border border-gray-200">
            #{formData.slug.toUpperCase().replace(/-/g, '')}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information Section */}
            <div className="bg-white rounded-3xl shadow-soft p-8 border border-gray-100 hover:shadow-card transition-shadow duration-500 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4">
                 <div className="w-12 h-12 bg-forest/5 rounded-full flex items-center justify-center">
                   <Package className="w-6 h-6 text-forest/20" />
                 </div>
               </div>

              <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-gray-50">
                <div className="p-2 bg-forest/10 rounded-lg">
                  <Package className="w-5 h-5 text-forest" />
                </div>
                <h2 className="text-xl font-bold text-forest">Essential Details</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-base font-bold text-gray-800 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-forest/10 focus:border-forest outline-none transition-all text-lg font-medium"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-base font-bold text-gray-800 mb-2">
                      Current Price (₹)
                    </label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full pl-10 pr-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-forest/10 focus:border-forest outline-none transition-all text-lg font-bold text-forest"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-base font-bold text-gray-800 mb-2">
                      Compare at Price (₹)
                    </label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                      <input
                        type="number"
                        name="originalPrice"
                        value={formData.originalPrice}
                        onChange={handleChange}
                        className="w-full pl-10 pr-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-forest/10 focus:border-forest outline-none transition-all text-lg font-medium text-gray-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-base font-bold text-gray-800 mb-2">
                      Discount Applied (%)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="discount"
                        value={formData.discount}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-forest/10 focus:border-forest outline-none transition-all text-lg font-bold text-gold"
                      />
                      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gold font-bold">% OFF</span>
                    </div>
                  </div>
                  <div>
                    <CategoryDropdown 
                      value={formData.category || ''} 
                      onChange={(val) => setFormData(prev => prev ? ({ ...prev, category: val }) : null)} 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Description & Attributes Section */}
            <div className="bg-white rounded-3xl shadow-soft p-8 border border-gray-100">
              <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-gray-50">
                <div className="p-2 bg-gold/10 rounded-lg">
                  <LayoutDashboard className="w-5 h-5 text-gold" />
                </div>
                <h2 className="text-xl font-bold text-forest">Product Story & Specs</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-base font-bold text-gray-800 mb-2">
                    Commercial Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-forest/10 focus:border-forest outline-none transition-all text-lg font-medium leading-relaxed"
                    placeholder="Describe the product experience..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  {/* Sizes */}
                  <div className="bg-forest/5 p-6 rounded-3xl border border-forest/10">
                    <label className="block text-base font-bold text-forest mb-4 flex items-center">
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Available Variants/Sizes
                    </label>
                    <div className="flex space-x-2 mb-4">
                      <input
                        type="text"
                        value={sizeInput}
                        onChange={(e) => setSizeInput(e.target.value)}
                        className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-forest outline-none transition-all font-medium text-sm"
                        placeholder="e.g. 1kg Pack"
                      />
                      <button
                        type="button"
                        onClick={handleAddSize}
                        className="px-4 py-3 bg-forest text-white rounded-xl hover:bg-forest-light transition-all font-bold shadow-sm text-sm"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.sizes?.map((size, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 bg-white text-forest px-4 py-2 rounded-xl text-xs font-bold border border-forest/10 shadow-sm animate-scale-in"
                        >
                          <span>{size}</span>
                          <button 
                            type="button" 
                            onClick={() => handleRemoveSize(index)}
                            className="text-red-400 hover:text-red-500 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="bg-gold/5 p-6 rounded-3xl border border-gold/10">
                    <label className="block text-base font-bold text-gold-900 mb-4 flex items-center">
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Key Health Benefits
                    </label>
                    <div className="flex space-x-2 mb-4">
                      <input
                        type="text"
                        value={benefitInput}
                        onChange={(e) => setBenefitInput(e.target.value)}
                        className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-forest outline-none transition-all font-medium text-sm"
                        placeholder="e.g. High Protein"
                      />
                      <button
                        type="button"
                        onClick={handleAddBenefit}
                        className="px-4 py-3 bg-forest text-white rounded-xl hover:bg-forest-light transition-all font-bold shadow-sm text-sm"
                      >
                        Add
                      </button>
                    </div>
                    <div className="space-y-2">
                      {formData.benefits?.map((benefit, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-white text-gray-700 px-4 py-3 rounded-xl text-xs font-bold border border-gray-100 shadow-sm animate-scale-in"
                        >
                          <span>{benefit}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveBenefit(index)}
                            className="text-gray-300 hover:text-red-500 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            {/* Visual Assets */}
            <div className="bg-white rounded-3xl shadow-soft p-8 border border-gray-100 relative">
              <div className="absolute -top-1 -right-1">
                <div className="w-24 h-24 bg-gold/10 rounded-full blur-3xl opacity-50" />
              </div>
              <ImageUpload
                currentImage={formData.image} 
                onImageUploaded={(url) => setFormData(prev => prev ? ({ ...prev, image: url }) : null)} 
              />
              <input type="hidden" name="image" value={formData.image} required />
            </div>

            {/* Visibility Settings */}
            <div className="bg-white rounded-3xl shadow-soft p-8 border border-gray-100">
               <h3 className="text-lg font-bold text-forest mb-6 pb-2 border-b border-gray-50 flex items-center lg:justify-between">
                 <span>Status & Visibility</span>
                 <div className="w-2 h-2 bg-green-500 rounded-full ml-auto animate-pulse" />
               </h3>
              
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl cursor-pointer group hover:bg-forest/5 transition-all">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-forest group-hover:text-white transition-all">
                      <LayoutDashboard className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-gray-700">Display on Home</span>
                  </div>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="w-5 h-5 text-forest rounded-lg border-gray-300 focus:ring-forest-light transition-all cursor-pointer"
                  />
                </label>

                <div className="p-5 bg-gradient-to-br from-forest/5 to-gold/5 rounded-2xl border border-forest/5 space-y-3">
                  <p className="text-[10px] font-black text-forest/40 uppercase tracking-tighter">Public Permanent Link</p>
                  <div className="flex items-center space-x-2 bg-white/50 p-2 rounded-lg border border-white">
                    <span className="text-[10px] font-mono text-gray-400 truncate">blooms.com/shop/</span>
                    <span className="text-[10px] font-mono font-bold text-forest truncate">{formData.slug}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Final Actions */}
            <div className="bg-white rounded-3xl shadow-card p-4 border border-forest/10 space-y-3">
              <button
                type="submit"
                disabled={saving}
                className="w-full py-5 bg-forest text-white rounded-2xl hover:bg-forest-light flex items-center justify-center space-x-3 font-bold text-xl shadow-card active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {saving ? (
                  <span className="flex items-center">
                    <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                    Updating...
                  </span>
                ) : (
                  <>
                    <Save className="w-6 h-6" />
                    <span>Confirm Edits</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="w-full py-4 bg-white text-gray-400 rounded-2xl hover:bg-gray-50 flex items-center justify-center font-bold text-base transition-all hover:text-red-500"
              >
                Discard Changes
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

