'use client';
import { useState } from 'react';
import type { CellData } from './types';
import type { ThemeColors } from '@/hooks/useThemeColor';

const SUN_COLOR = '#ef4444';

interface Props {
  cell: CellData;
  theme: ThemeColors;
  onDayClick: (date: Date) => void;
  onDayHover: (date: Date) => void;
}

export default function DayCell({ cell, theme, onDayClick, onDayHover }: Props) {
  const [hovered, setHovered] = useState(false);
  const { day, date, isOther, isSat, isSun, isStart, isEnd, isInRange, isToday, noteOnDate } = cell;

  const isSelected = isStart || isEnd;
  const isSingleDay = isStart && isEnd;

  // ── Band background (outer cell — forms the continuous range strip) ──────────
  let bandBg = 'transparent';
  if (isSelected) bandBg = theme.accentLight;
  else if (isInRange) bandBg = theme.accentRange;

  // ── Band border-radius (hotel booking range shape) ────────────────────────────
  let bandRadius = '6px';
  if (isSingleDay) bandRadius = '50%';
  else if (isStart) bandRadius = '999px 0 0 999px';
  else if (isEnd) bandRadius = '0 999px 999px 0';
  else if (isInRange) bandRadius = '0';

  // ── Number badge background ───────────────────────────────────────────────────
  let numBg = 'transparent';
  if (isSelected) numBg = theme.accentDark;
  else if (isToday) numBg = theme.accent;
  else if (hovered && !isOther && !isInRange) numBg = '#f3f4f6';

  // ── Number text color ─────────────────────────────────────────────────────────
  let numColor = '#111827';
  if (isSelected || isToday) numColor = '#ffffff';
  else if (isOther) numColor = '#d1d5db';
  else if (isSun) numColor = SUN_COLOR;
  else if (isSat) numColor = theme.accent;

  // ── Notes dot color ───────────────────────────────────────────────────────────
  const dotColor = isSelected || isToday ? 'rgba(255,255,255,0.85)' : theme.accent;

  return (
    <div
      role={!isOther ? 'button' : undefined}
      tabIndex={!isOther ? 0 : undefined}
      aria-label={!isOther ? String(day) : undefined}
      aria-pressed={isSelected || undefined}
      onKeyDown={e => { if (!isOther && e.key === 'Enter') onDayClick(date); }}
      className="relative flex items-center justify-center"
      style={{
        aspectRatio: '1',
        minHeight: '40px',
        background: bandBg,
        borderRadius: bandRadius,
        cursor: isOther ? 'default' : 'pointer',
        transition: 'background 0.12s',
      }}
      onClick={() => !isOther && onDayClick(date)}
      onMouseEnter={() => {
        setHovered(true);
        if (!isOther) onDayHover(date);
      }}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Number badge */}
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: numBg,
          color: numColor,
          fontSize: '12.5px',
          fontWeight: isSelected || isToday ? 600 : 400,
          lineHeight: 1,
          transition: 'background 0.12s, color 0.12s',
        }}
      >
        {day}
      </span>

      {/* Notes indicator dot */}
      {noteOnDate && (
        <div
          className="absolute"
          style={{
            bottom: '5px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: dotColor,
          }}
        />
      )}
    </div>
  );
}
