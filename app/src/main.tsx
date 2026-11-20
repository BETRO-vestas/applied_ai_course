import { render } from 'preact';
import { useRoute } from './router';
import { useProgress } from './store';
import { Today, Path, ModuleView, LessonView, QuizView, LabView, MemoView, CardsView, PackView, SettingsView, NotFound } from './views';
import './styles.css';

function Screen({ r }: { r: string[] }) {
  const [a, b, c, d] = r;
  if (!a) return <Today />;
  if (a === 'path') return <Path />;
  if (a === 'cards') return <CardsView key={b ?? 'all'} id={b} />;
  if (a === 'pack') return <PackView slug={b} />;
  if (a === 'settings') return <SettingsView />;
  if (a === 'm' && b) {
    if (!c) return <ModuleView id={b} />;
    if (c === 'l' && d) return <LessonView key={d} id={b} slug={d} />;
    if (c === 'quiz') return <QuizView id={b} />;
    if (c === 'lab') return <LabView id={b} />;
    if (c === 'memo') return <MemoView id={b} />;
  }
  return <NotFound />;
}

const tabs = [
  { to: '', label: 'Today', icon: '☀️', match: (a?: string) => !a },
  { to: 'path', label: 'Path', icon: '🧭', match: (a?: string) => a === 'path' || a === 'm' },
  { to: 'cards', label: 'Cards', icon: '🗂️', match: (a?: string) => a === 'cards' },
  { to: 'pack', label: 'Project', icon: '🌬️', match: (a?: string) => a === 'pack' },
  { to: 'settings', label: 'Settings', icon: '⚙️', match: (a?: string) => a === 'settings' },
];

function App() {
  const r = useRoute();
  const [, loaded] = useProgress();
  return (
    <>
      <main>{loaded ? <Screen r={r} /> : null}</main>
      <nav class="tabs">
        {tabs.map((t) => (
          <a key={t.label} href={'#/' + t.to} class={t.match(r[0]) ? 'active' : ''}>
            <span aria-hidden="true">{t.icon}</span>{t.label}
          </a>
        ))}
      </nav>
    </>
  );
}

render(<App />, document.getElementById('app')!);
