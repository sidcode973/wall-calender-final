import React from 'react';

const HOLES = 7;

/**
 * The decorative hole-punch strip at the very top of the calendar card,
 * mimicking a physical wall calendar hanging rail.
 */
export default function BindingStrip() {
  return (
    <div
      style={{
        height: '38px',
        background: '#ffffff',
        borderRadius: '14px 14px 0 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: '0 20px',
        borderBottom: '1px solid #ebebeb',
        boxShadow: 'inset 0 -2px 6px rgba(0,0,0,0.04)',
      }}
    >
      {Array.from({ length: HOLES }).map((_, i) => (
        <div
          key={i}
          style={{
            width: '15px',
            height: '15px',
            borderRadius: '50%',
            border: '2px solid #c8c8c8',
            background: '#e8e8e8',
            boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.16)',
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
}
