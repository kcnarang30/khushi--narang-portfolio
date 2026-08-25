# Asset Map

Every image reference used in `data/projects.ts` is listed below. **None of these
files exist yet** — the site currently renders `ImagePlaceholder` components in
their place (a labeled, intentional placeholder, not a broken-image icon) so
nothing looks unfinished or breaks layout.

To activate an image: export the real asset, drop it at the suggested path, then
swap the matching `ImagePlaceholder` in the component/page for a Next.js `<Image>`
pointed at that path.

## How to read this table

- **Required** — the case study is meaningfully weaker without it; prioritize these.
- **Optional** — nice to have, page works fine without it.

| Asset key (`imageRef` / `coverAssetRef`) | Project | What it should show | Appears | Priority |
|---|---|---|---|---|
| `shurukar-cover` | ShuruKar | Strongest single screen — likely the AI co-pilot or home screen | Featured card, case study hero | Required |
| `shurukar-v1-onboarding` | ShuruKar | V1 onboarding / scheme-discovery flow | Case study — "V1" section | Required |
| `shurukar-v2-copilot` | ShuruKar | V2 AI co-pilot + scheme detail screens | Case study — "Reset — V2" section | Required |
| `techsparks-cover` | TechSparks 2026 | Refracted-glass hero | Featured card, case study hero | Required |
| `techsparks-whats-in-store` | TechSparks 2026 | "What's in Store" 4-pillar section | Case study section | Optional |
| `techsparks-hero` | TechSparks 2026 | Full hero screen | Case study — "Visual system" | Optional (dedupes with cover) |
| `devsparks-cover` | DevSparks 2026 | Hub page hero | Featured card, case study hero | Required |
| `devsparks-hub` | DevSparks 2026 | Hub + one city page side by side | Case study — "One hub, one template" | Required |
| `atlassian-cover` | Atlassian Un/eash | Hero screen | Spotlight floppy card | Optional |
| `storylabs-cover` | Story Labs | Hero screen | Spotlight floppy card | Optional |
| `omaxe-cover` | Omaxe | Hero / district overview | Spotlight floppy card | Optional |
| `gcc-summit-cover` | GCC Summit | Hero screen | Spotlight floppy card | Optional |
| `msme-cover` | MSME Sparks 2026 | Hero screen | Spotlight floppy card | Optional |
| `gemini-ignite-cover` | Gemini Ignite | Hero screen | Spotlight floppy card | Optional |
| `papa-ke-cover` | Papa Ke Financial Sawalon | Accordion FAQ screen | Spotlight floppy card | Optional |
| `tech30-cover` | Tech30 2026 | Hero screen | Spotlight floppy card | Optional |
| `vibecode30-cover` | VibeCode 30 | Idea-card grid | Spotlight floppy card | Optional |
| `inscribe-cover-final` | Inscribe | Final cover, 6th edition ("Serendipity Lost") | Archive case study hero + section | Required |
| `furore-cover` | Furore | Full identity system spread | Archive case study hero | Optional |
| `furore-logo-final` | Furore | Final logo mark | Case study — "The system" | Required |
| `furore-merch` | Furore | Final t-shirt front/back | Case study — "Merch" | Optional |
| `defect-detector-ui` | Product Defect Detector | Working UI with Grad-CAM heatmap visible | Archive case study hero + section | Required |
| `clueminati-deck` | Clueminati | A themed rules/clue slide | Archive case study hero + section | Required |
| `writers-corner-cover` | Writer's Corner | Site homepage screenshot | Spotlight/archive row (no dedicated image slot currently) | Optional |
| `knwn-cover` | KNWN | Wordmark + mascot family | Playground grid | Required (playground is visual-first) |
| `cyber-angel-poster` | Cyber Angel | Full illustration — **this file already exists** as a rendered image in the source PDF; export it directly | Playground grid | Required |
| `greek-comics-cover` | Greek Comics | Comic cover #5 — **already exists** in source PDF | Playground grid | Required |
| `internet-magazine-cover` | Internet Magazine | Cover concept — **already exists** in source PDF | Playground grid | Required |

## Explicitly excluded (per "don't use a screenshot just because it exists")

The source material included many near-duplicate Figma screenshots (multiple
MSME desktop/mobile pairs, repeated Devsparks micro-site variants, Atlassian
component-inspector views with the Figma UI chrome visible). None of these are
listed above. Before adding any new screenshot, ask: does it prove something,
add visual variety, explain the project, or represent the strongest version of
the work? If not, don't add it — export a clean, chrome-free frame instead.

## About-page personal photos (not yet supplied as files)

- `polaroid-me` — "yep that's me"
- `polaroid-cat` — "meet cat the cat"
- `about-cooking`
- `about-desk`

These are referenced directly in `app/about/page.tsx` and `app/page.tsx` via
placeholder labels, not asset keys in `projects.ts` — swap them the same way.
