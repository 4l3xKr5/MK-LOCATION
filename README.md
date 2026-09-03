# Template — fondation de site web

Ce dépôt sert à cadrer un site avant son implémentation. Il sépare les faits métier, les décisions, le design, la technique et la qualité afin que chaque intervention puisse s'appuyer sur une source claire.

## Démarrage d'un nouveau site

1. Lister les éléments réellement disponibles dans `references/` : identité visuelle, contenu et captures d'écran.
2. Renseigner `docs/01-PRODUCT.md`, `02-AUDIENCE.md` et `03-SCOPE.md` avant de définir les pages ou la stack.
3. Définir le parcours dans `04-UX.md`, puis le contenu, la marque et le système de design dans les documents suivants.
4. Documenter la stack, les intégrations et le déploiement dans `08-TECHNICAL.md`. Ajouter les données et les exigences de qualité si elles sont nécessaires.
5. Noter les choix durables dans `11-DECISIONS.md` et les dépendances de réalisation dans `12-ROADMAP.md`.
6. Avant de développer, donner à l'agent le contenu de [premier prompt.txt](<docs/Forme recommandée/premier prompt.txt>) afin d'obtenir un cadrage en lecture seule.

## Mode d'emploi des documents

Les documents de travail sont les fichiers numérotés dans `docs/`. Leurs modèles, les exemples et l'ordre de préparation se trouvent volontairement dans [`docs/Forme recommandée`](<docs/Forme recommandée>). Consulter le fichier qui porte le même numéro avant de remplir un document. Cette bibliothèque explique aussi les statuts `LOCKED`, `PREFERRED`, `OPEN` et `UNKNOWN`.

Le contenu renseigné dans `docs/` devient la source de vérité du site. Les modèles restent des guides et ne remplacent jamais les faits fournis pour le projet.

## Ressources du template

- `references/visual`, `references/content`, `references/screenshots` : ressources de départ validées.
- `public/assets` : assets qui seront servis par le site.
- `samples/data` : données d'exemple non sensibles.
- `.agents/skills` : skills locaux pour la direction visuelle, l'UX et le mouvement.
- `.agent/skills/git-worktree-safe-workflow` : méthode de travail Git à suivre dès qu'un dépôt est initialisé et qu'une modification de code est prévue.

## Versionnement

Le template contient un `.gitignore` pour les dépendances, sorties de build, secrets locaux, caches Python et fichiers propres au poste. Avant le premier commit, vérifier que les documents de cadrage ne contiennent pas de secret ou de donnée privée inutile.
