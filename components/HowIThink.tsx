import { Search, Activity, Target, Blocks, Code2, Rocket, TrendingUp } from "lucide-react";
import { howIThink } from "@/lib/content";
import Reveal from "./Reveal";

const ICONS = {
  search: Search,
  activity: Activity,
  target: Target,
  blocks: Blocks,
  code: Code2,
  rocket: Rocket,
  trending: TrendingUp,
} as const;

export default function HowIThink() {
  return (
    <section id="approach" className="py-20 md:py-28">
      <div className="wrap">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">How I think</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-paper md:text-[2.6rem]">
            {howIThink.headline}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-mist md:text-lg">{howIThink.lede}</p>
        </Reveal>

        <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {howIThink.steps.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <li key={s.step} className="contents">
                <Reveal delay={i * 0.05}>
                  <div className="glass glass-hover group flex h-full flex-col p-6">
                    <div className="flex items-center justify-between">
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-ember transition-colors group-hover:border-ember/40 group-hover:bg-ember/[0.14]"
                        aria-hidden="true"
                      >
                        <Icon size={17} strokeWidth={1.75} />
                      </span>
                      <span className="font-display text-[11px] font-semibold text-mist">
                        {s.step}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold leading-snug text-paper">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-mist">{s.body}</p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
