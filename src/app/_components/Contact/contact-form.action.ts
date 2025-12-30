'use server';

import { sendEmail } from '@/services/email.service';
import { validateTurnstileToken } from '@/services/turnstile.service';
import { serverValidationSchema } from './validation.schema';

export async function contactFormAction(formData: FormData) {
  const rawFormData = Object.fromEntries(formData);

  const { data, error } = serverValidationSchema.safeParse(rawFormData);

  if (error) {
    throw new Error('Invalid request data: Please provide the required fields');
  }

  try {
    await validateTurnstileToken(data.token);
    await sendEmail(data.name, data.email, data.message);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Internal server error');
    }

    throw new Error('Unknown error');
  }
}
