'use client';

import { useEffect, useState } from 'react';
import { getOrders, updateOrderStatus } from '@/lib/firestore/orders';
import { Order, OrderStatus, getOrderStatusColor, formatOrderDate, formatCurrency } from '@/lib/orders';
import { Package, ChevronDown, Eye, Filter } from 'lucide-react';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getOrders();
      setOrders(data);
      setFilteredOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter orders by status
  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(order => order.status === statusFilter));
    }
  }, [statusFilter, orders]);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      fetchOrders(); // Refresh orders
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status");
    }
  };

  const getStatusCount = (status: OrderStatus | 'all'): number => {
    if (status === 'all') return orders.length;
    return orders.filter(order => order.status === status).length;
  };

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-forest">Order Management</h1>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
          {filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'} total
        </p>
      </div>

      {/* Status Filter Tabs */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 border border-gray-100">
        <div className="flex items-center space-x-2 mb-3">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Filter Status:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              statusFilter === 'all'
                ? 'bg-forest text-white shadow-md'
                : 'bg-gray-50 text-gray-500 hover:bg-forest/5 hover:text-forest'
            }`}
          >
            All ({getStatusCount('all')})
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              statusFilter === 'pending'
                ? 'bg-yellow-500 text-white shadow-md'
                : 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
            }`}
          >
            Pending ({getStatusCount('pending')})
          </button>
          <button
            onClick={() => setStatusFilter('processing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              statusFilter === 'processing'
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
            }`}
          >
            Processing ({getStatusCount('processing')})
          </button>
          <button
            onClick={() => setStatusFilter('shipped')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              statusFilter === 'shipped'
                ? 'bg-purple-500 text-white shadow-md'
                : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
            }`}
          >
            Shipped ({getStatusCount('shipped')})
          </button>
          <button
            onClick={() => setStatusFilter('delivered')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              statusFilter === 'delivered'
                ? 'bg-green-500 text-white shadow-md'
                : 'bg-green-50 text-green-600 hover:bg-green-100'
            }`}
          >
            Delivered ({getStatusCount('delivered')})
          </button>
          <button
            onClick={() => setStatusFilter('cancelled')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              statusFilter === 'cancelled'
                ? 'bg-red-500 text-white shadow-md'
                : 'bg-red-50 text-red-700 hover:bg-red-100'
            }`}
          >
            Cancelled ({getStatusCount('cancelled')})
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        {filteredOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 text-gray-400 font-bold uppercase tracking-widest text-[9px]">
                <tr>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/20 transition-colors">
                    <td className="px-4 py-2 font-mono text-[10px] text-forest font-bold">
                      {order.id.slice(0, 8)}...
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 leading-none mb-0.5">{order.customerName}</span>
                        <span className="text-[9px] text-gray-400 font-medium">{order.customerEmail}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-[10px] text-gray-500 font-medium">
                      {formatOrderDate(order.createdAt)}
                    </td>
                    <td className="px-4 py-2">
                      <div className="relative inline-block scale-90 origin-left">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                          className={`appearance-none px-2 py-1 pr-6 rounded-md text-[9px] font-bold border-0 cursor-pointer ${getOrderStatusColor(order.status)}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        <ChevronDown className="absolute right-1.5 top-1/2 transform -translate-y-1/2 w-2.5 h-2.5 pointer-events-none opacity-50" />
                      </div>
                    </td>
                    <td className="px-4 py-2 text-right">
                      <button
                        onClick={() => viewOrderDetails(order)}
                        className="p-1.5 text-gray-400 hover:text-forest hover:bg-forest/5 rounded-lg transition-all"
                        title="View Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-gray-400">
            <Package className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="text-xs font-bold uppercase tracking-widest">No orders found</p>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center z-10">
              <div>
                <h2 className="text-lg font-black text-forest tracking-tight">Order Details</h2>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">ID: {selectedOrder.id}</p>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-forest hover:bg-gray-50 rounded-lg transition-all text-xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Summary Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6 border-b border-gray-50">
                <div>
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">Status</label>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold ${getOrderStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <div>
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">Date</label>
                  <p className="text-xs font-bold text-forest">{formatOrderDate(selectedOrder.createdAt)}</p>
                </div>
                <div>
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">Total</label>
                  <p className="text-xs font-bold text-forest">{formatCurrency(selectedOrder.totalAmount)}</p>
                </div>
                <div>
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">Payment</label>
                  <p className="text-xs font-bold text-green-600">Verified</p>
                </div>
              </div>

              {/* Customer & Shipping */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xs font-black text-forest uppercase tracking-widest">Customer</h3>
                  <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                    <p className="text-sm font-bold text-forest">{selectedOrder.customerName}</p>
                    <p className="text-xs text-gray-600 font-medium">{selectedOrder.customerEmail}</p>
                    <p className="text-xs text-gray-600 font-medium">{selectedOrder.customerPhone}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xs font-black text-forest uppercase tracking-widest">Shipping</h3>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-xs text-forest font-medium leading-relaxed">{selectedOrder.shippingAddress}</p>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div className="space-y-4">
                <h3 className="text-xs font-black text-forest uppercase tracking-widest">Order Items ({selectedOrder.items.length})</h3>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 border border-gray-50 rounded-xl hover:bg-gray-50/50 transition-colors">
                      <div className="w-12 h-12 bg-white rounded-lg p-1 border border-gray-100 flex-shrink-0">
                        <img src={item.productImage} alt={item.productName} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-forest truncate">{item.productName}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Size: {item.size}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs font-black text-forest">{formatCurrency(item.price * item.quantity)}</p>
                        <p className="text-[10px] text-gray-400 font-bold">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedOrder.notes && (
                <div className="space-y-3">
                  <h3 className="text-xs font-black text-forest uppercase tracking-widest">Notes</h3>
                  <div className="bg-gold/5 p-4 rounded-xl border border-gold/10">
                    <p className="text-xs text-forest font-medium leading-relaxed">{selectedOrder.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
