import Link from "next/link";
import { automations, portfolioTotals } from "@/lib/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

/** Sorted by hours returned, so the biggest contributors read first. */
const ranked = [...automations].sort((a, b) => (b.hours ?? -1) - (a.hours ?? -1));
const maxHours = Math.max(...ranked.map((a) => a.hours ?? 0));

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 md:py-28">
      <div className="wrap">
        <SectionHeading
          eyebrow="The wider portfolio"
          title="The full portfolio, from one delivery tracker"
          lede="Fifteen automations live or in build, plus three more in design. Eight are written up as full case studies; the rest are listed because a transformation record is the whole portfolio, not the highlights. Hours are the tracker's own figures: annual volume multiplied by measured minutes saved per unit."
        />

        <Reveal className="mt-12">
          <div className="glass overflow-hidden">
            {/* Column headers, desktop only — the mobile layout repeats labels inline. */}
            <div className="hidden grid-cols-[1.6fr_1.2fr_auto_9rem] items-center gap-4 border-b border-white/[0.07] px-6 py-3.5 md:grid">
              {["Automation", "Business function", "Status", "Hours / year"].map((h) => (
                <p
                  key={h}
                  className={`font-label text-[10px] font-semibold uppercase tracking-caps text-mist ${
                    h === "Hours / year" ? "text-right" : ""
                  }`}
                >
                  {h}
                </p>
              ))}
            </div>

            <ul className="divide-y divide-white/[0.06]">
              {ranked.map((a) => {
                const pct = a.hours ? Math.max(4, (a.hours / maxHours) * 100) : 0;
                return (
                  <li
                    key={a.name}
                    className="grid grid-cols-[1fr_auto] items-start gap-x-4 gap-y-1.5 px-5 py-4 transition-colors hover:bg-white/[0.03] md:grid-cols-[1.6fr_1.2fr_auto_9rem] md:items-center md:px-6"
                  >
                    <p className="font-label text-sm font-bold text-paper">
                      {a.slug ? (
                        <Link
                          href={`/solutions/${a.slug}/`}
                          className="group/link focus-ring inline-flex min-h-[24px] items-center gap-1.5 rounded-sm decoration-ember/50 underline-offset-4 transition-colors hover:text-ember hover:underline"
                        >
                          {a.name}
                          <span
                            className="font-normal text-ember/45 transition-colors group-hover/link:text-ember"
                            aria-hidden="true"
                          >
                            ↗
                          </span>
                        </Link>
                      ) : (
                        a.name
                      )}
                    </p>

                    <p className="col-start-1 text-[13px] text-mist md:col-start-2">{a.fn}</p>

                    <p className="col-start-2 row-start-1 justify-self-end md:col-start-3 md:row-auto">
                      <span
                        className={`inline-block rounded-full border px-2.5 py-0.5 font-label text-[10px] font-semibold uppercase tracking-wider ${
                          a.status === "Live"
                            ? "border-ember/40 bg-ember/[0.12] text-ember"
                            : "border-white/[0.12] bg-white/[0.04] text-mist"
                        }`}
                      >
                        {a.status}
                      </span>
                    </p>

                    <div className="col-span-2 md:col-span-1 md:col-start-4">
                      {a.hours ? (
                        <div className="flex items-center gap-3 md:justify-end">
                          <span
                            className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.07] md:max-w-[4.5rem]"
                            aria-hidden="true"
                          >
                            <span
                              className="block h-full rounded-full bg-gradient-to-r from-ember/50 to-ember"
                              style={{ width: `${pct}%` }}
                            />
                          </span>
                          <span className="shrink-0 font-display text-sm font-semibold tabular-nums text-paper">
                            {a.hours.toLocaleString("en-IN")}
                          </span>
                        </div>
                      ) : (
                        <span className="block text-[12px] text-mist md:text-right">
                          not yet measured
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] bg-white/[0.02] px-5 py-4 md:px-6">
              <p className="font-label text-[11px] font-semibold uppercase tracking-caps text-mist">
                {portfolioTotals.liveCount} live · {portfolioTotals.inBuildCount} in build ·{" "}
                {portfolioTotals.alsoInDesign} more in design
              </p>
              <p className="font-label text-sm font-bold text-paper">
                {portfolioTotals.hoursPerYear.toLocaleString("en-IN")} hours a year
                <span className="ml-2 font-semibold text-mist">
                  ≈ {portfolioTotals.fte.toFixed(1)} full-time people
                </span>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
