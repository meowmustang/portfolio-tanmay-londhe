# Tanmay Londhe — AI Transformation & Automation | Business Systems

Personal site built with Next.js 15 (App Router, static export), TypeScript, and Tailwind CSS.
Deploys to GitHub Pages. Live at
<https://meowmustang.github.io/portfolio-tanmay-londhe/>.

**Positioning:** I turn business problems into AI-powered systems. The copy that carries this
lives in one place, `lib/content.ts` → `positioning`, so the hero, page metadata, and the
Open Graph card cannot drift apart.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
```

## Deployment

`main` is the branch that deploys. `.github/workflows/deploy.yml` triggers on a push to
`main`, builds the static export, and publishes it to Pages, injecting the project-site base
path automatically.

Push to `main`, not to another branch. Three faults previously stopped this working, all now
fixed: the push went to `master` while the workflow only watched `main`; a second Pages
workflow raced `deploy.yml` over the same `pages` concurrency group; and the `.next` build
cache had been committed.

Set `NEXT_PUBLIC_SITE_URL` if you attach a custom domain. It feeds `site.url`, which builds
the canonical URL, Open Graph tags, JSON-LD, and the sitemap.

## Content model

| What | Where |
|---|---|
| Positioning, impact metrics, how I think, capabilities, about, contact | `lib/content.ts` |
| Case studies, one object each | `lib/solutions.ts` |
| Automation roster and portfolio totals | `lib/portfolio.ts` |
| Flagship homepage section | `components/Flagship.tsx` |
| Section order | `app/page.tsx` |

### Page structure

Hero → Impact → Flagship (ORBIT) → Selected work → Full portfolio → How I think →
Business × AI × Technology → About → Capabilities → Recognition → Contact.

Evidence comes before self-description on purpose: a hiring manager reaches the work and the
numbers before reaching any claim about how the work is done.

### Adding or editing a case study

One object in `lib/solutions.ts`, following the same eight-section narrative:

| Field | Section |
|---|---|
| `problem` | 01 The problem |
| `existingProcess` | 02 The existing process |
| `opportunity` | 03 The opportunity — why it suited AI or automation |
| `solution` | 04 The solution |
| `howItWorks` | 05 How it works |
| `myRole` | 06 My role, as area and detail pairs |
| `impact` | 07 Impact |
| `learned` | 08 What I learned — one insight, not a list |

`featured: true` pulls a case study out of the grid and into the flagship section instead.
Only ORBIT uses it. `headlineMetrics` renders as a strip above the narrative so the reader
gets the result before the story.

### Case study visuals

Drop files into `public/case-studies/` named by slug:

```
architecture-<slug>.png
workflow-<slug>.png
screenshot-<slug>.png
```

`lib/caseAssets.ts` enumerates the directory at build time. Missing files are omitted from
the markup entirely, so an unfinished case study degrades to text rather than showing a
placeholder.

### Product screenshots

A case study can also declare a `screens` array of `{ file, caption }`, rendered as a
click-to-enlarge gallery under "How it works". Files live in `public/case-studies/`, and
`caseScreens()` drops any whose file is absent, so a wrong filename degrades to nothing.

Only ORBIT uses this today. Its four screenshots come from an isolated instance running a
re-identified copy of the production database: aggregates preserved exactly, identifiers
replaced, so the figures are real and no named person appears. **Never screenshot the live
portal.** See `assets-staging/README.md` for the full review of which captures were published,
which were rejected for exposing the hostname, server spec, ports, and configuration flags,
and how to rebuild the capture harness.

### Appreciation gallery

Images in `public/recognition/` named `appreciation-1.png` … `appreciation-4.png`.
`lib/galleryAssets.ts` reads the directory at build time and maps filenames to captions, so a
missing file never produces a broken tile.

## Content rules this site follows

Nothing on the site is invented. Where the source material does not support a claim, the
claim is absent rather than softened:

- **No TrackIt case study.** The project does not appear in this repository, the ORBIT
  documentation, or the delivery tracker. Provide the details and it can be added.
- **RAG and autonomous agents are absent from Capabilities.** No retrieval or vector layer
  exists in any project, and the agentic rebuild is a documented roadmap direction rather
  than shipped work. Add either only once a project stands behind it.
- **The About timeline carries stages, not dates.** Verified dates are not available.
- Every hour figure traces to `lib/portfolio.ts`, which mirrors the delivery tracker.

## Where the numbers come from

`lib/portfolio.ts` mirrors the internal delivery tracker: fifteen automations live or in
build, each with the business function it serves and the tracker's own hours-per-year figure,
which is annual volume multiplied by measured minutes saved per unit. The total of 3,897
hours and the derived full-time-equivalent figure are the tracker's, not a re-estimate.
Automations still in design or on hold are counted in the total but not listed by name.

Impact figures elsewhere are deliberately ratios, counts, and cycle times rather than
anything commercially sensitive.

## Contact form

Static host, so there is no server to post to. With no configuration the form composes an
email, and a copy-address button covers visitors with no mail client. To capture submissions
properly, set an endpoint and the form posts JSON to it:

```bash
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxxxx
```

## Design system

- **Palette:** ground ink `#08080A`, muted mist `#9C9CA6`, text paper `#EFEFF2`, accent ember
  `#FF8400`. Surfaces are not named colours; they are translucent panels over the ambient
  field, written via the glass utilities.
- **Type:** Space Grotesk (display), Inter (body), Manrope (labels). Self-hosted via
  `next/font`, so there is no render-blocking request to Google Fonts and no layout shift.
- **Motion:** CSS only. No motion library.
- **Surfaces:** glassmorphism over a fixed ambient colour field, with a masked gradient ring
  on the large panels so light catches one edge rather than the whole border.

### The glass system

| Class | Use |
|---|---|
| `.ambient` | The page-level colour field: `public/bg-field.webp` plus an ember wash, a scrim, and a noise layer. One instance, in the layout. |
| `.glass` | The workhorse panel. Carries **no** backdrop blur. |
| `.glass-lit` | Hero, flagship, contact form, and the next-case-study card. Adds backdrop blur and the lit edge. |
| `.glass-hover` | Interactive lift for cards and tiles. |
| `.glass-chip` | Pills and secondary buttons. |

Backdrop blur costs a GPU pass per layer, so `.glass` deliberately omits it and depth comes
from the ambient field instead. Keep `.glass-lit` to a handful of panels per screen. A
`@supports` fallback swaps in an opaque fill where `backdrop-filter` is unavailable, so text
contrast is never at risk.

Never put `.glass-hover` on a `Reveal` element. `Reveal` owns that element's `transform` for
the scroll animation, and the hover lift would lose the specificity fight. Wrap instead:
`Reveal` outside, the glass panel as its child.

### The background field

`public/bg-field.webp` is a blurred gradient photograph (Unsplash original, 7680x4320)
processed down to 1920x1080 WebP at 12 KB. It is **darkened to 46% brightness and desaturated
to 82%** on purpose. At full strength the neon magenta pushed body text under 4.5:1 and
fought the ember accent.

Its URL is passed in from the layout as a `--bg-field` custom property rather than written
into the CSS, because a stylesheet cannot read `NEXT_PUBLIC_BASE_PATH` and a hardcoded path
would 404 on a project site.

To swap the image, process the replacement the same way and re-check contrast. Measured on
the rendered page, body text sits at about 6.3:1 against the glass. Portrait viewports get a
different `background-position`, because a 16:9 field crops hard and the default centre lands
on the dark diagonal band.

### How the entrance animations work

Content is **visible by default**. `globals.css` hides it only inside
`@media (scripting: enabled)`, and `components/Reveal.tsx` reveals it with an
IntersectionObserver.

The media query replaced an earlier trick where an inline script added a `js` class to
`<html>`. That mutation ran before React hydrated, so the server and client class lists
genuinely differed and React logged a hydration mismatch on every load. A media query asks
the same question with no DOM mutation, so the mismatch is gone at the source. Browsers
without support for the query skip the block, leaving content visible, which is the correct
degradation.

`Reveal` also reveals immediately if its element is already in or past the viewport when the
effect runs. Without that, hydration finishing after the reader has scrolled left whole
sections permanently blank, because an observer created at that point never fires for an
element now above the viewport.

This matters. An earlier implementation used a motion library whose initial state was
serialised into the static HTML as `opacity: 0` on 92 elements, so with JavaScript blocked,
slow, or erroring the entire page rendered blank. The current arrangement degrades to readable
content in every one of those cases, and a failsafe forces everything visible if React never
hydrates within three seconds.

Keep this property. If you reintroduce a scroll animation, drive it from the `.reveal` class
rather than an inline style.

`<html>` still carries `suppressHydrationWarning`, now only as insurance against browser
extensions that rewrite `<html>` before React loads, which is a common false-positive source.
It covers that element's own attributes only and does not extend into the tree, so genuine
mismatches below it still surface.

The remaining inline script does one thing: after three seconds, if React has not hydrated,
it adds `reveal-failsafe` to force every reveal visible. Three seconds is well past normal
hydration, so it never mutates `<html>` while React is reconciling.

## Layout audit

```bash
npm run build
cd out && python -m http.server 8899   # or any static server
npm run audit:layout                    # in another shell
```

Drives a local Chrome or Edge across mobile, tablet, and desktop viewports and reports
horizontal overflow with the offending elements, content still hidden after a full scroll, tap
targets under 24×24 CSS px, images missing `alt`, and `h1` count. Full-page screenshots land
in `audit-shots/` (gitignored). Set `CHROME_PATH` if the browser is not auto-detected.

## Reveal audit

```bash
npm run build
cd out && python -m http.server 8899
npm run audit:reveal http://localhost:8899/        # in another shell
```

Checks the three states that matter: scripting on with motion allowed (below-fold content
starts hidden, then becomes visible on scroll), scripting on with reduced motion (everything
visible immediately), and scripting off (everything visible). It also asserts that nothing
adds a class to `<html>` before hydration.

**Headless Chrome reports `prefers-reduced-motion: reduce` by default.** Both this script and
the layout audit emulate `no-preference` explicitly. Without that the reduced-motion rule
forces everything visible and the checks pass while testing nothing, which is exactly how the
late-hydration blank-section bug survived several audit runs.

## Console audit

Hydration mismatches only appear in the browser console, never in the build or the dev server
log, so they are easy to ship by accident:

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
| Open Graph card — regenerate if the tagline changes | `public/og.png` |
| Automation roster — regenerate when the tracker changes | `lib/portfolio.ts` |

`assets-staging/` holds screenshots that were deliberately **not** published. See the README
in that folder before moving anything into `public/`.
