import { test, expect } from '@playwright/test';

test('la Hero conserve son titre entier, ses actions et son image sans chevauchement', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [320, 375, 720, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const hero = page.locator('.poster-hero');
    const image = hero.locator('img');
    await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
    const layout = await hero.evaluate((el) => {
      const title = el.querySelector('h1')!;
      const range = document.createRange();
      range.selectNodeContents(title);
      const letters = [...range.getClientRects()];
      const heading = title.getBoundingClientRect();
      const cta = el.querySelector('.button')!.getBoundingClientRect();
      const machine = el.querySelector('img')!.getBoundingClientRect();
      return {
        titleFits: letters.every((r) => r.left >= 0 && r.right <= innerWidth),
        titleAboveActions: heading.bottom <= cta.top,
        actionsClear: cta.right <= machine.left || cta.bottom <= machine.top,
        ctaHeight: cta.height,
        animation: getComputedStyle(el.querySelector('.poster-machine')!).animationName,
      };
    });
    expect(layout.titleFits, `Titre à ${width}px`).toBe(true);
    expect(layout.titleAboveActions, `Hiérarchie à ${width}px`).toBe(true);
    expect(layout.actionsClear, `CTA à ${width}px`).toBe(true);
    expect(layout.ctaHeight).toBeGreaterThanOrEqual(48);
    expect(layout.animation).toBe('none');
  }
  const cta = page.locator('.poster-actions').getByRole('link', { name: 'Demander une location' });
  await cta.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/demande-location$/);
});

test('la Hero et ses liens restent utilisables sans JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4322/');
  await expect(page.locator('.poster-hero h1')).toBeVisible();
  await expect(page.locator('.poster-machine img')).toBeVisible();
  await page.locator('.poster-actions').getByRole('link', { name: 'Voir le matériel' }).click();
  await expect(page).toHaveURL(/\/location$/);
  await context.close();
});
