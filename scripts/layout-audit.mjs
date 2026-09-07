import puppeteer from "puppeteer-core";
import { existsSync, mkdirSync } from "node:fs";

// Point CHROME_PATH at a local Chrome/Edge binary if these defaults miss.
const CANDIDATES = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);
const CHROME = CANDIDATES.find((p) => existsSync(p));
if (!CHROME) {
  console.error("No Chrome or Edge found. Set CHROME_PATH to a browser binary.");
  process.exit(1);
}
const BASE = process.env.AUDIT_BASE || "http://localhost:8899";
const OUT = process.env.AUDIT_OUT || "audit-shots";
mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "shell",
  args: ["--no-sandbox", "--disable-gpu"],
});

const viewports = [
  { name: "mobile", width: 390, height: 844, dsf: 2 },
  { name: "tablet", width: 768, height: 1024, dsf: 1 },
  { name: "desktop", width: 1440, height: 900, dsf: 1 },
];

const pages = [
  { name: "home", url: "/index.html" },
  { name: "orbit", url: "/solutions/orbit/index.html" },
];

for (const vp of viewports) {
  for (const pg of pages) {
    const page = await browser.newPage();
    await page.setViewport({
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: vp.dsf,
      isMobile: vp.name === "mobile",
    });
    await page.goto(BASE + pg.url, { waitUntil: "networkidle0" });
    // Scroll through so every IntersectionObserver reveal fires.
    await page.evaluate(async () => {
      await new Promise((r) => {
        let y = 0;
        const step = () => {
          y += window.innerHeight * 0.8;
          window.scrollTo(0, y);
          if (y < document.body.scrollHeight) setTimeout(step, 60);
          else { window.scrollTo(0, 0); setTimeout(r, 400); }
        };
        step();
      });
    });

    const report = await page.evaluate(() => {
      const de = document.documentElement;
      const vw = de.clientWidth;

      // Anything whose box extends past the viewport causes sideways scroll.
      const offenders = [];
      for (const el of document.querySelectorAll("body *")) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 && r.height === 0) continue;
        const cs = getComputedStyle(el);
        if (cs.position === "fixed") continue;
        if (r.right > vw + 1 || r.left < -1) {
          offenders.push({
            tag: el.tagName.toLowerCase(),
            cls: (el.className || "").toString().slice(0, 110),
            left: Math.round(r.left),
            right: Math.round(r.right),
            width: Math.round(r.width),
          });
        }
      }

      // Elements still hidden after a full scroll — content that never appeared.
      const stuck = [];
      for (const el of document.querySelectorAll(".reveal, .enter")) {
        const cs = getComputedStyle(el);
        if (parseFloat(cs.opacity) < 0.95) {
          stuck.push({
            cls: (el.className || "").toString().slice(0, 90),
            opacity: cs.opacity,
            text: (el.textContent || "").trim().slice(0, 60),
          });
        }
      }

      // Tap targets below the 24x24 CSS px floor.
      const small = [];
      for (const el of document.querySelectorAll("a, button, input, textarea, [role=button]")) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 && r.height === 0) continue;
        if (r.width < 24 || r.height < 24) {
          small.push({
            tag: el.tagName.toLowerCase(),
            w: Math.round(r.width),
            h: Math.round(r.height),
            text: (el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 40),
          });
        }
      }

      return {
        scrollWidth: de.scrollWidth,
        clientWidth: vw,
        overflowX: de.scrollWidth - vw,
        docHeight: document.body.scrollHeight,
        offenders: offenders.slice(0, 12),
        offenderCount: offenders.length,
        stuck: stuck.slice(0, 8),
        stuckCount: stuck.length,
        small: small.slice(0, 8),
        smallCount: small.length,
        imagesMissingAlt: [...document.querySelectorAll("img")].filter(
          (i) => i.getAttribute("alt") === null
        ).length,
        h1Count: document.querySelectorAll("h1").length,
      };
    });

    console.log(`\n=== ${pg.name} @ ${vp.name} (${vp.width}px) ===`);
    console.log(JSON.stringify(report, null, 2));

    await page.screenshot({ path: `${OUT}/${pg.name}-${vp.name}.png`, fullPage: true });
    await page.close();
  }
}

await browser.close();
