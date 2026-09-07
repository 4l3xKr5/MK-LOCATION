# MK Location — Qualité

## Définition de terminé
Préversion : périmètre fonctionnel et visuel implémenté, documents rédigés, contrôles techniques réussis et limites externes clairement consignées. Publication : contenus et coordonnées réels validés, contrôle production réussi et preuve de réception réelle de la demande. Une réponse HTTP locale ou un mock ne valide pas Netlify ni l’e-mail.

## Matrice QA
| Domaine | Scénarios et preuve |
|---|---|
| Fonctionnel | Cinq préremplissages, retour aux étapes, changement matériel/chauffeur, date à définir, demande chauffeur, récapitulatif |
| Erreurs | Champs requis, e-mail/date invalides, réseau défaillant, statut non-2xx, double clic, saisie conservée, aucun faux succès en préversion |
| Intégration | Sur Netlify configuré : demande dans Forms puis notification reçue ; téléphone et WhatsApp avec vrais numéros |
| Mobile | 320, 375, 768, 1024, 1440 px ; absence de débordement et de recouvrement des actions |
| Clavier | Tab, Maj+Tab, Entrée, Espace, Échap, ouverture/fermeture menu, focus restitué, résumé d’erreurs |
| Accessibilité | Analyse axe, HTML sémantique, labels, contrastes, reduced-motion, zoom 200 % |
| Performance | Lighthouse mobile accueil + mini-pelle, objectif performance ≥90, CLS ≤0,1 ; résultats enregistrés |
| SEO | Titles/descriptions uniques, canoniques sur domaine réel, partage, noindex préversion, sitemap production et 404 |
| Confidentialité | Pas de secret ni données personnelles dans assets/URL/storage/logs ; collecte désactivée par défaut |

## Commandes à implémenter
- npm ci
- npm run lint
- npm run check
- npm run test
- npm run build
- npm run test:e2e
- npm run audit:performance
- npm run check:production

Tests unitaires : règles métier de formulaire et garde de publication. Tests E2E : vrais parcours navigateur, requêtes externes interceptées dans les scénarios de succès/échec. Les preuves de recette et captures sont conservées dans artifacts/qa ; les données générées volumineuses sont ignorées par Git. Voir artifacts/qa/verification.md pour les résultats effectifs à la livraison.
