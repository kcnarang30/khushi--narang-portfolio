# Khushi Narang — Portfolio

Next.js 16 / React / TypeScript / Tailwind CSS v4 / Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm start
```

## Deploy to Vercel

No configuration needed — this is a standard Next.js App Router project with
no backend, no environment variables, and no external services.

1. Push this repo to GitHub.
2. Import it at vercel.com/new.
3. Deploy. That's it.

## How content is structured

Everything is data-driven so you can add or edit a project without touching
any page component.

```
data/
  types.ts          types (Project, CaseStudy, etc.)
  projects.ts        every project on the site — single source of truth
  certificates.ts     certificates / learning list
  links.ts             email, socials, resume path
  about.ts               About-page copy and stats

app/
  page.tsx                  homepage
  work/page.tsx               /work index (Featured + Spotlight + Live)
  work/[slug]/page.tsx          case study template — reads data/projects.ts
  playground/page.tsx             /playground
  archive/page.tsx                  /archive
  certificates/page.tsx               /certificates
  about/page.tsx                        /about
  contact/page.tsx                        /contact
  not-found.tsx                             custom 404

components/          reusable design-system pieces
public/projects/     real exported images, one folder per project slug
docs/                CONTENT_AUDIT.md, ASSET_MAP.md, PROJECT_INVENTORY.md
```

### Adding a new project

1. Add one object to the `projects` array in `data/projects.ts`. Set
   `featured` / `spotlight` / `archive` / `playground` / `live` / `caseStudy`
   as booleans — the right pages and cards pick it up automatically.
2. If it has a case study, fill in `caseStudyContent` (a hero statement plus
   an array of sections). The template at `app/work/[slug]/page.tsx` adapts
   to however many sections you give it — it doesn't force a fixed structure
   on every project.
3. Drop real images in `public/projects/[slug]/` and either set
   `coverImageSrc` to the real path (renders immediately), or leave
   `coverAssetRef` as a text label — it'll show a clearly-marked placeholder
   instead of a broken image, and stay tracked in `ASSET_MAP.md`.
4. If any fact is unconfirmed (a date, a live URL, an exact role), don't
   guess — add it to that project's `todo: []` array instead. It surfaces as
   a visible "open items" note at the bottom of the case study page.

## Design system

Tokens live in `app/globals.css` under `@theme inline`.

- Type: Space Grotesk (display), Inter (body), JetBrains Mono (captions,
  status badges, metadata — a deliberate retro-computing reference), Caveat
  (handwritten annotations, used sparingly on purpose).
- Colour: near-black base, off-white text, one signature accent (a
  warning-label orange-red), and a 4-colour floppy-disk palette that is
  *only* used inside the Spotlight section — see `components/floppy-card.tsx`.
  The floppy motif has one job here, not five, per the brief.
- Motion: `components/reveal.tsx` wraps scroll-triggered fades, and
  `components/hero-stage.tsx` adds scroll-linked parallax to the homepage
  hero objects. Both respect `prefers-reduced-motion` globally (see
  `globals.css`). No content or navigation depends on motion to be
  accessible.
- Composition: the site leans on physical "objects" (`WindowFrame`, tilted
  index cards, the floppy motif) and asymmetric layouts instead of repeated
  bordered cards — see `hero-stage.tsx` and `featured-project.tsx` for the
  reference pattern before adding a new section.

### Reusable components

| Component | Purpose |
|---|---|
| `HeroStage` | Homepage hero — oversized type plus scroll-linked floating objects |
| `FeaturedProject` | The 3 Featured case studies, each a distinct composition (`type-dominant` / `full-bleed` / `split-float`) |
| `WindowFrame` | Browser/app-window chrome used to make project previews read as objects, not cards |
| `FloppyCard` | Spotlight-only project card, with cursor-tilt interaction |
| `IndexRow` | Compact catalog-style row, used in Archive |
| `StatusBadge` | Live / Beta / Shipped / Designed / Concept, consistent everywhere |
| `ImagePlaceholder` | Intentional, labeled placeholder — never a broken-image icon |
| `Handwritten` | Caveat-font annotation, used sparingly |
| `Reveal` | Scroll-reveal wrapper, reduced-motion aware |

## What's still open

See `docs/PROJECT_INVENTORY.md` for the full list. Highest priority:

1. Export real screenshots for the 8 case studies — `docs/ASSET_MAP.md` says
   exactly which frame is needed where, and marks each Required vs Optional.
   Everything currently renders a clean placeholder, so nothing looks broken
   in the meantime.
2. ShuruKar's six-month pause has an honest TODO instead of a guess — fill in
   `data/projects.ts` → `shurukar` → the matching `caseStudyContent` section
   once you're ready to share that part of the story.
3. Personal photos for About/Homepage (polaroids, cooking, desk) — same
   placeholder pattern, listed at the bottom of `ASSET_MAP.md`.
4. Resume currently points to `/public/resume/Khushi-Narang-Resume.pdf` (the
   file you uploaded). Replace that file directly to update it site-wide.

## Content rules this project follows

No invented metrics, users, revenue, clients, or outcomes appear anywhere in
`data/projects.ts`. Unconfirmed facts are either omitted or explicitly marked
TODO — see `docs/CONTENT_AUDIT.md` for the reasoning behind each content
decision made during this build.
