// Spaced repetition: a simplified SM-2 scheduler.
// Each card has an ease factor; good answers grow the interval, misses reset it.

export interface CardState {
  reps: number;      // successful reviews in a row
  interval: number;  // days until next review
  ease: number;      // growth factor, min 1.3
  due: string;       // local date YYYY-MM-DD
  lapses: number;    // times forgotten
  firstSeen: string; // local date the card was first studied
}

export type Grade = 'again' | 'hard' | 'good' | 'easy';

const MAX_INTERVAL = 180;
export const NEW_PER_DAY = 10;

export function today(d = new Date()): string {
  const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, '0'), day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function addDays(date: string, n: number): string {
  const [y, m, d] = date.split('-').map(Number);
  return today(new Date(y, m - 1, d + n));
}

export function isValidState(s: unknown): s is CardState {
  return !!s && typeof (s as CardState).due === 'string' && typeof (s as CardState).ease === 'number';
}

export function schedule(prev: CardState | undefined, grade: Grade, now: string = today()): CardState {
  const s: CardState = prev ? { ...prev } : { reps: 0, interval: 0, ease: 2.5, due: now, lapses: 0, firstSeen: now };
  if (grade === 'again') {
    s.reps = 0;
    s.interval = 0;
    s.lapses += 1;
    s.ease = Math.max(1.3, s.ease - 0.2);
  } else {
    s.reps += 1;
    if (grade === 'hard') {
      s.interval = s.reps === 1 ? 1 : Math.max(s.interval + 1, Math.round(s.interval * 1.2));
      s.ease = Math.max(1.3, s.ease - 0.15);
    } else if (grade === 'good') {
      s.interval = s.reps === 1 ? 1 : s.reps === 2 ? 3 : Math.round(s.interval * s.ease);
    } else {
      s.interval = s.reps === 1 ? 3 : s.reps === 2 ? 6 : Math.round(s.interval * s.ease * 1.3);
      s.ease += 0.15;
    }
    s.interval = Math.min(MAX_INTERVAL, Math.max(1, s.interval));
  }
  s.due = addDays(now, s.interval);
  return s;
}

/** Human label for the gap a grade would produce, e.g. "now", "1d", "3w". */
export function preview(prev: CardState | undefined, grade: Grade): string {
  const n = schedule(prev, grade).interval;
  if (n === 0) return 'now';
  if (n < 14) return `${n}d`;
  if (n < 60) return `${Math.round(n / 7)}w`;
  return `${Math.round(n / 30)}mo`;
}
