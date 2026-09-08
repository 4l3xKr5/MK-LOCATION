import { test, expect } from '@playwright/test';

const offers = ['mini-pelle', 'camion-benne', 'betonniere', 'plateau-remorque-35t', 'utilitaire'];

test('les six offres affichent une image entière sans bandeau ni repère sur mobile et desktop', async ({ page }) => {
  test.setTimeout(60000);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [320, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of [...offers.map((slug) => `/location/${slug}`), '/chauffeur']) {
      await page.goto(route);
      const figure = page.locator('figure[data-image-provenance="generated-illustration"]').first();
      const img = figure.locator('img');
      await expect(img).toBeVisible();
      await expect(img).toHaveAttribute('alt', /illustration/);
      await expect(img).toHaveAttribute('fetchpriority', 'high');
      await expect(figure.locator('source[type="image/avif"]')).toHaveAttribute('srcset', /480w.*1536w/);
      await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
      const photoBounds = await img.boundingBox();
      expect(photoBounds).not.toBeNull();
      expect(photoBounds!.width / photoBounds!.height).toBeCloseTo(1.5, 1);
      await expect(figure.locator('figcaption')).toHaveCount(0);
      expect(await figure.evaluate((el) => getComputedStyle(el, '::after').display)).toBe('none');
      expect(await img.evaluate((el) => getComputedStyle(el).objectFit)).toBe('contain');
    }
  }
});

test('le catalogue conserve cinq vignettes sur mobile sans JavaScript et des aperçus au clavier', async ({ browser, page }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
  const mobile = await context.newPage();
  await mobile.goto('http://127.0.0.1:4322/location');
  for (const slug of offers) {
    const row = mobile.locator(`[data-index-item="${slug}"]`);
    await row.scrollIntoViewIfNeeded();
    await expect(row.locator('.index-thumbnail img')).toBeVisible();
    await expect(row).toHaveAttribute('href', `/location/${slug}`);
    await expect.poll(() => row.locator('img').evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
  }
  await context.close();

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/location');
  for (const slug of offers) {
    await page.locator(`[data-index-item="${slug}"]`).focus();
    const preview = page.locator(`[data-index-preview="${slug}"]`);
    await expect(preview).toBeVisible();
    await expect.poll(() => preview.locator('img').evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
  }
});
