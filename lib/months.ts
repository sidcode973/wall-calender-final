export interface MonthMeta {
  image: string;
  fallbackTheme: string; // hex fallback if color extraction fails
}

/**
 * All images are distinct Unsplash photos.
 * April image was replaced (previous URL was broken/deleted).
 * May, Oct, Nov were previously sharing the same URL — all now unique.
 */
export const MONTH_META: MonthMeta[] = [
  // Jan — winter frost / snow
  { image: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=900&q=80&auto=format&fit=crop', fallbackTheme: '#1565C0' },
  // Feb — pink cherry blossoms
  { image: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=900&q=80&auto=format&fit=crop', fallbackTheme: '#AD1457' },
  // Mar — spring green meadow
  { image: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=900&q=80&auto=format&fit=crop', fallbackTheme: '#2E7D32' },
  // Apr — spring blossoms (was broken; replaced)
  { image: 'https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?w=900&q=80&auto=format&fit=crop', fallbackTheme: '#E65100' },
  // May — green summer garden
  { image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=80&auto=format&fit=crop', fallbackTheme: '#00695C' },
  // Jun — turquoise beach / ocean
  { image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80&auto=format&fit=crop', fallbackTheme: '#0277BD' },
  // Jul — lush green summer hills
  { image: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=900&q=80&auto=format&fit=crop', fallbackTheme: '#558B2F' },
  // Aug — dramatic purple sky
  { image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=900&q=80&auto=format&fit=crop', fallbackTheme: '#6A1B9A' },
  // Sep — warm amber autumn
  { image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80&auto=format&fit=crop', fallbackTheme: '#BF360C' },
  // Oct — golden autumn leaves (was duplicate of May; replaced)
  { image: 'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=900&q=80&auto=format&fit=crop', fallbackTheme: '#E65100' },
  // Nov — misty late-autumn forest (was duplicate of May; replaced)
  { image: 'https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?w=900&q=80&auto=format&fit=crop', fallbackTheme: '#4E342E' },
  // Dec — snowy winter night
  { image: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=900&q=80&auto=format&fit=crop', fallbackTheme: '#1A237E' },
];

export const MONTHS = [
  'January', 'February', 'March',    'April',
  'May',     'June',     'July',      'August',
  'September','October', 'November',  'December',
];

// Monday-first week order
export const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
