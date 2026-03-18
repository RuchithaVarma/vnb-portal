import { TrendingUp, Users, Award, Globe, HelpCircle, type LucideIcon, Sparkles } from 'lucide-react';
import { getItems } from '@/lib/firestoreService';
import { Stat } from '@/types';
import StatCard from './StatCard';

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
    // Fallback data
    stats = [
      { id: '1', icon: '⏱️', value: '2.1Cr+', label: 'Learning Hours', color: 'from-orange-400 to-pink-500' },
      { id: '2', icon: '🏆', value: '98%', label: 'Student Satisfaction', color: 'from-blue-400 to-indigo-500' },
      { id: '3', icon: '👨‍🏫', value: '500+', label: 'Expert Teachers', color: 'from-green-400 to-teal-500' },
      { id: '4', icon: '🌍', value: '50+', label: 'Cities Reached', color: 'from-purple-400 to-fuchsia-500' },
    ];
  }

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-400 via-yellow-400 to-pink-400"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-50/50 rounded-full blur-[120px] -z-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-50 to-yellow-50 px-6 py-2.5 rounded-full shadow-sm mb-6 border border-orange-100">
            <Sparkles className="text-[var(--primary)]" size={16} />
            <span className="font-bold text-gray-700 uppercase tracking-widest text-[10px]">Trusted Globally</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
            Education That <span className="gradient-text">Delivers Results</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Empowering students across the nation with high-quality education and a personalized learning experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, idx) => {
            const Icon = iconMap[stat.icon] || HelpCircle;
            return (
              <StatCard
                key={stat.id || idx}
                stat={stat}
                Icon={Icon}
                index={idx}
              />
            );
          })}
        </div>

        {/* Additional trust badge */}
        <div className="text-center">
          <div className="inline-flex flex-col md:flex-row items-center gap-4 bg-white px-10 py-6 rounded-[2.5rem] shadow-2xl border border-gray-100 hover:scale-[1.02] transition-transform duration-500">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-md">
                  <div className={`w-full h-full bg-gradient-to-br from-orange-${i}00 to-pink-${i}00`}></div>
                </div>
              ))}
              <div className="w-12 h-12 rounded-full border-2 border-white bg-[var(--primary)] flex items-center justify-center text-white text-xs font-bold shadow-md">
                +1M
              </div>
            </div>
            <div className="h-8 w-px bg-gray-200 hidden md:block mx-4"></div>
            <div className="flex items-center gap-3">
              <span className="text-3xl">🏆</span>
              <span className="font-bold text-gray-800 text-lg">India's Most Loved Learning Platform</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
