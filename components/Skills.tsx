import { skills } from "@/lib/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  return (
    <section id="skills" className="border-t border-seam bg-graphite py-24 md:py-32">
      <div className="wrap">
        <SectionHeading
          eyebrow="Capabilities"
          title="Skills, organized by what they deliver"
        />
        <div className="mt-14 divide-y divide-seam border-y border-seam">
          {skills.map((s, i) => (
            <Reveal key={s.group} delay={i * 0.04}>
              <div className="grid gap-4 py-7 md:grid-cols-[240px_1fr] md:gap-10">
                <h3 className="font-display text-lg font-semibold text-paper">{s.group}</h3>
                <ul className="flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-seam bg-charcoal px-4 py-1.5 font-label text-[13px] font-semibold text-mist transition-colors hover:border-ember/40 hover:text-paper"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
