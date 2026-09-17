# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio and blog site built with Astro, React, Tailwind CSS, and DaisyUI.

## Commands

- **Dev server:** `npm run dev` (localhost:4321)
- **Build:** `npm run build` (runs `astro check` then `astro build`)
- **Preview production build:** `npm run preview`
- **Lint & format:** `npm run lint` (Prettier + ESLint)

## Architecture

- **Framework:** Astro 4 with MDX, React 19, Tailwind CSS 3, DaisyUI 3
- **Routing:** File-based via `src/pages/` — home (`/`), blog (`/blog`), art (`/art`), interactive art
- **Blog posts:** MDX files in `src/content/blog/` using Astro Content Collections
- **Blog frontmatter:** `title` (string), `date` (string), `summary` (optional string), `tags` (optional string[]), `published` (boolean — controls visibility)
- **Blog components:** Reusable components in `src/components/blogs/` (Section, SectionTitle, Link, HeaderImage, BulletPoint, etc.) imported directly into MDX files
- **Interactive content:** Complex blog posts (e.g., `llm-biases`) use React `.tsx` components with `client:load` for charts/visualizations
- **Layouts:** `src/layouts/Layout.astro` (main), `src/layouts/Interactive-Layout.astro`
- **Themes:** DaisyUI "night" (default) and "winter", toggled via navbar with localStorage persistence
- **Styling conventions:** Tailwind utilities throughout; content centered with `max-w-[700px] m-auto w-[90%]`; `prose` class for blog content; custom `animate-fade-in` / `animate-fade-in-up` animations
- **Static data:** `src/data/` for structured data files (e.g., JSON for interactive blog content)

## Artwork Images

Art images live in `public/images/art/` (full resolution), with WebP thumbnails in `public/images/art/thumbs/`. The art page (`/art`) and home page grids display the thumbnails; the full-resolution original is only fetched when a piece is clicked (modal). Thumbnail paths are derived from the original path (`/images/art/X.jpg` → `/images/art/thumbs/X.webp`), so the filenames must match.

**When adding a new piece of artwork, you MUST generate a matching thumbnail** — without it the grid square will render a broken image:

```bash
cwebp -q 80 -resize 600 0 public/images/art/NewPiece.jpg -o public/images/art/thumbs/NewPiece.webp
```

## Deployment

Hosted on Cloudflare Pages (project `chris-coyne-portfolio`, served at ctcoyne.com and www.ctcoyne.com). `wrangler.jsonc` points Pages at `dist/`.

- **Deploy:** `npm run deploy` (builds, then `wrangler pages deploy`). Requires a Wrangler login (`npx wrangler login`).

## Photos Page

`/photos` is driven by a shared Google Photos album. The album is the approval mechanism: anything in the album gets published, anything removed gets unpublished. Photos and videos are both supported.

- **Sync:** `npm run photos:sync` (add `-- --force` to re-download everything). Fetches the shared album page and downloads new items straight from Google, no image tooling needed. Photos become WebP (2000px full in `public/images/photos/`, 600px thumb in `public/images/photos/thumbs/`). Videos become a 720p MP4 in `public/images/photos/videos/` plus a poster thumb. Updates `src/data/photos/manifest.json`. Individual download failures are logged and retried on the next run; they don't block the rest.
- **Manifest:** one entry per item with `id`, `type` (`photo` | `video`), `file` (webp), `video` + `durationMs` (videos only), `width`, `height`, `takenAt`, `caption`, `published`. Sync preserves `caption` (edit it by hand) and flips `published` to `false` for items no longer in the album without deleting files. Set `hidden: true` by hand to keep an item off the site while it stays in the album; sync won't download it.
- **Tagging:** `npm run photos:tag` opens a local UI (localhost:4322) for adding tags, a location, and a caption, and toggling `hidden` per item; it writes straight to the manifest. Tags are lowercase strings in a `tags` array; `location` is a single free-text string (the tagger reuses existing spellings case-insensitively). The photos page renders a filter row for each and they combine; deep links: `/photos?tag=<tag>&location=<place>`.
- **Google dependency:** isolated to `fetchAlbumItems()` in `scripts/sync-photos.mjs`. If the shared-album page markup changes, only that function needs replacing.
