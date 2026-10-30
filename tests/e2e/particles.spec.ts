import { expect, test, type Page } from "@playwright/test";

const playback = (page: Page) => page.locator(".hero-particle-layer").evaluateAll((layers) =>
  layers.flatMap((layer) => layer.getAnimations().map((animation) => animation.playState)));
const transforms = (page: Page) => page.locator(".hero-particle-layer").evaluateAll((layers) =>
  layers.map((layer) => getComputedStyle(layer).transform));

for (const locale of ["pt", "en"]) {
  for (const theme of ["light", "dark"] as const) {
    for (const width of [360, 768, 1440]) {
      test(`partículas ${locale} ${theme} ${width}`, async ({ page }, info) => {
        await page.setViewportSize({ width, height: width === 768 ? 1024 : 900 });
        await page.emulateMedia({ colorScheme: theme, reducedMotion: "no-preference" });
        const errors: string[] = [];
        page.on("pageerror", (error) => errors.push(error.message));
        await page.goto(`/${locale}`);
        await expect(page.locator(".site-opening")).toHaveCount(0);
        const pause = page.getByRole("button", { name: locale === "pt" ? "Pausar partículas" : "Pause particles", exact: true });
        const resume = page.getByRole("button", { name: locale === "pt" ? "Retomar partículas" : "Resume particles", exact: true });
        await expect(pause).toBeVisible();
        await expect(page.locator(".hero-particles")).toHaveAttribute("aria-hidden", "true");
        await expect(page.locator(".hero-particles")).toHaveCSS("pointer-events", "none");
        // Non-empty external SVG geometry proves the existing points actually rendered.
        await expect.poll(() => page.locator(`.particle-${theme}`).evaluateAll((items) =>
          items.every((item) => (item as SVGGraphicsElement).getBBox().width > 1000))).toBe(true);
        await expect.poll(() => playback(page)).toEqual(["running", "running", "running"]);
        const initial = await transforms(page);
        await expect.poll(() => transforms(page)).not.toEqual(initial);
        const title = await page.locator("h1").boundingBox();
        await pause.focus();
        await page.keyboard.press("Shift+Tab");
        await page.keyboard.press("Tab");
        await expect(pause).toBeFocused();
        await expect(pause).toHaveCSS("outline-style", "solid");
        await page.keyboard.press("Space");
        await expect(resume).toBeFocused();
        await expect.poll(() => playback(page)).toEqual(["paused", "paused", "paused"]);
        const stopped = await transforms(page);
        await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
        expect(await transforms(page)).toEqual(stopped);
        expect(await page.locator("h1").boundingBox()).toEqual(title);
        const button = (await resume.boundingBox())!;
        const hint = (await page.locator(".hero-projects").boundingBox())!;
        expect(button.x).toBeGreaterThan(hint.x + hint.width);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        if (theme === "light" && width === 1440) {
          // Sample empty sky above the copy/photo: geometry alone cannot detect a stale, faint SVG.
          const field = (await page.locator(".hero-particles").boundingBox())!;
          const sample = await page.screenshot({ clip: { x: 300, y: Math.ceil(field.y + 10), width: 550, height: 100 } });
          const darkPixels = await page.evaluate(async (base64) => {
            const image = new Image();
            image.src = `data:image/png;base64,${base64}`;
            await image.decode();
            const canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            const context = canvas.getContext("2d")!;
            context.drawImage(image, 0, 0);
            const { data } = context.getImageData(0, 0, canvas.width, canvas.height);
            let count = 0;
            for (let index = 0; index < data.length; index += 4) {
              if (Math.max(data[index]!, data[index + 1]!, data[index + 2]!) < 160) count++;
            }
            return count;
          }, sample.toString("base64"));
          expect(darkPixels).toBeGreaterThan(10);
        }
        await page.screenshot({ path: info.outputPath("hero-particles.png") });
        await page.keyboard.press("Enter");
        await expect.poll(() => playback(page)).toEqual(["running", "running", "running"]);
        await page.locator("#contact").scrollIntoViewIfNeeded();
        await expect.poll(() => playback(page)).toEqual(["paused", "paused", "paused"]);
        await page.evaluate(() => scrollTo(0, 0));
        await expect.poll(() => playback(page)).toEqual(["running", "running", "running"]);
        await page.emulateMedia({ reducedMotion: "reduce" });
        await expect(pause).toBeHidden();
        await expect.poll(() => playback(page)).toEqual([]);
        expect(await transforms(page)).toEqual(["none", "none", "none"]);
        await page.emulateMedia({ reducedMotion: "no-preference" });
        await expect.poll(() => playback(page)).toEqual(["running", "running", "running"]);
        expect(errors).toEqual([]);
      });
    }
  }
}

for (const theme of ["light", "dark"] as const) {
  test(`partículas estáticas sem JavaScript ${theme}`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, colorScheme: theme, viewport: { width: 360, height: 800 } });
    const page = await context.newPage();
    await page.goto("/pt");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator(".particle-toggle")).toBeHidden();
    await expect.poll(() => page.locator(`.particle-${theme}`).evaluateAll((items) =>
      items.every((item) => (item as SVGGraphicsElement).getBBox().width > 1000))).toBe(true);
    expect(await playback(page)).toEqual([]);
    await context.close();
  });
}

test("partículas preservam movimento ao trocar tema e pausam com aba inativa", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "no-preference" });
  await page.goto("/pt");
  await expect.poll(() => playback(page)).toEqual(["running", "running", "running"]);
  await page.getByRole("button", { name: "Ativar tema escuro" }).click();
  await expect(page.locator(".particle-light").first()).toHaveCSS("display", "none");
  await expect(page.locator(".particle-dark").first()).toHaveCSS("display", "inline");
  await expect.poll(() => playback(page)).toEqual(["running", "running", "running"]);
  // Simulate the visibility event without relying on headless window focus.
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", { configurable: true, value: true });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect.poll(() => playback(page)).toEqual(["paused", "paused", "paused"]);
  await page.evaluate(() => {
    Reflect.deleteProperty(document, "hidden");
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect.poll(() => playback(page)).toEqual(["running", "running", "running"]);
});
