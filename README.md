# Tanmay Londhe — Personal Brand Website

Personal site for a business-minded AI transformation professional. Built with Next.js 15
(App Router, static export), TypeScript, and Tailwind CSS. Deploys to GitHub Pages.

**Positioning:** find how the work actually gets done, decide where AI and automation change
the economics, then build the system and prove it moved. The copy that carries this lives in
one place — `lib/content.ts` → `positioning` — so the hero, page metadata, and the Open Graph
card cannot drift apart.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
```

## Deploy to GitHub Pages

1. Push to `main`.
2. Repo **Settings → Pages → Source → GitHub Actions**.
3. `.github/workflows/deploy.yml` builds and deploys, injecting the correct base path for
   project sites automatically.

Set `NEXT_PUBLIC_SITE_URL` if you attach a custom domain. It feeds `site.url`, which builds
the canonical URL, Open Graph tags, JSON-LD, and the sitemap.

## Content model

| What | Where |
|---|---|
| Positioning, hero, impact stats, principles, skills | `lib/content.ts` |
| Case studies (one object each) | `lib/solutions.ts` |
| Automation roster and portfolio totals | `lib/portfolio.ts` |
| Flagship homepage section | `components/Flagship.tsx` |
| Section order | `app/page.tsx` |

### Adding or editing a case study

One object in `lib/solutions.ts`. `featured: true` pulls it out of the grid and into the
flagship section instead — only ORBIT uses this today. Required fields beyond the narrative:

- `role` — what you owned. Previously hardcoded as "End-to-end owner" on every page.
- `timeline` — rough delivery window.
- `headlineMetrics` — 3-4 outcomes rendered as a strip above the narrative, so a reader
  gets the result before the story.

### Case study visuals

Drop files into `public/case-studies/` named by slug:

```
architecture-<slug>.png
workflow-<slug>.png
screenshot-<slug>.png
```

`lib/caseAssets.ts` enumerates the directory at build time. Missing files are omitted from
the markup entirely — there are no placeholder boxes and no developer-facing instructions
rendered to visitors.

### Appreciation gallery

Images in `public/recognition/` named `appreciation-1.png` … `appreciation-4.png`.
`lib/galleryAssets.ts` reads the directory at build time and maps filenames to captions, so
a missing file never produces a broken tile.

## Contact form

Static host, so there is no server to post to. With no configuration the form composes an
email, and a copy-address button covers visitors with no mail client. To capture submissions
properly, set an endpoint (Formspree, Web3Forms, Basin) and the form posts JSON to it:

```bash
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxxxx
```

## Design system

- **Palette:** ground ink `#08080A`, muted mist `#9C9CA6`, text paper `#EFEFF2`,
  accent ember `#FF8400`. Surfaces are not named colours — they are translucent white
  over the ambient field, written inline as `white/<alpha>` or via the glass utilities.
- **Type:** Space Grotesk (display), Inter (body), Manrope (labels). Self-hosted via
  `next/font`, so there is no render-blocking request to Google Fonts and no layout shift.
- **Motion:** CSS only. No motion library.
- **Surfaces:** glassmorphism. Translucent panels over a fixed ambient colour field,
  with a masked gradient ring on the large panels so light catches one edge rather than
  the whole border.

### The glass system

Three utilities in `globals.css`, plus the field they sit on:

| Class | Use |
|---|---|
| `.ambient` | The page-level colour field: `public/bg-field.webp` plus an ember wash, a scrim, and a noise layer. One instance, in the layout. |
| `.glass` | The workhorse panel. Carries **no** backdrop blur. |
| `.glass-lit` | Hero, flagship, contact form, and the next-case-study card. Adds backdrop blur and the lit edge. |
| `.glass-hover` | Interactive lift for cards and tiles. |
| `.glass-chip` | Pills and secondary buttons. |

Backdrop blur costs a GPU pass per layer, so `.glass` deliberately omits it and depth
comes from the ambient field instead. Keep `.glass-lit` to a handful of panels per
screen. There is a `@supports` fallback that swaps in an opaque fill where
`backdrop-filter` is unavailable, so text contrast is never at risk.

### The background field

`public/bg-field.webp` is a blurred gradient photograph (Unsplash original, 7680x4320)
processed down to 1920x1080 WebP at 12 KB. It is **darkened to 46% brightness and
desaturated to 82%** on purpose. At full strength the neon magenta pushed body text under
4.5:1 and fought the ember accent.

Its URL is passed in from the layout as a `--bg-field` custom property rather than written
into the CSS, because a stylesheet cannot read `NEXT_PUBLIC_BASE_PATH` and a hardcoded
`/bg-field.webp` would 404 on a GitHub Pages project site.

To swap the image, process the replacement the same way and re-check contrast. Measured on
the rendered page, body text currently sits at about 6.3:1 against the glass. Portrait
viewports get a different `background-position` because a 16:9 field crops hard, and the
default centre lands on the dark diagonal band.

Never put `.glass-hover` on a `Reveal` element. `Reveal` owns that element's `transform`
for the scroll animation, and the hover lift would lose the specificity fight. Wrap
instead: `Reveal` outside, the glass panel as its child.

### How the entrance animations work

Content is **visible by default**. `globals.css` only hides it once an inline bootstrap
script in the document head has confirmed JavaScript is running, and `components/Reveal.tsx`
reveals it with an IntersectionObserver.

This matters: the previous implementation used a JS motion library whose initial state was
serialised into the static HTML as `opacity: 0` on 92 elements. With JavaScript blocked,
slow, or erroring, the entire page rendered blank. The current arrangement degrades to
readable content in every one of those cases, and a failsafe forces everything visible if
React never hydrates within three seconds.

Keep this property. If you reintroduce a scroll animation, drive it from the `.reveal`
class rather than an inline style.

## Layout audit

```bash
npm run build
cd out && python -m http.server 8899   # or any static server
npm run audit:layout                    # in another shell
```

Drives a local Chrome or Edge across mobile, tablet, and desktop viewports and reports
horizontal overflow with the offending elements, content still hidden after a full scroll,
tap targets under 24×24 CSS px, images missing `alt`, and `h1` count. Full-page screenshots
land in `audit-shots/` (gitignored). Set `CHROME_PATH` if the browser is not auto-detected.

## Console audit

Hydration mismatches only show up in the browser console, never in the build or the dev
server log, so they are easy to ship by accident:

```bash
npm run dev
npm run audit:console http://localhost:3111/          # in another shell
npm run audit:console http://localhost:3111/solutions/orbit/
```

Loads the page in a real browser and reports every console message, flagging anything
hydration-related. Both pages should report zero.

## Before you publish

| What | Where |
|---|---|
| Email address — confirm this is the address you want public | `lib/content.ts` → `site.email` |
| Resume PDF | `public/resume/Tanmay-Londhe-Resume.pdf` |
| Site URL for a custom domain | `NEXT_PUBLIC_SITE_URL` |
| Open Graph card — regenerate if the headline changes | `public/og.png` |
| Automation roster — regenerate from the delivery tracker when it changes | `lib/portfolio.ts` |

`assets-staging/` holds screenshots that were deliberately **not** published. See the README
in that folder before moving anything into `public/`.

## Where the numbers come from

`lib/portfolio.ts` mirrors the internal delivery tracker: fifteen automations that are live
or in build, each with the business function it serves and the tracker's own hours-per-year
figure (annual volume multiplied by measured minutes saved per unit). The total of 3,897
hours and the derived full-time-equivalent figure are the tracker's, not a re-estimate.

Automations still in design or on hold are counted in the footer total but not listed by
name. Impact figures elsewhere on the site are deliberately ratios, counts, and cycle times
rather than anything commercially sensitive.
