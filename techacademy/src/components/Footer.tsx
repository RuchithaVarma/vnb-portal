import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-12 pb-6 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Column 1: About */}
            <div>
                <h3 className="text-lg font-bold text-[var(--primary)] mb-4">Naresh i Technologies</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    Naresh i Technologies is a premier training institute offering the best software training in Hyderabad. We provide high-quality training with real-time projects.
                </p>
                <div className="flex gap-4">
                    <Link href="#" className="text-gray-400 hover:text-[var(--primary)]"><Facebook size={20} /></Link>
                    <Link href="#" className="text-gray-400 hover:text-[var(--primary)]"><Twitter size={20} /></Link>
                    <Link href="#" className="text-gray-400 hover:text-[var(--primary)]"><Linkedin size={20} /></Link>
                    <Link href="#" className="text-gray-400 hover:text-[var(--primary)]"><Instagram size={20} /></Link>
                    <Link href="#" className="text-gray-400 hover:text-[var(--primary)]"><Youtube size={20} /></Link>
                </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                    <li><Link href="/about" className="hover:text-[var(--primary)]">About Us</Link></li>
                    <li><Link href="/careers" className="hover:text-[var(--primary)]">Careers</Link></li>
                    <li><Link href="/privacy" className="hover:text-[var(--primary)]">Privacy Policy</Link></li>
                    <li><Link href="/terms" className="hover:text-[var(--primary)]">Terms & Conditions</Link></li>
                    <li><Link href="/faq" className="hover:text-[var(--primary)]">FAQ</Link></li>
                </ul>
            </div>

            {/* Column 3: Popular Courses */}
            <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Popular Courses</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                    <li><Link href="#" className="hover:text-[var(--primary)]">Full Stack Java</Link></li>
                    <li><Link href="#" className="hover:text-[var(--primary)]">Data Science & AI</Link></li>
                    <li><Link href="#" className="hover:text-[var(--primary)]">Python Full Stack</Link></li>
                    <li><Link href="#" className="hover:text-[var(--primary)]">DevOps with AWS</Link></li>
                    <li><Link href="#" className="hover:text-[var(--primary)]">Azure Cloud</Link></li>
                </ul>
            </div>

            {/* Column 4: Contact Info */}
            <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Contact Us</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start gap-3">
                        <MapPin className="text-[var(--primary)] mt-1" size={18} />
                        <span>2nd Floor, Durga Bhavani Plaza, Ameerpet, Hyderabad, India.</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <Phone className="text-[var(--primary)]" size={18} />
                        <span>+91-8179191999</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <Mail className="text-[var(--primary)]" size={18} />
                        <span>support@nareshit.com</span>
                    </li>
                </ul>
            </div>
        </div>

        <div className="border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
            <p>&copy; 2026 Naresh i Technologies. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
