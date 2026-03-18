"use client";

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft, Sparkles } from 'lucide-react';

export default function ComingSoonPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-black flex items-center justify-center text-white p-6 overflow-hidden relative">
      {/* Dynamic Background Decorations */}
      <div className="absolute inset-0 opacity-20">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--primary)] rounded-full blur-[120px] -z-10"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-pink-500 rounded-full blur-[100px] -z-10"
          animate={{ scale: [1, 1.2, 1], rotate: [0, -45, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10 shadow-2xl relative z-10"
      >
        {/* Animated Icon */}
        <motion.div 
          className="w-20 h-20 bg-gradient-to-br from-[var(--primary)] to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl relative"
          animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Clock size={40} className="text-white" />
          <motion.div 
            className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Text Details */}
        <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full border border-white/10 mb-4">
          <Sparkles className="text-yellow-400" size={16} />
          <span className="text-xs font-black uppercase tracking-wider text-yellow-200">Exciting Feature</span>
        </div>
        
        <h1 className="text-4xl font-black mb-4 tracking-tight">
          Coming <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-orange-400">Soon!</span>
        </h1>
        
        <p className="text-gray-400 text-sm font-medium leading-relaxed mb-10">
          We are polishing this experience to bring you the highest-quality interface possible. Stay tuned for awesome downloads and interactive materials!
        </p>

        {/* Back Button Action */}
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => router.back()}
          className="w-full py-4 bg-white hover:bg-gray-100 text-[#0f172a] rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 transition-all duration-300"
        >
          <ArrowLeft size={16} />
          Go Back
        </motion.button>
      </motion.div>
    </div>
  );
}
