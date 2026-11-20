import { useEffect, useState } from 'preact/hooks';

// Hash routing works on GitHub Pages without server rewrites.
export function useRoute(): string[] {
  const read = () => location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  const [parts, setParts] = useState(read);
  useEffect(() => {
    const onChange = () => { setParts(read()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return parts;
}

export const href = (...parts: string[]) => '#/' + parts.join('/');
