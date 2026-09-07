import Link from "next/link";
import { solutions } from "@/lib/solutions";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Solutions() {
  // ORBIT gets its own flagship section, so it is excluded from this grid.
  const rest = solutions.filter((s) => !s.featured);

  return (
    <section id="solutions" className="py-20 md:py-28">
      <div className="wrap">
        <SectionHeading
          eyebrow="Enterprise solutions"
          title="The systems that built the case for a platform"
          lede="Seven more, each taken from a business problem through architecture, build, UAT, and deployment — and each one a reason ORBIT exists. Open any case study for the full journey: problem, architecture, implementation, measured impact, and what it taught me."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {rest.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 0.08}>
              <Link
                href={`/solutions/${s.slug}/`}
                className="glass glass-hover group focus-ring relative flex h-full flex-col p-7 pl-9"
              >
                <span className="case-rule" aria-hidden="true" />
                <div className="flex items-start justify-between gap-4">
                  <p className="min-w-0 font-label text-[11px] font-bold uppercase tracking-caps text-ember">
                    {s.category}
                  </p>
                  <p className="glass-chip px-3 py-1 text-right font-label text-[10px] font-semibold uppercase leading-snug tracking-wider text-mist">
                    {s.status}
                  </p>
                </div>
                <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-paper">
                  {s.name}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">{s.tagline}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {s.focus.slice(0, 4).map((f) => (
                    <span
                      key={f}
                      className="rounded-md border border-white/[0.07] bg-white/[0.04] px-2.5 py-1 font-label text-[11px] font-semibold text-mist"
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <p className="mt-6 font-label text-[13px] font-bold text-paper transition-colors group-hover:text-ember">
                  Read the case study <span aria-hidden="true">→</span>
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
