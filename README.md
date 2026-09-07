# MK Location

Préversion du site français MK Location : cinq équipements, pages pratiques, Porsche avec chauffeur et demandes de location. Astro statique, TypeScript strict, CSS personnalisé. Direction MK / DEPLOYED et périmètre approuvés le 7 septembre 2026.

## Démarrer

Node.js 24 LTS et npm. Depuis ce worktree :

```powershell
npm ci
npm run dev
```

Ouvrir http://127.0.0.1:4321. Astro 7 peut démarrer en arrière-plan dans un environnement agent : `npx astro dev status`, `npx astro dev logs` et `npx astro dev stop` permettent de le gérer. Le serveur reste lié à l’interface locale.

Branche : `codex/mk-location-v1-20260907`. Worktree : `C:/Users/karas/Desktop/MK LOCATION-worktrees/v1-20260907`. Base locale : `03aa643`. Le checkout principal MK LOCATION est préservé ; aucun remote, push, merge ou déploiement public n’est réalisé par cette livraison.

## Fonctionnement

- 17 pages : accueil, catalogue, cinq fiches, fonctionnement, livraison, chauffeur, demande, confirmation, informations de préversion, trois cadres légaux et 404.
- Demande à trois étapes, préremplissage depuis chaque fiche, option chauffeur mini-pelle conditionnelle, validation, retours et récapitulatif.
- Formulaire chauffeur distinct, date/destination à définir, tarif sur demande.
- Intégration HTML Netlify Forms, POST encodé, erreur récupérable, confirmation après réponse positive uniquement.
- Navigation mobile/clavier, contacts configurables, reduced-motion, formulaires et navigation accessibles sans JavaScript.
- Polices locales et licences, métadonnées, image de partage, robots et sitemap dépendant du mode.
- Contrôle de publication empêchant l’ouverture avec des contenus non validés.

## Préversion et limites

Par défaut : noindex et envoi désactivé. Les formulaires peuvent être remplis sans transmission ni faux message de réussite. Les demandes réellement reçues sur Netlify et les notifications e-mail restent à vérifier une fois le compte et l’adresse MK configurés.

Les illustrations SVG sont des emplacements provisoires. Les prix sont les références des documents ; la base HT/TTC, le chauffeur mini-pelle et plusieurs modalités restent à confirmer. Les coordonnées manquantes ne produisent pas de faux liens. Les textes légaux ne sont pas définitifs.

Les tests E2E interceptent le réseau dans les scénarios d’envoi : ils ne prouvent pas la réception d’un e-mail réel. Le score SEO de la préversion est volontairement limité par le noindex et robots.txt. Ne pas retirer ces protections pour améliorer un score avant validation publique.

## Organisation

- `docs/01-PRODUCT.md` à `docs/12-ROADMAP.md` : cadrage, portes, décisions et qualité.
- `references/content/` : trois documents MK d’origine, inchangés.
- `src/data/catalog.ts` : offres, prix, cautions, caractéristiques et provenance.
- `src/data/publication.json` : validation métier, fiscalité des tarifs et photos réelles.
- `src/config/site.ts` et `.env.example` : coordonnées et modes.
- `src/components/RequestForm.astro`, `src/scripts/forms.ts`, `src/lib/form-rules.ts` : formulaires.
- `src/content/legal/` : Markdown à remplacer par les textes validés.
- `artifacts/qa/verification.md` : résultats et limites ; captures et rapports générés dans le même dossier, ignorés par Git.

## Vérifier

```powershell
npm run lint
npm run check
npm run test
npm run build
npx playwright install chromium
npm run test:e2e
npm run audit:performance
```

Les E2E démarrent deux serveurs locaux sur 4322/4323 : transport activé avec coordonnées synthétiques, puis préversion désactivée. Ils ne configurent pas MK et n’envoient aucun message externe. Lighthouse audite le build statique sur 4324, avec Chromium et le port de diagnostic 9222 ; le script ferme ses processus.

Captures, avec le serveur 4321 actif : `node scripts/capture-qa.mjs`. Réexport de l’image de partage : `node scripts/render-social.mjs`.

## Mise en service

Suivre [le guide de mise en service](docs/DEPLOYMENT.md). `npm run check:production` doit échouer tant que les informations réelles manquent. Ne pas positionner les indicateurs d’approbation pour contourner ce contrôle. Les mises à jour d’offres passent par le catalogue et un nouveau build.
