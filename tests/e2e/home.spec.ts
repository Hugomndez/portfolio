import { expect, test } from '@playwright/test';

test('homepage has expected h1', async ({ page }) => {
  await page.goto('/');

  // Expect a h1 with "Nice to meet you!"
  const h1 = page.getByRole('heading', { name: 'Nice to meet you!' });
  await expect(h1).toBeVisible();
});

test('contact me link works', async ({ page }) => {
  await page.goto('/');

  // Click the "Contact me" link.
  await page.getByRole('link', { name: 'Contact me' }).click();

  // Expects page to scroll to contact section with heading "Contact"
  const contactHeading = page.getByRole('heading', { name: 'Contact' });
  await expect(contactHeading).toBeVisible();
});
