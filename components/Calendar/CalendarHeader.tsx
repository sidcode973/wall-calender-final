'use client';
import React, { useRef, useEffect } from 'react';
import { MONTHS } from '@/lib/months';
import { ThemeColors } from '@/hooks/useThemeColor';

interface Props {
  month: number;
  year: number;
  imageUrl: string;
  theme: ThemeColors;
  onImageLoad: (img: HTMLImageElement) => void;
}

export default function CalendarHeader({ month, year, imageUrl, theme, onImageLoad }: Props) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) onImageLoad(img);
  }, [imageUrl, onImageLoad]);

  return (
    <div className="relative overflow-hidden" style={{ height: '260px' }}>

      {/* Spiral binding bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-center items-end"
        style={{ height: '22px', background: 'rgba(245,245,245,0.92)', borderBottom: '1px solid #ddd' }}>
        {/* Center hook */}
        <div className="absolute top-[-6px] left-1/2 -translate-x-1/2 z-30"
          style={{ width: '18px', height: '13px', border: '3px solid #999', borderBottom: 'none', borderRadius: '50% 50% 0 0' }} />
        {/* Spiral coils */}
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i}
            style={{
              width: '11px', height: '14px',
              border: '2px solid #bbb',
              borderBottom: 'none',
              borderRadius: '50% 50% 0 0',
              marginBottom: '-2px',
              marginLeft: i === 0 ? '0' : '6px',
            }} />
        ))}
      </div>

      {/* Hero image */}
      <img
        ref={imgRef}
        src={imageUrl}
        alt={`${MONTHS[month]} ${year}`}
        crossOrigin="anonymous"
        className="w-full h-full object-cover"
        onLoad={e => onImageLoad(e.currentTarget)}
      />

      {/* Dark gradient overlay — bottom right */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.04) 30%, rgba(0,0,0,0.52) 100%)' }} />

      {/* Left accent chevron shape — matches reference blue shape */}
      <div className="absolute bottom-0 left-0"
        style={{
          width: '52%',
          height: '58px',
          clipPath: 'polygon(0 100%, 100% 100%, 72% 0, 0 0)',
          background: theme.accent,
          opacity: 0.90,
        }} />

      {/* White chevron divider — bottom cut */}
      <svg className="absolute bottom-[-1px] left-0 w-full" height="42"
        viewBox="0 0 440 42" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="0,42 220,0 440,42" className="fill-white dark:fill-gray-900" />
      </svg>

      {/* Year + Month badge bottom-right */}
      <div className="absolute bottom-10 right-5 text-right text-white"
        style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>
        <p className="text-xs tracking-[3px] font-light opacity-90">{year}</p>
        <p className="text-2xl tracking-[4px] font-semibold uppercase"
          style={{ fontFamily: 'var(--font-display)' }}>
          {MONTHS[month]}
        </p>
      </div>
    </div>
  );
}
