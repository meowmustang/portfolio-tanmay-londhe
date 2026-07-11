import { process } from "@/lib/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function HowIWork() {
  return (
    <section id="process" className="py-24 md:py-32">
      <div className="wrap">
        <SectionHeading
          eyebrow="How I work"
          title="From business challenge to measured impact"
          lede="The same eight-step discipline runs through every project in this portfolio. The order matters — it is why these systems get adopted, not just deployed."
        />
        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-seam bg-seam sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <li key={p.step} className="relative bg-charcoal">
              <Reveal delay={i * 0.05} className="group h-full p-7">
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-semibold text-ember">{p.step}</span>
                  {i < process.length - 1 && (
                    <span
                      className="hidden h-px w-8 bg-gradient-to-r from-seam to-ember/40 lg:block"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-paper">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{p.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
