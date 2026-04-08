# 🗓️ Wall Calendar — Interactive Next.js App

A beautiful, fully interactive wall calendar built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. Designed to look and feel like a real wall calendar — with a diagonal hero image, hotel-style date range selection, Indian holiday markers, and a smooth notes panel.

---

## ✨ Features

### Core
- **Wall Calendar Aesthetic** — spiral binding, hero image, chevron divider, month/year badge
- **Day Range Selector** — click start → hover preview → click end. Visual states for start, in-range, and end
- **Single Day Mode** — toggle between range and single-day selection
- **Integrated Notes** — per-date-range notes persisted in `localStorage`
- **Fully Responsive** — two-panel desktop layout, stacked mobile layout

### Extra Features
- **Auto Theme Color** — dominant color is extracted from each month's hero image using a canvas-based pixel sampler. The accent, range highlight, and cell colors all update live when you navigate months
- **Dark / Light Mode** — toggle in the toolbar, uses `next-themes` with system preference detection

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| Next.js 14 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS 3 | Utility-first styling |
| Canvas API | Color extraction from hero images |
| localStorage | Notes persistence (no backend needed) |
| Google Fonts | Playfair Display + DM Sans typography |
| Unsplash | Monthly hero background images |

> Fully client-side — no backend, no database, no external state library.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Install & Run

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/wall-calendar.git
cd wall-calendar

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Open in browser
# http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

```bash
npx vercel
```

---

## 📁 Project Structure

```
wall-calendar/
├── app/
│   ├── layout.tsx          # Root layout, fonts
│   ├── page.tsx            # Main page (centers the Calendar card)
│   └── globals.css         # Global styles, Tailwind, hero clip-path
│
├── components/
│   └── Calendar/
│       ├── index.ts        # Barrel export
│       ├── Calendar.tsx    # Main orchestrator — wires all hooks & panels
│       ├── HeroSection.tsx # Left panel: hero image, month/year badge
│       ├── NavBar.tsx      # Month navigation bar with prev/next buttons
│       ├── CalendarGrid.tsx# 7-column day grid with weekday headers
│       ├── DayCell.tsx     # Individual day cell — selection, holiday, note states
│       ├── NotesPanel.tsx  # Notes textarea + Submit button + dot legend
│       ├── NotesList.tsx   # Scrollable All Notes overlay with expand/collapse
│       └── types.ts        # Shared TypeScript interfaces (CellData, etc.)
│
├── hooks/
│   ├── useCalendar.ts      # Month navigation, date selection, range logic
│   ├── useNotes.ts         # Notes CRUD + useAllNotes (scans all localStorage keys)
│   └── useThemeColor.ts    # Canvas pixel-sampling → 5-color accent palette
│
├── lib/
│   ├── holidays.ts         # 70+ Indian holidays (MM-DD keyed, typed by category)
│   └── months.ts           # Month names, Unsplash image URLs, weekday labels
│
└── README.md
```

---

## 🎨 Design Decisions

- **Fixed grid (42 cells):** Always renders 6 rows regardless of the month layout — prevents the card from jumping in height when navigating between months
- **Canvas color extraction:** Custom pixel-sampling algorithm groups pixels into hue buckets, picks the most saturated dominant hue, then builds a 5-stop palette (accent, accentLight, accentRange, accentDark, accentText) — no external library needed
- **Overlay notes panel:** The All Notes list uses `position: absolute` and a `max-height` CSS transition to slide up over the calendar without affecting the card's overall dimensions
- **Submit-only saving:** Notes use local draft state inside the panel and only call `saveNote()` on explicit Submit click — avoids noisy writes on every keystroke
- **Holiday tooltip:** Shows on hover above the day cell using absolute positioning with a CSS arrow — no tooltip library required

---

## 🎥 Video Demo

[https://www.youtube.com/watch?v=B0QwKZNI_C8]

## 🌐 Live Demo

[https://wall-calender-psi.vercel.app/]
