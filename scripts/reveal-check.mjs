/**
 * Verifies the reveal mechanism across the three states that matter:
 *
 *  1. Scripting on, motion allowed  — below-fold content starts hidden and
 *     becomes visible as it scrolls into view.
 *  2. Scripting on, reduced motion  — everything is visible immediately.
 *  3. Scripting off                 — everything is visible.
 *
 * It also asserts that nothing adds a class to <html> before hydration, which
 * is what used to produce a React hydration mismatch.
 *
 * Note: headless Chrome reports `prefers-reduced-motion: reduce` by default, so
 * the animation case must emulate `no-preference` explicitly or it silently
 * tests nothing.
 */
import puppeteer from "puppeteer-core";
import { existsSync } from "node:fs";

const CHROME = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/google-chrome",
].filter(Boolean).find((p) => existsSync(p));

if (!CHROME) {
  console.error("No Chrome or Edge found. Set CHROME_PATH.");
  process.exit(1);
}

const url = process.argv[2] || "http://localhost:8899/";
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "shell",
  args: ["--no-sandbox", "--disable-gpu"],
});

let failures = 0;
const check = (name, ok, detail = "") => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? "  — " + detail : ""}`);
  if (!ok) failures++;
};

const newPage = async ({ motion = "no-preference", js = true } = {}) => {
  const page = await browser.newPage();
  if (!js) await page.setJavaScriptEnabled(false);
  await page.setViewport({ width: 1280, height: 800 });
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: motion },
  ]);
  return page;
};

const scrollThrough = (page) =>
  page.evaluate(
    () =>
      new Promise((r) => {
        let y = 0;
        const step = () => {
          y += innerHeight * 0.8;
          scrollTo(0, y);
          if (y < document.body.scrollHeight) setTimeout(step, 60);
          else setTimeout(r, 700);
        };
        step();
      })
  );

/** Reads opacity without needing page.evaluate, for the JS-disabled case. */
async function opacitiesViaCdp(page, limit = 60) {
  const client = await page.createCDPSession();
  await client.send("DOM.enable");
  await client.send("CSS.enable");
  const { root } = await client.send("DOM.getDocument", { depth: -1 });

  const ids = [];
  const walk = (node) => {
    const attrs = node.attributes || [];
    for (let i = 0; i < attrs.length; i += 2) {
      if (attrs[i] === "class" && /\b(reveal|enter)\b/.test(attrs[i + 1])) {
        ids.push(node.nodeId);
        break;
      }
    }
    (node.children || []).forEach(walk);
  };
  walk(root);

  let hidden = 0;
  const sample = ids.slice(0, limit);
  for (const nodeId of sample) {
    try {
      const { computedStyle } = await client.send("CSS.getComputedStyleForNode", { nodeId });
      const op = computedStyle.find((p) => p.name === "opacity");
      if (op && parseFloat(op.value) < 0.95) hidden++;
    } catch {
      /* node detached mid-walk */
    }
  }
  return { hidden, sampled: sample.length };
}

// --- 1. Scripting on, motion allowed --------------------------------------
{
  const page = await newPage({ motion: "no-preference" });
  await page.goto(url, { waitUntil: "domcontentloaded" });

  const pre = await page.evaluate(() => {
    const below = [...document.querySelectorAll(".reveal")].filter(
      (e) => e.getBoundingClientRect().top > innerHeight * 2
    );
    return {
      scripting: matchMedia("(scripting: enabled)").matches,
      reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
      htmlClass: document.documentElement.className,
      total: below.length,
      hidden: below.filter((e) => parseFloat(getComputedStyle(e).opacity) < 0.1).length,
    };
  });

  check("(scripting: enabled) matches", pre.scripting === true);
  check("reduced-motion emulation applied", pre.reduced === false);
  check(
    "no js class added to <html> before hydration",
    !/(^|\s)js(\s|$)/.test(pre.htmlClass),
    `class="${pre.htmlClass}"`
  );
  check(
    "below-fold reveals start hidden",
    pre.total > 0 && pre.hidden === pre.total,
    `${pre.hidden}/${pre.total} hidden`
  );

  await scrollThrough(page);
  const post = await page.evaluate(() => {
    const all = [...document.querySelectorAll(".reveal, .enter")];
    return {
      total: all.length,
      stuck: all.filter((e) => parseFloat(getComputedStyle(e).opacity) < 0.95).length,
    };
  });
  check("all reveals visible after scrolling", post.stuck === 0, `${post.stuck} stuck of ${post.total}`);
  await page.close();
}

// --- 2. Scripting on, reduced motion --------------------------------------
{
  const page = await newPage({ motion: "reduce" });
  await page.goto(url, { waitUntil: "domcontentloaded" });
  const r = await page.evaluate(() => {
    const all = [...document.querySelectorAll(".reveal, .enter")];
    return {
      total: all.length,
      hidden: all.filter((e) => parseFloat(getComputedStyle(e).opacity) < 0.95).length,
    };
  });
  check(
    "reduced motion shows everything immediately",
    r.hidden === 0,
    `${r.hidden} hidden of ${r.total}`
  );
  await page.close();
}

// --- 3. Scripting off ------------------------------------------------------
{
  const page = await newPage({ js: false });
  await page.goto(url, { waitUntil: "domcontentloaded" });
  const { hidden, sampled } = await opacitiesViaCdp(page);
  check(
    "content visible with JavaScript disabled",
    hidden === 0,
    `${hidden} hidden of ${sampled} sampled`
  );
  await page.close();
}

await browser.close();
console.log(failures === 0 ? "\nAll reveal checks passed." : `\n${failures} check(s) failed.`);
process.exit(failures === 0 ? 0 : 1);
