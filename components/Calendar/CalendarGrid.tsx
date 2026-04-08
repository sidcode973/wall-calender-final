'use client';
import type { ThemeColors } from '@/hooks/useThemeColor';
import type { CellData } from './types';
import { WEEKDAYS } from '@/lib/months';
import DayCell from './DayCell';

const SUN_COLOR = '#ef4444';

interface Props {
  cells: CellData[];
  theme: ThemeColors;
  onDayClick: (date: Date) => void;
  onDayHover: (date: Date) => void;
  onMouseLeave: () => void;
}

export default function CalendarGrid({ cells, theme, onDayClick, onDayHover, onMouseLeave }: Props) {
  return (
    <div onMouseLeave={onMouseLeave}>
      {/* Weekday headers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', marginBottom: '6px' }}>
        {WEEKDAYS.map((d, i) => (
          <div
            key={d}
            style={{
              textAlign: 'center',
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '0.6px',
              textTransform: 'uppercase',
              padding: '4px 0',
              color: i === 5 ? theme.accent : i === 6 ? SUN_COLOR : '#9ca3af',
            }}
          >
            {d.slice(0, 2)}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '2px' }}>
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
    </div>
  );
}
