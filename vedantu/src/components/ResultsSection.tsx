import { Trophy, Award, Medal, Star } from 'lucide-react';

const toppers = [
  { name: "Arjun Sharma", rank: "AIR 1", exam: "JEE Advanced 2025", score: "100%", icon: Trophy },
  { name: "Priya Patel", rank: "AIR 3", exam: "NEET 2025", score: "720/720", icon: Award },
  { name: "Rahul Kumar", rank: "99.8%ile", exam: "Class 12 Boards", score: "98.6%", icon: Medal },
  { name: "Sneha Reddy", rank: "State Topper", exam: "Class 10 Boards", score: "100%", icon: Star }
];

const ResultsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-20 animate-bounce"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg mb-4">
            <span className="text-2xl">🌟</span>
            <span className="font-bold text-gray-700">Success Stories</span>
          </div>
          <h2 className="section-title">
            Inspired Students. <span className="gradient-text">Inspired Results</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our students consistently achieve top ranks in competitive exams and board examinations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {toppers.map((topper, idx) => {
            const Icon = topper.icon;
            return (
              <div 
                key={idx} 
                className="bg-white rounded-2xl p-6 shadow-lg card-hover animate-fadeInUp relative overflow-hidden group"
                style={{animationDelay: `${idx * 0.1}s`}}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-[var(--primary)] to-orange-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                        <Icon className="text-white" size={32} />
                      </div>
                      {/* Animated ring */}
                      <div className="absolute inset-0 rounded-full border-4 border-[var(--primary)] opacity-20 animate-ping"></div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-center mb-2 text-[var(--foreground)]">{topper.name}</h3>
                  <div className="text-center space-y-2">
                    <div className="inline-block bg-gradient-to-r from-[var(--primary)] to-orange-500 text-white px-4 py-2 rounded-full">
                      <p className="text-xl font-bold">{topper.rank}</p>
                    </div>
                    <p className="text-sm text-gray-600 font-medium">{topper.exam}</p>
                    <p className="text-sm font-bold text-[var(--primary)]">Score: {topper.score}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12 animate-fadeInUp" style={{animationDelay: '0.5s'}}>
          <button className="btn-primary shadow-2xl">
            View All Success Stories →
          </button>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
