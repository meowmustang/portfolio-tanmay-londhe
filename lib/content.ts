export const site = {
  name: "Tanmay Londhe",
  role: "Senior Executive – Business Applications",
  location: "Mumbai, India",
  email: "tanmay.londhe.2029@gmail.com", // TODO: replace with your real email
  linkedin: "https://www.linkedin.com/in/tanmay-londhe/", // TODO: replace with your real LinkedIn URL
  resumeFile: "/resume/Tanmay_Londhe_Resume.docx",
  photo: "/photo/tanmay-londhe.jpg", // ← add this line
};

export const impactStats = [
  { value: 7, suffix: "+", label: "Enterprise solutions delivered", note: "Designed, built, and shipped end to end" },
  { value: 6, suffix: "+", label: "Business functions supported", note: "Finance, tax, payments, cost control, receivables, retail" },
  { value: 6, suffix: "", label: "Production systems in daily use", note: "Running unattended with full audit trails" },
  { value: 95, suffix: "%", label: "Effort reduction on key processes", note: "Weeks of manual work compressed to hours" },
  { value: 10, suffix: "K+", label: "Documents processed intelligently", note: "OCR, validation, and AI-assisted extraction" },
  { value: 12, suffix: "+", label: "Cross-functional initiatives led", note: "From requirement to adoption and measurement" },
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
    title: "Cross-functional footprint",
    body: "Scope widened from single-team tools to platforms serving multiple functions, with vendors, analytics partners, and leadership stakeholders in the loop.",
  },
  {
    period: "The recognition",
    title: "Senior Executive – Business Applications",
    body: "Promoted to Senior Executive, with responsibility for enterprise automation initiatives, AI-powered solutions, and digital transformation projects.",
  },
  {
    period: "Today",
    title: "Driving digital transformation",
    body: "Currently leading transformation initiatives end to end — identifying gaps, architecting solutions, coordinating vendors, and measuring the business impact of what ships.",
  },
];

export const process = [
  { step: "01", title: "Identify the business challenge", body: "Find the real gap — usually hiding inside a routine everyone assumes has to be manual." },
  { step: "02", title: "Understand stakeholder requirements", body: "Sit with the people who own the process. Their edge cases become the specification." },
  { step: "03", title: "Analyze the existing process", body: "Map how work actually flows today — inputs, exceptions, handoffs, and where errors are born." },
  { step: "04", title: "Design the solution architecture", body: "Choose the simplest architecture that is secure, auditable, and built to extend." },
  { step: "05", title: "Build the MVP", body: "Ship a working core fast. Real usage teaches more than any requirements document." },
  { step: "06", title: "Conduct UAT", body: "Validate with business users on real data, in controlled batches, before anything goes live." },
  { step: "07", title: "Deploy the solution", body: "Move to production with monitoring, run summaries, and a clear operating playbook." },
  { step: "08", title: "Measure business impact", body: "Quantify the outcome with the business — hours returned, errors eliminated, trust earned." },
];

export const philosophy = [
  { title: "Business value first", body: "Technology choices are downstream of the business problem. If the outcome isn't measurable, the solution isn't finished." },
  { title: "Automation should be trustworthy", body: "Run summaries, status classifications, and full logs are built into every system — trust is an architectural feature." },
  { title: "AI should enhance, not replace", body: "Deterministic rules do the heavy lifting; AI serves as a strictly validated safety net and an assistant to human judgment." },
  { title: "Privacy by design", body: "Sensitive documents are processed locally, on-premise, with zero external API exposure — including locally hosted AI models." },
  { title: "Auditability matters", body: "Every run leaves a trail: what was processed, what succeeded, what failed, and why. Auditors are users too." },
  { title: "Human-in-the-loop thinking", body: "Systems route uncertainty to people through confidence scores and review tags, instead of pretending to be perfect." },
  { title: "Scalable architecture", body: "Config over code, reusable helpers, and data models designed to extend — adding scope should be data entry, not development." },
  { title: "Platform thinking", body: "Individual tools share scaffolding and grow into suites; suites grow into platforms that outlive their first use case." },
  { title: "Build for adoption, not just deployment", body: "A solution succeeds when the business runs it willingly. UAT discipline, training, and stakeholder ownership are part of the build." },
];

export const skills = [
  {
    group: "AI & Automation",
    items: ["OCR & document intelligence", "Workflow automation", "Prompt engineering", "Local LLM deployment", "Confidence-scored extraction"],
  },
  {
    group: "Microsoft Ecosystem",
    items: ["Power Automate", "Power Apps", "SharePoint architecture", "Excel VBA", "Outlook automation"],
  },
  {
    group: "Data & Analytics",
    items: ["Power BI", "SQL", "Python", "Data validation & matching", "Reporting pipelines"],
  },
  {
    group: "Enterprise Systems",
    items: ["SAP GUI automation", "Business applications", "System integration", "Unattended execution"],
  },
  {
    group: "Solution Design",
    items: ["Requirements analysis", "Solution architecture", "Vendor management", "Stakeholder communication", "UAT & rollout planning"],
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
