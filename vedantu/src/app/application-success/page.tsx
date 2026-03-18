"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle, ArrowRight, Mail, Phone, Calendar, BookOpen, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function ApplicationSuccess() {
  const router = useRouter();
  const { user } = useAuth();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/dashboard");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[var(--primary)]/20 to-orange-300/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Success Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Application Submitted Successfully!
          </h1>
          <p className="text-gray-600 mb-8">
            Thank you for applying to Brilliant Roots. Your application has been received and we'll contact you soon.
          </p>

          {/* Application Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <h2 className="font-semibold text-gray-900 mb-4">Application Details</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">Name:</span>
                <span className="text-sm font-medium text-gray-900">{user.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">Email:</span>
                <span className="text-sm font-medium text-gray-900">{user.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">Phone:</span>
                <span className="text-sm font-medium text-gray-900">{user.phone}</span>
              </div>
              {user.course && (
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">Course:</span>
                  <span className="text-sm font-medium text-gray-900">{user.course}</span>
                </div>
              )}
              {user.applicationId && (
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">Application ID:</span>
                  <span className="text-sm font-medium text-gray-900">{user.applicationId}</span>
                </div>
              )}
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="font-semibold text-blue-900 mb-3">What's Next?</h2>
            <ul className="text-sm text-blue-800 space-y-2 text-left">
              <li>• You'll receive a confirmation email shortly</li>
              <li>• Our team will review your application</li>
              <li>• You'll be contacted for a counseling session</li>
              <li>• Complete the payment to confirm your admission</li>
            </ul>
          </div>

          {/* Auto-redirect Message */}
          <p className="text-sm text-gray-500 mb-6">
            You will be redirected to your dashboard in {countdown} seconds...
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-[var(--primary)] text-white rounded-lg font-semibold hover:bg-[var(--primary-hover)] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/courses"
              className="px-6 py-3 border-2 border-[var(--primary)] text-[var(--primary)] rounded-lg font-semibold hover:bg-orange-50 transition-all duration-300 hover:scale-[1.02]"
            >
              Browse Courses
            </Link>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Have questions? Contact us at{" "}
            <a href="mailto:info@brilliantroots.com" className="text-[var(--primary)] hover:underline">
              info@brilliantroots.com
            </a>{" "}
            or call{" "}
            <a href="tel:+919876543210" className="text-[var(--primary)] hover:underline">
              +91 98765 43210
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
