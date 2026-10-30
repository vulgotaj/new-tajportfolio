import { readFile, mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";
import { profile } from "../src/data/profile.ts";

const root = new URL("../", import.meta.url);
const master = await readFile(new URL("public/brand/taj-wordmark.svg", root), "utf8");
const font = await readFile(new URL("src/assets/fonts/jost-latin-wght-normal.woff2", root));
const letter = master.match(/<path id="letter-t" d="([^"]+)"/)?.[1];
if (!letter) throw new Error("O SVG mestre não contém a letra T aprovada.");
const escape = (text) => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
// Reuse the original T path without redrawing the brand; the full mark remains in OG images.
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><title>TAJ</title><style>rect{fill:#fff}g{stroke:#000}@media(prefers-color-scheme:dark){rect{fill:#000}g{stroke:#fff}}</style><rect width="48" height="48" rx="10"/><g transform="translate(-21 1.6)" fill="none" stroke-width="3.6" stroke-linecap="butt" stroke-linejoin="round"><path d="${letter}"/></g></svg>`;
await writeFile(new URL("public/icon.svg", root), icon);
await mkdir(new URL("public/og/", root), { recursive: true });
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1, colorScheme: "light" });
  for (const locale of ["pt", "en"]) {
    const logo = master.replace('<svg ', '<svg style="color:white" ');
    await page.setContent(`<html lang="${locale}"><head><style>
      @font-face{font-family:Jost;src:url(data:font/woff2;base64,${font.toString("base64")}) format('woff2');font-weight:100 900}
      *{box-sizing:border-box}body{margin:0;width:1200px;height:630px;background:#000;color:#fff;font-family:Jost,sans-serif;padding:80px 88px}
      .mark{width:500px;height:140px;margin-bottom:90px}.mark svg{width:100%;height:100%}
      h1{font-size:76px;line-height:1.1;font-weight:600;margin:0}p{font-size:36px;line-height:1.4;color:#ccc;margin:18px 0 0}
    </style></head><body><div class="mark">${logo}</div><h1>${escape(profile.name)}</h1><p>${escape(profile.role[locale])}</p></body></html>`);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: fileURLToPath(new URL(`public/og/${locale}.png`, root)) });
  }
  const frames = [];
  for (const size of [16, 32, 180]) {
    await page.setViewportSize({ width: size, height: size });
    await page.setContent(`<html><body style="margin:0">${icon}</body></html>`);
    const png = await page.screenshot();
    if (size === 180) await writeFile(new URL("public/apple-touch-icon.png", root), png);
    else frames.push({ size, png });
  }
  // ICO directory with PNG payloads, supported by current browsers and Windows.
  const directory = Buffer.alloc(6 + frames.length * 16);
  directory.writeUInt16LE(1, 2);
  directory.writeUInt16LE(frames.length, 4);
  let offset = directory.length;
  for (const [index, { size, png }] of frames.entries()) {
    const entry = 6 + index * 16;
    directory[entry] = size;
    directory[entry + 1] = size;
    directory.writeUInt16LE(1, entry + 4);
    directory.writeUInt16LE(32, entry + 6);
    directory.writeUInt32LE(png.length, entry + 8);
    directory.writeUInt32LE(offset, entry + 12);
    offset += png.length;
  }
  await writeFile(new URL("public/favicon.ico", root), Buffer.concat([directory, ...frames.map(({ png }) => png)]));
} finally {
  await browser.close();
}
console.log("Favicon e imagens sociais PT/EN gerados com Jost e os paths aprovados.");
