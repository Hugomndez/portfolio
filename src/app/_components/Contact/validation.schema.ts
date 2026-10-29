import type { output } from 'zod/mini';
import { email, maxLength, minLength, object, string, toLowerCase, trim } from 'zod/mini';

export const validationSchema = object({
  name: string().check(minLength(1, 'Name is required'), maxLength(30, 'Name is too long')),
  email: email('Invalid email address').check(
    minLength(1, 'Email is required'),
    trim(),
    toLowerCase(),
  ),
  message: string().check(
    minLength(1, 'Message is required'),
    maxLength(500, 'Message is too long'),
  ),
  token: string().check(minLength(1, 'Token is required')),
});

export type ValidationSchema = output<typeof validationSchema>;
