'use client';

import { useState } from 'react';
import { loadRazorpay } from '@/utils/razorpay';

interface RazorpayPaymentProps {
  amount: number;
  orderId?: string;
  onSuccess?: (paymentId: string, orderId: string) => void;
  onFailure?: (error: any) => void;
  buttonText?: string;
  className?: string;
}

export default function RazorpayPayment({
  amount,
  orderId,
  onSuccess,
  onFailure,
  buttonText = 'Pay Now',
  className = ''
}: RazorpayPaymentProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    
    try {
      // Load Razorpay script
      const Razorpay = await loadRazorpay();
      
      if (!Razorpay) {
        throw new Error('Failed to load Razorpay SDK');
      }

      // Create order if not provided
      let finalOrderId = orderId;
      if (!finalOrderId) {
        const response = await fetch('/api/razorpay/order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount,
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create order');
        }

        const orderData = await response.json();
        finalOrderId = orderData.id;
      }

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: amount * 100, // Convert to paise
        currency: 'INR',
        name: 'Blooms Energy Raw Powders',
        description: 'Purchase of premium raw powders',
        order_id: finalOrderId,
        handler: function (response: any) {
          // Payment successful
          onSuccess?.(response.razorpay_payment_id, response.razorpay_order_id);
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        notes: {
          address: '',
        },
        theme: {
          color: '#D4AF37', // Gold color
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error('Payment error:', error);
      onFailure?.(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className={`bg-gold hover:bg-gold-400 text-forest-900 font-bold py-3 px-6 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {loading ? (
        <span className="flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-forest-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
      ) : (
        buttonText
      )}
    </button>
  );
}
