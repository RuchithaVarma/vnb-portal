import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
        style={{
          backgroundImage: 'url(/hero-bg.png)',
          filter: 'blur(1px) brightness(0.8)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-forest-900/30 to-forest-900/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto animate-fade-in">
        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
          Raw. Real. Truly Pure.
        </h1>
        <p className="text-xl sm:text-2xl text-cream-100 mb-8 max-w-3xl mx-auto leading-relaxed">
          Clean, raw, chemical-free powders made from fresh farm produce — naturally pure.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/shop"
            className="btn-primary text-lg px-8 py-4 shadow-xl hover:shadow-2xl"
          >
            Shop Now
          </Link>
          <Link
            href="/about"
            className="btn-secondary text-lg px-8 py-4 bg-white/90 hover:bg-white shadow-xl"
          >
            Our Story
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cream to-transparent"></div>
    </section>
  );
}
