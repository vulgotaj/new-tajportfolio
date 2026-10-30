import { expect, test } from "@playwright/test";

declare global {
  interface Window {
    recordCspViolation: (directive: string) => Promise<void>;
  }
}

for (const locale of ["pt", "en"]) {
  test(`publicação ${locale}: SEO, recursos da marca e política de segurança`, async ({ page, request }) => {
    await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
    const blocked: string[] = [];
    await page.exposeFunction("recordCspViolation", (directive: string) => blocked.push(directive));
    await page.addInitScript(() => {
      document.addEventListener("securitypolicyviolation", (event) => {
        void window.recordCspViolation(event.violatedDirective);
      });
    });
    const response = await page.goto(`/${locale}`);
    const headers = response!.headers();
    expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
    expect(headers["content-security-policy"]).not.toContain("unsafe-eval");
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["x-powered-by"]).toBeUndefined();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://felipetajima.vercel.app/${locale}`);
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", locale === "pt" ? "pt_BR" : "en_US");
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", `https://felipetajima.vercel.app/og/${locale}.png`);
    for (const [language, path] of [["pt-BR", "pt"], ["en", "en"], ["x-default", "pt"]]) {
      await expect(page.locator(`link[rel="alternate"][hreflang="${language}"]`)).toHaveAttribute("href", `https://felipetajima.vercel.app/${path}`);
    }
    for (const path of ["/favicon.ico", "/icon.svg", "/apple-touch-icon.png", `/og/${locale}.png`]) {
      const asset = await request.get(path);
      expect(asset.ok(), path).toBe(true);
      expect(asset.headers()["content-type"]).toMatch(/^image\//);
    }
    const robots = await request.get("/robots.txt");
    expect(await robots.text()).toContain("Sitemap: https://felipetajima.vercel.app/sitemap.xml");
    const sitemap = await request.get("/sitemap.xml");
    const xml = await sitemap.text();
    expect(xml).toContain("<loc>https://felipetajima.vercel.app/pt</loc>");
    expect(xml).toContain("<loc>https://felipetajima.vercel.app/en</loc>");
    await expect.poll(() => page.locator(".hero-portrait img").evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    await page.getByRole("button", { name: locale === "pt" ? "Ativar tema escuro" : "Switch to dark theme" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    expect(blocked).toEqual([]);
    // A realistic injected event attribute must stay inert, while normal React controls work.
    await page.evaluate(() => {
      const button = document.createElement("button");
      button.setAttribute("onclick", "document.documentElement.dataset.injected = 'yes'");
      document.body.append(button);
      button.click();
      button.remove();
    });
    await expect.poll(() => blocked).toContain("script-src-attr");
    await expect(page.locator("html")).not.toHaveAttribute("data-injected");
  });
}

test("a política impede embutir a página em um iframe", async ({ page }) => {
  await page.goto("/pt");
  const refused = page.waitForEvent("console", { predicate: (message) => message.text().includes("frame-ancestors") });
  await page.evaluate(() => {
    const frame = document.createElement("iframe");
    frame.src = "/en";
    frame.title = "Teste de enquadramento";
    document.body.append(frame);
  });
  await refused;
  await expect(page.frameLocator("iframe").locator("h1")).toHaveCount(0);
});
