'use client';

import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import Link from 'next/link';

export default function CartDrawer() {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    totalPrice, 
    isCartOpen, 
    setIsCartOpen 
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      ></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md pointer-events-auto">
          <div className="h-full flex flex-col bg-white shadow-2xl animate-slide-in-right">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-cream">
              <h2 className="text-xl font-serif font-bold text-forest flex items-center">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Your Shopping Cart
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-gray-400 hover:text-forest transition-colors rounded-full hover:bg-gray-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-thin scrollbar-thumb-gray-200">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-gray-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Your cart is empty</h3>
                    <p className="text-gray-500 mt-1">Looks like you haven't added anything yet.</p>
                  </div>
                  <Link 
                    href="/shop"
                    onClick={() => setIsCartOpen(false)}
                    className="btn-primary mt-4"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}`} className="flex items-center space-x-4 pb-6 border-b border-gray-100">
                      <div className="w-20 h-20 bg-cream-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                        {/* Static placeholder for images as in original */}
                        <div className="w-10 h-10 bg-gradient-to-br from-forest/20 to-gold/20 rounded-full"></div>
                      </div>
                      
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between">
                          <h4 className="font-semibold text-gray-900">{item.name}</h4>
                          <button 
                            onClick={() => removeItem(item.id, item.selectedSize)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-500">{item.selectedSize}</p>
                        
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-gray-200 rounded-md bg-white">
                            <button 
                              onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                              className="p-1 text-gray-500 hover:text-forest transition-colors disabled:opacity-50"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                              className="p-1 text-gray-500 hover:text-forest transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-bold text-forest">₹{item.price * item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 px-6 py-6 bg-cream/50 space-y-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-bold text-forest text-2xl">₹{totalPrice}</span>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Taxes and shipping calculated at checkout
                </p>
                <div className="grid grid-cols-1 gap-3">
                  <Link 
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="btn-primary w-full py-4 text-lg text-center"
                  >
                    Checkout Now
                  </Link>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="btn-secondary w-full py-3"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
