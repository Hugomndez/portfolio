import { expect, test } from '@playwright/test';

test('projects section renders: heading and cards or skeletons', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible();

  const skeletons = page.locator('article[aria-hidden="true"]');
  const skeletonCount = await skeletons.count();

  if (skeletonCount > 0) {
    // When CMS envs are missing, skeleton fallback shows 6 items
    expect(skeletonCount).toBe(6);
  } else {
    // With CMS configured, expect at least one project card with action links
    await expect(page.getByRole('link', { name: 'View Project' }).first()).toBeVisible();
    // "View Code" may be optional per project
    const codeLinks = page.getByRole('link', { name: 'View Code' });
    // Either zero or more, but if present, should be visible
    const codeCount = await codeLinks.count();
    if (codeCount > 0) {
      await expect(codeLinks.first()).toBeVisible();
    }
  }
});
