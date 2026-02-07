"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addProduct } from "@/lib/firestore/products";
import { Product } from "@/lib/products";
import Link from "next/link";
import { ArrowLeft, Save, X, Package, LayoutDashboard, PlusCircle, Loader2 } from "lucide-react";
import SimpleImageUpload from "@/components/admin/SimpleImageUpload";
import CategoryDropdown from '@/components/admin/CategoryDropdown';

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    slug: "",
    category: "Vegetable", // Default capitalized for niceness
    price: 0,
    originalPrice: 0,
    discount: 0,
    sizes: ["100g", "250g"],
    image: "",
    description: "",
    benefits: [],
    fssai: true,
    featured: false,
  });

  const [benefitInput, setBenefitInput] = useState("");
  const [sizeInput, setSizeInput] = useState("");

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    if (name === "name") {
      const slug = generateSlug(value);
      setFormData((prev) => ({ ...prev, name: value, slug }));
    } else if (type === "number") {
      setFormData((prev) => ({ ...prev, [name]: parseFloat(value) }));
    } else if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddBenefit = () => {
    if (benefitInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        benefits: [...(prev.benefits || []), benefitInput.trim()],
      }));
      setBenefitInput("");
    }
  };

  const handleRemoveBenefit = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits?.filter((_, i) => i !== index),
    }));
  };

  const handleAddSize = () => {
    if (sizeInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        sizes: [...(prev.sizes || []), sizeInput.trim()],
      }));
      setSizeInput("");
    }
  };

  const handleRemoveSize = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes?.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Basic validation
      if (!formData.name || !formData.slug || !formData.price) {
        alert("Please fill in all required fields");
        return;
      }

      await addProduct({
        ...formData,
        id: Date.now(), // Generate a numeric ID
      } as Product);

      router.push("/admin/products");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

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
            <h1 className="text-3xl font-extrabold text-forest tracking-tight">Add New Product</h1>
            <p className="text-gray-500 font-medium">Create a fresh entry for your store</p>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-2 bg-forest/10 px-4 py-2 rounded-full border border-forest/20">
          <div className="w-2 h-2 bg-forest rounded-full animate-pulse" />
          <span className="text-sm font-bold text-forest">Draft Mode</span>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information Section */}
            <div className="bg-white rounded-3xl shadow-soft p-8 border border-gray-100 hover:shadow-card transition-shadow duration-500">
              <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-gray-50">
                <div className="p-2 bg-forest/10 rounded-lg">
                  <Package className="w-5 h-5 text-forest" />
                </div>
                <h2 className="text-xl font-bold text-forest">Basic Information</h2>
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
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-forest/10 focus:border-forest outline-none transition-all text-lg font-medium placeholder:text-gray-300"
                    placeholder="e.g. Organic Turmeric Powder"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-base font-bold text-gray-800 mb-2">
                      Price (₹)
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
                      Original Price (₹)
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
                      Discount (%)
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
                      onChange={(val) => setFormData(prev => ({ ...prev, category: val }))} 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Content & Description Section */}
            <div className="bg-white rounded-3xl shadow-soft p-8 border border-gray-100">
              <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-gray-50">
                <div className="p-2 bg-gold/10 rounded-lg">
                  <LayoutDashboard className="w-5 h-5 text-gold" />
                </div>
                <h2 className="text-xl font-bold text-forest">Product Details</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-base font-bold text-gray-800 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-forest/10 focus:border-forest outline-none transition-all text-lg font-medium leading-relaxed"
                    placeholder="Tell your customers what makes this product special..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Sizes */}
                  <div>
                    <label className="block text-base font-bold text-gray-800 mb-3 font-serif italic text-forest">
                      Available Sizes
                    </label>
                    <div className="flex space-x-2 mb-4">
                      <input
                        type="text"
                        value={sizeInput}
                        onChange={(e) => setSizeInput(e.target.value)}
                        className="flex-1 px-4 py-3 bg-white border-2 border-gray-100 rounded-xl focus:border-forest outline-none transition-all font-medium"
                        placeholder="e.g. 500g"
                      />
                      <button
                        type="button"
                        onClick={handleAddSize}
                        className="px-5 py-3 bg-forest text-white rounded-xl hover:bg-forest-light transition-all font-bold shadow-soft"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.sizes?.map((size, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 bg-forest/5 text-forest px-4 py-2 rounded-xl text-sm font-bold border border-forest/10 animate-scale-in"
                        >
                          <span>{size}</span>
                          <button 
                            type="button" 
                            onClick={() => handleRemoveSize(index)}
                            className="hover:text-red-500 transition-colors bg-white/50 rounded-full p-0.5"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <label className="block text-base font-bold text-gray-800 mb-3 font-serif italic text-forest">
                      Health Benefits
                    </label>
                    <div className="flex space-x-2 mb-4">
                      <input
                        type="text"
                        value={benefitInput}
                        onChange={(e) => setBenefitInput(e.target.value)}
                        className="flex-1 px-4 py-3 bg-white border-2 border-gray-100 rounded-xl focus:border-forest outline-none transition-all font-medium"
                        placeholder="e.g. Rich in iron"
                      />
                      <button
                        type="button"
                        onClick={handleAddBenefit}
                        className="px-5 py-3 bg-forest text-white rounded-xl hover:bg-forest-light transition-all font-bold shadow-soft"
                      >
                        Add
                      </button>
                    </div>
                    <div className="space-y-2">
                      {formData.benefits?.map((benefit, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gold/5 text-gold-900 px-4 py-3 rounded-xl text-sm font-bold border border-gold/10 animate-scale-in"
                        >
                          <span>{benefit}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveBenefit(index)}
                            className="text-gold-400 hover:text-red-500 transition-colors"
                          >
                            <X className="w-5 h-5" />
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
            {/* Image Section */}
            <div className="bg-white rounded-3xl shadow-soft p-8 border border-gray-100 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-2 h-full bg-forest" />
              <SimpleImageUpload
                currentImage={formData.image}
                onImageUploaded={(url) =>
                  setFormData((prev) => ({ ...prev, image: url }))
                }
              />
              <input type="hidden" name="image" value={formData.image} required />
            </div>

            {/* Publishing Settings */}
            <div className="bg-white rounded-3xl shadow-soft p-8 border border-gray-100">
              <h3 className="text-lg font-bold text-forest mb-6 pb-2 border-b border-gray-50">Publishing Settings</h3>
              
              <div className="space-y-6">
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl cursor-pointer group hover:bg-forest/5 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-forest group-hover:text-white transition-all">
                      <PlusCircle className="w-5 h-5" />
                    </div>
                    <span className="text-base font-bold text-gray-700">Featured</span>
                  </div>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="w-6 h-6 text-forest rounded-lg border-gray-300 focus:ring-forest-light transition-all cursor-pointer"
                  />
                </label>

                <div className="p-4 bg-forest/5 rounded-2xl border border-forest/10">
                  <p className="text-xs text-forest/60 font-medium mb-3">Live URL Preview:</p>
                  <p className="text-sm font-mono text-gray-400 truncate">
                    /shop/{formData.slug || '...'}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-forest text-white rounded-3xl hover:bg-forest-light flex items-center justify-center space-x-3 font-bold text-xl shadow-card hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center">
                    <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                    Saving...
                  </span>
                ) : (
                  <>
                    <Save className="w-6 h-6" />
                    <span>Save Product</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="w-full py-5 bg-white text-gray-500 rounded-3xl hover:bg-gray-50 flex items-center justify-center font-bold text-lg border border-gray-100 transition-all hover:text-red-500"
              >
                Cancel Changes
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

