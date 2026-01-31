import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/#contact');
});

test('contact form: submit is disabled initially', async ({ page }) => {
  const submit = page.getByRole('button', { name: 'Send Message' });
  await expect(submit).toBeDisabled();
});

test('contact form: invalid email keeps submit disabled and shows error', async ({ page }) => {
  await page.getByLabel('Name').fill('Playwright Tester');
  await page.getByLabel('Email address').fill('not-an-email');
  await page.getByLabel('Message').fill('Hello from Playwright');

  const submit = page.getByRole('button', { name: 'Send Message' });
  await expect(submit).toBeDisabled();

  const emailError = page.getByRole('alert').filter({ hasText: 'Invalid email address' });
  await expect(emailError).toBeVisible({ timeout: 4000 });
});

test('contact form: valid inputs enable submit and show no validation alerts', async ({ page }) => {
  await page.getByLabel('Name').fill('Playwright Tester');
  await page.getByLabel('Email address').fill('user@example.com');
  await page.getByLabel('Message').fill('Hello from Playwright');

  const submitButton = page.getByRole('button', { name: 'Send Message' });
  await expect(submitButton).toBeEnabled();
});

test('contact form: max length validation errors keep submit disabled', async ({ page }) => {
  await page.getByLabel('Name').fill('a'.repeat(31));
  await page.getByLabel('Message').fill('a'.repeat(501));
  await page.getByLabel('Email address').fill('user@example.com');

  const submit = page.getByRole('button', { name: 'Send Message' });
  await expect(submit).toBeDisabled();

  const nameError = page.getByRole('alert').filter({ hasText: 'Name is to long' });
  const msgError = page.getByRole('alert').filter({ hasText: 'Message is to long' });
  await expect(nameError).toBeVisible({ timeout: 4000 });
  await expect(msgError).toBeVisible({ timeout: 4000 });
});
