'use client';

 import { motion } from 'framer-motion';
 import Image from 'next/image';
 import { Instagram } from 'lucide-react';
 import { products } from '@/lib/products';
 
 export default function InstagramFeed() {
   // Use products as placeholder for instagram feed
   const feedImages = products.slice(0, 6).map(p => ({
     id: p.id,
     image: p.image,
     alt: p.name
   }));
 
   return (
     <section className="py-20 bg-white overflow-hidden">
       <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
         <Instagram className="w-8 h-8 text-forest mx-auto mb-4" />
         <h2 className="section-title">@BloomsEnergy</h2>
         <p className="text-gray-600">Join our community of wellness enthusiasts</p>
       </div>
 
       <div className="relative">
         <motion.div 
           className="flex space-x-6 px-4"
           animate={{ x: [0, -1000] }}
           transition={{ 
             duration: 20, 
             repeat: Infinity, 
             ease: "linear" 
           }}
         >
           {[...feedImages, ...feedImages].map((item, index) => (
             <div 
               key={`${item.id}-${index}`}
               className="flex-shrink-0 w-64 h-64 relative rounded-xl overflow-hidden group cursor-pointer"
             >
               <Image
                 src={item.image}
                 alt={item.alt}
                 fill
                 className="object-cover transition-transform duration-500 group-hover:scale-110"
               />
               <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                 <Instagram className="w-8 h-8 text-white" />
               </div>
             </div>
           ))}
         </motion.div>
       </div>
     </section>
   );
 }
