import { expect, test } from "@playwright/test";

const titles = {
  pt: ["Sites institucionais", "Lojas virtuais", "Sistemas e dashboards", "Landing pages", "Redesign e modernização", "Manutenção e evolução"],
  en: ["Business websites", "Online stores", "Web applications and dashboards", "Landing pages", "Website redesign and modernization", "Website maintenance and improvements"],
};

for (const locale of ["pt", "en"] as const) {
  for (const theme of ["light", "dark"] as const) {
    for (const width of [360, 768, 1440]) {
      test(`serviços ${locale} ${theme} ${width}`, async ({ page }, info) => {
        await page.setViewportSize({ width, height: width === 768 ? 1024 : 900 });
        await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
        await page.goto(`/${locale}`);
        if (width < 1200) await page.getByRole("button", { name: locale === "pt" ? "Abrir navegação" : "Open navigation" }).click();
        const link = page.getByRole("navigation", { name: locale === "pt" ? "Navegação principal" : "Main navigation" })
          .getByRole("link", { name: locale === "pt" ? "Serviços" : "Services", exact: true });
        await link.focus();
        await page.keyboard.press("Shift+Tab");
        await page.keyboard.press("Tab");
        await expect(link).toBeFocused();
        await expect(link).toHaveCSS("outline-style", "solid");
        await page.keyboard.press("Enter");
        await expect(page).toHaveURL(/#services$/);
        const section = page.locator("#services");
        await expect(section).toBeFocused();
        await expect(section.getByRole("heading", { level: 2 })).toHaveText(locale === "pt" ? "Serviços" : "Services");
        const cards = section.getByRole("article");
        await expect(cards).toHaveCount(6);
        expect(await section.getByRole("heading", { level: 3 }).allTextContents()).toEqual(titles[locale]);
        await expect(cards.first()).toHaveAccessibleName(titles[locale][0]!);
        await expect(cards.first().locator("p")).toHaveText(locale === "pt"
          ? "Crio sites para apresentar sua empresa e seus serviços, seguindo a identidade do negócio. A navegação é clara e o conteúdo se adapta a diferentes telas."
          : "I build websites that present your business and services in keeping with your brand. Navigation is clear, and the content adapts to different screen sizes.");
        await expect(section.locator("button, input, form")).toHaveCount(0);
        await expect(section.getByRole("link")).toHaveCount(0);
        await expect(section.locator("svg[aria-hidden='true']")).toHaveCount(6);
        expect(await section.evaluate((element) => element.previousElementSibling?.id)).toBe("about");
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        const boxes = await cards.evaluateAll((items) => items.map((item) => {
          const bounds = item.getBoundingClientRect();
          const heading = item.querySelector("h3")!.getBoundingClientRect();
          const description = item.querySelector("p")!.getBoundingClientRect();
          return { x: bounds.x, y: bounds.y, bottom: bounds.bottom, headingBottom: heading.bottom, descriptionTop: description.top, descriptionBottom: description.bottom };
        }));
        const columns = width === 1440 ? 3 : width === 768 ? 2 : 1;
        for (const [index, box] of boxes.entries()) {
          expect(box.descriptionTop).toBeGreaterThan(box.headingBottom);
          expect(box.descriptionBottom).toBeLessThan(box.bottom);
          if (index < columns) expect(Math.abs(box.y - boxes[0]!.y)).toBeLessThan(2);
          if (index >= columns) expect(box.y).toBeGreaterThan(boxes[index - columns]!.bottom);
        }
        await section.screenshot({ path: info.outputPath("services.png") });
      });
    }
  }

  test(`serviços ${locale} sem JavaScript e com texto ampliado`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 568 } });
    const page = await context.newPage();
    await page.goto(`/${locale}`);
    await page.locator("html").evaluate((element) => { element.style.fontSize = "200%"; });
    await page.getByRole("button", { name: locale === "pt" ? "Abrir navegação" : "Open navigation" }).click();
    await page.getByRole("link", { name: locale === "pt" ? "Serviços" : "Services", exact: true }).click();
    await expect(page).toHaveURL(/#services$/);
    await expect(page.locator("#services").getByRole("heading", { level: 3 })).toHaveCount(6);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const fits = await page.locator(".service-card").evaluateAll((cards) => cards.every((card) => {
      const text = card.querySelector("p")!.getBoundingClientRect();
      const bounds = card.getBoundingClientRect();
      return text.bottom < bounds.bottom && card.scrollWidth <= card.clientWidth;
    }));
    expect(fits).toBe(true);
    await context.close();
  });
}

test("idioma, tema e histórico preservam a seção de serviços", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/pt?source=services#services");
  await page.getByRole("button", { name: "Ativar tema escuro" }).click();
  await page.getByRole("button", { name: "PT — Idioma: Português" }).click();
  await page.getByRole("link", { name: "English", exact: true }).click();
  await expect(page).toHaveURL(/\/en\?source=services#services$/);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator("#services").getByRole("heading", { level: 2 })).toHaveText("Services");
  await page.goBack();
  await expect(page).toHaveURL(/\/pt\?source=services#services$/);
  await expect(page.locator("#services").getByRole("heading", { level: 2 })).toHaveText("Serviços");
});
