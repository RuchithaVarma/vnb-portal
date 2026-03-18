"use client";

import { motion } from 'framer-motion';
import { ArrowLeft, Clock } from 'lucide-react';
import Link from 'next/link';

export default function TestsComingSoon() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-gradient-to-b from-white to-blue-50/30">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-lg mx-auto"
      >
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-100 text-blue-600 mb-8 mb-8 shadow-inner shadow-blue-200">
          <Clock size={48} className="animate-pulse" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
          Tests Coming Soon
        </h1>
        
        <p className="text-lg text-gray-600 mb-10 leading-relaxed font-medium">
          We're working hard to bring you comprehensive mock tests and practice papers to boost your exam preparation. Stay tuned!
        </p>

        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-bold transition-all hover:scale-105 hover:shadow-xl group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
