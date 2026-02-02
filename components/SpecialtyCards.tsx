import Link from 'next/link';
import { Package, Sparkles, Gift } from 'lucide-react';

const specialties = [
  {
    icon: Package,
    title: 'Bulk Orders',
    description: 'Special pricing for wholesale and bulk purchases',
    link: '/bulk-inquiry',
    bgColor: 'from-forest/10 to-forest/5',
    iconColor: 'text-forest',
  },
  {
    icon: Sparkles,
    title: 'New Arrivals',
    description: 'Discover our latest additions to the product line',
    link: '/shop?filter=new',
    bgColor: 'from-gold/10 to-gold/5',
    iconColor: 'text-gold-700',
  },
  {
    icon: Gift,
    title: 'Bundle & Save',
    description: 'Combo packs with special discounts on multiple items',
    link: '/shop?filter=bundles',
    bgColor: 'from-forest/10 to-gold/10',
    iconColor: 'text-forest-600',
  },
];

export default function SpecialtyCards() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {specialties.map((specialty, index) => (
            <Link
              key={index}
              href={specialty.link}
              className="group block"
            >
              <div
                className={`h-full p-8 rounded-xl bg-gradient-to-br ${specialty.bgColor} border-2 border-transparent hover:border-forest/20 transition-all duration-300 hover:shadow-card`}
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 bg-white rounded-full mb-4 group-hover:scale-110 transition-transform ${specialty.iconColor}`}>
                  <specialty.icon className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-forest mb-2">
                  {specialty.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {specialty.description}
                </p>
                <div className="mt-4 text-forest font-semibold group-hover:translate-x-2 transition-transform inline-flex items-center">
                  Learn More →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
