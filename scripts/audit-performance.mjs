import fs from 'node:fs/promises';
import { preview } from 'astro';
import { chromium } from '@playwright/test';
import lighthouse from 'lighthouse';
await fs.mkdir('artifacts/qa', { recursive: true });
const server = await preview({ server: { host: '127.0.0.1', port: 4324 }, logLevel: 'error' });
// Astro may select another port when a different task already owns 4324.
const baseUrl = `http://127.0.0.1:${server.port}`;
let chrome;
try {
  chrome = await chromium.launch({ headless: true, args: ['--remote-debugging-port=9222'] });
  const results = [];
  for (const [name, path] of [['accueil', '/'], ['mini-pelle', '/location/mini-pelle']]) {
    const result = await lighthouse(`${baseUrl}${path}`, { port: 9222, output: ['json', 'html'], logLevel: 'error', onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'] });
    if (!result) throw new Error('Lighthouse did not return a result');
    await fs.writeFile(`artifacts/qa/lighthouse-${name}.json`, result.report[0]);
    await fs.writeFile(`artifacts/qa/lighthouse-${name}.html`, result.report[1]);
    const summary = { page: path, url: `${baseUrl}${path}`, performance: Math.round(result.lhr.categories.performance.score * 100), accessibility: Math.round(result.lhr.categories.accessibility.score * 100), bestPractices: Math.round(result.lhr.categories['best-practices'].score * 100), seo: Math.round(result.lhr.categories.seo.score * 100), lcpMs: Math.round(result.lhr.audits['largest-contentful-paint'].numericValue), cls: result.lhr.audits['cumulative-layout-shift'].numericValue, date: new Date().toISOString() };
    results.push(summary); process.stdout.write(`${JSON.stringify(summary)}\n`);
    if (summary.performance < 90 || summary.cls > 0.1) process.exitCode = 1;
  }
  await fs.writeFile('artifacts/qa/performance-summary.json', JSON.stringify(results, null, 2));
} finally { if (chrome) await chrome.close(); await server.stop(); }
