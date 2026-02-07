"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, User } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/context/AuthContext";
import CartDrawer from "./CartDrawer";
import Logo from "./Logo";
import { useState, useEffect } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const { isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  const isHome = pathname === "/";
  const isTransparent = isHome && !scrolled;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "Our Story" },
    { href: "/bulk-inquiry", label: "Bulk Orders" },
    { href: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <CartDrawer />
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          !isTransparent
            ? "bg-white/95 backdrop-blur-md shadow-md border-b border-forest/10 py-4"
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Logo
              variant={!isTransparent ? "default" : "white"}
              size="md"
              className="group"
            />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-bold uppercase tracking-widest transition-all hover:text-gold ${
                    !isTransparent ? "text-forest-900" : "text-white/90"
                  } ${pathname === link.href ? "text-gold border-b-2 border-gold" : ""}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              {isAdmin && (
                <Link
                  href="/admin"
                  className={`p-2 rounded-full transition-all ${
                    !isTransparent
                      ? "bg-forest/5 text-forest hover:bg-forest/10"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                  title="Admin Dashboard"
                >
                  <User className="w-5 h-5" />
                </Link>
              )}

              <button
                onClick={() => setIsCartOpen(true)}
                className={`relative p-2 rounded-full transition-all ${
                  !isTransparent
                    ? "text-forest hover:bg-forest/5"
                    : "text-white hover:bg-white/10"
                }`}
                aria-label="Shopping cart"
              >
                <ShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black shadow-lg animate-bounce-subtle">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                className={`md:hidden p-2 rounded-full transition-all ${
                  !isTransparent ? "text-forest" : "text-white"
                }`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-forest/10 shadow-2xl py-6 px-6 animate-slide-down flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-4 px-6 text-lg font-bold uppercase tracking-widest rounded-2xl transition-all ${
                  pathname === link.href
                    ? "bg-forest text-white"
                    : "text-forest-800 hover:bg-forest/5"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                href="/admin"
                className="block py-4 px-6 text-lg font-bold uppercase tracking-widest text-gold bg-forest rounded-2xl"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin Dashboard
              </Link>
            )}
          </div>
        )}
      </nav>
    </>
  );
}
