'use client';
import React, { useCallback, useState } from 'react';
import { useCalendar } from '@/hooks/useCalendar';
import { useNotes, useNotesIndex } from '@/hooks/useNotes';
import { useThemeColor } from '@/hooks/useThemeColor';
import { MONTH_META, MONTHS } from '@/lib/months';
import type { CellData } from './types';
import HeroSection from './HeroSection';
import NavBar from './NavBar';
import CalendarGrid from './CalendarGrid';
import NotesPanel from './NotesPanel';

// ── Build 42-cell grid (Mon-first) ─────────────────────────────────────────────
function buildCells(
  viewYear: number,
  viewMonth: number,
  getDayState: (date: Date) => { isStart: boolean; isEnd: boolean; isInRange: boolean; isToday: boolean },
  hasNote: (date: Date) => boolean,
): CellData[] {
  const first = new Date(viewYear, viewMonth, 1);
  let startDow = first.getDay();
  startDow = startDow === 0 ? 6 : startDow - 1; // Mon=0 … Sun=6

  const daysInMonth   = new Date(viewYear, viewMonth + 1, 0).getDate();
  const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate();
  const total = Math.ceil((startDow + daysInMonth) / 7) * 7;

  return Array.from({ length: total }, (_, i) => {
    let day: number, month: number, year: number;
    let isOther = false;

    if (i < startDow) {
      day   = prevMonthDays - startDow + i + 1;
      month = viewMonth === 0 ? 11 : viewMonth - 1;
      year  = viewMonth === 0 ? viewYear - 1 : viewYear;
      isOther = true;
    } else if (i >= startDow + daysInMonth) {
      day   = i - startDow - daysInMonth + 1;
      month = viewMonth === 11 ? 0 : viewMonth + 1;
      year  = viewMonth === 11 ? viewYear + 1 : viewYear;
      isOther = true;
    } else {
      day   = i - startDow + 1;
      month = viewMonth;
      year  = viewYear;
    }

    const dow  = i % 7; // Grid always starts Monday in column 0
    const date = new Date(year, month, day);
    const { isStart, isEnd, isInRange, isToday } = getDayState(date);
    const noteOnDate = !isOther && hasNote(date);

    return {
      day, month, year, isOther, date,
      isSat: dow === 5,
      isSun: dow === 6,
      isStart, isEnd, isInRange, isToday, noteOnDate,
    };
  });
}

// ── Format a Date to "8 Apr" style ─────────────────────────────────────────────
function fmtDate(d: Date) {
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

// ── Main component ──────────────────────────────────────────────────────────────
export default function Calendar() {
  const {
    state, prevMonth, nextMonth,
    handleDayClick, handleDayHover, clearHover, clearSelection, getDayState,
  } = useCalendar();

  const { viewYear, viewMonth, startDate, endDate } = state;
  const meta = MONTH_META[viewMonth];
  const { theme, extractFromImage } = useThemeColor(meta.fallbackTheme);

  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { note, saveNote }  = useNotes(startDate, endDate, viewYear, viewMonth);
  const { hasNote }         = useNotesIndex(viewYear, viewMonth, refreshTrigger);

  const onImageLoad = useCallback(
    (img: HTMLImageElement) => extractFromImage(img),
    [extractFromImage],
  );

  const handleNoteChange = useCallback((val: string) => {
    saveNote(val);
    setRefreshTrigger(t => t + 1);
  }, [saveNote]);

  const cells = buildCells(viewYear, viewMonth, getDayState, hasNote);

  // Range label for notes panel
  let rangeLabel = '';
  if (startDate && endDate && startDate.getTime() !== endDate.getTime()) {
    const diff = Math.round((endDate.getTime() - startDate.getTime()) / 86400000) + 1;
    rangeLabel = `${fmtDate(startDate)} – ${fmtDate(endDate)} · ${diff} days`;
  } else if (startDate) {
    rangeLabel = fmtDate(startDate);
  }

  return (
    <div
      className="relative w-full max-w-[420px] md:max-w-[780px] mx-auto select-none"
      style={{
        fontFamily: 'var(--font-body)',
        filter: 'drop-shadow(0 20px 48px rgba(0,0,0,0.20))',
      }}
    >
      {/* ── Binding strip (hole-punch rings) ─────────────────────────────────── */}
      <div
        className="flex items-center justify-evenly px-5 bg-white border-b border-gray-100"
        style={{
          height: '36px',
          borderRadius: '14px 14px 0 0',
          boxShadow: 'inset 0 -2px 6px rgba(0,0,0,0.04)',
        }}
      >
        {[0,1,2,3,4,5,6].map(i => (
          <div
            key={i}
            className="rounded-full border-2 border-gray-300 bg-gray-200"
            style={{
              width: '14px',
              height: '14px',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.18)',
            }}
          />
        ))}
      </div>

      {/* ── Card body: flex-col mobile / flex-row desktop ─────────────────────── */}
      <div
        className="bg-white flex flex-col md:flex-row"
        style={{ borderRadius: '0 0 18px 18px', overflow: 'hidden' }}
      >
        {/* Left / Top: Hero image ──────────────────────────────────────────── */}
        <div className="md:w-[300px] md:flex-shrink-0 md:self-stretch">
          <HeroSection
            imageSrc={meta.image}
            month={MONTHS[viewMonth]}
            year={viewYear}
            theme={theme}
            onImageLoad={onImageLoad}
          />
        </div>

        {/* Right / Bottom: Nav + Grid + Notes ─────────────────────────────── */}
        <div className="flex flex-col flex-1 min-w-0">
          <NavBar
            month={MONTHS[viewMonth]}
            year={viewYear}
            onPrev={prevMonth}
            onNext={nextMonth}
            theme={theme}
          />

          <div style={{ padding: '14px 16px 10px' }}>
            <CalendarGrid
              cells={cells}
              theme={theme}
              onDayClick={handleDayClick}
              onDayHover={handleDayHover}
              onMouseLeave={clearHover}
            />
          </div>

          <NotesPanel
            note={note}
            rangeLabel={rangeLabel}
            onChange={handleNoteChange}
            onClear={clearSelection}
            hasSelection={!!(startDate || endDate)}
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
}
