'use client';

import { useState } from 'react';
import { Minus, Plus, ShoppingCart, CheckCircle } from 'lucide-react';
import { Product } from '@/lib/products';
import { useCart } from '@/lib/cart-context';

interface ProductClientProps {
  product: Product;
}

export default function ProductClient({ product }: ProductClientProps) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[1] || product.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  return (
    <div className="space-y-6">
      {/* Price */}
      <div className="flex items-baseline space-x-3">
        <span className="text-4xl font-bold text-forest">
          ₹{product.price}
        </span>
        <span className="text-xl text-gray-400 line-through">
          ₹{product.originalPrice}
        </span>
        <span className="bg-gold text-white text-sm font-bold px-3 py-1 rounded-full">
          {product.discount}% OFF
        </span>
      </div>

      {/* Size Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Size
        </label>
        <div className="flex flex-wrap gap-3">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-6 py-3 rounded-md font-semibold transition-all ${
                selectedSize === size
                  ? 'bg-forest text-white shadow-md'
                  : 'bg-cream-100 text-forest hover:bg-cream-200'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quantity
        </label>
        <div className="flex items-center space-x-4">
          <button
            onClick={decrementQuantity}
            className="w-10 h-10 rounded-md bg-cream-100 hover:bg-cream-200 flex items-center justify-center transition-colors"
          >
            <Minus className="w-4 h-4 text-forest" />
          </button>
          <span className="text-xl font-semibold w-12 text-center">
            {quantity}
          </span>
          <button
            onClick={incrementQuantity}
            className="w-10 h-10 rounded-md bg-cream-100 hover:bg-cream-200 flex items-center justify-center transition-colors"
          >
            <Plus className="w-4 h-4 text-forest" />
          </button>
        </div>
      </div>

      {/* Add to Cart */}
      <button 
        onClick={() => addItem(product, quantity, selectedSize)}
        className="w-full btn-primary text-lg py-4 flex items-center justify-center space-x-2"
      >
        <ShoppingCart className="w-5 h-5" />
        <span>Add to Cart - ₹{product.price * quantity}</span>
      </button>

      {/* FSSAI Badge */}
      {product.fssai && (
        <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-4 py-3 rounded-lg">
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">FSSAI Certified & Lab Tested</span>
        </div>
      )}
    </div>
  );
}
