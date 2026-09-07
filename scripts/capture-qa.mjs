import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
const routes = process.argv.slice(2).length ? process.argv.slice(2) : ['/', '/location/mini-pelle', '/demande-location', '/chauffeur'];
await fs.mkdir('artifacts/qa', { recursive: true });
const browser = await chromium.launch();
try {
  for (const [label, width, height] of [['desktop', 1440, 1000], ['mobile', 375, 812]]) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    for (const route of routes) {
      await page.goto(`http://127.0.0.1:4321${route}`, { waitUntil: 'networkidle' });
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all(document.getAnimations().map((animation) => animation.finished.catch(() => {})));
      });
      const name = `${route === '/' ? 'accueil' : route.replaceAll('/', '-').slice(1)}-${label}`;
      await page.screenshot({ path: `artifacts/qa/${name}.png`, fullPage: true });
      await page.screenshot({ path: `artifacts/qa/${name}-viewport.png` });
      process.stdout.write(`${name}: ${await page.title()}\n`);
    }
    await page.close();
  }
} finally { await browser.close(); }
