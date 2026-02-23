import { Smartphone, Download, QrCode, Play } from 'lucide-react';

const MobileAppSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-[var(--foreground)] to-gray-800 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-[var(--primary)] rounded-full opacity-10 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-yellow-400 rounded-full opacity-10 blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-slideInLeft">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
              <Smartphone className="text-[var(--accent)]" size={24} />
              <span className="font-bold">Download Our App</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Learn from <span className="text-[var(--accent)]">Anywhere</span>, Anytime
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Access live classes, study materials, and doubt solving on the go with our mobile app. Available on iOS and Android.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all">
                <p className="text-3xl font-bold text-[var(--accent)] mb-2">25L+</p>
                <p className="text-sm text-gray-300">Doubts Resolved</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all">
                <p className="text-3xl font-bold text-[var(--accent)] mb-2">57+</p>
                <p className="text-sm text-gray-300">Countries</p>
              </div>
            </div>

            {/* Download buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="group flex items-center gap-3 bg-white text-gray-800 px-6 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-2xl hover:scale-105">
                <Play className="text-[var(--primary)]" size={24} />
                <div className="text-left">
                  <p className="text-xs text-gray-600">GET IT ON</p>
                  <p className="text-lg">Google Play</p>
                </div>
              </button>
              <button className="group flex items-center gap-3 bg-white text-gray-800 px-6 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-2xl hover:scale-105">
                <Download className="text-[var(--primary)]" size={24} />
                <div className="text-left">
                  <p className="text-xs text-gray-600">Download on the</p>
                  <p className="text-lg">App Store</p>
                </div>
              </button>
            </div>
          </div>

          {/* Right Content - Phone Mockup */}
          <div className="relative animate-slideInRight">
            {/* Phone frame */}
            <div className="relative mx-auto w-80 h-[600px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] p-4 shadow-2xl border-8 border-gray-700">
              {/* Screen */}
              <div className="w-full h-full bg-gradient-to-br from-orange-400 to-pink-500 rounded-[2.5rem] overflow-hidden relative">
                {/* App UI simulation */}
                <div className="p-6 space-y-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 animate-fadeIn">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-white/30 rounded-full"></div>
                      <div>
                        <div className="w-32 h-3 bg-white/40 rounded mb-2"></div>
                        <div className="w-24 h-2 bg-white/30 rounded"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 animate-fadeIn" style={{animationDelay: '0.2s'}}>
                    <div className="w-full h-32 bg-white/30 rounded-xl mb-3"></div>
                    <div className="w-40 h-3 bg-white/40 rounded"></div>
                  </div>
                  
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 animate-fadeIn" style={{animationDelay: '0.4s'}}>
                    <div className="flex gap-3">
                      <div className="w-20 h-20 bg-white/30 rounded-xl"></div>
                      <div className="flex-1">
                        <div className="w-full h-3 bg-white/40 rounded mb-2"></div>
                        <div className="w-3/4 h-2 bg-white/30 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute top-20 right-4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl animate-bounce">
                  <span className="text-2xl">📚</span>
                </div>
                <div className="absolute bottom-32 left-4 w-14 h-14 bg-yellow-300 rounded-full flex items-center justify-center shadow-xl animate-pulse">
                  <span className="text-2xl">⭐</span>
                </div>
              </div>
              
              {/* Notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl"></div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 top-10 right-10 w-64 h-64 bg-gradient-to-br from-[var(--primary)] to-orange-600 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppSection;
