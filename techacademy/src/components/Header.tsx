"use client";
import Link from 'next/link';
import { Search, Menu, X, Home } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-[var(--border)]">
      {/* Top Bar / Main Header */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-2xl text-[var(--primary)]">Naresh i Technologies</span>
            <span className="text-xs text-[var(--muted)] hidden md:block">Software Training Institute</span>
        </Link>
        
        {/* Search Bar (Desktop) */}
        <div className="hidden md:flex items-center flex-1 max-w-xl mx-8">
            <div className="relative w-full flex">
                <input 
                    type="text" 
                    placeholder="Search courses..." 
                    className="w-full px-4 py-2 border border-r-0 border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-[var(--secondary)]"
                />
                <button className="bg-[var(--secondary)] text-white px-4 py-2 rounded-r-md hover:bg-[var(--secondary-hover)] transition-colors">
                    <Search size={20} />
                </button>
            </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
            className="md:hidden text-[var(--foreground)]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation Actions */}
        <div className="hidden md:flex items-center gap-4">
            <Link href="/" className="text-[var(--primary)] hover:text-[var(--primary-hover)]">
                <Home size={24} />
            </Link>
            <Link href="/login" className="bg-[var(--primary)] text-white px-6 py-2 rounded font-medium hover:bg-[var(--primary-hover)] transition-colors">
                Login
            </Link>
        </div>
      </div>

      {/* Navigation Links (Desktop) */}
      <nav className="hidden md:block bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4">
            <ul className="flex items-center gap-8 py-3 text-sm font-medium text-gray-700">
                <li><Link href="/courses" className="hover:text-[var(--primary)]">All Courses</Link></li>
                <li><Link href="/services" className="hover:text-[var(--primary)]">Services</Link></li>
                <li><Link href="/training" className="hover:text-[var(--primary)]">Training</Link></li>
                <li><Link href="/about" className="hover:text-[var(--primary)]">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-[var(--primary)]">Contact</Link></li>
            </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 absolute w-full shadow-lg">
            <div className="p-4 space-y-4">
                <div className="flex">
                    <input 
                        type="text" 
                        placeholder="Search courses..." 
                        className="w-full px-3 py-2 border border-gray-300 rounded-l-md"
                    />
                    <button className="bg-[var(--secondary)] text-white px-3 py-2 rounded-r-md">
                        <Search size={18} />
                    </button>
                </div>
                <ul className="space-y-2 font-medium text-gray-700">
                    <li><Link href="/" className="block py-2 hover:text-[var(--primary)]">Home</Link></li>
                    <li><Link href="/courses" className="block py-2 hover:text-[var(--primary)]">All Courses</Link></li>
                    <li><Link href="/services" className="block py-2 hover:text-[var(--primary)]">Services</Link></li>
                    <li><Link href="/training" className="block py-2 hover:text-[var(--primary)]">Training</Link></li>
                    <li><Link href="/about" className="block py-2 hover:text-[var(--primary)]">About Us</Link></li>
                    <li><Link href="/contact" className="block py-2 hover:text-[var(--primary)]">Contact</Link></li>
                    <li>
                        <Link href="/login" className="block py-2 text-[var(--primary)] font-bold">Login</Link>
                    </li>
                </ul>
            </div>
        </div>
      )}
    </header>
  );
};

export default Header;
