/**
 * Case studies, each following the same eight-section narrative:
 * problem → existing process → opportunity → solution → how it works →
 * my role → impact → what I learned.
 *
 * Hours and volumes trace to the internal delivery tracker mirrored in
 * lib/portfolio.ts. Where a figure is not measured, the text says so.
 */
export type Solution = {
  slug: string;
  name: string;
  category: string;
  status: string;
  /** Business functions served. */
  functions: string;
  tagline: string;
  /** Renders with flagship treatment on the homepage. */
  featured?: boolean;
  /** One-line summary of ownership, for the case study header. */
  role: string;
  timeline: string;
  /** Three or four scannable outcomes, shown above the narrative. */
  headlineMetrics: { value: string; label: string }[];
  focus: string[];
  stack: string[];

  /** 01 — What was inefficient, manual, expensive, slow or error-prone. */
  problem: string;
  /** 02 — How the work was done before. */
  existingProcess: string[];
  /** 03 — Why this process suited AI or automation. */
  opportunity: string[];
  /** 04 — What was built. */
  solution: string;
  /** 05 — Workflow and architecture. */
  howItWorks: string[];
  /** 06 — Explicit contribution, by area. */
  myRole: { area: string; detail: string }[];
  /** 07 — Concrete outcomes. */
  impact: string[];
  /** 08 — One insight. */
  learned: string;
  /** Product screenshots, rendered under "How it works". Files must sit in
   *  public/case-studies/ or they are dropped at build time. */
  screens?: { file: string; caption: string }[];
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
    timeline: "Jun 2026 – present · pilot live",
    tagline:
      "The platform that turned a drawer of desktop scripts into a governed, measured, self-service automation estate.",
    focus: [
      "Platform strategy",
      "AI governance",
      "Privacy by construction",
      "Access control & audit",
      "Impact instrumentation",
      "Enterprise architecture",
    ],
    stack: [
      "Python",
      "Flask",
      "Jinja2",
      "SQLite (WAL)",
      "Microsoft Entra ID / OIDC",
      "PaddleOCR",
      "WhisperX",
      "Ollama (local LLM)",
      "Plotly",
      "IIS reverse proxy",
    ],
    headlineMetrics: [
      { value: "11", label: "tools on the platform, up from six in September" },
      { value: "95,909", label: "items processed, 4 June to 12 October 2026" },
      { value: "490", label: "recorded runs in that window, 310 of them scheduled" },
      { value: "806", label: "automated tests across 40 suites at the September build" },
    ],
    problem:
      "The automation portfolio had become its own bottleneck. Every win shipped as a desktop script or a packaged executable living on one person's machine. Nobody could see what existed, request access, or run anything without finding its owner. Nothing was instrumented, so the one question leadership actually asked — what has this programme returned to the business — could only be answered by anecdote. Worse, the next automation cost as much to build as the last one, because nothing was shared.",
    existingProcess: [
      "A tool was a file. You got it by asking the person who wrote it, and you ran it on your own machine with your own credentials.",
      "There was no catalogue, so discovering that a tool already existed depended on hearing about it.",
      "There was no access model. Whoever had the file had the capability, and nothing recorded who ran what.",
      "Impact was reported by asking the builder for an estimate, which is not a measurement.",
    ],
    opportunity: [
      "The binding constraint was not any single process, it was the marginal cost of the next automation. Solving that once compounds across every build after it.",
      "Measurement could be a property of the platform rather than a reporting exercise laid over it, which is the only way it stays accurate.",
      "Three of the existing tools were self-contained engines that could be lifted in behind a thin wrapper, so the platform thesis was testable rather than theoretical.",
      "A hard no-data-egress requirement made on-premise AI inference the only route, which turned a constraint into a defensible design position.",
    ],
    solution:
      "An on-premise web platform that consolidates an enterprise's finance, tax, and operations automations into one authenticated portal. It replaces scripts and packaged executables with self-service tools behind single sign-on, governed by role-based access, per-object ownership checks, a non-erasable audit trail, and usage instrumentation that reports work completed and manual effort removed per tool, per person, and per department. Six applications carrying 58,908 lines of Python and 806 automated tests at the September 2026 measurement; by November the catalogue held eleven.",
    howItWorks: [
      "Shared contract — a real installed Python package of thirteen modules covering identity, background jobs, usage tracking, audit writing, alerting, rate limiting, redaction, and serving. A tool owns its business logic and its screens; it owns nothing else, so a security fix applies to every application at once.",
      "Process isolation over multi-tenancy — one operating-system process and one virtual environment per tool, so a four-minute OCR run, a ninety-thousand-row tax computation, and a voucher issue execute independently and pin their own dependency versions.",
      "Identity — enterprise single sign-on over the OpenID Connect authorization-code flow, so the organisation's own multi-factor and conditional-access policies apply. The platform holds no credential; the column that would have stored a password hash was dropped by a migration so it cannot later be wired up.",
      "Authorisation in layers — a three-tier role rank, then a per-tool assignment gate, then an object-level ownership check re-evaluated on every fetch. A revocation point means a demotion takes effect on the subject's next request rather than their next sign-in.",
      "Measurement as a first-class concern — every run writes to a usage log carrying the effort-saved multiplier at execution time, so correcting a catalogue value never rewrites history. Scheduled work is projected into the same log under a reserved non-human actor whose rows count toward work completed but never toward headcount.",
      "Executive reporting as a product surface — a weekly update view for an audience that will not open analytics filters, with totals summed live from the underlying rows so the number in front of management cannot drift from the data.",
      "Extensibility as the design goal — adding a tool is a template copy plus a single catalogue row. No portal code change, no restart. Five applications joined the running platform this way between September and October, each through a registration script that writes its catalogue row.",
      "The local model stack carries a provenance inventory: every speech, alignment, diarisation, and language model recorded with its source, its licence, and its SHA-256 hash.",
    ],
    myRole: [
      {
        area: "Process discovery",
        detail:
          "Analysed the recurring pattern across twelve stakeholder functions and derived the effort baseline from a real production window rather than estimating it.",
      },
      {
        area: "Solution design",
        detail:
          "Made the platform-versus-point-solution call, and chose to validate the platform with the tax case as its first tenant rather than arguing it in the abstract.",
      },
      {
        area: "Architecture",
        detail:
          "Designed the shared contract, the process-isolation model, the layered authorisation, and the instrumentation schema.",
      },
      {
        area: "AI implementation",
        detail:
          "Built the on-premise inference path and the build-time test that fails the build if a hosted endpoint appears anywhere in the codebase.",
      },
      {
        area: "Integration",
        detail:
          "Absorbed a complete standalone application by removing its authentication and retaining its authorisation grid, leaving its models and templates unmodified.",
      },
      {
        area: "Security & audit",
        detail:
          "Commissioned a seven-domain pre-go-live audit against my own work, remediated every finding, and prepared the external penetration-test scoping pack.",
      },
      {
        area: "Deployment",
        detail:
          "Took six applications into production on a managed host with service supervision, backups, retention automation, and verified restart behaviour.",
      },
      {
        area: "Stakeholder management",
        detail:
          "Ran the programme across finance, tax, payments, cost control, retail, infrastructure, identity, information security, and internal audit.",
      },
    ],
    impact: [
      "490 recorded runs and 95,909 items processed between 4 June and 12 October 2026, 310 of the runs by scheduled jobs and the rest by twelve named people.",
      "One three-minute run replaced two to three days of manual cross-verification on a 90,197-row tax computation, which is the clearest single demonstration of the scale change.",
      "Leadership can answer what the programme has returned from live data rather than anecdote, because measurement is a property of the platform.",
      "The marginal cost of the next automation fell measurably, and it is demonstrated rather than claimed: the catalogue went from six tools to eleven in two months, each joining a live platform through a template copy and one catalogue row.",
      "Error classes eliminated, not merely time saved — the reconciler surfaces a cancelled-but-paid condition the manual process had no mechanism to detect, and the extractor blocks automatic acceptance on critical fields.",
      "Certificate OCR and meeting transcription run their AI entirely on the organisation's own hardware, so no tax document or transcript reaches an external inference service.",
      "A seven-domain pre-go-live audit closed one critical, ten high, twenty-one medium, and thirteen low findings, each cited to a file and line before sign-off.",
    ],
    screens: [
      {
        file: "ui-orbit-1.webp",
        caption:
          "The dashboard a signed-in user lands on: what is available to them, what they have run, and what it gave back.",
      },
      {
        file: "ui-orbit-2.webp",
        caption:
          "The catalogue. Every tool is visible to everyone, filterable by AI or non-AI, and each card carries its own run count and hours saved. Role governs use, not visibility.",
      },
      {
        file: "ui-orbit-3.webp",
        caption:
          "The analytics surface. Runs, items, hours saved, active users, and success rate, filterable by tool, department, and period — the measurement that makes the programme's return stateable from data.",
      },
      {
        file: "ui-orbit-4.webp",
        caption:
          "The audit trail. Administrative actions only, kept separate from tool runs because the two have different retention needs. Every privileged override is recorded, including break-glass access.",
      },
    ],
    learned:
      "Build for the tenth automation and prove it with the first. A platform decision is only defensible if you can point at the moment the next build got cheaper, which means the second and third tools have to be nearly free. That is also why measurement has to be designed in: a programme that cannot state its own return will eventually be asked to justify itself with anecdote, and anecdote loses to a spreadsheet.",
  },
  {
    slug: "collections-forecast",
    name: "Collections Forecast",
    category: "AI-Assisted Finance Analytics",
    status: "Pilot · on ORBIT since Oct 2026",
    functions: "Finance · CRM · Collections",
    role: "Product owner — requirements, business rules, AI-assisted build, deployment",
    timeline: "Requirements 1 Oct → live on ORBIT 19 Oct 2026",
    tagline:
      "A month-wise forecast of customer cash inflow, with an assistant that answers in plain English and can show where every number came from.",
    focus: [
      "Rule engine design",
      "Privacy-masked LLM",
      "Answer verification",
      "Data integration",
      "Executive analytics",
    ],
    stack: [
      "Python",
      "Flask",
      "SQLAlchemy",
      "SQLite",
      "Anthropic Claude API",
      "Salesforce REST API",
      "RapidFuzz",
      "ECharts",
      "Waitress · IIS",
    ],
    headlineMetrics: [
      { value: "18 days", label: "from requirements document to live on the platform" },
      { value: "₹1", label: "reconciliation tolerance; beyond it the run fails" },
      { value: "~13 s", label: "to import 49,091 billing lines" },
      { value: "358", label: "automated test functions" },
    ],
    problem:
      "Leadership's question, how much will we collect next month, had no quick answer. It took a manual SAP extract, lookups against target-date and payment-term sheets, and Excel pivots prepared per tower. The process was slow, depended on one person, and was hard to repeat, so the number arrived late and could not be questioned further.",
    existingProcess: [
      "An analyst pulled the SAP billing plan and the debtors report by hand.",
      "Each line was looked up against target-date templates and payment-term sheets to decide when it would fall due.",
      "Subvention deductions were worked out from separate bank workbooks.",
      "Unsold inventory came from a separate Salesforce export, uploaded by hand.",
      "The answer was a pivot table. A follow-up question meant starting again.",
    ],
    opportunity: [
      "The projection itself is deterministic: instalment, scheme, milestone and target date decide when money falls due. That belongs in a rule engine, not a model.",
      "The questions executives ask are open-ended, which fixed screens cannot anticipate. That is where a language model earns its place, as the interface and never as the calculator.",
      "Both source systems already produced the data: SAP reports were landing each morning through ReportGenie, and Salesforce exposes an API.",
      "Customer data could not go to an external model as it stood, so masking had to be a precondition of every call rather than a policy.",
    ],
    solution:
      "A forecasting tool on the ORBIT platform. A rule engine projects every billing line into the month its cash is expected, nets advances, deducts subvention, and refuses to publish unless every category reconciles to the imported total within one rupee. A dashboard shows the result by month, project, scheme and milestone, with overdue ageing and drill-down to individual lines. Ask ORBIT, an assistant for executives, answers plain-English questions over the same data: known questions are answered by rules with no model call, and anything else is planned as read-only SQL by Claude, with customer identities masked before anything leaves the server and every figure in the answer traced to a result cell.",
    howItWorks: [
      "Ingest — SAP billing-plan and debtors files arrive each morning from ReportGenie or by upload. Salesforce projects, units and bookings sync daily over the REST API, replacing all three tables at once or not at all, and refusing an empty result.",
      "Rule engine — due dates derived from the SAP payment-term text, billed and overdue status taken from the debtors open-items report, advances netted and subvention deducted. The run fails unless every category adds back to the imported total within ₹1.",
      "Dashboard — KPI cards, a month chart, a scheme-by-month heat map, a project-by-month matrix with drill-down to lines, overdue ageing, upcoming milestones, and Excel export.",
      "Ask ORBIT, rules first — a local parser with fuzzy matching answers known question shapes without calling a model.",
      "Ask ORBIT, model second — two fixed calls to Claude: plan one to four read-only queries, then write the answer from the returned rows, with schema-forced JSON output. A bounded pipeline, deliberately not an open-ended agent loop.",
      "Privacy — customer names, units, bookings and projects become keyed codes before any call, and a leak scan runs on every outgoing prompt.",
      "SQL guard — queries run on a read-only connection restricted to views, with an authoriser, an allowed-function list, and a five-second limit.",
      "Verification — each figure in an answer is read from the result cell it cites, and a sentence whose numbers match no cell is marked unverified.",
      "Platform — ORBIT single sign-on, role-based access with the assistant limited to executive and admin roles, an audit log, and a daily per-user question limit.",
    ],
    myRole: [
      {
        area: "Requirements",
        detail:
          "Wrote the business requirements document: four user roles, the projection rules, and the open questions that needed sign-off.",
      },
      {
        area: "Business rules",
        detail:
          "Supplied the projection and subvention rules and corrected them against real data, including rewriting the subvention rule a day after its first specification.",
      },
      {
        area: "Solution design",
        detail:
          "Kept all arithmetic in the rule engine and confined the model to planning queries and wording answers, then designed the masking, SQL guard, and verification around it.",
      },
      {
        area: "AI-assisted build",
        detail:
          "Directed the build through AI coding agents working from written specifications and plans, settling each design question as a numbered ruling.",
      },
      {
        area: "Integration",
        detail: "Set up the Salesforce connection and daily sync, and wired in the SAP feeds that ReportGenie already delivered.",
      },
      {
        area: "Deployment",
        detail: "Moved the tool onto ORBIT as a supervised service behind the platform's reverse proxy, with backups, approving each live step.",
      },
    ],
    impact: [
      "Live on ORBIT on 19 October 2026, eighteen days after the requirements document was written.",
      "Imports 49,091 billing lines in about 13 seconds and recalculates the full projection in about five.",
      "The reconciliation gate means a published forecast always adds back to its source. A projection that does not reconcile is never shown.",
      "Over 99 percent of SAP customers matched to their Salesforce records, so sold and unsold inventory sit in one view.",
      "Ask ORBIT's release gate is a 29-question evaluation set, including a prompt-injection case.",
      "No hours are claimed. Time saved has not been measured, and the catalogue carries zero minutes per item until it is.",
    ],
    learned:
      "The definitions were harder than the dashboard. The requirements assumed a line with a billing date had been billed. The real data showed that SAP's billing dates on unbilled lines are placeholders, so billed and overdue status had to come from the debtors report instead. No amount of interface work would have surfaced that; only running the rules against real data did. That is why the reconciliation gate exists: a forecast that cannot add back to its source should never reach a CFO.",
  },
  {
    slug: "tds-flow-engine",
    name: "TDS Flow Engine",
    category: "Workflow Automation",
    status: "Live in production",
    functions: "Direct Tax",
    role: "Sole owner — discovery to production",
    timeline: "Quarterly cycle · live",
    tagline:
      "A repetitive quarterly tax certificate ritual turned into a controlled, scalable batch workflow.",
    focus: [
      "Process transformation",
      "Security by design",
      "Workflow design",
      "Vendor replacement",
      "Operational efficiency",
    ],
    stack: ["Excel VBA", "Power Automate", "Outlook", "PDF encryption tooling"],
    headlineMetrics: [
      { value: "1,300 hrs", label: "of manual work removed per year" },
      { value: "26,000", label: "certificates issued a year" },
      { value: "~2 wks → <1 day", label: "quarterly issuance cycle" },
      { value: "Vendor", label: "dependency removed entirely" },
    ],
    problem:
      "Every quarter the direct tax team issued roughly 6,500 tax certificates to vendors by hand. Each document had to be individually renamed to a vendor convention, password-protected, attached, and emailed. That is thousands of repetitive, high-stakes actions on confidential financial documents, with a real risk of a certificate reaching the wrong party, and it consumed about two working weeks of the team's quarter.",
    existingProcess: [
      "A certificate was generated, then renamed by hand to the vendor naming convention.",
      "Each PDF was individually password-protected, and some had to be delivered as password-protected archives.",
      "Each was attached to an email and sent one recipient at a time.",
      "There was no delivery register, so answering which certificate went where, and when, meant searching a mailbox.",
      "The alternative on offer was an external vendor, which carried both a cost and a confidentiality question.",
    ],
    opportunity: [
      "The task was high-volume and entirely rule-governed. Nothing in it required a person to decide anything, which makes it a clean automation candidate rather than an AI one.",
      "The real risk was misdelivery rather than misjudgement, and misdelivery risk can be encoded as controls: naming derived from the record, per-document encryption, and a delivery log.",
      "Confidentiality ruled out third-party tooling, so building in-house was not just cheaper, it was the only acceptable route.",
      "The volume made the payback obvious before a line was written: 26,000 documents a year at roughly three minutes each.",
    ],
    solution:
      "An in-house, end-to-end distribution workflow that renames, encrypts, and dispatches thousands of confidential tax certificates each quarter through controlled channels, with per-recipient delivery tracking, error logging, and no third-party software anywhere in the path.",
    howItWorks: [
      "Ingestion — reads certificate files from designated folders and logs each record into a structured register that becomes the audit trail.",
      "Preparation engine — automated renaming to the vendor convention and per-document password protection, including password-protected archives where the recipient requires them.",
      "Dispatch layer — bulk, controlled distribution through the corporate mail environment, with per-recipient tracking rather than a single blind send.",
      "Audit layer — delivery status, failures, and exceptions logged for review, behind a simple operator interface the tax team runs themselves.",
      "Validation discipline — built and debugged alongside the business user, and proved on controlled batches before the first live quarter.",
    ],
    myRole: [
      {
        area: "Process discovery",
        detail:
          "Found this in conversation with the tax team. It was a quarterly ritual everyone had assumed was inherently manual.",
      },
      {
        area: "Requirements gathering",
        detail:
          "Worked through the naming conventions, the encryption rules, and the archive cases directly with the person who ran the process.",
      },
      {
        area: "Solution design",
        detail: "Designed the ingest, prepare, dispatch, and audit stages and the register that ties them together.",
      },
      { area: "Automation", detail: "Built the renaming, encryption, and bulk dispatch engine." },
      { area: "Testing & UAT", detail: "Validated on controlled batches with the business user before any live run." },
      { area: "Deployment", detail: "Took it into the live quarterly cycle and supported the first supervised runs." },
      {
        area: "Stakeholder management",
        detail:
          "Secured tax-team confidence on a confidential document flow, and reported the outcome to senior management.",
      },
    ],
    impact: [
      "1,300 hours of manual work removed per year, from roughly 26,000 certificates at about three minutes each.",
      "The quarterly cycle went from about two weeks of manual effort to under a day of supervised monitoring, a reduction of roughly 90 to 95 percent.",
      "Multiple person-weeks returned to the tax team every quarter, redirected onto assessment and advisory work.",
      "Delivery tracking and per-document encryption removed the misdelivery exposure that the manual process carried.",
      "External vendor dependency and its cost eliminated, with the statutory deadline met in-house.",
      "Formally appreciated by the direct tax team and endorsed by senior management.",
    ],
    learned:
      "Early flagship wins buy the mandate for everything after them. This project is why I was subsequently able to go looking for gaps across other functions rather than waiting to be assigned one. It also set the security-by-design default that every later system inherited.",
  },
  {
    slug: "fundflow-agent",
    name: "FundFlow Agent",
    category: "Finance Automation",
    status: "Partly deployed · runs daily on ORBIT",
    functions: "Finance · Treasury",
    role: "Sole owner — discovery to production",
    timeline: "Multi-phase · ORBIT rebuild live since Sep 2026",
    tagline:
      "Mutual fund statements from inbox to a verified daily holdings report, without anyone re-keying a figure.",
    focus: [
      "Document extraction",
      "Workflow orchestration",
      "Verification by design",
      "Error handling",
      "Unattended operation",
    ],
    stack: [
      "Python",
      "Flask",
      "pdfplumber",
      "pikepdf",
      "Outlook COM",
      "SQLite",
      "Task Scheduler",
      "openpyxl",
    ],
    headlineMetrics: [
      { value: "375 hrs", label: "a year at full deployment, estimated" },
      { value: "808", label: "statements read in the first five weeks on ORBIT" },
      { value: "10", label: "fund-house layouts parsed, plus a generic parser" },
      { value: "~3 min", label: "average daily run" },
    ],
    problem:
      "The finance team spent about ninety minutes of every working day requesting mutual fund statements, hunting for PDF attachments scattered across email threads, and keying investment and market values into a spreadsheet. Every folio arrived in a differently formatted document, so extraction was slow and error-prone, on records that feed treasury visibility and therefore have to be right.",
    existingProcess: [
      "Someone emailed each asset management company to request the day's statements.",
      "Replies arrived across the day and had to be found among ordinary mail traffic, with the attachment opened using that institution's own password convention.",
      "Invested value, market value, and gain or loss were read off each statement and typed into a spreadsheet.",
      "Ten institutions meant ten layouts, plus edge cases like multi-scheme folios and statements spanning pages.",
      "The routine consumed a meaningful share of the productive day and produced no analysis, only data movement.",
    ],
    opportunity: [
      "The request-and-collect half of the process was pure orchestration with no judgement in it, so it could be automated outright.",
      "The extraction half was rule-governed per layout, and ten known fund houses cover the folio list. Where a statement does not match, the right answer is to say so, not to guess.",
      "Because the output feeds treasury records, every extracted value needed a stated status: verified, needs review, or failed.",
      "Statements carry the organisation's holdings and arrive password-protected, so everything had to run on internal infrastructure, and the source PDFs could not be kept once read.",
    ],
    solution:
      "A pipeline built in phases. Statement requests, receipt and filing run unattended each day. The extraction and reporting phase, rebuilt as an ORBIT tool in September 2026, reads the day's statements from the mailbox, values every folio on the list from its latest statement, and emails a results workbook, an errors workbook and a dashboard. Every row is marked verified, needs review, or failed, and none is ever a guess. The statements are deleted once the report has gone.",
    howItWorks: [
      "Orchestration — scheduled workflows request statements from fund houses, receive the replies, and file the PDFs, unattended.",
      "Intake — a runner checks every five minutes whether the day's report is due, then reads PDF attachments, PDFs inside zip files and forwarded mails, opening each password-protected statement. A hash ledger means a PDF seen twice is processed once.",
      "Extraction — each statement is parsed once, in parallel, by one of ten fund-house extractors chosen by detecting the issuer, with a generic parser behind them. Each folio is reported from its latest statement in the batch.",
      "Verification — every row is marked verified, needs review, or failed. Nothing is filled in by inference.",
      "Delivery — results, errors and a dashboard are emailed at the configured send time, then the batch is deleted. If the mail fails or the run crashes, the batch is kept and carried into the next run.",
      "Control surface — an ORBIT screen holds the folio list, send time, recipients, a run-now button and an audit log, so the finance team changes configuration without touching a server.",
    ],
    myRole: [
      {
        area: "Process discovery",
        detail: "Identified the daily routine as a candidate by watching where the finance team's day actually went.",
      },
      {
        area: "Requirements gathering",
        detail: "Collected the edge cases from the people who handled the statements, and made their exceptions the specification.",
      },
      {
        area: "Solution design",
        detail: "Designed the phased rollout and the three verification states that make the output auditable.",
      },
      {
        area: "Re-platforming",
        detail:
          "Rebuilt the extraction phase as an ORBIT tool: one parse per statement instead of one per folio, and a stated status on every row.",
      },
      { area: "Automation", detail: "Built the request, collection, filing, extraction, and reporting stages." },
      {
        area: "Testing & UAT",
        detail: "Rolled out in phases with user acceptance testing at each stage, stress-tested against large multi-folio datasets.",
      },
      { area: "Deployment", detail: "Runs daily on ORBIT, with an alert email on any failed run." },
    ],
    impact: [
      "An estimated 375 hours a year at full deployment, from about ninety minutes a day across 250 working days. The register keeps these hours out of the realised total until the ORBIT phase is stable.",
      "808 statements read across 23 daily reports from October to 3 November 2026, with an average run of about three minutes.",
      "The folio list grew from 138 to 144 with no code change, because coverage is configuration rather than new manual work.",
      "Every value is verified, flagged for review, or failed, so a finance user knows exactly which figures to check.",
      "Re-keying of fund figures removed from the daily routine, and statement PDFs deleted once the report has gone.",
    ],
    learned:
      "The rebuild removed a defect the old version had carried quietly: parsing a statement once per folio could report a stale value. Parse each document once and report each folio from its latest statement, and that whole class of error disappears. The same discipline runs through the verification states: a row the system cannot read with certainty is shown to a person as exactly that, never filled in by something cleverer.",
  },
  {
    slug: "tds-certificate-ocr",
    name: "TDS Certificate OCR Platform",
    category: "AI Document Intelligence",
    status: "Live · evolving to AI agent",
    functions: "Customer Relations · Accounts Receivable",
    role: "Sole owner — discovery to production",
    timeline: "Five major versions · live",
    tagline:
      "AI-assisted extraction that reads inconsistent scanned certificates, and knows when to ask a human.",
    focus: [
      "Document intelligence",
      "Confidence scoring",
      "Human-in-the-loop design",
      "Data quality",
      "Offline AI",
    ],
    stack: [
      "Python",
      "PaddleOCR",
      "Regex extraction",
      "Local LLM via Ollama",
      "Excel reporting",
      "Automated email alerts",
    ],
    headlineMetrics: [
      { value: "245 hrs", label: "of manual work removed per year, estimated" },
      { value: "~10,000", label: "certificates a year, from the usage log" },
      { value: "Offline", label: "AI extraction layer" },
      { value: "Zero", label: "unverified values posted" },
    ],
    problem:
      "Customer-facing and receivables teams received a constant stream of scanned tax certificates in uncontrollable formats: single-page, multi-page, bundled scans, poor quality. Each one required reading and keying more than fifteen fields into enterprise systems, and duplicate certificates regularly slipped through and were applied twice.",
    existingProcess: [
      "Certificates arrived from external customers, so neither format nor scan quality could be controlled at source.",
      "A person opened each document, read more than fifteen fields by eye, and typed them into the enterprise system.",
      "Bundled scans had to be split by hand, and two similar certificate types had to be told apart by eye.",
      "There was no duplicate check, so the same credit could be applied twice or against the wrong customer ledger.",
      "Volume was continuous rather than seasonal, making this a permanent daily load that the usage log now puts at about 10,000 certificates a year.",
    ],
    opportunity: [
      "Format could never be standardised at source, which rules out a rules-only approach and makes this a genuine AI problem rather than a scripting one.",
      "The fields feed tax-sensitive financial records, where a wrong value is worse than a missing one. That argues for confidence scoring and human review of the uncertain cases rather than full automation.",
      "Duplicate and mismatch detection was a control the manual process simply did not have, so automation could add accuracy rather than only speed.",
      "No external OCR or AI service was acceptable for these documents, so the AI layer had to run offline.",
    ],
    solution:
      "An intelligent document-processing platform that splits bundled scans, classifies certificate types, extracts more than fifteen fields with per-field confidence scoring, detects duplicates against the register of processed references, and carries a fully offline local language-model fallback for layouts the rules cannot parse, built and held disabled in production. Every run emits audit-ready outputs.",
    howItWorks: [
      "OCR layer — text extraction with smart grouping and page detection to segment bundled documents into individual certificates.",
      "Classification — automatic detection of certificate type before field extraction begins.",
      "Extraction and validation — rule-based field extraction with per-field confidence scores. Low-confidence or missing fields are flagged for human review rather than silently accepted.",
      "Duplicate detection against the register of previously processed references, catching repeats before they reach a ledger.",
      "Offline AI fallback — a locally hosted small language model for layouts the rules cannot parse, with its output passed through the same strict validation as everything else. Built, and switched off in production until it is needed.",
      "Audit outputs — every run emits a summary workbook, an error workbook, and a full log, emailed automatically to stakeholders. Failed documents stay in place for safe retry.",
    ],
    myRole: [
      {
        area: "Process discovery",
        detail: "Traced the daily keying load and the duplicate-credit risk back to a single uncontrolled document intake.",
      },
      {
        area: "Solution design",
        detail:
          "Designed the split, classify, extract, validate, and review pipeline, and the confidence thresholds that decide what a human sees.",
      },
      {
        area: "AI implementation",
        detail:
          "Built the offline language-model fallback and constrained it behind the same validation as the deterministic extractors.",
      },
      { area: "Automation", detail: "Built the bundling logic, the duplicate register, and the per-run audit reporting." },
      {
        area: "Testing & UAT",
        detail:
          "Tuned extraction against real certificate pages across five major versions, driven by observed failures rather than coverage targets.",
      },
      { area: "Deployment", detail: "Runs daily in production with proactive failure alerting and retry-safe design." },
    ],
    impact: [
      "An estimated 245 hours of manual work removed per year, from about 10,000 certificates at 1.47 minutes each. The per-certificate time has not been timed; at six minutes the figure would be about 1,000 hours.",
      "3,612 certificates processed on ORBIT between 4 June and 12 October 2026, read from the platform's usage log.",
      "Duplicate and mismatch detection prevents the same credit being applied twice or against the wrong customer ledger, which is a direct control over receivables accuracy.",
      "Uncertain values are routed to a person rather than posted, so bad data does not reach finance records.",
      "Full auditability: summary, exceptions, and logs delivered to stakeholders on every run.",
      "Privacy-compliant by construction, because the AI layer runs entirely offline.",
    ],
    learned:
      "Confidence scoring is the difference between automation people tolerate and automation people trust. The system stopped pretending to be perfect and started telling users exactly where to look, and that single change is what moved it from a tool someone ran to a tool the team relies on.",
  },
  {
    slug: "reportgenie",
    name: "ReportGenie",
    category: "Enterprise Reporting Automation",
    status: "Live in production",
    functions: "Finance",
    role: "Sole owner — discovery to production",
    timeline: "Live · multi-department roadmap",
    tagline: "A config-driven reporting engine where adding a new report is data entry, not a code change.",
    focus: ["Config-driven architecture", "Reusable framework", "Scalability", "Unattended operation"],
    stack: [
      "Python",
      "SAP GUI Scripting (COM)",
      "Excel configuration",
      "Automated email delivery",
      "Scheduled VM",
    ],
    headlineMetrics: [
      { value: "250 hrs", label: "of manual work removed per year" },
      { value: "3,000", label: "reports delivered a year" },
      { value: "Config", label: "not code, to add a report" },
      { value: "Daily", label: "unattended delivery" },
    ],
    problem:
      "Finance depended on a battery of recurring system reports covering dividends, payables, reconciliations, statutory deductions, and staff loans. Each one demanded a daily ritual: log in, apply the correct saved variant, export to Excel, and email the right users. Pure repetition, yet essential for monitoring pending items and making timely decisions.",
    existingProcess: [
      "For each report, a person logged into the enterprise system and navigated to the transaction.",
      "They applied the correct saved variant, which differed per report and followed inconsistent naming conventions.",
      "They exported to Excel through the system's save dialogs, then attached the file to an email.",
      "They sent it to that report's recipient list, which differed from every other report's.",
      "Repeated daily, across the full battery, for about 3,000 report deliveries a year.",
    ],
    opportunity: [
      "Every report reduced to the same triple: a transaction code, a saved variant, and a recipient list. That is a configuration row, not a program.",
      "Because the variation between reports was data rather than logic, one engine could serve all of them, and adding the next report would be data entry.",
      "The task was strictly rule-governed with no judgement in it, so this was an automation problem rather than an AI one.",
      "The same driver could be reused for later system-automation projects, so the investment paid back beyond this one build.",
    ],
    solution:
      "An automated platform that logs into enterprise systems, executes predefined report variants across transactions, exports date-stamped Excel outputs, and emails them to the right users. It runs unattended on a scheduled virtual machine with per-report status tracking, and new reports are added by appending a configuration row.",
    howItWorks: [
      "Configuration — a worklist of transaction codes, saved variants, and recipient lists, held as data rather than in code.",
      "Driver — Python controlling the enterprise GUI, applying each variant and exporting to Excel through the system's save dialogs.",
      "Delivery — date-stamped outputs emailed per report to the correct recipients, so each file is traceable to a run.",
      "Fault isolation — one failed report never blocks the others in a run; failures are captured with reasons.",
      "Unattended operation — scheduled on a virtual machine, surviving session and login quirks without a person nearby.",
    ],
    myRole: [
      {
        area: "Process discovery",
        detail: "Identified that the daily reporting ritual was the same four steps repeated across a whole battery of reports.",
      },
      {
        area: "Solution design",
        detail: "Made the call to build a configuration-driven engine rather than a script per report, which is what made it reusable.",
      },
      { area: "Automation", detail: "Built the GUI driver, the variant handling, the export path, and the per-report delivery." },
      {
        area: "Integration",
        detail: "Handled the enterprise system's save dialogs and login behaviour reliably enough for unattended operation.",
      },
      {
        area: "Deployment",
        detail: "Scheduled on a virtual machine for unattended daily execution with per-report status tracking.",
      },
      {
        area: "Stakeholder management",
        detail: "Onboarded finance users onto delivered reports and took enhancement requests through to release.",
      },
    ],
    impact: [
      "250 hours of manual work removed per year, from about 3,000 report deliveries at roughly five minutes each.",
      "The full daily report battery delivered unattended, with per-report traceability.",
      "Faster monitoring of pending items and more timely decisions for finance users.",
      "Unsolicited formal appreciation from the business, recorded as a project success.",
      "A reusable automation framework that lowered the cost of every subsequent enterprise-system project.",
    ],
    learned:
      "When the variation between instances is data rather than logic, the answer is one engine and a configuration table, not one script per instance. That decision is why the framework outlived its first use case and became the basis for later builds.",
  },
  {
    slug: "msme-batch-validator",
    name: "MSME Batch Validator",
    category: "Compliance Automation",
    status: "Live",
    functions: "Cost Control · Accounts Billing",
    role: "Sole owner — discovery to production",
    timeline: "On-demand · live",
    tagline: "Regulatory verification at scale, with people kept on the genuinely uncertain cases.",
    focus: ["Compliance", "Human-in-the-loop design", "Data quality", "Cost control", "Fuzzy matching"],
    stack: [
      "Python",
      "PDF extraction",
      "Government registry verification API",
      "Fuzzy matching",
      "Excel consolidation",
    ],
    headlineMetrics: [
      { value: "160 hrs", label: "of manual work removed per year" },
      { value: "1,600", label: "vendor registrations verified a year" },
      { value: "Days → minutes", label: "verification cycle" },
      { value: "Audit-ready", label: "centralised output" },
    ],
    problem:
      "The cost control and billing teams needed to verify the registration status of a very large vendor base against a government portal, required for compliance, quarterly reporting, and correct payment treatment. Done by hand, one portal lookup at a time plus transcription from registration PDFs, it would have taken days per cycle.",
    existingProcess: [
      "A person opened each vendor's registration PDF and transcribed the details by hand.",
      "They then looked up each vendor on the government portal individually to confirm status.",
      "Results were reconciled against internal vendor records that carried duplicate codes, inconsistent state casing, missing dates, and multi-state entries.",
      "The output fed statutory reporting, so inconsistency between cycles created audit friction.",
    ],
    opportunity: [
      "The lookup itself was available as an API, so the slow part was not the check but the volume of manual checks.",
      "Vendor master data was messy enough that naive matching would produce wrong answers, which argued for fuzzy matching plus explicit human review of ambiguous cases rather than blind automation.",
      "The verification API carries a real per-call cost, so the design needed a human sign-off gate before anything expensive ran.",
      "Because the output feeds statutory reporting, consolidating it into one consistent audit-ready artefact was worth as much as the time saved.",
    ],
    solution:
      "A verification platform that extracts vendor registration details from compliance PDFs, validates them in bulk against the government registry via API, fuzzy-matches results back to the vendor master, and produces a single audit-ready output with three-tier review tagging so people only look at genuinely uncertain cases.",
    howItWorks: [
      "Stage one — PDF import and data extraction from vendor registration documents into structured form.",
      "Stage two — collaborative data review and enrichment with the billing team, before anything costly runs.",
      "Stage three — bulk validation through the official registry verification API, gated behind explicit human sign-off.",
      "Stage four — matching and consolidation: fuzzy matching on state and vendor name, enriched with internal vendor codes, merged into one audit-ready workbook.",
      "Three-tier tagging — clean matches auto-filled, ambiguous cases tagged for multi-option review, non-matches tagged for targeted follow-up.",
    ],
    myRole: [
      {
        area: "Process discovery",
        detail: "Scoped a quarterly compliance pain point raised by cost control into a staged pipeline with explicit checkpoints.",
      },
      {
        area: "Requirements gathering",
        detail: "Worked through the vendor master's data quality problems with the billing team before designing the matching logic.",
      },
      {
        area: "Solution design",
        detail:
          "Designed the three-tier tagging model so review effort concentrates on uncertainty, and the sign-off gate that protects the API spend.",
      },
      {
        area: "Automation",
        detail: "Built the PDF extraction, the bulk validation, the fuzzy matching, and the consolidation into one output.",
      },
      { area: "Integration", detail: "Integrated the official government registry verification API." },
      {
        area: "Stakeholder management",
        detail: "Delivered stakeholder-requested enhancements responsively after the first production cycle.",
      },
    ],
    impact: [
      "160 hours of manual work removed per year, from about 1,600 vendor registrations at roughly six minutes each.",
      "Well over a thousand registrations verified in a single run, compressing days of manual work into minutes.",
      "The overwhelming majority of records auto-filled cleanly, leaving people to review only a small, clearly tagged remainder.",
      "Standardised, consistent validation across the entire vendor base with a centralised, audit-ready output.",
      "Supports payment-timeline compliance obligations and reduces disallowance risk at assessment.",
      "A reusable pattern for future large-dataset compliance validations, and acknowledged by the cost control team.",
    ],
    learned:
      "Human-in-the-loop is a design decision about where to spend attention, not a fallback for when automation fails. Tagging the uncertain cases in three tiers meant the team's review effort landed exactly where judgement was actually needed, and the sign-off gate meant automation never quietly spent money.",
  },
  {
    slug: "sap-zbrs-automation",
    name: "SAP ZBRS Automation",
    category: "Enterprise System Automation",
    status: "Live in production",
    functions: "Payments · Finance",
    role: "Sole owner — discovery to production",
    timeline: "Monthly cycle · live",
    tagline:
      "Unattended reconciliation statement generation across hundreds of accounts, filed correctly every month.",
    focus: ["Legacy system automation", "Fault tolerance", "Reliability", "Audit readiness"],
    stack: ["Python", "SAP GUI Scripting (COM)", "Excel account master", "Automated email reporting"],
    headlineMetrics: [
      { value: "96 hrs", label: "of manual work removed per year" },
      { value: "720", label: "statements generated a year" },
      { value: "~97%", label: "first-pass success" },
      { value: "Zero", label: "misfiled statements" },
    ],
    problem:
      "Every month the payments team generated bank reconciliation statements from SAP for hundreds of accounts across multiple entities. Each one meant logging in, running the transaction, setting the dates, exporting a PDF, and filing it by hand into a deeply nested folder structure. Slow, repetitive, and easy to misfile in a way that creates audit friction later.",
    existingProcess: [
      "A person logged into SAP and ran the reconciliation transaction for one account.",
      "They set the date range for that account's cycle, then exported the result as a PDF.",
      "They filed the PDF by hand into a month, department, company code, and account hierarchy on enterprise storage.",
      "Repeated for hundreds of accounts spanning multiple companies and company codes, each with its own ledger ranges.",
      "A misfiled statement was not obvious at the time, and cost far more to untangle at audit than the filing itself had saved.",
    ],
    opportunity: [
      "The volume was high and the rules were strict, with the expensive part being the filing rather than the thinking. That is automation, not AI.",
      "The account master already existed as structured data, so the worklist did not have to be invented.",
      "The only real risk was brittleness in the SAP GUI layer, and brittleness can be contained with fault isolation rather than avoided by not automating.",
      "Structured automatic output would eliminate misfiling as a category, which was worth more to auditors than the hours.",
    ],
    solution:
      "A Python-driven SAP GUI automation that runs reconciliation reports for hundreds of bank accounts from a master sheet, exports each as a PDF, and files it into a structured month, department, entity, and account hierarchy. Built with fault-tolerant batch design so one failure never stops the run, and an emailed audit summary on completion.",
    howItWorks: [
      "Driver — Python controlling the SAP GUI through COM scripting, reading the account master with account, company code, and ledger range from Excel.",
      "Batch engine — iterates every account, runs the reconciliation transaction, and exports the statement as a PDF.",
      "Auto-filing — outputs organised into a month, department, company code, and account hierarchy on enterprise storage, eliminating manual filing entirely.",
      "Fault isolation — each account is an independent unit of work. Failures are captured with reasons into an exception workbook and the run continues.",
      "Reporting — an automated summary email with totals, successes, failures, and a link to the output folder, so failed accounts support surgical re-runs.",
    ],
    myRole: [
      {
        area: "Process discovery",
        detail:
          "Modelled the real statement cycle and month-end scenarios with the payments team, which prevented an entire class of date-logic bugs.",
      },
      {
        area: "Solution design",
        detail: "Chose fault isolation and targeted re-runs over chasing a perfect first pass, because the fragile layer was the GUI.",
      },
      {
        area: "Automation",
        detail:
          "Built the SAP GUI driver, the batch engine, and the automatic filing hierarchy. This was a deliberate first investment in SAP GUI automation.",
      },
      { area: "Integration", detail: "Integrated with the Excel account master and enterprise storage." },
      {
        area: "Testing & UAT",
        detail: "Surfaced brittle element identifiers and account-state edge cases in early runs and hardened against both.",
      },
      {
        area: "Deployment",
        detail: "Moved to unattended monthly execution with an emailed audit trail to the payments team.",
      },
    ],
    impact: [
      "96 hours of manual work removed per year, from about 720 statements at roughly eight minutes each.",
      "Hundreds of bank accounts processed unattended each cycle, with roughly 97 percent first-pass success and clean completion after targeted re-runs.",
      "Zero misfiling, because every statement lands exactly where auditors expect it by construction.",
      "The repetitive log-in, run, export, and file loop removed from the team's month entirely.",
      "Full audit trail delivered to the payments team automatically on every run.",
      "Opened the door to a broader enterprise-system automation suite, with open-item clearing as the natural successor.",
    ],
    learned:
      "Design the fault tolerance around the most fragile layer. In GUI automation that layer is always the interface itself, so isolation and a surgical re-run capability are worth more than trying to make the first pass perfect.",
  },
  {
    slug: "gv-hub",
    name: "GV Hub",
    category: "Enterprise Application Development",
    status: "UAT · on ORBIT since Aug 2026",
    functions: "Payments · Accounts Receivable · Retail operations",
    role: "Product owner and builder",
    timeline: "Prototype → web application → ORBIT tool",
    tagline: "From spreadsheets to a real platform: voucher inventory, approvals, and expiry intelligence in one system.",
    focus: [
      "Product thinking",
      "Approval workflow design",
      "Data modelling",
      "Multi-role access design",
      "Dashboarding",
    ],
    stack: ["Python", "Flask", "SQLAlchemy", "APScheduler", "ORBIT single sign-on", "Workflow & approval design"],
    headlineMetrics: [
      { value: "6", label: "modules in the platform" },
      { value: "Serial-level", label: "inventory traceability" },
      { value: "Zero", label: "failures on legacy migration" },
      { value: "Maker-checker", label: "approval control" },
    ],
    problem:
      "The retail business receives large volumes of gift vouchers from tenants and issues them internally across departments, historically tracked in a legacy ledger system and spreadsheets. There was no single source of truth, no real-time balances, no expiry alerts, no maker-checker approvals, and no serial-level traceability. Receivable dues slipped through and vouchers could silently lapse.",
    existingProcess: [
      "Inward vouchers were recorded in a legacy ledger system and mirrored into spreadsheets.",
      "Balances were derived by hand, so nobody could state current stock with confidence at any given moment.",
      "Issuance was requested and approved informally, without a maker-checker step or photo proof of what was actually received.",
      "Expiry was tracked by whoever remembered to check, so vouchers lapsed unnoticed.",
      "Tenant receivable dues were monitored separately, and slipped.",
    ],
    opportunity: [
      "This was not an automation problem but a system-of-record problem. The value was in having one authoritative source, not in removing keystrokes.",
      "The business already followed real rules informally, such as merging identical batches and picking oldest-expiry-first. Encoding them made them enforceable rather than optional.",
      "Multiple roles needed different views of the same inventory, which is a product and permissions problem rather than a scripting one.",
      "Expiry and receivables were both time-based and therefore automatable once the data model was right.",
    ],
    solution:
      "A centralised voucher inventory and workflow platform: inward requests, maker-checker approvals, serial-level inventory, batch-merge logic, expiry monitoring, receivables due tracking, and management dashboards. It replaces ledger-and-spreadsheet tracking with a single source of truth where balances are always derived from movements.",
    howItWorks: [
      "Data layer — a relational architecture holding central inventory, a transaction log, due records, and location references.",
      "Opening inventory module — a one-time migration from the legacy ledger with duplicate-serial validation and automatic source archiving.",
      "Receivables due module — per-tenant agreements auto-generate due records by frequency, with daily overdue intimations.",
      "Receipt module — physical voucher receipts auto-classified as full, partial, excess, or delayed, flowing through maker-checker approval into inventory, including an approve-with-edits path with photo proof review and verified-versus-claimed quantity adjustment.",
      "Issuance module — request forms with live availability, oldest-expiry-first picking, and serial-level deduction.",
      "Manager view — a KPI dashboard, live inventory, a tiered expiry monitor across critical, warning, and notice bands, the transaction log, and administrative actions.",
    ],
    myRole: [
      {
        area: "Process discovery",
        detail:
          "Mapped how vouchers actually moved between tenants, departments, and issue counters, including the informal rules nobody had written down.",
      },
      {
        area: "Requirements gathering",
        detail: "Wrote the business requirements document against a formal mandate from finance and accounts leadership.",
      },
      {
        area: "Solution design",
        detail:
          "Built a clickable prototype before a single application screen, so stakeholders aligned before build effort was committed.",
      },
      {
        area: "Architecture",
        detail:
          "Designed the relational data model, including the batch-merge rule that determines when stock consolidates and when it creates a new row.",
      },
      {
        area: "Automation",
        detail:
          "Built the approval flows, the automatic receipt classification, the expiry banding, and the confirmation communications.",
      },
      {
        area: "Integration",
        detail: "Migrated the legacy opening inventory with duplicate-serial validation and automatic archiving of the source.",
      },
      {
        area: "Stakeholder management",
        detail: "Ran a multi-role rollout across payments, receivables, and retail operations.",
      },
    ],
    impact: [
      "Replaces ledger-and-spreadsheet tracking with a real-time, single-source-of-truth platform.",
      "Full audit trail, serial-level traceability, tiered expiry alerting, and management reporting where none existed.",
      "The opening migration landed with every legacy batch imported and zero failures, and the source automatically archived.",
      "Working approval core live in production, with batch-merge logic validated on repeated identical receipts and automated confirmation communications.",
      "Balances are always derived from movements, so stock cannot drift away from the transactions behind it.",
      "A qualitative leap from single-purpose automations to a multi-module, multi-role enterprise application.",
    ],
    learned:
      "Data-model decisions are product decisions. The batch-merge rule encodes how the business actually thinks about stock, and getting it wrong would have made every downstream number wrong in a way no dashboard would have revealed.",
  },
  {
    slug: "bi-agent",
    name: "BI Agent",
    category: "AI Agent · Business Intelligence",
    status: "Test build · pilot next",
    functions: "Leadership · Finance · Sales · Treasury",
    role: "Product owner — requirements, groundwork, privacy design, AI-assisted build",
    timeline: "Oct – Nov 2026 · v1 test build",
    tagline:
      "Plain-English questions answered from the live Power BI models, with the model, query, and refresh time shown behind every figure.",
    focus: [
      "Agentic AI",
      "Tool design",
      "Answer verification",
      "Privacy engineering",
      "Evaluation design",
    ],
    stack: [
      "Python",
      "Flask",
      "Anthropic Claude API (tool use)",
      "Power BI REST API",
      "DAX",
      "MSAL",
      "XMLA / ADOMD.NET (groundwork)",
      "pytest",
    ],
    headlineMetrics: [
      { value: "7", label: "tools the agent can call, every one read-only" },
      { value: "12,440", label: "columns scanned for personal data across 128 models" },
      { value: "315", label: "real business questions catalogued to test against" },
      { value: "37 / 37", label: "shortlisted models queryable over REST" },
    ],
    problem:
      "Getting a number out of the organisation's Power BI estate meant knowing which report, page and filters held it, or asking the BI team. A question that cut across a report's layout needed a new visual. None of the shortlisted models carried descriptions and about eleven were copies of others, so even finding the right model took knowledge few people had.",
    existingProcess: [
      "Find the report that probably holds the figure, then the page, then the filters.",
      "If no report answered the question as asked, request a new visual from the BI team and wait.",
      "Leadership questions arrived as cross-cutting comparisons, which rarely matched any one report's layout.",
      "Nothing recorded which model, query, or data refresh a quoted figure came from.",
    ],
    opportunity: [
      "The questions are open-ended, but the answers must be exact DAX against unfamiliar models. That combination is the case for an agent that can explore a schema, rather than a fixed library of queries.",
      "My earlier Sales Agent, built on a single sales model, had already shown that leadership would ask plain-English questions: 89 of them from four people in its first five weeks on ORBIT. The open question was generalising that safely across the estate, not whether there was demand.",
      "The answers go to the CFO's office, so provenance and checking had to be properties of the code, not promises in a prompt.",
      "Model metadata contains personal data, so masking had to happen before the model ever saw a name.",
    ],
    solution:
      "An agent that answers business questions from the live Power BI models. Claude works in a tool-calling loop over seven read-only tools: open a model, search its schema, read its measures, list distinct values, run DAX, check data freshness, and project figures forward in Python. The code, not the model, records the model, query and refresh time behind every answer, and a verifier flags any number in the answer that no query returned.",
    howItWorks: [
      "Agent loop — Claude through the Anthropic SDK, at most ten tool rounds and five minutes per question, with a one-hour prompt cache and a fallback model.",
      "Guardrails in the tools — queries must start with EVALUATE or DEFINE, write commands are blocked as a backstop, blocked columns are refused, each model is checked against the user's allowed list, and results are capped at 400 rows.",
      "Knowledge without retrieval — each model's catalogue entry, exported schema, and the owner's notes are combined into one plain-text description and loaded whole. Vector search was rejected on purpose: DAX needs exact names, not similar ones.",
      "Projections in code — the projection tool rejects any input figure that no query returned, so a forecast cannot start from an invented number.",
      "Verification — the program records provenance, and a verifier checks every number in the answer against the returned figures, as returned or converted to crore, lakh, or a percentage.",
      "Privacy — names become keyed codes before anything reaches the model and are swapped back inside the DAX and on screen. Contact and identity-number patterns are replaced, the agent fails closed until its name dictionary is fully built, and questions about protected traits are refused with the legal reason.",
    ],
    myRole: [
      {
        area: "Product definition",
        detail: "Wrote the product requirements document, including the open decisions on naming, users, and model choice.",
      },
      {
        area: "Groundwork",
        detail: "Surveyed the estate: 123 models across 16 workspaces, a shortlist of 37, and REST query access confirmed on all 37.",
      },
      {
        area: "Privacy",
        detail:
          "Ran a personal-data scan across 128 models and drew up the 430-column sensitivity list that decides what is coded, blocked, or reviewed.",
      },
      {
        area: "Evaluation design",
        detail:
          "Catalogued 315 real questions by whether the data can answer them, and set up a model comparison to settle the model choice on evidence.",
      },
      {
        area: "AI-assisted build",
        detail: "Directed the build of the agent, its tools, and the verifier, reusing the masking method proven in Collections Forecast.",
      },
      {
        area: "Pilot preparation",
        detail: "Owns the ten pilot models: their notes, the column review, and the expected answers to test against.",
      },
    ],
    impact: [
      "Not yet in users' hands. This is a v1 test build running locally, with a pilot on ORBIT as the next phase, so no usage or time-saved figure is claimed.",
      "The groundwork made the estate legible for the first time: 123 models surveyed, 37 shortlisted, and every shortlisted model confirmed queryable.",
      "A personal-data scan of 12,440 columns across 128 models flagged 316 columns, which now decide what the agent may see, must code, or never touches.",
      "A bank of 315 real business questions, graded by whether the data can answer them, gives the pilot a test set rather than a demo.",
      "Masking is a shared component reused from Collections Forecast, rather than a promise each tool makes on its own.",
    ],
    learned:
      "Facts a model writes can be wrong; facts the code records cannot. So citation, arithmetic, and number-checking all moved out of the prompt and into code: the agent chooses the query, but the program records where each figure came from and flags an answer whose numbers it cannot find. That is the line between an assistant leadership can try and one they can rely on.",
  },
];

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}
