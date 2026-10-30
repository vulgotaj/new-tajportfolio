import { expect, test, type Page } from "@playwright/test";

declare global {
  interface Window {
    entranceFrames: { target: string; key: string; opacity: number; transform: string; clip: string; duringOpening: boolean }[];
  }
}

async function recordEntrances(page: Page, skipOpening = true) {
  await page.addInitScript((skip) => {
    if (skip) sessionStorage.setItem("taj-opening-seen", "true");
    window.entranceFrames = [];
    const record = () => {
      for (const element of document.querySelectorAll<HTMLElement>("[data-enter]")) {
        if (!element.getAnimations().some((animation) => animation.playState === "running")) continue;
        const styles = getComputedStyle(element);
        window.entranceFrames.push({
          target: element.className,
          key: element.querySelector("h3")?.id ?? element.id,
          opacity: Number(styles.opacity), transform: styles.transform, clip: styles.clipPath,
          duringOpening: document.documentElement.dataset.opening === "revealing",
        });
      }
      if (performance.now() < 20000) requestAnimationFrame(record);
    };
    requestAnimationFrame(record);
  }, skipOpening);
}

const finished = async (page: Page, selector: string) => {
  await expect.poll(() => page.locator(selector).evaluate((element) => element.getAnimations().length)).toBe(0);
  await expect(page.locator(selector)).toHaveCSS("opacity", "1");
  expect(await page.locator(selector).evaluate((element: HTMLElement) => [element.style.opacity, element.style.transform, element.style.clipPath])).toEqual(["", "", ""]);
};

for (const locale of ["pt", "en"]) {
  for (const theme of ["light", "dark"] as const) {
    for (const width of [360, 768, 1440]) {
      test(`entradas ${locale} ${theme} ${width}: movimento real, uma vez e layout preservado`, async ({ page }, info) => {
        await page.setViewportSize({ width, height: width === 768 ? 1024 : 900 });
        await page.emulateMedia({ colorScheme: theme, reducedMotion: "no-preference" });
        await recordEntrances(page, false);
        const errors: string[] = [];
        page.on("pageerror", (error) => errors.push(error.message));
        await page.goto(`/${locale}`, { waitUntil: "domcontentloaded" });
        await expect.poll(() => page.evaluate(() => window.entranceFrames.some((frame) => frame.target === "hero-copy" && frame.transform !== "none"))).toBe(true);
        await finished(page, ".hero-copy");
        await expect(page.locator(".site-opening")).toHaveCount(0);

        for (const target of ["project-preview", "about-portrait", "service-entry", "contact-links", "footer-container"]) {
          const selector = `.${target}${target === "project-preview" || target === "service-entry" ? ":first-child" : ""}`;
          const element = page.locator(selector).first();
          await element.scrollIntoViewIfNeeded();
          await expect.poll(() => page.evaluate((name) => window.entranceFrames.some((frame) => frame.target.split(" ").includes(name)), target)).toBe(true);
          await finished(page, target === "project-preview" || target === "service-entry" ? `.${target} >> nth=0` : `.${target}`);
          expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
          await page.screenshot({ path: info.outputPath(`${target}.png`) });
        }
        expect(await page.evaluate(() => window.entranceFrames.filter((frame) => frame.target.includes("about-portrait")).every((frame) => frame.clip === "none"))).toBe(true);
        expect(await page.evaluate(() => new Set(window.entranceFrames.filter((frame) => frame.target === "hero-copy").map((frame) => frame.transform)).size)).toBeGreaterThan(2);
        expect(await page.evaluate(() => new Set(window.entranceFrames.filter((frame) => frame.target.includes("about-portrait")).map((frame) => frame.transform)).size)).toBeGreaterThan(2);
        const before = await page.evaluate(() => window.entranceFrames.filter((frame) => frame.target.includes("about-portrait")).length);
        await page.locator(".about-portrait").scrollIntoViewIfNeeded();
        await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
        expect(await page.evaluate(() => window.entranceFrames.filter((frame) => frame.target.includes("about-portrait")).length)).toBe(before);
        expect(errors).toEqual([]);
      });
    }
  }
}

test("hero entra durante a saída da abertura, sem nova espera", async ({ page }) => {
  await recordEntrances(page, false);
  await page.goto("/pt", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".site-opening")).toHaveCount(0);
  expect(await page.evaluate(() => window.entranceFrames.some((frame) => frame.target === "hero-copy" && frame.duringOpening))).toBe(true);
  await finished(page, ".hero-copy");
  await finished(page, ".hero-portrait");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Pular para a apresentação" })).toBeFocused();
});

test("movimento reduzido inicial e alterado durante entrada mantém conteúdo estático", async ({ page }) => {
  await recordEntrances(page);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en", { waitUntil: "domcontentloaded" });
  await page.locator(".about-portrait").scrollIntoViewIfNeeded();
  await expect(page.locator(".about-portrait")).toBeVisible();
  expect(await page.evaluate(() => window.entranceFrames.length)).toBe(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/en");
  await page.locator(".service-entry").first().scrollIntoViewIfNeeded();
  await expect.poll(() => page.evaluate(() => window.entranceFrames.some((frame) => frame.target === "service-entry"))).toBe(true);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await finished(page, ".service-entry >> nth=0");
  await expect(page.locator(".service-entry").first()).toHaveCSS("transform", "none");
});

test("foco durante entrada encerra movimento sem ocultar ações ou mudar destino", async ({ page }) => {
  await recordEntrances(page);
  await page.goto("/pt", { waitUntil: "domcontentloaded" });
  await page.locator(".contact-links").scrollIntoViewIfNeeded();
  await expect.poll(() => page.evaluate(() => window.entranceFrames.some((frame) => frame.target === "contact-links"))).toBe(true);
  const contact = page.locator(".contact-links a").first();
  await contact.focus();
  await expect(contact).toBeFocused();
  await finished(page, ".contact-links");
  await page.keyboard.press("Tab");
  await expect(page.locator(".contact-links a").nth(1)).toBeFocused();
});

test("âncora inicial e navegação posterior preservam seção, foco e slide", async ({ page }) => {
  await recordEntrances(page);
  await page.goto("/en#project-today-movies");
  await expect(page.locator("#project-today-movies")).toBeInViewport();
  await page.locator("#project-today-movies a").first().focus();
  await expect(page.locator("#project-today-movies a").first()).toBeFocused();
  await page.evaluate(() => { location.hash = "contact"; });
  await expect(page).toHaveURL(/#contact$/);
  await finished(page, ".contact-links");
  await expect(page.locator("#contact")).toBeInViewport();
});

test("menu inicia os serviços e não consome as entradas dos cards abaixo da tela", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await recordEntrances(page);
  await page.goto("/pt");
  await page.getByRole("button", { name: "Abrir navegação" }).click();
  await page.getByRole("link", { name: "Serviços", exact: true }).click();
  await expect(page).toHaveURL(/#services$/);
  await expect.poll(() => page.evaluate(() => window.entranceFrames.some((frame) => frame.key === "service-business-websites"))).toBe(true);
  await finished(page, ".service-entry >> nth=0");
  expect(await page.evaluate(() => window.entranceFrames.some((frame) => frame.key === "service-website-maintenance"))).toBe(false);
  await page.locator(".service-entry").last().scrollIntoViewIfNeeded();
  await expect.poll(() => page.evaluate(() => window.entranceFrames.some((frame) => frame.key === "service-website-maintenance"))).toBe(true);
  await finished(page, ".service-entry >> nth=5");
});

test("card surge de baixo para cima, de transparente a opaco, com transição contínua", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await recordEntrances(page);
  await page.goto("/pt");
  const card = page.locator(".service-entry").last();
  await expect(card).toHaveCSS("opacity", "0");
  expect(await card.evaluate((element) => new DOMMatrix(getComputedStyle(element).transform).m42)).toBeGreaterThan(0);
  await card.scrollIntoViewIfNeeded();
  await expect.poll(() => page.evaluate(() => window.entranceFrames.some((frame) => frame.key === "service-website-maintenance"))).toBe(true);
  await finished(page, ".service-entry >> nth=5");
  const frames = await page.evaluate(() => window.entranceFrames.filter((frame) => frame.key === "service-website-maintenance")
    .map((frame) => ({ opacity: frame.opacity, y: new DOMMatrix(frame.transform).m42, scale: new DOMMatrix(frame.transform).m11 })));
  expect(frames.length).toBeGreaterThan(10);
  expect(Math.min(...frames.map((frame) => frame.opacity))).toBeLessThan(.1);
  expect(Math.max(...frames.map((frame) => frame.opacity))).toBeGreaterThan(.95);
  expect(new Set(frames.map((frame) => frame.opacity)).size).toBeGreaterThan(10);
  expect(frames.every((frame) => frame.scale === 1)).toBe(true);
  for (let i = 1; i < frames.length; i++) {
    expect(frames[i]!.opacity).toBeGreaterThanOrEqual(frames[i - 1]!.opacity - .001);
    expect(frames[i]!.y).toBeLessThanOrEqual(frames[i - 1]!.y + .01);
  }
});

test("rolagem gradual revela imagem sem recorte, salto inicial ou queda de opacidade", async ({ page }) => {
  await recordEntrances(page);
  await page.goto("/pt");
  const frames = await page.locator(".about-portrait").evaluate(async (element) => {
    const top = element.getBoundingClientRect().top + scrollY;
    scrollTo(0, top - innerHeight - 64);
    const samples: { opacity: number; top: number; clip: string }[] = [];
    for (let i = 0; i < 50; i++) {
      scrollBy(0, 8);
      await new Promise(requestAnimationFrame);
      const rect = element.getBoundingClientRect();
      if (rect.top < innerHeight) {
        const style = getComputedStyle(element);
        samples.push({ opacity: Number(style.opacity), top: rect.top + scrollY, clip: style.clipPath });
      }
    }
    return samples;
  });
  expect(frames.length).toBeGreaterThan(10);
  expect(frames.every((frame) => frame.clip === "none")).toBe(true);
  expect(new Set(frames.map((frame) => frame.opacity)).size).toBeGreaterThan(4);
  for (let i = 1; i < frames.length; i++) {
    expect(frames[i]!.opacity).toBeGreaterThanOrEqual(frames[i - 1]!.opacity - .005);
    expect(frames[i]!.top).toBeLessThanOrEqual(frames[i - 1]!.top + .5);
  }
});

test("sem IntersectionObserver não há entrada nem erro e a navegação funciona", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await recordEntrances(page);
  await page.addInitScript(() => Object.defineProperty(window, "IntersectionObserver", { value: undefined }));
  await page.goto("/pt#services");
  await expect(page.getByRole("heading", { name: "Serviços", exact: true })).toBeVisible();
  expect(await page.evaluate(() => window.entranceFrames.length)).toBe(0);
  await expect(page.locator(".services-grid")).toHaveCSS("opacity", "1");
  expect(errors).toEqual([]);
});

test("entrada alcançada com aba oculta começa ao retornar à aba", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await recordEntrances(page);
  await page.goto("/pt");
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", { configurable: true, value: true });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await page.locator(".service-entry").last().scrollIntoViewIfNeeded();
  await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
  expect(await page.evaluate(() => window.entranceFrames.some((frame) => frame.key === "service-website-maintenance"))).toBe(false);
  await page.evaluate(() => {
    Reflect.deleteProperty(document, "hidden");
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect.poll(() => page.evaluate(() => window.entranceFrames.some((frame) => frame.key === "service-website-maintenance"))).toBe(true);
  await finished(page, ".service-entry >> nth=5");
});

test("falha da animação restaura estilos e mantém o conteúdo", async ({ page }) => {
  await recordEntrances(page);
  await page.addInitScript(() => {
    const original = Element.prototype.animate;
    Element.prototype.animate = function (...args) {
      if (this.hasAttribute("data-enter")) throw new Error("Entrance unavailable");
      return original.apply(this, args);
    };
  });
  await page.goto("/en");
  await finished(page, ".hero-copy");
  await page.locator(".about-portrait").scrollIntoViewIfNeeded();
  await finished(page, ".about-portrait");
  await expect(page.getByRole("heading", { name: "About me" })).toBeVisible();
});
