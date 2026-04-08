'use client';
import { useState, useEffect, useCallback } from 'react';

function toKey(d: Date) {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function buildNoteKey(
  startDate: Date | null,
  endDate: Date | null,
  viewYear: number,
  viewMonth: number,
): string {
  if (!startDate) return `notes-month-${viewYear}-${viewMonth}`;
  return `notes-range-${toKey(startDate)}-${toKey(endDate ?? startDate)}`;
}

/** Reads and writes the note for the currently selected date / range. */
export function useNotes(
  startDate: Date | null,
  endDate: Date | null,
  viewYear: number,
  viewMonth: number,
) {
  const key = buildNoteKey(startDate, endDate, viewYear, viewMonth);
  const [note, setNote] = useState('');

  useEffect(() => {
    try { setNote(localStorage.getItem(key) ?? ''); }
    catch { setNote(''); }
  }, [key]);

  const saveNote = useCallback((val: string) => {
    setNote(val);
    try { localStorage.setItem(key, val); } catch {}
  }, [key]);

  return { note, saveNote };
}

/**
 * Scans localStorage and exposes `hasNote(date)` so the calendar grid
 * can display a subtle indicator on dates that already have notes.
 *
 * `refreshTrigger` should be incremented by the parent whenever a note is saved,
 * so the index stays in sync without a full page reload.
 */
export function useNotesIndex(
  viewYear: number,
  viewMonth: number,
  refreshTrigger: number,
) {
  const [datesWithNotes, setDatesWithNotes] = useState<Set<string>>(new Set());

  useEffect(() => {
    const marked = new Set<string>();
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key?.startsWith('notes-range-')) continue;

        const val = localStorage.getItem(key);
        if (!val?.trim()) continue;

        // Key format: notes-range-YYYY-M-D-YYYY-M-D
        // Remove prefix then split on '-'
        const parts = key.replace('notes-range-', '').split('-');
        if (parts.length < 6) continue;

        const [sy, sm, sd, ey, em, ed] = parts.map(Number);
        if ([sy, sm, sd, ey, em, ed].some(isNaN)) continue;

        const start = new Date(sy, sm, sd);
        const end   = new Date(ey, em, ed);
        const cur   = new Date(start);

        while (cur <= end) {
          marked.add(toKey(cur));
          cur.setDate(cur.getDate() + 1);
        }
      }
    } catch { /* localStorage unavailable */ }

    setDatesWithNotes(marked);
  }, [viewYear, viewMonth, refreshTrigger]);

  const hasNote = useCallback(
    (date: Date) => datesWithNotes.has(toKey(date)),
    [datesWithNotes],
  );

  return { hasNote };
}
