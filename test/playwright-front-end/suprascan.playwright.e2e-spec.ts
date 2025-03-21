import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const screenshotDir = 'test/screenshot/supra-scan';
const waitTimeout = 1000; // It's Optional

// Clear Screenshot directory if any images exist
test.beforeEach(() => {
    // Clear existing screenshots
    if (fs.existsSync(screenshotDir)) {
        const files = fs.readdirSync(screenshotDir);
        for (const file of files) {
            fs.unlinkSync(path.join(screenshotDir, file));
        }
    } else {
        // Create directory if it doesn't exist
        fs.mkdirSync(screenshotDir, { recursive: true });
    }
});

// Start the test execution
test('E2E test for searching transaction on Suprascan', async ({ page }) => {
    await page.goto('https://suprascan.io/');

    await page.waitForTimeout(waitTimeout); // It's Optional
    await page.screenshot({ path: `${screenshotDir}/Step 1 - Start: Go to website.png`, fullPage: true });
    await page.locator('svg.block.rounded-full.border').click();
    await page.waitForTimeout(waitTimeout); // It's Optional
    await page.screenshot({ path: `${screenshotDir}/Step 2 - Change theme to dark mode.png`, fullPage: true });

    // Click the first "Blockchain" link
    await page.locator('a:text("Blockchain")').first().click();
    await page.screenshot({ path: `${screenshotDir}/Step 3 - Click on dropdown (Blockchain > Transactions).png`, fullPage: true });

    // Wait for dropdown and click "Transactions"
    await page.waitForTimeout(waitTimeout); // It's Optional
    await page.locator('a:text("Transactions")').click();
    await page.waitForTimeout(waitTimeout); // It's Optional

    // Enter the transaction hash
    const transactionHash = '0x03914e85a332b9dafe97d2a68f32a3e7f166e5e8349a50d378921c3f76859f6f';

    await page.locator('input[placeholder*="Search"]').fill(transactionHash);
    await page.screenshot({ path: `${screenshotDir}/Step 4 - Click on input Search field > paste transactionHash.png`, fullPage: true });
    await page.waitForTimeout(waitTimeout); // It's Optional

    // Wait for suggestions and click first result
    await page.waitForSelector('div:text("Matched Search")');
    await page.screenshot({ path: `${screenshotDir}/Step 5 - Matched search.png`, fullPage: true });
    await page.locator(`a[href="/block/${transactionHash}"]`).click();
    await page.waitForTimeout(waitTimeout); // It's Optional

    // Wait for page to load completely
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(waitTimeout); // It's Optional

    // Check if "Full Data" exists before clicking
    await page.screenshot({ path: `${screenshotDir}/Step 6 - Clicked on matched search > transaction-hash detail page > click on Full Data.png`, fullPage: true });
    const fullDataLocator = page.locator('span:text("Full Data")');

    if ((await fullDataLocator.count()) > 0) {
        await fullDataLocator.scrollIntoViewIfNeeded();
        await fullDataLocator.click();
    } else {
        console.error('❌ Full Data button not found!');
        await page.screenshot({ path: `${screenshotDir}/Step 6 - Something went wrong > (Clicked on matched search > transaction-hash detail page > click on Full Data).png`, fullPage: true });
    }
    await page.waitForTimeout(waitTimeout); // It's Optional
    await page.screenshot({ path: `${screenshotDir}/Step 7 - END: Full Data > detail page.png`, fullPage: true });

    // ✅ Verify the page has changed to full data view
    await expect(page).toHaveURL(/\/block\/\d+\/f/);
    // Pause to inspect if "Full Data" exists
    // await page.pause();
});
