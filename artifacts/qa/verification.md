# MK Location — Recette de la préversion V1

Date : 7 septembre 2026. Résultat : préversion locale livrable ; publication et intégration réelle des demandes en attente des informations et accès MK.

## Révision et environnement

- Code applicatif vérifié : `d724546c55af55956825f95a9d40fb13fcbab30f`.
- Branche : `codex/mk-location-v1-20260907`, base locale `03aa643`.
- Worktree : `C:/Users/karas/Desktop/MK LOCATION-worktrees/v1-20260907`.
- Windows, Node 24, npm, Astro 7.3.1, Playwright 1.63.0 / Chromium et Lighthouse 13.4.1.
- Préversion : http://127.0.0.1:4321 ; build audité sur http://127.0.0.1:4324.
- Le checkout principal est resté propre sur main. Aucun push, merge, compte externe ni déploiement public réalisé.

Les contrôles ci-dessous portent sur l’arbre applicatif enregistré dans cette révision. La dernière modification après les tests navigateur concerne uniquement l’attente de fin des animations dans le script de capture ; lint a été relancé avec succès. Ce rapport et la mise à jour de statut documentaire sont consignés ensuite dans un commit séparé.

## Résultats exécutés

| Contrôle | Résultat |
|---|---|
| `npm run lint` | Réussi, y compris après la dernière correction du script de capture |
| `npm run check` | Réussi : 0 erreur, 0 avertissement, 0 indication |
| `npm run test` | 9 tests réussis : validation/normalisation des demandes et blocage production |
| `npm run build` | Réussi : 17 pages préconstruites, robots.txt et sitemap.xml |
| `npm run test:e2e` | 20 scénarios réussis en 32,6 s, Chromium |
| `npm run audit:performance` | Réussi sur les deux pages ; objectifs ≥90 et CLS ≤0,1 atteints |
| `npm run check:production` | Échec attendu : les 17 prérequis manquants empêchent la publication |
| `npm audit` | 0 vulnérabilité signalée au moment de la recette |
| `git diff --cached --check -- . ':(exclude)references/content/**'` | Réussi ; les documents fournis conservent leurs espaces Markdown d’origine |

## Couverture navigateur

- Préremplissage des cinq matériels ; option chauffeur uniquement pour la mini-pelle ; retours entre étapes, modification et récapitulatif.
- Date définie ou à préciser, champs invalides, changement de matériel, parcours chauffeur distinct.
- Réponse HTTP 503 puis nouvel essai réussi, interruption réseau, double clic ; saisie conservée et absence de fausse confirmation.
- Envoi désactivé par défaut ; scénarios d’envoi activés uniquement sur un serveur local de test avec requêtes interceptées.
- Navigation au clavier, ouverture du menu, boucle de focus, Échap et restitution du focus ; accès au résumé d’erreurs et réduction des animations.
- 16 routes contrôlées aux largeurs 320, 375, 768, 1024 et 1440 px sans débordement horizontal.
- Analyse axe de sept pages principales à 375 et 1440 px, ainsi que du menu ouvert : aucune violation détectée par ces scénarios.
- Reflow équivalent à un zoom de 200 % vérifié par réduction du viewport CSS à 720 × 500 ; pas de mesure de zoom clavier sur un appareil physique.
- Navigation mobile et formulaire de base sans JavaScript ; robots, sitemap et page 404.
- Liens téléphone et WhatsApp contextuels vérifiés avec des coordonnées synthétiques de test ; aucun message envoyé.
- Barre mobile adaptée à l’offre ; pas de lien qui redémarre le formulaire pendant la saisie.

Les tests automatisés ne constituent pas une certification d’accessibilité. Safari, Firefox, lecteurs d’écran et appareils physiques n’ont pas fait l’objet d’une recette dans cette livraison.

## Lighthouse mobile

Mesures locales sur le build de production en mode préversion, avec le profil mobile Lighthouse. Les résultats sont des mesures de laboratoire, pas des données de visiteurs réels.

| Page | Performance | Accessibilité | Bonnes pratiques | SEO | LCP | CLS |
|---|---:|---:|---:|---:|---:|---:|
| Accueil | 100 | 100 | 100 | 63 | 1 658 ms | 0 |
| Mini-pelle | 100 | 100 | 100 | 63 | 1 656 ms | 0 |

Mesures : 2026-09-07 à 17:59:52 et 17:59:59 UTC. Le contrôle SEO `is-crawlable` échoue à cause de la balise noindex et du robots.txt de préversion : ces protections sont intentionnelles et restent actives. Le SEO de production doit être réévalué sur le domaine réel.

Rapports locaux générés dans ce dossier : `performance-summary.json`, `lighthouse-accueil.html`, `lighthouse-accueil.json`, `lighthouse-mini-pelle.html` et `lighthouse-mini-pelle.json`. Ces sorties sont ignorées par Git et régénérables avec la commande d’audit.

## Vérification visuelle et sources

Captures ordinateur 1440 × 1000 et mobile 375 × 812 pour l’accueil, la mini-pelle, la demande et la page chauffeur, en pleine page et au premier écran. Le script attend les polices et la fin des animations avant capture. Vérification visuelle des cadrages, titres, formulaires, contrastes évidents et actions fixes ; les illustrations portent une mention provisoire.

Les trois fichiers sous references/content ont été copiés depuis les documents fournis, sans réécriture. Les comparaisons SHA-256 des fichiers locaux et des originaux ont confirmé leur égalité :

| Source | SHA-256 |
|---|---|
| Concept_entreprise_MK_Location.md | `D715D7D6DF9D2C985DF1A52AA22E9FA86F81138D7BBF3694011E9733D0BCF820` |
| MK-Location_Dossier-Complet.md | `14547EC9395D2E19186AA4D5FEA70D3D6EBB642CB2DB34F554FC82F22010624A` |
| Arborescence_MK_Location.md | `BE21E2C982A1CDB97766DB1D27B4668C1AA94557CFF686C9C2E8DD49F1B21215` |

## Conditions encore nécessaires à la publication

L’envoi réel et la réception d’un e-mail ne sont pas vérifiés. Les réponses HTTP interceptées dans Playwright prouvent le comportement de l’interface, pas le service Netlify. La préversion livrée conserve `PUBLIC_FORMS_ENABLED=false`.

MK doit fournir et valider :

1. Domaine, compte d’hébergement, téléphone, WhatsApp, e-mail public et destinataire des notifications.
2. Photos réelles des cinq équipements et de la Porsche, caractéristiques, sens de « 3,5 t » et caution du plateau.
3. Tarifs et base HT/TTC, modalités chauffeur mini-pelle, livraison, longue durée et prestation Porsche.
4. Identité juridique, textes légaux et conditions de location, accès et conservation/suppression des demandes.

Il faudra ensuite détecter les deux formulaires sur Netlify, configurer les notifications et prouver pour chacun l’enregistrement réel puis la réception dans la boîte MK. Suivre [le guide de mise en service](../../docs/DEPLOYMENT.md), compléter la recette réelle et relancer le contrôle production avant ouverture.

## Complément — préparation Vercel, 7 septembre 2026 à 20:27

Après le signalement utilisateur, git fetch et git ls-remote confirment que GitHub contient uniquement main au commit 03aa643, sans package.json ni src/pages. Le site complet est encore local. Ajout de vercel.json pour expliciter le preset Astro, npm ci, npm run build, dist et les en-têtes HTTP ; aucune modification des pages ni des formulaires.

Contrôles relancés : lint réussi, check sans erreur/avertissement/indication, 9 tests unitaires réussis, build de 17 pages réussi. JSON lu sans erreur ; dist/index.html et dist/location/mini-pelle/index.html présents. Les tests navigateur et Lighthouse ci-dessus restent ceux de la recette applicative initiale, sans nouveau lancement pour ce changement de configuration.

La validation du build dans le compte Vercel et des routes publiques reste en attente de publication du code. Aucun push ni intégration main effectué ; la configuration du compte n’a pas été inspectée. Les formulaires doivent rester désactivés sur cet hébergement.
