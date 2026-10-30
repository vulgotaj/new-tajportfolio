import { expect, test } from "@playwright/test";

const destinations = ["https://www.linkedin.com/in/feltajima", "https://github.com/vulgotaj", "mailto:felipebtajima05@gmail.com", "https://wa.me/5521982076692"];

for (const locale of ["pt", "en"]) {
  for (const theme of ["light", "dark"] as const) {
    for (const width of [360, 768, 1440]) {
      test(`contato ${locale} ${theme} ${width}`, async ({ page }, info) => {
        await page.setViewportSize({ width, height: width === 768 ? 1024 : 900 });
        await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
        await page.goto(`/${locale}`);
        if (width < 1200) await page.getByRole("button", { name: locale === "pt" ? "Abrir navegação" : "Open navigation" }).click();
        const navigation = page.getByRole("navigation", { name: locale === "pt" ? "Navegação principal" : "Main navigation" })
          .getByRole("link", { name: locale === "pt" ? "Contato" : "Contact", exact: true });
        await navigation.focus();
        await page.keyboard.press("Shift+Tab");
        await page.keyboard.press("Tab");
        await expect(navigation).toHaveCSS("outline-style", "solid");
        await page.keyboard.press("Enter");
        const section = page.locator("#contact");
        await expect(page).toHaveURL(/#contact$/);
        await expect(section).toBeFocused();
        await expect(section.getByRole("heading", { level: 2 })).toHaveText(locale === "pt" ? "Vamos conversar?" : "Let's talk");
        const links = section.getByRole("link");
        await expect(links).toHaveCount(4);
        await expect(section.getByText("Instagram", { exact: true })).toHaveCount(0);
        await expect(section.getByText("felipebtajima05@gmail.com", { exact: true })).toBeVisible();
        await expect(section.locator("form, input, button, iframe")).toHaveCount(0);
        const arrangement = await section.locator("li").evaluateAll((items) => items.map((item) => {
          const bounds = item.getBoundingClientRect();
          const icon = item.querySelector(".contact-icon")!.getBoundingClientRect();
          const label = item.querySelector(".contact-label")!.getBoundingClientRect();
          const labelStyle = getComputedStyle(item.querySelector(".contact-label")!);
          const glyph = item.querySelector("svg")!.getBoundingClientRect();
          return { top: bounds.top, center: bounds.left + bounds.width / 2, iconCenter: icon.left + icon.width / 2, labelCenter: label.left + label.width / 2, labelSize: parseFloat(labelStyle.fontSize), glyphSize: glyph.height };
        }));
        expect(Math.abs(arrangement[0]!.top - arrangement[1]!.top)).toBeLessThan(2);
        expect(Math.abs(arrangement[2]!.top - arrangement[3]!.top)).toBeLessThan(2);
        for (const item of arrangement) {
          expect(Math.abs(item.center - item.iconCenter)).toBeLessThan(2);
          expect(Math.abs(item.center - item.labelCenter)).toBeLessThan(2);
          expect(item.glyphSize).toBeGreaterThan(item.labelSize);
        }
        const labels = ["LinkedIn", "GitHub", locale === "pt" ? "E-mail felipebtajima05@gmail.com" : "Email felipebtajima05@gmail.com", "WhatsApp"];
        for (const [index, link] of (await links.all()).entries()) {
          await expect(link).toHaveAttribute("href", destinations[index]!);
          const email = index === 2;
          await expect(link).toHaveAccessibleName(email ? labels[index]! : `${labels[index]} (${locale === "pt" ? "abre em nova aba" : "opens in a new tab"})`);
          if (!email) {
            await expect(link).toHaveAttribute("target", "_blank");
            await expect(link).toHaveAttribute("rel", "noopener noreferrer");
          } else await expect(link).not.toHaveAttribute("target");
        }
        await links.first().focus();
        await page.keyboard.press("Shift+Tab");
        await page.keyboard.press("Tab");
        for (const link of await links.all()) {
          await expect(link).toBeFocused();
          await expect(link).toHaveCSS("outline-style", "solid");
          expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44);
          await page.keyboard.press("Tab");
        }
        await expect(page.getByRole("contentinfo").getByRole("link")).toBeFocused();
        for (const link of await links.all()) {
          await page.mouse.move(0, 0);
          await link.scrollIntoViewIfNeeded();
          const icon = link.locator(".contact-icon");
          const initial = await icon.evaluate((element) => getComputedStyle(element).backgroundColor);
          const bounds = (await link.boundingBox())!;
          const iconBounds = (await icon.boundingBox())!;
          // The link fills the grid column; its empty sides must not highlight the icon.
          await page.mouse.move(bounds.x + 1, iconBounds.y + iconBounds.height / 2);
          await expect(icon).toHaveCSS("background-color", initial);
          await icon.hover();
          await expect.poll(() => icon.evaluate((element) => getComputedStyle(element).backgroundColor)).not.toBe(initial);
          await link.locator(".contact-label").hover();
          await expect.poll(() => icon.evaluate((element) => getComputedStyle(element).backgroundColor)).not.toBe(initial);
        }
        await page.mouse.move(0, 0);
        expect(await section.evaluate((element) => element.previousElementSibling?.id)).toBe("services");
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        await section.screenshot({ path: info.outputPath("contact.png") });
      });
    }
  }
  test(`contato ${locale} sem JavaScript e ampliado`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 568 } });
    const page = await context.newPage();
    await page.goto(`/${locale}#contact`);
    await page.locator("html").evaluate((element) => { element.style.fontSize = "200%"; });
    const links = page.locator("#contact").getByRole("link");
    await expect(links).toHaveCount(4);
    for (const [index, link] of (await links.all()).entries()) await expect(link).toHaveAttribute("href", destinations[index]!);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await context.close();
  });
}

test("idioma e histórico mantêm contato, tema e destinos", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/pt?source=contact#contact");
  await page.getByRole("button", { name: "Ativar tema escuro" }).click();
  await page.getByRole("button", { name: "PT — Idioma: Português" }).click();
  await page.getByRole("link", { name: "English", exact: true }).click();
  await expect(page).toHaveURL(/\/en\?source=contact#contact$/);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(await page.locator("#contact a").evaluateAll((links) => links.map((link) => link.getAttribute("href")))).toEqual(destinations);
  await page.goBack();
  await expect(page).toHaveURL(/\/pt\?source=contact#contact$/);
});
