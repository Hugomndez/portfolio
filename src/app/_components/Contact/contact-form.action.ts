'use server';

import { sendEmail } from '@/services/email.service';
import { validateTurnstileToken } from '@/services/turnstile.service';
import { serverValidationSchema } from './validation.schema';

export async function contactFormAction(formData: FormData) {
  const rawFormData = Object.fromEntries(formData);

  const { data, error } = serverValidationSchema.safeParse(rawFormData);

  if (error) {
    console.warn('Contact form validation failed', { issues: error.issues });
    throw new Error('Invalid request data: Please provide the required fields');
  }

  try {
    await validateTurnstileToken(data.token);
  } catch (error) {
    console.error('Turnstile validation failed', error);
    throw new Error('Captcha verification failed');
  }

  try {
    await sendEmail(data.name, data.email, data.message);
  } catch (error) {
    console.error('Failed to send contact email', error);
    throw new Error('Failed to send message, please try again later');
  }
}
