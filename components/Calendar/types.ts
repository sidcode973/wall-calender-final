import { Holiday } from '@/lib/holidays';

/** Data shape for a single calendar grid cell. */
export interface CellData {
  day: number;
  month: number;
  year: number;
  date: Date;
  /** Belongs to the previous or next month (filler cells). */
  isOther: boolean;
  isSat: boolean;
  isSun: boolean;
  isStart: boolean;
  isEnd: boolean;
  isInRange: boolean;
  isToday: boolean;
  /** Indian holiday on this date (null if none or isOther). */
  holiday: Holiday | null;
  /** True when localStorage contains a note covering this date. */
  noteOnDate: boolean;
}
