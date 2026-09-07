import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const routes = ['/', '/location', '/location/mini-pelle', '/location/camion-benne', '/location/betonniere', '/location/plateau-remorque-35t', '/location/utilitaire', '/demande-location', '/chauffeur', '/comment-ca-marche', '/livraison-annay', '/mentions-legales', '/confidentialite', '/conditions-location', '/informations-preversion', '/demande-envoyee'];
for (const width of [320, 375, 768, 1024, 1440]) {
  test(`pages accessibles sans débordement à ${width}px`, async ({ page }) => {
    test.setTimeout(60000);
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status(), route).toBe(200);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
      expect(overflow, `Débordement sur ${route} à ${width}px`).toBe(false);
      await expect(page.locator('meta[name=description]')).toHaveAttribute('content', /.+/);
    }
    expect(errors).toEqual([]);
  });
}
for (const width of [375, 1440]) {
  test(`analyse accessibilité des parcours à ${width}px`, async ({ page }) => {
    test.setTimeout(90000);
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/', '/location', '/location/mini-pelle', '/demande-location', '/chauffeur', '/comment-ca-marche', '/livraison-annay']) {
      await page.goto(route); await page.evaluate(() => document.fonts.ready);
      const result = await new AxeBuilder({ page }).analyze();
      expect(result.violations.map((violation) => ({ id: violation.id, nodes: violation.nodes.map((node) => node.target) })), route).toEqual([]);
    }
  });
}
test('navigation mobile au clavier, fermeture Échap et réduction des animations', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const open = page.getByRole('button', { name: 'Ouvrir le menu' });
  await open.focus(); await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog')).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.keyboard.press('Shift+Tab');
  expect(await page.evaluate(() => !!document.activeElement?.closest('dialog'))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible(); await expect(open).toBeFocused();
  expect(await page.locator('.hero h1').evaluate((el) => getComputedStyle(el).animationName)).toBe('none');
});
test('WhatsApp contextualisé et téléphone utilisent la configuration de test', async ({ page }) => {
  await page.goto('/location/mini-pelle');
  const links = page.locator('a[href^="https://wa.me/"]');
  await expect(links.first()).toHaveAttribute('href', /33600000000/);
  expect(decodeURIComponent(await links.first().getAttribute('href') || '')).toContain('mini-pelle');
  await expect(page.locator('a[href="tel:+33600000000"]').first()).toBeVisible();
});
test('404 réelle et indexation de préversion', async ({ page, request }) => {
  const response = await page.goto('/page-inexistante');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: /REPRENONS/ })).toBeVisible();
  expect(await (await request.get('/robots.txt')).text()).toContain('Disallow: /');
  expect(await (await request.get('/sitemap.xml')).text()).not.toContain('<url>');
});
test('lecture et formulaire HTML complet sans JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4322/demande-location');
  await expect(page.getByLabel('Le matériel')).toBeVisible(); await expect(page.getByLabel('Commune de mise à disposition')).toBeVisible(); await expect(page.getByLabel('Votre nom')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Envoyer ma demande' })).toBeVisible();
  await expect(page.locator('form')).toHaveAttribute('method', 'POST');
  await expect(page.locator('form')).toHaveAttribute('data-netlify', 'true');
  await page.setViewportSize({ width: 375, height: 812 });
  await expect(page.getByRole('navigation', { name: 'Navigation sans JavaScript' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Ouvrir le menu' })).not.toBeVisible();
  await context.close();
});
test('les actions mobiles gardent le contexte sans effacer une demande', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/location/betonniere');
  await expect(page.getByRole('navigation', { name: 'Contact rapide' }).getByRole('link', { name: 'Demander une location' })).toHaveAttribute('href', '/demande-location?materiel=betonniere');
  await page.goto('/chauffeur');
  await expect(page.getByRole('navigation', { name: 'Contact rapide' }).getByRole('link', { name: 'Demander une prestation' })).toHaveAttribute('href', '/chauffeur#demande');
  await page.goto('/demande-location');
  await expect(page.getByRole('navigation', { name: 'Contact rapide' }).getByRole('link', { name: 'Demander une location' })).toHaveCount(0);
});
test('reflow équivalent à un zoom navigateur de 200 %', async ({ browser }) => {
  // A 1440×1000 physical viewport at 200% zoom has 720×500 CSS pixels.
  // CSS zoom does not update media queries and is not browser zoom.
  const context = await browser.newContext({ viewport: { width: 720, height: 500 }, deviceScaleFactor: 2, baseURL: 'http://127.0.0.1:4322' });
  const page = await context.newPage();
  await page.goto('/demande-location');
  await expect(page.getByLabel('Le matériel')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  await context.close();
});
