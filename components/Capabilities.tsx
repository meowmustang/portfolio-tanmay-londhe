import { capabilities } from "@/lib/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Capabilities() {
  return (
    <section id="capabilities" className="py-20 md:py-28">
      <div className="wrap">
        <SectionHeading
          eyebrow="Capabilities"
          title="Grouped by what they deliver"
          lede="Every item here is behind at least one system in production. Retrieval-augmented generation and autonomous agents are deliberately absent: an agentic rebuild is a documented roadmap direction, not something I have shipped."
        />

        <Reveal className="mt-12">
          <div className="glass divide-y divide-white/[0.07] p-2 sm:p-4">
            {capabilities.map((c) => (
              <div
                key={c.group}
                className="grid gap-3 px-3 py-6 md:grid-cols-[180px_1fr] md:gap-10"
              >
                <h3 className="font-display text-lg font-semibold text-paper">{c.group}</h3>
                <ul className="flex flex-wrap gap-2">
                  {c.items.map((item) => (
                    <li
                      key={item}
                      className="glass-chip px-4 py-1.5 font-label text-[13px] font-semibold text-mist transition-colors hover:border-ember/40 hover:text-paper"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
