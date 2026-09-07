# MK Location — Technique

## Architecture
Astro statique, TypeScript strict, CSS personnalisé, npm et lockfile. Composants Astro partagés et scripts TypeScript limités au menu, index et formulaires. Catalogue et configuration centralisés. Pas d’adaptateur SSR, React, CMS, base applicative ou authentification.

## Hébergement et formulaires
Netlify est la cible du build dist. Deux formulaires HTML statiques nommés location/chauffeur avec attributs Netlify lorsque l’envoi est explicitement activé. POST application/x-www-form-urlencoded incluant form-name et honeypot. Détection et notification e-mail à activer dans le compte Netlify de MK. Nom du champ e-mail : email pour Reply-To. Le filtrage, le stockage et la sanitisation sont gérés par Netlify ; les règles métier sont confirmées manuellement par MK.

## Modes
Préversion par défaut : noindex/nofollow, pas de sitemap public, bannière explicite, photos provisoires, contact absent si non configuré et envoi désactivé. PUBLIC_FORMS_ENABLED permet uniquement un test d’intégration sur Netlify dûment configuré ; l’environnement local ne prétend pas fournir ce service.
Production : PUBLIC_SITE_MODE=production ; contrôle bloquant avant build sur domaine, contacts, envoi activé, statut des tarifs/contenus, photos et textes légaux approuvés. Ce contrôle empêche une publication accidentelle du squelette.

## Services et configuration
PUBLIC_SITE_URL, PUBLIC_PHONE, PUBLIC_WHATSAPP, PUBLIC_EMAIL et PUBLIC_FORMS_ENABLED sont publics. Les identifiants Netlify éventuels ne sont jamais envoyés au navigateur ni committés. Aucun secret requis pour la préversion locale. Le compte Netlify, l’e-mail destinataire et le domaine sont UNKNOWN et à fournir par MK ; aucun remote Git n’est configuré initialement.

## Compatibilité
Versions stables récentes Chrome, Edge, Firefox et Safari, mobiles inclus. Amélioration progressive : pages et liens en HTML, tous les champs accessibles sans JavaScript ; formulaire natif lorsque activé. JavaScript ajoute les étapes et les retours d’erreur sans persistance locale des données personnelles.

## Exploitation
Versions npm verrouillées ; mise à jour du catalogue par commit et déploiement. En cas d’incident : vérifier demandes Netlify et notifications, mettre l’envoi hors service si nécessaire, puis republier le dernier déploiement connu. Les droits, règles de conservation et suppression sont finalisés avant la collecte réelle. Pas de dépense ou publication externe pendant l’implémentation locale.

## Sources techniques
https://docs.astro.build/en/guides/deploy/netlify/
https://docs.netlify.com/manage/forms/setup/
https://docs.netlify.com/manage/forms/notifications/
https://docs.netlify.com/manage/forms/spam-filters/
