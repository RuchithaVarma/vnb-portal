import { Tractor, FlaskConical, Leaf, Truck } from 'lucide-react';

const valueProps = [
  {
    icon: Tractor,
    title: 'Direct from Farmers',
    description: 'Sourced directly from trusted local farmers for maximum freshness',
  },
  {
    icon: FlaskConical,
    title: 'Lab Tested',
    description: 'Every batch rigorously tested for purity and quality standards',
  },
  {
    icon: Leaf,
    title: '100% Raw',
    description: 'No additives, no preservatives, completely natural and pure',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Quick and reliable shipping to ensure product freshness',
  },
];

export default function ValueProps() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {valueProps.map((prop, index) => (
            <div
              key={index}
              className="text-center space-y-4 p-6 rounded-lg hover:bg-cream-50 transition-colors group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-forest/10 rounded-full group-hover:bg-forest group-hover:scale-110 transition-all duration-300">
                <prop.icon className="w-8 h-8 text-forest group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-lg text-forest">{prop.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
