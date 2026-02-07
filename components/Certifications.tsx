import { Award, Shield, CheckCircle } from "lucide-react";

const certifications = [
  {
    icon: Award,
    name: "GMP Certified",
    description: "Good Manufacturing Practices",
  },
  {
    icon: Shield,
    name: "ISO Certified",
    description: "International Standards",
  },
  {
    icon: CheckCircle,
    name: "FSSAI Licensed",
    description: "Food Safety Certified",
  },
];

export default function Certifications() {
  return (
    <section className="py-16 bg-forest">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            Certified Quality
          </h3>
          <p className="text-cream-200 text-lg">
            Trusted by thousands, approved by authorities
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              <div className="bg-gold p-4 rounded-full mb-4 shadow-lg group-hover:shadow-gold/20 transition-all duration-300 group-hover:scale-105">
                <cert.icon className="w-8 h-8 text-forest-900" />
              </div>
              <div>
                <div className="font-bold text-white text-lg mb-1">
                  {cert.name}
                </div>
                <div className="text-sm text-cream-200">{cert.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
