# MK Location — Décisions

## D001 — Périmètre V1
Date : 2026-09-07. Acceptée / LOCKED. Catalogue et demandes traitées manuellement, avec e-mail, WhatsApp et téléphone. Le choix utilisateur exclut réservation/paiement/admin. À reconsidérer uniquement sur demande d’évolution métier.

## D002 — Direction artistique
Date : 2026-09-07, mise à jour explicite le 2026-09-08. Acceptée / LOCKED. Conserver et affiner MK / DEPLOYED. L’arborescence approuvée prévaut sur les anciens libellés Prestige/Zone/Contact du chapitre DA : navigation finale Accueil, Matériel, Comment ça marche, Livraison, Chauffeur, Demander. Les contrastes et tailles s’adaptent à l’accessibilité.

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

## D009 — Autorisation d’intégration et de publication
Date : 2026-09-07. L’utilisateur répond « oui » à la demande d’intégrer le site dans main et de pousser sur GitHub pour relancer Vercel. Autorisation reçue pour publier la branche de tâche, conserver un tag de sauvegarde, intégrer main et publier cette intégration. Le déploiement porte sur la préversion non indexée avec envoi désactivé ; il ne valide pas les contenus métier manquants ni une réception de demandes.

## D010 — Signature de mouvement premium
Date : 2026-09-08. Acceptée / PREFERRED à la suite de la demande explicite d’animations CSS modernes, fluides et immersives. Le mouvement prolonge MK / DEPLOYED par des masques à pan coupé, une profondeur graphique sobre, des micro-interactions mécaniques et des transitions d’état continues. Les textes ne dépendent jamais d’une animation ni d’une baisse d’opacité ; les boucles ambiantes, le scroll-jacking, le déplacement du texte par parallaxe et GSAP restent exclus. L’amélioration progressive, la fluidité mobile et `prefers-reduced-motion` priment sur l’effet.

## D011 — Série photographique d’illustration
Date : 2026-09-08. Acceptée à la demande explicite de régénérer et intégrer un visuel individuel pour chaque offre. Six sujets : mini-pelle, camion benne, bétonnière, plateau/remorque, utilitaire et Porsche Panamera. Une même ambiance industrielle minérale, une lumière latérale et des ombres pétrole prolongent MK / DEPLOYED. Le flyer constitue une référence de sujet, sans autorité pour modifier la DA ou inventer des caractéristiques. Cette demande autorise le code nécessaire à l’intégration ; les quatre portes de la préversion restent validées.

Les créations sont locales, identifiées comme illustrations et disponibles seulement en préversion. Les photos vérifiées restent prioritaires ; la garde de publication continue d’exiger des photos réelles. Intégration dans l’accueil, l’index matériel (vignettes visibles également sur mobile), les cinq fiches et la page chauffeur. Les titres et les images occupent des espaces distincts ; les sujets conservent leur cadrage 3:2. La génération utilise l’outil intégré image_gen, sans nouvelle dépendance. Travail isolé dans codex/visuels-materiel-20260908, base origin/main 16de642. Publication Git et intégration main non demandées dans cette tâche.
