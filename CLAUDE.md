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
