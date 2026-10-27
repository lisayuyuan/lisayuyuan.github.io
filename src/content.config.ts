import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Empty optional fields from the CMS may arrive as "" or null; treat both as "not set".
const optionalText = z
  .string()
  .nullish()
  .transform((v) => (v && v.trim() ? v.trim() : undefined));

// One "set" = one group of photos taken on a given day.
// Each set is one Markdown file in src/content/sets/, edited through Pages CMS.
const sets = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/sets' }),
  schema: z.object({
    date: z.coerce.date(),
    title: optionalText,
    location: optionalText,
    note: optionalText,
    draft: z.boolean().nullish().transform((v) => v === true),
    photos: z
      .array(
        z.object({
          image: z.string().min(1, 'Every photo needs an image file.'),
          alt: z.string().min(1, 'Every photo needs a short description (alt text).'),
          caption: optionalText,
        }),
      )
      .min(1, 'A set needs at least one photo.'),
  }),
});

export const collections = { sets };
