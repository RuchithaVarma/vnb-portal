'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { getFeaturedProducts } from '@/lib/products';
import { ArrowRight } from 'lucide-react';

export default function FeaturedProducts() {
  const products = getFeaturedProducts();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <span className="text-gold font-medium tracking-wider text-sm uppercase mb-2 block">
              Nature's Best
            </span>
            <h2 className="section-title mb-4">Featured Collection</h2>
            <p className="text-gray-600 text-lg">
              Our most popular raw powders, loved for their purity and potency.
              Hand-picked from our monthly bestsellers.
            </p>
          </div>
          <Link 
            href="/shop" 
            className="hidden md:flex items-center space-x-2 text-forest font-semibold hover:text-gold transition-colors group mt-4 md:mt-0"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>

        <div className="mt-12 text-center md:hidden">
          <Link 
            href="/shop" 
            className="btn-secondary inline-flex items-center space-x-2"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
