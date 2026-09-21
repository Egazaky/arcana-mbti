const paths: Record<string, string> = {
  cards: 'm8 4 12 2-2 16-12-2z M4 7 1 9l4 13 6-2 M11 10l4-1 1 4-4 1z',
  arrow: 'M5 12h14m-6-6 6 6-6 6', back: 'M19 12H5m6-6-6 6 6 6',
  check: 'm5 12 4 4L19 6', lock: 'M7 10V7a5 5 0 0 1 10 0v3 M5 10h14v11H5z M12 14v3',
  sparkles: 'm12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z M20 2v4m-2-2h4',
  door: 'M3 21h18 M6 21V4l10-2v19 M16 5h3v16 M12 11v2',
  shield: 'm12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6z M12 6v11',
  crown: 'm3 6 5 5 4-8 4 8 5-5-2 13H5z M7 22h10',
  book: 'M12 5v16 M12 5C8 2 3 3 2 4v15c4-2 7-1 10 2 3-3 6-4 10-2V4c-4-2-7-1-10 1',
  search: 'M21 21l-6-6 M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0',
  close: 'm6 6 12 12 M6 18 18 6', refresh: 'M20 7A9 9 0 1 0 21 15 M20 2v6h-6',
  download: 'M12 3v12m-5-5 5 5 5-5 M4 16v5h16v-5',
  sun: 'M12 2v2m0 16v2M2 12h2m16 0h2M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2 M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0',
  eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12 M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
  compass: 'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0 M16 8l-3 5-5 3 3-5z',
};
export function Icon({ name, className = '' }: { name: string; className?: string }) {
  return <svg className={`icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] ?? paths.sparkles} /></svg>;
}
