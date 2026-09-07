import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function fillRequest(page: Page, slug = 'mini-pelle') {
  await page.goto(`/demande-location?materiel=${slug}`);
  await expect(page.getByLabel('Le matériel')).toHaveValue(slug);
  if (slug === 'mini-pelle') await page.getByLabel('Mini-pelle : avec ou sans chauffeur').selectOption('sans');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.getByLabel('Date à définir').check();
  await page.getByLabel('Durée envisagée').selectOption('plusieurs-jours');
  await page.getByLabel('Commune de mise à disposition').fill('Commune de test');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.getByLabel('Votre nom').fill('Client Test');
  await page.getByLabel('Téléphone', { exact: false }).fill('0600000000');
  await page.getByLabel('E-mail facultatif').fill('client@example.test');
}
test('préremplissage des cinq offres et option chauffeur conditionnelle', async ({ page }) => {
  for (const slug of ['mini-pelle', 'camion-benne', 'betonniere', 'plateau-remorque-35t', 'utilitaire']) {
    await page.goto(`/demande-location?materiel=${slug}`);
    await expect(page.getByLabel('Le matériel')).toHaveValue(slug);
    await expect(page.getByLabel('Mini-pelle : avec ou sans chauffeur')).toBeVisible({ visible: slug === 'mini-pelle' });
  }
});
test('retours, récapitulatif et erreurs accessibles conservent la saisie', async ({ page }) => {
  await fillRequest(page);
  await expect(page.locator('[data-recap]')).toContainText('Mini-pelle');
  await page.getByRole('button', { name: 'Retour', exact: false }).click();
  await expect(page.getByLabel('Commune de mise à disposition')).toHaveValue('Commune de test');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(page.getByLabel('Votre nom')).toHaveValue('Client Test');
  await page.getByLabel('E-mail facultatif').fill('invalide');
  await page.getByRole('button', { name: 'Envoyer ma demande' }).click();
  await expect(page.locator('[data-error-summary]')).toBeFocused();
  await expect(page.getByLabel('E-mail facultatif')).toHaveAttribute('aria-invalid', 'true');
  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(accessibility.violations).toEqual([]);
});
test('transport simulé : échec, nouvelle tentative, une seule requête et confirmation', async ({ page }) => {
  await fillRequest(page, 'utilitaire');
  let requests = 0;
  let body = '';
  await page.route('http://127.0.0.1:4322/', async (route) => {
    if (route.request().method() !== 'POST') { await route.continue(); return; }
    requests++; body = route.request().postData() || '';
    if (requests === 1) await route.fulfill({ status: 503, body: 'Test indisponible' });
    else { await new Promise((resolve) => setTimeout(resolve, 250)); await route.fulfill({ status: 200, body: 'Test accepté' }); }
  });
  await page.getByRole('button', { name: 'Envoyer ma demande' }).click();
  await expect(page.getByRole('status')).toContainText('n’a pas pu être confirmé');
  await expect(page.getByLabel('Votre nom')).toHaveValue('Client Test');
  await page.getByRole('button', { name: 'Envoyer ma demande' }).click();
  await expect(page.getByRole('button', { name: 'Envoyer ma demande' })).toBeDisabled();
  await page.waitForURL('**/demande-envoyee');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('DEMANDE TRANSMISE.');
  expect(requests).toBe(2);
  expect(new URLSearchParams(body).get('materiel')).toBe('utilitaire');
  expect(new URLSearchParams(body).get('operateur')).toBe('');
  expect(new URLSearchParams(body).get('form-name')).toBe('location');
});
test('préversion locale : aucun envoi activé par défaut', async ({ page }) => {
  await page.goto('http://127.0.0.1:4323/demande-location?materiel=utilitaire');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.getByLabel('Date à définir').check();
  await page.getByLabel('Durée envisagée').selectOption('a-definir');
  await page.getByLabel('Commune de mise à disposition').fill('Commune de test');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(page.getByRole('button', { name: 'Envoyer ma demande' })).toBeDisabled();
  await expect(page.locator('meta[name=robots]')).toHaveAttribute('content', 'noindex, nofollow');
});
test('chauffeur : formulaire distinct, trajet à préciser, succès simulé', async ({ page }) => {
  await page.goto('/chauffeur#demande');
  await page.getByLabel('Date à définir').check();
  await page.getByLabel('Lieu de départ').fill('Lieu de test');
  await page.getByLabel('Besoin à préciser avec MK').check();
  await page.getByLabel('Votre nom').fill('Client Test');
  await page.getByLabel('Téléphone', { exact: false }).fill('0600000000');
  let body = '';
  await page.route('http://127.0.0.1:4322/', async (route) => { body = route.request().postData() || ''; await route.fulfill({ status: 200, body: 'Test accepté' }); });
  await page.getByRole('button', { name: 'Demander une prestation', exact: true }).click();
  await page.waitForURL('**/demande-envoyee');
  expect(new URLSearchParams(body).get('form-name')).toBe('chauffeur');
  expect(new URLSearchParams(body).has('operateur')).toBe(false);
});
test('changement de matériel et date invalide', async ({ page }) => {
  await page.goto('/demande-location?materiel=mini-pelle');
  await page.getByLabel('Mini-pelle : avec ou sans chauffeur').selectOption('avec');
  await page.getByLabel('Le matériel').selectOption('utilitaire');
  await expect(page.getByLabel('Mini-pelle : avec ou sans chauffeur')).not.toBeVisible();
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.getByLabel('Date souhaitée').fill('2020-01-01');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(page.getByLabel('Date souhaitée')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('[data-error-summary]')).toBeFocused();
});
test('panne réseau simulée : réponses conservées et nouvelle tentative possible', async ({ page }) => {
  await fillRequest(page);
  await page.route('http://127.0.0.1:4322/', (route) => route.abort('failed'));
  await page.getByRole('button', { name: 'Envoyer ma demande' }).click();
  await expect(page.getByRole('status')).toContainText('réponses sont conservées');
  await expect(page.getByRole('button', { name: 'Envoyer ma demande' })).toBeEnabled();
  await expect(page.getByLabel('Votre nom')).toHaveValue('Client Test');
});
