import puppeteer from "puppeteer-core";
import { existsSync } from "node:fs";

const CHROME = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
].filter(Boolean).find((p) => existsSync(p));

const browser = await puppeteer.launch({
  executablePath: CHROME, headless: "shell",
  args: ["--no-sandbox", "--disable-gpu"],
});
const page = await browser.newPage();
const msgs = [];
page.on("console", (m) => msgs.push(`[${m.type()}] ${m.text()}`));
page.on("pageerror", (e) => msgs.push(`[pageerror] ${e.message}`));

await page.goto(process.argv[2], { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 2500));

const hyd = msgs.filter((m) => /hydrat|did not match|mismatch|tree hydrated/i.test(m));
const errs = msgs.filter((m) => m.startsWith("[error]") || m.startsWith("[pageerror]"));

console.log("total console messages:", msgs.length);
console.log("hydration-related:", hyd.length);
hyd.forEach((m) => console.log("  " + m.slice(0, 240)));
console.log("errors:", errs.length);
errs.forEach((m) => console.log("  " + m.slice(0, 240)));
if (!hyd.length && !errs.length) console.log("=> clean: no hydration warnings, no console errors");

await browser.close();
