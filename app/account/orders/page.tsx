'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getOrders, updateOrderStatus } from '@/lib/firestore/orders';
import { Order, getOrderStatusColor, formatOrderDate, formatCurrency } from '@/lib/orders';
import { Package, ChevronRight, ShoppingBag, Clock, MapPin, XCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function OrderHistoryPage() {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserOrders = async () => {
    if (!user) return;
    try {
      const allOrders = await getOrders();
      const userOrders = allOrders.filter(o => o.customerEmail === user.email);
      setOrders(userOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (error) {
      console.error("Error fetching user orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      if (user) {
        fetchUserOrders();
      } else {
        setLoading(false);
      }
    }
  }, [user, authLoading]);

  const handleCancelOrder = async (orderId: string) => {
    if (!confirm('Are you sure you want to cancel this order?')) return;
    
    try {
      await updateOrderStatus(orderId, 'cancelled');
      await fetchUserOrders();
    } catch (error) {
      console.error("Failed to cancel order:", error);
      alert("Failed to cancel order. Please contact support.");
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-cream-50 pt-24 pb-12 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-cream-50 pt-32 pb-12 px-6">
        <div className="max-w-md mx-auto text-center bg-white p-12 rounded-3xl shadow-soft">
          <ShoppingBag className="w-16 h-16 text-forest/20 mx-auto mb-6" />
          <h1 className="text-2xl font-black text-forest mb-4">Sign in for your orders</h1>
          <p className="text-gray-500 mb-8 font-medium">Please sign in to view your order history and track shipments.</p>
          <Link href="/login" className="btn-primary w-full py-4 text-center block">Sign In Now</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-black text-forest tracking-tight">Order History</h1>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">Manage your purchases & tracking</p>
          </div>
          <Link href="/shop" className="text-sm font-black text-gold uppercase tracking-widest hover:underline decoration-2 underline-offset-8">Continue Shopping</Link>
        </div>

        {orders.length > 0 ? (
          <div className="space-y-8">
            {orders.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl shadow-soft overflow-hidden border border-gray-100 hover:shadow-2xl transition-all group"
              >
                {/* Header */}
                <div className="p-6 md:p-8 bg-gray-50/50 border-b border-gray-100 flex flex-wrap gap-6 justify-between items-center">
                  <div className="flex gap-8">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Order Placed</p>
                      <p className="text-sm font-black text-forest">{formatOrderDate(order.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total</p>
                      <p className="text-sm font-black text-forest">{formatCurrency(order.totalAmount)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Order #</p>
                      <p className="text-sm font-mono font-bold text-gray-500">{order.id.slice(0, 8)}...</p>
                    </div>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${getOrderStatusColor(order.status)}`}>
                    {order.status}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <div className="space-y-6">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-6">
                        <div className="w-20 h-20 bg-cream-50 rounded-2xl overflow-hidden flex-shrink-0 border border-cream-100">
                          <img src={item.productImage} alt={item.productName} className="w-full h-full object-contain p-2" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-black text-forest tracking-tight">{item.productName}</h4>
                          <div className="flex items-center space-x-4 mt-1">
                            <p className="text-xs text-gray-500 font-bold">Qty: {item.quantity}</p>
                            <p className="text-xs text-gray-500 font-bold">Size: {item.size}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-forest">{formatCurrency(item.price)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-50 flex flex-wrap gap-4 justify-between items-center">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <p className="text-xs font-bold truncate max-w-[250px]">{order.shippingAddress}</p>
                    </div>
                    <div className="flex space-x-3">
                      {(order.status === 'pending' || order.status === 'processing') && (
                        <button 
                          onClick={() => handleCancelOrder(order.id)}
                          className="px-6 py-2.5 rounded-xl border border-red-200 text-xs font-black text-red-500 uppercase tracking-widest hover:bg-red-50 transition-all flex items-center space-x-2"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>Cancel Order</span>
                        </button>
                      )}
                      <button className="px-6 py-2.5 rounded-xl border border-gray-200 text-xs font-black text-forest uppercase tracking-widest hover:bg-gray-50 transition-all">
                        Buy Again
                      </button>
                      <button className="px-6 py-2.5 rounded-xl bg-forest text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-forest/10 hover:shadow-forest/20 transition-all">
                        Track Order
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-soft border border-gray-100">
            <div className="w-24 h-24 bg-cream-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-forest/20" />
            </div>
            <h2 className="text-2xl font-black text-forest mb-2">No orders found</h2>
            <p className="text-gray-500 font-medium mb-8">You haven't placed any orders yet. Let's fix that!</p>
            <Link href="/shop" className="btn-primary inline-block px-12 py-4">Start Shopping</Link>
          </div>
        )}
      </div>
    </div>
  );
}
