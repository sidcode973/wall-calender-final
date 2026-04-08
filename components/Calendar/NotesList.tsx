'use client';
import type { NoteEntry } from '@/hooks/useNotes';
import type { ThemeColors } from '@/hooks/useThemeColor';

interface Props {
  entries: NoteEntry[];
  onDelete: (key: string) => void;
  onNoteClick: (entry: NoteEntry) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  theme: ThemeColors;
}

function TrashIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

function ChevronUp() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function NotesList({ entries, onDelete, onNoteClick, isExpanded, onToggleExpand, theme }: Props) {
  return (
    <div>

      {/* Section header */}
      <div
        className="flex items-center justify-between"
        style={{ padding: '9px 18px 6px' }}
      >
        <div className="flex items-center gap-2">
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: theme.accent, flexShrink: 0 }} />
          <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: '#6b7280' }}>
            All Notes
          </span>
          {entries.length > 0 && (
            <span style={{ fontSize: '9px', color: '#d1d5db' }}>({entries.length})</span>
          )}
        </div>

        {/* Slide-up / slide-down toggle */}
        <button
          onClick={onToggleExpand}
          title={isExpanded ? 'Collapse notes' : 'Expand notes'}
          className="flex items-center gap-1"
          style={{
            background: isExpanded ? theme.accentLight : 'transparent',
            border: `1px solid ${isExpanded ? theme.accentRange : '#e5e7eb'}`,
            borderRadius: '20px',
            padding: '3px 8px',
            cursor: 'pointer',
            color: isExpanded ? theme.accentDark : '#9ca3af',
            fontSize: '9px',
            fontWeight: 600,
            fontFamily: 'var(--font-body)',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          {isExpanded ? <ChevronDown /> : <ChevronUp />}
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>

      {/* Notes entries — scrollable area */}
      {entries.length === 0 ? (
        <div style={{
          overflow: 'hidden',
          maxHeight: isExpanded ? '80px' : '0px',
          transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
        }}>
          <p style={{ fontSize: '11px', color: '#d1d5db', fontStyle: 'italic', margin: 0, padding: '6px 18px 12px' }}>
            No saved notes yet. Select dates and click Submit.
          </p>
        </div>
      ) : (
        <div
          style={{
            overflowY: 'auto',
            padding: '2px 18px 12px',
            maxHeight: isExpanded ? '320px' : '0px',
            transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          {entries.map((entry, i) => (
            <div
              key={entry.key}
              style={{
                paddingTop: i === 0 ? '4px' : '10px',
                paddingBottom: '10px',
                borderBottom: i < entries.length - 1 ? '1px solid #f3f4f6' : 'none',
                cursor: 'pointer',
              }}
              onClick={() => onNoteClick(entry)}
            >
              {/* Date label + delete */}
              <div
                className="flex items-center justify-between gap-2"
                style={{ marginBottom: '5px' }}
                onClick={e => e.stopPropagation()}
              >
                <span
                  onClick={() => onNoteClick(entry)}
                  style={{
                    fontSize: '10px',
                    color: theme.accentDark,
                    fontWeight: 600,
                    padding: '2px 8px',
                    background: theme.accentLight,
                    borderRadius: '4px',
                    borderLeft: `2.5px solid ${theme.accent}`,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: 'calc(100% - 40px)',
                    cursor: 'pointer',
                    transition: 'opacity 0.15s',
                    display: 'block',
                  }}
                  title="Click to select these dates on the calendar"
                >
                  {entry.label}
                </span>

                <button
                  onClick={e => { e.stopPropagation(); onDelete(entry.key); }}
                  title="Delete note"
                  className="flex items-center"
                  style={{
                    fontSize: '9px', color: '#ef4444',
                    background: 'none', border: 'none', cursor: 'pointer',
                    padding: '2px', flexShrink: 0, opacity: 0.7,
                    transition: 'opacity 0.1s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
                >
                  <TrashIcon />
                </button>
              </div>

              {/* Note text */}
              <p
                style={{
                  fontSize: '12px', color: '#374151',
                  fontWeight: 500,
                  lineHeight: 1.55, whiteSpace: 'pre-wrap',
                  margin: 0, wordBreak: 'break-word',
                  paddingLeft: '2px',
                }}
              >
                {entry.note}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
