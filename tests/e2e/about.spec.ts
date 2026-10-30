import { expect, test } from "@playwright/test";

for (const locale of ["pt", "en"]) {
  for (const theme of ["light", "dark"] as const) {
    for (const width of [360, 768, 1440]) {
      test(`sobre ${locale} ${theme} ${width}`, async ({ page }, info) => {
        await page.setViewportSize({ width, height: width === 768 ? 1024 : 900 });
        await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
        await page.goto(`/${locale}`);
        if (width < 1200) await page.getByRole("button", { name: locale === "pt" ? "Abrir navegação" : "Open navigation" }).click();
        const navigation = page.getByRole("navigation", { name: locale === "pt" ? "Navegação principal" : "Main navigation" });
        const link = navigation.getByRole("link", { name: locale === "pt" ? "Sobre mim" : "About me", exact: true });
        await link.focus();
        await page.keyboard.press("Shift+Tab");
        await page.keyboard.press("Tab");
        await expect(link).toHaveCSS("outline-style", "solid");
        await page.keyboard.press("Enter");
        await expect(page).toHaveURL(/#about$/);
        const section = page.locator("#about");
        await expect(section).toBeFocused();
        await expect(section.getByRole("heading", { level: 2 })).toHaveText(locale === "pt" ? "Sobre mim" : "About me");
        await expect(page.locator(".about-biography p")).toHaveCount(2);
        await expect(page.locator(".about-biography p").first()).toContainText(locale === "pt" ? "Sou Felipe Tajima, desenvolvedor Full-Stack" : "I'm Felipe Tajima, a Full-Stack Developer");
        expect(await section.locator("li").allTextContents()).toEqual(["TypeScript", "Next.js", "React.js", "Node.js", "Express.js", "Tailwind CSS", "SASS", "Prisma ORM", "MongoDB", "Firebase"]);
        await expect(section.getByRole("link")).toHaveCount(0);
        const photo = section.getByRole("img", { name: locale === "pt" ? "Felipe Tajima em uma floresta, olhando para o lado." : "Felipe Tajima in a forest, looking to the side." });
        await photo.scrollIntoViewIfNeeded();
        await expect.poll(() => photo.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
        await expect(photo).toHaveCSS("filter", "grayscale(0)");
        await expect(photo).toHaveCSS("transition-duration", "0s");
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        expect(await section.evaluate((element) => element.previousElementSibling?.id)).toBe("projects");
        const biography = (await page.locator(".about-biography").boundingBox())!;
        const portrait = (await page.locator(".about-portrait").boundingBox())!;
        const technologies = (await page.locator(".about-technologies").boundingBox())!;
        if (width === 1440) {
          expect(portrait.x).toBeGreaterThan(biography.x + biography.width);
          expect(Math.abs(portrait.y - biography.y)).toBeLessThan(2);
          expect(technologies.x).toBe(biography.x);
        } else {
          expect(portrait.y).toBeGreaterThanOrEqual(biography.y + biography.height);
          expect(technologies.y).toBeGreaterThanOrEqual(portrait.y + portrait.height);
        }
        await section.screenshot({ path: info.outputPath("about.png") });
        if (width === 1440) {
          await photo.hover();
          await expect(photo).toHaveCSS("filter", "grayscale(1)");
          await page.mouse.move(0, 0);
          await expect(photo).toHaveCSS("filter", "grayscale(0)");
        }
      });
    }
  }
}

test("idioma, tema e histórico preservam Sobre mim", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/pt?source=about#about");
  await page.getByRole("button", { name: "Ativar tema escuro" }).click();
  await page.getByRole("button", { name: "PT — Idioma: Português" }).click();
  await page.getByRole("link", { name: "English", exact: true }).click();
  await expect(page).toHaveURL(/\/en\?source=about#about$/);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator("#about").getByRole("heading", { level: 2 })).toHaveText("About me");
  await page.goBack();
  await expect(page).toHaveURL(/\/pt\?source=about#about$/);
  await expect(page.locator("#about").getByRole("heading", { level: 2 })).toHaveText("Sobre mim");
});

test("Sobre mim funciona sem JavaScript e com fotografia indisponível em texto ampliado", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 568 } });
  const page = await context.newPage();
  await page.route("**/_next/image**", (route) => route.abort());
  await page.goto("/en");
  await page.locator("html").evaluate((element) => { element.style.fontSize = "200%"; });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.getByRole("link", { name: "About me", exact: true }).click();
  await expect(page).toHaveURL(/#about$/);
  await expect(page.locator("#about").getByRole("heading", { level: 2 })).toBeVisible();
  await expect(page.locator(".about-biography p")).toHaveCount(2);
  await expect(page.locator("#about").getByText("Firebase", { exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect((await page.locator(".about-portrait").boundingBox())!.height).toBeGreaterThan(0);
  await context.close();
});

test("foto de Sobre mim mantém transição decorativa e não alterna com toque", async ({ browser, page }) => {
  await page.goto("/pt#about");
  const photo = page.locator(".about-portrait img");
  await expect(photo).toHaveCSS("transition-duration", "0.35s");
  await photo.hover();
  await expect(photo).toHaveCSS("filter", "grayscale(1)");
  await page.mouse.move(0, 0);
  await expect(photo).toHaveCSS("filter", "grayscale(0)");
  const context = await browser.newContext({ viewport: { width: 360, height: 800 }, hasTouch: true, isMobile: true });
  const touch = await context.newPage();
  await touch.goto("/pt#about");
  await touch.locator(".about-portrait img").tap();
  await expect(touch.locator(".about-portrait img")).toHaveCSS("filter", "grayscale(0)");
  await context.close();
});
