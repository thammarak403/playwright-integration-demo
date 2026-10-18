import { test, expect, Page } from '@playwright/test';
import path from 'path';
import { pathToFileURL } from 'url';

// DRIVER: Test Code ด้านบนที่เป็นฝ่ายเรียก card.html
async function driverOpenCard(page: Page): Promise<void> {
  const cardUrl = pathToFileURL(
    path.resolve(process.cwd(), 'stubs/card.html')
  ).href;

  await page.goto(cardUrl);
  await expect(page.locator('[data-test="stub-inventory"]')).toBeVisible();
}

test('Driver -> Stub card.html: มีชื่อและนามสกุลของตัวเอง', async ({ page }) => {
  await driverOpenCard(page);

  await expect(page.locator('[data-test="stub-card"]'))
    .toContainText('Fake Inventory from Stub B');

  await expect(page.locator('[data-test="student-firstname"]'))
    .toHaveText('ธรรมรักษ์');
  await expect(page.locator('[data-test="student-lastname"]'))
    .toHaveText('เดชสง');

  await expect(page.locator('[data-test="stub-card"]')).toContainText('ธรรมรักษ์');
  await expect(page.locator('[data-test="stub-card"]')).toContainText('เดชสง');
});
