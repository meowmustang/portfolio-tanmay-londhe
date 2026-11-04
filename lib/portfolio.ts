/**
 * The automation portfolio, mirrored from the programme's evidence register
 * (Automations_VOMEET.xlsx, evidence as at 12 Oct 2026), plus work started since.
 *
 * Hours are the register's own annualised estimates: annual volume multiplied by
 * minutes saved per unit. The minutes are estimates, not timed, and the register
 * says so; so does the site. Tools with no agreed estimate carry no hours.
 *
 * Deliberately left out: Excel Consolidator, PowerBI MCP and Claude Usage Tracker,
 * which are in the register but have no source on this machine. Add them once
 * confirmed. (Sales Agent is mine, built for a colleague on his API keys.)
 */
export type Automation = {
  name: string;
  /** Business function served. */
  fn: string;
  /** The register's verified stage. */
  status: "Deployed" | "Partly deployed" | "UAT" | "Pilot" | "In build";
  /** Estimated hours of manual work removed per year, where the register states one. */
  hours: number | null;
  /** Where the volume behind `hours` comes from. */
  evidence?: "System log" | "Team-reported";
  /** Replaces "not yet measured" when an empty hours cell means something else. */
  hoursNote?: string;
  /** Set when this automation has a full case study on the site. */
  slug?: string;
};

export const automations: Automation[] = [
  { name: "ORBIT", fn: "All departments", status: "Pilot", hours: null, hoursNote: "counted in its tools", slug: "orbit" },
  { name: "TDS Flow Engine", fn: "Direct tax", status: "Deployed", hours: 1300, evidence: "Team-reported", slug: "tds-flow-engine" },
  { name: "TDS Certificate OCR Platform", fn: "CRM · Receivables", status: "Deployed", hours: 245, evidence: "System log", slug: "tds-certificate-ocr" },
  { name: "ReportGenie", fn: "Finance", status: "Deployed", hours: 250, evidence: "System log", slug: "reportgenie" },
  { name: "MSME Batch Validator", fn: "Cost control", status: "Deployed", hours: 160, evidence: "Team-reported", slug: "msme-batch-validator" },
  { name: "SAP ZBRS Dumper Bot", fn: "Payments", status: "Deployed", hours: 96, evidence: "System log", slug: "sap-zbrs-automation" },
  { name: "TDS Calculator", fn: "Tax", status: "Deployed", hours: 80, evidence: "System log" },
  { name: "PR Upload", fn: "IT — Business Apps", status: "Deployed", hours: 80, evidence: "Team-reported" },
  { name: "Tax Statement Converter", fn: "Direct tax", status: "Deployed", hours: 60, evidence: "System log" },
  { name: "Transfer Reconciler", fn: "Treasury", status: "Deployed", hours: null },
  { name: "FundFlow Agent", fn: "Finance · Treasury", status: "Partly deployed", hours: 375, evidence: "Team-reported", slug: "fundflow-agent" },
  { name: "SFDC Data Exporter", fn: "IT — Salesforce / CRM", status: "UAT", hours: 1040, evidence: "Team-reported" },
  { name: "Gift Voucher Manager", fn: "Payments · Retail", status: "UAT", hours: null, slug: "gv-hub" },
  { name: "Collections Forecast", fn: "Finance · CRM", status: "Deployed", hours: null, slug: "collections-forecast" },
  { name: "Sales Agent", fn: "Sales · Leadership", status: "Pilot", hours: null },
  { name: "Pre-construction Tracker", fn: "Projects", status: "Pilot", hours: null },
  { name: "MeetNotes", fn: "All departments", status: "Pilot", hours: null },
  { name: "AccessWatch", fn: "IT — Business Apps", status: "In build", hours: 96 },
  { name: "ArchiveSort", fn: "Tax", status: "In build", hours: 60 },
];

const sum = (pred: (a: Automation) => boolean) =>
  automations.filter(pred).reduce((n, a) => n + (a.hours ?? 0), 0);
const count = (s: Automation["status"]) => automations.filter((a) => a.status === s).length;

/**
 * Derived from the rows above so the headline cannot drift from them. These
 * reproduce the register's own summary: 3,686 at full deployment (the site's
 * headline, 2.05 FTE), 2,271 from deployed tools, 731 of those on system-log volumes.
 */
export const portfolioTotals = {
  /** Deployed tools only: the register's "realised" total. */
  realisedHours: sum((a) => a.status === "Deployed"),
  logBackedHours: sum((a) => a.status === "Deployed" && a.evidence === "System log"),
  /** Adds the partly deployed and UAT tools once fully live. In-build work is excluded. */
  fullDeploymentHours: sum((a) => ["Deployed", "Partly deployed", "UAT"].includes(a.status)),
  productiveHoursPerFte: 1800,
  deployedCount: count("Deployed"),
  partlyDeployedCount: count("Partly deployed"),
  uatCount: count("UAT"),
  pilotCount: count("Pilot"),
  inBuildCount: count("In build"),
  /** Four in design, one on hold at UAT; not listed by name. */
  alsoInDesign: 5,
  /** Headline FTE, at full deployment. */
  get fte() {
    return this.fullDeploymentHours / this.productiveHoursPerFte;
  },
  get realisedFte() {
    return this.realisedHours / this.productiveHoursPerFte;
  },
};
