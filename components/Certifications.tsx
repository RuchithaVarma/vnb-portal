import { Award, Shield, CheckCircle } from 'lucide-react';

const certifications = [
  {
    icon: Award,
    name: 'GMP Certified',
    description: 'Good Manufacturing Practices',
  },
  {
    icon: Shield,
    name: 'ISO Certified',
    description: 'International Standards',
  },
  {
    icon: CheckCircle,
    name: 'FSSAI Licensed',
    description: 'Food Safety Certified',
  },
];

export default function Certifications() {
  return (
    <section className="py-12 bg-forest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white">
            <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2">
              Certified Quality
            </h3>
            <p className="text-cream-200">
              Trusted by thousands, approved by authorities
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center space-x-3 text-white">
                <div className="bg-gold p-3 rounded-full">
                  <cert.icon className="w-6 h-6 text-forest-900" />
                </div>
                <div>
                  <div className="font-semibold">{cert.name}</div>
                  <div className="text-xs text-cream-200">{cert.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
