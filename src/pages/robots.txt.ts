import type { APIRoute } from 'astro';
import { site } from '../config/site';
export const GET: APIRoute = () => new Response(site.preview ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\nDisallow: /demande-envoyee\nDisallow: /informations-preversion\nSitemap: ${new URL('/sitemap.xml', site.url).href}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
