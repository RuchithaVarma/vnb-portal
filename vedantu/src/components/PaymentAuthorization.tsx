"use client";

import { useState, useEffect } from "react";
import { Lock, CreditCard, Shield, CheckCircle, AlertCircle, Loader, Eye, EyeOff } from "lucide-react";
import { initiateRazorpayPayment } from "@/lib/razorpay";
import { createPaymentRecord, updatePaymentRecord } from "@/lib/paymentTracking";

interface PaymentAuthorizationProps {
  courseId: string;
  courseName: string;
  amount: number;
  userEmail: string;
  userName: string;
  userPhone: string;
  onSuccess: (paymentData: any) => void;
  onFailure: (error: string) => void;
  onClose?: () => void;
}

export default function PaymentAuthorization({
  courseId,
  courseName,
  amount,
  userEmail,
  userName,
  userPhone,
  onSuccess,
  onFailure,
  onClose,
}: PaymentAuthorizationProps) {
  const [step, setStep] = useState<"authorization" | "processing" | "otp" | "success" | "failed">("authorization");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "netbanking">("card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [upiId, setUpiId] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [showCvv, setShowCvv] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [paymentId, setPaymentId] = useState("");

  // Validate card details
  const validateCardDetails = () => {
    const newErrors: Record<string, string> = {};

    if (paymentMethod === "card") {
      if (!cardDetails.number || cardDetails.number.replace(/\s/g, "").length < 16) {
        newErrors.cardNumber = "Please enter a valid 16-digit card number";
      }
      if (!cardDetails.expiry || !/^\d{2}\/\d{2}$/.test(cardDetails.expiry)) {
        newErrors.expiry = "Please enter expiry in MM/YY format";
      }
      if (!cardDetails.cvv || cardDetails.cvv.length < 3) {
        newErrors.cvv = "Please enter a valid CVV";
      }
      if (!cardDetails.name) {
        newErrors.name = "Please enter the cardholder name";
      }
    } else if (paymentMethod === "upi") {
      if (!upiId || !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/.test(upiId)) {
        newErrors.upiId = "Please enter a valid UPI ID";
      }
    } else if (paymentMethod === "netbanking") {
      if (!selectedBank) {
        newErrors.bank = "Please select your bank";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Format card number
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const chunks = cleaned.match(/.{1,4}/g) || [];
    return chunks.join(" ").substr(0, 19);
  };

  // Format expiry date
  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  // Handle payment submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateCardDetails()) {
      return;
    }

    setIsProcessing(true);
    setStep("processing");

    try {
      // Create payment record
      const paymentRecordId = await createPaymentRecord({
        userId: userEmail,
        userName,
        userEmail,
        userPhone,
        courseId,
        courseName,
        amount,
        currency: "INR",
        status: "pending",
        paymentMethod,
        metadata: {
          paymentMethod,
          cardLast4: paymentMethod === "card" ? cardDetails.number.slice(-4) : undefined,
          upiId: paymentMethod === "upi" ? upiId : undefined,
          bank: paymentMethod === "netbanking" ? selectedBank : undefined,
        },
      });

      setPaymentId(paymentRecordId);

      // Initiate Razorpay payment
      await initiateRazorpayPayment({
        amount,
        name: userName,
        email: userEmail,
        phone: userPhone,
        courseName,
        description: `Payment for ${courseName}`,
        onSuccess: async (paymentData) => {
          await updatePaymentRecord(paymentRecordId, {
            status: "success",
            razorpayPaymentId: paymentData.razorpay_payment_id,
            razorpayOrderId: paymentData.razorpay_order_id,
            razorpaySignature: paymentData.razorpay_signature,
          });
          setStep("success");
          onSuccess(paymentData);
        },
        onFailure: async (error) => {
          await updatePaymentRecord(paymentRecordId, {
            status: "failed",
            metadata: { error },
          });
          setStep("failed");
          onFailure(error);
        },
      });
    } catch (error) {
      console.error("Payment error:", error);
      setStep("failed");
      onFailure(error instanceof Error ? error.message : "Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle OTP verification
  const handleOtpVerification = async () => {
    if (otpValue.length !== 6) {
      setErrors({ otp: "Please enter a valid 6-digit OTP" });
      return;
    }

    setIsProcessing(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      setStep("success");
      onSuccess({ paymentId, otp: otpValue });
      setIsProcessing(false);
    }, 2000);
  };

  // Popular banks list
  const banks = [
    "State Bank of India",
    "HDFC Bank",
    "ICICI Bank",
    "Axis Bank",
    "Kotak Mahindra Bank",
    "Punjab National Bank",
    "Bank of Baroda",
    "Canara Bank",
    "Union Bank of India",
    "Indian Bank",
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Lock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Secure Payment</h2>
                <p className="text-sm text-gray-500">256-bit SSL encryption</p>
              </div>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === "authorization" && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Order Summary</h3>
                <div className="flex justify-between text-sm">
                  <span>{courseName}</span>
                  <span className="font-semibold">₹{amount.toLocaleString()}</span>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div>
                <label className="block text-sm font-medium mb-3">Payment Method</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                      paymentMethod === "card"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mx-auto mb-1" />
                    Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("upi")}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                      paymentMethod === "upi"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="w-5 h-5 mx-auto mb-1">📱</div>
                    UPI
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("netbanking")}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                      paymentMethod === "netbanking"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="w-5 h-5 mx-auto mb-1">🏦</div>
                    Net Banking
                  </button>
                </div>
              </div>

              {/* Card Details */}
              {paymentMethod === "card" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Card Number</label>
                    <input
                      type="text"
                      value={formatCardNumber(cardDetails.number)}
                      onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      maxLength={19}
                    />
                    {errors.cardNumber && (
                      <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Expiry</label>
                      <input
                        type="text"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: formatExpiry(e.target.value) })}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        maxLength={5}
                      />
                      {errors.expiry && (
                        <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">CVV</label>
                      <div className="relative">
                        <input
                          type={showCvv ? "text" : "password"}
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, "") })}
                          placeholder="123"
                          className="w-full px-3 py-2 pr-8 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          maxLength={4}
                        />
                        <button
                          type="button"
                          onClick={() => setShowCvv(!showCvv)}
                          className="absolute right-2 top-2.5 text-gray-400"
                        >
                          {showCvv ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.cvv && (
                        <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>
                </div>
              )}

              {/* UPI Details */}
              {paymentMethod === "upi" && (
                <div>
                  <label className="block text-sm font-medium mb-1">UPI ID</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@upi"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.upiId && (
                    <p className="text-red-500 text-xs mt-1">{errors.upiId}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    You'll receive a payment request on your UPI app
                  </p>
                </div>
              )}

              {/* Net Banking */}
              {paymentMethod === "netbanking" && (
                <div>
                  <label className="block text-sm font-medium mb-1">Select Bank</label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Choose your bank</option>
                    {banks.map((bank) => (
                      <option key={bank} value={bank}>
                        {bank}
                      </option>
                    ))}
                  </select>
                  {errors.bank && (
                    <p className="text-red-500 text-xs mt-1">{errors.bank}</p>
                  )}
                </div>
              )}

              {/* Security Badge */}
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Shield className="w-4 h-4" />
                <span>Your payment details are secure and encrypted</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Pay ₹{amount.toLocaleString()}
                  </>
                )}
              </button>
            </form>
          )}

          {step === "processing" && (
            <div className="text-center py-12">
              <Loader className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Processing Payment</h3>
              <p className="text-gray-500">Please wait while we process your payment...</p>
              <p className="text-xs text-gray-400 mt-4">Do not close this window</p>
            </div>
          )}

          {step === "otp" && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Enter OTP</h3>
                <p className="text-gray-500">We've sent a 6-digit OTP to your registered mobile number</p>
              </div>

              <div>
                <input
                  type="text"
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="Enter 6-digit OTP"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-2xl tracking-widest"
                  maxLength={6}
                />
                {errors.otp && (
                  <p className="text-red-500 text-xs mt-1 text-center">{errors.otp}</p>
                )}
              </div>

              <button
                onClick={handleOtpVerification}
                disabled={isProcessing || otpValue.length !== 6}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify & Pay"
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                Didn't receive OTP? <button className="text-blue-600 hover:underline">Resend</button>
              </p>
            </div>
          )}

          {step === "success" && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Payment Successful!</h3>
              <p className="text-gray-500 mb-6">Your payment has been processed successfully</p>
              <div className="bg-gray-50 rounded-lg p-4 text-left">
                <div className="flex justify-between text-sm mb-1">
                  <span>Transaction ID:</span>
                  <span className="font-mono">{paymentId.slice(-8).toUpperCase()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Amount Paid:</span>
                  <span className="font-semibold">₹{amount.toLocaleString()}</span>
                </div>
              </div>
              <button
                onClick={() => onSuccess({ paymentId })}
                className="w-full mt-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
              >
                Continue
              </button>
            </div>
          )}

          {step === "failed" && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Payment Failed</h3>
              <p className="text-gray-500 mb-6">
                {errors.general || "We couldn't process your payment. Please try again."}
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => setStep("authorization")}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Secured by Razorpay</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              <span>PCI DSS Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
