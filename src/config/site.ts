import publicationData from '../data/publication.json';
export interface OfferPhoto { src: string; alt: string; verified: boolean }
export const publication = publicationData as Omit<typeof publicationData, 'offerPhotos'> & { offerPhotos: Record<string, OfferPhoto[]> };
const clean = (value: string | undefined) => value?.trim() || '';
const phone = clean(import.meta.env.PUBLIC_PHONE);
const whatsapp = clean(import.meta.env.PUBLIC_WHATSAPP).replace(/\D/g, '');
export const site = {
  name: 'MK Location',
  preview: import.meta.env.PUBLIC_SITE_MODE !== 'production',
  formsEnabled: import.meta.env.PUBLIC_FORMS_ENABLED === 'true',
  url: clean(import.meta.env.PUBLIC_SITE_URL) || 'http://localhost:4321',
  phone,
  phoneHref: /^\+[1-9]\d{7,14}$/.test(phone.replace(/[\s.()-]/g, '')) ? `tel:${phone.replace(/[\s.()-]/g, '')}` : '',
  whatsapp: /^[1-9]\d{7,14}$/.test(whatsapp) ? whatsapp : '',
  email: clean(import.meta.env.PUBLIC_EMAIL),
};
export const whatsappLink = (subject = 'une location') => site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Bonjour MK Location, je souhaite des informations pour ${subject}.`)}` : '';
