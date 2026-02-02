'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background with modern overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_background.png"
          alt="Premium Raw Powders"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-900/60 via-forest-900/40 to-forest-900/80"></div>
      </div>

      {/* Floating Elements Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ y: [0, -20, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-[10%] w-64 h-64 bg-gold/10 rounded-full blur-3xl opacity-50"
        />
        <motion.div 
          animate={{ y: [0, 20, 0] }} 
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-20 left-[10%] w-96 h-96 bg-cream/10 rounded-full blur-3xl opacity-30"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block py-1 px-4 rounded-full bg-white/10 backdrop-blur-md text-gold font-medium text-sm tracking-wider mb-6 border border-white/20">
            100% PURE & NATURAL
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight drop-shadow-lg leading-tight">
            Raw. Real. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">
              Truly Pure.
            </span>
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-xl sm:text-2xl text-cream-100 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
        >
          Experience nature's potency with our clean, chemical-free powders. 
          Fresh farm produce, lab-tested quality, and zero additives.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link
            href="/shop"
            className="group relative px-8 py-4 bg-gold hover:bg-gold-400 text-forest-900 font-bold text-lg rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:-translate-y-1 overflow-hidden"
          >
            <span className="relative z-10">Shop All Products</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </Link>
          <Link
            href="/about"
            className="group px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white font-semibold text-lg rounded-full transition-all duration-300 hover:-translate-y-1"
          >
            Our Story
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
