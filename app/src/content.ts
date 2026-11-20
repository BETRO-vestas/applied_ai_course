import { marked } from 'marked';
import { parse as parseYaml } from 'yaml';

// All course content is bundled at build time from /content.
const mdFiles = import.meta.glob('../../content/**/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const yamlFiles = import.meta.glob('../../content/**/*.yaml', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

export interface Doc { slug: string; title: string; minutes?: number; html: string }
export interface QuizQuestion { scenario: string; question: string; options: string[]; answer: number; explanation: string }
export interface Card { front: string; back: string }
export interface Module {
  id: string; dir?: string; title: string; summary: string; status: 'available' | 'coming';
  lessons: Doc[]; quiz: QuizQuestion[]; cards: Card[]; lab?: Doc; memo?: Doc;
}

function rel(path: string) { return path.replace(/^.*\/content\//, ''); }

function parseDoc(path: string, raw: string): Doc {
  let meta: Record<string, unknown> = {};
  let body = raw;
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (m) { meta = parseYaml(m[1]) ?? {}; body = raw.slice(m[0].length); }
  const slug = rel(path).split('/').pop()!.replace(/\.md$/, '');
  const html = marked.parse(body, { async: false }) as string;
  return {
    slug,
    title: String(meta.title ?? slug),
    minutes: typeof meta.minutes === 'number' ? meta.minutes : undefined,
    // Wrap tables so they scroll sideways on narrow screens instead of the page.
    html: html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>'),
  };
}

function file<T>(relPath: string): T | undefined {
  const key = Object.keys(yamlFiles).find((k) => rel(k) === relPath);
  return key ? (parseYaml(yamlFiles[key]) as T) : undefined;
}

function docsIn(dirPrefix: string): Doc[] {
  return Object.keys(mdFiles)
    .filter((k) => rel(k).startsWith(dirPrefix))
    .sort()
    .map((k) => parseDoc(k, mdFiles[k]));
}

function docAt(relPath: string): Doc | undefined {
  const key = Object.keys(mdFiles).find((k) => rel(k) === relPath);
  return key ? parseDoc(key, mdFiles[key]) : undefined;
}

const syllabus = file<{ title: string; modules: Omit<Module, 'lessons' | 'quiz' | 'cards'>[] }>('syllabus.yaml')!;

export const courseTitle = syllabus.title;

export const modules: Module[] = syllabus.modules.map((m) => {
  if (!m.dir) return { ...m, lessons: [], quiz: [], cards: [] };
  return {
    ...m,
    lessons: docsIn(`${m.dir}/lessons/`),
    quiz: file<{ questions: QuizQuestion[] }>(`${m.dir}/quiz.yaml`)?.questions ?? [],
    cards: file<{ cards: Card[] }>(`${m.dir}/flashcards.yaml`)?.cards ?? [],
    lab: docAt(`${m.dir}/lab.md`),
    memo: docAt(`${m.dir}/memo.md`),
  };
});

export const projectPack: Doc[] = docsIn('project-pack/');

export function getModule(id: string) { return modules.find((m) => m.id === id); }
