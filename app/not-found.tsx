'use client';

import Link from 'next/link';
import { ShoppingBag, Home, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream-100 flex items-center justify-center p-6">
      <div className="max-w-xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[3rem] p-12 shadow-soft border border-gray-100"
        >
          <div className="w-24 h-24 bg-forest rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-forest/20">
            <Search className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-6xl font-black text-forest tracking-tighter mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Oops! This path is a dead end.</h2>
          <p className="text-gray-500 font-medium mb-10 leading-relaxed">
            The page you are looking for might have been moved, deleted, or never existed in the first place. Let's get you back on track.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link 
              href="/" 
              className="flex items-center justify-center space-x-2 bg-forest text-white py-4 rounded-2xl font-bold hover:bg-forest-light transition-all shadow-lg hover:shadow-forest/20"
            >
              <Home className="w-5 h-5" />
              <span>Back Home</span>
            </Link>
            <Link 
              href="/shop" 
              className="flex items-center justify-center space-x-2 bg-gold text-white py-4 rounded-2xl font-bold hover:bg-gold-dark transition-all shadow-lg hover:shadow-gold/20"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </motion.div>

        <div className="mt-12 text-gray-400 font-bold uppercase tracking-widest text-[10px]">
          &copy; {new Date().getFullYear()} Blooms Energy &bull; All Rights Reserved
        </div>
      </div>
    </div>
  );
}
