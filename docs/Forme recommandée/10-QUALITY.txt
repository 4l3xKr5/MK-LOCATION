# Qualité et définition de terminé

La qualité doit combiner des invariants vérifiables et les commandes réellement disponibles dans le projet. Ne marque jamais un contrôle comme réussi sans preuve.

## Invariants

Une tâche est terminée seulement lorsque :

- les critères d'acceptation sont satisfaits ;
- aucun fichier sans rapport n'est modifié ;
- le comportement responsive est vérifié ;
- le parcours clavier fonctionne et le focus reste visible ;
- le HTML sémantique et les libellés accessibles sont préservés ;
- les secrets restent hors du code client et du dépôt ;
- les contrôles techniques applicables passent.

## Matrice QA minimale

Lorsque l'utilisateur demande de préparer le projet, Codex crée dans `10-QUALITY.md` une matrice adaptée comprenant au minimum :

- fonctionnel : parcours principal et critères d'acceptation ;
- mobile et responsive : 320, 375, 768, 1024 et 1440 px ;
- clavier et accessibilité : Tab, Maj+Tab, Entrée, Espace, Échap, focus et absence de piège clavier ;
- performance : audit mobile de la route principale avec mesures enregistrées ;
- SEO : titre, description, canonique, indexation et partage selon le périmètre ;
- confidentialité : secrets, collecte minimale, finalité et consentement lorsque requis ;
- compatibilité : navigateurs et appareils définis dans `08-TECHNICAL.md`.

## Commandes

Après le choix de la stack, renseigner dans `10-QUALITY.md` les commandes exactes pour l'installation, le lint, les types, les tests, le build et les tests E2E. Utiliser `N/A` lorsqu'un contrôle ne s'applique réellement pas ; conserver `UNKNOWN` tant qu'il n'est pas décidé.

## Preuves

Pour chaque validation, enregistrer la date, la révision testée, le contrôle exécuté, le résultat et la preuve ou remarque utile. Un démarrage local ou un code de sortie isolé ne suffit pas à prouver un déploiement.
