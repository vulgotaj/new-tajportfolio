import { expect, test, type Locator } from "@playwright/test";

async function contrast(target: Locator) {
  return target.evaluate((element) => {
    const style = getComputedStyle(element);
    const background = style.backgroundColor.match(/[\d.]+/g)!.map(Number);
    const foreground = style.color.match(/[\d.]+/g)!.map(Number);
    if ((background[3] ?? 1) < .99) return 0;
    const luminance = (rgb: number[]) => rgb.slice(0, 3).reduce((sum, channel, index) => {
      const value = channel / 255;
      return sum + (value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4) * [0.2126, 0.7152, 0.0722][index]!;
    }, 0);
    const values = [luminance(background), luminance(foreground)].sort((a, b) => a - b);
    return (values[1]! + .05) / (values[0]! + .05);
  });
}

for (const locale of ["pt", "en"]) {
  for (const theme of ["light", "dark"] as const) {
    test(`feedback de hover e foco ${locale} ${theme}`, async ({ page }, info) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.emulateMedia({ colorScheme: theme, reducedMotion: "no-preference" });
      await page.goto(`/${locale}`);
      const highlighted = async (target: Locator, name: string) => {
        const before = await target.evaluate((element) => getComputedStyle(element).backgroundColor);
        await target.hover();
        await expect.poll(() => target.evaluate((element) => getComputedStyle(element).backgroundColor)).not.toBe(before);
        await expect.poll(() => contrast(target)).toBeGreaterThanOrEqual(4.5);
        await target.screenshot({ path: info.outputPath(`${name}.png`) });
      };
      await highlighted(page.locator(".hero-action"), "hero-hover");
      await highlighted(page.locator('.primary-navigation a[href="#projects"]'), "navigation-hover");
      await highlighted(page.locator(".theme-toggle"), "theme-hover");
      await page.getByRole("button", { name: locale === "pt" ? "PT — Idioma: Português" : "EN — Language: English" }).click();
      await highlighted(page.getByRole("link", { name: locale === "pt" ? "English" : "Português", exact: true }), "language-hover");
      await page.keyboard.press("Escape");
      await highlighted(page.locator(".project-repository").first(), "github-hover");
      await highlighted(page.locator(".project-demo").first(), "demo-hover");
      const disabled = page.locator(".project-controls button").first();
      await expect(disabled).toBeDisabled();
      const disabledState = await disabled.evaluate((element) => [getComputedStyle(element).backgroundColor, getComputedStyle(element).transform]);
      await disabled.hover();
      expect(await disabled.evaluate((element) => [getComputedStyle(element).backgroundColor, getComputedStyle(element).transform])).toEqual(disabledState);
      await highlighted(page.locator(".project-controls button").last(), "carousel-hover");
      for (const [index, link] of (await page.locator(".contact-links a").all()).entries()) {
        const icon = link.locator(".contact-icon");
        const before = await icon.evaluate((element) => getComputedStyle(element).backgroundColor);
        await icon.hover();
        await expect.poll(() => icon.evaluate((element) => getComputedStyle(element).backgroundColor)).not.toBe(before);
        await expect.poll(() => contrast(icon)).toBeGreaterThanOrEqual(4.5);
        await link.screenshot({ path: info.outputPath(`contact-hover-${index}.png`) });
      }
      const contact = page.locator(".contact-links a").first();
      await page.mouse.move(0, 0);
      await contact.focus();
      await page.keyboard.press("Shift+Tab");
      await page.keyboard.press("Tab");
      await expect(contact).toBeFocused();
      await expect(contact).toHaveCSS("outline-style", "solid");
      await expect.poll(() => contrast(contact.locator(".contact-icon"))).toBeGreaterThanOrEqual(4.5);
      await page.emulateMedia({ reducedMotion: "reduce" });
      await contact.evaluate((element: HTMLElement) => element.blur());
      const icon = contact.locator(".contact-icon");
      const before = (await icon.boundingBox())!;
      await icon.hover();
      const after = (await icon.boundingBox())!;
      expect(after.x).toBeCloseTo(before.x, 1);
      expect(after.y).toBeCloseTo(before.y, 1);
      expect(after.width).toBeCloseTo(before.width, 1);
      expect(await icon.evaluate((element) => element.getAnimations().length)).toBe(0);
      await expect.poll(() => contrast(icon)).toBeGreaterThanOrEqual(4.5);
    });
  }
}

for (const theme of ["light", "dark"] as const) {
  test(`toque não deixa hover persistente ${theme}`, async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, colorScheme: theme });
    const page = await context.newPage();
    await page.goto("/pt");
    const action = page.locator(".hero-action");
    const before = await action.evaluate((element) => getComputedStyle(element).backgroundColor);
    const download = page.waitForEvent("download");
    await action.tap();
    expect((await download).suggestedFilename()).toBe("felipe-tajima-curriculo-fullstack-pt.pdf");
    await expect(page).toHaveURL(/\/pt$/);
    await expect.poll(() => action.evaluate((element) => getComputedStyle(element).backgroundColor)).toBe(before);
    await page.goto("/pt#contact");
    const icon = page.locator(".contact-icon").first();
    const initial = await icon.evaluate((element) => getComputedStyle(element).backgroundColor);
    await icon.hover();
    await expect(icon).toHaveCSS("background-color", initial);
    await context.close();
  });
}
