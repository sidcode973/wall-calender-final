'use client';
import { useState } from 'react';
import type { ThemeColors } from '@/hooks/useThemeColor';

interface NavButtonProps {
  label: string;
  ariaLabel: string;
  onClick: () => void;
  theme: ThemeColors;
}

function NavButton({ label, ariaLabel, onClick, theme }: NavButtonProps) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        flexShrink: 0,
        background: pressed ? theme.accentRange : theme.accentLight,
        border: `1.5px solid ${theme.accentRange}`,
        color: theme.accentDark,
        fontSize: '19px',
        fontWeight: 700,
        lineHeight: 1,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: pressed ? 'scale(0.88)' : 'scale(1)',
        transition: 'transform 0.1s, background 0.1s',
        userSelect: 'none',
      }}
    >
      {label}
    </button>
  );
}

interface Props {
  month: string;
  year: number;
  onPrev: () => void;
  onNext: () => void;
  theme: ThemeColors;
}

export default function NavBar({ month, year, onPrev, onNext, theme }: Props) {
  return (
    <div
      className="flex items-center justify-between"
      style={{
        padding: '12px 18px',
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      <NavButton label="‹" ariaLabel="Previous month" onClick={onPrev} theme={theme} />

      <div className="text-center select-none">
        <span
          style={{
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '2.5px',
            color: '#111827',
            fontFamily: 'var(--font-display)',
            textTransform: 'uppercase',
          }}
        >
          {month}
        </span>
        <span
          style={{
            marginLeft: '8px',
            fontSize: '11px',
            fontWeight: 700,
            color: '#6b7280',
            letterSpacing: '2px',
          }}
        >
          {year}
        </span>
      </div>

      <NavButton label="›" ariaLabel="Next month" onClick={onNext} theme={theme} />
    </div>
  );
}
