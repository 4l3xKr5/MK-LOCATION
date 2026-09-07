# MK Location — Mise en service

## État

La préversion est locale. Aucun compte Netlify, domaine, destinataire, abonnement ou remote Git n’a été créé. L’ouverture nécessite les faits et accès réels détenus par MK.

## 1. Valider les contenus

MK fournit et confirme :

- téléphone international, numéro WhatsApp utilisé, e-mail public et destinataire des notifications ;
- identité légale et textes de location/confidentialité validés, durée de conservation et contact pour les droits ;
- photos réelles et leurs droits, caractéristiques, caution du plateau et sens de « 3,5 t » ;
- prix et base HT/TTC, supplément et conditions chauffeur mini-pelle, longue durée, livraison, modalités Porsche et secteur.

Intégrer les photos optimisées dans `public/assets/` et les référencer dans `src/data/publication.json`, par offre :

```json
{
  "src": "/assets/nom-du-fichier-reel.webp",
  "alt": "Description fidèle de la photographie fournie",
  "verified": true
}
```

Les six clés sont `mini-pelle`, `camion-benne`, `betonniere`, `plateau-remorque-35t`, `utilitaire` et `chauffeur`. Le composant utilise la première photo approuvée. Préparer des images 4:3 de résolution suffisante pour les grands cadrages ; vérifier le sujet sur mobile. Aucun fichier ne doit être marqué vérifié sans accord sur sa provenance.

Compléter le catalogue et remplacer les trois documents dans `src/content/legal/`. Retirer `CONTENU_A_VALIDER` uniquement après intégration des textes réels. Renseigner les approbations et leur date dans publication.json à partir de l’accord MK. Conserver les sources et noter les changements métier dans 11-DECISIONS.

## 2. Configurer Netlify pour une recette privée

Utiliser le compte MK et un déploiement de recette dont l’accès est contrôlé. Un noindex n’est pas un contrôle d’accès. Vérifier les modalités/coûts du compte d’hébergement avant souscription ; aucune dépense automatique n’est prévue par cette tâche.

Build `npm run build`, dossier `dist`, Node 24, configuration `netlify.toml`. Déclarer les variables publiques de `.env.example` avec les coordonnées réelles. Garder `PUBLIC_SITE_MODE=preview` pendant la recette. Ne pas mettre de token Netlify dans PUBLIC_* ou dans Git.

Activer la détection des formulaires dans Netlify, positionner `PUBLIC_FORMS_ENABLED=true`, puis reconstruire. Vérifier la détection des formulaires `location` et `chauffeur`. Configurer une notification pour chacun vers l’adresse MK. Le champ `email`, facultatif côté visiteur, fournit le Reply-To lorsqu’il est rempli.

Le POST contient `form-name`, `bot-field` et les champs en application/x-www-form-urlencoded. Les attributs Netlify sont présents dans le HTML du build activé. Netlify filtre et stocke les demandes ; MK confirme ensuite les modalités manuellement. Aucun montant ou contenu soumis ne produit une réservation automatique.

Sources : [configuration](https://docs.netlify.com/manage/forms/setup/), [notifications](https://docs.netlify.com/manage/forms/notifications/), [filtrage](https://docs.netlify.com/manage/forms/spam-filters/) et [gestion des demandes](https://docs.netlify.com/manage/forms/submissions/).

## 3. Prouver le fonctionnement réel

Dans le cadre d’une recette autorisée, envoyer une demande identifiée comme test pour chaque formulaire. Vérifier séparément : réponse serveur, présence dans Forms, arrivée dans la boîte MK, contenu complet et Reply-To. La confirmation du navigateur ne prouve pas la réception de l’e-mail.

Tester les liens téléphone et WhatsApp avec les coordonnées réelles sans envoyer de message non demandé. Examiner les demandes classées en spam, les notifications et la boîte indésirable si une réception manque. Supprimer les essais selon la procédure convenue.

Consigner date, révision, environnement et preuve dans le rapport QA, sans données personnelles ni secret. Définir les personnes autorisées à accéder à Netlify et à la messagerie ; documenter la revue et la suppression dans les deux systèmes selon la durée validée par MK.

## 4. Ouvrir le domaine public

Après validation des contenus et de l’intégration, définir `PUBLIC_SITE_URL` sur le domaine HTTPS convenu puis `PUBLIC_SITE_MODE=production`. Exécuter `npm run check:production` et la recette. Le build refuse une configuration incomplète. La production enlève bandeau et noindex des pages publiques, ajoute canoniques et URLs du sitemap ; confirmation et page de préversion restent non indexées.

Contrôler domaine, assets, robots.txt, sitemap.xml, formulaires et e-mail après déploiement. Un localhost fonctionnel ou un build réussi n’est pas une publication vérifiée. Un éventuel push utilise la branche de tâche ; l’intégration main exige une demande explicite.

## Incident et retour arrière

Conserver l’identifiant du dernier déploiement validé. En cas de régression, restaurer cette version dans Netlify. Si la réception est défaillante, garder les contacts directs accessibles et désactiver temporairement l’envoi par configuration/rebuild. Ne pas supprimer les demandes réelles lors d’un retour de code. Examiner les données et la notification séparément du site.
