"use client";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Lock, Mail, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, login, loading } = useAuth();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  // Login states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (user && isAdmin()) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    }
  }, [user, loading, isAdmin]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");

    try {
      const success = await login({ email, password });
      if (!success) {
        setLoginError("Invalid credentials. Please try again.");
      }
      // useEffect will handle setting isAuthorized if successful
    } catch (err) {
      setLoginError("An error occurred during login.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // While checking initial auth state
  if (loading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          <p className="text-gray-500 font-medium animate-pulse text-lg">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // If not authorized (not logged in as admin)
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="text-blue-600 w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Access</h1>
            <p className="text-gray-500 mt-2">Enter your credentials to continue</p>
          </div>

          {loginError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p>{loginError}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  placeholder="admin@brilliantroots.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
            >
              {isLoggingIn ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Sign In to Admin"
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-500 font-medium">
            <p>Confidential access only.</p>
            <Link href="/" className="text-blue-600 hover:underline mt-2 inline-block">
              Back to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
