import { philosophy } from "@/lib/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-24 md:py-32">
      <div className="wrap">
        <SectionHeading
          eyebrow="Engineering philosophy"
          title="Principles every system is built on"
          lede="These are not aspirations — each principle is visible in the architecture of the case studies above."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {philosophy.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 0.06}>
              <div className="group h-full rounded-2xl border border-seam bg-charcoal p-7 transition-all duration-300 hover:-translate-y-1 hover:border-ember/40">
                <h3 className="font-display text-lg font-semibold leading-snug text-paper">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{p.body}</p>
                <span className="mt-5 block h-px w-8 bg-ember/40 transition-all duration-500 group-hover:w-14 group-hover:bg-ember" aria-hidden="true" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
