"use client";

import { useState } from "react";
import {
  AlertTriangle,
  CreditCard,
  ArrowRight,
  Phone,
  Mail,
  Headphones,
} from "lucide-react";
import PaymentButton from "./PaymentButton";

interface PaymentRetryProps {
  courseId: string;
  courseName: string;
  amount: number;
  lastError?: string;
  onRetrySuccess?: () => void;
  onRetryFailure?: (error: string) => void;
}

export default function PaymentRetry({
  courseId,
  courseName,
  amount,
  lastError,
  onRetrySuccess,
  onRetryFailure,
}: PaymentRetryProps) {
  const [retryCount, setRetryCount] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState<"same" | "different">(
    "same",
  );

  const maxRetries = 3;

  const getErrorSuggestion = (error: string) => {
    if (error?.toLowerCase().includes("insufficient")) {
      return "Please check your account balance or use a different payment method.";
    }
    if (error?.toLowerCase().includes("card")) {
      return "Please verify your card details or try another card.";
    }
    if (
      error?.toLowerCase().includes("network") ||
      error?.toLowerCase().includes("connection")
    ) {
      return "Please check your internet connection and try again.";
    }
    if (
      error?.toLowerCase().includes("otp") ||
      error?.toLowerCase().includes("verification")
    ) {
      return "Please complete the OTP verification. Check your SMS/email.";
    }
    return "Please try again or choose a different payment method.";
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Error Header */}
      <div className="bg-red-50 border-b border-red-100 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-red-900 mb-1">
              Payment Failed
            </h2>
            <p className="text-red-700">
              {lastError ||
                "We couldn't process your payment. Please try again."}
            </p>
            {retryCount > 0 && (
              <p className="text-sm text-red-600 mt-2">
                Retry attempt {retryCount} of {maxRetries}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Suggestion */}
      <div className="p-6 bg-amber-50 border-b border-amber-100">
        <div className="flex items-start gap-3">
          <Headphones className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-900">Suggestion</p>
            <p className="text-sm text-amber-700 mt-1">
              {getErrorSuggestion(lastError || "")}
            </p>
          </div>
        </div>
      </div>

      {/* Retry Options */}
      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Choose an option
          </h3>

          <div className="space-y-3">
            <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="retryMethod"
                value="same"
                checked={selectedMethod === "same"}
                onChange={(e) =>
                  setSelectedMethod(e.target.value as "same" | "different")
                }
                className="w-4 h-4 text-blue-600"
              />
              <div className="ml-3 flex-1">
                <p className="font-medium text-gray-900">
                  Try Same Payment Method
                </p>
                <p className="text-sm text-gray-500">
                  Retry with the same payment details
                </p>
              </div>
            </label>

            <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="retryMethod"
                value="different"
                checked={selectedMethod === "different"}
                onChange={(e) =>
                  setSelectedMethod(e.target.value as "same" | "different")
                }
                className="w-4 h-4 text-blue-600"
              />
              <div className="ml-3 flex-1">
                <p className="font-medium text-gray-900">
                  Use Different Payment Method
                </p>
                <p className="text-sm text-gray-500">
                  Choose another card, UPI, or net banking
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Retry Button */}
        {selectedMethod === "same" ? (
          <PaymentButton
            courseId={courseId}
            courseName={courseName}
            amount={amount}
            onSuccess={onRetrySuccess}
            onFailure={onRetryFailure}
            buttonText={`Retry Payment (${retryCount + 1}/3)`}
            className="w-full"
          />
        ) : (
          <button
            onClick={() => {
              // Trigger payment flow with method selection
              window.location.reload();
            }}
            disabled={retryCount >= 3}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <>
              <CreditCard className="w-5 h-5" />
              Choose New Payment Method
              <ArrowRight className="w-5 h-5" />
            </>
          </button>
        )}

        {/* Support Section */}
        {retryCount >= 3 && (
          <div className="bg-gray-50 rounded-xl p-6">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Headphones className="w-5 h-5" />
              Need Help?
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              If you're still facing issues, our support team is here to help
              you.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
              >
                <Phone className="w-4 h-4" />
                +91 98765 43210
              </a>
              <a
                href="mailto:support@brilliantroots.com"
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
              >
                <Mail className="w-4 h-4" />
                support@brilliantroots.com
              </a>
            </div>
          </div>
        )}

        {/* Alternative Options */}
        <div className="border-t pt-6">
          <p className="text-sm text-gray-500 text-center mb-4">
            Other payment options
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
              Pay later
            </button>
            <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
              Bank Transfer
            </button>
            <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
              Cash on Visit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
