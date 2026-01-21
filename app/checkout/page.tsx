'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { Shield, ChevronRight, Lock, MapPin, CreditCard, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
  });

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && step !== 3) {
      router.push('/shop');
    }
  }, [items, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate Razorpay / Payment Gateway experience
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
      clearCart();
    }, 2500);
  };

  const deliveryCharge = totalPrice > 500 ? 0 : 50;

  if (step === 3) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center animate-scale-in">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-forest mb-2">Order Confirmed!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. We've sent a confirmation email to <span className="font-semibold">{formData.email}</span>.
          </p>
          <div className="bg-cream-50 rounded-xl p-4 mb-8 text-left border border-forest/10">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Order Number</span>
              <span className="font-semibold">#BE-{Math.floor(Math.random() * 900000) + 100000}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Estimated Delivery</span>
              <span className="font-semibold">3-5 Business Days</span>
            </div>
          </div>
          <Link href="/shop" className="btn-primary w-full inline-block">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          
          {/* Main Content */}
          <div className="lg:col-span-7">
            {/* Step Indicator */}
            <nav aria-label="Progress" className="mb-8">
              <ol role="list" className="flex items-center space-x-4">
                <li className="flex items-center">
                  <span className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-forest text-white' : 'bg-gray-200 text-gray-500'} font-bold text-sm`}>1</span>
                  <span className={`ml-3 text-sm font-medium ${step >= 1 ? 'text-forest' : 'text-gray-500'}`}>Shipping</span>
                </li>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <li className="flex items-center">
                  <span className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-forest text-white' : 'bg-gray-200 text-gray-500'} font-bold text-sm`}>2</span>
                  <span className={`ml-3 text-sm font-medium ${step >= 2 ? 'text-forest' : 'text-gray-500'}`}>Payment</span>
                </li>
              </ol>
            </nav>

            <div className="bg-white rounded-xl shadow-card overflow-hidden">
              {step === 1 ? (
                <div className="p-8">
                  <h2 className="text-2xl font-serif font-bold text-forest mb-6">Shipping Information</h2>
                  <form onSubmit={handleFormSubmit} className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div className="sm:col-span-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-forest focus:border-forest py-2 px-3 border"
                      />
                    </div>
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-forest focus:border-forest py-2 px-3 border"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-forest focus:border-forest py-2 px-3 border"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address line 1</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-forest focus:border-forest py-2 px-3 border"
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-forest focus:border-forest py-2 px-3 border"
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-forest focus:border-forest py-2 px-3 border"
                      />
                    </div>
                    <div>
                      <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">PIN Code</label>
                      <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        required
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-forest focus:border-forest py-2 px-3 border"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-forest focus:border-forest py-2 px-3 border"
                      />
                    </div>
                    <div className="sm:col-span-2 pt-4">
                      <button type="submit" className="w-full btn-primary py-4 text-lg">
                        Continue to Payment
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="p-8 space-y-8 animate-fade-in">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-forest mb-6">Payment</h2>
                    <div className="bg-forest-50 border border-forest/20 rounded-xl p-6 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center font-semibold text-forest">
                          <MapPin className="w-4 h-4 mr-2" />
                          Shipping to
                        </div>
                        <button onClick={() => setStep(1)} className="text-xs text-forest underline hover:text-forest-700">Edit</button>
                      </div>
                      <p className="text-sm text-gray-700">
                        {formData.firstName} {formData.lastName}<br />
                        {formData.address}, {formData.city}, {formData.state} - {formData.pincode}<br />
                        {formData.phone}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <CreditCard className="w-5 h-5 mr-2 text-forest" />
                      Payment Method
                    </h3>
                    <div className="space-y-4">
                      <div className="relative border-2 border-forest rounded-xl p-4 bg-forest/5 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-4 border-forest rounded-full mr-3"></div>
                          <div>
                            <span className="block font-bold text-forest">Razorpay</span>
                            <span className="text-xs text-forest/70">Cards, UPI, Netbanking, Wallets</span>
                          </div>
                        </div>
                        <img src="https://razorpay.com/assets/razorpay-glyph.svg" alt="Razorpay" className="h-6" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <button 
                      onClick={handlePayment}
                      disabled={isProcessing}
                      className="w-full btn-primary py-4 text-lg flex items-center justify-center space-x-2"
                    >
                      {isProcessing ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Securing Payment...</span>
                        </div>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>Pay ₹{totalPrice + deliveryCharge} & Complete Order</span>
                        </>
                      )}
                    </button>
                    <p className="mt-4 text-center text-xs text-gray-500 flex items-center justify-center">
                      <Shield className="w-3 h-3 mr-1" />
                      Safe and Secure Payments • SSL Encrypted
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Order Summary */}
          <div className="mt-10 lg:mt-0 lg:col-span-5">
            <div className="bg-white rounded-xl shadow-card p-6 sticky top-24">
              <h2 className="text-xl font-serif font-bold text-forest mb-6 border-b border-gray-100 pb-4">Order Summary</h2>
              <div className="flow-root mb-6">
                <ul role="list" className="-my-4 divide-y divide-gray-100 max-h-96 overflow-y-auto pr-2 scrollbar-thin">
                  {items.map((item) => (
                    <li key={`${item.id}-${item.selectedSize}`} className="flex py-4">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-cream">
                        <div className="w-full h-full bg-gradient-to-br from-forest/10 to-gold/10 flex items-center justify-center text-xs text-forest/40">
                          Powder
                        </div>
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3 className="text-sm font-bold line-clamp-1">{item.name}</h3>
                            <p className="ml-4 text-sm">₹{item.price * item.quantity}</p>
                          </div>
                          <p className="mt-1 text-xs text-gray-500">{item.selectedSize} × {item.quantity}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 border-t border-gray-100 pt-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">₹{totalPrice}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-gray-900">
                    {deliveryCharge === 0 ? <span className="text-green-600 font-bold italic">FREE</span> : `₹${deliveryCharge}`}
                  </span>
                </div>
                {deliveryCharge > 0 && (
                  <p className="text-[10px] text-gray-500 italic">Add ₹{500 - totalPrice} more for Free Delivery</p>
                )}
                <div className="flex items-center justify-between border-t border-forest/10 pt-4">
                  <span className="text-lg font-bold text-forest">Total</span>
                  <span className="text-2xl font-bold text-forest">₹{totalPrice + deliveryCharge}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
