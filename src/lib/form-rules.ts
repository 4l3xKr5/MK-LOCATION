import { getEquipment } from '../data/catalog';
export type Values = Record<string, string>;
export type FormKind = 'location' | 'chauffeur';
export type Errors = Record<string, string>;
export const localToday = (now = new Date()) => `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
export function realDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}
export function validate(values: Values, kind: FormKind, step?: number, today = localToday()): Errors {
  const errors: Errors = {};
  const text = (key: string) => values[key]?.trim() || '';
  const at = (n: number) => step === undefined || step === n;
  if (kind === 'location' && at(0)) {
    if (!getEquipment(text('materiel')) && text('materiel') !== 'autre') errors.materiel = 'Choisissez un matériel ou « Autre demande ».';
    if (text('materiel') === 'mini-pelle' && !['avec', 'sans'].includes(text('operateur'))) errors.operateur = 'Précisez avec ou sans chauffeur.';
  }
  if ((kind === 'location' && at(1)) || kind === 'chauffeur') {
    if (text('date-flexible') !== 'oui' && (!realDate(text('date')) || text('date') < today)) errors.date = 'Indiquez une date à partir d’aujourd’hui, ou choisissez « À définir ».';
    if (kind === 'location') {
      if (!['1-jour', 'plusieurs-jours', 'longue-duree', 'a-definir'].includes(text('duree'))) errors.duree = 'Choisissez une durée, même si elle reste à définir.';
      if (text('commune').length < 2) errors.commune = 'Indiquez la commune de mise à disposition.';
    } else {
      if (text('horaire') && !/^([01]\d|2[0-3]):[0-5]\d$/.test(text('horaire'))) errors.horaire = 'Indiquez un horaire valide.';
      if (text('depart').length < 2) errors.depart = 'Indiquez votre lieu de départ.';
      if (text('destination').length < 2 && text('trajet-flexible') !== 'oui') errors.destination = 'Indiquez une destination ou choisissez « Besoin à préciser ».';
    }
  }
  if ((kind === 'location' && at(2)) || kind === 'chauffeur') {
    if (text('nom').length < 2) errors.nom = 'Indiquez votre nom.';
    const number = text('telephone').replace(/[\s.()-]/g, '');
    if (!/^\+?\d{8,15}$/.test(number)) errors.telephone = 'Indiquez un numéro de téléphone valide.';
    if (text('email') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text('email'))) errors.email = 'Vérifiez votre adresse e-mail.';
  }
  const limits: Record<string, number> = { nom: 100, telephone: 30, email: 254, commune: 150, depart: 200, destination: 200, societe: 150, message: 2000, livraison: 1000 };
  for (const [key, limit] of Object.entries(limits)) if (text(key).length > limit) errors[key] = `Limitez ce champ à ${limit} caractères.`;
  return errors;
}
export function normalize(values: Values, kind: FormKind): Values {
  const result = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, value.trim()]));
  if (kind === 'location' && result.materiel !== 'mini-pelle') result.operateur = '';
  if (result['date-flexible'] === 'oui') result.date = '';
  if (result['trajet-flexible'] === 'oui') result.destination = '';
  return result;
}
export const durationLabels: Record<string, string> = { '1-jour': '1 jour', 'plusieurs-jours': 'Plusieurs jours', 'longue-duree': 'Longue durée', 'a-definir': 'À définir' };
