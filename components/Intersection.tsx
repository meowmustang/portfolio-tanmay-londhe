import { intersection, site } from "@/lib/content";
import Reveal from "./Reveal";

/**
 * The three-layer position, drawn as a stack with the name in the middle.
 * This is the answer to "why not just hire a developer, or a consultant".
 */
export default function Intersection() {
  return (
    <section id="intersection" className="relative py-20 md:py-28">
      <div
        className="pointer-events-none absolute left-1/2 top-1/4 h-[340px] w-[min(100%,46rem)] -translate-x-1/2 rounded-full bg-ember/[0.08] blur-[110px]"
        aria-hidden="true"
      />

      <div className="wrap relative">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Business × AI × Technology</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-paper md:text-[2.6rem]">
            Most people sit on one side of this. I work across all three.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-mist md:text-lg">{intersection.lede}</p>
        </Reveal>

        <Reveal delay={0.08} className="mt-12">
          <div className="mx-auto max-w-3xl space-y-3">
            {/* Business layer */}
            <Layer layer={intersection.layers[0]} />

            <Connector />

            {/* The person in the middle: the whole point of the diagram. */}
            <div className="glass-lit flex flex-col items-center gap-1 px-6 py-5 text-center">
              <p className="font-display text-xl font-semibold tracking-tight text-ember md:text-2xl">
                {site.name}
              </p>
              <p className="font-label text-[11px] font-semibold uppercase tracking-caps text-mist">
                Translation layer
              </p>
            </div>

            <Connector />

            {/* AI layer */}
            <Layer layer={intersection.layers[1]} accent />

            <Connector />

            {/* Technology layer */}
            <Layer layer={intersection.layers[2]} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Layer({
  layer,
  accent = false,
}: {
  layer: { readonly label: string; readonly items: readonly string[] };
  accent?: boolean;
}) {
  return (
    <div
      className={
        accent
          ? "rounded-2xl border border-ember/35 bg-ember/[0.08] p-5"
          : "glass p-5"
      }
    >
      <p
        className={`font-label text-[11px] font-bold uppercase tracking-caps ${
          accent ? "text-ember" : "text-paper"
        }`}
      >
        {layer.label}
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {layer.items.map((item) => (
          <li
            key={item}
            className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 font-label text-[12px] font-semibold text-mist"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Connector() {
  return (
    <div className="flex justify-center" aria-hidden="true">
      <span className="h-5 w-px bg-gradient-to-b from-ember/60 to-ember/10" />
    </div>
  );
}
