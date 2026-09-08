import type { ImageMetadata } from 'astro';
import type { EquipmentSlug } from './catalog';
import miniPelle from '../assets/equipment/mini-pelle.png';
import camionBenne from '../assets/equipment/camion-benne.png';
import betonniere from '../assets/equipment/betonniere.png';
import plateau from '../assets/equipment/plateau-remorque.png';
import utilitaire from '../assets/equipment/utilitaire.png';
import panamera from '../assets/equipment/porsche-panamera.png';

type OfferSlug = EquipmentSlug | 'chauffeur';
interface EditorialImage {
  src: ImageMetadata;
  alt: string;
  provenance: 'generated-illustration';
}

// Editorial illustrations are deliberately separate from verified fleet photos.
// Exact models, dimensions and capacities remain unconfirmed by MK.
export const equipmentImages: Record<OfferSlug, EditorialImage> = {
  'mini-pelle': { src: miniPelle, alt: 'Mini-pelle jaune à chenilles, arceau noir et godet au sol dans un espace en béton — illustration.', provenance: 'generated-illustration' },
  'camion-benne': { src: camionBenne, alt: 'Camion benne blanc vu de trois quarts, cabine et benne métallique abaissée — illustration.', provenance: 'generated-illustration' },
  'betonniere': { src: betonniere, alt: 'Bétonnière tractable à cuve grise, châssis jaune et timon de remorquage — illustration.', provenance: 'generated-illustration' },
  'plateau-remorque-35t': { src: plateau, alt: 'Plateau de transport métallique vide, roues et timon visibles — illustration.', provenance: 'generated-illustration' },
  'utilitaire': { src: utilitaire, alt: 'Fourgon utilitaire blanc fermé, vu de trois quarts dans un espace industriel — illustration.', provenance: 'generated-illustration' },
  'chauffeur': { src: panamera, alt: 'Porsche Panamera noire vue de trois quarts sous une lumière latérale douce — illustration de la prestation avec chauffeur.', provenance: 'generated-illustration' },
};

export const getEquipmentImage = (slug: string) =>
  Object.hasOwn(equipmentImages, slug) ? equipmentImages[slug as OfferSlug] : undefined;
