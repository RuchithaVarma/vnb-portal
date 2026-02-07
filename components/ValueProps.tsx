"use client";

import { motion } from "framer-motion";
import { Leaf, ShieldCheck, Truck, Award } from "lucide-react";

export default function ValueProps() {
  const features = [
    {
      icon: Leaf,
      title: "100% Natural",
      description: "Zero additives, preservatives, or artificial colors",
    },
    {
      icon: ShieldCheck,
      title: "Lab Tested",
      description: "Rigorous quality checks for purity and potency",
    },
    {
      icon: Award,
      title: "FSSAI Certified",
      description: "Licensed and approved for highest safety standards",
    },
    {
      icon: Truck,
      title: "Farm Direct",
      description: "Sourced directly from farmers to your doorstep",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section className="py-8 bg-forest text-white overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cream/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-3 p-2 rounded-full bg-white/10 backdrop-blur-sm group-hover:bg-gold group-hover:text-forest-900 transition-all duration-300">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="font-sans text-base font-bold mb-1 text-gold-200 group-hover:text-white transition-colors">
                {feature.title}
              </h3>
              <p className="text-cream-200 text-sm leading-relaxed max-w-xs">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
