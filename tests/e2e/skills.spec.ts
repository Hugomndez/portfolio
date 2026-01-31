import { expect, test } from '@playwright/test';

test('skills section shows multiple experience cards', async ({ page }) => {
  await page.goto('/');

  // Expect at least several entries with "Years Experience"
  const yearsLoc = page.locator('text=/\\d+ Years Experience/i');
  const count = await yearsLoc.count();
  expect(count).toBeGreaterThanOrEqual(3);

  // Specific skill example (exact match to avoid strict-mode conflicts)
  await expect(page.getByText('SEO', { exact: true })).toBeVisible();
});
