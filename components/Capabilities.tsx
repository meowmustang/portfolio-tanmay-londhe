import { capabilities } from "@/lib/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Capabilities() {
  return (
    <section id="capabilities" className="py-20 md:py-28">
      <div className="wrap">
        <SectionHeading
          eyebrow="What I actually do"
          title="Transformation is three jobs, not one"
          lede="Most automation programmes fail on the first job and the third — nobody mapped the real process, and nobody measured whether anything changed. The build in the middle is the easy part."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <Reveal key={c.number} delay={i * 0.08}>
              <div className="glass glass-hover group flex h-full flex-col p-7 md:p-8">
              <div className="flex items-baseline gap-4">
                <span className="font-display text-sm font-semibold text-ember">{c.number}</span>
                <span
                  className="h-px flex-1 bg-gradient-to-r from-ember/40 to-transparent transition-all duration-500 group-hover:from-ember"
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold leading-snug tracking-tight text-paper">
                {c.title}
              </h3>
              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-mist">{c.body}</p>
              <p className="glass-rule mt-6 border-t pt-4 font-label text-[12px] font-semibold leading-snug text-paper/90">
                {c.proof}
              </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
