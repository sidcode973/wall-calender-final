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

/** Reads, writes, and deletes the note for the currently selected date/range. */
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

  const deleteNote = useCallback(() => {
    setNote('');
    try { localStorage.removeItem(key); } catch {}
  }, [key]);

  return { note, saveNote, deleteNote };
}

/** Scans localStorage; exposes `hasNote(date)` for the dot/underline indicator. */
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
        const k = localStorage.key(i);
        if (!k?.startsWith('notes-range-')) continue;
        const val = localStorage.getItem(k);
        if (!val?.trim()) continue;

        const parts = k.replace('notes-range-', '').split('-');
        if (parts.length < 6) continue;
        const [sy, sm, sd, ey, em, ed] = parts.map(Number);
        if ([sy, sm, sd, ey, em, ed].some(isNaN)) continue;

        const start = new Date(sy, sm, sd);
        const end   = new Date(ey, em, ed);
        const cur   = new Date(start);
        while (cur <= end) { marked.add(toKey(cur)); cur.setDate(cur.getDate() + 1); }
      }
    } catch {}
    setDatesWithNotes(marked);
  }, [viewYear, viewMonth, refreshTrigger]);

  return { hasNote: useCallback((d: Date) => datesWithNotes.has(toKey(d)), [datesWithNotes]) };
}

/** A single saved note entry (for the notes list). */
export interface NoteEntry {
  key: string;
  label: string;
  note: string;
  sortDate: number; // timestamp for sorting (newest first)
}

function fmtFull(d: Date) {
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

/** Reads ALL saved notes from localStorage and returns them sorted newest→oldest. */
export function useAllNotes(refreshTrigger: number) {
  const [entries, setEntries] = useState<NoteEntry[]>([]);

  const reload = useCallback(() => {
    const found: NoteEntry[] = [];
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (!k?.startsWith('notes-range-')) continue;
        const val = localStorage.getItem(k);
        if (!val?.trim()) continue;

        const parts = k.replace('notes-range-', '').split('-');
        if (parts.length < 6) continue;
        const [sy, sm, sd, ey, em, ed] = parts.map(Number);
        if ([sy, sm, sd, ey, em, ed].some(isNaN)) continue;

        const start = new Date(sy, sm, sd);
        const end   = new Date(ey, em, ed);

        let label: string;
        if (toKey(start) === toKey(end)) {
          label = fmtFull(start);
        } else {
          const days = Math.round((end.getTime() - start.getTime()) / 86400000) + 1;
          label = `${fmtFull(start)} – ${fmtFull(end)} · ${days} days`;
        }

        found.push({ key: k, label, note: val, sortDate: start.getTime() });
      }
    } catch {}

    found.sort((a, b) => b.sortDate - a.sortDate);
    setEntries(found);
  }, []);

  useEffect(() => { reload(); }, [reload, refreshTrigger]);

  const deleteByKey = useCallback((k: string) => {
    try { localStorage.removeItem(k); } catch {}
    reload();
  }, [reload]);

  return { entries, deleteByKey };
}
