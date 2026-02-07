"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen lg:min-h-[100vh] flex items-center justify-center overflow-hidden bg-forest-900">
      {/* Aesthetic Background with Subtle Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_background.png"
          alt="Premium Raw Powders"
          fill
          className="object-cover object-center opacity-40 scale-105"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-900/60 via-transparent to-forest-900/80"></div>
      </div>

      {/* Minimalism-focused Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] right-[20%] w-64 h-64 bg-gold/5 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-[20%] left-[20%] w-96 h-96 bg-cream/5 rounded-full blur-[120px]"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center justify-center"
            >
              <Leaf className="w-5 h-5 text-gold" />
            </motion.div>
            <div className="h-px w-8 bg-gold/50"></div>
            <span className="text-gold font-bold text-xs tracking-[0.4em] uppercase">
              100% Raw & Natural
            </span>
            <div className="h-px w-8 bg-gold/50"></div>
            <motion.div
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              className="flex items-center justify-center"
            >
              <Leaf className="w-5 h-5 text-gold" />
            </motion.div>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tighter leading-[1.05]">
            Raw. Real. <br />
            <span className="text-gold italic font-light">Truly Pure.</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl text-cream-100/90 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
        >
          Premium chemical-free powders sourced directly from fresh farm
          produce. Experience the potent simplicity of nature.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link
            href="/shop"
            className="group relative px-12 py-5 bg-gold text-forest-900 font-black text-lg rounded-2xl transition-all duration-300 shadow-[0_20px_40px_-15px_rgba(212,175,55,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(212,175,55,0.6)] hover:-translate-y-1 active:scale-95"
          >
            Explore Shop
          </Link>
          <Link
            href="/about"
            className="group px-12 py-5 bg-transparent border-2 border-white/20 hover:border-white/40 text-white font-bold text-lg rounded-2xl transition-all duration-300 hover:bg-white/5 active:scale-95"
          >
            Our Story
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
