export type Solution = {
  slug: string;
  name: string;
  category: string;
  status: string;
  functions: string;
  tagline: string;
  summary: string;
  focus: string[];
  problem: string;
  context: string[];
  challenges: string[];
  architecture: string[];
  stack: string[];
  journey: string[];
  impact: string[];
  lessons: string[];
  future: string[];
  /** Renders with flagship treatment on the homepage grid. */
  featured?: boolean;
  /** What I owned on this project. */
  role: string;
  /** Rough delivery window, for narrative sequencing. */
  timeline: string;
  /** 3-4 scannable outcomes shown as a strip at the top of the case study. */
  headlineMetrics: { value: string; label: string }[];
};

export const solutions: Solution[] = [
  {
    slug: "orbit",
    name: "ORBIT",
    category: "AI & Automation Platform",
    status: "Pilot in production · pre-general-release",
    functions: "Enterprise-wide · 11 departments",
    featured: true,
    role: "Platform owner — strategy, architecture, build, governance",
    timeline: "Jun – Sep 2026 · pilot live",
    tagline:
      "The platform that turned a drawer of desktop scripts into a governed, measured, self-service automation estate.",
    summary:
      "An on-premise web platform that consolidates an enterprise's finance, tax, and operations automations into one authenticated portal. It replaces scripts and packaged executables — each owned by one person on one machine — with self-service tools behind single sign-on, governed by role-based access, per-object ownership checks, a non-erasable audit trail, and usage instrumentation that reports work completed and manual effort removed per tool, per person, and per department. Six applications carrying 58,908 lines of Python and 806 automated tests at the September 2026 measurement, with a seventh since deployed.",
    focus: [
      "Platform strategy",
      "AI governance",
      "Privacy by construction",
      "Access control & audit design",
      "Impact instrumentation",
      "Enterprise architecture",
    ],
    headlineMetrics: [
      { value: "165.9 hrs", label: "manual effort removed during the pilot window" },
      { value: "94,339", label: "items processed across 209 recorded runs" },
      { value: "Zero", label: "recorded run failures in the pilot" },
      { value: "806", label: "automated tests across 40 suites" },
    ],
    problem:
      "The automation portfolio had become its own bottleneck. Every win — a reconciliation bot, an OCR extractor, a report distributor — shipped as a desktop script or a packaged executable that lived on one person's machine. Nobody could see what existed, request access, or run a tool without finding its owner. Nothing was instrumented, so the single question leadership actually asked, 'what has this programme returned to the business,' could only be answered by anecdote. Meanwhile the next automation cost as much to build as the last one, because nothing was shared.",
    context: [
      "The recurring pattern across every function was high-volume repetitive document work where each individual task was too small to justify a bespoke system — which is precisely why none had been built.",
      "The measurable case that opened the analysis was tax certificate data entry: a clerk reading ten fields off a PDF and re-keying them into a spreadsheet bound for the ERP.",
      "That effort figure was derived rather than estimated — 2,549 certificates across a 76-day production window worked out to roughly 1.47 minutes per certificate, or about 300 hours a year on one task.",
      "Twelve stakeholder functions had a claim on the outcome, from receivables and direct tax through payments, cost control, and retail relations to infrastructure, identity, information security, and internal audit.",
    ],
    challenges: [
      "The strategic choice: deliver a single-purpose tool that solved the tax problem, or build a platform that lowered the cost of every automation after it. I chose the platform and validated it with the tax case as its first tenant.",
      "Proving business impact without overstating it — which meant designing measurement into the product rather than reporting on it afterwards, and being rigorous about which numbers were measured versus estimated.",
      "Delivering enterprise-grade access control with no local credential store at all, so the platform never becomes a place where passwords can leak.",
      "Keeping every AI capability on-premise under a hard no-data-egress requirement, while still using modern speech and language models.",
      "Real institutional constraints: a managed Windows host with no container runtime, no staging environment, and package installations declined twice — the rate limiter ended up hand-written in about ninety lines.",
      "A seven-domain pre-go-live audit that I commissioned against my own work, then remediated in full before requesting external penetration testing.",
    ],
    architecture: [
      "Shared contract — a real installed Python package of thirteen modules covering identity, background jobs, usage tracking, audit writing, alerting, rate limiting, redaction, security headers, and serving. A tool owns its business logic and its screens; it owns nothing else. A security fix therefore applies to every application at once.",
      "Process isolation over multi-tenancy — one operating-system process and one virtual environment per tool, so a four-minute optical character recognition run, a ninety-thousand-row tax computation, and a voucher issue execute independently and pin their own dependency versions without constraining each other.",
      "Identity — enterprise single sign-on over the OpenID Connect authorization-code flow, so the organisation's own multi-factor and conditional-access policies apply. The platform holds no credential and has no registration or password-reset path; the column that would have stored a password hash was deliberately dropped by a migration so it cannot later be wired up.",
      "Authorisation in layers — a three-tier role rank, then a per-tool assignment gate, then an object-level ownership check re-evaluated on every fetch. A revocation point means a demotion takes effect on the subject's next request rather than their next sign-in.",
      "Measurement as a first-class concern — every run writes to a usage log carrying the effort-saved multiplier at execution time, so correcting a catalogue value never rewrites history. Unattended scheduled work is projected into the same log under a reserved non-human actor whose rows count toward work completed but never toward headcount.",
      "Executive reporting as a product surface — a weekly update view built for an audience that will not open analytics filters, with totals summed live from the underlying rows so the number in front of management cannot drift from the data.",
      "Demand-side governance — an innovation hub where any authenticated user can submit and vote on automation ideas, with one vote per person enforced by the database key rather than by the interface.",
      "Extensibility as the design goal — adding a tool is a template copy plus a single catalogue row. No portal code change, no restart, because the catalogue is read fresh on every request. The seventh application was added to the running platform this way, and the portal source does not mention it anywhere.",
    ],
    stack: [
      "Python",
      "Flask",
      "Jinja2",
      "Waitress",
      "SQLite (WAL)",
      "Microsoft Entra ID / OIDC",
      "PaddleOCR",
      "WhisperX",
      "Ollama (local LLM)",
      "Plotly",
      "IIS reverse proxy",
      "Windows services",
    ],
    journey: [
      "The original brief specified a lightweight dashboard framework with a local username-and-password table. I rejected both: what shipped runs on enterprise single sign-on with no credential store, because the security posture the organisation actually needed made the simpler design untenable.",
      "A design prototype was built in a modern component framework, then hand-ported to plain server-rendered templates and hand-written CSS — deliberately, to keep a front-end build step off a restricted production server.",
      "The platform contract was proven by absorbing existing work: three of the six tools are pre-existing engines lifted in unmodified behind a thin wrapper, which is the clearest evidence that the marginal cost of the next automation actually fell.",
      "The hardest integration was a complete standalone voucher application with its own sign-in, roles, and mailer. Rather than rewrite it, I deleted its authentication and retained its authorisation — its seven-role, seventeen-screen permission grid survived intact, still administered by the business rather than by IT.",
      "Four tools entered production in a single week, followed by a pre-go-live audit across seven domains that closed one critical, ten high, twenty-one medium, and thirteen low findings — every one cited to a file and line before it was signed off.",
      "The critical finding was mine to begin with: job routes gated by role but not by ownership, so one user could retrieve another's documents. Fixed across all affected routes and locked down with eighteen regression tests. It is recorded as self-inflicted rather than quietly corrected.",
      "Currently pre-general-release pending external penetration testing, for which I prepared the full scoping pack — targets, authentication model, endpoint inventory, known findings, and rules of engagement.",
    ],
    impact: [
      "165.9 hours of manual effort removed and 94,339 items processed across 209 recorded runs during the pilot window, with zero recorded run failures and 195 privileged actions audited.",
      "One three-minute run replaced two to three days of manual cross-verification on a 90,197-row tax computation — the single clearest demonstration of the scale change.",
      "Across the wider automation portfolio the platform now reports on, roughly 3,741 hours of manual work a year is removed — about 2.08 full-time equivalents at the stated 1,800 productive hours per person — spanning nineteen automations in eleven departments.",
      "Leadership can answer 'what has this programme returned' from live data rather than anecdote, because measurement is a property of the platform rather than a reporting exercise laid over it.",
      "The marginal cost of the next automation fell measurably, and it is demonstrated rather than claimed: the seventh application joined a live platform through a template copy and one catalogue row, with not a single reference to it anywhere in the portal source.",
      "Error classes eliminated, not merely time saved — the reconciler surfaces a 'cancelled but paid' condition the manual process had no mechanism to detect, and the extractor blocks automatic acceptance on critical fields with duplicate and mismatch detection that prevents a credit being applied twice or against the wrong ledger.",
      "Every AI capability runs on the organisation's own hardware. No document, transcript, or tax figure reaches an external inference service, verified by a build-time test that fails the build if a hosted endpoint ever appears in the codebase.",
      "The local model stack carries a provenance inventory: every speech, alignment, diarisation, and language model recorded with its source, its licence, and its SHA-256 hash. Most internal AI projects cannot say where their weights came from or prove they have not changed.",
    ],
    lessons: [
      "Build for the tenth automation, prove it with the first. The platform decision is only defensible if you can point at the moment the next build got cheaper — and for that, you need the second and third tools to be nearly free.",
      "Design the measurement before the feature. A programme that cannot state its own return will eventually be asked to justify itself with anecdote, and anecdote loses to a spreadsheet.",
      "Be precise about which numbers are measured and which are estimated. Deriving the effort figure from a real 76-day production window, and labelling the estimated multipliers as estimates, is what makes the credible numbers credible.",
      "Authorisation questions that the business owns should stay with the business. 'May open the issue counter' is not a fact a platform can hold, which is why that permission grid is administered by the voucher administrator and not by IT.",
      "Audit your own work before someone else does, and record the findings that were your fault as your fault. It costs nothing and it is the entire basis of the trust that follows.",
      "Privacy is easier as a constraint than as a retrofit. Committing to on-premise inference up front closed off an entire category of later compliance argument.",
    ],
    future: [
      "Onboarding the automations that still run outside the platform — the highest available return in the portfolio, and onboarding rather than new development.",
      "Generalising the business-administered permission grid into the shared contract so any tool can offer finer-grained, business-owned authorisation.",
      "Replacing the estimated effort-saved multipliers with measured values, and adding cohort, trend, and per-department drill-down to the analytics surface.",
      "Rebuilding the document extractor as an agent able to reason about layouts it has not seen before, moving from a fixed pipeline with human review to a system that handles the unfamiliar — on the on-premise inference path, never a cloud API.",
    ],
  },
  {
    slug: "fundflow-agent",
    role: "Sole owner — discovery to production",
    timeline: "Multi-phase · live",
    headlineMetrics: [
      { value: "10", label: "institution formats parsed" },
      { value: "0", label: "extraction errors in validated runs" },
      { value: "100%", label: "on-premise processing" },
      { value: "Daily", label: "unattended runs" }
    ],
    name: "FundFlow Agent",
    category: "AI + Finance Automation",
    status: "Live in production",
    functions: "Finance",
    tagline: "Automated mutual fund statement processing — from inbox to validated report, unattended.",
    summary:
      "An end-to-end pipeline that requests statements, collects PDFs, extracts folio-level data with OCR and format-aware parsing, and produces validated Excel reports — with an AI fallback for layouts rules can't read and 100% local, privacy-first processing.",
    focus: ["Automation architecture", "Document intelligence", "Error handling", "Privacy-first design", "Scalability"],
    problem:
      "The finance team spent hours every day requesting mutual fund statements, hunting for PDFs scattered across email threads, and manually keying investment and market values into spreadsheets. Every folio lived in a differently formatted document, so manual extraction was slow and error-prone — on records that had to be right.",
    context: [
      "Statements arrived from multiple asset management companies, each with its own PDF layout, password conventions, and multi-page structures.",
      "The routine consumed a significant share of the team's productive day, yet produced no analysis — only data movement.",
      "The data feeds treasury visibility, so accuracy and auditability mattered as much as speed.",
    ],
    challenges: [
      "No standardized statement format — ten distinct institution layouts plus edge cases like multi-scheme folios and statements spanning pages.",
      "Password-protected PDFs and documents scattered across mail threads and folders.",
      "Strict confidentiality requirements ruled out any external API or cloud OCR service.",
      "Packaged executables triggering antivirus false positives, and enterprise file-storage access quirks.",
    ],
    architecture: [
      "Orchestration layer — scheduled workflows request statements from institutions, receive replies, and file PDFs into an organized per-institution folder structure automatically.",
      "Scheduling & monitoring layer — a daily trigger runs the extractor, tracks status, and logs errors centrally.",
      "Extraction engine — a Python executable (callable from CLI or Excel) that auto-identifies folios and extracts invested value, market value, and gain/loss, attaching a confidence score and a source flag showing whether rules or the AI fallback produced each value.",
      "Format-specific parsing engines for ten institution layouts, a generic heuristic parser for unknown formats, and a locally hosted LLM fallback as a strictly validated safety net.",
      "Structured error states (e.g. folio not found, zero balance) and a daily run-summary email forming a complete audit trail.",
    ],
    stack: ["Power Automate", "Python", "PaddleOCR", "Regex parsing engines", "Local LLM fallback", "Excel / VBA", "Task Scheduler"],
    journey: [
      "v1 shipped as a generic parser — it worked, but broke on institution-specific layouts and multi-scheme statements.",
      "v2 introduced format-specific extraction engines per institution, fixing multi-scheme and multi-page edge cases with an asymmetric folio-window technique.",
      "Later versions added the local LLM fallback, confidence scoring, batch folder mode, password handling, and hardened packaging.",
      "Rolled out in phases with user acceptance testing at each stage; now in daily production with the next phase extending native Excel integration.",
    ],
    impact: [
      "Multiple hours of manual effort removed from the finance team's day, every day.",
      "Zero extraction errors across validated production runs, stress-tested against large multi-folio datasets.",
      "Unlimited folio scalability — adding coverage is configuration, not new manual work.",
      "Complete audit trail through daily run summaries, confidence scores, and source flags.",
      "100% local processing — no sensitive financial document ever leaves the organization's environment.",
    ],
    lessons: [
      "Deterministic rules should do the heavy lifting; AI belongs as a validated safety net, not the first line.",
      "Phased, UAT-driven rollout de-risks adoption and builds stakeholder trust faster than a big-bang launch.",
      "Privacy-first architecture is a feature stakeholders actively value — design for it from day one.",
    ],
    future: [
      "Native Excel integration so users trigger extraction from the tools they already live in.",
      "Extending format coverage and evolving the fallback layer toward agent-style self-correction.",
    ],
  },
  {
    slug: "tds-flow-engine",
    role: "Sole owner — discovery to production",
    timeline: "Quarterly cycle · live",
    headlineMetrics: [
      { value: "~2 wks → <1 day", label: "quarterly issuance cycle" },
      { value: "90–95%", label: "effort reduction" },
      { value: "1,000s", label: "certificates per quarter" },
      { value: "Zero", label: "third-party exposure" }
    ],
    name: "TDS Flow Engine",
    category: "Workflow Automation",
    status: "Live in production",
    functions: "Direct Tax",
    tagline: "Bulk, secure issuance of quarterly tax certificates — thousands of documents, one supervised run.",
    summary:
      "An in-house, end-to-end distribution workflow that renames, encrypts, and dispatches thousands of confidential tax certificates each quarter through controlled channels — with delivery tracking, error logging, and no third-party software in the loop.",
    focus: ["Business process transformation", "Security by design", "Workflow design", "Operational efficiency"],
    problem:
      "Every quarter, the direct tax team manually issued thousands of tax certificates to vendors. Each PDF had to be individually renamed, password-protected, and emailed — thousands of repetitive, high-stakes actions with real misdelivery risk on confidential financial documents.",
    context: [
      "The process consumed roughly two working weeks of effort each quarter.",
      "The documents are confidential, which made the team firmly reluctant to route them through third-party tools.",
      "Delivery had to be traceable: which certificate went where, when, and what failed.",
    ],
    challenges: [
      "Scale — thousands of PDFs processed and dispatched in a single quarterly run.",
      "Reliable per-document encryption and password-protected archive handling at volume.",
      "Building delivery-status tracking and error logging so the run is fully auditable.",
      "Coordinating debugging and validation with the business user before the first live run.",
    ],
    architecture: [
      "Ingestion — reads certificate files from designated folders and logs each record into a structured Excel register.",
      "Preparation engine — automated renaming to vendor conventions and per-document password protection, including zipped password-protected archives where required.",
      "Dispatch layer — bulk, controlled email distribution through the corporate mail environment with per-recipient tracking.",
      "Audit layer — delivery status, failures, and exceptions logged for review; simple operator interface for the tax team.",
    ],
    stack: ["Excel VBA", "Power Automate", "Outlook", "PDF encryption tooling"],
    journey: [
      "Started as a gap identified in conversation with the tax team: a quarterly ritual everyone assumed had to be manual.",
      "Built and debugged in close coordination with the business user; validated on controlled batches before scale-up.",
      "First live run issued thousands of protected certificates; subsequent quarters exceeded the original volume target.",
    ],
    impact: [
      "Roughly 90–95% effort reduction — from about two weeks of manual work to under a day of supervised monitoring.",
      "Multiple person-weeks returned to the tax team every quarter.",
      "Thousands of certificates issued per quarter with delivery tracking and zero third-party exposure.",
      "Eliminated external tool costs entirely; formally appreciated by the tax team and endorsed by senior management.",
    ],
    lessons: [
      "Early flagship wins establish credibility — this project created the mandate to find gaps and build solutions across functions.",
      "Pragmatic tooling beats exotic tooling: the right combination of familiar components shipped faster and was easier to trust.",
      "Security-by-design became the standard carried into every later system.",
    ],
    future: [
      "Paired with the inbound certificate OCR platform, this now forms a complete document lifecycle — issuance out, intelligent capture in.",
    ],
  },
  {
    slug: "tds-certificate-ocr",
    role: "Sole owner — discovery to production",
    timeline: "Live · evolving to agent",
    headlineMetrics: [
      { value: "1,000+", label: "certificates processed" },
      { value: "Offline", label: "AI extraction layer" },
      { value: "Zero", label: "unverified values posted" },
      { value: "Per-run", label: "exception reporting" }
    ],
    name: "TDS Certificate OCR Platform",
    category: "AI Document Intelligence",
    status: "Live · evolving to AI agent",
    functions: "Customer Relations · Accounts Receivable",
    tagline: "AI-assisted extraction that reads inconsistent scanned certificates — and knows when to ask a human.",
    summary:
      "An intelligent document-processing platform that splits bundled scans, classifies certificate types, extracts 15+ fields with confidence scoring, detects duplicates, and falls back to a fully offline local LLM — emitting audit-ready outputs on every run.",
    focus: ["OCR", "Validation", "AI fallback", "Confidence scoring", "Data quality"],
    problem:
      "Customer-facing and receivables teams received a constant stream of scanned tax certificates in wildly inconsistent formats — single-page, multi-page, bundled scans, poor quality. Each required manually reading and keying 15+ fields into enterprise systems, and duplicate certificates regularly slipped through.",
    context: [
      "Documents arrive from external customers, so format and scan quality can never be controlled at the source.",
      "The extracted fields feed tax-sensitive financial records — a wrong value is worse than a missing one.",
      "Volume is continuous rather than seasonal, making this a daily operational load.",
    ],
    challenges: [
      "Splitting bundled scans into individual certificates and distinguishing between two similar certificate types automatically.",
      "Hard-to-extract fields — payment dates, identification numbers, and acknowledgement numbers with inconsistent placement across layouts.",
      "Preventing duplicate certificates from re-entering the system.",
      "Keeping everything offline: no external OCR or AI API was acceptable for these documents.",
    ],
    architecture: [
      "OCR layer — PaddleOCR text extraction with smart grouping and page detection to segment bundled documents.",
      "Classification — automatic detection of certificate type before field extraction begins.",
      "Extraction & validation — rule-based field extraction with per-field confidence scores; low-confidence or missing fields are flagged for human review rather than silently accepted.",
      "Duplicate detection against the register of previously processed references, catching repeats at high confidence.",
      "Offline AI fallback — a locally hosted small language model handles layouts rules can't parse, with its output passed through the same strict validation as everything else.",
      "Audit outputs — every run emits a summary workbook, an error workbook, and a full log, emailed automatically to stakeholders; failed documents stay in place for safe retry.",
    ],
    stack: ["Python", "PaddleOCR", "Regex extraction", "Local LLM via Ollama", "Excel reporting", "Automated email alerts"],
    journey: [
      "Began as a basic extractor; matured across five major versions into a platform with smart grouping, classification, and the offline AI fallback.",
      "Confidence scoring changed the operating model: the system stopped pretending to be perfect and started telling users exactly where to look.",
      "Now runs daily in production with proactive failure alerts; the next generation is being redesigned as a full AI agent.",
    ],
    impact: [
      "Over a thousand certificates processed cumulatively, with monitored daily runs regularly completing clean with zero errors.",
      "Accuracy safeguards prevent bad data from ever reaching finance records — uncertain values are routed to people, not posted.",
      "Full auditability: summary, exceptions, and logs delivered to stakeholders on every run.",
      "Privacy-compliant by construction — the AI layer runs entirely offline.",
    ],
    lessons: [
      "Confidence scoring is the difference between automation people tolerate and automation people trust.",
      "A local LLM can deliver the flexibility of AI without the data-exposure trade-off.",
      "Retry-safe design (leave failures in place, alert loudly) makes daily unattended operation genuinely low-stress.",
    ],
    future: [
      "Rebuilding as an agentic system that reasons about errors and unclear documents instead of just flagging them.",
      "Deeper integration with downstream systems to close the loop from extraction to posting.",
    ],
  },
  {
    slug: "sap-zbrs-automation",
    role: "Sole owner — discovery to production",
    timeline: "Monthly cycle · live",
    headlineMetrics: [
      { value: "100s", label: "bank accounts per cycle" },
      { value: "~97%", label: "first-pass success" },
      { value: "Zero", label: "misfiled statements" },
      { value: "Unattended", label: "month-end execution" }
    ],
    name: "SAP ZBRS Automation",
    category: "SAP Automation",
    status: "Live in production",
    functions: "Payments · Finance",
    tagline: "Unattended bank reconciliation statement generation across hundreds of accounts — filed perfectly, every month.",
    summary:
      "A Python-driven SAP GUI automation that runs reconciliation reports for hundreds of bank accounts from a master sheet, exports each as PDF, and files it into a structured month/department/entity/account hierarchy — with fault-tolerant batch design and an emailed audit summary.",
    focus: ["SAP integration", "Reliability", "Fault tolerance", "Operational efficiency"],
    problem:
      "Every month, the payments team generated bank reconciliation statements from SAP for hundreds of accounts across multiple entities. Each one meant logging in, running the transaction, setting dates, exporting a PDF, and manually filing it into a deeply nested folder structure — slow, repetitive, and easy to misfile.",
    context: [
      "The account master spans multiple companies and company codes, each with its own ledger ranges.",
      "Statements follow a strict cut-off cycle, so timing and consistency matter.",
      "Misfiled statements create downstream audit friction that costs far more than the filing itself.",
    ],
    challenges: [
      "Brittle SAP GUI element identifiers that change between screens and versions, causing 'control not found' failures mid-batch.",
      "Edge-case account states (such as blocked accounts) that break naive scripting.",
      "Ensuring one failed account never takes down the remaining batch.",
      "Modeling the real statement cycle and month-end scenarios accurately with the business team.",
    ],
    architecture: [
      "Driver — Python controlling the SAP GUI through COM scripting, reading the account master (account, company code, ledger range) from Excel.",
      "Batch engine — iterates every account, runs the reconciliation transaction, exports the statement as PDF.",
      "Auto-filing — outputs organized into a Month → Department → Company Code → Account hierarchy on enterprise storage, eliminating manual filing entirely.",
      "Fault isolation — each account is an independent unit of work; failures are captured with reasons into an exception workbook and the run continues.",
      "Reporting — an automated summary email with totals, successes, failures, and a link to the output folder; failed accounts support surgical re-runs.",
    ],
    stack: ["Python", "SAP GUI Scripting (COM)", "Excel account master", "Automated email reporting"],
    journey: [
      "First venture into SAP GUI automation — a deliberately higher-risk skill investment that opened the door to a broader SAP automation suite.",
      "Early runs surfaced brittle element IDs and account-state edge cases; the design answer was isolation and targeted re-runs rather than fragile perfection.",
      "Production runs now regularly complete with a very high first-pass success rate, and clean cycles finish fully successful.",
    ],
    impact: [
      "Hundreds of bank accounts processed unattended each cycle, with roughly 97% first-pass success and clean completion after targeted re-runs.",
      "Zero misfiling through automatic structured output — every statement lands exactly where auditors expect it.",
      "The repetitive log-in / run / export / file loop eliminated from the team's month.",
      "Full audit trail delivered to the payments team automatically.",
    ],
    lessons: [
      "Design fault tolerance around the most fragile layer — in GUI automation, that is always the UI itself.",
      "A surgical re-run capability is worth more than chasing a perfect first pass.",
      "Sitting with the business to model the real statement cycle prevented an entire class of date-logic bugs.",
    ],
    future: [
      "Natural successor already in internal testing: automated clearing of open reconciliation items, extending the suite from reporting into transaction processing.",
    ],
  },
  {
    slug: "reportgenie",
    role: "Sole owner — discovery to production",
    timeline: "Live · multi-department roadmap",
    headlineMetrics: [
      { value: "Config", label: "not code, to add a report" },
      { value: "Daily", label: "unattended delivery" },
      { value: "Per-report", label: "traceability" },
      { value: "Reusable", label: "framework for later builds" }
    ],
    name: "ReportGenie",
    category: "Enterprise Reporting Automation",
    status: "Live in production",
    functions: "Finance · multi-department roadmap",
    tagline: "A config-driven reporting robot — adding a new report is a data entry, not a code change.",
    summary:
      "An automated platform that logs into enterprise systems, executes predefined report variants across transactions, exports date-stamped Excel outputs, and emails them to the right users — running unattended on a scheduled virtual machine with per-report status tracking.",
    focus: ["Config-driven architecture", "Scalability", "Business reporting", "Automation framework"],
    problem:
      "Finance depended on a battery of recurring system reports — dividends, payables, reconciliations, statutory deductions, staff loans, and more. Each demanded a daily ritual of logging in, applying the correct saved variant, exporting to Excel, and emailing users. Pure repetition, yet essential for monitoring pending items and timely decisions.",
    context: [
      "Each report is defined by a transaction code and a saved variant — a natural configuration pair.",
      "Recipients differ per report, and outputs need to be date-stamped and traceable.",
      "The tool had to run unattended on a virtual machine, surviving session and login quirks without a human nearby.",
    ],
    challenges: [
      "Handling varied variant naming conventions robustly across report types.",
      "Reliable Excel export through the system's save dialogs — a notoriously fiddly scripting surface.",
      "Ensuring one failed report never blocks the others in a run.",
      "Unattended reliability: session handling, login recovery, and status logging with nobody watching.",
    ],
    architecture: [
      "Configuration registry — every report is a row: transaction code, variant, recipients. Adding a report is data entry, not development.",
      "Execution engine — logs in, applies each variant, exports date-stamped Excel outputs through scripted save dialogs.",
      "Distribution — outputs emailed automatically to designated users per report.",
      "Independent status tracking per report, rolled into a run-summary email listing each report, its status, file, and size.",
      "Reusable automation helpers shared with the reconciliation bot — a common SAP automation scaffolding.",
    ],
    stack: ["Python", "SAP GUI Scripting", "Email automation", "VM scheduling"],
    journey: [
      "Designed config-first from day one, with the explicit ambition to generalize beyond a single system toward 'business apps' broadly.",
      "Hardened through a tight test-fix-rerun loop until unattended VM operation was genuinely reliable.",
      "Clean production runs now deliver the full report battery with zero failures and zero manual effort — and the business formally recorded its appreciation.",
    ],
    impact: [
      "The full daily report battery delivered unattended, with per-report traceability.",
      "Faster monitoring of pending items and more timely decisions for finance users.",
      "Formal, unsolicited appreciation from the business — trust that funds the next wave of automation.",
      "A reusable automation framework that lowered the cost of every subsequent SAP project.",
    ],
    lessons: [
      "Config-over-code is the single highest-leverage architectural decision in enterprise automation.",
      "Documenting and quantifying value with the business is part of the job, not an afterthought.",
      "Shared scaffolding across bots turns individual tools into a platform.",
    ],
    future: [
      "Extending the same engine to applications beyond SAP — one registry, many systems.",
    ],
  },
  {
    slug: "msme-batch-validator",
    role: "Sole owner — discovery to production",
    timeline: "On-demand · live",
    headlineMetrics: [
      { value: "1,000+", label: "registrations per run" },
      { value: "Days → minutes", label: "verification cycle" },
      { value: "Majority", label: "auto-filled cleanly" },
      { value: "Audit-ready", label: "centralised output" }
    ],
    name: "MSME Batch Validator",
    category: "Compliance Automation",
    status: "Live",
    functions: "Cost Control · Accounts Billing",
    tagline: "Regulatory verification at scale — days of portal lookups compressed into minutes, with humans on the edge cases.",
    summary:
      "A verification platform that extracts vendor registration details from compliance PDFs, validates them in bulk against the government registry via API, fuzzy-matches results back to the vendor master, and produces a single audit-ready output with three-tier review tagging.",
    focus: ["Compliance", "Validation", "Data processing", "Human-in-the-loop design"],
    problem:
      "The cost control and billing teams needed to verify the MSME registration status of a very large vendor base against the government portal — required for compliance, quarterly reporting, and correct payment treatment. Done manually, one portal lookup at a time plus transcription from registration PDFs, it would have taken days.",
    context: [
      "Vendor master data was messy: duplicate codes, inconsistent state casing, missing dates, multi-state entries.",
      "The validation API call carries real cost, so wasteful or premature runs had to be prevented.",
      "The output feeds statutory reporting, so it had to be consistent, centralized, and audit-ready.",
    ],
    challenges: [
      "Parsing varied registration PDF layouts into structured data.",
      "Matching validated registry results back to imperfect internal vendor records.",
      "Designing the process so humans review only genuinely uncertain cases instead of everything.",
      "Gating the costly API run behind explicit human sign-off.",
    ],
    architecture: [
      "Stage 1 — PDF import and data extraction from vendor registration documents into structured Excel.",
      "Stage 2 — collaborative data review and enrichment with the billing team before anything expensive runs.",
      "Stage 3 — bulk validation through the official registry verification API.",
      "Stage 4 — matching and consolidation: fuzzy matching on state and vendor name, enriched with internal vendor codes, merged into one audit-ready workbook.",
      "Three-tier tagging — clean matches auto-filled, ambiguous cases tagged for multi-option review, non-matches tagged for targeted follow-up.",
    ],
    stack: ["Python", "PDF extraction", "Government registry verification API", "Fuzzy matching", "Excel consolidation"],
    journey: [
      "Started as a quarterly compliance pain point raised by cost control; scoped as a staged pipeline with explicit human checkpoints.",
      "Fuzzy matching and vendor-code enrichment were added at the stakeholders' request — the tool grew in direct response to how the team actually works.",
      "First full production run validated the entire vendor batch in a single pass.",
    ],
    impact: [
      "Well over a thousand registrations verified in a single run — days of manual work reduced to minutes.",
      "The overwhelming majority of records auto-filled cleanly, leaving people to review only a small, clearly tagged remainder.",
      "Standardized, consistent validation across the entire vendor base with a centralized, audit-ready output.",
      "A reusable pattern for future large-dataset compliance validations.",
    ],
    lessons: [
      "Human-in-the-loop is a design principle, not a fallback: review tags and pre-run sign-offs make automation trustworthy in regulated processes.",
      "Integration beats reinvention — leveraging the existing official verification API delivered in days what scraping would have delivered in weeks.",
      "Responsiveness to stakeholder-driven enhancements is what turns a script into an adopted tool.",
    ],
    future: [
      "Generalizing the staged extract → review → validate → consolidate pattern to other regulatory datasets.",
    ],
  },
  {
    slug: "gv-hub",
    role: "Product owner & builder",
    timeline: "Design / build · core live",
    headlineMetrics: [
      { value: "6", label: "modules in the platform" },
      { value: "Serial-level", label: "inventory traceability" },
      { value: "Zero", label: "failures on legacy migration" },
      { value: "Maker-checker", label: "approval control" }
    ],
    name: "GV Hub",
    category: "Enterprise Application Development",
    status: "Design / Build · working core live",
    functions: "Payments · Accounts Receivable · Retail operations",
    tagline: "From spreadsheets to a real platform — voucher inventory, approvals, and expiry intelligence in one system.",
    summary:
      "A centralized voucher inventory and workflow platform built on the Microsoft Power Platform: inward requests, maker-checker approvals, serial-level inventory, batch-merge logic, expiry monitoring, receivables due tracking, and management dashboards — replacing ledger-and-spreadsheet tracking with a single source of truth.",
    focus: ["Product thinking", "Workflow design", "Approval systems", "Inventory management", "Dashboarding", "Enterprise application architecture"],
    problem:
      "The retail business receives large volumes of gift vouchers from tenants and issues them internally across departments — historically tracked in a ledger system and spreadsheets. There was no single source of truth, no real-time balances, no expiry alerts, no maker-checker approvals, and no serial-level traceability. Receivable dues slipped through and vouchers could silently lapse.",
    context: [
      "A formal mandate from finance and accounts leadership, tracked as a business applications delivery.",
      "Multiple roles — requesters, approvers, managers — each needing a different view of the same inventory.",
      "The platform had to absorb a clean one-time migration of existing inventory before going live.",
    ],
    challenges: [
      "Defining the batch-merge rule: identical brand, denomination, expiry, and location merge into an existing batch; anything else creates a new batch row.",
      "Debugging platform-level query failures on compound filters involving lookup columns, date formatting, and delegable operators.",
      "Building a maker-checker approval flow with an 'approve with edits' path — photo proof review, verified-versus-claimed quantity adjustment, and notes.",
      "Making dashboard KPIs fully dynamic with graceful blank/zero handling, and pivoting the charting approach when native components fell short.",
    ],
    architecture: [
      "Data layer — a SharePoint-backed relational architecture: central inventory, transaction log, due records, and location references.",
      "Opening Inventory module — one-time migration from the legacy ledger with duplicate-serial validation and automatic source archiving.",
      "Receivables Due module — per-tenant agreements auto-generate due records by frequency, with daily overdue intimations.",
      "Receipt module — physical voucher receipts auto-classified as full, partial, excess, or delayed, flowing through maker-checker approval into inventory.",
      "Issuance module — request forms with live availability, oldest-expiry-first picking, and serial-level deduction.",
      "Manager view — KPI dashboard, live inventory, a tiered expiry monitor (critical / warning / notice bands), transaction log, and administrative actions.",
    ],
    stack: ["Power Apps", "Power Automate", "SharePoint", "Workflow & approval design", "Dashboard design"],
    journey: [
      "Began with a business requirements document and a clickable HTML prototype before a single Power Apps screen was built — prototype-first discipline.",
      "The opening migration landed cleanly: every legacy batch imported with zero failures and the source automatically archived.",
      "The end-to-end approval flow is live, with real inward requests posted to inventory and batch-merge logic validated in production on repeated identical receipts.",
      "Rebranded from a single tool to a platform identity as scope grew.",
    ],
    impact: [
      "Replaces ledger-and-spreadsheet tracking with a real-time, single-source-of-truth platform.",
      "Full audit trail, serial-level traceability, tiered expiry alerting, and management reporting where none existed.",
      "Working approval core live in production with automated confirmation communications.",
      "A qualitative leap from single-purpose bots to a multi-module, multi-role enterprise application.",
    ],
    lessons: [
      "Prototype-first delivery aligns stakeholders before expensive build effort is committed.",
      "Data-model decisions (like the batch-merge rule) are product decisions — they encode how the business actually thinks.",
      "Platform thinking pays: the architecture extends naturally to future locations and voucher programs.",
    ],
    future: [
      "Completing the dashboard UI, automating due-generation and daily intimations, and adding exception flows toward full production rollout.",
    ],
  },
];

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}
