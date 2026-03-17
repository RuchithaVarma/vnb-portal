import { TrendingUp, Users, Award, Globe, HelpCircle, type LucideIcon } from 'lucide-react';
import { getItems } from '@/lib/firestoreService';
import { Stat } from '@/types';

const iconMap: Record<string, LucideIcon> = {
  "⏱️": TrendingUp,
  "🏆": Award,
  "👨‍🏫": Users,
  "🌍": Globe,
};

const StatsSection = async () => {
  let stats: Stat[] = [];
  try {
    stats = await getItems<Stat>("stats");
  } catch (error) {
    console.error("Failed to fetch stats for homepage:", error);
    // Fallback or empty list
  }

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-yellow-400 to-pink-400"></div>
      
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-4 animate-fadeInUp">
          Trusted by <span className="gradient-text">Millions</span>
        </h2>
        <p className="text-center text-gray-600 mb-12 animate-fadeIn">Making education accessible and effective for every student</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, idx) => {
            const Icon = iconMap[stat.icon] || HelpCircle;
            return (
              <div 
                key={stat.id || idx} 
                className="text-center group animate-fadeInUp card-hover bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl border border-gray-100"
                style={{animationDelay: `${idx * 0.1}s`}}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${stat.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="text-white" size={28} />
                </div>
                <p className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-[var(--primary)] to-orange-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Additional trust badge */}
        <div className="mt-12 text-center animate-fadeInUp" style={{animationDelay: '0.5s'}}>
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-50 to-yellow-50 px-8 py-4 rounded-full border-2 border-orange-200">
            <span className="text-3xl">🏆</span>
            <span className="font-bold text-gray-800">India's Most Loved Learning Platform</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
