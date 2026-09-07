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
Intention : précision et calme, sans ressort ni boucle ambiante. Courbe cubic-bezier(.22,.61,.36,1), références 180/300/550 ms et reveal éditorial jusqu’à 720 ms. La signature est un déploiement par masque reprenant le pan coupé à 12°, accompagné de translations courtes et d’un mouvement complémentaire du repère de cadre.

Les boutons, liens, lignes du catalogue, FAQ, menu et étapes de formulaire utilisent des changements d’état interruptibles. Les reveals au scroll conservent l’opacité du contenu et combinent masque/translation pour préserver le contraste pendant le mouvement. La profondeur liée au scroll reste décorative, progressive, limitée aux plans graphiques sur desktop et ne déplace jamais le texte.

Les transitions de page natives et les timelines de vue sont des améliorations progressives : la navigation et la lecture restent intactes sans support ou sans JavaScript. Aucun effet n’est nécessaire à la compréhension. `prefers-reduced-motion` supprime les transitions non essentielles et laisse chaque élément dans son état final. CSS et JavaScript natif suffisent, GSAP N/A.
