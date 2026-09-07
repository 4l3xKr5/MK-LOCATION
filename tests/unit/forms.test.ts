import { describe, expect, it } from 'vitest';
import { localToday, normalize, realDate, validate } from '../../src/lib/form-rules';
const rental = { materiel: 'mini-pelle', operateur: 'sans', date: '2026-09-20', duree: '1-jour', commune: 'Commune de test', nom: 'Client Test', telephone: '0600000000' };
describe('Règles des demandes', () => {
  it('accepte une demande complète sans e-mail facultatif', () => { expect(validate(rental, 'location', undefined, '2026-09-07')).toEqual({}); });
  it('exige le chauffeur uniquement pour la mini-pelle', () => { expect(validate({ ...rental, operateur: '' }, 'location', 0)).toHaveProperty('operateur'); expect(validate({ ...rental, materiel: 'betonniere', operateur: '' }, 'location', 0)).toEqual({}); });
  it('efface les valeurs devenues inapplicables avant transport', () => { expect(normalize({ ...rental, materiel: 'utilitaire', 'date-flexible': 'oui' }, 'location')).toMatchObject({ operateur: '', date: '' }); });
  it('refuse passé et dates impossibles, accepte date à définir', () => { expect(realDate('2026-02-30')).toBe(false); expect(realDate('2028-02-29')).toBe(true); expect(validate({ ...rental, date: '2026-01-01' }, 'location', 1, '2026-09-07')).toHaveProperty('date'); expect(validate({ ...rental, date: '', 'date-flexible': 'oui' }, 'location', 1)).toEqual({}); });
  it('calcule la date locale', () => { expect(localToday(new Date(2026, 8, 7, 0, 1))).toBe('2026-09-07'); });
  it('refuse matériels, contacts et e-mails invalides', () => { const errors = validate({ ...rental, materiel: '<script>', nom: '', telephone: 'abc', email: 'bad' }, 'location', undefined, '2026-09-07'); expect(errors).toHaveProperty('materiel'); expect(errors).toHaveProperty('nom'); expect(errors).toHaveProperty('telephone'); expect(errors).toHaveProperty('email'); });
  it('sépare le besoin chauffeur du matériel et admet une destination à préciser', () => { const values = { date: '', 'date-flexible': 'oui', 'trajet-flexible': 'oui', depart: 'Lieu test', nom: 'Client Test', telephone: '+33600000000' }; expect(validate(values, 'chauffeur')).toEqual({}); expect(validate({ ...values, 'trajet-flexible': '' }, 'chauffeur')).toHaveProperty('destination'); });
});
