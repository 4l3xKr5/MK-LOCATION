import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  fullyParallel: false,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: 'http://127.0.0.1:4322', trace: 'retain-on-failure', screenshot: 'only-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: [
    { command: 'node scripts/serve-e2e.mjs 4322', url: 'http://127.0.0.1:4322/demande-location', reuseExistingServer: false, env: { PUBLIC_FORMS_ENABLED: 'true', PUBLIC_SITE_MODE: 'preview', PUBLIC_PHONE: '+33600000000', PUBLIC_WHATSAPP: '+33600000000', PUBLIC_EMAIL: 'mk@example.test' }, timeout: 60000 },
    { command: 'node scripts/serve-e2e.mjs 4323', url: 'http://127.0.0.1:4323/demande-location', reuseExistingServer: false, env: { PUBLIC_FORMS_ENABLED: 'false', PUBLIC_SITE_MODE: 'preview' }, timeout: 60000 },
  ],
});
