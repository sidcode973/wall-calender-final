'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useCalendar } from '@/hooks/useCalendar';
import { useNotes, useNotesIndex, useAllNotes, type NoteEntry } from '@/hooks/useNotes';
import { useThemeColor } from '@/hooks/useThemeColor';
import { MONTH_META, MONTHS } from '@/lib/months';
import { getHoliday } from '@/lib/holidays';
import type { CellData } from './types';
import HeroSection from './HeroSection';
import NavBar from './NavBar';
import CalendarGrid from './CalendarGrid';
import NotesPanel from './NotesPanel';
import NotesList from './NotesList';

// ── Always 42 cells (6 × 7) — grid height never changes ───────────────────────
function buildCells(
  viewYear: number,
  viewMonth: number,
  getDayState: (date: Date) => { isStart: boolean; isEnd: boolean; isInRange: boolean; isToday: boolean },
  hasNote: (date: Date) => boolean,
): CellData[] {
  const first       = new Date(viewYear, viewMonth, 1);
  let startDow      = first.getDay();
  startDow          = startDow === 0 ? 6 : startDow - 1;

  const daysInMonth   = new Date(viewYear, viewMonth + 1, 0).getDate();
  const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate();

  return Array.from({ length: 42 }, (_, i) => {
    let day: number, month: number, year: number;
    let isOther = false;

    if (i < startDow) {
      day = prevMonthDays - startDow + i + 1;
      month = viewMonth === 0 ? 11 : viewMonth - 1;
      year  = viewMonth === 0 ? viewYear - 1 : viewYear;
      isOther = true;
    } else if (i >= startDow + daysInMonth) {
      day = i - startDow - daysInMonth + 1;
      month = viewMonth === 11 ? 0 : viewMonth + 1;
      year  = viewMonth === 11 ? viewYear + 1 : viewYear;
      isOther = true;
    } else {
      day = i - startDow + 1; month = viewMonth; year = viewYear;
    }

    const dow  = i % 7;
    const date = new Date(year, month, day);
    const { isStart, isEnd, isInRange, isToday } = getDayState(date);
    return {
      day, month, year, isOther, date,
      isSat: dow === 5, isSun: dow === 6,
      isStart, isEnd, isInRange, isToday,
      holiday:    !isOther ? getHoliday(month, day) : null,
      noteOnDate: !isOther && hasNote(date),
    };
  });
}

function fmtDate(d: Date) {
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

// Height of the collapsed notes overlay (just the header bar)
const NOTES_HEADER_H = '40px';
// Height of the expanded notes overlay (covers most of the right panel)
const NOTES_EXPANDED_H = '82%';

export default function Calendar() {
  const {
    state, prevMonth, nextMonth,
    handleDayClick, handleDayHover, clearHover, clearSelection, getDayState,
    setDateRange,
  } = useCalendar();

  const { viewYear, viewMonth, startDate, endDate } = state;
  const meta = MONTH_META[viewMonth];
  const { theme, extractFromImage } = useThemeColor(meta.fallbackTheme);

  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { note, saveNote, deleteNote } = useNotes(startDate, endDate, viewYear, viewMonth);
  const { hasNote }              = useNotesIndex(viewYear, viewMonth, refreshTrigger);
  const { entries, deleteByKey } = useAllNotes(refreshTrigger);

  // Slide-up panel state
  const [notesExpanded, setNotesExpanded] = useState(false);

  // Click outside → clear date selection
  const widgetRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
        clearSelection();
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [clearSelection]);

  const onImageLoad = useCallback((img: HTMLImageElement) => extractFromImage(img), [extractFromImage]);

  // Submit note — saves, clears selection, refreshes list
  const handleSubmit = useCallback((val: string) => {
    saveNote(val);
    setRefreshTrigger(t => t + 1);
    clearSelection();
  }, [saveNote, clearSelection]);

  const handleDeleteNote = useCallback(() => {
    deleteNote();
    setRefreshTrigger(t => t + 1);
  }, [deleteNote]);

  const handleDeleteByKey = useCallback((k: string) => {
    deleteByKey(k);
    setRefreshTrigger(t => t + 1);
  }, [deleteByKey]);

  // Click a saved note → navigate calendar to that date range + collapse notes panel
  const handleNoteClick = useCallback((entry: NoteEntry) => {
    const parts = entry.key.replace('notes-range-', '').split('-');
    if (parts.length >= 6) {
      const [sy, sm, sd, ey, em, ed] = parts.map(Number);
      if (![sy, sm, sd, ey, em, ed].some(isNaN)) {
        setDateRange(new Date(sy, sm, sd), new Date(ey, em, ed));
        setNotesExpanded(false); // collapse to reveal the highlighted calendar
      }
    }
  }, [setDateRange]);

  const cells = buildCells(viewYear, viewMonth, getDayState, hasNote);

  let rangeLabel = '';
  if (startDate && endDate && startDate.getTime() !== endDate.getTime()) {
    const diff = Math.round((endDate.getTime() - startDate.getTime()) / 86400000) + 1;
    rangeLabel = `${fmtDate(startDate)} – ${fmtDate(endDate)} · ${diff} days`;
  } else if (startDate) {
    rangeLabel = fmtDate(startDate);
  }

  return (
    <div
      ref={widgetRef}
      className="relative w-full mx-auto select-none"
      style={{
        maxWidth: '860px',
        fontFamily: 'var(--font-body)',
        filter: 'drop-shadow(0 16px 40px rgba(0,0,0,0.18))',
      }}
    >
      {/* Binding strip */}
      <div
        className="flex items-center justify-evenly bg-white border-b border-gray-100"
        style={{
          height: '34px', borderRadius: '14px 14px 0 0',
          padding: '0 24px', boxShadow: 'inset 0 -2px 6px rgba(0,0,0,0.04)',
        }}
      >
        {[0,1,2,3,4,5,6,7,8].map(i => (
          <div key={i} className="rounded-full border-2 border-gray-300 bg-gray-200"
            style={{ width: '13px', height: '13px', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.18)' }} />
        ))}
      </div>

      {/* Card */}
      <div
        className="bg-white flex flex-col md:flex-row"
        style={{ borderRadius: '0 0 16px 16px', overflow: 'hidden' }}
      >
        {/* Hero image */}
        <div className="md:w-[280px] md:flex-shrink-0 md:self-stretch">
          <HeroSection
            imageSrc={meta.image} month={MONTHS[viewMonth]} year={viewYear}
            theme={theme} onImageLoad={onImageLoad}
          />
        </div>

        {/* Right panel — position relative so notes overlay can float above */}
        <div className="flex flex-col flex-1 min-w-0" style={{ overflow: 'hidden', position: 'relative' }}>
          <NavBar
            month={MONTHS[viewMonth]} year={viewYear}
            onPrev={prevMonth} onNext={nextMonth} theme={theme}
          />

          {/* ── Calendar grid — always fully visible, never shrinks ────────── */}
          <div style={{ padding: '12px 16px 8px', flexShrink: 0 }}>
            <CalendarGrid
              cells={cells} theme={theme}
              onDayClick={handleDayClick}
              onDayHover={handleDayHover}
              onMouseLeave={clearHover}
            />
          </div>

          {/* ── Notes input panel ─────────────────────────────────────────── */}
          <NotesPanel
            note={note}
            rangeLabel={rangeLabel}
            onSubmit={handleSubmit}
            onClear={clearSelection}
            onDelete={handleDeleteNote}
            hasSelection={!!(startDate || endDate)}
            theme={theme}
          />

          {/* ── Spacer so content isn't hidden behind collapsed notes bar ──── */}
          <div style={{ height: NOTES_HEADER_H, flexShrink: 0 }} />

          {/* ── All Notes — floating overlay that slides up from the bottom ── */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: '#ffffff',
              borderTop: '1px solid #f0f0f0',
              borderRadius: '0 0 16px 0',
              maxHeight: notesExpanded ? NOTES_EXPANDED_H : NOTES_HEADER_H,
              overflow: 'hidden',
              transition: 'max-height 0.45s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s ease',
              boxShadow: notesExpanded ? '0 -8px 32px rgba(0,0,0,0.09)' : 'none',
              zIndex: 10,
            }}
          >
            <NotesList
              entries={entries}
              onDelete={handleDeleteByKey}
              onNoteClick={handleNoteClick}
              isExpanded={notesExpanded}
              onToggleExpand={() => setNotesExpanded(v => !v)}
              theme={theme}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
