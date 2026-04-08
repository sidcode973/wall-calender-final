'use client';
import React, { useCallback, useState } from 'react';
import { useCalendar } from '@/hooks/useCalendar';
import { useNotes, useNotesIndex } from '@/hooks/useNotes';
import { useThemeColor } from '@/hooks/useThemeColor';
import { MONTH_META, MONTHS, WEEKDAYS } from '@/lib/months';
import { getHoliday } from '@/lib/holidays';

// ─── Static design tokens (light-theme only) ──────────────────────────────────
const BG         = '#ffffff';
const BORDER_COL = '#ebebeb';
const TEXT_MUTED = '#9e9e9e';   // Mon–Fri header labels
const TEXT_BODY  = '#333333';   // Mon–Fri day numbers  ← never changes
const SUN_COLOR  = '#e53935';   // Sunday  — fixed red (Indian calendar standard)
// Saturday → theme.accent  (changes with each month's photo, always visible)
// All Mon–Fri headers: TEXT_MUTED | day numbers: TEXT_BODY

/** Dot colour per holiday type. */
const dotColor = (type: string) =>
  type === 'national'      ? '#ef5350'  // red
  : type === 'religious'   ? '#ff9800'  // amber
  : type === 'regional'    ? '#ab47bc'  // purple
  : '#66bb6a';                          // green (international)

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

  const handleNoteChange = useCallback(
    (val: string) => { saveNote(val); setRefreshTrigger(t => t + 1); },
    [saveNote],
  );

  // ─── Build calendar cells ──────────────────────────────────────────────────
  const buildCells = useCallback(() => {
    const first = new Date(viewYear, viewMonth, 1);
    let startDow = first.getDay();
    startDow = startDow === 0 ? 6 : startDow - 1; // Mon = 0 … Sun = 6

    const daysInMonth   = new Date(viewYear, viewMonth + 1, 0).getDate();
    const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate();
    const total = Math.ceil((startDow + daysInMonth) / 7) * 7;

    return Array.from({ length: total }, (_, i) => {
      let day: number, month: number, year: number, isOther = false;

      if (i < startDow) {
        day = prevMonthDays - startDow + i + 1;
        month = viewMonth - 1; year = viewYear;
        if (month < 0) { month = 11; year--; }
        isOther = true;
      } else if (i >= startDow + daysInMonth) {
        day = i - startDow - daysInMonth + 1;
        month = viewMonth + 1; year = viewYear;
        if (month > 11) { month = 0; year++; }
        isOther = true;
      } else {
        day = i - startDow + 1; month = viewMonth; year = viewYear;
      }

      const dow  = (startDow + i) % 7;           // 0=Mon … 6=Sun
      const date = new Date(year, month, day);
      const { isStart, isEnd, isInRange, isToday } = getDayState(date);
      const holiday   = !isOther ? getHoliday(month, day) : null;
      const noteOnDate = !isOther && hasNote(date);

      return {
        day, month, year, isOther, date,
        isSat: dow === 5,
        isSun: dow === 6,
        isStart, isEnd, isInRange, isToday,
        holiday, noteOnDate,
      };
    });
  }, [viewYear, viewMonth, getDayState, hasNote]);

  const cells = buildCells();

  // ─── Range label ───────────────────────────────────────────────────────────
  const fmtDate = (d: Date) =>
    d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

  let rangeLabel = 'No dates selected';
  if (startDate && endDate && startDate.getTime() !== endDate.getTime()) {
    const diff = Math.round((endDate.getTime() - startDate.getTime()) / 86400000) + 1;
    rangeLabel = `${fmtDate(startDate)} – ${fmtDate(endDate)} (${diff}d)`;
  } else if (startDate) {
    rangeLabel = fmtDate(startDate);
  }

  // ─── Nav button (on white card, always visible) ────────────────────────────
  const NavBtn = ({ label, onClick }: { label: string; onClick: () => void }) => {
    const [hov, setHov] = useState(false);
    const [press, setPress] = useState(false);
    return (
      <button
        onClick={onClick}
        aria-label={label === '‹' ? 'Previous month' : 'Next month'}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => { setHov(false); setPress(false); }}
        onMouseDown={() => setPress(true)}
        onMouseUp={() => setPress(false)}
        style={{
          width: '34px', height: '34px', borderRadius: '50%', flexShrink: 0,
          background: hov ? theme.accentRange : theme.accentLight,
          border: `1.5px solid ${theme.accentRange}`,
          color: theme.accentDark,
          fontSize: '20px', fontWeight: 700, lineHeight: 1,
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: press ? 'scale(0.90)' : hov ? 'scale(1.08)' : 'scale(1)',
          transition: 'transform 0.12s, background 0.12s',
          userSelect: 'none',
        }}
      >
        {label}
      </button>
    );
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      className="relative mx-auto select-none"
      style={{
        width: '100%', maxWidth: '420px',
        fontFamily: 'var(--font-body)',
        filter: 'drop-shadow(0 24px 64px rgba(0,0,0,0.22))',
      }}
    >

      {/* ── BINDING STRIP ─────────────────────────────────────────────────── */}
      <div style={{
        height: '38px', background: BG,
        borderRadius: '14px 14px 0 0',
        display: 'flex', alignItems: 'center', justifyContent: 'space-evenly',
        padding: '0 20px',
        borderBottom: `1px solid ${BORDER_COL}`,
        boxShadow: 'inset 0 -2px 6px rgba(0,0,0,0.04)',
      }}>
        {[0,1,2,3,4,5,6].map(i => (
          <div key={i} style={{
            width: '14px', height: '14px', borderRadius: '50%',
            border: '2px solid #c8c8c8', background: '#e8e8e8',
            boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.16)',
          }} />
        ))}
      </div>

      {/* ── CARD ──────────────────────────────────────────────────────────── */}
      <div style={{ background: BG, borderRadius: '0 0 18px 18px', overflow: 'hidden' }}>

        {/* ── HERO IMAGE ────────────────────────────────────────────────────── */}
        <div className="relative overflow-hidden" style={{ height: '248px' }}>
          <img
            src={meta.image}
            alt={MONTHS[viewMonth]}
            crossOrigin="anonymous"
            className="w-full h-full object-cover"
            onLoad={e => onImageLoad(e.currentTarget)}
          />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(145deg, transparent 30%, rgba(0,0,0,0.52) 100%)' }} />

          {/* Chevron divider */}
          <svg className="absolute bottom-0 left-0 w-full"
            viewBox="0 0 420 56" preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
            <polygon points="0,56 0,20 175,56"  fill={theme.accent} opacity="0.92" />
            <polygon points="420,56 420,20 175,56" fill={BG} />
            <rect x="0" y="55" width="420" height="2" fill={BG} />
          </svg>

          {/* Month / Year badge */}
          <div className="absolute text-right text-white"
            style={{ bottom: '44px', right: '18px', textShadow: '0 2px 12px rgba(0,0,0,0.55)' }}>
            <div style={{ fontSize: '11px', letterSpacing: '3px', fontWeight: 300, opacity: 0.85 }}>
              {viewYear}
            </div>
            <div style={{
              fontSize: '27px', letterSpacing: '3px', fontWeight: 700,
              fontFamily: 'var(--font-display)', lineHeight: 1.05,
            }}>
              {MONTHS[viewMonth].toUpperCase()}
            </div>
          </div>
        </div>

        {/* ── MONTH NAV BAR — on white, always visible ──────────────────────── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 18px 10px',
          borderBottom: `1px solid ${BORDER_COL}`,
          gap: '8px',
        }}>
          <NavBtn label="‹" onClick={prevMonth} />

          <div style={{ textAlign: 'center', flex: 1 }}>
            <span style={{
              fontSize: '14px', fontWeight: 700, letterSpacing: '2px',
              color: TEXT_BODY, fontFamily: 'var(--font-display)',
              textTransform: 'uppercase',
            }}>
              {MONTHS[viewMonth]}
            </span>
            <span style={{
              marginLeft: '8px', fontSize: '11px', fontWeight: 400,
              color: TEXT_MUTED, letterSpacing: '2px',
            }}>
              {viewYear}
            </span>
          </div>

          <NavBtn label="›" onClick={nextMonth} />
        </div>

        {/* ── BODY: NOTES LEFT + GRID RIGHT ─────────────────────────────────── */}
        <div className="flex" style={{ minHeight: '268px' }}>

          {/* ── NOTES PANEL ─────────────────────────────────────────────────── */}
          <div className="flex flex-col gap-2 flex-shrink-0"
            style={{ width: '108px', padding: '14px 10px 14px 14px', borderRight: `1px solid ${BORDER_COL}` }}>

            <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '1.8px', textTransform: 'uppercase', color: TEXT_MUTED }}>
              Notes
            </p>

            {/* Selected range label */}
            <div style={{
              fontSize: '9px', color: TEXT_MUTED, background: '#f7f7f7',
              borderRadius: '6px', padding: '5px 6px', lineHeight: 1.45, minHeight: '30px',
            }}>
              {rangeLabel}
            </div>

            {/* Lined textarea */}
            <textarea
              value={note}
              onChange={e => handleNoteChange(e.target.value)}
              placeholder="Write here…"
              style={{
                flex: 1, minHeight: '90px', resize: 'none',
                background: 'transparent', border: 'none', outline: 'none',
                fontSize: '10px', lineHeight: '20px', color: '#555',
                backgroundImage: `repeating-linear-gradient(
                  transparent, transparent 19px, #e5e5e5 19px, #e5e5e5 20px)`,
                paddingTop: '2px', fontFamily: 'var(--font-body)',
              }}
            />

            {/* Holiday legend */}
            <div style={{ marginTop: '2px' }}>
              <p style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '1.4px', textTransform: 'uppercase', color: TEXT_MUTED, marginBottom: '5px' }}>
                Holidays
              </p>
              {[
                { color: '#ef5350', label: 'National' },
                { color: '#ff9800', label: 'Religious' },
                { color: '#66bb6a', label: "Int'l" },
              ].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-1" style={{ marginBottom: '4px' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: color, flexShrink: 0 }} />
                  <span style={{ fontSize: '8.5px', color: TEXT_MUTED }}>{label}</span>
                </div>
              ))}
            </div>

            {/* Clear */}
            {(startDate || endDate) && (
              <button onClick={clearSelection}
                style={{ fontSize: '8px', color: TEXT_MUTED, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', textAlign: 'left', padding: 0 }}>
                Clear
              </button>
            )}
          </div>

          {/* ── DATE GRID ───────────────────────────────────────────────────── */}
          <div
            style={{ flex: 1, padding: '14px 10px 14px 8px' }}
            onMouseLeave={clearHover}
          >
            {/* ── Weekday headers ─────────────────────────────────────────── */}
            {/*
              Column colour rules (strict):
                index 0-4 → Mon Tue Wed Thu Fri → TEXT_MUTED (#9e9e9e) always
                index 5   → Sat                 → theme.accent (photo-derived)
                index 6   → Sun                 → SUN_COLOR (#e53935) always
            */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', marginBottom: '4px' }}>
              {WEEKDAYS.map((d, i) => (
                <div key={d} style={{
                  textAlign: 'center', fontSize: '8.5px', fontWeight: 700,
                  letterSpacing: '0.4px', textTransform: 'uppercase', padding: '3px 0',
                  color: i === 5 ? theme.accent
                       : i === 6 ? SUN_COLOR
                       : TEXT_MUTED,
                }}>
                  {d.slice(0, 2)}
                </div>
              ))}
            </div>

            {/* ── Day cells ───────────────────────────────────────────────── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '1px' }}>
              {cells.map((c, idx) => {
                const isSelected  = c.isStart || c.isEnd;
                const isSingleDay = c.isStart && c.isEnd;

                // Band background
                const cellBg = isSelected ? theme.accentLight
                             : c.isInRange ? theme.accentRange
                             : 'transparent';

                // Band border-radius (continuous range shape)
                const bandRadius = isSingleDay    ? '50%'
                                 : c.isStart      ? '50% 0 0 50%'
                                 : c.isEnd        ? '0 50% 50% 0'
                                 : c.isInRange    ? '0'
                                 : '4px';

                // Number badge background
                const numBg = isSelected ? theme.accentDark
                            : c.isToday  ? theme.accent
                            : 'transparent';

                /*
                  Number text colour rules (strict):
                    selected / today → white (on dark badge)
                    Saturday         → theme.accent
                    Sunday           → SUN_COLOR (#e53935, fixed)
                    other-month      → light gray (#d0d0d0)
                    Mon–Fri          → TEXT_BODY (#333333) always
                */
                const numColor = isSelected || c.isToday ? '#ffffff'
                               : c.isSat               ? theme.accent
                               : c.isSun               ? SUN_COLOR
                               : c.isOther             ? '#d0d0d0'
                               : TEXT_BODY;

                return (
                  <div
                    key={idx}
                    className="relative flex flex-col items-center justify-center group"
                    style={{
                      aspectRatio: '1', minHeight: '36px',
                      background: cellBg, borderRadius: bandRadius,
                      cursor: c.isOther ? 'default' : 'pointer',
                      transition: 'background 0.12s',
                    }}
                    onClick={() => !c.isOther && handleDayClick(c.date)}
                    onMouseEnter={() => !c.isOther && handleDayHover(c.date)}
                  >
                    {/* Day number — underlined when a note exists */}
                    <span style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: '28px', height: '28px', borderRadius: '50%',
                      background: numBg, color: numColor,
                      fontSize: '11.5px',
                      fontWeight: (c.isToday || isSelected) ? 600 : 400,
                      transition: 'background 0.12s, color 0.12s',
                      // Notes indicator: underline on the day number
                      textDecoration: c.noteOnDate ? 'underline' : 'none',
                      textDecorationColor: (isSelected || c.isToday) ? 'rgba(255,255,255,0.85)' : theme.accent,
                      textDecorationThickness: '2px',
                      textUnderlineOffset: '2px',
                    }}>
                      {c.day}
                    </span>

                    {/* Holiday dot */}
                    {c.holiday && (
                      <span style={{
                        width: '3.5px', height: '3.5px', borderRadius: '50%',
                        background: isSelected ? 'rgba(255,255,255,0.85)' : dotColor(c.holiday.type),
                        marginTop: '1.5px', flexShrink: 0,
                      }} />
                    )}

                    {/* Holiday tooltip on hover */}
                    {c.holiday && (
                      <div
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 z-50 hidden group-hover:block"
                        style={{ pointerEvents: 'none' }}
                      >
                        <div style={{
                          background: '#fff', border: `1px solid ${BORDER_COL}`,
                          borderRadius: '7px', padding: '4px 9px',
                          fontSize: '9px', whiteSpace: 'nowrap',
                          color: '#444', boxShadow: '0 3px 12px rgba(0,0,0,0.13)',
                          textAlign: 'center',
                        }}>
                          <div style={{
                            color: dotColor(c.holiday.type),
                            fontWeight: 700, fontSize: '8px',
                            letterSpacing: '0.6px', textTransform: 'uppercase',
                            marginBottom: '1px',
                          }}>
                            {c.holiday.type}
                          </div>
                          {c.holiday.name}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Auto-theme credit */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '10px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: theme.accent, flexShrink: 0 }} />
              <span style={{ fontSize: '8px', color: TEXT_MUTED }}>Theme from photo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
