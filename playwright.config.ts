import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e-tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000', // Adjust if your dev server runs elsewhere
    trace: 'on-first-retry',
    headless: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
  ],
  // Uncomment below to auto-start your dev server before tests
  // webServer: {
  //   command: 'npm run dev --workspace=website',
  //   port: 3000,
  //   reuseExistingServer: !process.env.CI,
  // },
}); 