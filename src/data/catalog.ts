export type EquipmentSlug = 'mini-pelle' | 'camion-benne' | 'betonniere' | 'plateau-remorque-35t' | 'utilitaire';
export type VisualKind = 'excavator' | 'truck' | 'mixer' | 'trailer' | 'van' | 'car';
export interface Equipment {
  slug: EquipmentSlug;
  index: string;
  name: string;
  shortName: string;
  category: string;
  need: string;
  description: string;
  dailyRate: number;
  deposit: number | null;
  driver: boolean;
  visual: VisualKind;
  specs: { label: string; value: string }[];
  provenance: { source: string; priceStatus: 'reference'; specificationsStatus: 'UNKNOWN' };
}
const provenance = { source: 'Concept_entreprise_MK_Location.md — grille tarifaire et catégories', priceStatus: 'reference', specificationsStatus: 'UNKNOWN' } as const;
export const equipment: Equipment[] = [
  { slug: 'mini-pelle', index: '01', name: 'Mini-pelle', shortName: 'MINI-PELLE', category: 'Terrassement', need: 'Préparer le terrain.', description: 'Pour vos besoins de terrassement et d’aménagement extérieur. Choisissez une location avec ou sans chauffeur, puis organisez la mise à disposition avec MK.', dailyRate: 150, deposit: 1000, driver: true, visual: 'excavator', specs: [], provenance },
  { slug: 'camion-benne', index: '02', name: 'Camion benne', shortName: 'CAMION BENNE', category: 'Transport', need: 'Faire avancer le chantier.', description: 'Un véhicule pour vos besoins de transport de matériaux ou d’équipements. Précisez les charges à transporter afin de convenir des modalités avec MK.', dailyRate: 100, deposit: 500, driver: false, visual: 'truck', specs: [], provenance },
  { slug: 'betonniere', index: '03', name: 'Bétonnière', shortName: 'BÉTONNIÈRE', category: 'Préparation béton', need: 'Donner forme aux travaux.', description: 'Une grosse bétonnière pour les travaux nécessitant la préparation de béton ou de mortier. Décrivez votre projet et la durée souhaitée.', dailyRate: 70, deposit: 250, driver: false, visual: 'mixer', specs: [], provenance },
  { slug: 'plateau-remorque-35t', index: '04', name: 'Plateau / remorque', shortName: 'PLATEAU', category: 'Transport', need: 'Déplacer votre matériel.', description: 'Un plateau / remorque pour vos besoins de transport. Indiquez le matériel concerné : MK précisera les caractéristiques et les conditions adaptées avant toute location.', dailyRate: 120, deposit: null, driver: false, visual: 'trailer', specs: [], provenance },
  { slug: 'utilitaire', index: '05', name: 'Utilitaire', shortName: 'UTILITAIRE', category: 'Véhicule', need: 'De la place pour vos projets.', description: 'Un utilitaire pour les besoins ponctuels ou prolongés de transport. Précisez ce que vous souhaitez déplacer pour vérifier ensemble les modalités.', dailyRate: 80, deposit: 500, driver: false, visual: 'van', specs: [], provenance },
];
export const getEquipment = (slug: string | null | undefined) => equipment.find((item) => item.slug === slug);
export const money = (value: number) => new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(value);
