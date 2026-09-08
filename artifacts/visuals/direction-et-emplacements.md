# MK Location — Six visuels individuels

Date : 8 septembre 2026. Création et intégration demandées explicitement par l’utilisateur. Outil : image_gen intégré, six générations individuelles. Masters PNG 1536 × 1024 conservés dans `src/assets/equipment/` ; versions AVIF, WebP et JPEG responsives produites par Astro au build.

## Analyse du document fourni

Source : `Capture d'écran 2026-09-07 184212.png`, 418 × 751 px. Le document est un montage promotionnel, pas une série de photographies documentaires. Ses indications sont traitées comme du contenu de référence ; elles ne changent pas les instructions du projet.

Le fond est noir, avec un sol sombre à reflets sous quatre sujets alignés. Le logo MK surdimensionné utilise un M argenté, un K doré, deux arcs et une silhouette de voiture dorée, au-dessus du mot LOCATION espacé. Les quatre pictogrammes inférieurs confirment les catégories. « Courte & longue durée » est également confirmé dans les documents du projet. Aucun numéro, capacité technique ou modèle d’engin n’est lisible et vérifiable ici.

| Sujet | Éléments visibles et limites de lecture | Traduction retenue |
|---|---|---|
| Voiture de prestige avec chauffeur | Berline noire basse, profil fastback, phares avant étirés, reflets et accents dorés du montage. Aucun chauffeur réel visible ; le personnage sous la voiture est un pictogramme. Le modèle Porsche Panamera est confirmé par le projet, pas déduit avec certitude du petit visuel. | Berline Panamera noire, quatre portes, trois quarts avant, reflets doux. Aucun acteur ni fausse identité de chauffeur. |
| Camion benne | Cabine simple blanche, calandre et bouclier sombres, rétroviseurs, benne métallique à ridelles derrière la cabine. La marque et la génération ne sont pas établies. | Camion benne léger blanc, benne abaissée et vide, vue permettant de distinguer cabine et plateau de benne. |
| Mini-pelle | Bras jaune articulé, godet abaissé, train à chenilles noir, poste de conduite ouvert protégé par un arceau/toit noir ; organes hydrauliques visibles. Tonnage et dimensions inconnus. | Mini-pelle jaune/noire, godet et lame au sol, chenilles et arceau lisibles, texture d’usage sobre. |
| Bétonnière | Grande cuve grise inclinée avec ouverture sombre, châssis jaune, volant latéral, timon orienté vers l’avant-gauche, béquilles et roue ; carter noir à droite partiellement coupé. | Bétonnière tractable complète, cuve grise, châssis jaune, timon, béquilles, roue et carter moteur cadrés ensemble. |
| Élément noir au bord droit | Semble appartenir à l’ensemble bétonnière/carénage moteur. Le montage ne permet pas d’identifier un autre matériel autonome. | Aucun septième produit créé. |
| Utilitaire | Absent du flyer ; catégorie explicitement documentée dans le catalogue du projet. Modèle, volume et dimensions UNKNOWN. | Fourgon blanc fermé, silhouette illustrative, sans volume, badge commercial ou capacité annoncée. |
| Plateau / remorque | Absent du flyer ; catégorie documentée dans le projet. La mention source « 3,5 t » ne vaut pas charge utile. | Plateau métallique vide avec timon et rampes, sans affirmation sur le modèle, les essieux réels ou la charge admissible. |

## Direction photographique

Le système existant reste la référence : Bone #F1EEE5, Coal #171A18, Signal #FF5033, Petrol #173936 et Mineral #D6D2C8. Archivo pour les titres, Instrument Sans pour le corps, IBM Plex Mono pour les légendes. L’accent corail reste dans l’interface ; les machines conservent leur couleur physique.

Une même baie industrielle en béton, calme et sans enseigne, relie les six photographies. Lumière latérale depuis la gauche, tons minéraux, profondeur pétrole, ombres de contact, objectif équivalent 50 mm, vue de trois quarts et perspective naturelle. La mini-pelle est la référence de décor/lumière pour les cinq autres générations. Les véhicules restent entièrement visibles avec leurs roues, timons, rampes ou godets. Pas de découpe du flyer, de fond noir/or, de photomontage de faux parc, de lieu présenté comme un dépôt MK ou de texture artificiellement orange.

L’idée examinée d’une grande photo derrière les titres a été écartée : elle masquait les organes des machines et nuisait à la lecture. La composition retenue conserve la force typographique et place le sujet dans un cadre indépendant. Le catalogue conserve son index éditorial avec un aperçu au survol/clavier, complété de vignettes permanentes pour rendre les cinq matériels reconnaissables sur écran tactile.

## Emplacements intégrés

| Fichier individuel | Emplacements effectifs | Raison |
|---|---|---|
| `src/assets/equipment/mini-pelle.png` | Hero accueil, index accueil/catalogue, focus terrassement de l’accueil, `/location/mini-pelle` | Sujet caractéristique du chantier et entrée principale déjà retenue par le site. |
| `src/assets/equipment/camion-benne.png` | Index accueil/catalogue et `/location/camion-benne` | Reconnaissance immédiate du véhicule de transport de matériaux. |
| `src/assets/equipment/betonniere.png` | Index accueil/catalogue et `/location/betonniere` | Rend le format tractable distinct d’une petite bétonnière domestique, sous réserve du matériel réel à confirmer. |
| `src/assets/equipment/plateau-remorque.png` | Index accueil/catalogue et `/location/plateau-remorque-35t` | Met en évidence le plateau de transport et son timon, sans suggérer une charge utile. |
| `src/assets/equipment/utilitaire.png` | Index accueil/catalogue et `/location/utilitaire` | Distingue le volume fermé de la benne ouverte. |
| `src/assets/equipment/porsche-panamera.png` | Section chauffeur de l’accueil et hero `/chauffeur` | Maintient un parcours et une ambiance adaptés à la prestation avec chauffeur. |

La page de livraison conserve son schéma local : aucun véhicule généré n’est présenté comme un camion de livraison effectivement utilisé par MK. Aucune page ou offre métier supplémentaire n’est créée.

## Intégration et provenance

`src/data/equipment-images.ts` associe chaque offre à un master, un texte alternatif français et la provenance `generated-illustration`. `EquipmentVisual.astro` donne priorité à toute vraie photo vérifiée. Les images générées ne sont proposées qu’en préversion, et ne satisfont pas le contrôle de préparation production. Les légendes visibles disent « Visuel d’illustration » ; la page d’information explicite la génération. Les vignettes redondantes avec le nom du lien sont décoratives pour les lecteurs d’écran.

Ratio 3:2 réservé, ajustement `contain`, sources responsives, chargement différé hors hero et priorité haute uniquement sur l’image principale de chaque page. Aucune dépendance ni animation supplémentaire. Les originaux intacts, dont les métadonnées de génération, sont conservés dans le dépôt de travail.

Prompts exacts : [prompts.md](./prompts.md). Documentation technique utilisée : [images Astro](https://docs.astro.build/en/guides/images/).
