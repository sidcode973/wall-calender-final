'use client';
import React from 'react';
import { ThemeColors } from '@/hooks/useThemeColor';

interface HeroImageProps {
  imageUrl: string;
  monthName: string;
  viewYear: number;
  theme: ThemeColors;
  onImageLoad: (img: HTMLImageElement) => void;
}

const BG = '#ffffff';

/**
 * Full-bleed hero photograph.
 *
 * - Mobile : fixed height (240px), sits above the calendar grid.
 * - Desktop: stretches to match the right-panel height (md:h-auto).
 *
 * A dark gradient overlay keeps the month/year badge readable.
 * The mobile→grid transition uses a bottom chevron SVG (hidden on desktop).
 * The desktop→grid transition uses a right-side gradient fade.
 */
export default function HeroImage({
  imageUrl, monthName, viewYear, theme, onImageLoad,
}: HeroImageProps) {
  return (
    <div
      className="relative overflow-hidden flex-shrink-0 w-full md:w-[300px] h-[240px] md:h-auto"
    >
      <img
        src={imageUrl}
        alt={monthName}
        crossOrigin="anonymous"
        className="w-full h-full object-cover"
        onLoad={e => onImageLoad(e.currentTarget)}
      />

      {/* Dark diagonal gradient — keeps badge text legible on any photo */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(145deg, transparent 30%, rgba(0,0,0,0.52) 100%)' }}
      />

      {/* Month / Year badge */}
      <div
        className="absolute text-right text-white"
        style={{
          bottom: '52px',
          right: '18px',
          textShadow: '0 2px 12px rgba(0,0,0,0.55)',
        }}
      >
        <div style={{
          fontSize: '11px', letterSpacing: '3px',
          fontWeight: 300, opacity: 0.85,
        }}>
          {viewYear}
        </div>
        <div style={{
          fontSize: '26px', letterSpacing: '3px', fontWeight: 700,
          fontFamily: 'var(--font-display)', lineHeight: 1.05,
        }}>
          {monthName.toUpperCase()}
        </div>
      </div>

      {/* ── Mobile only: bottom chevron SVG transition ── */}
      <svg
        className="absolute bottom-0 left-0 w-full md:hidden"
        viewBox="0 0 420 56"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        <polygon points="0,56 0,20 175,56"  fill={theme.accent} opacity="0.92" />
        <polygon points="420,56 420,20 175,56" fill={BG} />
        <rect x="0" y="55" width="420" height="2" fill={BG} />
      </svg>

      {/* ── Desktop only: right-edge gradient fade into card white ── */}
      <div
        className="hidden md:block absolute inset-y-0 right-0 w-14"
        style={{ background: `linear-gradient(to right, transparent, ${BG})` }}
      />
    </div>
  );
}
