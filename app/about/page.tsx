import { Leaf, HeartHandshake, Award, TrendingUp } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="section-title mb-4">About Blooms Energy</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Bringing nature's finest directly from farm to your table
          </p>
        </div>

        {/* Our Story */}
        <div className="bg-white rounded-xl shadow-card p-8 md:p-12 mb-12">
          <h2 className="font-serif text-3xl font-bold text-forest mb-6">Our Story</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Blooms Energy Raw Powders was born from a simple belief: nature provides the best 
              nutrition, and it should be available in its purest form. We started our journey 
              working directly with local farmers who share our passion for chemical-free, 
              organic farming.
            </p>
            <p>
              Every powder we create begins with carefully selected fresh produce, harvested at 
              peak ripeness. We use advanced dehydration techniques that preserve maximum nutrients 
              while maintaining the natural essence of each ingredient. No additives, no preservatives, 
              no compromises.
            </p>
            <p>
              Today, we're proud to serve thousands of health-conscious customers across India, 
              offering a complete range of fruit, vegetable, and leafy green powders that make 
              daily nutrition simple, natural, and effective.
            </p>
          </div>
        </div>

      {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {[
            {
              icon: Leaf,
              title: '100% Natural',
              description: 'Pure powders with zero artificial additives or preservatives',
            },
            {
              icon: HeartHandshake,
              title: 'Farm Direct',
              description: 'Supporting local farmers with fair partnerships',
            },
            {
              icon: Award,
              title: 'Quality Assured',
              description: 'Lab-tested and FSSAI certified for your safety',
            },
            {
              icon: TrendingUp,
              title: 'Nutrient Rich',
              description: 'Advanced processing to retain maximum nutritional value',
            },
          ].map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-soft p-6 flex items-start space-x-4"
            >
              <div className="bg-forest/10 p-3 rounded-lg flex-shrink-0">
                <value.icon className="w-6 h-6 text-forest" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-forest mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Our Process */}
        <div className="bg-gradient-to-br from-forest/5 to-gold/5 rounded-xl p-8 md:p-12">
          <h2 className="font-serif text-3xl font-bold text-forest mb-8 text-center">
            Farm to Powder: Our Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Harvest', desc: 'Fresh produce at peak ripeness' },
              { step: '02', title: 'Wash & Clean', desc: 'Thorough cleaning process' },
              { step: '03', title: 'Dehydrate', desc: 'Low-temp nutrient preservation' },
              { step: '04', title: 'Mill & Pack', desc: 'Fine milling and quality packaging' },
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-forest text-white rounded-full font-bold text-xl mb-4">
                  {process.step}
                </div>
                <h4 className="font-semibold text-lg text-forest mb-2">
                  {process.title}
                </h4>
                <p className="text-sm text-gray-600">{process.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
