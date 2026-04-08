export type HolidayType = 'national' | 'religious' | 'international' | 'regional';

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

  // ── JANUARY ──────────────────────────────────────────────────────────────────
  '01-01': { name: "New Year's Day",                          type: 'national'       },
  '01-06': { name: 'Guru Gobind Singh Jayanti (2026)',        type: 'religious'      },
  '01-12': { name: 'Swami Vivekananda Jayanti / Youth Day',  type: 'national'       },
  '01-13': { name: 'Lohri',                                  type: 'regional'       },
  '01-14': { name: 'Makar Sankranti / Pongal / Uttarayan',   type: 'religious'      },
  '01-15': { name: 'Army Day / Mattu Pongal',                type: 'national'       },
  '01-23': { name: 'Netaji Subhas Chandra Bose Jayanti',     type: 'national'       },
  '01-26': { name: 'Republic Day',                           type: 'national'       },
  '01-30': { name: "Martyrs' Day (Gandhi Smriti)",           type: 'national'       },

  // ── FEBRUARY ─────────────────────────────────────────────────────────────────
  '02-04': { name: 'Vasant Panchami / Saraswati Puja (2026)',type: 'religious'      },
  '02-14': { name: "Valentine's Day",                        type: 'international'  },
  '02-19': { name: 'Chhatrapati Shivaji Maharaj Jayanti',    type: 'national'       },
  '02-20': { name: 'Mizoram Statehood Day',                  type: 'regional'       },
  '02-28': { name: 'National Science Day',                   type: 'national'       },

  // ── MARCH ────────────────────────────────────────────────────────────────────
  '03-03': { name: 'Maha Shivratri (2026)',                  type: 'religious'      },
  '03-08': { name: "International Women's Day",              type: 'international'  },
  '03-19': { name: 'Eid ul-Fitr / Meethi Eid (2026)',        type: 'religious'      },
  '03-20': { name: 'Eid Holiday / Ugadi / Gudi Padwa (2026)',type: 'religious'      },
  '03-22': { name: 'World Water Day / Bihar Diwas',          type: 'national'       },
  '03-24': { name: 'Holika Dahan (2026)',                    type: 'religious'      },
  '03-25': { name: 'Holi (2026)',                            type: 'religious'      },
  '03-26': { name: 'Dhuleti / Rang Panchami (2026)',         type: 'religious'      },
  '03-30': { name: 'Ram Navami (2026)',                      type: 'religious'      },

  // ── APRIL ────────────────────────────────────────────────────────────────────
  '04-02': { name: 'Good Friday (2026)',                     type: 'religious'      },
  '04-04': { name: 'Holy Saturday (2026)',                   type: 'religious'      },
  '04-05': { name: 'Easter Sunday (2026)',                   type: 'religious'      },
  '04-07': { name: 'World Health Day',                       type: 'international'  },
  '04-13': { name: 'Baisakhi / Vaisakhi',                   type: 'regional'       },
  '04-14': { name: 'Ambedkar Jayanti / Tamil New Year / Vishu', type: 'national'   },
  '04-15': { name: 'Bengali New Year (Naba Barsha)',         type: 'regional'       },
  '04-21': { name: 'Mahavir Jayanti (2026)',                 type: 'religious'      },
  '04-22': { name: 'Earth Day / Hanuman Jayanti (2026)',     type: 'international'  },

  // ── MAY ──────────────────────────────────────────────────────────────────────
  '05-01': { name: 'Maharashtra Day / International Labour Day', type: 'national'  },
  '05-10': { name: "Mother's Day (2026)",                    type: 'international'  },
  '05-11': { name: 'National Technology Day',                type: 'national'       },
  '05-12': { name: 'Buddha Purnima / Vesak (2026)',          type: 'religious'      },
  '05-27': { name: 'Eid ul-Adha / Bakrid (2026)',            type: 'religious'      },

  // ── JUNE ─────────────────────────────────────────────────────────────────────
  '06-05': { name: 'World Environment Day',                  type: 'international'  },
  '06-14': { name: 'World Blood Donor Day',                  type: 'international'  },
  '06-16': { name: 'Muharram / Islamic New Year (2026)',     type: 'religious'      },
  '06-21': { name: "Father's Day / International Yoga Day",  type: 'international'  },

  // ── JULY ─────────────────────────────────────────────────────────────────────
  '07-11': { name: 'World Population Day',                   type: 'international'  },

  // ── AUGUST ───────────────────────────────────────────────────────────────────
  '08-09': { name: 'Rakshabandhan (2026)',                   type: 'religious'      },
  '08-15': { name: 'Independence Day',                       type: 'national'       },
  '08-22': { name: 'Ganesh Chaturthi (2026)',                type: 'religious'      },
  '08-25': { name: 'Janmashtami (2026)',                     type: 'religious'      },
  '08-26': { name: 'Teej (2026)',                            type: 'regional'       },
  '08-31': { name: 'Ganesh Visarjan (2026)',                 type: 'religious'      },

  // ── SEPTEMBER ────────────────────────────────────────────────────────────────
  '09-05': { name: "Teacher's Day (Radhakrishnan Jayanti)", type: 'national'        },
  '09-07': { name: 'Onam Thiruvonam (2026)',                 type: 'regional'       },
  '09-14': { name: 'Hindi Diwas',                           type: 'national'        },
  '09-25': { name: 'Milad-un-Nabi (2026)',                  type: 'religious'       },

  // ── OCTOBER ──────────────────────────────────────────────────────────────────
  '10-02': { name: 'Gandhi Jayanti',                         type: 'national'       },
  '10-12': { name: 'Navratri Begins (2026)',                 type: 'religious'      },
  '10-16': { name: 'World Food Day',                         type: 'international'  },
  '10-17': { name: 'Durga Ashtami / Maha Ashtami (2026)',   type: 'religious'       },
  '10-18': { name: 'Maha Navami (2026)',                    type: 'religious'        },
  '10-19': { name: 'Dussehra / Vijaya Dashami (2026)',      type: 'religious'        },
  '10-20': { name: 'Karva Chauth (2026)',                   type: 'regional'         },
  '10-24': { name: 'United Nations Day',                    type: 'international'    },
  '10-31': { name: 'National Unity Day (Sardar Patel Jayanti)', type: 'national'    },

  // ── NOVEMBER ─────────────────────────────────────────────────────────────────
  '11-01': { name: 'Dhanteras (2026)',                       type: 'religious'      },
  '11-02': { name: 'Naraka Chaturdashi / Chhoti Diwali (2026)', type: 'religious'  },
  '11-03': { name: 'Diwali / Lakshmi Puja (2026)',          type: 'religious'       },
  '11-04': { name: 'Govardhan Puja / Annakut (2026)',       type: 'religious'       },
  '11-05': { name: 'Bhai Dooj (2026)',                      type: 'religious'       },
  '11-08': { name: 'Chhath Puja (2026)',                    type: 'regional'        },
  '11-14': { name: "Children's Day (Nehru Jayanti)",        type: 'national'        },
  '11-15': { name: 'Guru Nanak Jayanti / Jharkhand Day (2026)', type: 'religious'  },
  '11-19': { name: 'World Toilet Day / Indira Gandhi Death Anniversary', type: 'national' },

  // ── DECEMBER ─────────────────────────────────────────────────────────────────
  '12-01': { name: 'World AIDS Day',                        type: 'international'   },
  '12-10': { name: 'Human Rights Day',                     type: 'international'    },
  '12-24': { name: 'Christmas Eve',                        type: 'religious'         },
  '12-25': { name: 'Christmas Day',                        type: 'religious'         },
  '12-31': { name: "New Year's Eve",                       type: 'international'     },
};

/** Dot color per holiday type */
export const HOLIDAY_COLOR: Record<HolidayType, string> = {
  national:      '#e53935', // red
  religious:     '#f59e0b', // amber/saffron
  international: '#3b82f6', // blue
  regional:      '#8b5cf6', // purple
};

export function getHoliday(month: number, day: number): Holiday | null {
  const key = `${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  return HOLIDAYS[key] ?? null;
}
