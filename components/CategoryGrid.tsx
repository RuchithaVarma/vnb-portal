'use client';
 
 import { motion } from 'framer-motion';
 import Link from 'next/link';
 import { ArrowRight } from 'lucide-react';
 
 export default function CategoryGrid() {
   const categories = [
     {
       id: 'leafy',
       name: 'Leafy Greens',
       description: 'Nutrient-packed powders for daily vitality',
       image: '/categories/leafy.png', 
       color: 'bg-green-50',
       link: '/shop?category=leafy'
     },
     {
       id: 'vegetable',
       name: 'Vegetable Roots',
       description: 'Essential grounding nutrition for wellness',
       image: '/categories/vegetable.png', 
       color: 'bg-orange-50',
       link: '/shop?category=vegetable'
     },
     {
       id: 'fruit',
       name: 'Pure Fruits',
       description: 'Natural sweetness and antioxidant power',
       image: '/categories/fruit.png', 
       color: 'bg-red-50',
       link: '/shop?category=fruit'
     }
   ];
 
   return (
     <section className="py-20 bg-cream-100">
       <div className="max-w-7xl mx-auto px-6">
         <div className="text-center mb-16">
           <span className="text-gold font-medium tracking-wider text-sm uppercase mb-2 block">
             Pure Selection
           </span>
           <h2 className="section-title">Shop by Category</h2>
           <p className="text-gray-600 max-w-2xl mx-auto text-lg">
             Explore our range of consciously crafted powders, categorized for your
             specific health goals and wellness needs.
           </p>
         </div>
 
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {categories.map((category, index) => (
             <Link key={category.id} href={category.link}>
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: index * 0.2 }}
                 whileHover={{ y: -5 }}
                 className="group relative h-[400px] rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300"
               >
                 {/* Background Image */}
                 <div
                   className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                   style={{
                     backgroundImage: `url('${category.image}')`,
                   }}
                 ></div>
                 
                 {/* Overlay */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300"></div>
 
                 {/* Content */}
                 <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                   <h3 className="font-sans text-2xl font-bold mb-2 group-hover:text-gold transition-colors">
                     {category.name}
                   </h3>
                   <p className="text-gray-200 mb-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                     {category.description}
                   </p>
                   <div className="flex items-center space-x-2 text-sm font-medium uppercase tracking-wider text-gold">
                     <span>Explore</span>
                     <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                   </div>
                 </div>
               </motion.div>
             </Link>
           ))}
         </div>
       </div>
     </section>
   );
 }
