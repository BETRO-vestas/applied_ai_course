import { useMemo, useState } from 'preact/hooks';
import { modules, getModule, projectPack, courseTitle, type Module, type Doc, type Card } from './content';
import { useProgress, update, exportJson, importJson, resetAll, logActivity, streak, type Progress } from './store';
import { schedule, preview, today, NEW_PER_DAY, type Grade } from './srs';
import { href } from './router';

/* ---------- helpers ---------- */

type Step = { kind: 'lesson' | 'quiz' | 'lab' | 'memo'; label: string; link: string; done: boolean; minutes?: number };

function stepsFor(m: Module, p: Progress): Step[] {
  const steps: Step[] = m.lessons.map((l, i) => ({
    kind: 'lesson', label: `Lesson ${i + 1}: ${l.title}`, link: href('m', m.id, 'l', l.slug),
    done: !!p.lessons[`${m.id}/${l.slug}`], minutes: l.minutes,
  }));
  if (m.quiz.length) steps.push({ kind: 'quiz', label: 'Scenario quiz', link: href('m', m.id, 'quiz'), done: !!p.quiz[m.id] });
  if (m.lab) steps.push({ kind: 'lab', label: m.lab.title, link: href('m', m.id, 'lab'), done: !!p.labs[m.id]?.done, minutes: m.lab.minutes });
  if (m.memo) steps.push({ kind: 'memo', label: m.memo.title, link: href('m', m.id, 'memo'), done: !!p.memos[m.id]?.trim() });
  return steps;
}

const kindIcon: Record<Step['kind'], string> = { lesson: '📖', quiz: '❓', lab: '💻', memo: '✍️' };

/** Cards unlock when the lesson they belong to is complete. */
function unlocked(c: Card, p: Progress) {
  const m = getModule(c.moduleId);
  const lesson = m?.lessons[c.after - 1];
  return !!lesson && !!p.lessons[`${c.moduleId}/${lesson.slug}`];
}

function deckStatus(p: Progress, moduleId?: string) {
  const t = today();
  const all = modules.filter((m) => m.status === 'available' && (!moduleId || m.id === moduleId)).flatMap((m) => m.cards);
  const open = all.filter((c) => unlocked(c, p));
  const due = open.filter((c) => p.cards[c.key] && p.cards[c.key].due <= t);
  const introducedToday = Object.values(p.cards).filter((s) => s.firstSeen === t).length;
  const fresh = open.filter((c) => !p.cards[c.key]).slice(0, Math.max(0, NEW_PER_DAY - introducedToday));
  const studied = open.filter((c) => p.cards[c.key]).length;
  const next = open.map((c) => p.cards[c.key]?.due).filter((d): d is string => !!d && d > t).sort()[0];
  return { all, open, due, fresh, studied, next, locked: all.length - open.length };
}

function shuffle<T>(a: T[]): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
  return r;
}

function niceDate(d: string) {
  const [y, m, day] = d.split('-').map(Number);
  return new Date(y, m - 1, day).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });
}

function Prose({ html }: { html: string }) {
  return <div class="prose" dangerouslySetInnerHTML={{ __html: html }} />;
}

function Back({ to, label }: { to: string; label: string }) {
  return <a class="back" href={to}>‹ {label}</a>;
}

/* ---------- Today ---------- */

export function Today() {
  const [p] = useProgress();
  const available = modules.filter((m) => m.status === 'available');
  let next: { m: Module; s: Step } | undefined;
  for (const m of available) {
    const s = stepsFor(m, p).find((x) => !x.done);
    if (s) { next = { m, s }; break; }
  }
  const deck = deckStatus(p);
  const toReview = deck.due.length + deck.fresh.length;
  const days = streak(p);

  return (
    <div>
      <p class="eyebrow">{courseTitle}</p>
      <h1>Today</h1>
      {days > 0 && <p class="streak">🔥 {days}-day streak{p.activity[today()] ? '' : ' (study today to keep it)'}</p>}
      {next ? (
        <a class="card hero" href={next.s.link}>
          <span class="tag">{next.m.title}</span>
          <span class="hero-title">{kindIcon[next.s.kind]} {next.s.label}</span>
          {next.s.minutes && <span class="muted">About {next.s.minutes} min</span>}
          <span class="cta">Start ›</span>
        </a>
      ) : (
        <div class="card"><strong>You're up to date.</strong><p class="muted">The next module is on its way. Review your cards meanwhile.</p></div>
      )}
      {deck.open.length > 0 && (
        <a class={`card row ${toReview ? 'due' : ''}`} href={href('cards')}>
          <span>🗂️ {toReview ? 'Review flashcards' : 'Flashcards: all caught up'}</span>
          <span class="muted">{toReview ? `${deck.due.length} due · ${deck.fresh.length} new ›` : deck.next ? `next ${niceDate(deck.next)} ›` : '›'}</span>
        </a>
      )}
      <a class="card row" href={href('pack')}>
        <span>🌬️ Larkspur Downs project pack</span><span class="muted">›</span>
      </a>
    </div>
  );
}

/* ---------- Path ---------- */

export function Path() {
  const [p] = useProgress();
  return (
    <div>
      <h1>Path</h1>
      <ol class="path">
        {modules.map((m, i) => {
          const steps = stepsFor(m, p);
          const done = steps.filter((s) => s.done).length;
          const avail = m.status === 'available';
          const inner = (
            <>
              <span class="num">{i + 1}</span>
              <span class="grow">
                <strong>{m.title}</strong>
                <span class="muted small">{m.summary}</span>
                {avail ? <Bar value={done} max={steps.length} /> : <span class="tag dim">Coming soon</span>}
              </span>
            </>
          );
          return <li key={m.id}>{avail ? <a class="card path-item" href={href('m', m.id)}>{inner}</a> : <div class="card path-item locked">{inner}</div>}</li>;
        })}
      </ol>
    </div>
  );
}

function Bar({ value, max }: { value: number; max: number }) {
  return (
    <span class="bar" role="progressbar" aria-valuenow={value} aria-valuemax={max}>
      <span style={{ width: `${max ? (100 * value) / max : 0}%` }} />
      <em>{value}/{max}</em>
    </span>
  );
}

/* ---------- Module overview ---------- */

export function ModuleView({ id }: { id: string }) {
  const [p] = useProgress();
  const m = getModule(id);
  if (!m) return <NotFound />;
  return (
    <div>
      <Back to={href('path')} label="Path" />
      <h1>{m.title}</h1>
      <p class="muted">{m.summary}</p>
      <ul class="steps">
        {stepsFor(m, p).map((s) => (
          <li key={s.link}>
            <a class={`card row ${s.done ? 'done' : ''}`} href={s.link}>
              <span>{s.done ? '✅' : kindIcon[s.kind]} {s.label}</span>
              <span class="muted">{s.minutes ? `${s.minutes}m ` : ''}›</span>
            </a>
          </li>
        ))}
      </ul>
      {m.cards.length > 0 && <a class="card row" href={href('cards', m.id)}><span>🗂️ Flashcards</span><span class="muted">{deckStatus(p, m.id).open.length}/{m.cards.length} unlocked ›</span></a>}
    </div>
  );
}

/* ---------- Lesson ---------- */

export function LessonView({ id, slug }: { id: string; slug: string }) {
  const [p] = useProgress();
  const m = getModule(id);
  const idx = m?.lessons.findIndex((l) => l.slug === slug) ?? -1;
  if (!m || idx < 0) return <NotFound />;
  const lesson = m.lessons[idx];
  const key = `${m.id}/${lesson.slug}`;
  const done = !!p.lessons[key];
  const nextLink = idx + 1 < m.lessons.length ? href('m', m.id, 'l', m.lessons[idx + 1].slug) : href('m', m.id, 'quiz');
  const nextLabel = idx + 1 < m.lessons.length ? 'Next lesson' : 'Take the quiz';
  const note = p.notes[key] ?? '';

  return (
    <article>
      <Back to={href('m', m.id)} label={m.title} />
      <p class="eyebrow">Lesson {idx + 1} of {m.lessons.length}{lesson.minutes ? ` · ${lesson.minutes} min` : ''}</p>
      <h1>{lesson.title}</h1>
      <Prose html={lesson.html} />
      <label class="field answer">Your answer
        <textarea rows={4} value={note} placeholder="A few lines is enough. Saved only on this phone."
          onInput={(e) => update((s) => { s.notes[key] = (e.target as HTMLTextAreaElement).value; })} />
      </label>
      <div class="actions">
        {done ? (
          <a class="btn" href={nextLink}>{nextLabel} ›</a>
        ) : (
          <button class="btn" onClick={() => { update((s) => { s.lessons[key] = new Date().toISOString(); logActivity(s); }); location.hash = nextLink; }}>
            Mark complete · {nextLabel} ›
          </button>
        )}
      </div>
    </article>
  );
}

/* ---------- Quiz ---------- */

export function QuizView({ id }: { id: string }) {
  const [p] = useProgress();
  const m = getModule(id);
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [retake, setRetake] = useState(false);
  if (!m || !m.quiz.length) return <NotFound />;
  const saved = p.quiz[m.id];

  if (saved && !retake) {
    return (
      <div>
        <Back to={href('m', m.id)} label={m.title} />
        <h1>Scenario quiz</h1>
        <div class="card"><strong>Score: {saved.score}/{saved.total}</strong><p class="muted">Completed {new Date(saved.at).toLocaleDateString()}</p></div>
        <div class="actions">
          <button class="btn secondary" onClick={() => { setRetake(true); setI(0); setAnswers([]); }}>Retake</button>
          {m.lab && <a class="btn" href={href('m', m.id, 'lab')}>Go to the lab ›</a>}
        </div>
      </div>
    );
  }

  const q = m.quiz[i];
  const chosen = answers[i];
  const answered = chosen !== undefined;
  const last = i === m.quiz.length - 1;

  const finish = () => {
    const score = answers.filter((a, k) => a === m.quiz[k].answer).length;
    update((s) => { s.quiz[m.id] = { answers, score, total: m.quiz.length, at: new Date().toISOString() }; logActivity(s); });
    setRetake(false);
  };

  return (
    <div>
      <Back to={href('m', m.id)} label={m.title} />
      <p class="eyebrow">Question {i + 1} of {m.quiz.length}</p>
      <div class="scenario">{q.scenario}</div>
      <h2>{q.question}</h2>
      <div class="options">
        {q.options.map((o, k) => {
          const cls = !answered ? '' : k === q.answer ? 'correct' : k === chosen ? 'wrong' : 'faded';
          return (
            <button key={k} class={`option ${cls}`} disabled={answered}
              onClick={() => setAnswers((a) => { const n = [...a]; n[i] = k; return n; })}>{o}</button>
          );
        })}
      </div>
      {answered && (
        <div class={`feedback ${chosen === q.answer ? 'good' : 'bad'}`}>
          <strong>{chosen === q.answer ? 'Correct.' : 'Not quite.'}</strong> {q.explanation}
        </div>
      )}
      {answered && (
        <div class="actions">
          {last ? <button class="btn" onClick={finish}>See score</button> : <button class="btn" onClick={() => setI(i + 1)}>Next ›</button>}
        </div>
      )}
    </div>
  );
}

/* ---------- Lab ---------- */

export function LabView({ id }: { id: string }) {
  const [p] = useProgress();
  const m = getModule(id);
  if (!m?.lab) return <NotFound />;
  const lab = p.labs[m.id] ?? { done: false, notes: '' };
  return (
    <article>
      <Back to={href('m', m.id)} label={m.title} />
      <p class="eyebrow">Laptop lab{m.lab.minutes ? ` · about ${m.lab.minutes} min` : ''}</p>
      <h1>{m.lab.title}</h1>
      <Prose html={m.lab.html} />
      <div class="card">
        <label class="check">
          <input type="checkbox" checked={lab.done}
            onChange={(e) => update((s) => { const done = (e.target as HTMLInputElement).checked; s.labs[m.id] = { ...lab, done }; if (done) logActivity(s); })} />
          Lab done
        </label>
        <label class="field">Notes and takeaway
          <textarea rows={4} value={lab.notes} placeholder="What surprised you?"
            onInput={(e) => update((s) => { s.labs[m.id] = { ...lab, notes: (e.target as HTMLTextAreaElement).value }; })} />
        </label>
      </div>
      {lab.done && m.memo && <div class="actions"><a class="btn" href={href('m', m.id, 'memo')}>Write the memo ›</a></div>}
    </article>
  );
}

/* ---------- Memo ---------- */

export function MemoView({ id }: { id: string }) {
  const [p] = useProgress();
  const m = getModule(id);
  if (!m?.memo) return <NotFound />;
  const text = p.memos[m.id] ?? '';
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  return (
    <article>
      <Back to={href('m', m.id)} label={m.title} />
      <p class="eyebrow">Decision memo</p>
      <h1>{m.memo.title}</h1>
      <Prose html={m.memo.html} />
      <div class="note">🔒 Saved only on this phone. Keep it fictional or generic.</div>
      <textarea class="memo" rows={14} value={text} placeholder="Start writing…"
        onInput={(e) => update((s) => { s.memos[m.id] = (e.target as HTMLTextAreaElement).value; })} />
      <p class="muted small">{words} words</p>
    </article>
  );
}

/* ---------- Flashcards (spaced repetition) ---------- */

export function CardsView({ id }: { id?: string }) {
  const [p] = useProgress();
  const [session, setSession] = useState<{ queue: Card[]; cram: boolean } | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  const deck = deckStatus(p, id);
  const back = id ? href('m', id) : href();
  const title = id ? `${getModule(id)?.title ?? ''}: flashcards` : 'Flashcards';

  const start = (cram: boolean) => {
    const queue = cram ? shuffle(deck.open) : [...shuffle(deck.due), ...deck.fresh];
    setSession({ queue, cram }); setFlipped(false); setReviewed(0);
  };

  // Overview
  if (!session) {
    const toReview = deck.due.length + deck.fresh.length;
    return (
      <div>
        {id && <Back to={back} label="Back" />}
        <h1>{title}</h1>
        <div class="stats">
          <div><strong>{deck.due.length}</strong><span>due</span></div>
          <div><strong>{deck.fresh.length}</strong><span>new today</span></div>
          <div><strong>{deck.studied}</strong><span>studied</span></div>
          <div><strong>{deck.locked}</strong><span>locked</span></div>
        </div>
        {toReview > 0 ? (
          <div class="actions"><button class="btn" onClick={() => start(false)}>Start review ({toReview})</button></div>
        ) : (
          <div class="card">
            <strong>{deck.open.length ? 'All caught up.' : 'No cards yet.'}</strong>
            <p class="muted">
              {deck.open.length
                ? deck.next ? `Next cards are due ${niceDate(deck.next)}.` : 'Come back tomorrow.'
                : 'Cards unlock as you complete lessons.'}
            </p>
          </div>
        )}
        {deck.open.length > 0 && (
          <div class="actions"><button class="btn secondary" onClick={() => start(true)}>Practise all unlocked cards (doesn't change schedule)</button></div>
        )}
        <p class="muted small">Cards come back just before you're likely to forget them. Up to {NEW_PER_DAY} new cards a day; locked cards open as you finish lessons.</p>
      </div>
    );
  }

  // Session finished
  if (!session.queue.length) {
    return (
      <div>
        <h1>Session done</h1>
        <div class="card"><strong>{reviewed} cards reviewed.</strong><p class="muted">Short, regular review beats one long cram.</p></div>
        <div class="actions"><button class="btn" onClick={() => setSession(null)}>Done</button></div>
      </div>
    );
  }

  const c = session.queue[0];
  const state = p.cards[c.key];
  const grade = (g: Grade) => {
    if (!session.cram) update((s) => { s.cards[c.key] = schedule(s.cards[c.key], g); logActivity(s); });
    const rest = session.queue.slice(1);
    setSession({ ...session, queue: g === 'again' ? [...rest, c] : rest });
    if (g !== 'again') setReviewed(reviewed + 1);
    setFlipped(false);
  };
  const grades: { g: Grade; label: string }[] = [
    { g: 'again', label: 'Again' }, { g: 'hard', label: 'Hard' }, { g: 'good', label: 'Good' }, { g: 'easy', label: 'Easy' },
  ];
  return (
    <div>
      <button class="back link" onClick={() => setSession(null)}>‹ End session</button>
      <p class="eyebrow">{session.queue.length} left{session.cram ? ' · practice' : !state ? ' · new card' : ''}</p>
      <button class={`flash ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
        <span class="small muted">{flipped ? 'Answer' : 'Tap to reveal'}</span>
        <span class="flash-text">{flipped ? c.back : c.front}</span>
      </button>
      {flipped && (
        session.cram ? (
          <div class="actions two">
            <button class="btn secondary" onClick={() => grade('again')}>Again</button>
            <button class="btn" onClick={() => grade('good')}>Got it</button>
          </div>
        ) : (
          <div class="grades">
            {grades.map(({ g, label }) => (
              <button key={g} class={`grade ${g}`} onClick={() => grade(g)}>
                {label}<span>{preview(state, g)}</span>
              </button>
            ))}
          </div>
        )
      )}
    </div>
  );
}

/* ---------- Project pack ---------- */

export function PackView({ slug }: { slug?: string }) {
  const doc: Doc | undefined = slug ? projectPack.find((d) => d.slug === slug) : undefined;
  if (slug && doc) {
    return <article><Back to={href('pack')} label="Project pack" /><h1>{doc.title}</h1><Prose html={doc.html} /></article>;
  }
  return (
    <div>
      <h1>Project pack</h1>
      <p class="muted">The fictional project every lesson and lab uses.</p>
      {projectPack.map((d) => <a key={d.slug} class="card row" href={href('pack', d.slug)}><span>{d.title}</span><span class="muted">›</span></a>)}
    </div>
  );
}

/* ---------- Settings ---------- */

export function SettingsView() {
  const [p] = useProgress();
  const [msg, setMsg] = useState('');
  const doExport = async () => {
    const name = `grid-ai-progress-${new Date().toISOString().slice(0, 10)}.json`;
    const file = new File([exportJson()], name, { type: 'application/json' });
    try {
      if (navigator.canShare?.({ files: [file] })) { await navigator.share({ files: [file], title: name }); setMsg('Shared.'); return; }
    } catch { /* fall through to download */ }
    const a = document.createElement('a');
    a.href = URL.createObjectURL(file); a.download = name; a.click();
    setMsg('Downloaded.');
  };
  const doImport = async (e: Event) => {
    const f = (e.target as HTMLInputElement).files?.[0];
    if (!f) return;
    try { importJson(await f.text()); setMsg('Progress restored.'); } catch (err) { setMsg((err as Error).message); }
  };
  const lessonsDone = Object.keys(p.lessons).length;
  return (
    <div>
      <h1>Settings</h1>
      <div class="card">
        <strong>Your progress</strong>
        <p class="muted">{lessonsDone} lessons done. Stored only on this device. Clearing Safari's website data deletes it, so export a backup now and then.</p>
        <div class="actions two">
          <button class="btn secondary" onClick={doExport}>Export backup</button>
          <label class="btn secondary">Import backup<input type="file" accept="application/json,.json" hidden onChange={doImport} /></label>
        </div>
        {msg && <p class="small">{msg}</p>}
      </div>
      <div class="card">
        <strong>Install on iPhone</strong>
        <p class="muted">In Safari, tap Share, then <em>Add to Home Screen</em>. The app then works offline.</p>
      </div>
      <div class="card">
        <strong>Start over</strong>
        <p class="muted">Deletes all progress, notes and memos on this device.</p>
        <button class="btn danger" onClick={() => { if (confirm('Delete all progress on this device?')) { resetAll(); setMsg('Reset.'); } }}>Reset progress</button>
      </div>
      <p class="muted small">All scenarios, people and data in this course are fictional.</p>
    </div>
  );
}

export function NotFound() {
  return <div><h1>Not found</h1><a href={href()}>Go to Today</a></div>;
}
