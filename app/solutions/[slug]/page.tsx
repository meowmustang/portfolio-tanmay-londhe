import CaseImage from "@/components/CaseImage";
import { caseVisual } from "@/lib/caseAssets";
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
    title: `${s.name} — ${s.category} | Tanmay Londhe`,
    description: s.summary,
  };
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section className="glass-rule border-t py-12">
        <div className="grid gap-6 lg:grid-cols-[240px_1fr] lg:gap-14">
          <h2 className="eyebrow lg:pt-1">{label}</h2>
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

      <header className="relative overflow-hidden pb-16 pt-28 md:pt-32">
        <div className="hero-grid absolute inset-0" aria-hidden="true" />
        <div className="wrap relative">
          <Reveal>
            <Link
              href="/#solutions"
              className="glass-chip focus-ring inline-flex min-h-[24px] items-center px-3.5 py-1.5 font-label text-[12px] font-semibold text-mist transition-colors hover:border-white/25 hover:text-paper"
            >
              ← All solutions
            </Link>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <p className="eyebrow">{s.category}</p>
              <span className="glass-chip px-3 py-1 font-label text-[10px] font-semibold uppercase tracking-wider text-mist">
                {s.status}
              </span>
            </div>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              {s.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mist">{s.tagline}</p>
            <dl className="glass-rule mt-10 grid max-w-3xl grid-cols-2 gap-6 border-t pt-6 sm:grid-cols-3">
              <div>
                <dt className="font-label text-[11px] font-semibold uppercase tracking-caps text-mist">Serves</dt>
                <dd className="mt-1 font-label text-sm font-semibold text-paper">{s.functions}</dd>
              </div>
              <div>
                <dt className="font-label text-[11px] font-semibold uppercase tracking-caps text-mist">My role</dt>
                <dd className="mt-1 font-label text-sm font-semibold text-paper">{s.role}</dd>
              </div>
              <div>
                <dt className="font-label text-[11px] font-semibold uppercase tracking-caps text-mist">Timeline</dt>
                <dd className="mt-1 font-label text-sm font-semibold text-paper">{s.timeline}</dd>
              </div>
            </dl>
          </Reveal>

          {/* Outcomes up front: the reader gets the result before the narrative. */}
          <Reveal delay={0.08}>
            <dl className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {s.headlineMetrics.map((m) => (
                <div key={m.label} className="glass p-6">
                  <dt className="sr-only">{m.label}</dt>
                  <dd>
                    <span className="block font-display text-2xl font-semibold leading-tight tracking-tight text-ember md:text-[1.75rem]">
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
        <Block label="Overview">
          <p className="text-[17px] leading-relaxed text-paper/90">{s.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {s.focus.map((f) => (
              <span key={f} className="rounded-md border border-white/[0.07] bg-white/[0.04] px-3 py-1.5 font-label text-[12px] font-semibold text-mist">
                {f}
              </span>
            ))}
          </div>
        </Block>

        <Block label="Business problem">
          <p className="text-[15px] leading-relaxed text-mist">{s.problem}</p>
        </Block>

        <Block label="Business context">
          <List items={s.context} />
        </Block>

        <Block label="Challenges">
          <List items={s.challenges} />
        </Block>

        <Block label="Solution architecture">
          <List items={s.architecture} />
          <CaseImage
            src={caseVisual("architecture", s.slug)}
            alt={`${s.name} architecture diagram`}
            caption="Solution architecture"
          />
        </Block>

        <Block label="Technology stack">
          <ul className="flex flex-wrap gap-2">
            {s.stack.map((t) => (
              <li key={t} className="glass-chip px-4 py-1.5 font-label text-[13px] font-semibold text-paper/90">
                {t}
              </li>
            ))}
          </ul>
        </Block>

        <Block label="Implementation journey">
          <ol className="space-y-6">
            {s.journey.map((j, i) => (
              <li key={j} className="flex gap-5">
                <span className="font-display text-sm font-semibold text-ember">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[15px] leading-relaxed text-mist">{j}</p>
              </li>
            ))}
          </ol>
          <CaseImage
            src={caseVisual("workflow", s.slug)}
            alt={`${s.name} process workflow`}
            caption="Process workflow"
          />
        </Block>

        <Block label="Business impact">
          <List items={s.impact} />
        </Block>

        <Block label="Lessons learned">
          <List items={s.lessons} />
        </Block>

        <Block label="Future improvements">
          <List items={s.future} />
        </Block>

        <Reveal>
          <div className="glass-lit mt-8 flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center">
            <div>
              <p className="font-label text-[11px] font-semibold uppercase tracking-caps text-mist">Next case study</p>
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
