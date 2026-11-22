import { expect, test } from '@playwright/test';

// Common setup for all tests in this file
test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('heading is visible with correct text', async ({ page }) => {
  const h1 = page.getByRole('heading', {
    name: 'Hi, I’m Hugo Méndez. I build and modernize websites and web apps.',
  });
  await expect(h1).toBeVisible();
  await expect(page.getByText('Get a fast, reliable website that helps your business reach more people')).toBeVisible();
});

test('terms animate without a pause control', async ({ page }) => {
  const heading = page.getByRole('heading', { level: 1 });
  const terms = heading.locator('[aria-hidden="true"] > span');
  await expect(terms.first()).toHaveCSS('animation-play-state', 'running');
  await expect(terms.first()).toHaveCSS('animation-iteration-count', 'infinite');
  await expect(page.getByLabel('Pause animation')).toHaveCount(0);
});

test('reduced motion shows both terms without animation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });

  await expect(page.getByText('websites and web apps.', { exact: true })).toBeVisible();
  await expect(page.getByText('websites.', { exact: true })).toBeHidden();
  await expect(page.getByText('web apps.', { exact: true })).toBeHidden();
});

test('profile image is visible with correct alt text', async ({ page }) => {
  const img = page.getByAltText('Hugo Méndez - Full-Stack Developer Portfolio Picture');
  await expect(img).toBeVisible();
});

test('tell me about your project link works', async ({ page }) => {
  await page.getByRole('link', { name: 'Tell me about your project' }).click();

  await expect(page).toHaveURL(/#contact/);
  await expect(page.getByRole('heading', { name: 'Contact' })).toBeVisible();
});

test('explore my work link works', async ({ page }) => {
  await page.getByRole('link', { name: 'Explore my work' }).click();

  await expect(page).toHaveURL(/#projects/);
  await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible();
});
