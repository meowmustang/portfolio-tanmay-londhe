import { about, journey } from "@/lib/content";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <p className="eyebrow">About</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-paper md:text-[2.4rem]">
              {about.headline}
            </h2>
          </Reveal>

          <div className="space-y-6 text-base leading-relaxed text-mist md:text-lg">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.05 + i * 0.05}>
                <p className={i === about.paragraphs.length - 1 ? "text-paper/90" : undefined}>
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Timeline: stages rather than dates, because dates are not verified. */}
        <Reveal className="mt-16">
          <p className="font-label text-[11px] font-semibold uppercase tracking-caps text-mist">
            The path here
          </p>
        </Reveal>
        <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {journey.map((j, i) => (
            <li key={j.title} className="contents">
              <Reveal delay={(i % 3) * 0.05}>
                <div className="glass glass-hover flex h-full flex-col p-6">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                        i === journey.length - 1
                          ? "bg-ember shadow-[0_0_10px_rgba(255,132,0,0.9)]"
                          : "bg-white/30"
                      }`}
                      aria-hidden="true"
                    />
                    <p className="font-label text-[11px] font-semibold uppercase tracking-caps text-mist">
                      {j.period}
                    </p>
                  </div>
                  <h3 className="mt-3 font-display text-base font-semibold leading-snug text-paper">
                    {j.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{j.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
