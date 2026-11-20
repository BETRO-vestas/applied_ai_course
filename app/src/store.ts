import { get, set } from 'idb-keyval';
import { useEffect, useState } from 'preact/hooks';

// Progress lives only on this device (IndexedDB). Export/import is the backup.
export interface Progress {
  version: 1;
  lessons: Record<string, string>;                       // "m01/01-slug" -> ISO date completed
  quiz: Record<string, { answers: number[]; score: number; total: number; at: string }>;
  labs: Record<string, { done: boolean; notes: string }>;
  memos: Record<string, string>;
  cards: Record<string, { reviews: number; lastGood?: string }>;
}

const KEY = 'progress-v1';
const empty = (): Progress => ({ version: 1, lessons: {}, quiz: {}, labs: {}, memos: {}, cards: {} });

let state: Progress = empty();
let loaded = false;
const listeners = new Set<() => void>();

const ready = (async () => {
  try {
    const saved = await get<Progress>(KEY);
    if (saved?.version === 1) state = { ...empty(), ...saved };
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

export function exportJson(): string { return JSON.stringify(state, null, 2); }

export function importJson(text: string) {
  const parsed = JSON.parse(text) as Progress;
  if (parsed?.version !== 1) throw new Error('Not a progress file from this app.');
  update((p) => Object.assign(p, empty(), parsed));
}

export function resetAll() { update((p) => Object.assign(p, empty())); }

export { ready };
