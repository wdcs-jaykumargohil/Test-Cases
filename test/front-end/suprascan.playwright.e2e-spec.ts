import { test, expect } from '@playwright/test';

test('E2E test for searching transaction on Suprascan', async ({ page }) => {
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

  // Wait for suggestions and click first result
  await page.waitForSelector('div:text("Matched Search")');
  await page.locator(`a[href="/block/${transactionHash}"]`).click();
  await page.waitForTimeout(1000);

  // Wait for page to load completely
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

  // ✅ Verify the page has changed to full data view
  await expect(page).toHaveURL(/\/block\/\d+\/f/);
  // Pause to inspect if "Full Data" exists
  // await page.pause();
});
