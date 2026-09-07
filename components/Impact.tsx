import { impactStats } from "@/lib/content";
import { portfolioTotals } from "@/lib/portfolio";
import Reveal from "./Reveal";
import CountUp from "./CountUp";
import SectionHeading from "./SectionHeading";

export default function Impact() {
  return (
    <section id="impact" className="py-20 md:py-28">
      <div className="wrap">
        <SectionHeading
          eyebrow="Impact"
          title="What the work returned"
          lede="Outcomes, not output. Every figure below is totalled from the delivery tracker, per automation, from real annual volumes and measured minutes saved per unit."
        />

        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {impactStats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="glass glass-hover group flex h-full flex-col p-7">
                <p className="font-display text-[2.6rem] font-semibold leading-none tracking-tight text-paper">
                  <CountUp value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-4 font-label text-sm font-bold leading-snug text-paper">{s.label}</p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-mist">{s.note}</p>
                <span
                  className="mt-6 block h-px w-8 bg-ember/50 transition-all duration-500 group-hover:w-20 group-hover:bg-ember"
                  aria-hidden="true"
                />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-3xl text-xs leading-relaxed text-mist">
            {portfolioTotals.hoursPerYear.toLocaleString("en-IN")} hours a year is roughly{" "}
            {portfolioTotals.fte.toFixed(1)} full-time people at{" "}
            {portfolioTotals.productiveHoursPerFte.toLocaleString("en-IN")} productive hours
            each. Ratios, counts, and cycle times rather than commercially sensitive figures.
            Each case study states the window a number was measured over, and says plainly
            where a value is estimated rather than measured.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
