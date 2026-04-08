# 🗓️ Wall Calendar — Interactive Next.js App

A beautiful, fully interactive wall calendar built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. Designed to look and feel like a real wall calendar — with a diagonal hero image, hotel-style date range selection, Indian holiday markers, and a smooth notes panel.

---

## ✨ Features

### 📅 Calendar
- **Fixed 42-cell grid** — always 6 rows × 7 columns, no layout shift between months
- **Hotel-style range selection** — click a start date, hover to preview, click an end date. Pill-shaped highlight band with rounded ends
- **Today highlighted** — current date always marked with an accent circle
- **Click outside to clear** — clicking anywhere outside the calendar deselects the date range

### 🎉 Indian Holidays
- **70+ holidays** for 2026 across all 12 months
- **Hover tooltip** on each holiday showing its name and type

### 📝 Notes
- **Per date-range notes** — each selected range gets its own note
- **Submit to save** — notes only save when you click Submit (not on every keystroke)
- **Clears selection after submit** — calendar resets to a clean state automatically
- **All Notes panel** — scrollable list of all saved notes at the bottom of the card
- **Click any note** — instantly navigates the calendar to that date range and re-selects it
- **Delete individual notes** — remove any note with the trash icon
- **Stored in localStorage** — notes persist across page refreshes and browser restarts

### 🎨 Design & UX
- **Dynamic theme colors** — accent color is extracted from each month's Unsplash hero image using a canvas pixel sampler. Navigation buttons, highlights, and range bands all update live as you switch months
- **Diagonal hero image** — CSS `clip-path` creates a slanted cut on the left panel (desktop), V-notch on mobile
- **Slide-up notes overlay** — clicking Expand smoothly slides the notes list up over the calendar without resizing the card
- **Bold, readable typography** — Playfair Display for headings, DM Sans for body text
- **Fully responsive** — two-panel layout on desktop, stacked on mobile

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

[Add your YouTube link here]

## 🌐 Live Demo

[Add your Vercel deployment URL here]
