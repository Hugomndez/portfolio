'use server';

import { validateRecaptcha } from 'services/captchaService';
import { sendEmail } from 'services/emailService';
import { serverValidationSchema } from './validation.schema';

export async function contactFormAction(formData: FormData) {
  const rawFormData = Object.fromEntries(formData);

  const { data, error } = serverValidationSchema.safeParse(rawFormData);

  if (error) {
    throw new Error('Invalid request data: Please provide the required fields');
  }

  try {
    await validateRecaptcha(data.token);
    await sendEmail(data.name, data.email, data.message);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error('Unknown error');
  }
}
