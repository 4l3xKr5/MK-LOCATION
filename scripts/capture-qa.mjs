import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
const routes = process.argv.slice(2).length ? process.argv.slice(2) : ['/', '/location/mini-pelle', '/demande-location', '/chauffeur'];
const baseUrl = process.env.QA_BASE_URL || 'http://127.0.0.1:4321';
await fs.mkdir('artifacts/qa', { recursive: true });
const browser = await chromium.launch();
try {
  for (const [label, width, height] of [['desktop', 1440, 1000], ['mobile', 375, 812]]) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    for (const route of routes) {
      await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' });
      await page.evaluate(async () => {
        await document.fonts.ready;
      });
      const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y <= pageHeight; y += Math.round(height * 0.7)) {
        await page.evaluate((position) => window.scrollTo(0, position), y);
        await page.waitForTimeout(60);
      }
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
      await page.waitForTimeout(350);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(650);
      await page.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important}' });
      const name = `${route === '/' ? 'accueil' : route.replaceAll('/', '-').slice(1)}-${label}`;
      await page.screenshot({ path: `artifacts/qa/${name}.png`, fullPage: true });
      await page.screenshot({ path: `artifacts/qa/${name}-viewport.png` });
      process.stdout.write(`${name}: ${await page.title()}\n`);
    }
    await page.close();
  }
} finally { await browser.close(); }
