import { getCollection } from 'astro:content';
import type { ImageMetadata } from 'astro';
import { resolvePhoto } from './photos';

export interface Photo {
  image: ImageMetadata;
  alt: string;
  caption?: string;
}

export interface PhotoSet {
  id: string;
  date: Date;
  year: number;
  title?: string;
  location?: string;
  note?: string;
  photos: Photo[];
}

export interface YearSummary {
  year: number;
  sets: PhotoSet[];
  photoCount: number;
  cover: Photo;
}

let cache: PhotoSet[] | undefined;

/** All published sets, newest first. */
export async function getSets(): Promise<PhotoSet[]> {
  if (cache) return cache;
  const entries = await getCollection('sets', ({ data }) => !data.draft);
  cache = entries
    .map(({ id, data }) => ({
      id,
      date: data.date,
      year: data.date.getUTCFullYear(),
      title: data.title,
      location: data.location,
      note: data.note,
      photos: data.photos.map((p) => ({
        image: resolvePhoto(p.image, `set "${id}"`),
        alt: p.alt,
        caption: p.caption,
      })),
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime() || a.id.localeCompare(b.id));
  return cache;
}

/** Sets grouped by year, newest year first. */
export async function getYears(): Promise<YearSummary[]> {
  const sets = await getSets();
  const map = new Map<number, PhotoSet[]>();
  for (const s of sets) {
    if (!map.has(s.year)) map.set(s.year, []);
    map.get(s.year)!.push(s);
  }
  return [...map.entries()]
    .sort(([a], [b]) => b - a)
    .map(([year, yearSets]) => ({
      year,
      sets: yearSets,
      photoCount: yearSets.reduce((n, s) => n + s.photos.length, 0),
      cover: yearSets[0].photos[0],
    }));
}

const dayFormat = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
const fullFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

export const formatDay = (d: Date) => dayFormat.format(d);
export const formatFullDate = (d: Date) => fullFormat.format(d);
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);
