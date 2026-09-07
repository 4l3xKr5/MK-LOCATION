# MK Location — Périmètre

## Obligatoire
- Accueil, catalogue et cinq fiches, fonctionnement, livraison, chauffeur, demande de location, confirmation, 404 et cadres des pages légales.
- Parcours de location à trois étapes et formulaire chauffeur distinct ; formulaires présents dans le HTML statique.
- Contacts téléphone, e-mail et WhatsApp configurables, sans valeur fictive.
- Préversion non indexée par défaut, emplacements photographiques explicitement provisoires et envoi désactivé sans configuration.
- Contrôles fonctionnels, mobile, clavier, SEO et build documentés.

## Souhaitable
Intégration des photos et contenus réels dès réception. Ils ne sont pas disponibles dans le dépôt au démarrage.

## Hors périmètre
Comptes, réservation immédiate, paiement, disponibilité en temps réel, devis calculé, CMS, administration personnalisée, pages locales artificielles et marketing publicitaire.

## Matrice de décisions
| Sujet | Décision | Statut | Autorité |
|---|---|---|---|
| V1 | Catalogue et demandes confirmées manuellement | LOCKED | Réponse utilisateur et plan approuvé |
| Direction | MK / DEPLOYED, conservée et affinée | LOCKED | Réponse utilisateur |
| Contact | E-mail + WhatsApp + téléphone | LOCKED | Réponse utilisateur |
| Stack | Astro statique, TypeScript, CSS, Netlify Forms | LOCKED | Plan explicitement demandé en implémentation |
| Contenus absents | Collecte avant publication ; préversion possible | LOCKED | Réponse utilisateur |
| Tarifs publiables, coordonnées, photos, légal | À fournir et vérifier | UNKNOWN | MK ; voir 05-CONTENT |

La livraison de cette tâche est une préversion locale vérifiée. L’intégration réelle Netlify/e-mail et la publication publique restent conditionnées à des ressources externes absentes ; aucune simulation n’est une preuve d’envoi réel.
