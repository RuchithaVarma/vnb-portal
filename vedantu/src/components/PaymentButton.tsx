"use client";

import { useState } from "react";
import { CreditCard, Loader, CheckCircle, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import PaymentAuthorization from "./PaymentAuthorization";
import {
  createPaymentRecord,
  updatePaymentRecord,
} from "@/lib/paymentTracking";

interface PaymentButtonProps {
  courseId: string;
  courseName: string;
  amount: number;
  onSuccess?: (paymentData: any) => void;
  onFailure?: (error: string) => void;
  buttonText?: string;
  className?: string;
  showPrice?: boolean;
}

export default function PaymentButton({
  courseId,
  courseName,
  amount,
  onSuccess,
  onFailure,
  buttonText = "Enroll Now",
  className = "",
  showPrice = true,
}: PaymentButtonProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "processing" | "success" | "failed"
  >("idle");
  const [showAuthorization, setShowAuthorization] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    // Check if user is authenticated
    if (!user) {
      router.push(`/signin?redirect=/courses/${courseId}`);
      return;
    }

    // Show payment authorization modal
    setShowAuthorization(true);
  };

  const handlePaymentSuccess = async (paymentData: any) => {
    setPaymentStatus("success");
    setShowAuthorization(false);
    setError("");

    // Update user's enrollment status
    try {
      // You might want to update the user's enrolled courses here
      // await updateUserEnrollment(user.uid, courseId);
    } catch (error) {
      console.error("Error updating enrollment:", error);
    }

    // Redirect to success page
    router.push(
      `/payment-success?paymentId=${paymentData.paymentId || paymentData.razorpay_payment_id}&course=${encodeURIComponent(courseName)}&amount=${amount}`,
    );

    onSuccess?.(paymentData);
  };

  const handlePaymentFailure = async (error: string) => {
    setPaymentStatus("failed");
    setShowAuthorization(false);
    setError(error);
    onFailure?.(error);
  };

  const getButtonContent = () => {
    switch (paymentStatus) {
      case "processing":
        return (
          <>
            <Loader className="w-4 h-4 animate-spin" />
            Processing...
          </>
        );
      case "success":
        return (
          <>
            <CheckCircle className="w-4 h-4" />
            Payment Successful
          </>
        );
      case "failed":
        return (
          <>
            <AlertCircle className="w-4 h-4" />
            Try Again
          </>
        );
      default:
        return (
          <>
            <CreditCard className="w-4 h-4" />
            {buttonText}
            {showPrice && (
              <span className="ml-2">- ₹{amount.toLocaleString()}</span>
            )}
          </>
        );
    }
  };

  const getButtonClass = () => {
    const baseClass =
      "flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-[1.02]";
    const statusClass = {
      idle: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg",
      processing: "bg-gray-300 text-gray-600 cursor-not-allowed",
      success: "bg-green-600 text-white",
      failed: "bg-red-600 hover:bg-red-700 text-white",
    }[paymentStatus];

    return `${baseClass} ${statusClass} ${className}`;
  };

  return (
    <>
      <button
        onClick={handlePayment}
        disabled={paymentStatus === "processing"}
        className={getButtonClass()}
      >
        {getButtonContent()}
      </button>

      {error && (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Payment Authorization Modal */}
      {showAuthorization && user && (
        <PaymentAuthorization
          courseId={courseId}
          courseName={courseName}
          amount={amount}
          userEmail={user.email || ""}
          userName={user.name || user.email || ""}
          userPhone={user.phone || ""}
          onSuccess={handlePaymentSuccess}
          onFailure={handlePaymentFailure}
          onClose={() => setShowAuthorization(false)}
        />
      )}
    </>
  );
}
