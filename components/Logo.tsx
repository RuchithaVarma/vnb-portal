import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  variant?: 'default' | 'white' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export default function Logo({ 
  variant = 'default', 
  size = 'md', 
  showText = true,
  className = ''
}: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14'
  };

  const textSizes = {
    sm: { main: 'text-base', sub: 'text-[9px]' },
    md: { main: 'text-lg', sub: 'text-[10px]' },
    lg: { main: 'text-xl', sub: 'text-xs' }
  };

  const variantClasses = {
    default: {
      container: 'bg-white shadow-sm border border-forest/5',
      text: 'text-forest',
      subtext: 'text-forest/40'
    },
    white: {
      container: 'bg-white/10 backdrop-blur-md border border-white/20',
      text: 'text-white',
      subtext: 'text-gold'
    },
    dark: {
      container: 'bg-forest/5 shadow-inner',
      text: 'text-forest',
      subtext: 'text-forest/60'
    }
  };

  const currentVariant = variantClasses[variant];
  const currentSize = sizeClasses[size];
  const currentTextSize = textSizes[size];

  return (
    <Link href="/" className={`flex items-center space-x-2.5 group ${className}`}>
      {/* Professional Logo Mark */}
      <div className={`relative ${currentSize} rounded-lg overflow-hidden transition-all duration-300 group-hover:scale-105 ${currentVariant.container} p-1`}>
        <div className="relative w-full h-full">
          <Image
            src="/logo-pro.png"
            alt="Blooms Energy"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Professional Text */}
      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className={`font-serif font-black tracking-[-0.02em] leading-none ${currentTextSize.main} ${currentVariant.text} transition-colors`}
          >
            BLOOMS
          </span>
          <span
            className={`font-bold tracking-[0.4em] leading-none mt-0.5 ${currentTextSize.sub} ${currentVariant.subtext} transition-colors uppercase`}
          >
            ENERGY
          </span>
        </div>
      )}
    </Link>
  );
}
