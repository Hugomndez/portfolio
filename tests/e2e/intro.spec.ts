import { expect, test } from '@playwright/test';

// Common setup for all tests in this file
test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('heading is visible with correct text', async ({ page }) => {
  // Expect a h1 with "Nice to meet you!"
  const h1 = page.getByRole('heading', { name: 'Nice to meet you!' });
  await expect(h1).toBeVisible();
});

test('profile image is visible with correct alt text', async ({ page }) => {
  const img = page.getByAltText('Hugo Méndez - Full-Stack Developer Portfolio Picture');
  await expect(img).toBeVisible();
});

test('contact me link works', async ({ page }) => {
  // Click the "Contact me" link.
  await page.getByRole('link', { name: 'Contact me' }).click();

  // Expects page url to contain "#contact"
  await expect(page).toHaveURL(/#contact/);

  // Contact section heading is visible
  await expect(page.getByRole('heading', { name: 'Contact' })).toBeVisible();
});
