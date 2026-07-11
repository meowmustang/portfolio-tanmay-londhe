import Link from "next/link";
import { solutions } from "@/lib/solutions";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Solutions() {
  return (
    <section id="solutions" className="py-24 md:py-32">
      <div className="wrap">
        <SectionHeading
          eyebrow="Enterprise solutions"
          title="Case studies in production"
          lede="Seven systems, each taken from a business problem through architecture, build, UAT, and deployment. Open any case study for the full journey — problem, architecture, implementation, impact, and lessons."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {solutions.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 0.08}>
              <Link
                href={`/solutions/${s.slug}/`}
                className="group focus-ring relative flex h-full flex-col rounded-2xl border border-seam bg-charcoal p-8 pl-10 transition-all duration-300 hover:-translate-y-1 hover:border-ember/40 hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]"
              >
                <span className="case-rule" aria-hidden="true" />
                <div className="flex items-start justify-between gap-4">
                  <p className="font-label text-[11px] font-bold uppercase tracking-caps text-ember">
                    {s.category}
                  </p>
                  <p className="shrink-0 rounded-full border border-seam px-3 py-1 font-label text-[10px] font-semibold uppercase tracking-wider text-mist">
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
                      className="rounded-md bg-ink px-2.5 py-1 font-label text-[11px] font-semibold text-mist"
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
