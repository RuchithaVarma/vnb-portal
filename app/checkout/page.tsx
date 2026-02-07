'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { Shield, ChevronRight, Lock, MapPin, CreditCard, CheckCircle2, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { createOrder } from '@/lib/firestore/orders';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'whatsapp'>('razorpay');
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

  // Load Razorpay Script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && step !== 3) {
      router.push('/shop');
    }
  }, [items, router, step]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const deliveryChargeValue = totalPrice > 500 ? 0 : 50;
  const grandTotal = totalPrice + deliveryChargeValue;

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // 0. Check for valid keys
      const rzpKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!rzpKey || rzpKey.includes('YourKeyIdHere')) {
        alert("Razorpay Key is not configured correctly. Please update NEXT_PUBLIC_RAZORPAY_KEY_ID in your environment variables.");
        setIsProcessing(false);
        return;
      }

      // 1. Create Order in Razorpay via our API
      const response = await fetch('/api/razorpay/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: grandTotal,
          currency: 'INR',
          receipt: `rcpt_${Date.now()}`,
        }),
      });

      const orderData = await response.json();

      if (orderData.error) {
        throw new Error(orderData.error);
      }

      // 2. Open Razorpay Checkout
      const options = {
        key: rzpKey,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Blooms Energy',
        description: 'Raw Powders Purchase',
        order_id: orderData.id,
        handler: async function (paymentResponse: any) {
          try {
            // 3. Verify Payment Server-Side
            const verifyRes = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature: paymentResponse.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (!verifyData.verified) {
              throw new Error("Payment verification failed");
            }

            // 4. Handle Success - Map CartItems to OrderItems
            const orderItems = items.map(item => ({
              productId: String(item.id),
              productSlug: item.slug || '',
              productName: item.name,
              productImage: item.image || '',
              quantity: item.quantity,
              size: item.selectedSize,
              price: item.price
            }));

            const newOrderId = await createOrder({
              customerName: `${formData.firstName} ${formData.lastName}`,
              customerEmail: formData.email,
              customerPhone: formData.phone,
              shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
              items: orderItems,
              totalAmount: grandTotal,
              status: 'processing',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              notes: `Razorpay Payment ID: ${paymentResponse.razorpay_payment_id}`
            });
            
            setOrderId(newOrderId);
            setStep(3);
            clearCart();
          } catch (err) {
            console.error("Verification Error:", err);
            alert("Payment verification failed. Please contact support.");
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#1A4D2E', // forest color
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (failedResponse: any) {
        alert("Payment Failed: " + failedResponse.error.description);
        setIsProcessing(false);
      });
      rzp.open();
    } catch (error: any) {
      console.error("Payment Error:", error);
      alert(error.message || "Something went wrong with the payment. Please try again.");
      setIsProcessing(false);
    }
  };

  const handleWhatsAppOrder = async () => {
    setIsProcessing(true);
    try {
      // 1. Prepare Order Data
      const orderItems = items.map(item => ({
        productId: String(item.id),
        productSlug: item.slug || '',
        productName: item.name,
        productImage: item.image || '',
        quantity: item.quantity,
        size: item.selectedSize,
        price: item.price
      }));

      const newOrderId = await createOrder({
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
        items: orderItems,
        totalAmount: grandTotal,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        notes: `WhatsApp Order Request`
      });

      // 2. Format WhatsApp Message
      const message = `*New Order Request - Blooms Energy*%0A%0A` +
        `*Order ID:* ${newOrderId}%0A` +
        `*Customer:* ${formData.firstName} ${formData.lastName}%0A` +
        `*Phone:* ${formData.phone}%0A%0A` +
        `*Items:*%0A` +
        items.map(item => `- ${item.name} (${item.selectedSize}) x ${item.quantity} - ₹${item.price * item.quantity}`).join('%0A') +
        `%0A%0A*Order Total:* ₹${grandTotal}%0A` +
        `*Shipping Address:* ${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}%0A%0A` +
        `Please confirm this order and provide payment details.`;

      const whatsappUrl = `https://wa.me/911234567890?text=${message}`;
      
      // 3. Complete Flow
      setOrderId(newOrderId);
      setStep(3);
      clearCart();
      
      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');
      
    } catch (error) {
      console.error("WhatsApp Order Error:", error);
      alert("Something went wrong. Please try again or use Razorpay.");
    } finally {
      setIsProcessing(false);
    }
  };


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
              <span className="font-semibold text-forest">#{orderId}</span>
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
      <div className="max-w-7xl mx-auto px-6">
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
                        className="mt-1 block w-full border-gray-200 bg-gray-50 rounded-2xl shadow-sm focus:ring-4 focus:ring-forest/10 focus:border-forest py-4 px-5 border transition-all text-lg font-medium"
                      />
                    </div>
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-bold text-gray-700 ml-2 mb-1">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-200 bg-gray-50 rounded-2xl shadow-sm focus:ring-4 focus:ring-forest/10 focus:border-forest py-4 px-5 border transition-all text-lg font-medium"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-bold text-gray-700 ml-2 mb-1">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-200 bg-gray-50 rounded-2xl shadow-sm focus:ring-4 focus:ring-forest/10 focus:border-forest py-4 px-5 border transition-all text-lg font-medium"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="address" className="block text-sm font-bold text-gray-700 ml-2 mb-1">Address line 1</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-200 bg-gray-50 rounded-2xl shadow-sm focus:ring-4 focus:ring-forest/10 focus:border-forest py-4 px-5 border transition-all text-lg font-medium"
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-bold text-gray-700 ml-2 mb-1">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-200 bg-gray-50 rounded-2xl shadow-sm focus:ring-4 focus:ring-forest/10 focus:border-forest py-4 px-5 border transition-all text-lg font-medium"
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-bold text-gray-700 ml-2 mb-1">State</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-200 bg-gray-50 rounded-2xl shadow-sm focus:ring-4 focus:ring-forest/10 focus:border-forest py-4 px-5 border transition-all text-lg font-medium"
                      />
                    </div>
                    <div>
                      <label htmlFor="pincode" className="block text-sm font-bold text-gray-700 ml-2 mb-1">PIN Code</label>
                      <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        required
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-200 bg-gray-50 rounded-2xl shadow-sm focus:ring-4 focus:ring-forest/10 focus:border-forest py-4 px-5 border transition-all text-lg font-medium"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-bold text-gray-700 ml-2 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-200 bg-gray-50 rounded-2xl shadow-sm focus:ring-4 focus:ring-forest/10 focus:border-forest py-4 px-5 border transition-all text-lg font-medium"
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
                      {/* Razorpay Option */}
                      <button
                        onClick={() => setPaymentMethod('razorpay')}
                        className={`w-full relative border-2 rounded-2xl p-4 flex items-center justify-between transition-all ${
                          paymentMethod === 'razorpay' 
                            ? 'border-forest bg-forest/5 shadow-md' 
                            : 'border-gray-100 hover:border-forest/30'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 border-2 rounded-full mr-3 flex items-center justify-center ${
                            paymentMethod === 'razorpay' ? 'border-forest' : 'border-gray-300'
                          }`}>
                            {paymentMethod === 'razorpay' && <div className="w-2.5 h-2.5 bg-forest rounded-full" />}
                          </div>
                          <div className="text-left">
                            <span className="block font-bold text-forest">Pay Online (Razorpay)</span>
                            <span className="text-xs text-forest/70">Cards, UPI, Wallets, Netbanking</span>
                          </div>
                        </div>
                        <img src="https://razorpay.com/assets/razorpay-glyph.svg" alt="Razorpay" className="h-6" />
                      </button>

                      {/* WhatsApp Option */}
                      <button
                        onClick={() => setPaymentMethod('whatsapp')}
                        className={`w-full relative border-2 rounded-2xl p-4 flex items-center justify-between transition-all ${
                          paymentMethod === 'whatsapp' 
                            ? 'border-forest bg-forest/5 shadow-md' 
                            : 'border-gray-100 hover:border-forest/30'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 border-2 rounded-full mr-3 flex items-center justify-center ${
                            paymentMethod === 'whatsapp' ? 'border-forest' : 'border-gray-300'
                          }`}>
                            {paymentMethod === 'whatsapp' && <div className="w-2.5 h-2.5 bg-forest rounded-full" />}
                          </div>
                          <div className="text-left">
                            <span className="block font-bold text-forest">Order via WhatsApp</span>
                            <span className="text-xs text-forest/70">Confirm & pay on WhatsApp</span>
                          </div>
                        </div>
                        <div className="p-2 bg-green-50 rounded-lg">
                          <MessageSquare className="w-6 h-6 text-green-600" />
                        </div>
                      </button>

                      {/* Test Mode Info */}
                      {process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.includes('test') && (
                        <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
                          <p className="text-xs text-amber-800 font-medium mb-1 flex items-center">
                            <Shield className="w-3 h-3 mr-1" /> Test Mode Active
                          </p>
                          <p className="text-[10px] text-amber-700">
                            Use card: <span className="font-bold">4111 1111 1111 1111</span> • CVV: <span className="font-bold">123</span> • Expiry: Any future date
                          </p>
                          <a href="https://razorpay.com/docs/payments/payments/test-cards/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-amber-900 underline mt-1 block">
                            View more test cards
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <button 
                      onClick={paymentMethod === 'razorpay' ? handlePayment : handleWhatsAppOrder}
                      disabled={isProcessing}
                      className="w-full btn-primary py-5 text-lg flex items-center justify-center space-x-3 shadow-xl shadow-forest/10 hover:shadow-forest/20 group"
                    >
                      {isProcessing ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Processing...</span>
                        </div>
                      ) : (
                        <>
                          {paymentMethod === 'razorpay' ? (
                            <>
                              <Lock className="w-5 h-5 group-hover:scale-110 transition-transform" />
                              <span>Secure Checkout • ₹{grandTotal}</span>
                            </>
                          ) : (
                            <>
                              <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                              <span>Order on WhatsApp • ₹{grandTotal}</span>
                            </>
                          )}
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
                    {deliveryChargeValue === 0 ? <span className="text-green-600 font-bold italic">FREE</span> : `₹${deliveryChargeValue}`}
                  </span>
                </div>
                {deliveryChargeValue > 0 && (
                  <p className="text-[10px] text-gray-500 italic">Add ₹{500 - totalPrice} more for Free Delivery</p>
                )}
                <div className="flex items-center justify-between border-t border-forest/10 pt-4">
                  <span className="text-lg font-bold text-forest">Total</span>
                  <span className="text-2xl font-bold text-forest">₹{totalPrice + deliveryChargeValue}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
