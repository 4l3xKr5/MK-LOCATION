# Template — fondation de site web

Ce dépôt sert à cadrer un site avant son implémentation. Il sépare les faits métier, les décisions, le design, la technique et la qualité afin que chaque intervention puisse s'appuyer sur une source claire.

Le dépôt maître reste une fondation réutilisable : **ne construisez jamais un site directement dans ce dossier**. Chaque site doit partir d'une copie indépendante, sans reprendre l'historique Git ni le remote éventuel de la template.

Les 12 documents numérotés restent vierges dans la template. Dans une copie destinée à un projet réel, Codex lit les guides de `docs/Forme recommandée/`, structure les fichiers `.md` correspondants et renseigne uniquement les informations réellement établies.

## Instancier un projet indépendant

### Depuis la copie locale — méthode disponible par défaut

Choisissez une version taguée, exportez-la vers un nouveau dossier, puis initialisez un dépôt Git distinct. Le dossier de destination doit être nouveau ou vide.

Exemple PowerShell à adapter :

```powershell
$TemplateRepo = "C:\chemin\vers\TEMPLATE SITE WEB"
$TemplateVersion = "vX.Y.Z" # Remplacer par le tag validé à utiliser
$ProjectRoot = "C:\chemin\vers\mon-nouveau-site"
$TemplateArchive = "C:\chemin\vers\template-site-web.zip"

git -C $TemplateRepo archive --format=zip --output=$TemplateArchive $TemplateVersion
Expand-Archive -LiteralPath $TemplateArchive -DestinationPath $ProjectRoot
git -C $ProjectRoot init -b main
git -C $ProjectRoot add .
git -C $ProjectRoot commit -m "chore: initialize project from template"
```

Vérifiez ensuite que `git -C $ProjectRoot remote -v` ne pointe pas vers le dépôt maître. Ajoutez uniquement le remote propre au nouveau projet, lorsque celui-ci existe.

### Depuis GitHub — lorsque la template sera publiée

Une fois le dépôt publié et marqué comme *Template repository* sur GitHub, utilisez **Use this template** pour créer un nouveau dépôt. Clonez ce nouveau dépôt : il possède alors sa propre histoire et son propre remote. Ne clonez pas directement la template pour y développer un site.

## Préparer le projet avant le code

1. Rassembler les sources réelles dans `references/` : identité visuelle, contenu, documents et captures d'écran.
2. Renseigner `docs/01-PRODUCT.md`, `02-AUDIENCE.md` et `03-SCOPE.md` avant de définir les pages ou la stack.
3. Définir le parcours dans `04-UX.md`, puis le contenu, la marque et le système de design dans les documents suivants.
4. Documenter la stack, les intégrations et le déploiement dans `08-TECHNICAL.md`. Décrire les données et les exigences de qualité lorsqu'elles s'appliquent.
5. Noter les choix durables dans `11-DECISIONS.md` et les dépendances de réalisation dans `12-ROADMAP.md`.
6. Exécuter le cadrage en lecture seule décrit dans [premier prompt.md](<docs/Forme recommandée/premier prompt.md>).

Le passage au code est contrôlé par les quatre portes détaillées dans [Ordre idéal de préparation.md](<docs/Forme recommandée/Ordre idéal de préparation.md>) :

| Porte | Vérifie | Condition de passage |
|---|---|---|
| 1 — Cadrage | Produit, audience, CTA, périmètre et faits métier | Aucun `UNKNOWN` bloquant |
| 2 — Expérience | Parcours, pages, contenu, marque et direction visuelle | Ensemble cohérent et vérifiable |
| 3 — Faisabilité | Technique, données, sécurité et qualité | Choix justifiés et contrôles définis |
| 4 — Autorisation de coder | Risques, décisions, roadmap et première vertical slice | Validation explicite de l'utilisateur |

Les trois premières portes produisent un résultat documenté. Seule la quatrième exige systématiquement un accord humain explicite. Un `UNKNOWN` non bloquant reste visible avec une prochaine action ; il n'est jamais remplacé par une invention.

## Mode d'emploi des documents

Les documents de travail sont les fichiers numérotés directement dans `docs/`. Leurs structures recommandées, exemples et règles de préparation se trouvent dans [`docs/Forme recommandée`](<docs/Forme recommandée>). Consultez le guide `.md` portant le même numéro avant de remplir un document de projet.

Les statuts communs sont :

- `LOCKED` : décision fixée, non modifiable sans demande explicite ;
- `PREFERRED` : direction souhaitée, contestable avec une justification ;
- `OPEN` : décision que Codex peut proposer lorsque nécessaire ;
- `UNKNOWN` : information manquante, à ne pas présenter comme un fait ;
- `N/A` : élément vérifié comme non applicable, avec une justification.

Le contenu renseigné directement dans `docs/` devient la source de vérité du site. Les guides expliquent la forme attendue, mais ne remplacent jamais les faits fournis pour le projet.

## Ressources de la template

- `references/visual`, `references/content`, `references/screenshots` : ressources de départ validées ;
- `public/assets` : assets qui seront servis par le futur site ;
- `samples/data` : données d'exemple non sensibles ;
- `.agents/skills` : skills locaux pour le workflow Git, la direction visuelle, l'UX et le mouvement.

Avant toute modification, utiliser `git-worktree-safe-workflow`. Les skills de design ne s'appliquent qu'après le cadrage : `frontend-design` donne l'intention visuelle, `ui-ux-pro-max` apporte les garde-fous UX et accessibilité, `motion-design` encadre le mouvement utile, et `gsap-web` reste réservé aux animations complexes.

## Versionnement

La template contient un `.gitignore` pour les dépendances, sorties de build, secrets locaux, caches Python et fichiers propres au poste. Avant le premier commit d'un nouveau projet, vérifiez que les documents de cadrage ne contiennent ni secret ni donnée privée inutile.
