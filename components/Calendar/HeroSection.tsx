'use client';
import type { ThemeColors } from '@/hooks/useThemeColor';

interface Props {
  imageSrc: string;
  month: string;
  year: number;
  theme: ThemeColors;
  onImageLoad: (img: HTMLImageElement) => void;
}

export default function HeroSection({ imageSrc, month, year, theme, onImageLoad }: Props) {
  return (
    <div
      className="relative overflow-hidden hero-clip-desktop"
      style={{ height: '240px' }}
    >
      {/* Background image */}
      <img
        src={imageSrc}
        alt={month}
        crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        onLoad={e => onImageLoad(e.currentTarget)}
      />

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(160deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.62) 100%)' }}
      />

      {/* Colored accent band at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '110px',
          background: `linear-gradient(to top, ${theme.accentDark}d0, transparent)`,
        }}
      />

      {/* Month + Year text */}
      <div
        className="absolute text-white"
        style={{ bottom: '32px', left: '22px', textShadow: '0 2px 16px rgba(0,0,0,0.6)' }}
      >
        {/* Year — bold and clearly visible */}
        <div
          style={{
            fontSize: '13px',
            letterSpacing: '4px',
            fontWeight: 700,
            opacity: 1,
            textTransform: 'uppercase',
            marginBottom: '4px',
            fontFamily: 'var(--font-body)',
          }}
        >
          {year}
        </div>

        {/* Month name */}
        <div
          style={{
            fontSize: '30px',
            fontWeight: 700,
            fontFamily: 'var(--font-display)',
            letterSpacing: '2px',
            lineHeight: 1,
          }}
        >
          {month.toUpperCase()}
        </div>
      </div>

      {/* Mobile: V-notch at bottom */}
      <svg
        className="absolute bottom-0 left-0 w-full md:hidden"
        viewBox="0 0 420 36"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        <polygon points="0,36 0,10 210,36 420,10 420,36" fill="white" />
      </svg>
    </div>
  );
}
