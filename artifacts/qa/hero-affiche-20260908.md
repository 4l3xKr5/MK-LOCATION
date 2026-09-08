# Hero — Affiche industrielle

Validation utilisateur : « direction 2 », le 8 septembre 2026. Réalisation dans `codex/hero-affiche-20260908`. Aperçu local : http://127.0.0.1:4326/.

## Périmètre et sources

Sources : docs 01–12, analyse visuelle de l’aperçu 4325, proposition créative 2 validée dans cette conversation. Base distante 16de642 ; visuels 36beeb1 et copie des quatre ajustements locaux de l’aperçu conservée dans le checkpoint 5c72b30. Le worktree source et main sont préservés.

Hero isolée dans PosterHero.astro et hero-poster.css. Titre noir plein sur deux lignes desktop et trois mobile, point Signal, plan Mineral incliné à 12°, mini-pelle au premier plan, demande principale et accès catalogue. Animations décoratives ponctuelles (550 ms), texte statique, reduced-motion. La navigation, les autres sections et les données métier restent celles de la base copiée.

## Visuel

Source : src/assets/equipment/mini-pelle.png. Variante : src/assets/equipment/mini-pelle-hero.png, produite avec l’outil image_gen intégré, puis copiée dans le worktree. Le premier export de transparence contenait un damier opaque et a été rejeté. La version intégrée utilise un fond blanc composé en multiply sur Bone/Mineral ; aucune transparence alpha n’est prétendue. L’illustration reste limitée à la préversion et les photographies vérifiées restent prioritaires. Optimisation AVIF/WebP, tailles responsives, dimensions intrinsèques et priorité de chargement.

## Résultats du 8 septembre 2026

- Lint réussi.
- Astro check : 46 fichiers, 0 erreur, 0 avertissement, 0 hint.
- Tests unitaires : 9/9.
- Suite E2E : 27/27 (1,7 min).
- Après le dernier ajustement des libellés à 12 px : 7/7 scénarios Hero et débordement repassés (42,3 s).
- Build final réussi : 17 pages.
- Contrôles responsive automatiques : 320, 375, 768, 1024, 1440 px ; test Hero supplémentaire à 720 px pour le reflow. Aucun titre tronqué, recouvrement CTA/image ni débordement détecté.
- Tests clavier, navigation et formulaires existants réussis ; Hero utilisable sans JavaScript et sans animations.
- Analyses axe des parcours à 375/1440 px : aucune violation détectée ; cela ne constitue pas une certification d’accessibilité exhaustive.
- Inspection dans le navigateur intégré : rendu bureau, tablette et mobile ; captures hero-poster-desktop.png, hero-poster-768.png et hero-poster-320.png.

## Performance sur build statique local

| Page | Performance mobile | Accessibilité Lighthouse | LCP | CLS |
|---|---|---|---|---|
| Accueil | 98 | 100 | 2 412 ms | 0 |
| Mini-pelle | 99 | 100 | 2 258 ms | 0 |

Objectifs du projet (performance ≥90, CLS ≤0,1) atteints. Mesures de laboratoire locales, pas des données terrain. Rapports Lighthouse et performance-summary.json enregistrés dans ce dossier (ignorés par Git). Le score SEO de 66 inclut les restrictions intentionnelles de la préversion non indexée ; aucune ouverture publique n’est déclarée.

## Limites

Préversion uniquement, aucun push ni déploiement public. Pas d’envoi réel de formulaire : les scénarios de transport sont simulés et l’aperçu reste désactivé. La garde production des contenus réels n’est pas levée.
