'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Error Caught:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center p-6">
      <div className="max-w-xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] p-12 shadow-soft border border-red-100 text-center"
        >
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>

          <h1 className="text-3xl font-black text-forest tracking-tight mb-4">Something went wrong!</h1>
          <p className="text-gray-500 font-medium mb-10 leading-relaxed">
            We've encountered an unexpected error. Don't worry, our team has been notified. 
            You can try refreshing the page or head back to safety.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => reset()}
              className="flex-1 flex items-center justify-center space-x-2 bg-forest text-white py-4 rounded-2xl font-bold hover:bg-forest-light transition-all shadow-lg hover:shadow-forest/20"
            >
              <RefreshCcw className="w-5 h-5" />
              <span>Try Again</span>
            </button>
            <Link
              href="/"
              className="flex-1 flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all"
            >
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>

          {process.env.NODE_ENV === 'development' && (
            <div className="mt-8 p-4 bg-red-50 rounded-2xl text-left overflow-auto max-h-40">
              <p className="text-xs font-mono text-red-600">{error.message}</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
