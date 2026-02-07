"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Package, LayoutDashboard, ShoppingBag, LogOut } from "lucide-react";
import Logo from "@/components/Logo";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, isAdmin, simpleUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!user && !simpleUser) {
        router.push("/login");
      } else if (!isAdmin) {
        // Optional: Redirect non-admins to home or show denied page
        // using router.push('/') might be better than keeping them on /admin
        // For now, let's keep them here but the UI will show access denied
      }
    }
  }, [user, simpleUser, loading, isAdmin, router]);

  const handleLogout = async () => {
    // Clear simple login
    localStorage.removeItem("adminUser");

    // Sign out from Firebase if logged in
    if (user) {
      await signOut(auth);
    }

    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest"></div>
      </div>
    );
  }

  if (!user && !simpleUser) {
    // Show a simplified access denied state or redirecting state
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-forest mb-4">Access Denied</h1>
          <p className="mb-4">You do not have administrative privileges.</p>
          <button
            onClick={handleLogout}
            className="text-gold hover:text-gold-dark underline"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    // Show a simplified access denied state or redirecting state
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-forest mb-4">Access Denied</h1>
          <p className="mb-4">You do not have administrative privileges.</p>
          <button
            onClick={handleLogout}
            className="text-gold hover:text-gold-dark underline"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 hidden md:flex flex-col shadow-soft transition-all duration-300">
        <div className="p-6 border-b border-gray-50">
          <Link href="/admin">
            <Logo
              variant="dark"
              size="md"
              className="hover:scale-105 transition-transform"
            />
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1.5">
          <Link
            href="/admin"
            className={`flex items-center space-x-3 px-4 py-2 rounded-xl transition-all duration-200 group ${
              pathname === "/admin"
                ? "bg-forest text-white shadow-soft"
                : "text-gray-600 hover:bg-forest/5 hover:text-forest"
            }`}
          >
            <div
              className={`p-1.5 rounded-lg transition-colors ${
                pathname === "/admin"
                  ? "bg-white/10"
                  : "bg-gray-50 group-hover:bg-forest/10"
              }`}
            >
              <LayoutDashboard
                className={`w-4 h-4 ${pathname === "/admin" ? "text-white" : "text-gray-500 group-hover:text-forest"}`}
              />
            </div>
            <span className="font-semibold text-sm">Dashboard</span>
          </Link>
          <Link
            href="/admin/products"
            className={`flex items-center space-x-3 px-4 py-2 rounded-xl transition-all duration-200 group ${
              pathname.startsWith("/admin/products")
                ? "bg-forest text-white shadow-soft"
                : "text-gray-600 hover:bg-forest/5 hover:text-forest"
            }`}
          >
            <div
              className={`p-1.5 rounded-lg transition-colors ${
                pathname.startsWith("/admin/products")
                  ? "bg-white/10"
                  : "bg-gray-50 group-hover:bg-forest/10"
              }`}
            >
              <Package
                className={`w-4 h-4 ${pathname.startsWith("/admin/products") ? "text-white" : "text-gray-500 group-hover:text-forest"}`}
              />
            </div>
            <span className="font-semibold text-sm">Products</span>
          </Link>
          <Link
            href="/admin/orders"
            className={`flex items-center space-x-3 px-4 py-2 rounded-xl transition-all duration-200 group ${
              pathname === "/admin/orders"
                ? "bg-forest text-white shadow-soft"
                : "text-gray-600 hover:bg-forest/5 hover:text-forest"
            }`}
          >
            <div
              className={`p-1.5 rounded-lg transition-colors ${
                pathname === "/admin/orders"
                  ? "bg-white/10"
                  : "bg-gray-50 group-hover:bg-forest/10"
              }`}
            >
              <ShoppingBag
                className={`w-4 h-4 ${pathname === "/admin/orders" ? "text-white" : "text-gray-500 group-hover:text-forest"}`}
              />
            </div>
            <span className="font-semibold text-sm">Orders</span>
          </Link>
          <div className="pt-3 mt-1 border-t border-gray-50">
            <p className="px-4 text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              External
            </p>
            <Link
              href="/shop"
              className="flex items-center space-x-3 px-4 py-2 text-gray-600 hover:bg-gold/5 hover:text-gold rounded-xl transition-all duration-200 group"
              target="_blank"
            >
              <div className="p-1.5 bg-gray-50 group-hover:bg-gold/10 transition-colors rounded-lg">
                <ShoppingBag className="w-4 h-4 group-hover:text-gold" />
              </div>
              <span className="font-semibold text-sm">Live Store</span>
            </Link>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-50">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-2 text-red-500 hover:bg-red-50 rounded-xl w-full transition-all duration-200 group"
          >
            <div className="p-1.5 bg-red-50 group-hover:bg-red-100 transition-colors rounded-lg">
              <LogOut className="w-4 h-4" />
            </div>
            <span className="font-semibold text-sm">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50/30">
        <div className="pt-24 pb-12 px-10">{children}</div>
      </main>
    </div>
  );
}
