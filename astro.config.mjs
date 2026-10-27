// @ts-check
import { defineConfig } from 'astro/config';

// The public address of the site. Change `site` if you move to another domain.
// `base` stays "/" for a site published at the root of a domain
// (e.g. https://lisayuyuan.github.io). Set BASE_PATH only if the site
// lives in a sub-folder, e.g. https://dannnnngo.github.io/photos -> BASE_PATH=/photos
export default defineConfig({
  site: process.env.SITE_URL || 'https://lisayuyuan.github.io',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'ignore',
  // The photo timeline used to live at /works/; keep old links working.
  redirects: {
    '/works': '/walks',
  },
  build: {
    format: 'directory',
  },
});
