import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <p className="eyebrow">About</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight md:text-[2.6rem]">
            A business-focused technology professional
          </h2>
        </Reveal>
        <div className="space-y-6 text-base leading-relaxed text-mist md:text-lg">
          <Reveal delay={0.05}>
            <p>
              I started my career in operations-focused engineering — close enough to real
              processes to see where they strained. What I kept noticing was a pattern:
              capable teams losing whole days to repetitive document handling, manual
              reconciliation, and data movement that software could quietly absorb.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              That observation became a career. I moved into Business Applications to work on
              those problems directly, and today I lead enterprise automation and AI
              initiatives across finance, direct tax, payments, cost control, receivables, and
              retail operations — working alongside leadership teams, business users,
              compliance stakeholders, technology vendors, and analytics partners.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p>
              My work sits deliberately between business and engineering. I gather
              requirements from the people who own a process, design architectures that are
              secure and auditable by construction, build the systems myself, run UAT with
              real users on real data, and stay accountable through production — measuring the
              impact rather than assuming it.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-paper">
              The result is a portfolio of production systems with one common trait: the
              business runs them willingly, because they were built for adoption — not just
              deployment.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
