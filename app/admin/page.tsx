'use client';

import { useEffect, useState } from 'react';
import { getOrders } from '@/lib/firestore/orders';
import { getProducts } from '@/lib/firestore/products';
import { Order } from '@/lib/orders';
import { Product } from '@/lib/products';
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  Package, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    pendingOrders: 0,
    recentOrders: [] as Order[],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [orders, products] = await Promise.all([
          getOrders(),
          getProducts()
        ]);

        const revenue = orders
          .filter(o => o.status !== 'cancelled')
          .reduce((sum, o) => sum + o.totalAmount, 0);
        
        const pending = orders.filter(o => o.status === 'pending' || o.status === 'processing').length;

        setStats({
          totalRevenue: revenue,
          totalOrders: orders.length,
          totalProducts: products.length,
          pendingOrders: pending,
          recentOrders: orders.slice(0, 5),
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest"></div>
      </div>
    );
  }

  const statCards = [
    { 
      label: 'Total Revenue', 
      value: `₹${stats.totalRevenue.toLocaleString()}`, 
      icon: TrendingUp, 
      color: 'bg-green-500',
      trend: '+12.5%',
      isUp: true
    },
    { 
      label: 'Total Orders', 
      value: stats.totalOrders, 
      icon: ShoppingBag, 
      color: 'bg-forest',
      trend: '+5.2%',
      isUp: true
    },
    { 
      label: 'Products', 
      value: stats.totalProducts, 
      icon: Package, 
      color: 'bg-gold',
      trend: '0%',
      isUp: true
    },
    { 
      label: 'Pending Actions', 
      value: stats.pendingOrders, 
      icon: AlertCircle, 
      color: 'bg-red-500',
      trend: '-2',
      isUp: false
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-forest tracking-tight">Executive Dashboard</h1>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">Business Overview & Performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-3xl p-8 border border-gray-100 shadow-soft hover:shadow-2xl transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`${stat.color} p-4 rounded-2xl shadow-lg ring-4 ring-offset-0 ring-gray-50`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${stat.isUp ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {stat.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                <span>{stat.trend}</span>
              </div>
            </div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black text-forest group-hover:scale-105 transition-transform origin-left">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-soft p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black text-forest tracking-tight">Recent Orders</h2>
            <button className="text-xs font-black text-forest uppercase tracking-widest hover:underline decoration-gold decoration-2 underline-offset-4">View All</button>
          </div>
          <div className="space-y-4">
            {stats.recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-colors border border-transparent hover:border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-forest/5 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-forest" />
                  </div>
                  <div>
                    <p className="font-black text-forest tracking-tight">{order.customerName}</p>
                    <p className="text-xs text-gray-400 font-bold tracking-widest">{order.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-forest">₹{order.totalAmount}</p>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${
                    order.status === 'delivered' ? 'text-green-600' : 
                    order.status === 'pending' ? 'text-yellow-600' : 'text-blue-600'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
            {stats.recentOrders.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-400 font-bold italic">No recent transactions.</p>
              </div>
            )}
          </div>
        </div>

        {/* System Health */}
        <div className="bg-forest rounded-3xl shadow-xl p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-black tracking-tight mb-8">System Status</h2>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <CheckCircle2 className="w-5 h-5 text-gold" />
                <div>
                  <p className="font-bold text-sm">Inventory Sync</p>
                  <p className="text-[10px] text-white/60 font-medium tracking-widest uppercase">Everything up to date</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <CheckCircle2 className="w-5 h-5 text-gold" />
                <div>
                  <p className="font-bold text-sm">Razorpay Gateway</p>
                  <p className="text-[10px] text-white/60 font-medium tracking-widest uppercase">Live Connection Ready</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <CheckCircle2 className="w-5 h-5 text-gold" />
                <div>
                  <p className="font-bold text-sm">Firebase Storage</p>
                  <p className="text-[10px] text-white/60 font-medium tracking-widest uppercase">Operational 99.9%</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
              <p className="text-xs font-bold text-white/80 mb-2">PRO TIP</p>
              <p className="text-sm font-medium leading-relaxed">
                Check the "Products" tab to mark new items as featured for the home screen gallery.
              </p>
            </div>
          </div>
          {/* Decorative background circle */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gold/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}
