"use client";
import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { TrendingUp, Users, Award, Globe, HelpCircle, type LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  "⏱️": TrendingUp,
  "🏆": Award,
  "👨‍🏫": Users,
  "🌍": Globe,
};

interface StatCardProps {
  stat: {
    icon: string;
    value: string;
    label: string;
    color: string;
  };
  index: number;
}

const StatCard = ({ stat, index }: StatCardProps) => {
  const Icon = (stat.icon && iconMap[stat.icon]) || HelpCircle;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Parse numeric value for animation (e.g., "10M+" -> 10)
  const numericValue = parseFloat(stat.value.replace(/[^0-9.]/g, '')) || 0;
  const suffix = stat.value.replace(/[0-9.]/g, '');

  const count = useSpring(0, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const displayCount = useTransform(count, (latest) => {
    return Math.floor(latest).toLocaleString() + suffix;
  });

  useEffect(() => {
    if (isInView) {
      count.set(numericValue);
    }
  }, [isInView, count, numericValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="text-center group bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 relative overflow-hidden"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-[0.03] rounded-full blur-3xl group-hover:opacity-[0.08] transition-opacity`}></div>

      <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br ${stat.color} mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-orange-100`}>
        <Icon className="text-white" size={32} />
      </div>

      <motion.p className="text-4xl md:text-5xl font-black bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2 font-serif italic">
        {isInView ? <motion.span>{displayCount}</motion.span> : "0"}
      </motion.p>

      <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">{stat.label}</p>
    </motion.div>
  );
};

export default StatCard;
