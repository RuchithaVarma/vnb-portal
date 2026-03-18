import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Youtube, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[var(--foreground)] text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Company */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[var(--primary)]">Company</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
              <li><Link href="/safety" className="hover:text-white">Child Safety</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[var(--primary)]">Products</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/live-classes" className="hover:text-white">Free Live Classes</Link></li>
              <li><Link href="/wave" className="hover:text-white">WAVE Platform</Link></li>
              <li><Link href="/vip" className="hover:text-white">VIP Program</Link></li>
              <li><Link href="/store" className="hover:text-white">Brilliant Roots Store</Link></li>
            </ul>
          </div>

          {/* Skills & Logic */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[var(--primary)]">Skills & Logic</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/courses/vedic-maths" className="hover:text-white">Vedic Maths</Link></li>
              <li><Link href="/courses/phonics" className="hover:text-white">Phonics</Link></li>
              <li><Link href="/courses/abacus-long-term" className="hover:text-white">Abacus</Link></li>
            </ul>
          </div>

          {/* Study Material */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[var(--primary)]">Study Material</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/ncert" className="hover:text-white">NCERT Solutions</Link></li>
              <li><Link href="/sample-papers" className="hover:text-white">Sample Papers</Link></li>
              <li><Link href="/previous-year" className="hover:text-white">Previous Year Papers</Link></li>
              <li><Link href="/revision" className="hover:text-white">Revision Notes</Link></li>
            </ul>
          </div>

          {/* Popular Courses */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[var(--primary)]">Academic Courses</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/courses/class-7-8" className="hover:text-white">Class 7 & 8</Link></li>
              <li><Link href="/courses/class-5-6" className="hover:text-white">Class 5 & 6</Link></li>
              <li><Link href="/courses/class-3-4" className="hover:text-white">Class 3 & 4</Link></li>
              <li><Link href="/courses/telugu-basics" className="hover:text-white">Telugu Basics</Link></li>
            </ul>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-4">
            <Link href="#" className="text-gray-400 hover:text-[var(--primary)]"><Facebook size={20} /></Link>
            <Link href="#" className="text-gray-400 hover:text-[var(--primary)]"><Twitter size={20} /></Link>
            <Link href="#" className="text-gray-400 hover:text-[var(--primary)]"><Linkedin size={20} /></Link>
            <Link href="#" className="text-gray-400 hover:text-[var(--primary)]"><Youtube size={20} /></Link>
            <Link href="#" className="text-gray-400 hover:text-[var(--primary)]"><Instagram size={20} /></Link>
          </div>
          <p className="text-sm text-gray-400">&copy; 2026 Brilliant Roots. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
