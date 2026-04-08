'use client';
import type { ThemeColors } from '@/hooks/useThemeColor';

interface Props {
  note: string;
  rangeLabel: string;
  onChange: (val: string) => void;
  onClear: () => void;
  hasSelection: boolean;
  theme: ThemeColors;
}

export default function NotesPanel({ note, rangeLabel, onChange, onClear, hasSelection, theme }: Props) {
  return (
    <div
      className="border-t border-gray-100"
      style={{ padding: '16px 20px 20px' }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between" style={{ marginBottom: '10px' }}>
        <div className="flex items-center gap-2">
          <div
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: theme.accent,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: '#9ca3af',
            }}
          >
            Notes
          </span>
        </div>

        {hasSelection && (
          <button
            onClick={onClear}
            style={{
              fontSize: '9px',
              color: '#9ca3af',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline',
              padding: 0,
              fontFamily: 'var(--font-body)',
            }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Range label */}
      {rangeLabel && (
        <div
          style={{
            fontSize: '10px',
            color: theme.accentDark,
            fontWeight: 500,
            marginBottom: '12px',
            padding: '5px 10px',
            background: theme.accentLight,
            borderRadius: '6px',
            borderLeft: `3px solid ${theme.accent}`,
          }}
        >
          {rangeLabel}
        </div>
      )}

      {/* Lined textarea */}
      <textarea
        value={note}
        onChange={e => onChange(e.target.value)}
        placeholder={rangeLabel ? 'Write a note for these dates…' : 'Select dates to add a note…'}
        style={{
          width: '100%',
          minHeight: '80px',
          resize: 'none',
          background: 'transparent',
          border: 'none',
          outline: 'none',
          fontSize: '12px',
          lineHeight: '24px',
          color: '#374151',
          backgroundImage:
            'repeating-linear-gradient(transparent, transparent 23px, #e5e7eb 23px, #e5e7eb 24px)',
          paddingTop: '2px',
          fontFamily: 'var(--font-body)',
        }}
      />
    </div>
  );
}
