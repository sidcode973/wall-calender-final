export type HolidayType = 'national' | 'religious' | 'international';

export interface Holiday {
  name: string;
  type: HolidayType;
}

/**
 * Indian holidays keyed by "MM-DD".
 *
 * Fixed-date holidays use their permanent date.
 * Lunar/variable holidays use their 2026 calendar dates.
 * International days of relevance to India are included under 'international'.
 */
export const HOLIDAYS: Record<string, Holiday> = {

  // ── JANUARY ──────────────────────────────────────────────────────────────
  '01-01': { name: "New Year's Day", type: 'national' },
  '01-14': { name: 'Makar Sankranti / Pongal / Uttarayan', type: 'religious' },
  '01-15': { name: 'Pongal (Tamil Nadu) / Army Day', type: 'national' },
  '01-23': { name: 'Netaji Subhas Chandra Bose Jayanti', type: 'national' },
  '01-26': { name: 'Republic Day', type: 'national' },
  '01-30': { name: 'Martyrs Day (Gandhi Smriti)', type: 'national' },

  // ── FEBRUARY ─────────────────────────────────────────────────────────────
  '02-04': { name: 'Vasant Panchami / Saraswati Puja (2026)', type: 'religious' },
  '02-14': { name: "Valentine's Day", type: 'international' },
  '02-19': { name: 'Chhatrapati Shivaji Maharaj Jayanti', type: 'national' },
  '02-28': { name: 'National Science Day', type: 'national' },

  // ── MARCH ────────────────────────────────────────────────────────────────
  '03-03': { name: 'Maha Shivratri (2026)', type: 'religious' },
  '03-08': { name: "International Women's Day", type: 'international' },
  '03-19': { name: 'Eid ul-Fitr / Meethi Eid (2026)', type: 'religious' },
  '03-20': { name: 'Eid Holiday (2026)', type: 'religious' },
  '03-22': { name: 'Bihar Diwas / World Water Day', type: 'national' },
  '03-25': { name: 'Holi (2026)', type: 'religious' },
  '03-26': { name: 'Dhuleti / Rang Panchami (2026)', type: 'religious' },
  '03-30': { name: 'Ram Navami (2026)', type: 'religious' },

  // ── APRIL ────────────────────────────────────────────────────────────────
  '04-02': { name: 'Good Friday (2026)', type: 'religious' },
  '04-04': { name: 'Easter Saturday (2026)', type: 'religious' },
  '04-05': { name: 'Easter Sunday (2026)', type: 'religious' },
  '04-07': { name: 'World Health Day', type: 'international' },
  '04-14': { name: 'Ambedkar Jayanti / Baisakhi / Tamil New Year / Vishu', type: 'national' },
  '04-15': { name: 'Bengali New Year (Naba Barsha)', type: 'regional' as HolidayType },
  '04-22': { name: 'Earth Day / Hanuman Jayanti (2026)', type: 'international' },

  // ── MAY ──────────────────────────────────────────────────────────────────
  '05-01': { name: 'Maharashtra Day / International Labour Day', type: 'national' },
  '05-11': { name: 'National Technology Day', type: 'national' },
  '05-12': { name: 'Buddha Purnima / Vesak (2026)', type: 'religious' },
  '05-27': { name: 'Eid ul-Adha / Bakrid (2026)', type: 'religious' },

  // ── JUNE ─────────────────────────────────────────────────────────────────
  '06-05': { name: 'World Environment Day', type: 'international' },
  '06-16': { name: 'Muharram / Islamic New Year (2026)', type: 'religious' },
  '06-21': { name: 'International Yoga Day / Summer Solstice', type: 'international' },

  // ── JULY ─────────────────────────────────────────────────────────────────
  '07-11': { name: 'World Population Day', type: 'international' },

  // ── AUGUST ───────────────────────────────────────────────────────────────
  '08-08': { name: 'Janmashtami (2026)', type: 'religious' },
  '08-15': { name: 'Independence Day', type: 'national' },
  '08-22': { name: 'Ganesh Chaturthi (2026)', type: 'religious' },
  '08-31': { name: 'Ganesh Visarjan (2026)', type: 'religious' },

  // ── SEPTEMBER ────────────────────────────────────────────────────────────
  '09-05': { name: "Teacher's Day", type: 'national' },
  '09-07': { name: 'Onam Thiruvonam (2026)', type: 'religious' },
  '09-14': { name: 'Hindi Diwas', type: 'national' },

  // ── OCTOBER ──────────────────────────────────────────────────────────────
  '10-02': { name: 'Gandhi Jayanti', type: 'national' },
  '10-12': { name: 'Navratri Begins (2026)', type: 'religious' },
  '10-17': { name: 'Navratri Ashtami / Durga Puja (2026)', type: 'religious' },
  '10-18': { name: 'Navratri Navami (2026)', type: 'religious' },
  '10-19': { name: 'Dussehra / Vijaya Dashami (2026)', type: 'religious' },
  '10-16': { name: 'World Food Day', type: 'international' },
  '10-24': { name: 'United Nations Day', type: 'international' },
  '10-27': { name: 'Milad-un-Nabi / Eid-e-Milad (2026)', type: 'religious' },
  '10-31': { name: 'National Unity Day (Sardar Patel Jayanti)', type: 'national' },

  // ── NOVEMBER ─────────────────────────────────────────────────────────────
  '11-01': { name: 'Dhanteras (2026)', type: 'religious' },
  '11-02': { name: 'Naraka Chaturdashi / Chhoti Diwali (2026)', type: 'religious' },
  '11-03': { name: 'Diwali / Lakshmi Puja (2026)', type: 'religious' },
  '11-04': { name: 'Govardhan Puja / Annakut (2026)', type: 'religious' },
  '11-05': { name: 'Bhai Dooj (2026)', type: 'religious' },
  '11-08': { name: 'Chhath Puja (2026)', type: 'religious' },
  '11-14': { name: "Children's Day (Nehru Jayanti)", type: 'national' },
  '11-15': { name: 'Jharkhand Foundation Day / Guru Nanak Jayanti (2026)', type: 'national' },

  // ── DECEMBER ─────────────────────────────────────────────────────────────
  '12-01': { name: 'World AIDS Day', type: 'international' },
  '12-25': { name: 'Christmas Day', type: 'religious' },
  '12-31': { name: "New Year's Eve", type: 'international' },
};

// Treat 'regional' same as 'national' for dot colouring
type ExtendedHolidayType = HolidayType | 'regional';

export function getHoliday(month: number, day: number): Holiday | null {
  const key = `${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  return (HOLIDAYS as Record<string, Holiday>)[key] ?? null;
}
