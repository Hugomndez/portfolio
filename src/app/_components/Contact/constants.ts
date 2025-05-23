import type { ValidationSchema } from './validation.schema';

export const initFormValues: ValidationSchema = {
  name: '',
  email: '',
  message: '',
};

export const RECAPTCHA_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
