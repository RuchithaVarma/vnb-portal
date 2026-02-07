"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  PlusCircle,
  LogOut,
  Package,
  ShoppingBag,
} from "lucide-react";
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
        router.push("/login-simple");
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

    router.push("/login-simple");
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
      <aside className="w-72 bg-white border-r border-gray-100 hidden md:flex flex-col shadow-soft">
        <div className="p-8 border-b border-gray-50">
          <Link
            href="/admin"
            className="text-2xl font-serif text-forest font-black tracking-tight flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-forest rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span>Blooms Admin</span>
          </Link>
        </div>

        <nav className="flex-1 p-6 space-y-3">
          <Link
            href="/admin"
            className={`flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-300 group shadow-sm hover:shadow-card hover:scale-[1.02] ${
              pathname === '/admin' ? 'bg-forest text-white' : 'text-gray-700 hover:bg-forest hover:text-white'
            }`}
          >
            <div className={`p-2 rounded-xl transition-colors ${
              pathname === '/admin' ? 'bg-white/20' : 'bg-gray-50 group-hover:bg-white/20'
            }`}>
              <LayoutDashboard className={`w-5 h-5 ${pathname === '/admin' ? 'text-white' : 'group-hover:text-white'}`} />
            </div>
            <span className="font-bold">Dashboard</span>
          </Link>
          <Link
            href="/admin/products"
            className={`flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-300 group shadow-sm hover:shadow-card hover:scale-[1.02] ${
              pathname.startsWith('/admin/products') ? 'bg-forest text-white' : 'text-gray-700 hover:bg-forest hover:text-white'
            }`}
          >
            <div className={`p-2 rounded-xl transition-colors ${
              pathname.startsWith('/admin/products') ? 'bg-white/20' : 'bg-gray-50 group-hover:bg-white/20'
            }`}>
              <Package className={`w-5 h-5 ${pathname.startsWith('/admin/products') ? 'text-white' : 'group-hover:text-white'}`} />
            </div>
            <span className="font-bold">Inventory</span>
          </Link>
          <Link
            href="/admin/orders"
            className={`flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-300 group shadow-sm hover:shadow-card hover:scale-[1.02] ${
              pathname === '/admin/orders' ? 'bg-forest text-white' : 'text-gray-700 hover:bg-forest hover:text-white'
            }`}
          >
            <div className={`p-2 rounded-xl transition-colors ${
              pathname === '/admin/orders' ? 'bg-white/20' : 'bg-gray-50 group-hover:bg-white/20'
            }`}>
              <ShoppingBag className={`w-5 h-5 ${pathname === '/admin/orders' ? 'text-white' : 'group-hover:text-white'}`} />
            </div>
            <span className="font-bold">Orders</span>
          </Link>
          <div className="pt-6">
            <p className="px-5 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">External Links</p>
            <Link
              href="/shop"
              className="flex items-center space-x-4 px-5 py-4 text-gold hover:bg-gold hover:text-white rounded-2xl transition-all duration-300 group shadow-sm hover:shadow-card border border-gold/10"
              target="_blank"
            >
              <div className="p-2 bg-gold/5 rounded-xl group-hover:bg-white/20 transition-colors">
                <Package className="w-5 h-5" />
              </div>
              <span className="font-bold">Live Store</span>
            </Link>
          </div>
        </nav>

        <div className="p-6 border-t border-gray-50">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-4 px-5 py-4 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl w-full transition-all duration-300 group shadow-sm hover:shadow-card"
          >
            <div className="p-2 bg-red-50 rounded-xl group-hover:bg-white/20 transition-colors">
              <LogOut className="w-5 h-5" />
            </div>
            <span className="font-bold">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50/30">
        <div className="pt-24 pb-12 px-10">
          {children}
        </div>
      </main>
    </div>
  );
}

