const { test, expect } = require('@playwright/test');

test('Trang chủ Playwright có chứa text "Get started"', async ({ page }) => {
  await page.goto('https://playwright.dev');
  await expect(page.getByText('Get started')).toBeVisible();
});
