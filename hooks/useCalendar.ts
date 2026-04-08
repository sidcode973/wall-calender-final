'use client';
import { useState, useCallback } from 'react';

export interface CalendarState {
  viewYear: number;
  viewMonth: number;
  startDate: Date | null;
  endDate: Date | null;
  hoverDate: Date | null;
}

function toKey(d: Date) {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

export function useCalendar() {
  const now = new Date();

  const [state, setState] = useState<CalendarState>({
    viewYear: now.getFullYear(),
    viewMonth: now.getMonth(),
    startDate: null,
    endDate: null,
    hoverDate: null,
  });

  const prevMonth = useCallback(() => {
    setState(s => {
      let m = s.viewMonth - 1, y = s.viewYear;
      if (m < 0) { m = 11; y--; }
      return { ...s, viewMonth: m, viewYear: y, startDate: null, endDate: null, hoverDate: null };
    });
  }, []);

  const nextMonth = useCallback(() => {
    setState(s => {
      let m = s.viewMonth + 1, y = s.viewYear;
      if (m > 11) { m = 0; y++; }
      return { ...s, viewMonth: m, viewYear: y, startDate: null, endDate: null, hoverDate: null };
    });
  }, []);

  /** First click starts selection; second click finalises the range (auto-swaps if reversed). */
  const handleDayClick = useCallback((date: Date) => {
    setState(s => {
      if (!s.startDate || (s.startDate && s.endDate)) {
        return { ...s, startDate: date, endDate: null, hoverDate: null };
      }
      const start = date < s.startDate ? date : s.startDate;
      const end   = date < s.startDate ? s.startDate : date;
      return { ...s, startDate: start, endDate: end, hoverDate: null };
    });
  }, []);

  /** Live hover preview while waiting for the second click. */
  const handleDayHover = useCallback((date: Date) => {
    setState(s => s.startDate && !s.endDate ? { ...s, hoverDate: date } : s);
  }, []);

  const clearHover = useCallback(() => {
    setState(s => s.hoverDate ? { ...s, hoverDate: null } : s);
  }, []);

  const clearSelection = useCallback(() => {
    setState(s => ({ ...s, startDate: null, endDate: null, hoverDate: null }));
  }, []);

  /**
   * Programmatically select a date range and navigate to the start month.
   * Used when the user clicks a saved note in the All Notes list.
   */
  const setDateRange = useCallback((start: Date, end: Date) => {
    setState(s => ({
      ...s,
      viewYear: start.getFullYear(),
      viewMonth: start.getMonth(),
      startDate: start,
      endDate: end,
      hoverDate: null,
    }));
  }, []);

  const getDayState = useCallback((date: Date): {
    isStart: boolean; isEnd: boolean; isInRange: boolean; isToday: boolean;
  } => {
    const { startDate, endDate, hoverDate } = state;
    const effectiveEnd = startDate && !endDate && hoverDate ? hoverDate : endDate;
    const isStart  = !!startDate && toKey(date) === toKey(startDate);
    const isEnd    = !!effectiveEnd && toKey(date) === toKey(effectiveEnd);
    let isInRange  = false;
    if (startDate && effectiveEnd) {
      const lo = startDate < effectiveEnd ? startDate : effectiveEnd;
      const hi = startDate < effectiveEnd ? effectiveEnd : startDate;
      isInRange = date > lo && date < hi;
    }
    return { isStart, isEnd, isInRange, isToday: toKey(date) === toKey(now) };
  }, [state]);

  return {
    state, prevMonth, nextMonth,
    handleDayClick, handleDayHover, clearHover, clearSelection, getDayState,
    setDateRange,
  };
}
