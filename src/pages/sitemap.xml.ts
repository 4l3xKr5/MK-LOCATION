import type { APIRoute } from 'astro';
import { site } from '../config/site';
import { equipment } from '../data/catalog';
const paths = ['/', '/location', ...equipment.map((item) => `/location/${item.slug}`), '/comment-ca-marche', '/livraison-annay', '/chauffeur', '/demande-location', '/mentions-legales', '/confidentialite', '/conditions-location'];
export const GET: APIRoute = () => new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${site.preview ? '' : paths.map((path) => `<url><loc>${new URL(path, site.url).href.replaceAll('&', '&amp;').replaceAll('<', '&lt;')}</loc></url>`).join('')}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
