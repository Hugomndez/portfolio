import { expect, test } from '@playwright/test';

test('footer social links have correct attributes', async ({ page }) => {
  await page.goto('/');

  const github = page.getByLabel('GitHub Link');
  await expect(github).toBeVisible();
  await expect.soft(github).toHaveAttribute('href', 'https://github.com/Hugomndez');
  expect(await github.getAttribute('target')).toBe('_blank');
  const githubRel = await github.getAttribute('rel');
  expect(githubRel).toContain('noreferrer');
  expect(githubRel).toContain('noopener');

  const fm = page.getByLabel('Frontend Mentor Link');
  await expect(fm).toBeVisible();
  await expect.soft(fm).toHaveAttribute('href', 'https://www.frontendmentor.io/profile/Hugomndez');
  expect(await fm.getAttribute('target')).toBe('_blank');
  const fmRel = await fm.getAttribute('rel');
  expect(fmRel).toContain('noreferrer');
  expect(fmRel).toContain('noopener');

  const linkedin = page.getByLabel('LinkedIn Link');
  await expect(linkedin).toBeVisible();
  await expect.soft(linkedin).toHaveAttribute('href', 'https://www.linkedin.com/in/hugomndez/');
  expect(await linkedin.getAttribute('target')).toBe('_blank');
  const liRel = await linkedin.getAttribute('rel');
  expect(liRel).toContain('noreferrer');
  expect(liRel).toContain('noopener');
});
