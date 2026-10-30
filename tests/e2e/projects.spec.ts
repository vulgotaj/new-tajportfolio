import { expect, test } from "@playwright/test";

for (const locale of ["pt", "en"]) {
  for (const theme of ["light", "dark"] as const) {
    for (const width of [360, 768, 1440]) {
      test(`projetos ${locale} ${theme} ${width}`, async ({ page }, info) => {
        await page.setViewportSize({ width, height: width === 768 ? 1024 : 900 });
        await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
        await page.goto(`/${locale}#projects`);
        const track = page.locator("#project-list");
        const next = page.getByRole("button", { name: locale === "pt" ? "Próximos projetos" : "Next projects" });
        const previous = page.getByRole("button", { name: locale === "pt" ? "Projetos anteriores" : "Previous projects" });
        await expect(page.locator(".project-item")).toHaveCount(5);
        expect(await page.locator(".project-title").allTextContents()).toEqual(["DevControle", "Fast Motors", "Today Movies", "pizzaUP", "BarberHub"]);
        await expect(page.locator(".project-status")).toHaveCount(2);
        for (const id of ["pizzaup", "barberhub"]) {
          const project = page.locator(`#project-${id}`);
          await expect(project.locator(".project-status")).toHaveText(locale === "pt" ? "Em desenvolvimento" : "In development");
          await expect(project.locator(".project-preview img")).toHaveAttribute("alt", /.+/);
          await expect(project.getByRole("link", { name: `GitHub: ${id === "pizzaup" ? "pizzaUP" : "BarberHub"} (${locale === "pt" ? "abre em nova aba" : "opens in a new tab"})`, exact: true })).toHaveCount(1);
        }
        await expect(previous).toBeDisabled();
        await expect(next).toBeEnabled();
        const centeredProject = async (index: number) => {
          if (width >= 1200) return;
          await expect.poll(() => page.locator(".project-item").nth(index).evaluate((item) => {
            const card = item.getBoundingClientRect();
            const list = item.parentElement!.getBoundingClientRect();
            return Math.abs(card.left + card.width / 2 - list.left - list.width / 2);
          })).toBeLessThan(2);
        };
        const loadedPreview = async (index: number) => {
          await expect.poll(() => page.locator(".project-preview img").nth(index).evaluate((image) => {
            const preview = image as HTMLImageElement;
            return preview.complete && preview.naturalWidth > 0;
          })).toBe(true);
        };
        await centeredProject(0);
        await loadedPreview(0);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        await page.screenshot({ path: info.outputPath("projects-start.png") });
        await track.focus();
        await page.keyboard.press("End");
        await expect(next).toBeDisabled();
        await expect(previous).toBeEnabled();
        await centeredProject(4);
        await loadedPreview(4);
        const last = await page.locator("#project-barberhub").boundingBox();
        const bounds = await track.boundingBox();
        expect(last!.x).toBeGreaterThanOrEqual(bounds!.x - 2);
        expect(last!.x + last!.width).toBeLessThanOrEqual(bounds!.x + bounds!.width + 2);
        await page.screenshot({ path: info.outputPath("projects-end.png") });
        await page.keyboard.press("ArrowLeft");
        await centeredProject(3);
        await loadedPreview(3);
        await page.screenshot({ path: info.outputPath("projects-pizzaup.png") });
        await page.keyboard.press("ArrowRight");
        await expect(next).toBeDisabled();
        await page.keyboard.press("Home");
        await expect(previous).toBeDisabled();
        await next.click();
        await expect.poll(() => track.evaluate((list) => list.scrollLeft)).toBeGreaterThan(0);
        await centeredProject(1);
        await page.screenshot({ path: info.outputPath("projects-middle.png") });
        if (width < 1200) {
          for (const index of [2, 3, 4]) {
            await next.click();
            await centeredProject(index);
          }
          await expect(next).toBeDisabled();
          for (const index of [3, 2, 1]) {
            await previous.click();
            await centeredProject(index);
          }
        }
        await previous.click();
        await expect(previous).toBeDisabled();
        await centeredProject(0);
        await expect(page.locator(".project-article details")).toHaveCount(0);
        const repository = page.getByRole("link", { name: `GitHub: DevControle (${locale === "pt" ? "abre em nova aba" : "opens in a new tab"})`, exact: true });
        const demo = page.getByRole("link", { name: `${locale === "pt" ? "Ver projeto" : "Live demo"}: DevControle (${locale === "pt" ? "abre em nova aba" : "opens in a new tab"})`, exact: true });
        await expect(page.locator(".project-links a")).toHaveCount(8);
        const destinations = [
          ["https://github.com/vulgotaj/DevControle", "https://dev-control-wheat.vercel.app/"],
          ["https://github.com/vulgotaj/fastmotors", "https://fastmotors.vercel.app/"],
          ["https://github.com/vulgotaj/today-movies", "https://today-movies.vercel.app/"],
          ["https://github.com/vulgotaj/pizzaUP"],
          ["https://github.com/T-J-Labs/barberhub"],
        ];
        for (const [index, links] of destinations.entries()) {
          const actions = page.locator(".project-links").nth(index);
          await expect(actions.locator(".project-repository")).toHaveAttribute("href", links[0]!);
          if (links[1]) await expect(actions.locator(".project-demo")).toHaveAttribute("href", links[1]);
          else await expect(actions.locator(".project-demo")).toHaveCount(0);
          for (const action of await actions.locator("a").all()) {
            await expect(action).toHaveAttribute("target", "_blank");
            await expect(action).toHaveAttribute("rel", "noopener noreferrer");
            expect(await action.evaluate((element) => element.getBoundingClientRect().height)).toBeGreaterThanOrEqual(44);
          }
        }
        await expect(repository.locator("svg")).toHaveAttribute("aria-hidden", "true");
        await repository.focus();
        await page.keyboard.press("Tab");
        await expect(demo).toBeFocused();
        await expect(demo).toHaveCSS("outline-style", "solid");
        await page.locator(".project-article").first().screenshot({ path: info.outputPath("project-actions.png") });
        if (width === 1440) {
          const image = page.locator(".project-preview img").first();
          await expect(image).toHaveCSS("filter", "grayscale(0)");
          await image.hover();
          await expect(image).toHaveCSS("filter", "grayscale(1)");
          await page.mouse.move(0, 0);
          await expect(image).toHaveCSS("filter", "grayscale(0)");
          await expect(image).toHaveCSS("transition-duration", "0s");
        }
        expect(await page.locator("#intro").evaluate((element) => element.parentElement?.nextElementSibling?.id)).toBe("projects");
      });
    }
  }
}

for (const id of ["pizzaup", "barberhub"]) {
  test(`idioma e histórico preservam ${id} e o tema`, async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
    await page.goto(`/pt#project-${id}`);
    await expect(page.locator(`#project-${id}`)).toBeInViewport();
    await page.getByRole("button", { name: "PT — Idioma: Português" }).click();
    await page.getByRole("link", { name: "English", exact: true }).click();
    await expect(page).toHaveURL(`/en#project-${id}`);
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(page.locator(`#project-${id}`)).toBeInViewport();
    await expect(page.locator(`#project-${id} .project-status`)).toHaveText("In development");
    if (id === "barberhub") await expect(page.getByRole("button", { name: "Next projects" })).toBeDisabled();
    await page.goBack();
    await expect(page).toHaveURL(`/pt#project-${id}`);
    // Returning restores the header scroll position used to open the language menu.
    await expect.poll(() => page.locator(`#project-${id}`).evaluate((item) => {
      const card = item.getBoundingClientRect();
      const track = item.parentElement!.getBoundingClientRect();
      return Math.abs(card.x + card.width / 2 - track.x - track.width / 2);
    })).toBeLessThan(2);
    if (id === "barberhub") await expect(page.getByRole("button", { name: "Próximos projetos" })).toBeDisabled();
  });
}

test("setas centralizam o projeto com rolagem suave, resize e recarga", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/pt#projects");
  await page.getByRole("button", { name: "Próximos projetos" }).click();
  const centered = async (id: string) => {
    await expect.poll(() => page.locator(`#project-${id}`).evaluate((card) => {
      const bounds = card.getBoundingClientRect();
      const track = card.parentElement!.getBoundingClientRect();
      return Math.abs(bounds.x + bounds.width / 2 - track.x - track.width / 2);
    })).toBeLessThan(2);
  };
  await centered("fast-motors");
  await expect(page).toHaveURL(/#project-fast-motors$/);
  for (const width of [430, 768, 390]) {
    await page.setViewportSize({ width, height: 844 });
    await centered("fast-motors");
    await expect(page.getByRole("button", { name: "Próximos projetos" })).toBeEnabled();
    await expect(page.getByRole("button", { name: "Projetos anteriores" })).toBeEnabled();
  }
  await page.reload();
  await centered("fast-motors");
  await page.getByRole("button", { name: "Projetos anteriores" }).click();
  await centered("devcontrole");
  await expect(page.getByRole("button", { name: "Projetos anteriores" })).toBeDisabled();
});

test("menu estreito e indicação do hero alcançam projetos; Escape devolve foco", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/pt");
  await page.locator(".hero-projects").click();
  await expect(page).toHaveURL(/#projects$/);
  const menu = page.getByRole("button", { name: "Abrir navegação" });
  await menu.click();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await menu.click();
  await page.getByRole("link", { name: "Projetos", exact: true }).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.locator(".mobile-navigation")).not.toHaveAttribute("open");
});

test("arrasto com mouse navega sem bloquear rolagem vertical", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/pt#project-pizzaup");
  await expect(page.locator("#project-pizzaup")).toBeInViewport();
  const bounds = await page.locator("#project-pizzaup .project-preview").boundingBox();
  await page.mouse.move(bounds!.x + bounds!.width - 30, bounds!.y + 80);
  await page.mouse.down();
  await page.mouse.move(bounds!.x + 30, bounds!.y + 80, { steps: 12 });
  await page.mouse.up();
  await expect(page.getByRole("button", { name: "Próximos projetos" })).toBeDisabled();
  await expect(page.locator("#project-barberhub")).toBeInViewport({ ratio: 0.9 });
  const top = await page.evaluate(() => scrollY);
  await page.mouse.wheel(0, 300);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(top);
});

test("sem JavaScript há conteúdo, ações de projeto e rolagem nativa", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 360, height: 800 } });
  const page = await context.newPage();
  await page.goto("/en#projects");
  await expect(page.locator(".project-item")).toHaveCount(5);
  await expect(page.locator(".project-controls")).toBeHidden();
  await expect(page.locator(".project-links a")).toHaveCount(8);
  await expect(page.getByRole("link", { name: "Live demo: DevControle (opens in a new tab)", exact: true })).toHaveAttribute("href", "https://dev-control-wheat.vercel.app/");
  await page.locator("#project-list").focus();
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowRight");
  await expect.poll(() => page.locator("#project-list").evaluate((list) => list.scrollLeft)).toBeGreaterThan(0);
  await context.close();
});

test("gesto de toque acessa os demais projetos mantendo as cores originais", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 360, height: 800 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  await page.goto("/pt#project-pizzaup");
  await expect(page.locator(".site-opening")).toHaveCount(0);
  await expect(page.locator("#project-pizzaup")).toBeInViewport();
  const bounds = await page.locator("#project-pizzaup .project-preview").boundingBox();
  const y = Math.round(bounds!.y + 70);
  const session = await context.newCDPSession(page);
  for (let swipe = 0; swipe < 2; swipe++) {
    const before = await page.locator("#project-list").evaluate((list) => list.scrollLeft);
    await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: 285, y }] });
    for (let x = 270; x >= 30; x -= 20) await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x, y }] });
    await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await expect.poll(() => page.locator("#project-list").evaluate((list) => list.scrollLeft)).toBeGreaterThan(before);
  }
  await expect(page.getByRole("button", { name: "Próximos projetos" })).toBeDisabled();
  await expect(page.locator("#project-barberhub")).toBeInViewport({ ratio: 0.9 });
  await expect(page.locator("#project-barberhub .project-preview img")).toHaveCSS("filter", "grayscale(0)");
  await context.close();
});
