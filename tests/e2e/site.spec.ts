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
  await expect(page.getByRole('navigation', { name: 'Navigation mobile' }).getByRole('link', { name: 'Accueil', exact: true })).toHaveAttribute('aria-current', 'page');
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.keyboard.press('Shift+Tab');
  expect(await page.evaluate(() => !!document.activeElement?.closest('dialog'))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible(); await expect(open).toBeFocused();
  expect(await page.locator('.hero h1').evaluate((el) => getComputedStyle(el).animationName)).toBe('none');
  expect(await page.locator('[data-reveal]').evaluateAll((elements) => elements.every((element) => getComputedStyle(element).opacity === '1'))).toBe(true);
});
test('la navigation principale expose Accueil et indique la page active', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const navigation = page.getByRole('navigation', { name: 'Navigation principale' });
  await expect(navigation.getByRole('link', { name: 'Accueil', exact: true })).toHaveAttribute('aria-current', 'page');
  await page.goto('/location');
  await expect(navigation.getByRole('link', { name: 'Accueil', exact: true })).not.toHaveAttribute('aria-current', 'page');
  await expect(navigation.locator('[data-nav-dropdown]')).toHaveClass(/is-active/);
});
test('le sous-menu Matériel est accessible au clavier et mène aux équipements', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const menu = page.locator('[data-nav-dropdown]');
  const trigger = menu.locator('summary');
  await trigger.focus();
  await trigger.press('Enter');
  await expect(menu).toHaveAttribute('open', '');
  await expect(menu.getByRole('link', { name: 'Voir tout le matériel', exact: true })).toHaveAttribute('href', '/location');
  await expect(menu.getByRole('link', { name: 'Mini-pelle', exact: true })).toHaveAttribute('href', '/location/mini-pelle');
  await trigger.press('Escape');
  await expect(menu).not.toHaveAttribute('open', '');
  await expect(trigger).toBeFocused();
  await page.goto('/location/mini-pelle');
  await expect(menu).toHaveClass(/is-active/);
  await trigger.click();
  await expect(menu.getByRole('link', { name: 'Mini-pelle', exact: true })).toHaveAttribute('aria-current', 'page');
});
test('signature de mouvement, reveal au scroll et aperçu matériel restent fluides', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass(/motion-ready/);

  const focus = page.locator('.mini-focus .focus-copy');
  await expect(focus).not.toHaveClass(/is-revealed/);
  await focus.scrollIntoViewIfNeeded();
  await expect(focus).toHaveClass(/is-revealed/);
  await expect.poll(async () => focus.evaluate((element) => getComputedStyle(element).clipPath)).toContain('100% 100%');

  const button = page.getByRole('link', { name: 'Voir le matériel' });
  const shutterBefore = await button.evaluate((element) => getComputedStyle(element, '::before').transform);
  await button.hover();
  await expect.poll(async () => button.evaluate((element) => getComputedStyle(element, '::before').transform)).not.toBe(shutterBefore);

  await page.locator('[data-index-item="camion-benne"]').hover();
  await expect(page.locator('[data-index-preview="camion-benne"]')).toBeVisible();
  await expect(page.locator('[data-index-item="camion-benne"]')).toHaveClass(/is-active/);
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
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:4322/');
  const materialMenu = page.locator('[data-nav-dropdown]');
  await materialMenu.locator('summary').click();
  await expect(materialMenu).toHaveAttribute('open', '');
  await expect(materialMenu.getByRole('link', { name: 'Mini-pelle', exact: true })).toHaveAttribute('href', '/location/mini-pelle');
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
