# Yuyuan Lisa — Photography

A quiet, year-by-year photography portfolio built with [Astro](https://astro.build),
edited through [Pages CMS](https://pagescms.org) and published free on GitHub Pages.

## Folder map

```
.pages.yml                 ← defines the visual editor (Pages CMS)
src/
  assets/photos/           ← every photo lives here (samples/ can be deleted later)
  content/sets/            ← one .md file per photo set (date, title, photos…)
  data/settings.json       ← name, home photo, tagline, About text, links
  components/              ← Header, Footer, PhotoSet (grid), Lightbox (viewer)
  layouts/Base.astro       ← shared <head>, fonts, header/footer
  pages/                   ← Home, Walks, Research, About, 404
  styles/global.css        ← colours, fonts, spacing (all design tokens at the top)
.github/workflows/deploy.yml ← automatic build + publish
```

## Run it on your computer

Requires **Node.js 22.23.4 or newer** (https://nodejs.org).

```bash
npm install        # once
npm run dev        # live preview at http://localhost:4321
npm run build      # produce the final site in dist/
npm run preview    # view the built site
```

## Publish to https://lisayuyuan.github.io

1. **Create the organisation**: github.com → your avatar → *Your organizations* → *New organization* → Free → name it `lisayuyuan`.
2. **Create the repository** inside it, named exactly `lisayuyuan.github.io` (public).
3. **Upload this project** to the repository (GitHub Desktop, or):
   ```bash
   git init && git add . && git commit -m "First version"
   git branch -M main
   git remote add origin https://github.com/lisayuyuan/lisayuyuan.github.io.git
   git push -u origin main
   ```
4. In the repository: **Settings → Pages → Source: GitHub Actions**.
5. Open the **Actions** tab and wait for the green tick (about 1–2 minutes). The site is live.

## Update the site (visual editor)

1. Go to https://app.pagescms.org and sign in with GitHub (dannnnngo).
2. Allow it access to the `lisayuyuan` organisation and pick the `lisayuyuan.github.io` repository.
3. **Photo sets → Add**: choose a date, add photos (each needs a short description), save.
4. **Site settings**: change the home photo, tagline, About text, email, Instagram.

Each save is a commit; the site rebuilds itself and is updated in 1–2 minutes.
Every past version is kept in GitHub history, so mistakes can always be undone.

**Photo tip:** export JPEGs about 2500px on the long edge (Lightroom: *Resize to fit → Long edge 2500 px*, quality 85). The site makes smaller versions automatically.

## Change the look

All colours, fonts and spacing are defined once at the top of `src/styles/global.css`.
