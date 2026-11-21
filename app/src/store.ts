import { get, set } from 'idb-keyval';
import { useEffect, useState } from 'preact/hooks';
import { isValidState, today, type CardState } from './srs';

// Progress lives only on this device (IndexedDB). Export/import is the backup.
export interface Progress {
  version: 1;
  lessons: Record<string, string>;                       // "m01/01-slug" -> ISO date completed
  quiz: Record<string, { answers: number[]; score: number; total: number; at: string }>;
  labs: Record<string, { done: boolean; notes: string }>;
  memos: Record<string, string>;
  cards: Record<string, CardState>;                     // card key -> schedule
  notes: Record<string, string>;                        // lesson key -> answer to "What would you do?"
  activity: Record<string, number>;                     // local date -> actions that day
}

const KEY = 'progress-v1';
const empty = (): Progress => ({ version: 1, lessons: {}, quiz: {}, labs: {}, memos: {}, cards: {}, notes: {}, activity: {} });

// Keep only well-formed card schedules (earlier versions stored a different shape).
function clean(p: Progress): Progress {
  p.cards = Object.fromEntries(Object.entries(p.cards ?? {}).filter(([, v]) => isValidState(v)));
  return p;
}

let state: Progress = empty();
let loaded = false;
const listeners = new Set<() => void>();

const ready = (async () => {
  try {
    const saved = await get<Progress>(KEY);
    if (saved?.version === 1) state = clean({ ...empty(), ...saved });
  } catch { /* storage unavailable: run in memory */ }
  loaded = true;
  listeners.forEach((l) => l());
})();

export function update(fn: (p: Progress) => void) {
  const next = structuredClone(state);
  fn(next);
  state = next;
  listeners.forEach((l) => l());
  set(KEY, state).catch(() => { /* keep going in memory */ });
}

export function useProgress(): [Progress, boolean] {
  const [, tick] = useState(0);
  useEffect(() => {
    const l = () => tick((n) => n + 1);
    listeners.add(l);
    return () => { listeners.delete(l); };
  }, []);
  return [state, loaded];
}

/** Record that the learner did something today (drives the streak). */
export function logActivity(p: Progress) {
  const d = today();
  p.activity[d] = (p.activity[d] ?? 0) + 1;
}

/** Consecutive days with activity, ending today (or yesterday, so the streak survives until you study). */
export function streak(p: Progress): number {
  const d = new Date();
  if (!p.activity[today(d)]) d.setDate(d.getDate() - 1);
  let n = 0;
  while (p.activity[today(d)]) { n++; d.setDate(d.getDate() - 1); }
  return n;
}

export function exportJson(): string { return JSON.stringify(state, null, 2); }

export function importJson(text: string) {
  const parsed = JSON.parse(text) as Progress;
  if (parsed?.version !== 1) throw new Error('Not a progress file from this app.');
  update((p) => Object.assign(p, clean({ ...empty(), ...parsed })));
}

export function resetAll() { update((p) => Object.assign(p, empty())); }

export { ready };
