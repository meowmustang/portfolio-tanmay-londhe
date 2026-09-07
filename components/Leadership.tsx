import { leadership } from "@/lib/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Leadership() {
  return (
    <section id="leadership" className="py-20 md:py-28">
      <div className="wrap">
        <SectionHeading
          eyebrow="Leadership & collaboration"
          title="Technology work is people work"
          lede="Every system here shipped because stakeholders, vendors, and business users were part of the design — not an afterthought to it."
        />
        <div className="mt-12 grid gap-x-10 gap-y-9 md:grid-cols-2 lg:grid-cols-3">
          {leadership.map((l, i) => (
            <Reveal key={l.title} delay={(i % 3) * 0.06}>
              <h3 className="flex items-center gap-3 font-display text-lg font-semibold text-paper">
                <span className="h-1.5 w-1.5 rounded-full bg-ember" aria-hidden="true" />
                {l.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mist">{l.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
