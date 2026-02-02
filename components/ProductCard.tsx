'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '@/lib/products';
import { useCart } from '@/lib/cart-context';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
      className="group bg-white rounded-2xl shadow-soft overflow-hidden border border-transparent hover:border-forest/5 hover:shadow-card h-full flex flex-col"
    >
      {/* Image Area */}
      <div className="relative aspect-square bg-cream-50 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-8 transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badge */}
        {product.discount > 0 && (
          <div className="absolute top-3 left-3 bg-gold text-forest-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            {product.discount}% OFF
          </div>
        )}

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button 
            className="bg-white text-forest-900 p-3 rounded-full shadow-lg hover:bg-forest hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300"
            onClick={() => addItem({ ...product, id: String(product.id), selectedSize: product.sizes[0] })}
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
          <Link 
            href={`/shop/${product.slug}`}
            className="bg-white text-forest-900 p-3 rounded-full shadow-lg hover:bg-forest hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
            aria-label="View details"
          >
            <Heart className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Details */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="text-xs font-medium text-gold mb-1 uppercase tracking-wider">
          {product.category}
        </div>
        <Link href={`/shop/${product.slug}`} className="block">
          <h3 className="font-sans text-lg font-bold text-forest-900 mb-2 group-hover:text-gold transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-baseline space-x-2 mb-3">
          <span className="text-xl font-bold text-forest-800">₹{product.price}</span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
          )}
        </div>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>
        
        <button
          onClick={() => addItem({ ...product, id: String(product.id), selectedSize: product.sizes[0] })}
          className="w-full mt-auto py-2.5 rounded-full border border-forest/20 text-forest-800 font-medium hover:bg-forest hover:text-white hover:border-forest transition-all duration-300 text-sm"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
