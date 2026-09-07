# MK Location — Décisions

## D001 — Périmètre V1
Date : 2026-09-07. Acceptée / LOCKED. Catalogue et demandes traitées manuellement, avec e-mail, WhatsApp et téléphone. Le choix utilisateur exclut réservation/paiement/admin. À reconsidérer uniquement sur demande d’évolution métier.

## D002 — Direction artistique
Date : 2026-09-07. Acceptée / LOCKED. Conserver et affiner MK / DEPLOYED. L’arborescence approuvée prévaut sur les anciens libellés Prestige/Zone/Contact du chapitre DA : navigation finale Matériel, Comment ça marche, Livraison, Chauffeur, Demander. Les contrastes et tailles s’adaptent à l’accessibilité.

## D003 — Socle statique
Date : 2026-09-07. Acceptée / LOCKED par demande d’implémentation du plan. Astro/TypeScript/CSS et Netlify Forms. Le petit parc et la confirmation manuelle ne justifient pas un backend métier, des comptes ou un CMS. Conséquence : dépendance Netlify pour la réception, notification à configurer et à vérifier réellement avant publication.

## D004 — Préversion sûre
Date : 2026-09-07. Acceptée / LOCKED. L’utilisateur a choisi de collecter les contenus plus tard. Préversion locale complète, non indexée, envoi désactivé et cadres visuels provisoires. Coordonnées/photographies/modalités absentes ne sont pas inventées. Les éléments externes manquants bloquent la publication, pas la réalisation locale autorisée.

## D005 — Formulaires
Date : 2026-09-07. Acceptée par le plan. Trois étapes location, formulaire chauffeur séparé, validation et récapitulatif. Aucun calcul de prix ou disponibilité ; tarifs de référence non interprétés comme devis.

## D006 — État Git
Date : 2026-09-07. Implémentation isolée dans codex/mk-location-v1-20260907, worktree ../MK LOCATION-worktrees/v1-20260907, base locale 03aa643. Aucun remote disponible. main reste intact ; publication Git et intégration non demandées.

## D007 — Autorisation de coder
Date : 2026-09-07. Acceptée. La demande utilisateur « PLEASE IMPLEMENT THIS PLAN » donne l’autorisation explicite de réaliser le plan et de coder la préversion après le cadrage. Elle ne résout pas les informations métier absentes ni ne prétend valider un envoi réel.

## D008 — Diagnostic GitHub / Vercel
Date : 2026-09-07. L’utilisateur signale avoir publié sur GitHub et Vercel, avec une 404. Vérification distante : origin pointe désormais vers https://github.com/4l3xKr5/MK-LOCATION.git ; seule main est publiée au commit 03aa643, contenant la fondation sans package.json ni pages Astro. Les commits applicatifs d724546 et 5826854 restent locaux sur la branche de tâche. Le code manquant dans la branche déployée explique l’absence de site à servir.

Préparation locale : configuration explicite Vercel pour la préversion statique et documentation des réglages. L’intégration main et le push de correction restent à autoriser ; aucun réglage du compte Vercel n’a été inspecté ni modifié. L’envoi Netlify Forms demeure désactivé sur Vercel. Un changement de service de réception est une décision distincte, à confirmer avant la collecte réelle.
