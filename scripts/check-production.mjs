import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';

export function readiness(env, publication, exists = fs.existsSync) {
  const errors = [];
  let url;
  try { url = new URL(env.PUBLIC_SITE_URL); } catch { /* A missing or malformed URL is reported below. */ }
  if (!url || url.protocol !== 'https:' || /localhost|example\.|127\.0\.0\.1/.test(url.hostname)) errors.push('Domaine HTTPS réel manquant (PUBLIC_SITE_URL).');
  for (const key of ['PUBLIC_PHONE', 'PUBLIC_WHATSAPP']) if (!/^\+[1-9]\d{7,14}$/.test((env[key] || '').replace(/[\s.()-]/g, ''))) errors.push(`${key} : numéro international réel requis.`);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(env.PUBLIC_EMAIL || '') || /example\./.test(env.PUBLIC_EMAIL || '')) errors.push('Adresse e-mail MK réelle requise.');
  if (env.PUBLIC_FORMS_ENABLED !== 'true') errors.push('Netlify Forms et les notifications doivent être configurés et activés.');
  if (!publication.approved || !publication.approvedBy || !publication.approvedOn) errors.push('Validation éditoriale MK manquante.');
  if (!publication.prices.confirmed || !publication.prices.taxLabel || !publication.prices.miniPelleDriverNote) errors.push('Tarifs, base HT/TTC et modalité chauffeur non validés.');
  if (!publication.legal.confirmed || !publication.legal.companyName || !publication.legal.retention) errors.push('Textes légaux, responsable et conservation non validés.');
  for (const slug of ['mini-pelle', 'camion-benne', 'betonniere', 'plateau-remorque-35t', 'utilitaire', 'chauffeur']) {
    const photos = publication.offerPhotos[slug] || [];
    if (!photos.length || photos.some((photo) => !photo.verified || !photo.alt || !/^\/assets\/[\w/.-]+\.(webp|avif|jpg|jpeg|png)$/i.test(photo.src) || photo.src.includes('..') || !exists(path.join('public', photo.src)))) errors.push(`Photo réelle approuvée manquante : ${slug}.`);
  }
  return errors;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const env = { ...loadEnv('production', process.cwd(), 'PUBLIC_'), ...process.env };
  if (env.PUBLIC_SITE_MODE === 'production' || process.argv.includes('--strict')) {
    const publication = JSON.parse(fs.readFileSync('src/data/publication.json', 'utf8'));
    const errors = readiness(env, publication);
    for (const name of ['mentions-legales', 'confidentialite', 'conditions-location']) {
      const file = `src/content/legal/${name}.md`;
      if (!fs.existsSync(file) || /CONTENU_A_VALIDER/.test(fs.readFileSync(file, 'utf8'))) errors.push(`Document définitif manquant : ${name}.`);
    }
    if (errors.length) { process.stderr.write(`Publication bloquée :\n- ${errors.join('\n- ')}\n`); process.exitCode = 1; }
    else process.stdout.write('Prérequis éditoriaux et techniques présents. La recette Netlify/e-mail doit aussi être prouvée.\n');
  } else process.stdout.write('Build de préversion : non indexé ; vérifier la configuration avant ouverture publique.\n');
}
