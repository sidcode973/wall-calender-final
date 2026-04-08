'use client';
import { useState } from 'react';
import type { CellData } from './types';
import type { ThemeColors } from '@/hooks/useThemeColor';
import { HOLIDAY_COLOR } from '@/lib/holidays';

const SUN_COLOR = '#ef4444';

interface Props {
  cell: CellData;
  theme: ThemeColors;
  onDayClick: (date: Date) => void;
  onDayHover: (date: Date) => void;
}

export default function DayCell({ cell, theme, onDayClick, onDayHover }: Props) {
  const [hovered, setHovered] = useState(false);
  const { day, date, isOther, isSat, isSun, isStart, isEnd, isInRange, isToday, holiday, noteOnDate } = cell;

  const isSelected  = isStart || isEnd;
  const isSingleDay = isStart && isEnd;

  // Band background
  let bandBg = 'transparent';
  if (isSelected)     bandBg = theme.accentLight;
  else if (isInRange) bandBg = theme.accentRange;

  // Band border-radius (hotel booking pill shape)
  let bandRadius = '6px';
  if (isSingleDay)    bandRadius = '50%';
  else if (isStart)   bandRadius = '999px 0 0 999px';
  else if (isEnd)     bandRadius = '0 999px 999px 0';
  else if (isInRange) bandRadius = '0';

  // Number badge background
  let numBg = 'transparent';
  if (isSelected)                             numBg = theme.accentDark;
  else if (isToday)                           numBg = theme.accent;
  else if (hovered && !isOther && !isInRange) numBg = '#f3f4f6';

  // Number text color
  let numColor = '#111827';
  if (isSelected || isToday) numColor = '#ffffff';
  else if (isOther)          numColor = '#d1d5db';
  else if (isSun)            numColor = SUN_COLOR;
  else if (isSat)            numColor = theme.accent;

  // Note underline — distinct from holiday dot
  const noteUnderlineColor = isSelected || isToday ? 'rgba(255,255,255,0.85)' : theme.accent;

  // Holiday dot color
  const holDotColor = isSelected || isToday
    ? 'rgba(255,255,255,0.85)'
    : holiday ? HOLIDAY_COLOR[holiday.type] : '';

  return (
    <div
      role={!isOther ? 'button' : undefined}
      tabIndex={!isOther ? 0 : undefined}
      aria-label={!isOther ? String(day) : undefined}
      onKeyDown={e => { if (!isOther && e.key === 'Enter') onDayClick(date); }}
      className="relative flex flex-col items-center justify-center"
      style={{
        height: '38px',
        background: bandBg,
        borderRadius: bandRadius,
        cursor: isOther ? 'default' : 'pointer',
        transition: 'background 0.12s',
      }}
      onClick={() => !isOther && onDayClick(date)}
      onMouseEnter={() => { setHovered(true); if (!isOther) onDayHover(date); }}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Number badge — underlined when a note exists (distinct from holiday dot) */}
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          background: numBg,
          color: numColor,
          fontSize: '12.5px',
          fontWeight: isSelected || isToday ? 700 : 500,
          lineHeight: 1,
          transition: 'background 0.12s, color 0.12s',
          flexShrink: 0,
          // Underline = notes indicator; dot below = holiday indicator
          textDecoration: noteOnDate ? 'underline' : 'none',
          textDecorationColor: noteUnderlineColor,
          textDecorationThickness: '2px',
          textUnderlineOffset: '3px',
        }}
      >
        {day}
      </span>

      {/* Holiday dot (only holidays, not notes) */}
      {holiday && (
        <div style={{ height: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              width: '3.5px',
              height: '3.5px',
              borderRadius: '50%',
              background: holDotColor,
            }}
          />
        </div>
      )}

      {/* Holiday tooltip */}
      {holiday && hovered && !isOther && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 z-50"
          style={{ pointerEvents: 'none', minWidth: '110px', maxWidth: '170px' }}
        >
          <div
            style={{
              background: '#1f2937',
              borderRadius: '7px',
              padding: '5px 8px',
              textAlign: 'center',
              boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
            }}
          >
            <div style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: holDotColor, marginBottom: '2px' }}>
              {holiday.type}
            </div>
            <div style={{ fontSize: '9.5px', color: '#f3f4f6', lineHeight: 1.3 }}>
              {holiday.name}
            </div>
          </div>
          <div style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '5px solid #1f2937', margin: '0 auto' }} />
        </div>
      )}
    </div>
  );
}
