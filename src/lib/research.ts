import raw from '../data/research.json';

const clean = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim() : undefined);

export interface ResearchItem {
  title: string;
  year?: string;
  details?: string;
  link?: string;
}

type RawItem = { title?: unknown; year?: unknown; details?: unknown; link?: unknown };

/** Research page content, edited in Pages CMS → Research. */
export const research = {
  intro: (clean(raw.intro) ?? '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean),
  items: ((raw.items ?? []) as RawItem[])
    .filter((i) => i && clean(i.title))
    .map(
      (i): ResearchItem => ({
        title: clean(i.title)!,
        year: clean(typeof i.year === 'number' ? String(i.year) : i.year),
        details: clean(i.details),
        link: clean(i.link),
      }),
    ),
};
