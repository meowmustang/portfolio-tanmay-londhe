import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <p className="eyebrow">About</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight md:text-[2.6rem]">
            I read the process before I write the code
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
              those problems directly, and today I own enterprise automation and AI
              initiatives across finance, direct tax, payments, cost control, receivables, and
              retail operations — working alongside leadership teams, business users,
              compliance stakeholders, technology vendors, and analytics partners.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p>
              My work sits deliberately between business and engineering, and the business
              half comes first. I gather requirements from the people who own a process,
              size the opportunity before choosing a technology, design architectures that
              are secure and auditable by construction, build the systems myself, run UAT
              with real users on real data, and stay accountable through production —
              measuring the impact rather than assuming it.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-paper">
              The result is a portfolio of production systems with one common trait: the
              business runs them willingly. Every one of them is still in daily use, because
              they were built for adoption — not just deployment.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
