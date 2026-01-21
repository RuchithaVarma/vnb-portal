'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Facebook, Leaf } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <footer className="bg-forest-900 text-cream-100">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gold p-2 rounded-lg">
                <Leaf className="w-5 h-5 text-forest-900" />
              </div>
              <span className="font-serif text-xl font-bold text-white">
                Blooms Energy
              </span>
            </div>
            <p className="text-sm text-cream-200 leading-relaxed">
              Clean, raw, chemical-free powders made from fresh farm produce — naturally pure. 
              Lab-tested quality, FSSAI certified, direct from farmers.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-200 hover:text-gold transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-200 hover:text-gold transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-cream-200 hover:text-gold transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-cream-200 hover:text-gold transition-colors text-sm">
                  Shop All Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-cream-200 hover:text-gold transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/bulk-inquiry" className="text-cream-200 hover:text-gold transition-colors text-sm">
                  Bulk Orders
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-cream-200 hover:text-gold transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-cream-200 hover:text-gold transition-colors text-sm">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-cream-200 hover:text-gold transition-colors text-sm">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-cream-200 hover:text-gold transition-colors text-sm">
                  Return & Refund
                </a>
              </li>
              <li>
                <a href="#" className="text-cream-200 hover:text-gold transition-colors text-sm">
                  Track Order
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-4">Stay Connected</h3>
            <p className="text-sm text-cream-200 mb-4">
              Subscribe to get special offers and updates.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="w-full px-4 py-2 rounded-md bg-forest-800 border border-forest-600 text-white placeholder-cream-200/50 focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <button
                type="submit"
                className="w-full bg-gold hover:bg-gold-600 text-forest-900 font-semibold py-2 px-4 rounded-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t border-forest-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap gap-6 text-sm text-cream-200">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@bloomsenergy.com" className="hover:text-gold transition-colors">
                  info@bloomsenergy.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+911234567890" className="hover:text-gold transition-colors">
                  +91-1234567890
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-forest-950 border-t border-forest-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-cream-200">
            <div className="flex flex-wrap gap-4">
              <Link href="#" className="hover:text-gold transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-gold transition-colors">
                Terms & Conditions
              </Link>
              <Link href="#" className="hover:text-gold transition-colors">
                Refund Policy
              </Link>
            </div>
            <div className="text-cream-200/70">
              <p>FSSAI Lic. No: 12345678901234 | GST: 29XXXXX1234X1ZX</p>
            </div>
          </div>
          <div className="mt-4 text-center text-cream-200/60 text-sm">
            © {new Date().getFullYear()} Blooms Energy Raw Powders. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
