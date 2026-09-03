# Instructions du projet

## Sources de vérité

Avant toute modification, lire les documents utiles de `docs/` :

- produit : `01-PRODUCT.md` ;
- audience : `02-AUDIENCE.md` ;
- périmètre : `03-SCOPE.md` ;
- expérience : `04-UX.md` ;
- contenu : `05-CONTENT.md` ;
- marque et design : `06-BRAND.md`, `07-DESIGN-SYSTEM.md` ;
- technique, données et qualité : `08-TECHNICAL.md`, `09-DATA.md`, `10-QUALITY.md` ;
- décisions et ordre d'exécution : `11-DECISIONS.md`, `12-ROADMAP.md`.

Les modes d'emploi et les exemples de structure restent dans `docs/Forme recommandée/`. Utiliser le fichier correspondant pour remplir un document, sans dupliquer ses explications dans les documents de projet.

## Décisions et contenu

- `LOCKED` : ne pas modifier sans demande explicite.
- `PREFERRED` : peut être remis en question en expliquant l'incidence.
- `OPEN` : peut être proposé et décidé lorsque nécessaire.
- `UNKNOWN` : information manquante ; ne pas la présenter comme un fait.
- Ne jamais inventer de services, clients, témoignages, chiffres, prix ou capacités métier.
- Conserver les changements dans le périmètre de la demande et éviter les dépendances sans besoin concret.

## Design et mouvement

La demande explicite de l'utilisateur et les contraintes du projet priment toujours. `frontend-design` fixe l'intention et la singularité visuelle ; `ui-ux-pro-max` fournit des recommandations et des garde-fous UX/accessibilité à vérifier, jamais une direction automatique.

`motion-design` n'ajoute du mouvement que s'il clarifie l'interface ou renforce cette intention, avec sobriété, performance et `prefers-reduced-motion`. Utiliser `gsap-web` seulement lorsqu'une animation complexe le justifie et que CSS ou l'outil natif du framework ne suffit pas.

Les skills de design sont dans `.agents/skills/`. Le workflow Git est dans `.agent/skills/git-worktree-safe-workflow/` ; l'appliquer avant toute modification d'un dépôt Git existant.

## Validation

Avant de considérer une implémentation terminée, exécuter les contrôles définis dans `docs/10-QUALITY.md` et dans le projet : lint, vérification de types, tests pertinents et build de production lorsque ces commandes existent. Vérifier aussi le responsive, le clavier, le HTML sémantique et les problèmes d'accessibilité évidents.
