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
 * The positioning statement, kept in one place so the hero, page metadata, and
 * the Open Graph card can never drift apart.
 */
export const positioning = {
  descriptor: "AI Transformation · Automation · Business Systems",
  tagline: "I turn business problems into AI-powered systems.",
  supporting:
    "I work at the intersection of business and technology — understanding how work gets done, identifying where AI and automation can create leverage, and turning those opportunities into systems that people actually use.",
  primaryCta: "View my work",
  secondaryCta: "Download resume",
};

/**
 * Every figure here traces to the internal delivery tracker mirrored in
 * lib/portfolio.ts, or to a case study that states its own measurement window.
 * Nothing is estimated in aggregate.
 */
export const impactStats = [
  {
    value: 3897,
    suffix: "",
    label: "Hours of manual work removed per year",
    note: "Totalled per automation from real annual volumes and measured minutes per unit",
  },
  {
    value: 18,
    suffix: "",
    label: "AI and automation initiatives",
    note: "Twelve live in production, three in build, three in design or on hold",
  },
  {
    value: 9,
    suffix: "",
    label: "Business functions served",
    note: "Finance, direct tax, tax, payments, cost control, CRM, receivables, retail, IT",
  },
  {
    value: 26000,
    suffix: "",
    label: "Tax certificates issued a year, unattended",
    note: "Roughly 6,500 per quarter, generated, secured, and distributed in-house",
  },
  {
    value: 94339,
    suffix: "",
    label: "Items processed by the ORBIT platform",
    note: "Across 209 recorded runs in a three-month pilot, with zero run failures",
  },
  {
    value: 2,
    suffix: ".2 FTE",
    label: "Of capacity returned to the business",
    note: "3,897 hours a year at 1,800 productive hours per person",
  },
];

/**
 * How the work actually proceeds. The order is the differentiator: AI is a
 * decision made at step four, not a starting assumption.
 */
export const howIThink = {
  headline: "I don't start with AI. I start with the process.",
  lede: "Most automation programmes fail at the first step and the last: nobody mapped how the work really happens, and nobody measured whether anything changed. Choosing the technology is the easy part in the middle.",
  steps: [
    {
      step: "01",
      title: "Understand",
      body: "Map how the work actually happens, not how the process document says it does.",
      icon: "search",
    },
    {
      step: "02",
      title: "Diagnose",
      body: "Find the bottlenecks, the repetition, and the points where a person is genuinely deciding something.",
      icon: "activity",
    },
    {
      step: "03",
      title: "Prioritise",
      body: "Weigh impact against feasibility, risk, and whether the team will actually adopt it.",
      icon: "target",
    },
    {
      step: "04",
      title: "Design",
      body: "Decide what to automate, what to augment with AI, and what should stay a human judgement.",
      icon: "blocks",
    },
    {
      step: "05",
      title: "Build",
      body: "Turn the design into a working system, starting from the core that proves the value.",
      icon: "code",
    },
    {
      step: "06",
      title: "Deploy",
      body: "Move from prototype to production with real users, real controls, and real integrations.",
      icon: "rocket",
    },
    {
      step: "07",
      title: "Measure",
      body: "Quantify what changed with the business, in hours, error rates, and cycle time.",
      icon: "trending",
    },
  ],
} as const;

/**
 * The three-layer position. This is the answer to "why not just hire a
 * developer, or a consultant".
 */
export const intersection = {
  lede: "I operate between business requirements and technical execution, translating ambiguous operational problems into practical AI and automation systems.",
  layers: [
    {
      label: "Business",
      items: ["Requirements", "Processes", "Strategy", "Stakeholders"],
    },
    {
      label: "AI",
      items: ["LLMs", "Document intelligence", "Confidence scoring", "Decision support"],
    },
    {
      label: "Technology",
      items: ["Automation", "APIs", "Data", "Enterprise systems"],
    },
  ],
} as const;

export const about = {
  headline: "I sit at the intersection of business, technology and AI.",
  paragraphs: [
    "My work focuses on understanding how organisations operate, finding where technology can create meaningful leverage, and turning those opportunities into solutions that people actually use.",
    "My experience spans enterprise workflows across Finance, Direct Tax, Payments, Cost Control, Receivables, CRM and Retail operations, with a focus on AI, automation, process redesign and implementation.",
    "The common thread is ownership. I gather requirements from the people who run the process, size the opportunity before choosing a technology, build the system, run UAT on real data, and stay accountable through production until the impact can be stated as a number.",
  ],
};

/**
 * Stages rather than dates: the source portfolio and resume do not carry
 * verified start and end dates for each step. [VERIFY] dates before adding them.
 */
export const journey = [
  {
    period: "Starting point",
    title: "Engineering and operations",
    body: "Began in operations-focused engineering, close enough to real processes to see where they strained and who absorbed the cost.",
  },
  {
    period: "The observation",
    title: "Seeing the same pattern",
    body: "Capable teams losing whole days to repetitive document handling, manual reconciliation, and data movement that software could absorb.",
  },
  {
    period: "The move",
    title: "Into Business Applications",
    body: "Moved into Business Applications to work the problems directly: turning stakeholder pain into requirements, and requirements into working systems.",
  },
  {
    period: "The build years",
    title: "Automation and AI in production",
    body: "Delivered a portfolio across finance, tax, payments and compliance, each taken from problem discovery through UAT to daily production use.",
  },
  {
    period: "The shift",
    title: "From tools to platforms",
    body: "Scope widened from single-team utilities to multi-module platforms serving several functions, with vendors and leadership stakeholders in the loop.",
  },
  {
    period: "Today",
    title: "Senior Executive, Business Applications",
    body: "Own enterprise automation and AI initiatives end to end: finding the gaps, architecting the solutions, coordinating vendors, and reporting measured impact.",
  },
];

/**
 * Grouped by capability rather than listed as keywords.
 *
 * Deliberately excluded, because the source material does not support them:
 * RAG and vector retrieval (no vector store or retrieval layer exists in any
 * project), and "AI agents" as a shipped capability — an agentic rebuild is a
 * documented roadmap direction, and the LLM repair layer that exists today is
 * built but disabled. Add either only once there is a project behind it.
 */
export const capabilities = [
  {
    group: "AI",
    items: [
      "Document intelligence & OCR",
      "On-premise LLM deployment",
      "Prompt engineering",
      "Confidence-scored extraction",
      "Human-in-the-loop design",
      "AI opportunity assessment",
    ],
  },
  {
    group: "Automation",
    items: [
      "Workflow automation",
      "Process orchestration",
      "SAP GUI automation",
      "Python automation",
      "Unattended scheduling",
      "API integration",
    ],
  },
  {
    group: "Data",
    items: [
      "SQL",
      "Python",
      "Excel & VBA",
      "Power BI",
      "Validation & matching engines",
      "Reporting pipelines",
    ],
  },
  {
    group: "Enterprise",
    items: [
      "Business process design",
      "Requirements gathering",
      "Solution architecture",
      "Enterprise integration",
      "UAT & rollout",
      "Stakeholder management",
    ],
  },
  {
    group: "Transformation",
    items: [
      "Process discovery",
      "AI opportunity identification",
      "Solution design",
      "Implementation ownership",
      "Change & adoption",
      "Impact measurement",
    ],
  },
];

/**
 * Kept short by design. These acknowledgements evidence adoption, which is the
 * only real proof that an internal system worked.
 */
export const recognition = [
  {
    source: "Direct Tax team",
    context: "TDS Flow Engine",
    quote:
      "Formal appreciation for transforming the quarterly certificate cycle: weeks of manual effort replaced by a secure, fully in-house workflow.",
  },
  {
    source: "Senior management",
    context: "Enterprise automation programme",
    quote:
      "Leadership endorsement of the automation mandate after early flagship deliveries, establishing the charter to find gaps and build solutions across functions.",
  },
  {
    source: "Finance and Payments",
    context: "ReportGenie",
    quote:
      "Unsolicited formal appreciation for unattended daily report delivery, recorded as a project success.",
  },
  {
    source: "Finance and Accounts leadership",
    context: "GV Hub",
    quote:
      "Entrusted with a mandate to replace legacy voucher tracking with an enterprise platform, delivered prototype-first with a working core live.",
  },
];

export const contact = {
  headline: "Have a business process worth rethinking?",
  body: "I'm interested in problems where AI and automation can create measurable leverage. Describe how the process runs today and what it costs you, and I'll tell you what I think is worth changing.",
  cta: "Let's talk",
};
