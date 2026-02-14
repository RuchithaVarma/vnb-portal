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
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    pendingOrders: 0,
    totalVisitors: 0,
    recentOrders: [] as Order[],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [orders, products, visitorStats] = await Promise.all([
          getOrders(),
          getProducts(),
          import('@/lib/firestore/analytics').then(mod => mod.getVisitorStats())
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
          totalVisitors: visitorStats.total || 0,
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
      label: 'Products', 
      value: stats.totalProducts, 
      icon: Package, 
      color: 'bg-gold',
      trend: 'Total Assets',
      isUp: true
    },
    { 
      label: 'Total Orders', 
      value: stats.totalOrders, 
      icon: ShoppingBag, 
      color: 'bg-forest',
      trend: 'Order History',
      isUp: true
    },
    { 
      label: 'Total Visitors', 
      value: stats.totalVisitors, 
      icon: Users, 
      color: 'bg-blue-600',
      trend: 'Traffic',
      isUp: true
    },
  ];

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-xl font-black text-forest tracking-tight">Executive Dashboard</h1>
        <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px] mt-0.5">Store Overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex justify-between items-start mb-3">
              <div className={`${stat.color} p-2 rounded-lg shadow-sm`}>
                <stat.icon className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-center space-x-1 px-1.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter bg-gray-50 text-gray-400">
                <span>{stat.trend}</span>
              </div>
            </div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[8px] mb-0.5">{stat.label}</p>
            <h3 className="text-xl font-black text-forest group-hover:scale-105 transition-transform origin-left">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-black text-forest tracking-tight">Recent Orders</h2>
            <Link href="/admin/orders" className="text-[9px] font-black text-forest uppercase tracking-widest hover:underline decoration-gold decoration-2 underline-offset-4">View All</Link>
          </div>
          <div className="space-y-2">
            {stats.recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-2 pl-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-forest/5 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-forest" />
                  </div>
                  <div>
                    <p className="font-bold text-xs text-forest tracking-tight">{order.customerName}</p>
                    <p className="text-[8px] text-gray-400 font-bold tracking-widest">{order.id.slice(0, 12)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-xs text-forest">₹{order.totalAmount}</p>
                  <span className={`text-[8px] font-black uppercase tracking-widest ${
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
        <div className="bg-forest rounded-2xl shadow-md p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-xl font-black tracking-tight mb-6">System Status</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-4 h-4 text-gold" />
                <div>
                  <p className="font-bold text-xs">Inventory Sync</p>
                  <p className="text-[8px] text-white/60 font-medium tracking-widest uppercase">Up to date</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-4 h-4 text-gold" />
                <div>
                  <p className="font-bold text-xs">Razorpay Gateway</p>
                  <p className="text-[8px] text-white/60 font-medium tracking-widest uppercase">Live Ready</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-4 h-4 text-gold" />
                <div>
                  <p className="font-bold text-xs">Firebase Storage</p>
                  <p className="text-[8px] text-white/60 font-medium tracking-widest uppercase">Operational</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-white/10 rounded-xl border border-white/10 backdrop-blur-sm">
              <p className="text-[9px] font-bold text-white/80 mb-1 uppercase tracking-wider">Pro Tip</p>
              <p className="text-xs font-medium leading-relaxed opacity-90">
                Mark items as featured to highlight them on the home screen.
              </p>
            </div>
          </div>
          <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-gold/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}
