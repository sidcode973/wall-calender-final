'use client';
import React from 'react';
import { ThemeColors } from '@/hooks/useThemeColor';
import { WEEKDAYS } from '@/lib/months';
import { CellData } from './types';
import DayCell from './DayCell';

interface CalendarGridProps {
  cells: CellData[];
  theme: ThemeColors;
  onDayClick: (date: Date) => void;
  onDayHover: (date: Date) => void;
  onGridLeave: () => void;
}

const TEXT_MUTED = '#9e9e9e';
const SUN_COLOR  = '#e53935'; // fixed red — always the same regardless of month

/**
 * Full calendar grid: weekday header row + all day cells.
 *
 * Header colour rules (strict):
 *  index 5 (Sat) → theme.accent     (photo-derived, changes per month)
 *  index 6 (Sun) → SUN_COLOR        (#e53935, always fixed red)
 *  index 0–4 (Mon–Fri) → TEXT_MUTED (neutral, never changes)
 *
 * `onGridLeave` is called when the pointer leaves the grid so the
 * hover-preview range is cleared cleanly.
 */
export default function CalendarGrid({
  cells, theme, onDayClick, onDayHover, onGridLeave,
}: CalendarGridProps) {
  return (
    <div
      style={{ padding: '12px 14px 12px 10px', flex: 1 }}
      onMouseLeave={onGridLeave}
    >
      {/* Weekday header row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          marginBottom: '4px',
        }}
      >
        {WEEKDAYS.map((day, i) => (
          <div
            key={day}
            style={{
              textAlign: 'center',
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '0.6px',
              textTransform: 'uppercase',
              padding: '4px 0',
              color:
                i === 5 ? theme.accent  // Saturday → photo theme color
                : i === 6 ? SUN_COLOR   // Sunday   → fixed red
                : TEXT_MUTED,           // Mon–Fri  → always muted gray
            }}
          >
            {day.slice(0, 2)}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '2px',
        }}
      >
        {cells.map((cell, idx) => (
          <DayCell
            key={idx}
            cell={cell}
            theme={theme}
            onDayClick={onDayClick}
            onDayHover={onDayHover}
          />
        ))}
      </div>

      {/* Auto-theme attribution */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          marginTop: '10px',
        }}
      >
        <div
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: theme.accent,
            flexShrink: 0,
          }}
        />
        <span style={{ fontSize: '9px', color: TEXT_MUTED }}>
          Theme from photo
        </span>
      </div>
    </div>
  );
}
