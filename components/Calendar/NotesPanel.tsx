'use client';
import { useEffect, useState } from 'react';
import type { ThemeColors } from '@/hooks/useThemeColor';

interface Props {
  note: string;
  rangeLabel: string;
  onSubmit: (val: string) => void;
  onClear: () => void;
  onDelete: () => void;
  hasSelection: boolean;
  theme: ThemeColors;
}

function TrashIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

export default function NotesPanel({
  note, rangeLabel, onSubmit, onClear, onDelete, hasSelection, theme,
}: Props) {
  // Local draft state — only committed to storage on Submit
  const [draft, setDraft] = useState(note);
  const [saved, setSaved] = useState(false);

  // Sync draft when the selected date/note changes externally
  useEffect(() => { setDraft(note); setSaved(false); }, [note]);

  const handleSubmit = () => {
    if (!draft.trim()) return;
    onSubmit(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  const hasNote = note.trim().length > 0;
  const isDirty = draft !== note;

  return (
    <div className="border-t border-gray-100" style={{ padding: '10px 18px 12px' }}>

      {/* Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: '7px' }}>
        <div className="flex items-center gap-2">
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: theme.accent, flexShrink: 0 }} />
          <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: '#6b7280' }}>
            Notes
          </span>
        </div>

        <div className="flex items-center gap-3">
          {hasNote && (
            <button
              onClick={onDelete}
              title="Delete note"
              className="flex items-center gap-1"
              style={{ fontSize: '9px', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'var(--font-body)', opacity: 0.75 }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.75')}
            >
              <TrashIcon /> Delete
            </button>
          )}
          {hasSelection && (
            <button
              onClick={onClear}
              style={{ fontSize: '9px', color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0, fontFamily: 'var(--font-body)' }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Range label */}
      {rangeLabel && (
        <div
          style={{
            fontSize: '10.5px', color: theme.accentDark, fontWeight: 700,
            marginBottom: '8px', padding: '3px 9px',
            background: theme.accentLight, borderRadius: '5px',
            borderLeft: `2.5px solid ${theme.accent}`,
          }}
        >
          {rangeLabel}
        </div>
      )}

      {/* Textarea */}
      <textarea
        value={draft}
        onChange={e => { setDraft(e.target.value); setSaved(false); }}
        placeholder={rangeLabel ? 'Write a note for these dates…' : 'Select dates to add a note…'}
        disabled={!hasSelection}
        style={{
          width: '100%', minHeight: '60px', resize: 'none',
          background: 'transparent', border: 'none', outline: 'none',
          fontSize: '12px', lineHeight: '22px', color: '#374151',
          backgroundImage: 'repeating-linear-gradient(transparent, transparent 21px, #e5e7eb 21px, #e5e7eb 22px)',
          paddingTop: '2px', fontFamily: 'var(--font-body)',
          cursor: !hasSelection ? 'not-allowed' : 'text',
          opacity: !hasSelection ? 0.5 : 1,
        }}
      />

      {/* Submit row */}
      <div className="flex items-center justify-between" style={{ marginTop: '8px' }}>
        {/* Submit button */}
        {hasSelection && (
          <button
            onClick={handleSubmit}
            disabled={!draft.trim() || saved}
            style={{
              flexShrink: 0,
              padding: '5px 16px',
              borderRadius: '20px',
              border: 'none',
              cursor: !draft.trim() || saved ? 'default' : 'pointer',
              fontSize: '10.5px',
              fontWeight: 700,
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.5px',
              background: saved ? '#d1fae5' : (isDirty && draft.trim()) ? theme.accentDark : theme.accentRange,
              color: saved ? '#059669' : (isDirty && draft.trim()) ? '#fff' : theme.accentDark,
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            {saved ? '✓ Saved' : 'Submit'}
          </button>
        )}
      </div>
    </div>
  );
}
