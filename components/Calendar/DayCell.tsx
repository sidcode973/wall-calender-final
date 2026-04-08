'use client';
import React, { useState } from 'react';
import { ThemeColors } from '@/hooks/useThemeColor';
import { CellData } from './types';

interface DayCellProps {
  cell: CellData;
  theme: ThemeColors;
  onDayClick: (date: Date) => void;
  onDayHover: (date: Date) => void;
}

const TEXT_BODY  = '#333333'; // Mon–Fri day numbers — never changes
const SUN_COLOR  = '#e53935'; // Sunday — fixed red (Indian calendar standard)

const dotColor = (type: string) =>
  type === 'national'    ? '#ef5350'
  : type === 'religious' ? '#ff9800'
  : type === 'regional'  ? '#ab47bc'
  : '#66bb6a';

const BORDER_COL = '#ebebeb';

/**
 * Single calendar grid cell.
 *
 * Column colour rules:
 *   Sat → theme.accent       (photo-derived, changes per month)
 *   Sun → SUN_COLOR (#e53935, always fixed red)
 *   Mon–Fri → TEXT_BODY (#333333, always the same)
 *
 * Indicators:
 *   noteOnDate → underline on the day number
 *   holiday    → small coloured dot + hover tooltip
 */
export default function DayCell({ cell, theme, onDayClick, onDayHover }: DayCellProps) {
  const [hovered, setHovered] = useState(false);
  const {
    day, date, isOther,
    isStart, isEnd, isInRange, isToday,
    isSat, isSun, noteOnDate,
  } = cell;

  // `holiday` may not be in older CellData snapshots — guard gracefully
  const holiday = (cell as any).holiday ?? null;

  const isSelected  = isStart || isEnd;
  const isSingleDay = isStart && isEnd;

  // Band background
  const cellBg = isSelected   ? theme.accentLight
               : isInRange    ? theme.accentRange
               : 'transparent';

  // Band border-radius (continuous MakeMyTrip style)
  const bandRadius = isSingleDay ? '50%'
                   : isStart     ? '50% 0 0 50%'
                   : isEnd       ? '0 50% 50% 0'
                   : isInRange   ? '0'
                   : hovered && !isOther ? '8px' : '4px';

  // Number badge background
  const numBg = isSelected ? theme.accentDark
              : isToday    ? theme.accent
              : 'transparent';

  // Number text colour — ONLY Sat / Sun differ; Mon–Fri always TEXT_BODY
  const numColor = isSelected || isToday ? '#ffffff'
                 : isSat                 ? theme.accent
                 : isSun                 ? SUN_COLOR
                 : isOther               ? '#d0d0d0'
                 : TEXT_BODY;

  const interactive = !isOther;

  return (
    <div
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? String(day) : undefined}
      aria-pressed={isSelected || undefined}
      onKeyDown={e => { if (interactive && e.key === 'Enter') onDayClick(date); }}
      style={{
        aspectRatio: '1', minHeight: '40px',
        background: cellBg, borderRadius: bandRadius,
        cursor: interactive ? 'pointer' : 'default',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        position: 'relative',
        transition: 'background 0.12s, border-radius 0.12s',
      }}
      onClick={() => interactive && onDayClick(date)}
      onMouseEnter={() => { if (interactive) { setHovered(true); onDayHover(date); } }}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Day number — hover ring, underline when note exists */}
      <span
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: '30px', height: '30px', borderRadius: '50%',
          background: numBg, color: numColor,
          fontSize: '12px',
          fontWeight: (isToday || isSelected) ? 600 : 400,
          transition: 'background 0.12s, color 0.12s',
          outline: hovered && !isSelected && !isOther
            ? `1.5px solid ${theme.accentRange}` : 'none',
          outlineOffset: '1px',
          // Notes indicator: underline on the number
          textDecoration: noteOnDate ? 'underline' : 'none',
          textDecorationColor: (isSelected || isToday)
            ? 'rgba(255,255,255,0.85)'
            : theme.accent,
          textDecorationThickness: '2px',
          textUnderlineOffset: '2px',
        }}
      >
        {day}
      </span>

      {/* Holiday dot */}
      {holiday && (
        <span style={{
          width: '3.5px', height: '3.5px', borderRadius: '50%',
          background: isSelected ? 'rgba(255,255,255,0.85)' : dotColor(holiday.type),
          marginTop: '1.5px', flexShrink: 0,
        }} />
      )}

      {/* Holiday tooltip */}
      {holiday && hovered && (
        <div
          style={{
            position: 'absolute', bottom: '100%', left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '4px', zIndex: 50,
            pointerEvents: 'none',
          }}
        >
          <div style={{
            background: '#fff', border: `1px solid ${BORDER_COL}`,
            borderRadius: '7px', padding: '4px 9px',
            fontSize: '9px', whiteSpace: 'nowrap',
            color: '#444', boxShadow: '0 3px 12px rgba(0,0,0,0.13)',
            textAlign: 'center',
          }}>
            <div style={{
              color: dotColor(holiday.type), fontWeight: 700,
              fontSize: '8px', letterSpacing: '0.6px',
              textTransform: 'uppercase', marginBottom: '1px',
            }}>
              {holiday.type}
            </div>
            {holiday.name}
          </div>
        </div>
      )}
    </div>
  );
}
