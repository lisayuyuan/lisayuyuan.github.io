import raw from '../data/settings.json';
import { resolvePhoto } from './photos';

const clean = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim() : undefined);

export const settings = {
  name: clean(raw.name) ?? 'Yuyuan Lisa',
  tagline: clean(raw.tagline),
  description: clean(raw.description) ?? 'Photographs by Yuyuan Lisa.',
  hero: {
    image: resolvePhoto(raw.heroImage, 'Site settings → Home photo'),
    alt: clean(raw.heroAlt) ?? '',
  },
  about: (clean(raw.about) ?? '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean),
  email: clean(raw.email),
  instagram: clean(raw.instagram)?.replace(/^@/, ''),
  yearNotes: new Map<number, string>(
    (raw.yearNotes ?? [])
      .filter((y: { year?: unknown; note?: unknown }) => y && y.year && clean(y.note))
      .map((y: { year: number | string; note: string }) => [Number(y.year), y.note.trim()]),
  ),
};

/** Prefix an internal path with the site's base path. */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}
