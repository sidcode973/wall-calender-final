'use client';
import React from 'react';
import { getHoliday } from '@/lib/holidays';
import { ThemeColors } from '@/hooks/useThemeColor';
import clsx from 'clsx';

interface Props {
  day: number;
  month: number;
  year: number;
  isOtherMonth: boolean;
  isSaturday: boolean;
  isSunday: boolean;
  isStart: boolean;
  isEnd: boolean;
  isInRange: boolean;
  isToday: boolean;
  theme: ThemeColors;
  onClick: () => void;
  onMouseEnter: () => void;
}

export default function CalendarDay({
  day, month, year, isOtherMonth,
  isSaturday, isSunday,
  isStart, isEnd, isInRange, isToday,
  theme, onClick, onMouseEnter,
}: Props) {
  const holiday = isOtherMonth ? null : getHoliday(month, day);

  const dotColor = holiday?.type === 'national'
    ? '#ef5350'
    : holiday?.type === 'religious'
    ? '#ffa726'
    : '#66bb6a';

  const isSelected = isStart || isEnd;

  const cellBg = isSelected
    ? theme.accentLight
    : isInRange
    ? theme.accentRange
    : undefined;

  const borderRadius = isStart && isEnd
    ? '8px'
    : isStart
    ? '8px 0 0 8px'
    : isEnd
    ? '0 8px 8px 0'
    : isInRange
    ? '0'
    : '8px';

  const numberBg = isSelected ? theme.accentDark : isToday ? theme.accent : undefined;
  const numberColor = isSelected || isToday
    ? '#fff'
    : isSaturday
    ? theme.accent
    : isSunday
    ? '#ef5350'
    : undefined;

  return (
    <div
      className={clsx(
        'relative flex flex-col items-center justify-center cursor-pointer select-none group',
        'transition-colors duration-100',
        isOtherMonth && 'opacity-30 pointer-events-none',
        !isOtherMonth && !isSelected && !isInRange && 'hover:bg-gray-100 dark:hover:bg-gray-800',
      )}
      style={{
        aspectRatio: '1',
        background: cellBg,
        borderRadius,
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      <span
        className="text-xs font-medium flex items-center justify-center transition-all duration-100"
        style={{
          width: '26px',
          height: '26px',
          borderRadius: '50%',
          background: numberBg,
          color: numberColor,
          fontSize: '11px',
        }}
      >
        {day}
      </span>

      {holiday && (
        <span
          className="w-1 h-1 rounded-full mt-[2px] flex-shrink-0"
          style={{ background: dotColor }}
        />
      )}

      {/* Tooltip */}
      {holiday && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 z-30 pointer-events-none
          hidden group-hover:flex
          bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
          rounded-md px-2 py-1 text-[10px] whitespace-nowrap shadow-sm
          text-gray-700 dark:text-gray-200 flex-col items-center gap-[2px]">
          <span style={{ color: dotColor }} className="font-medium text-[9px] uppercase tracking-wide">
            {holiday.type}
          </span>
          <span>{holiday.name}</span>
        </div>
      )}
    </div>
  );
}
