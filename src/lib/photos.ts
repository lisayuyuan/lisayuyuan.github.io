import type { ImageMetadata } from 'astro';

// Every photo lives in src/assets/photos/ (uploaded there by Pages CMS).
// Content files refer to them as "/photos/<file>.jpg"; this module turns that
// text into a real image that Astro can resize and optimise at build time.
const modules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/photos/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true },
);

const ROOT = '/src/assets/photos/';
const byPath = new Map<string, ImageMetadata>();
for (const [path, mod] of Object.entries(modules)) {
  byPath.set(path.slice(ROOT.length).toLowerCase(), mod.default);
}

function normalise(ref: string): string {
  let p = ref.trim().split(/[?#]/)[0];
  try {
    p = decodeURIComponent(p);
  } catch {
    /* keep as is */
  }
  p = p.replace(/^\.?\/+/, '');
  p = p.replace(/^(?:src\/assets\/photos|assets\/photos|photos)\//, '');
  return p.toLowerCase();
}

export function resolvePhoto(ref: string, where = ''): ImageMetadata {
  const image = byPath.get(normalise(ref));
  if (!image) {
    throw new Error(
      `Photo "${ref}"${where ? ` (used in ${where})` : ''} was not found in src/assets/photos/. ` +
        'Check that the file was uploaded and the name is spelled the same way.',
    );
  }
  return image;
}
