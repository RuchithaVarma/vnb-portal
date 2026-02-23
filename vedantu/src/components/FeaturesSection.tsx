import { Video, Users, Clock, Target, Headphones, Award } from 'lucide-react';

const features = [
  {
    icon: Video,
    title: "100% Live Interactive Classes",
    description: "Learn in real-time with two-way audio and video interaction",
    color: "from-red-400 to-pink-500"
  },
  {
    icon: Users,
    title: "Small Batch Sizes",
    description: "Personal attention with limited students per batch",
    color: "from-blue-400 to-cyan-500"
  },
  {
    icon: Clock,
    title: "Flexible Timings",
    description: "Choose class schedules that fit your routine",
    color: "from-purple-400 to-indigo-500"
  },
  {
    icon: Target,
    title: "Personalized Learning",
    description: "Customized study plans based on your strengths and weaknesses",
    color: "from-green-400 to-teal-500"
  },
  {
    icon: Headphones,
    title: "24/7 Doubt Support",
    description: "Get your doubts cleared anytime, anywhere",
    color: "from-yellow-400 to-orange-500"
  },
  {
    icon: Award,
    title: "Regular Assessments",
    description: "Track progress with weekly tests and detailed reports",
    color: "from-pink-400 to-rose-500"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-100 to-transparent rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-100 to-transparent rounded-full blur-3xl opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-50 to-pink-50 px-6 py-3 rounded-full shadow-lg mb-4 border-2 border-orange-200">
            <Target className="text-[var(--primary)]" size={24} />
            <span className="font-bold text-gray-700">Why Choose Vedantu</span>
          </div>
          <h2 className="section-title">
            What Makes Us <span className="gradient-text">Different</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the future of education with our innovative learning platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg card-hover animate-fadeInUp border-2 border-gray-100 relative overflow-hidden"
                style={{animationDelay: `${idx * 0.1}s`}}
              >
                {/* Gradient glow */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 rounded-full blur-2xl transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl`}>
                    <Icon className="text-white" size={28} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-[var(--primary)] to-orange-600 rounded-3xl p-12 text-white text-center animate-fadeInUp" style={{animationDelay: '0.7s'}}>
          <h3 className="text-3xl font-bold mb-4">Experience the Vedantu Difference</h3>
          <p className="text-xl mb-8 text-white/90">Join thousands of students achieving their dreams</p>
          <button className="bg-white text-[var(--primary)] px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl hover:scale-105">
            Start Your Free Trial Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
