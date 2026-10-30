import { expect, test } from "@playwright/test";

for (const locale of ["pt", "en"]) {
  test(`rodapé ${locale} volta ao início por teclado e sem JavaScript`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 568 } });
    const page = await context.newPage();
    await page.goto(`/${locale}#services`);
    await page.locator("html").evaluate((element) => { element.style.fontSize = "200%"; });
    const footer = page.getByRole("contentinfo");
    await expect(footer.getByText("Felipe Tajima", { exact: true })).toBeVisible();
    const link = footer.getByRole("link", { name: locale === "pt" ? "Voltar ao início" : "Back to top", exact: true });
    await link.focus();
    await page.keyboard.press("Shift+Tab");
    await page.keyboard.press("Tab");
    await expect(link).toBeFocused();
    await expect(link).toHaveCSS("outline-style", "solid");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#intro$/);
    await expect(page.locator("#intro")).toBeFocused();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await context.close();
  });
}
