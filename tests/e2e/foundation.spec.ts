import { expect, test, type Page } from "@playwright/test";
import { readFileSync } from "node:fs";

async function downloadResume(page: Page) {
  const action = page.locator(".hero-action");
  await expect(action).toHaveAttribute("href", "/cv/felipe-tajima-curriculo-fullstack-pt.pdf");
  await expect(action).toHaveAttribute("hreflang", "pt-BR");
  await action.focus();
  await expect(action).toHaveCSS("outline-style", "solid");
  const downloading = page.waitForEvent("download");
  await page.keyboard.press("Enter");
  const download = await downloading;
  expect(download.suggestedFilename()).toBe("felipe-tajima-curriculo-fullstack-pt.pdf");
  expect(await download.failure()).toBeNull();
  const received = readFileSync((await download.path())!);
  expect(received.equals(readFileSync(new URL("../../public/cv/felipe-tajima-curriculo-fullstack-pt.pdf", import.meta.url)))).toBe(true);
}

function themeButton(page: Page) {
  return page.getByRole("button", { name: /^(Ativar tema (claro|escuro)|Switch to (light|dark) theme)$/ });
}

async function openLanguage(page: Page) {
  await page.getByRole("button", { name: /^(PT|EN) — (Idioma|Language):/ }).click();
}

const languages = [
  { code: "pt", html: "pt-BR", role: "Desenvolvedor Full-Stack", theme: "Escuro" },
  { code: "en", html: "en", role: "Full-Stack Developer", theme: "Dark" },
] as const;

for (const locale of ["pt", "en"]) {
  for (const theme of ["light", "dark"] as const) {
    for (const [width, height] of [[1440, 680], [1200, 600], [360, 800]] as const) {
      test(`seta do hero inteira no topo ${locale} ${theme} ${width}x${height}`, async ({ page }, info) => {
        await page.setViewportSize({ width: width!, height: height! });
        await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
        await page.goto(`/${locale}`);
        await page.evaluate(() => document.fonts.ready);
        await expect.poll(() => page.locator(".hero-portrait img").evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
        expect(await page.evaluate(() => scrollY)).toBe(0);
        const hint = page.locator(".hero-projects");
        const arrow = (await hint.locator("svg").boundingBox())!;
        const hintBox = (await hint.boundingBox())!;
        const photo = (await page.locator(".hero-portrait").boundingBox())!;
        const copy = (await page.locator(".hero-copy").boundingBox())!;
        expect(arrow.height).toBeGreaterThanOrEqual(20);
        expect(arrow.y + arrow.height).toBeLessThanOrEqual(height!);
        expect(hintBox.y).toBeGreaterThanOrEqual(Math.max(photo.y + photo.height, copy.y + copy.height) + 8);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        if (width < 640) {
          const name = await page.locator("h1").evaluate((element) => {
            const range = document.createRange();
            range.selectNodeContents(element);
            return Array.from(range.getClientRects()).map((rect) => Math.abs(rect.x + rect.width / 2 - innerWidth / 2));
          });
          expect(Math.max(...name)).toBeLessThan(2);
        }
        await page.screenshot({ path: info.outputPath("hero-top.png") });
        await hint.focus();
        await page.keyboard.press("Enter");
        await expect(page).toHaveURL(/#projects$/);
        await expect(page.locator("#projects")).toBeFocused();
      });
    }
  }
}

for (const language of languages) {
  for (const theme of ["light", "dark"] as const) {
    for (const width of [360, 768, 1440]) {
      test(`${language.code}, ${theme}, ${width}px: conteúdo, tema, marca e layout`, async ({ page }, info) => {
        await page.setViewportSize({ width, height: width === 768 ? 1024 : 900 });
        await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
        const errors: string[] = [];
        page.on("pageerror", (error) => errors.push(error.message));
        await page.goto(`/${language.code}`);
        await expect(page.locator("html")).toHaveAttribute("lang", language.html);
        await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
        await expect(page.getByRole("heading", { name: /felipe tajima/i })).toBeVisible();
        await expect(page.getByText(language.role, { exact: true })).toBeVisible();
        await expect(page).toHaveTitle(`Felipe Tajima | ${language.role}`);
        await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", language.code === "pt"
          ? "Portfólio de Felipe Tajima, desenvolvedor Full-Stack."
          : "Portfolio of Felipe Tajima, Full-Stack Developer.");
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://felipetajima.vercel.app/${language.code}`);
        await expect(page.locator('link[rel="alternate"][hreflang="pt-BR"]')).toHaveAttribute("href", "https://felipetajima.vercel.app/pt");
        await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", "https://felipetajima.vercel.app/en");
        await expect(page.locator('a[aria-current="page"]')).toHaveAttribute("href", `/${language.code}`);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        await expect(page.locator("body")).toHaveCSS("background-color", theme === "dark" ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)");
        const brand = page.getByRole("img", { name: "TAJ — Felipe Tajima" });
        await expect(brand).toBeVisible();
        await expect(brand).toHaveAttribute("src", `/brand/taj-wordmark-${theme}.svg`);
        expect(await brand.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
        await page.evaluate(() => document.fonts.ready);
        expect(await page.evaluate(() => document.fonts.check('400 16px "' + getComputedStyle(document.body).fontFamily.split(",")[0]?.replaceAll('"', '') + '"'))).toBe(true);
        await expect(page.getByRole("img", { name: language.code === "pt"
          ? "Felipe Tajima sorrindo em um costão rochoso."
          : "Felipe Tajima smiling on a rocky coastline." })).toBeVisible();
        await expect.poll(() => page.locator(".hero-portrait img").evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
        expect(await page.locator(".intro-shell").evaluate((element) => element.getBoundingClientRect().height + document.querySelector("header")!.getBoundingClientRect().height >= innerHeight)).toBe(true);
        if (width === 1440) {
          const name = await page.locator("h1").evaluate((element) => ({ height: element.getBoundingClientRect().height, line: parseFloat(getComputedStyle(element).lineHeight) }));
          expect(name.height).toBeLessThanOrEqual(name.line + 1);
        }
        await page.screenshot({ path: info.outputPath("foundation.png"), fullPage: true });
        await page.getByRole("contentinfo").screenshot({ path: info.outputPath("footer.png") });
        await expect(page.locator(".hero-action")).toHaveText(language.code === "pt" ? "Baixar CV" : "Download CV (PT-BR)");
        await downloadResume(page);
        await expect(page).toHaveURL(`/${language.code}`);
        await openLanguage(page);
        const panel = page.locator(".header-settings .settings-panel");
        expect((await panel.boundingBox())!.width).toBeLessThanOrEqual(180);
        expect((await panel.boundingBox())!.height).toBeLessThanOrEqual(112);
        await panel.screenshot({ path: info.outputPath("language.png") });
        await themeButton(page).click();
        await expect(page.getByRole("link", { name: "English", exact: true })).toBeHidden();
        await expect(page.locator("html")).toHaveAttribute("data-theme", theme === "dark" ? "light" : "dark");
        await themeButton(page).click();
        await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
        expect(errors).toEqual([]);
      });
    }
  }
}

test("raiz redireciona, preserva âncora e idioma desconhecido retorna 404", async ({ page, request }) => {
  await page.goto("/#foundation");
  await expect(page).toHaveURL(/\/pt#foundation$/);
  expect((await request.get("/fr")).status()).toBe(404);
});

test("idioma preserva tema, âncora, query e histórico", async ({ page }) => {
  await page.goto("/pt?source=check#foundation");
  await themeButton(page).click();
  await page.emulateMedia({ colorScheme: "dark" });
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await openLanguage(page);
  await page.getByRole("link", { name: "English", exact: true }).click();
  await expect(page).toHaveURL(/\/en\?source=check#foundation$/);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(themeButton(page)).toHaveAccessibleName("Switch to light theme");
  await page.goBack();
  await expect(page).toHaveURL(/\/pt\?source=check#foundation$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/en\?source=check#foundation$/);
});

test("tema acompanha sistema até escolha manual, alterna diretamente e persiste", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/pt");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await themeButton(page).click();
  await expect(page.locator(".settings-disclosure[open]")).toHaveCount(0);
  await expect(page.getByRole("radio")).toHaveCount(0);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(await page.evaluate(() => localStorage.getItem("taj-theme"))).toBe("dark");
  await themeButton(page).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  expect(await page.evaluate(() => localStorage.getItem("taj-theme"))).toBe("light");
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("preferência salva é aplicada antes da hidratação e de imagens lentas", async ({ browser }) => {
  const context = await browser.newContext({ colorScheme: "light" });
  await context.addInitScript(() => localStorage.setItem("taj-theme", "dark"));
  await context.route(/\.(js|svg)(\?|$)/, (route) => route.abort());
  const page = await context.newPage();
  await page.goto("/pt", { waitUntil: "domcontentloaded" });
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(0, 0, 0)");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.getByRole("heading", { name: /felipe tajima/i })).toBeVisible();
  await context.close();
});

test("armazenamento bloqueado não impede o uso", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", { get() { throw new DOMException("Blocked", "SecurityError"); } });
  });
  await page.goto("/en");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await themeButton(page).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("valor persistido inválido segue o sistema", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("taj-theme", "invalid"));
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/pt");
  await expect(page.locator("html")).toHaveAttribute("data-theme-preference", "system");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("sem API de preferência do sistema, fallback claro e escolha manual funcionam", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => Object.defineProperty(window, "matchMedia", { value: undefined }));
  await page.goto("/en");
  await expect(page.locator(".particle-toggle")).toBeHidden();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await themeButton(page).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(errors).toEqual([]);
});

test("sem JavaScript, conteúdo e links funcionam e CSS acompanha o sistema", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, colorScheme: "dark" });
  const page = await context.newPage();
  await page.goto("/pt");
  await expect(page.getByRole("heading", { name: /felipe tajima/i })).toBeVisible();
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(0, 0, 0)");
  await expect(page.getByRole("radio")).toHaveCount(0);
  await expect(themeButton(page)).toHaveCount(0);
  await downloadResume(page);
  await openLanguage(page);
  await page.getByRole("link", { name: "English" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await context.close();
});

test("teclado alcança idiomas e temas com foco visível", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/en");
  await expect(page.locator(".site-opening")).toHaveCount(0);
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to introduction" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Home", exact: true }).first()).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "EN — Language: English" })).toBeFocused();
  await page.keyboard.press("Enter");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Português" })).toBeFocused();
  expect(await page.locator(":focus").evaluate((element) => getComputedStyle(element).outlineWidth)).toBe("2px");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "English" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "EN — Language: English" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(themeButton(page)).toBeFocused();
  expect(await themeButton(page).evaluate((element) => getComputedStyle(element).outlineWidth)).toBe("2px");
  await page.keyboard.press("Enter");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(themeButton(page)).toHaveAccessibleName("Switch to light theme");
  await page.keyboard.press("Space");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(themeButton(page)).toBeFocused();
});

test("foto inicia colorida, fica preto e branco no hover e respeita movimento reduzido", async ({ page }) => {
  await page.goto("/pt");
  const photo = page.locator(".hero-portrait img");
  await expect(photo).toHaveCSS("filter", "grayscale(0)");
  await photo.hover();
  await expect(photo).toHaveCSS("filter", "grayscale(1)");
  await page.mouse.move(0, 0);
  await expect(photo).toHaveCSS("filter", "grayscale(0)");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(photo).toHaveCSS("transition-duration", "0s");
});

test("toque não alterna cor e âncoras disponíveis têm destino real", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 360, height: 800 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  await page.goto("/en");
  const photo = page.locator(".hero-portrait img");
  await photo.tap();
  await expect(photo).toHaveCSS("filter", "grayscale(0)");
  expect(await page.locator('a[href^="#"]').evaluateAll((links) => links.every((link) => document.getElementById(link.getAttribute("href")!.slice(1))))).toBe(true);
  await page.getByRole("link", { name: "Home", exact: true }).first().click();
  await expect(page).toHaveURL(/#intro$/);
  await openLanguage(page);
  await page.getByRole("link", { name: "Português" }).click();
  await expect(page).toHaveURL(/\/pt#intro$/);
  await context.close();
});

test("foto indisponível não bloqueia a apresentação e zoom de texto permite leitura", async ({ page }) => {
  await page.route("**/_next/image**", (route) => route.abort());
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto("/en");
  await page.addStyleTag({ content: "html { font-size: 200%; }" });
  await expect(page.getByRole("heading", { name: /felipe tajima/i })).toBeVisible();
  await expect(page.getByText("Full-Stack Developer", { exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("painel compacto de idioma fecha com o tema ou clique fora", async ({ page }, info) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/pt");
  await openLanguage(page);
  await expect(page.getByRole("link", { name: "English" })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: info.outputPath("header-language.png") });
  await page.getByRole("heading", { name: /felipe tajima/i }).click();
  await expect(page.getByRole("link", { name: "English" })).toBeHidden();
  await openLanguage(page);
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await expect(themeButton(page)).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("link", { name: "English" })).toBeHidden();
  await expect(page.locator(".settings-disclosure[open]")).toHaveCount(0);
});
