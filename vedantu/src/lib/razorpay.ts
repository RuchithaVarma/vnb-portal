// Razorpay integration utility
// Uses Razorpay Checkout.js (client-side only, no backend needed for test mode)

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description: string;
  image: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: {
    course: string;
  };
  theme: {
    color: string;
    backdrop_color: string;
  };
  modal: {
    ondismiss: () => void;
    animation: boolean;
    confirm_close: boolean;
  };
  handler: (response: RazorpayPaymentResult) => void;
}

interface RazorpayInstance {
  open: () => void;
  on: (
    event: string,
    callback: (response: RazorpayErrorResponse) => void,
  ) => void;
}

interface RazorpayErrorResponse {
  error?: {
    description?: string;
    reason?: string;
  };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

// Load Razorpay script dynamically
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }
    // Already loaded
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export interface RazorpayPaymentOptions {
  amount: number; // Amount in INR (we convert to paise inside)
  name: string; // Student name
  email: string; // Student email
  phone: string; // Student phone
  courseName: string; // Course selected
  description?: string;
  onSuccess: (paymentData: RazorpayPaymentResult) => void;
  onFailure: (error: string) => void;
}

export interface RazorpayPaymentResult {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

// Razorpay Live Key - Production credentials
const RAZORPAY_KEY = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

if (!RAZORPAY_KEY) {
  console.error("Razorpay key ID is not configured in environment variables");
}

export const initiateRazorpayPayment = async (
  options: RazorpayPaymentOptions,
): Promise<void> => {
  const loaded = await loadRazorpayScript();
  if (!loaded) {
    options.onFailure(
      "Failed to load payment gateway. Please check your internet connection and try again.",
    );
    return;
  }

  if (!RAZORPAY_KEY) {
    options.onFailure(
      "Payment gateway is not configured. Please contact support.",
    );
    return;
  }

  try {
    // Create order on backend first for better security
    const orderResponse = await fetch("/api/razorpay/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: options.amount,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        notes: {
          courseName: options.courseName,
          studentName: options.name,
          studentEmail: options.email,
          studentPhone: options.phone,
        },
      }),
    });

    if (!orderResponse.ok) {
      const errorData = await orderResponse.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to create payment order");
    }

    const orderData = await orderResponse.json();

    const rzpOptions = {
      key: RAZORPAY_KEY!,
      amount: orderData.amount,
      currency: orderData.currency,
      order_id: orderData.id,
      name: "Brilliant Roots",
      description:
        options.description || `Enrollment fee for ${options.courseName}`,
      image: "/logo.png",
      prefill: {
        name: options.name,
        email: options.email,
        contact: options.phone,
      },
      notes: {
        course: options.courseName,
      },
      theme: {
        color: "#f97316",
        backdrop_color: "rgba(0,0,0,0.6)",
      },
      modal: {
        ondismiss: () => {
          options.onFailure("Payment was cancelled. You can try again.");
        },
        animation: true,
        confirm_close: true,
      },
      handler: async (response: RazorpayPaymentResult) => {
        try {
          // Verify payment on backend
          const verifyResponse = await fetch("/api/razorpay/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          if (!verifyResponse.ok) {
            throw new Error("Payment verification failed");
          }

          const verifyData = await verifyResponse.json();

          if (verifyData.verified) {
            options.onSuccess(response);
          } else {
            options.onFailure(
              "Payment verification failed. Please contact support.",
            );
          }
        } catch (error) {
          console.error("Payment verification error:", error);
          options.onFailure(
            "Payment verification failed. Please contact support with your payment ID.",
          );
        }
      },
    };

    const rzp = new window.Razorpay(rzpOptions);

    rzp.on("payment.failed", (response: RazorpayErrorResponse) => {
      const errorMsg =
        response?.error?.description ||
        response?.error?.reason ||
        "Payment failed. Please try again with a different payment method.";
      options.onFailure(errorMsg);
    });

    rzp.open();
  } catch (error) {
    console.error("Razorpay initialization error:", error);
    const errorMsg =
      error instanceof Error ? error.message : "Failed to initialize payment";
    options.onFailure(errorMsg);
  }
};
