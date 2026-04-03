"use client";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle,
  ArrowRight,
  Download,
  BookOpen,
  Shield,
  Sparkles,
  CreditCard,
  Home,
  Phone,
  Mail,
  Star,
} from "lucide-react";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("paymentId") || "—";
  const course = searchParams.get("course") || "Your Course";
  const amount = searchParams.get("amount") || "0";
  const [mounted, setMounted] = useState(false);
  const formattedDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    setMounted(true);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Confetti-like celebration animation
    triggerConfetti();
  }, []);

  const triggerConfetti = () => {
    if (typeof window === "undefined") return;
    const colors = ["#f97316", "#fb923c", "#fdba74", "#22c55e", "#4ade80", "#3b82f6", "#60a5fa"];
    const confettiCount = 120;
    const container = document.getElementById("confetti-container");
    if (!container) return;

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div");
      confetti.style.cssText = `
        position: fixed;
        width: ${Math.random() * 10 + 5}px;
        height: ${Math.random() * 10 + 5}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: ${Math.random() > 0.5 ? "50%" : "0"};
        top: -10px;
        left: ${Math.random() * 100}vw;
        opacity: 1;
        pointer-events: none;
        z-index: 9999;
        animation: confettiFall ${Math.random() * 3 + 2}s ease-in ${Math.random() * 2}s forwards;
      `;
      container.appendChild(confetti);
      // Remove after animation
      setTimeout(() => confetti.remove(), 6000);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 py-8 px-4 relative overflow-hidden">
      {/* Confetti container */}
      <div id="confetti-container" className="fixed inset-0 pointer-events-none z-50" />

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-orange-50 to-green-50 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Brilliant Roots
            </span>
          </Link>
        </div>

        {/* Main Success Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Green Success Banner */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-8 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-2 left-10 w-20 h-20 bg-white rounded-full" />
              <div className="absolute bottom-2 right-10 w-16 h-16 bg-white rounded-full" />
              <div className="absolute top-8 right-1/4 w-8 h-8 bg-white rounded-full" />
            </div>
            <div className="relative">
              <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-4 ring-4 ring-white/40 shadow-xl">
                <CheckCircle className="w-11 h-11 text-white" strokeWidth={2.5} />
              </div>
              <h1 className="text-3xl font-extrabold mb-2">Payment Successful! 🎉</h1>
              <p className="text-green-100 text-lg">
                Your enrollment is confirmed. Welcome to Brilliant Roots!
              </p>
            </div>
          </div>

          {/* Receipt Details */}
          <div className="p-8">
            {/* Stars Row */}
            <div className="flex justify-center gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              ))}
            </div>

            {/* Payment Receipt */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <h2 className="font-bold text-gray-800 text-lg">Payment Receipt</h2>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-500 text-sm">Payment ID</span>
                  <span className="font-mono font-semibold text-gray-800 text-sm bg-gray-100 px-2 py-1 rounded">
                    {paymentId}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-500 text-sm">Course Enrolled</span>
                  <span className="font-semibold text-gray-800 text-sm text-right max-w-[60%]">
                    {decodeURIComponent(course)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-500 text-sm">Amount Paid</span>
                  <span className="font-bold text-green-600 text-lg">
                    ₹{Number(amount).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-500 text-sm">Payment Date</span>
                  <span className="font-semibold text-gray-800 text-sm">{formattedDate}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-500 text-sm">Status</span>
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Confirmed
                  </span>
                </div>
              </div>
            </div>

            {/* What's Next */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-6">
              <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                What happens next?
              </h3>
              <ul className="space-y-2">
                {[
                  "✅ You'll receive a payment confirmation email",
                  "📞 Our team will call you within 24 hours to confirm your slot",
                  "📚 Your course materials will be shared before class starts",
                  "🎓 Classes begin as per your preferred timing",
                ].map((item, i) => (
                  <li key={i} className="text-sm text-blue-800">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Security Note */}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mb-6">
              <Shield className="w-3.5 h-3.5" />
              <span>Payment secured by Razorpay · 256-bit SSL encryption</span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/dashboard"
                className="flex items-center justify-center gap-2 py-3.5 px-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
              >
                Go to Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/"
                className="flex items-center justify-center gap-2 py-3.5 px-5 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 hover:scale-[1.02]"
              >
                <Home className="w-4 h-4" />
                Back to Home
              </Link>
            </div>

            {/* Contact Info */}
            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-500 mb-3">
                Have questions? We're here to help.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <a
                  href="mailto:info@brilliantroots.com"
                  className="flex items-center gap-1.5 text-orange-500 hover:text-orange-600 hover:underline"
                >
                  <Mail className="w-3.5 h-3.5" />
                  info@brilliantroots.com
                </a>
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-1.5 text-orange-500 hover:text-orange-600 hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  +91 98765 43210
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confetti CSS */}
      <style jsx global>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
