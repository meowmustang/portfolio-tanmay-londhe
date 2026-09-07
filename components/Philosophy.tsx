import { principles } from "@/lib/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-20 md:py-28">
      <div className="wrap">
        <SectionHeading
          eyebrow="Operating principles"
          title="Six rules every system is built on"
          lede="Not aspirations. Each of these is visible in the architecture of the case studies above, and each one exists because ignoring it cost someone time."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 0.06}>
              <div className="glass glass-hover group h-full p-7">
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
