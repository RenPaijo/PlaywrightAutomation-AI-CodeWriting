import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import { loadEnv } from './tests/support/env';

loadEnv();

const baseURL = process.env.SAUCE_DEMO_BASE_URL?.trim() || undefined;

const testDir = defineBddConfig({
  features: 'features/**/*.feature',
  steps: ['tests/steps/**/*.ts', 'tests/fixtures.ts'],
  outputDir: '.features-gen',
  missingSteps: 'fail-on-run',
});

export default defineConfig({
  testDir,
  outputDir: 'test-results',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', { outputFolder: 'allure-results', detail: true }],
  ],
  use: {
    baseURL,
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: true,
  },
  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },
  ],
});
