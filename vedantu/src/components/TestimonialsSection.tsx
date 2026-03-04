import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: "Priya Sharma",
    achievement: "JEE Advanced AIR 45",
    score: "99.8%ile",
    quote: "Brilliant Roots's live classes and personalized doubt solving helped me crack JEE. The teachers are amazing and always available to help!",
    color: "from-blue-400 to-cyan-500"
  },
  {
    name: "Arjun Patel",
    achievement: "NEET AIR 120",
    score: "720/720",
    quote: "The structured curriculum and regular tests kept me on track. I'm grateful to my Brilliant Roots teachers for their constant support.",
    color: "from-purple-400 to-pink-500"
  },
  {
    name: "Sneha Reddy",
    achievement: "Class 12 CBSE",
    score: "98.4%",
    quote: "I improved from 75% to 98% with Brilliant Roots! The interactive classes made learning fun and the study materials were excellent.",
    color: "from-green-400 to-teal-500"
  },
  {
    name: "Rahul Kumar",
    achievement: "Class 10 ICSE",
    score: "96.8%",
    quote: "Brilliant Roots helped me build strong fundamentals. The teachers explain concepts so clearly that even difficult topics become easy!",
    color: "from-orange-400 to-red-500"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-purple-200 rounded-full opacity-20 animate-bounce"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg mb-4 border-2 border-purple-200">
            <Quote className="text-[var(--primary)]" size={24} />
            <span className="font-bold text-gray-700">Student Success Stories</span>
          </div>
          <h2 className="section-title">
            Stories That <span className="gradient-text">Inspire</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from students who transformed their learning journey with Brilliant Roots
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-3xl p-8 shadow-xl card-hover animate-fadeInUp relative overflow-hidden"
              style={{animationDelay: `${idx * 0.15}s`}}
            >
              {/* Gradient accent */}
              <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${testimonial.color}`}></div>
              
              <div className="relative z-10 pl-4">
                {/* Quote icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Quote className="text-white" size={24} />
                </div>
                
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                
                {/* Quote */}
                <p className="text-gray-700 italic mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                
                {/* Student info */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.achievement}</p>
                  </div>
                  <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${testimonial.color} text-white font-bold shadow-lg`}>
                    {testimonial.score}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animate-fadeInUp" style={{animationDelay: '0.6s'}}>
          <button className="btn-primary shadow-2xl">
            Read More Success Stories →
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
