# MK Location — Données

## Catalogue
Source : documents MK fournis ; propriétaire : MK. Collection TypeScript de cinq équipements et une prestation chauffeur. Identifiant stable, slug, nom, besoin, présentation, tarif journalier de référence en EUR, caution connue ou null, options, caractéristiques documentées, photographies et provenance. Les champs inconnus restent absents/null ; ils ne deviennent jamais zéro ni une capacité supposée. Statut global d’approbation distinct du montant source.

## Demande de location
Matériel (slug autorisé ou autre), option mini-pelle (avec/sans chauffeur, N/A sinon), date ou à définir, durée, commune, précisions de livraison, nom et téléphone, e-mail/société/message facultatifs. Validation des dates locales sans conversion UTC décalante et contrôle des formats/longueurs au niveau interface. Tous les contenus entrants restent non fiables ; aucun prix ou accord n’en dépend automatiquement.

## Demande chauffeur
Date ou à définir, horaire souhaité, départ, destination ou besoin à préciser, nom et téléphone, e-mail/message facultatifs. Formulaire distinct ; ne pas confondre avec l’option chauffeur mini-pelle.

## Données personnelles
Finalité : traiter la demande et recontacter le demandeur. Destinataires techniques envisagés : Netlify et prestataire de messagerie de MK ; WhatsApp uniquement à l’initiative du visiteur par un lien. Pas de pièces jointes, identité officielle, paiement, géolocalisation automatique ou traceur marketing. Aucune donnée personnelle dans l’URL, localStorage, logs de test ou dépôt. sessionStorage peut contenir un marqueur de succès sans contenu personnel.

## Mise en service
Identité du responsable, texte d’information, cadre applicable, durée de conservation, accès et suppression : UNKNOWN, MK doit les valider avant d’activer les demandes publiques. Le contrôle production vérifie la présence de cette validation. Consigner une procédure de revue/suppression dans Netlify et la boîte e-mail selon la durée retenue par MK. Aucune conservation effective prétendue pour la préversion désactivée.

## Données de test
Fixtures synthétiques identifiables et adresses example.test ; aucune vraie coordonnée client. Tests réseau interceptés explicitement, distincts d’une recette réelle Netlify.
