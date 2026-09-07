/**
 * The wider automation portfolio, mirrored from the internal delivery tracker.
 * Hours are the tracker's own per-automation figures: annual volume multiplied by
 * measured minutes saved per unit. Only live and in-build work is listed here.
 */
export type Automation = {
  name: string;
  /** Business function served. */
  fn: string;
  status: "Live" | "In build";
  /** Estimated hours of manual work removed per year, where the tracker states one. */
  hours: number | null;
  /** Set when this automation has a full case study on the site. */
  slug?: string;
};

export const automations: Automation[] = [
  { name: "ORBIT", fn: "All departments", status: "Live", hours: 125, slug: "orbit", },
  { name: "FundFlow Agent", fn: "Finance", status: "Live", hours: 375, slug: "fundflow-agent", },
  { name: "TDS Flow Engine", fn: "Direct tax", status: "Live", hours: 1300, slug: "tds-flow-engine", },
  { name: "TDS Certificate OCR Platform", fn: "CRM · Receivables", status: "Live", hours: 300, slug: "tds-certificate-ocr", },
  { name: "SAP ZBRS Dumper Bot", fn: "Payments", status: "Live", hours: 96, slug: "sap-zbrs-automation", },
  { name: "ReportGenie", fn: "All departments", status: "Live", hours: 250, slug: "reportgenie", },
  { name: "MSME Batch Validator", fn: "Cost control", status: "Live", hours: 160, slug: "msme-batch-validator", },
  { name: "DivTax Engine", fn: "Tax", status: "Live", hours: 80, },
  { name: "StatementForge", fn: "Direct tax", status: "Live", hours: 60, },
  { name: "PR Composer", fn: "IT — Business Apps", status: "Live", hours: 80, },
  { name: "BulkPull", fn: "IT — Salesforce / CRM", status: "Live", hours: 1040, },
  { name: "MeetScribe", fn: "Pilot", status: "Live", hours: null, },
  { name: "Gift Vault", fn: "Payments", status: "In build", hours: null, slug: "gv-hub", },
  { name: "AccessWatch", fn: "IT — Business Apps", status: "In build", hours: 96, },
  { name: "ArchiveSort", fn: "Tax", status: "In build", hours: 60, },
];

/** Tracker totals, stated so the headline figures are traceable to a source. */
export const portfolioTotals = {
  hoursPerYear: 3897,
  productiveHoursPerFte: 1800,
  liveCount: 12,
  inBuildCount: 3,
  alsoInDesign: 3,
  get fte() {
    return this.hoursPerYear / this.productiveHoursPerFte;
  },
};
