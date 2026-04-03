"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Loader,
  ArrowLeft,
  Shield,
  Lock,
} from "lucide-react";
import Link from "next/link";
import PaymentAuthorization from "@/components/PaymentAuthorization";
import { getPaymentLink, validatePaymentLink } from "@/lib/paymentLinks";

interface PaymentLinkData {
  id: string;
  courseId: string;
  courseName: string;
  amount: number;
  currency: string;
  expiryDate?: string;
  maxUses?: number;
  currentUses: number;
  isActive: boolean;
  createdAt: string;
  customMessage?: string;
}

export default function PaymentLinkPage() {
  const params = useParams();
  const router = useRouter();
  const linkId = params.linkId as string;

  const [linkData, setLinkData] = useState<PaymentLinkData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");

  useEffect(() => {
    validateLink();
  }, [linkId]);

  const validateLink = async () => {
    try {
      setLoading(true);
      
      // Simulate API call to validate link
      setTimeout(() => {
        // Mock data - replace with actual API call
        const mockLinkData: PaymentLinkData = {
          id: linkId,
          courseId: "course_123",
          courseName: "Mathematics Mastery Course",
          amount: 9999,
          currency: "INR",
          expiryDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          maxUses: 1,
          currentUses: 0,
          isActive: true,
          createdAt: new Date().toISOString(),
          customMessage: "Welcome to Brilliant Roots Academy! Complete your payment to start your learning journey.",
        };

        // Check if link is valid
        if (!mockLinkData.isActive) {
          setError("This payment link has been deactivated");
          return;
        }

        if (mockLinkData.expiryDate && new Date(mockLinkData.expiryDate) < new Date()) {
          setError("This payment link has expired");
          return;
        }

        if (mockLinkData.maxUses && mockLinkData.currentUses >= mockLinkData.maxUses) {
          setError("This payment link has reached its maximum usage limit");
          return;
        }

        setLinkData(mockLinkData);
      }, 1000);
    } catch (err) {
      setError("Invalid payment link");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = (paymentData: any) => {
    // Redirect to success page
    router.push(
      `/payment-success?paymentId=${paymentData.paymentId}&course=${encodeURIComponent(linkData!.courseName)}&amount=${linkData!.amount}`
    );
  };

  const handlePaymentFailure = (error: string) => {
    setError(error);
    setShowPayment(false);
  };

  const getTimeRemaining = () => {
    if (!linkData?.expiryDate) return null;
    
    const now = new Date();
    const expiry = new Date(linkData.expiryDate);
    const diff = expiry.getTime() - now.getTime();
    
    if (diff <= 0) return "Expired";
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days} day${days > 1 ? 's' : ''} remaining`;
    }
    
    return `${hours}h ${minutes}m remaining`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (error || !linkData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold mb-2">Payment Link Invalid</h2>
          <p className="text-gray-600 mb-6">{error || "This payment link is not valid"}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (showPayment) {
    return (
      <PaymentAuthorization
        courseId={linkData.courseId}
        courseName={linkData.courseName}
        amount={linkData.amount}
        userEmail={userEmail}
        userName={userName}
        userPhone={userPhone}
        onSuccess={handlePaymentSuccess}
        onFailure={handlePaymentFailure}
        onClose={() => setShowPayment(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">BR</span>
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-2">{linkData.courseName}</h1>
                  <p className="text-gray-600 mb-4">
                    {linkData.customMessage || "Complete your payment to enroll in this course."}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Shield className="w-4 h-4" />
                      <span>Secure Payment</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Lock className="w-4 h-4" />
                      <span>256-bit Encryption</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* User Details Form */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Your Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Button */}
            <button
              onClick={() => {
                if (!userName || !userEmail || !userPhone) {
                  alert("Please fill in all required fields");
                  return;
                }
                setShowPayment(true);
              }}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] shadow-lg"
            >
              Pay ₹{linkData.amount.toLocaleString()}
            </button>

            {/* Trust Badges */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-sm font-semibold mb-4 text-center">Trusted by 10,000+ Students</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-xs text-gray-600">Secure Payments</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-xs text-gray-600">Data Protection</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <p className="text-xs text-gray-600">Instant Access</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
              <h3 className="font-semibold mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Course</span>
                  <span className="font-medium">{linkData.courseName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Amount</span>
                  <span className="font-medium">₹{linkData.amount.toLocaleString()}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-xl">₹{linkData.amount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Link Status */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 text-blue-800 mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">Link Status</span>
                </div>
                <p className="text-xs text-blue-700">{getTimeRemaining()}</p>
                {linkData.maxUses && (
                  <p className="text-xs text-blue-700 mt-1">
                    Uses left: {linkData.maxUses - linkData.currentUses}
                  </p>
                )}
              </div>
            </div>

            {/* Support */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold mb-3">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Our support team is here to assist you with any payment-related queries.
              </p>
              <div className="space-y-2">
                <a href="tel:+919876543210" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                  📞 +91 98765 43210
                </a>
                <a href="mailto:support@brilliantroots.com" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                  ✉️ support@brilliantroots.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
