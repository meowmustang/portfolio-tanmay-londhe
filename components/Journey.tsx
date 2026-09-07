import { journey } from "@/lib/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Journey() {
  return (
    <section id="journey" className="py-20 md:py-28">
      <div className="wrap">
        <SectionHeading
          eyebrow="Career journey"
          title="From operations floor to transformation lead"
          lede="A deliberate progression — each stage built the vocabulary for the next."
        />
        <ol className="glass-rule relative mt-14 space-y-0 border-l pl-8 md:pl-12">
          {journey.map((j, i) => (
            <li key={j.title} className="relative pb-12 last:pb-0">
              <span
                className={`absolute -left-8 top-1 h-2.5 w-2.5 -translate-x-1/2 rounded-full md:-left-12 ${
                  i === journey.length - 1
                    ? "bg-ember shadow-[0_0_16px_rgba(255,132,0,0.7)]"
                    : "bg-white/25 ring-4 ring-ink"
                }`}
                aria-hidden="true"
              />
              <Reveal delay={i * 0.04}>
                <p className="font-label text-[11px] font-semibold uppercase tracking-caps text-mist">
                  {j.period}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-paper">{j.title}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mist md:text-base">{j.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
