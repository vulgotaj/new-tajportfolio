import { expect, test, type Page } from "@playwright/test";
import { readFileSync } from "node:fs";

type Frame = { time: number; open: number; close: number; letters: number; opacity: number; centered: boolean };
declare global {
  interface Window {
    openingFrames: Frame[];
    openingEndedAt?: number;
  }
}

async function recordOpening(page: Page) {
  await page.addInitScript(() => {
    window.openingFrames = [];
    let started = 0;
    window.addEventListener("taj-opening-end", () => {
      if (started) window.openingEndedAt = performance.now() - started;
    });
    const sample = () => {
      const root = document.documentElement;
      if (root?.dataset.opening) {
        started = Number(root.dataset.openingStarted);
        const overlay = document.querySelector(".site-opening");
        const svg = overlay?.querySelector("svg");
        if (svg && overlay) {
          const rect = svg.getBoundingClientRect();
          const x = (id: string) => new DOMMatrix(getComputedStyle(svg.querySelector(id)!).transform).m41;
          window.openingFrames.push({
            time: performance.now() - started,
            open: x("#syntax-open"), close: x("#syntax-close"),
            letters: Number(getComputedStyle(svg.querySelector("#taj-letters")!).opacity),
            opacity: Number(getComputedStyle(overlay).opacity),
            centered: Math.abs(rect.x + rect.width / 2 - innerWidth / 2) < 1
              && Math.abs(rect.y + rect.height / 2 - innerHeight / 2) < 1,
          });
        }
      }
      if (performance.now() < 4000) requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  });
}

for (const locale of ["pt", "en"]) {
  for (const theme of ["light", "dark"] as const) {
    for (const width of [360, 768, 1440]) {
      test(`abertura ${locale} ${theme} ${width}: sequência, paths, tema, centro e duração`, async ({ page }, info) => {
        await page.setViewportSize({ width, height: width === 768 ? 1024 : 900 });
        await page.emulateMedia({ colorScheme: theme, reducedMotion: "no-preference" });
        await recordOpening(page);
        const errors: string[] = [];
        page.on("pageerror", (error) => errors.push(error.message));
        await page.goto(`/${locale}`, { waitUntil: "domcontentloaded" });
        const opening = page.locator(".site-opening");
        await expect(opening).toBeVisible();
        await expect(opening).toHaveAttribute("aria-hidden", "true");
        await expect(opening).toHaveCSS("color", theme === "light" ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)");
        await expect(opening).toHaveCSS("background-color", theme === "light" ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)");
        const paths = await opening.locator("path").evaluateAll((elements) => elements.map((element) => element.getAttribute("d")));
        expect(paths).toEqual(Array.from(readFileSync("public/brand/taj-wordmark.svg", "utf8").matchAll(/ d="([^"]+)"/g), (match) => match[1]));
        // Capture the real running sequence; timing/geometry assertions below also observe its frames.
        await page.screenshot({ path: info.outputPath("opening.png") });
        await page.waitForFunction(() => {
          const letters = document.querySelector(".site-opening #taj-letters");
          return letters && Number(getComputedStyle(letters).opacity) > .99;
        });
        await page.screenshot({ path: info.outputPath("opening-wordmark.png") });
        await expect(opening).toHaveCount(0);
        const { frames, endedAt } = await page.evaluate(() => ({ frames: window.openingFrames, endedAt: window.openingEndedAt! }));
        expect(frames.some((frame) => frame.open > 38 && frame.close < -38 && frame.letters < .02)).toBe(true);
        expect(frames.some((frame) => frame.open > 1 && frame.open < 38 && frame.close < -1)).toBe(true);
        expect(frames.some((frame) => Math.abs(frame.open) < .1 && Math.abs(frame.close) < .1 && frame.letters > .99 && frame.opacity > .99)).toBe(true);
        expect(frames.some((frame) => frame.opacity > 0 && frame.opacity < .9)).toBe(true);
        expect(frames.every((frame) => frame.centered)).toBe(true);
        expect(endedAt).toBeGreaterThan(2350);
        expect(endedAt).toBeLessThan(2650);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        await expect(page.locator("#portfolio-content")).not.toHaveAttribute("inert");
        await expect(page.getByRole("heading", { name: /felipe tajima/i })).toBeVisible();
        expect(await page.evaluate(() => scrollY)).toBe(0);
        expect(errors).toEqual([]);
      });
    }
  }
}

test("teclado não alcança conteúdo coberto e retoma sem armadilha", async ({ page }) => {
  await page.goto("/en", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".site-opening")).toBeVisible();
  await page.keyboard.press("Tab");
  await page.locator(".theme-toggle").evaluate((button: HTMLButtonElement) => button.focus());
  expect(await page.evaluate(() => document.activeElement === document.body)).toBe(true);
  await expect(page.locator(".site-opening")).toHaveCount(0);
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to introduction" })).toBeFocused();
  await expect(page.locator(":focus")).toHaveCSS("outline-style", "solid");
  await page.keyboard.press("Enter");
  await expect(page.locator("#intro")).toBeFocused();
});

test("não repete em recarga, idioma, âncora e histórico; nova aba tem sessão própria", async ({ page, context }) => {
  await recordOpening(page);
  await page.goto("/pt?source=opening#projects");
  await expect(page.locator(".site-opening")).toHaveCount(0);
  const before = await page.locator("#projects").boundingBox();
  expect(Math.abs(before!.y - 32)).toBeLessThan(2);
  await page.reload();
  await expect(page.locator(".site-opening")).toHaveCount(0);
  expect(await page.evaluate(() => window.openingFrames.length)).toBe(0);
  await page.getByRole("button", { name: "PT — Idioma: Português" }).click();
  await page.getByRole("link", { name: "English", exact: true }).click();
  await expect(page).toHaveURL(/\/en\?source=opening#projects$/);
  await expect(page.locator(".site-opening")).toHaveCount(0);
  expect(await page.evaluate(() => window.openingFrames.length)).toBe(0);
  await page.goBack();
  await expect(page.locator(".site-opening")).toHaveCount(0);
  const other = await context.newPage();
  await other.goto("/en", { waitUntil: "domcontentloaded" });
  await expect(other.locator(".site-opening")).toBeVisible();
  await other.close();
});

for (const fragment of ["contact", "project-today-movies"]) {
  test(`entrada direta #${fragment} preserva posição, slide e foco escolhido`, async ({ page }) => {
    await page.goto(`/pt#${fragment}`, { waitUntil: "domcontentloaded" });
    await expect(page.locator(".site-opening")).toBeVisible();
    const before = await page.locator(`#${fragment}`).boundingBox();
    await expect(page.locator(".site-opening")).toHaveCount(0);
    const after = await page.locator(`#${fragment}`).boundingBox();
    expect(after!.y).toBeCloseTo(before!.y, 0);
    if (fragment.startsWith("project-")) {
      await expect(page.locator(`#${fragment}`)).toBeInViewport();
    }
    await page.locator(`#${fragment} a`).first().focus();
    await expect(page.locator(`#${fragment} a`).first()).toBeFocused();
    await expect(page).toHaveURL(new RegExp(`#${fragment}$`));
  });
}

test("tema salvo vale desde o primeiro frame mesmo contra a preferência do sistema", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.addInitScript(() => localStorage.setItem("taj-theme", "dark"));
  await page.goto("/en", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".site-opening")).toHaveCSS("color", "rgb(255, 255, 255)");
  await expect(page.locator(".site-opening")).toHaveCSS("background-color", "rgb(0, 0, 0)");
});

test("movimento reduzido omite abertura e mudança durante a sequência libera imediatamente", async ({ page }) => {
  await recordOpening(page);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/pt");
  await expect(page.locator(".site-opening")).toHaveCount(0);
  expect(await page.evaluate(() => window.openingFrames.length)).toBe(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.reload();
  expect(await page.evaluate(() => window.openingFrames.length)).toBe(0);
  await page.evaluate(() => sessionStorage.clear());
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.locator(".site-opening")).toBeVisible();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".site-opening")).toHaveCount(0);
  await expect(page.locator("#portfolio-content")).not.toHaveAttribute("inert");
  await expect(page.getByRole("heading", { name: /felipe tajima/i })).toBeVisible();
});

test("armazenamento da sessão indisponível omite abertura", async ({ page }) => {
  await recordOpening(page);
  await page.addInitScript(() => {
    Object.defineProperty(window, "sessionStorage", { get() { throw new DOMException("Blocked", "SecurityError"); } });
  });
  await page.goto("/en");
  await expect(page.locator(".site-opening")).toHaveCount(0);
  expect(await page.evaluate(() => window.openingFrames.length)).toBe(0);
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("imagens bloqueadas não atrasam a sequência nem a liberação", async ({ page }) => {
  await recordOpening(page);
  await page.route(/\/_next\/image|\.(png|svg)(\?|$)/, (route) => route.abort());
  await page.goto("/en", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".site-opening path")).toHaveCount(6);
  await expect(page.locator(".site-opening")).toHaveCount(0);
  expect(await page.evaluate(() => window.openingEndedAt!)).toBeLessThan(2650);
  await expect(page.getByRole("heading", { name: /felipe tajima/i })).toBeVisible();
});

test("hidratação indisponível libera conteúdo e teclado pelo limite independente de 3s", async ({ page }) => {
  await recordOpening(page);
  await page.route(/\/_next\/.*\.js(\?|$)/, (route) => route.abort());
  await page.goto("/pt#contact", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".site-opening")).toBeVisible();
  await expect(page.locator(".site-opening")).toBeHidden();
  const endedAt = await page.evaluate(() => window.openingEndedAt!);
  expect(endedAt).toBeGreaterThan(2850);
  expect(endedAt).toBeLessThan(3100);
  await expect(page.locator("#portfolio-content")).not.toHaveAttribute("inert");
  await page.locator("#contact a").first().focus();
  await expect(page.locator("#contact a").first()).toBeFocused();
  await expect(page).toHaveURL(/#contact$/);
});

test("falha da animação libera a página", async ({ page }) => {
  await page.addInitScript(() => {
    const original = Element.prototype.animate;
    Element.prototype.animate = function (...args) {
      if (this.closest(".site-opening")) throw new Error("Animation unavailable");
      return original.apply(this, args);
    };
  });
  await page.goto("/pt");
  await expect(page.locator(".site-opening")).toHaveCount(0);
  await expect(page.locator("#portfolio-content")).not.toHaveAttribute("inert");
  await page.getByRole("button", { name: "Ativar tema escuro" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("sem JavaScript a camada fica oculta e as seções continuam acessíveis", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, colorScheme: "dark" });
  const page = await context.newPage();
  await page.goto("/en#contact");
  await expect(page.locator(".site-opening")).toBeHidden();
  await expect(page.getByRole("heading", { name: /felipe tajima/i })).toBeVisible();
  await expect(page.locator("#portfolio-content")).not.toHaveAttribute("inert");
  await page.locator("#contact a").first().focus();
  await expect(page.locator("#contact a").first()).toBeFocused();
  await context.close();
});
