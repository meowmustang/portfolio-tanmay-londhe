# Tanmay Londhe — Personal Brand Website

Premium dark-mode personal branding site for an enterprise AI, automation, and digital
transformation professional. Built with Next.js 15 (App Router, static export), TypeScript,
Tailwind CSS, and Framer Motion. GitHub Pages compatible.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build (static export)

```bash
npm run build      # outputs a fully static site to ./out
```

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository (branch `main`).
2. In the repo: **Settings → Pages → Source → GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) builds and deploys automatically.
   It injects the correct base path for project sites (`username.github.io/repo`) — no config needed.

## Before you publish — personalize these

| What | Where |
|---|---|
| Email address | `lib/content.ts` → `site.email` |
| LinkedIn URL | `lib/content.ts` → `site.linkedin` |
| Resume file | Replace `public/resume/Tanmay_Londhe_Resume.docx` (keep the filename, or update `site.resumeFile`) |
| Recognition screenshots | Drop images into `public/recognition/` named `appreciation-1.png` … `appreciation-4.png` (or edit the `gallery` list in `components/Recognition.tsx`). Missing images hide automatically. Previews render blurred; clicking opens a lightbox. |
| Case study visuals | Each case study page has Architecture / Workflow / Screenshot placeholders — see `app/solutions/[slug]/page.tsx` |
| Impact numbers | `lib/content.ts` → `impactStats` (kept generalized and non-confidential by design) |
| Case study content | `lib/solutions.ts` — one object per solution |

## Contact form

The form is static-host friendly: it opens the visitor's mail client with the message
prefilled (mailto). To capture submissions server-side instead, swap the `submit` handler in
`components/Contact.tsx` for a Formspree/Basin endpoint.

## Design system

- Palette: ink `#08080A`, graphite `#101013`, charcoal `#17171B`, seam `#26262C`, mist `#9C9CA6`, paper `#EFEFF2`, accent ember `#FF8400`
- Type: Space Grotesk (display), Inter (body), Manrope (labels/UI)
- Motion: Framer Motion scroll reveals, count-up stats, micro-interactions; `prefers-reduced-motion` respected
