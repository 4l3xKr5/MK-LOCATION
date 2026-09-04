# Ordre idéal de préparation

Le cadrage avance dans l'ordre ci-dessous. Chaque porte produit un résultat `VALIDÉE` ou `BLOQUÉE`, accompagné des sources vérifiées, des inconnues et de la prochaine action.

Un `UNKNOWN` est **bloquant** lorsqu'il empêche de définir le résultat attendu, le périmètre, le parcours principal, la faisabilité, la sécurité ou les critères d'acceptation. Il bloque alors la porte. Un `UNKNOWN` non bloquant reste documenté avec un responsable et une prochaine action ; il n'est jamais remplacé par une invention.

## Porte 1 — Cadrage

Préparation :

1. Rassembler les sources réelles dans `references/`.
2. Définir le produit dans `01-PRODUCT.md`.
3. Définir l'audience dans `02-AUDIENCE.md`.
4. Verrouiller le périmètre et les marges de décision dans `03-SCOPE.md`.

Critères de passage :

- le produit, son problème et son objectif sont compréhensibles ;
- l'audience et son contexte d'utilisation sont établis ;
- l'action principale ou CTA est défini ;
- l'obligatoire, le souhaitable et le hors périmètre sont séparés ;
- chaque fait métier a une source et aucun `UNKNOWN` bloquant ne subsiste.

Règle de blocage : ne pas concevoir de pages ni choisir de technologie si un critère manque.

## Porte 2 — Expérience

Préparation :

5. Décrire le parcours principal, l'arborescence et les vues essentielles dans `04-UX.md`.
6. Inventorier le contenu réel, provisoire et manquant dans `05-CONTENT.md`.
7. Définir la marque puis le système de design dans `06-BRAND.md` et `07-DESIGN-SYSTEM.md`.

Critères de passage :

- le parcours principal relie un point d'entrée à un résultat observable ;
- chaque page ou vue répond à un besoin et possède une action prioritaire ;
- le contenu validé, provisoire, manquant et rédigeable est distingué ;
- la marque, le ton et les interdits visuels sont cohérents avec le sujet ;
- les besoins responsive, clavier et accessibilité sont identifiés.

Règle de blocage : ne pas figer la direction technique si le parcours ou les contenus indispensables restent indéterminés.

## Porte 3 — Faisabilité

Préparation :

8. Choisir l'architecture technique dans `08-TECHNICAL.md` à partir des besoins établis.
9. Décrire les données, leur origine et leur sensibilité dans `09-DATA.md`, ou justifier `N/A`.
10. Fixer les contrôles, critères d'acceptation et preuves attendues dans `10-QUALITY.md`.

Critères de passage :

- chaque choix technique important possède un statut et une justification ;
- les services externes, secrets, données sensibles et contraintes d'exploitation sont connus ;
- les exigences fonctionnelles, responsive, accessibilité, performance, SEO, confidentialité et compatibilité sont mesurables ;
- les commandes attendues pour installer, contrôler, tester et construire le projet sont définies ou explicitement `UNKNOWN` jusqu'au scaffold.

Règle de blocage : ne pas commencer l'implémentation si une dépendance, un risque de sécurité ou un critère d'acceptation essentiel n'a pas de traitement défini.

## Porte 4 — Autorisation de coder

Préparation :

11. Enregistrer les décisions durables dans `11-DECISIONS.md`.
12. Organiser les dépendances de réalisation et la première vertical slice dans `12-ROADMAP.md`.
13. Exécuter la revue en lecture seule de `premier prompt.md`.

Critères de passage :

- les contradictions sont résolues ou explicitement acceptées ;
- les risques importants ont une mesure de réduction ;
- les décisions structurantes et leurs raisons sont consignées ;
- la première vertical slice est assez petite pour être validée indépendamment et possède des critères d'acceptation ;
- l'utilisateur donne explicitement son autorisation de commencer le code.

Règle de blocage : sans validation explicite de l'utilisateur, ne modifier aucun fichier applicatif et n'installer aucune dépendance.
