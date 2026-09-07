import { expect, it } from 'vitest';
import { readiness } from '../../scripts/check-production.mjs';
import publication from '../../src/data/publication.json';
it('bloque une publication accidentelle de la préversion', () => {
  const errors = readiness({}, publication, () => false);
  expect(errors.length).toBeGreaterThanOrEqual(10);
  expect(errors.some((message: string) => message.includes('Photo réelle'))).toBe(true);
});
it('exige une photo réelle pour chaque offre et une validation métier', () => {
  const env = { PUBLIC_SITE_URL: 'https://mk.test', PUBLIC_PHONE: '+33600000000', PUBLIC_WHATSAPP: '+33600000000', PUBLIC_EMAIL: 'contact@mk.test', PUBLIC_FORMS_ENABLED: 'true' };
  const approved = { ...publication, approved: true, approvedBy: 'Fixture MK', approvedOn: '2026-09-07', prices: { confirmed: true, taxLabel: 'TTC', miniPelleDriverNote: 'Test de validation' }, legal: { confirmed: true, companyName: 'Fixture', retention: 'Politique de test' }, offerPhotos: Object.fromEntries(Object.keys(publication.offerPhotos).map((key) => [key, [{ src: `/assets/${key}.webp`, alt: 'Photo de test', verified: true }]])) };
  expect(readiness(env, approved, () => true)).toEqual([]);
  approved.offerPhotos['mini-pelle'][0].verified = false;
  expect(readiness(env, approved, () => true)).toContain('Photo réelle approuvée manquante : mini-pelle.');
});
