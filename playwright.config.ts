import { defineConfig } from '@playwright/test';

export default defineConfig({
  testMatch: ['**/*.playwright.e2e-spec.ts'], // Allow .e2e-spec.ts files
  use: {
    headless: true, // Run in headless mode
  },
});
