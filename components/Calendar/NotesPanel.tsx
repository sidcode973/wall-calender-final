'use client';
import React from 'react';
import { ThemeColors } from '@/hooks/useThemeColor';

interface Props {
  note: string;
  onNoteChange: (v: string) => void;
  startDate: Date | null;
  endDate: Date | null;
  theme: ThemeColors;
}

function fmtDate(d: Date) {
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function NotesPanel({ note, onNoteChange, startDate, endDate, theme }: Props) {
  let rangeLabel = 'No dates selected';
  let dayCount = '';
  if (startDate && endDate) {
    if (startDate.getTime() === endDate.getTime()) {
      rangeLabel = fmtDate(startDate);
    } else {
      rangeLabel = `${fmtDate(startDate)} → ${fmtDate(endDate)}`;
      const diff = Math.round((endDate.getTime() - startDate.getTime()) / 86400000) + 1;
      dayCount = `${diff} days`;
    }
  } else if (startDate) {
    rangeLabel = fmtDate(startDate);
  }

  return (
    <div className="flex flex-col gap-3 p-4 bg-gray-50 dark:bg-gray-850 border-r border-gray-200 dark:border-gray-700"
      style={{ minHeight: '260px' }}>

      {/* Label */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold tracking-[2px] uppercase text-gray-400 dark:text-gray-500">
          Notes
        </span>
        {dayCount && (
          <span
            className="text-[10px] px-2 py-[2px] rounded-full font-medium"
            style={{ background: theme.accentLight, color: theme.accent }}
          >
            {dayCount}
          </span>
        )}
      </div>

      {/* Range pill */}
      <div
        className="text-[11px] px-3 py-2 rounded-lg border text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        style={{ minHeight: '34px', lineHeight: '1.4' }}
      >
        {rangeLabel}
      </div>

      {/* Notes area with lined paper style */}
      <textarea
        className="flex-1 resize-none text-[13px] bg-transparent outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400"
        style={{
          minHeight: '130px',
          lineHeight: '1.8rem',
          backgroundImage: 'repeating-linear-gradient(transparent, transparent calc(1.8rem - 1px), #e5e7eb calc(1.8rem - 1px), #e5e7eb 1.8rem)',
          paddingTop: '3px',
          fontFamily: 'var(--font-body)',
        }}
        placeholder="Write your plans here..."
        value={note}
        onChange={e => onNoteChange(e.target.value)}
      />

      {/* Legend */}
      <div className="flex flex-col gap-[5px] pt-2 border-t border-gray-200 dark:border-gray-700">
        <p className="text-[9px] font-semibold tracking-[1.5px] uppercase text-gray-400 mb-1">Holidays</p>
        {[
          { color: '#ef5350', label: 'National' },
          { color: '#ffa726', label: 'Religious / Cultural' },
          { color: '#66bb6a', label: 'International' },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
            <span className="text-[10px] text-gray-500 dark:text-gray-400">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
