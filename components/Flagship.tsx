import Link from "next/link";
import { getSolution } from "@/lib/solutions";
import Reveal from "./Reveal";

/** The platform contract, drawn as a stack so the thesis is visible, not just described. */
const layers = [
  {
    label: "Portal",
    detail: "Catalogue · dashboard · analytics · audit · executive weekly update",
    tone: "top",
  },
  {
    label: "Tools",
    detail: "Seven isolated applications — own process, own dependencies, own screens",
    tone: "tools",
  },
  {
    label: "Shared contract",
    detail: "Identity · jobs · usage tracking · audit · rate limiting · redaction",
    tone: "contract",
  },
  {
    label: "Foundation",
    detail: "Enterprise SSO · on-premise host · local AI inference · no data egress",
    tone: "base",
  },
];

export default function Flagship() {
  const s = getSolution("orbit");
  if (!s) return null;

  return (
    <section id="orbit" className="relative py-20 md:py-28">
      {/* This is the one section that should stop the scroll, so it gets its own light. */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[min(100%,60rem)] -translate-x-1/2 rounded-full bg-ember/[0.10] blur-[120px]"
        aria-hidden="true"
      />

      <div className="wrap relative">
        <Reveal>
          <div className="glass-lit overflow-hidden p-7 sm:p-9 md:p-11">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-ember px-3 py-1 font-label text-[10px] font-bold uppercase tracking-caps text-ink shadow-[0_6px_20px_-6px_rgba(255,132,0,0.8)]">
                Flagship
              </span>
              <p className="font-label text-[11px] font-semibold uppercase tracking-caps text-mist">
                {s.category} · {s.status}
              </p>
            </div>

            <div className="mt-7 grid gap-9 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
              <div>
                <h2 className="font-display text-[2.5rem] font-semibold leading-none tracking-tight text-paper md:text-[4rem]">
                  ORBIT
                </h2>
                <p className="mt-2.5 font-label text-sm font-semibold text-ember">
                  Your workspace for AI, automation &amp; beyond
                </p>
                <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-paper/90">
                  {s.tagline}
                </p>
                <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-mist">
                  Every automation win used to ship as a script on one person&apos;s machine.
                  Nobody could see what existed, request access, or answer the only question
                  leadership actually asked — what has this programme returned to the business.
                  So I stopped building tools and built the platform they run on.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/solutions/${s.slug}/`}
                    className="focus-ring rounded-full bg-ember px-6 py-3 font-label text-sm font-bold text-ink shadow-[0_10px_30px_-12px_rgba(255,132,0,0.7)] transition-transform hover:-translate-y-0.5"
                  >
                    Read the full case study →
                  </Link>
                  <Link
                    href="/#solutions"
                    className="glass-chip focus-ring px-6 py-3 font-label text-sm font-semibold text-paper transition-colors hover:border-white/25"
                  >
                    See the other seven
                  </Link>
                </div>
              </div>

              {/* The platform stack */}
              <div>
                <p className="font-label text-[10px] font-semibold uppercase tracking-caps text-mist">
                  The platform contract
                </p>
                <div className="mt-4 space-y-2">
                  {layers.map((l) => (
                    <div
                      key={l.label}
                      className={
                        l.tone === "contract"
                          ? "rounded-xl border border-ember/40 bg-ember/[0.10] p-4"
                          : "rounded-xl border border-white/[0.09] bg-white/[0.04] p-4"
                      }
                    >
                      {l.tone === "tools" ? (
                        <>
                          <p className="font-label text-[13px] font-bold text-paper">{l.label}</p>
                          <div className="mt-2.5 flex gap-1.5" aria-hidden="true">
                            {Array.from({ length: 7 }).map((_, n) => (
                              <span
                                key={n}
                                className="h-6 flex-1 rounded-md border border-white/[0.09] bg-white/[0.03]"
                              />
                            ))}
                          </div>
                          <p className="mt-2.5 text-[12px] leading-snug text-mist">{l.detail}</p>
                        </>
                      ) : (
                        <>
                          <p
                            className={`font-label text-[13px] font-bold ${
                              l.tone === "contract" ? "text-ember" : "text-paper"
                            }`}
                          >
                            {l.label}
                          </p>
                          <p className="mt-1.5 text-[12px] leading-snug text-mist">{l.detail}</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-[12px] leading-relaxed text-mist">
                  A tool owns its logic and its screens. It owns nothing else. Adding one is a
                  template copy and a single catalogue row — no portal change, no restart. The
                  seventh joined a live platform that way, and the portal source never mentions
                  it.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Outcomes */}
        <Reveal delay={0.12}>
          <dl className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {s.headlineMetrics.map((m) => (
              <div key={m.label} className="glass p-6">
                <dt className="sr-only">{m.label}</dt>
                <dd>
                  <span className="block font-display text-[1.7rem] font-semibold leading-none tracking-tight text-paper">
                    {m.value}
                  </span>
                  <span className="mt-3 block text-[13px] leading-snug text-mist">{m.label}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs leading-relaxed text-mist">
            Platform-recorded figures from the pilot window, June to September 2026. Four of the
            tools entered production in the final week of that period, so these totals describe
            days rather than months.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
