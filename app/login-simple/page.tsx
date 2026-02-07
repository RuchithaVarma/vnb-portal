"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SimpleLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login button clicked!");
    console.log("Email:", email);
    console.log("Password:", password);

    setLoading(true);
    setError("");

    // Simple hardcoded login bypass
    if (email === "rawpowders@gmail.com" && password === "welcome") {
      console.log("Credentials match - redirecting to admin...");
      // Store admin session in localStorage
      localStorage.setItem(
        "adminUser",
        JSON.stringify({
          email: "rawpowders@gmail.com",
          isAdmin: true,
          loginTime: new Date().toISOString(),
        }),
      );

      console.log("Admin session stored, redirecting...");
      router.push("/admin");
    } else {
      console.log("Invalid credentials");
      setError("Invalid credentials. Please check your email and password.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-card p-8 border border-forest/5">
        <h1 className="text-2xl font-bold text-forest text-center mb-6">
          Admin Login
        </h1>

        <div className="bg-blue-50 text-blue-700 p-3 rounded-lg mb-4 text-sm">
          <strong>Admin Access Only</strong>
          <br />
          Enter your admin credentials to continue
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
