export const site = {
  name: "Tanmay Londhe",
  role: "Senior Executive – Business Applications",
  company: "Oberoi Realty",
  location: "Mumbai, India",
  email: "tanmay.londhe.2029@gmail.com",
  linkedin: "https://www.linkedin.com/in/tanmay-londhe/",
  resumeFile: "/resume/Tanmay-Londhe-Resume.pdf",
  photo: "/photo/tanmay-londhe.jpg",
  // Canonical origin used for metadata, Open Graph, and JSON-LD.
  // Override with NEXT_PUBLIC_SITE_URL when a custom domain is attached.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://meowmustang.github.io/portfolio-tanmay-londhe",
};

/**
 * The positioning statement, kept in one place so the hero, metadata, and
 * Open Graph card never drift apart.
 */
export const positioning = {
  eyebrow: "AI Transformation & Intelligent Automation",
  // Non-breaking space keeps the em dash attached to "done" on narrow screens.
  headlineLead: "I find how the work actually gets done —",
  headlineAccent: "then build the systems that do it better",
  subhead:
    "Fifteen automations live or in build across finance, direct tax, payments, compliance, and retail, together returning close to 3,900 hours a year. Each one started as a conversation about a process nobody thought could change. Eight are written up here end to end.",
  // The operating loop. This is the differentiator, so it is stated up front.
  loop: [
    { label: "Find the work", icon: "search" },
    { label: "Size the prize", icon: "target" },
    { label: "Design & build", icon: "blocks" },
    { label: "Land the adoption", icon: "users" },
    { label: "Measure the impact", icon: "trending" },
  ] as const,
};

/**
 * Business-outcome metrics rather than activity counts.
 * Kept deliberately non-confidential: ratios, cycle times, and coverage —
 * never absolute revenue or client-identifying figures.
 */
export const impactStats = [
  {
    value: 3897,
    suffix: "",
    label: "Hours of manual work removed every year",
    note: "Totalled per automation from real volumes and measured time-per-unit, not estimated in aggregate",
  },
  {
    value: 15,
    suffix: "+",
    label: "Automations live or in build",
    note: "Twelve running in production today, three more under construction",
  },
  {
    value: 95,
    suffix: "%",
    label: "Effort removed from the processes automated",
    note: "A two-week quarterly cycle now completes in under a supervised day",
  },
  {
    value: 100,
    suffix: "%",
    label: "Of delivered systems still in daily use",
    note: "Nothing built has been abandoned — adoption is designed in, not hoped for",
  },
  {
    value: 10,
    suffix: "K+",
    label: "Documents processed without manual keying",
    note: "OCR, rule-based validation, and confidence-scored AI extraction",
  },
  {
    value: 9,
    suffix: "",
    label: "Business functions running on these systems",
    note: "Finance, direct tax, payments, cost control, receivables, CRM, retail, and IT",
  },
];

/**
 * The three-part value proposition — what this actually looks like as a service.
 */
export const capabilities = [
  {
    number: "01",
    title: "Find how the work actually gets done",
    body: "Documented process and real process are different things. I sit with the people who own a routine, map the inputs, exceptions, and handoffs as they truly happen, and find the cost hiding inside a habit everyone assumes is permanent.",
    proof: "Every system here began as an observation, not a ticket.",
  },
  {
    number: "02",
    title: "Decide where AI and automation change the economics",
    body: "Not every process deserves automation, and not every problem deserves AI. I size the prize first — hours, error rates, risk, cycle time — then choose the lightest architecture that moves it. Deterministic rules where correctness matters, AI where judgement or ambiguity does.",
    proof: "Rules carry the load; AI handles what rules cannot read.",
  },
  {
    number: "03",
    title: "Build it, land it, and prove it moved",
    body: "I build the system myself, run UAT with real users on real data, roll out in phases, and stay accountable through production. Then I quantify the outcome with the business — because a solution nobody measures is indistinguishable from one that did not work.",
    proof: "Owned end to end, from first conversation to production monitoring.",
  },
];

export const journey = [
  {
    period: "The starting point",
    title: "Engineering & operations",
    body: "Started in operations-focused engineering — close to real processes, real constraints, and the people who run them. That ground-level view became a permanent advantage.",
  },
  {
    period: "The observation",
    title: "Seeing the inefficiencies",
    body: "Kept noticing the same pattern: capable teams spending their days on repetitive document handling, manual reconciliation, and data movement that software could absorb.",
  },
  {
    period: "The transition",
    title: "Into Business Applications",
    body: "Moved into Business Applications to work on the problems directly — translating stakeholder pain into requirements, and requirements into working systems.",
  },
  {
    period: "The build years",
    title: "Automation & AI in production",
    body: "Delivered a portfolio of automation and AI solutions across finance, tax, payments, and compliance — each one taken from problem discovery through UAT to daily production use.",
  },
  {
    period: "The expansion",
    title: "From tools to platforms",
    body: "Scope widened from single-team utilities to multi-module platforms serving several functions, with vendors, analytics partners, and leadership stakeholders in the loop.",
  },
  {
    period: "The recognition",
    title: "Senior Executive – Business Applications",
    body: "Promoted to Senior Executive, with responsibility for enterprise automation initiatives, AI-powered solutions, and digital transformation projects.",
  },
  {
    period: "Today",
    title: "Owning the transformation agenda",
    body: "Leading initiatives end to end — finding the gaps, architecting the solutions, coordinating vendors, and reporting the business impact of what ships.",
  },
];

export const method = [
  { step: "01", title: "Identify the business challenge", body: "Find the real gap — usually hiding inside a routine everyone assumes has to be manual." },
  { step: "02", title: "Understand stakeholder requirements", body: "Sit with the people who own the process. Their edge cases become the specification." },
  { step: "03", title: "Analyse the existing process", body: "Map how work actually flows today — inputs, exceptions, handoffs, and where errors are born." },
  { step: "04", title: "Design the solution architecture", body: "Choose the simplest architecture that is secure, auditable, and built to extend." },
  { step: "05", title: "Build the MVP", body: "Ship a working core fast. Real usage teaches more than any requirements document." },
  { step: "06", title: "Conduct UAT", body: "Validate with business users on real data, in controlled batches, before anything goes live." },
  { step: "07", title: "Deploy the solution", body: "Move to production with monitoring, run summaries, and a clear operating playbook." },
  { step: "08", title: "Measure business impact", body: "Quantify the outcome with the business — hours returned, errors eliminated, trust earned." },
];

/**
 * Six operating principles, each visible in the architecture of the case studies.
 */
export const principles = [
  {
    title: "Business value decides the technology",
    body: "The architecture is downstream of the business problem, never the reverse. If the outcome cannot be measured, the solution is not finished — it is just deployed.",
  },
  {
    title: "Trust is an architectural feature",
    body: "Run summaries, status classifications, exception reports, and complete logs are built in from the first version. Auditors are users too, and a system the business cannot verify is a system it will quietly stop using.",
  },
  {
    title: "Deterministic core, AI at the edges",
    body: "Rules do the heavy lifting where correctness is non-negotiable. AI handles ambiguity — reading an unfamiliar layout, interpreting a human phrasing — behind strict validation, with confidence scores that route uncertainty to a person instead of pretending to be perfect.",
  },
  {
    title: "Privacy by construction",
    body: "Sensitive financial and tax documents are processed on-premise with zero external API exposure, including locally hosted AI models. This is a design constraint accepted up front, not a compliance patch applied later.",
  },
  {
    title: "Build platforms, not tools",
    body: "Config over code, shared scaffolding, and data models designed to extend. Adding a new report, entity, or location should be data entry — not a development cycle. Tools grow into suites; suites outlive their first use case.",
  },
  {
    title: "Adoption is the deliverable",
    body: "A system succeeds when the business runs it willingly. UAT discipline, phased rollout, training, and stakeholder ownership are part of the build — not a handover afterthought.",
  },
];

export const skills = [
  {
    group: "AI & applied intelligence",
    items: [
      "Document intelligence & OCR",
      "Private / on-premise LLM deployment",
      "Prompt engineering",
      "Confidence-scored extraction",
      "Human-in-the-loop design",
      "Agentic workflow design",
    ],
  },
  {
    group: "Automation & orchestration",
    items: [
      "Power Automate",
      "Python automation",
      "SAP GUI automation",
      "Unattended scheduling",
      "Exception & retry design",
      "Excel VBA",
    ],
  },
  {
    group: "Product & platform design",
    items: [
      "Solution architecture",
      "Requirements analysis",
      "Data modelling",
      "Multi-module platform design",
      "Approval & maker-checker workflows",
      "Role-based access design",
    ],
  },
  {
    group: "Data & reporting",
    items: ["Power BI", "SQL", "Python (pandas)", "Validation & matching engines", "Reporting pipelines"],
  },
  {
    group: "Delivery & change",
    items: [
      "Stakeholder management",
      "Vendor management",
      "UAT & phased rollout",
      "Training & adoption",
      "Impact measurement",
      "Security & VAPT readiness",
    ],
  },
];

export const leadership = [
  {
    title: "Vendor management",
    body: "Coordinating technology vendors and analytics partners — scoping engagements, reviewing deliverables, and keeping external work aligned with internal architecture standards.",
  },
  {
    title: "Stakeholder communication",
    body: "Translating between leadership priorities and ground-level operational reality, in both directions — from finance and tax teams to compliance and operations.",
  },
  {
    title: "Requirement gathering",
    body: "Turning conversations, complaints, and workarounds into structured requirements documents that engineering effort can actually be built against.",
  },
  {
    title: "Cross-functional coordination",
    body: "Running initiatives that span finance, tax, payments, cost control, customer relations, and retail operations — with each function's constraints respected in the design.",
  },
  {
    title: "Technology adoption",
    body: "Owning the last mile: UAT with real users, phased rollouts, training, and the follow-through that turns a deployed system into a used one.",
  },
  {
    title: "Solution ownership",
    body: "Accountable end to end — from the first problem statement through production monitoring, enhancement requests, and measured business impact.",
  },
];

export const recognition = [
  {
    source: "Direct Tax team",
    context: "TDS Flow Engine",
    quote: "Formal appreciation for transforming the quarterly certificate issuance cycle — weeks of manual effort replaced by a secure, fully in-house workflow.",
  },
  {
    source: "Senior management",
    context: "Enterprise automation program",
    quote: "Leadership endorsement of the automation mandate after early flagship deliveries — establishing the 'find the gap, build the solution' charter.",
  },
  {
    source: "Finance / Payments team",
    context: "ReportGenie",
    quote: "Unsolicited formal appreciation from the business for unattended daily report delivery — recorded as a project success and a foundation of trust.",
  },
  {
    source: "Cost Control team",
    context: "MSME Batch Validator",
    quote: "Acknowledged for compressing days of compliance verification into minutes, with stakeholder-requested enhancements delivered responsively.",
  },
  {
    source: "Cross-functional stakeholders",
    context: "Document intelligence platforms",
    quote: "Recognition from customer-facing and receivables teams for accuracy safeguards that keep bad data out of financial records.",
  },
  {
    source: "Finance & Accounts leadership",
    context: "GV Hub",
    quote: "Entrusted with a leadership mandate to replace legacy voucher tracking with an enterprise platform — delivered prototype-first, with a working core live.",
  },
];
