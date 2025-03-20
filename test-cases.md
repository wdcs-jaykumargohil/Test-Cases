# Frontend Test Cases with Playwright

This guide will help you set up and run frontend test cases using Playwright.

---

## 📌 Dependencies

### 1️⃣ Create Playwright Configuration File

Create a file named **`playwright.config.ts`** in the root directory and add the following configuration:

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testMatch: ['**/*.playwright.e2e-spec.ts'], // Allow .e2e-spec.ts files
  use: {
    headless: true, // Run tests in headless mode
  },
});
```

### 2️⃣ Install Playwright

Run the following command to install Playwright dependencies:

```sh
npx playwright install
```

### 3️⃣ Update `package.json`

Modify the `scripts` section in `package.json` to add a test command:

```json
"scripts": {
  ...
  "test:playwright": "npx playwright test --headed"
  "test:playwright:one-by-one": "npx playwright test --headed --workers=1"
  ...
}
```

---

### 📝 Writing a Sample Frontend Test Case

Create a test file at `./test/suprascan.playwright.e2e-spec.ts` and add the following code:

```ts
import { test, expect } from '@playwright/test';

test('E2E test for searching transaction on Suprascan', async ({ page }) => {
  // Open the Suprascan website
  await page.goto('https://suprascan.io/');

  await page.waitForTimeout(1000);

  // Click the first "Blockchain" link
  await page.locator('a:text("Blockchain")').first().click();

  // Wait for dropdown and click "Transactions"
  await page.waitForTimeout(1000);
  await page.locator('a:text("Transactions")').click();
  await page.waitForTimeout(1000);

  // Enter the transaction hash
  const transactionHash =
    '0x03914e85a332b9dafe97d2a68f32a3e7f166e5e8349a50d378921c3f76859f6f';
  await page.locator('input[placeholder*="Search"]').fill(transactionHash);
  await page.waitForTimeout(1000);

  // Wait for search suggestions and click the first result
  await page.waitForSelector('div:text("Matched Search")');
  await page.locator(`a[href="/block/${transactionHash}"]`).click();
  await page.waitForTimeout(1000);

  // Ensure page loads completely
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(1000);

  // Check if "Full Data" exists before clicking
  const fullDataLocator = page.locator('span:text("Full Data")');

  if ((await fullDataLocator.count()) > 0) {
    await fullDataLocator.scrollIntoViewIfNeeded();
    await fullDataLocator.click();
  } else {
    console.error('❌ Full Data button not found!');
    await page.screenshot({ path: 'debug-screenshot.png' });
  }

  await page.waitForTimeout(1000);

  // ✅ Verify that the URL has changed to full data view
  await expect(page).toHaveURL(/\/block\/\d+\/f/);

  // Pause the execution for debugging if needed
  await page.pause();
});
```

---

### 🚀 Running the Test Case

Run the test using either of the following commands:

```sh
yarn run test:playwright
or
npm run test:playwright
```
