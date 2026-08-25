# Content Audit

## Homepage

| Section | Current content (old Framer site / brief) | Recommended content | What was removed | Why |
|---|---|---|---|---|
| Hero | Headline + longer supporting paragraph, floppy carousel directly below | Headline kept, supporting copy cut to 2 sentences, CTA pair (See the work / About me) | Second supporting sentence, "22+ Projects / 15 Live Products" stat row from hero | Hero should carry one idea, not stats — stats now live in About preview only |
| Selected Work | Vertical stack of 6 floppy disks, all equal weight | 3 large editorial `FeaturedCard`s (ShuruKar, TechSparks, DevSparks) | Floppy disk treatment for featured work entirely | Brief explicitly flags floppy-stack as making every project look equally important; floppy language reserved for Spotlight only |
| Spotlight | Did not exist as a separate section before | New section, 6 floppy cards, links to /archive for more | — | Gives the floppy motif a real, bounded purpose instead of appearing everywhere |
| About preview | N/A | 2-sentence bio + 3 stats + 1 photo placeholder, links to /about | Full About content | Homepage should preview, not contain, the full About page |
| Contact | Large "Contact Me" phone-card graphic | Simple CTA block + button | Phone-card visual metaphor | Kept the phone-card *idea* available for the dedicated Contact page as a possible future addition; homepage CTA stays quiet by design (per "don't add another animation/texture if the page already works") |

## About

| Section | Current | Recommended | Removed | Why |
|---|---|---|---|---|
| Stats | "15 Live Products · 22+ Projects Designed" | "22+ Projects Designed" / "13–15 Live" (per updated brief) | "Live Products" phrasing | Brief explicitly corrects this — most are sites/campaigns, not shipped products; avoids overclaiming |
| Gallery | Implied large personal photo gallery | 4 photo placeholders in a tight grid | Any suggestion of a "giant gallery" | Brief explicitly says do not create a giant gallery |

## Work / Case studies

| Section | Current | Recommended | Removed | Why |
|---|---|---|---|---|
| ShuruKar | Treated as a single finished product in earlier drafts | Evolution narrative: V1 → 6-month pause → V2 → V3/beta direction, with an explicit TODO for the pause reason | Any implied user/impact metrics | ShuruKar has no confirmed metrics yet; brief is explicit that beta ≠ established numbers |
| TechSparks / DevSparks | N/A (new) | Problem → strategy → visual system structure, not the generic Hero/Problem/Research/Iterations template forced on every project | A one-size-fits-all case study template | Brief explicitly says the structure should adapt per project type, not be forced |
| Atlassian / Omaxe / GCC / MSME / Story Labs / Gemini Ignite / Papa Ke / Tech30 / VibeCode30 | N/A (new) | Spotlight tier only — name, role, one-liner, visual, live link. No forced case study. | Full case study treatment | Master project list marks these Spotlight, not Featured — respected as the more current, explicit source over earlier assumptions |

## Certificates

| Section | Current | Recommended | Removed | Why |
|---|---|---|---|---|
| Google UX Design | Risk of appearing "completed" | Explicitly labeled "In progress — 4 of 7 courses completed" | Any completed-style badge | Brief is explicit and repeated on this point — must never present as complete |

## Global content rules applied throughout

- No invented user counts, revenue, funding, testimonials, or outcomes anywhere in `data/projects.ts`.
- "Clients" language avoided; used "organisation" field with accurate framing ("×", "for", "at") instead of implying direct client relationships where the source material doesn't establish one.
- Every unconfirmed fact (dates, exact role split on team projects, live-URL status) is either omitted or flagged in a project's `todo[]` array and surfaced visibly at the bottom of its case study page — never silently assumed.
