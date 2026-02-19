/**
 * Downloads all 78 Rider-Waite-Smith tarot card images from Wikimedia Commons.
 * Runs sequentially with validation — avoids rate-limiting.
 *
 * Run with:  node scripts/download-cards.mjs
 */

import fs from "fs";
import path from "path";
import https from "https";

const PUBLIC = path.resolve("public");
const DELAY_MS = 400; // be polite to Wikimedia servers

// ---------------------------------------------------------------------------
// Card → Wikimedia Commons filename mapping
// ---------------------------------------------------------------------------
const MAJOR = [
  ["00-the-fool",          "RWS_Tarot_00_Fool.jpg"],
  ["01-the-magician",      "RWS_Tarot_01_Magician.jpg"],
  ["02-the-high-priestess","RWS_Tarot_02_High_Priestess.jpg"],
  ["03-the-empress",       "RWS_Tarot_03_Empress.jpg"],
  ["04-the-emperor",       "RWS_Tarot_04_Emperor.jpg"],
  ["05-the-hierophant",    "RWS_Tarot_05_Hierophant.jpg"],
  ["06-the-lovers",        "RWS_Tarot_06_Lovers.jpg"],
  ["07-the-chariot",       "RWS_Tarot_07_Chariot.jpg"],
  ["08-strength",          "RWS_Tarot_08_Strength.jpg"],
  ["09-the-hermit",        "RWS_Tarot_09_Hermit.jpg"],
  ["10-wheel-of-fortune",  "RWS_Tarot_10_Wheel_of_Fortune.jpg"],
  ["11-justice",           "RWS_Tarot_11_Justice.jpg"],
  ["12-the-hanged-man",    "RWS_Tarot_12_Hanged_Man.jpg"],
  ["13-death",             "RWS_Tarot_13_Death.jpg"],
  ["14-temperance",        "RWS_Tarot_14_Temperance.jpg"],
  ["15-the-devil",         "RWS_Tarot_15_Devil.jpg"],
  ["16-the-tower",         "RWS_Tarot_16_Tower.jpg"],
  ["17-the-star",          "RWS_Tarot_17_Star.jpg"],
  ["18-the-moon",          "RWS_Tarot_18_Moon.jpg"],
  ["19-the-sun",           "RWS_Tarot_19_Sun.jpg"],
  ["20-judgement",         "RWS_Tarot_20_Judgement.jpg"],
  ["21-the-world",         "RWS_Tarot_21_World.jpg"],
];

const SUIT_PREFIX = {
  wands:     "Wands",
  cups:      "Cups",
  swords:    "Swords",
  pentacles: "Pents",
};

const CARD_NAMES = [
  ["1",  "ace"],   ["2",  "two"],   ["3",  "three"], ["4", "four"],
  ["5",  "five"],  ["6",  "six"],   ["7",  "seven"],  ["8", "eight"],
  ["9",  "nine"],  ["10", "ten"],
  ["11", "page"],  ["12", "knight"], ["13", "queen"], ["14", "king"],
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "TarotApp/1.0 card-downloader" } }, resolve)
         .on("error", reject);
  });
}

async function resolveWikimediaUrl(filename) {
  const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&format=json`;
  const res = await httpsGet(apiUrl);
  const body = await new Promise(r => { let d=""; res.on("data",c=>d+=c); res.on("end",()=>r(d)); });
  const json = JSON.parse(body);
  const page = Object.values(json.query.pages)[0];
  if (!page.imageinfo) throw new Error(`No imageinfo for: ${filename}`);
  return page.imageinfo[0].url;
}

/** Download url → dest, following redirects, validating it's an image. */
async function downloadFile(url, dest, depth = 0) {
  if (depth > 5) throw new Error("Too many redirects");
  if (fs.existsSync(dest)) { return "cached"; }

  const res = await httpsGet(url);

  if (res.statusCode === 301 || res.statusCode === 302) {
    return downloadFile(res.headers.location, dest, depth + 1);
  }
  if (res.statusCode !== 200) {
    res.resume();
    throw new Error(`HTTP ${res.statusCode} for ${url}`);
  }

  const ct = res.headers["content-type"] || "";
  if (!ct.startsWith("image/")) {
    res.resume();
    throw new Error(`Expected image, got ${ct} for ${url}`);
  }

  await new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    res.pipe(file);
    file.on("finish", () => file.close(resolve));
    file.on("error", (e) => { fs.unlink(dest, () => {}); reject(e); });
  });
}

// ---------------------------------------------------------------------------
// Build task list
// ---------------------------------------------------------------------------
const tasks = [];

for (const [slug, wikiFile] of MAJOR) {
  tasks.push({
    dest: path.join(PUBLIC, "cards", "major", `${slug}.jpg`),
    wikiFile,
    label: `major/${slug}.jpg`,
  });
}

for (const [suit, prefix] of Object.entries(SUIT_PREFIX)) {
  for (const [num, name] of CARD_NAMES) {
    const cardName = num === "1" ? `ace-of-${suit}` : `${name}-of-${suit}`;
    const wikiFile = `${prefix}${num.padStart(2, "0")}.jpg`;
    tasks.push({
      dest: path.join(PUBLIC, "cards", "minor", suit, `${cardName}.jpg`),
      wikiFile: wikiFile === "Wands09.jpg" ? "RWS1909 - Wands 09.jpeg" : wikiFile,
      label: `minor/${suit}/${cardName}.jpg`,
    });
  }
}

// ---------------------------------------------------------------------------
// Run sequentially
// ---------------------------------------------------------------------------
let downloaded = 0, cached = 0, failed = 0;

for (const { dest, wikiFile, label } of tasks) {
  if (fs.existsSync(dest)) {
    process.stdout.write(`  cached  ${label}\n`);
    cached++;
    continue;
  }

  try {
    const url = await resolveWikimediaUrl(wikiFile);
    await downloadFile(url, dest);
    process.stdout.write(`✓ ${label}\n`);
    downloaded++;
  } catch (e) {
    process.stdout.write(`✗ FAILED ${label}: ${e.message}\n`);
    failed++;
  }

  await sleep(DELAY_MS);
}

console.log(`\nDone — ${downloaded} downloaded, ${cached} cached, ${failed} failed.`);
