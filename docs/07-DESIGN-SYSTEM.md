# MK Location — Système de design

## Direction
LOCKED — MK / DEPLOYED. Grand titre, cadre de mise à disposition, pans coupés à 12°, index du parc et géométrie rigoureuse. frontend-design fixe l’intention ; ui-ux-pro-max apporte les garde-fous ; motion-design encadre le mouvement utile.

## Couleurs
Coal #171A18 ; Bone #F1EEE5 ; Signal #FF5033 ; Petrol #173936 ; Mineral #D6D2C8 ; texte secondaire #606762. Texte Coal sur Signal (contraste calculé 5,38:1). Texte secondaire sur Bone 5,01:1. Le Signal n’est pas utilisé pour le petit texte sur Bone. Focus contrasté selon la surface.

## Typographie
Archivo variable condensée, poids 800/900, pour les titres ; Instrument Sans pour le corps ; IBM Plex Mono pour les labels. Fichiers WOFF2 locaux et licences conservées. Corps 17–19 px et interligne 1,55, labels au moins 12 px. Titres fluides, bornés et vérifiés à 320 px et au zoom ; capitales réservées aux titres et labels.

## Layout et espacement
Conteneur maximal 1480 px. Grille 12 colonnes desktop, composition verticale sur mobile, marges 20 px mobile et 48–64 px desktop. Échelle 4/8 px ; grands intervalles de section sans masquer l’action principale. Boutons de 48 px minimum, coins droits et pan coupé ; pas d’ombre diffuse.

## Composants
Layout global, header/menu dialogue, footer/contact, bouton/lien, cadre visuel, index matériel, fiche d’offre, FAQ native, étapes de demande, résumé d’erreurs, récapitulatif, bannière préversion et barre mobile.

## Mouvement
Intention : précision et calme, sans ressort ni boucle ambiante. Courbe cubic-bezier(.22,.61,.36,1), références 180/300/550 ms. Translations courtes, mouvement complémentaire du repère de cadre ; aucun effet nécessaire à la lecture. Défilement naturel ; préférence reduced-motion : transitions non essentielles supprimées. CSS et JavaScript natif suffisent, GSAP N/A.
