import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/#contact');
});

test('contact form: submit is disabled initially', async ({ page }) => {
  // No accessibility alerts should be present initially
  const form = page.getByTestId('contact-form');
  await expect(form.getByRole('alert')).toHaveCount(0);

  // Inputs are not marked invalid and have no described-by
  const nameInput = page.getByLabel('Name');
  await expect(nameInput).not.toHaveAttribute('aria-invalid', 'true');
  await expect(nameInput).not.toHaveAttribute('aria-describedby', /.+/);

  const emailInput = page.getByLabel('Email address');
  await expect(emailInput).not.toHaveAttribute('aria-invalid', 'true');
  await expect(emailInput).not.toHaveAttribute('aria-describedby', /.+/);

  const messageInput = page.getByLabel('Message');
  await expect(messageInput).not.toHaveAttribute('aria-invalid', 'true');
  await expect(messageInput).not.toHaveAttribute('aria-describedby', /.+/);

  // Submit should be disabled
  const submit = page.getByRole('button', { name: 'Send Message' });
  await expect(submit).toBeDisabled();
});

test('contact form: invalid email keeps submit disabled and shows input email error', async ({
  page,
}) => {
  await page.getByLabel('Name').fill('Playwright Tester');
  await page.getByLabel('Email address').fill('not-an-email');
  await page.getByLabel('Message').fill('Hello from Playwright');

  // One alert should be present for invalid email
  const form = page.getByTestId('contact-form');
  await expect(form.getByRole('alert')).toHaveCount(1);

  const emailAlert = page.getByTestId('email-error');
  await expect(emailAlert).toBeVisible();
  await expect(emailAlert).toHaveAttribute('role', 'alert');
  await expect(emailAlert).toHaveAttribute('aria-live', 'polite');

  // Name should not have alerts and remain non-invalid
  const nameInput = page.getByLabel('Name');
  await expect(nameInput).not.toHaveAttribute('aria-invalid', 'true');
  await expect(nameInput).not.toHaveAttribute('aria-describedby', /.+/);

  const nameError = page.getByTestId('name-error');
  await expect(nameError).not.toHaveAttribute('role', 'alert');
  await expect(nameError).toHaveAttribute('aria-hidden', 'true');

  // Message should not have alerts and remain non-invalid
  const messageInput = page.getByLabel('Message');
  await expect(messageInput).not.toHaveAttribute('aria-invalid', 'true');
  await expect(messageInput).not.toHaveAttribute('aria-describedby', /.+/);

  const msgError = page.getByTestId('message-error');
  await expect(msgError).not.toHaveAttribute('role', 'alert');
  await expect(msgError).toHaveAttribute('aria-hidden', 'true');

  // Submit should remain disabled
  const submit = page.getByRole('button', { name: 'Send Message' });
  await expect(submit).toBeDisabled();
});

test('contact form: valid inputs enable submit and show no validation alerts', async ({ page }) => {
  await page.getByLabel('Name').fill('Playwright Tester');
  await page.getByLabel('Email address').fill('user@example.com');
  await page.getByLabel('Message').fill('Hello from Playwright');

  // No accessibility alerts should be present initially
  const form = page.getByTestId('contact-form');
  await expect(form.getByRole('alert')).toHaveCount(0);

  // Inputs should not be marked invalid nor reference error descriptions
  const nameInput = page.getByLabel('Name');
  await expect(nameInput).not.toHaveAttribute('aria-invalid', 'true');
  await expect(nameInput).not.toHaveAttribute('aria-describedby', /.+/);

  const emailInput = page.getByLabel('Email address');
  await expect(emailInput).not.toHaveAttribute('aria-invalid', 'true');
  await expect(emailInput).not.toHaveAttribute('aria-describedby', /.+/);

  const msgInput = page.getByLabel('Message');
  await expect(msgInput).not.toHaveAttribute('aria-invalid', 'true');
  await expect(msgInput).not.toHaveAttribute('aria-describedby', /.+/);

  // Submit should be enabled
  const submitButton = page.getByRole('button', { name: 'Send Message' });
  await expect(submitButton).toBeEnabled();
});

test('contact form: max length validation errors keep submit disabled and show input length errors', async ({
  page,
}) => {
  await page.getByLabel('Name').fill('a'.repeat(31));
  await page.getByLabel('Email address').fill('user@example.com');
  await page.getByLabel('Message').fill('a'.repeat(501));

  // Two alerts should be present: name and message length errors
  const form = page.getByTestId('contact-form');
  await expect(form.getByRole('alert')).toHaveCount(2);

  // Name field error
  const nameInput = page.getByLabel('Name');
  await expect(nameInput).toHaveAttribute('aria-invalid', 'true');
  await expect(nameInput).toHaveAttribute('aria-describedby', 'name-error');

  const nameAlert = page.getByTestId('name-error');
  await expect(nameAlert).toBeVisible();
  await expect(nameAlert).toHaveAttribute('role', 'alert');
  await expect(nameAlert).toHaveAttribute('aria-live', 'polite');

  // Message field error
  const msgInput = page.getByLabel('Message');
  await expect(msgInput).toHaveAttribute('aria-invalid', 'true');
  await expect(msgInput).toHaveAttribute('aria-describedby', 'message-error');
  const msgAlert = page.getByTestId('message-error');
  await expect(msgAlert).toBeVisible();
  await expect(msgAlert).toHaveAttribute('role', 'alert');
  await expect(msgAlert).toHaveAttribute('aria-live', 'polite');

  // Email remains valid, no alert
  const emailInput = page.getByLabel('Email address');
  await expect(emailInput).not.toHaveAttribute('aria-invalid', 'true');
  await expect(emailInput).not.toHaveAttribute('aria-describedby', /.+/);
  const emailError = page.getByTestId('email-error');
  await expect(emailError).not.toHaveAttribute('role', 'alert');
  await expect(emailError).toHaveAttribute('aria-hidden', 'true');

  // Submit remains disabled
  const submit = page.getByRole('button', { name: 'Send Message' });
  await expect(submit).toBeDisabled();
});
