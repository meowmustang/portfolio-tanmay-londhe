import { impactStats } from "@/lib/content";
import Reveal from "./Reveal";
import CountUp from "./CountUp";
import SectionHeading from "./SectionHeading";

export default function Impact() {
  return (
    <section id="impact" className="border-t border-seam bg-graphite py-24 md:py-32">
      <div className="wrap">
        <SectionHeading
          eyebrow="Impact"
          title="Business impact delivered"
          lede="Outcomes, not output. Every system in this portfolio runs in production, carries a full audit trail, and returned measurable time and accuracy to the teams it serves."
        />
        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-seam bg-seam sm:grid-cols-2 lg:grid-cols-3">
          {impactStats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="group bg-charcoal p-8 transition-colors hover:bg-[#1c1c21]">
              <p className="font-display text-5xl font-semibold tracking-tight text-paper">
                <CountUp value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-4 font-label text-sm font-bold text-paper">{s.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-mist">{s.note}</p>
              <span className="mt-6 block h-px w-8 bg-ember/50 transition-all duration-500 group-hover:w-16 group-hover:bg-ember" aria-hidden="true" />
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="mt-6 text-xs text-mist/70">
            Figures are generalized to respect confidentiality. Detailed context is available in each case study.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
