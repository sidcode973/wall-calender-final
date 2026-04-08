# 🗓 Wall Calendar — Interactive React/Next.js Component

A polished, interactive wall calendar built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

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
- **Holiday Markers** — colored dots on dates with hover tooltips:
  - 🔴 **Red** — Indian national holidays (Republic Day, Independence Day, Gandhi Jayanti, etc.)
  - 🟠 **Orange** — Religious & cultural (Holi, Diwali, Eid, Christmas, etc.)
  - 🟢 **Green** — International days (Women's Day, Earth Day, Yoga Day, etc.)
- **Dark / Light Mode** — toggle in the toolbar, uses `next-themes` with system preference detection

---

## 🛠 Tech Stack

| Tool | Purpose |
|---|---|
| Next.js 14 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| next-themes | Dark/light mode |
| Canvas API | Color extraction from hero image |
| localStorage | Notes persistence |
| Google Fonts (Playfair Display + DM Sans) | Typography |

> No backend, no database — fully client-side as per assessment guidelines.

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
│   ├── layout.tsx          # Root layout, fonts, ThemeProvider
│   ├── page.tsx            # Main page
│   ├── globals.css         # Global styles + Tailwind
│   └── providers.tsx       # next-themes ThemeProvider
│
├── components/
│   └── Calendar/
│       ├── index.ts                # Barrel export
│       ├── Calendar.tsx            # Main calendar (assembles all)
│       ├── CalendarHeader.tsx      # Spiral + hero image + chevron
│       ├── CalendarGrid.tsx        # 7-column date grid
│       ├── CalendarDay.tsx         # Individual day cell
│       ├── NotesPanel.tsx          # Notes textarea + legend
│       └── DarkModeToggle.tsx      # Light/dark toggle button
│
├── hooks/
│   ├── useCalendar.ts      # Month navigation, date selection state
│   ├── useNotes.ts         # Notes read/write to localStorage
│   └── useThemeColor.ts    # Canvas-based color extraction + palette builder
│
├── lib/
│   ├── holidays.ts         # Indian + International holiday data (MM-DD keyed)
│   └── months.ts           # Month images, names, weekday labels
│
└── README.md
```

---

## 🎨 Design Decisions

- **Typography**: Playfair Display (display/headings) + DM Sans (body) — editorial feel matching the wall calendar aesthetic
- **Color extraction**: Custom canvas pixel-sampling algorithm groups pixels into hue buckets, finds the most saturated dominant hue, then generates a 4-stop palette (accent, light, range, dark). No external library needed.
- **Range selection UX**: Hover preview while selecting so users see the range before committing — reduces errors on touch screens
- **Notes scoping**: Notes key off `startDate + endDate` so each date range has its own note. If no selection, notes key off the current month.

---

## 🎥 Video Demo

[Add your Loom / YouTube link here]

## 🌐 Live Demo

[Add your Vercel deployment URL here]
