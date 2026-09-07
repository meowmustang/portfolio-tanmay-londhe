import CaseImage from "@/components/CaseImage";
import { caseVisual, caseScreens } from "@/lib/caseAssets";
import ScreenGallery from "@/components/ScreenGallery";
import Link from "next/link";
import { notFound } from "next/navigation";
import { solutions, getSolution } from "@/lib/solutions";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import type { Metadata } from "next";

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) return {};
  return {
    title: `${s.name} — ${s.category}`,
    description: s.solution,
  };
}

/** One numbered section of the standard eight-part case study narrative. */
function Block({
  n,
  label,
  children,
}: {
  n: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <section className="glass-rule border-t py-12">
        <div className="grid gap-6 lg:grid-cols-[240px_1fr] lg:gap-14">
          <h2 className="flex items-baseline gap-3 lg:pt-1">
            <span className="font-display text-sm font-semibold text-ember">{n}</span>
            <span className="font-label text-[11px] font-semibold uppercase tracking-caps text-mist">
              {label}
            </span>
          </h2>
          <div>{children}</div>
        </div>
      </section>
    </Reveal>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item} className="flex gap-4 text-[15px] leading-relaxed text-mist">
          <span className="mt-[0.65rem] h-px w-5 shrink-0 bg-ember/70" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) notFound();

  const idx = solutions.findIndex((x) => x.slug === s.slug);
  const next = solutions[(idx + 1) % solutions.length];

  return (
    <main id="main">
      <Nav />

      <header className="relative pb-14 pt-24 md:pt-28">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="wrap relative">
          <Reveal>
            <Link
              href="/#work"
              className="glass-chip focus-ring inline-flex min-h-[24px] items-center px-3.5 py-1.5 font-label text-[12px] font-semibold text-mist transition-colors hover:border-white/25 hover:text-paper"
            >
              ← All work
            </Link>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <p className="eyebrow">{s.category}</p>
              <span className="glass-chip px-3 py-1 font-label text-[10px] font-semibold uppercase tracking-wider text-mist">
                {s.status}
              </span>
            </div>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight text-paper md:text-6xl">
              {s.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mist">{s.tagline}</p>
            <dl className="glass-rule mt-10 grid max-w-3xl grid-cols-2 gap-6 border-t pt-6 sm:grid-cols-3">
              <div>
                <dt className="font-label text-[11px] font-semibold uppercase tracking-caps text-mist">
                  Serves
                </dt>
                <dd className="mt-1 font-label text-sm font-semibold text-paper">{s.functions}</dd>
              </div>
              <div>
                <dt className="font-label text-[11px] font-semibold uppercase tracking-caps text-mist">
                  My role
                </dt>
                <dd className="mt-1 font-label text-sm font-semibold text-paper">{s.role}</dd>
              </div>
              <div>
                <dt className="font-label text-[11px] font-semibold uppercase tracking-caps text-mist">
                  Timeline
                </dt>
                <dd className="mt-1 font-label text-sm font-semibold text-paper">{s.timeline}</dd>
              </div>
            </dl>
          </Reveal>

          {/* Outcomes up front: the reader gets the result before the narrative. */}
          <Reveal delay={0.08}>
            <dl className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {s.headlineMetrics.map((m) => (
                <div key={m.label} className="glass p-6">
                  <dt className="sr-only">{m.label}</dt>
                  <dd>
                    <span className="block font-display text-2xl font-semibold leading-tight tracking-tight text-ember md:text-[1.7rem]">
                      {m.value}
                    </span>
                    <span className="mt-2 block text-[13px] leading-snug text-mist">{m.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </header>

      <div className="wrap pb-24">
        <Block n="01" label="The problem">
          <p className="text-[17px] leading-relaxed text-paper/90">{s.problem}</p>
        </Block>

        <Block n="02" label="The existing process">
          <List items={s.existingProcess} />
        </Block>

        <Block n="03" label="The opportunity">
          <List items={s.opportunity} />
        </Block>

        <Block n="04" label="The solution">
          <p className="text-[15px] leading-relaxed text-mist">{s.solution}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {s.focus.map((f) => (
              <span
                key={f}
                className="rounded-md border border-white/[0.07] bg-white/[0.04] px-3 py-1.5 font-label text-[12px] font-semibold text-mist"
              >
                {f}
              </span>
            ))}
          </div>
          <p className="mt-8 font-label text-[11px] font-semibold uppercase tracking-caps text-mist">
            Built with
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {s.stack.map((t) => (
              <li
                key={t}
                className="glass-chip px-4 py-1.5 font-label text-[13px] font-semibold text-paper/90"
              >
                {t}
              </li>
            ))}
          </ul>
        </Block>

        <Block n="05" label="How it works">
          <List items={s.howItWorks} />
          <CaseImage
            src={caseVisual("architecture", s.slug)}
            alt={`${s.name} architecture diagram`}
            caption="Solution architecture"
          />
          <CaseImage
            src={caseVisual("workflow", s.slug)}
            alt={`${s.name} process workflow`}
            caption="Process workflow"
          />
          <ScreenGallery
            screens={caseScreens(s.screens)}
            note="Captured from an isolated instance running a re-identified copy of the database. Every aggregate is preserved exactly — 209 runs, 94,339 items, 165.9 hours — and only identifiers are replaced, so the figures are real while no named per-person productivity data is published."
          />
        </Block>

        <Block n="06" label="My role">
          <dl className="grid gap-4 sm:grid-cols-2">
            {s.myRole.map((r) => (
              <div key={r.area} className="glass p-5">
                <dt className="font-label text-[12px] font-bold uppercase tracking-caps text-ember">
                  {r.area}
                </dt>
                <dd className="mt-2 text-[14px] leading-relaxed text-mist">{r.detail}</dd>
              </div>
            ))}
          </dl>
        </Block>

        <Block n="07" label="Impact">
          <List items={s.impact} />
        </Block>

        <Block n="08" label="What I learned">
          <p className="text-[17px] leading-relaxed text-paper/90">{s.learned}</p>
        </Block>

        <Reveal>
          <div className="glass-lit mt-8 flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center">
            <div>
              <p className="font-label text-[11px] font-semibold uppercase tracking-caps text-mist">
                Next case study
              </p>
              <p className="mt-2 font-display text-2xl font-semibold text-paper">{next.name}</p>
              <p className="mt-1 text-sm text-mist">{next.category}</p>
            </div>
            <Link
              href={`/solutions/${next.slug}/`}
              className="focus-ring shrink-0 rounded-full bg-ember px-6 py-3 font-label text-sm font-bold text-ink shadow-[0_10px_30px_-12px_rgba(255,132,0,0.7)] transition-transform hover:-translate-y-0.5"
            >
              Read next →
            </Link>
          </div>
        </Reveal>
      </div>

      <Footer />
    </main>
  );
}
