'use client';
import React, { useState } from 'react';
import { ThemeColors } from '@/hooks/useThemeColor';
import { MONTHS } from '@/lib/months';

interface MonthNavProps {
  viewMonth: number;
  viewYear: number;
  onPrev: () => void;
  onNext: () => void;
  theme: ThemeColors;
}

const TEXT_BODY  = '#333333';
const TEXT_MUTED = '#9e9e9e';

function NavButton({
  onClick, label, theme,
}: { onClick: () => void; label: string; theme: ThemeColors }) {
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      aria-label={label === '‹' ? 'Previous month' : 'Next month'}
      style={{
        width: '34px',
        height: '34px',
        borderRadius: '50%',
        background: hovered ? theme.accentRange : theme.accentLight,
        border: `1.5px solid ${theme.accentRange}`,
        color: theme.accentDark,
        fontSize: '19px',
        cursor: 'pointer',
        fontWeight: 600,
        lineHeight: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: pressed ? 'scale(0.92)' : hovered ? 'scale(1.08)' : 'scale(1)',
        transition: 'transform 0.13s, background 0.13s',
        flexShrink: 0,
        userSelect: 'none',
      }}
    >
      {label}
    </button>
  );
}

/**
 * Month navigation bar — always rendered on the white card surface
 * so it stays fully visible regardless of the hero image content.
 */
export default function MonthNav({ viewMonth, viewYear, onPrev, onNext, theme }: MonthNavProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 18px 10px',
        borderBottom: '1px solid #f0f0f0',
        gap: '8px',
      }}
    >
      <NavButton onClick={onPrev} label="‹" theme={theme} />

      <div style={{ textAlign: 'center', flex: 1 }}>
        <span style={{
          fontSize: '14px',
          fontWeight: 700,
          letterSpacing: '2px',
          color: TEXT_BODY,
          fontFamily: 'var(--font-display)',
          textTransform: 'uppercase',
        }}>
          {MONTHS[viewMonth]}
        </span>
        <span style={{
          marginLeft: '8px',
          fontSize: '11px',
          fontWeight: 400,
          color: TEXT_MUTED,
          letterSpacing: '2px',
        }}>
          {viewYear}
        </span>
      </div>

      <NavButton onClick={onNext} label="›" theme={theme} />
    </div>
  );
}
