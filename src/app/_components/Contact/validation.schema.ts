import * as z from 'zod/mini';

export const validationSchema = z.object({
  name: z.string().check(z.minLength(1, 'Name is required'), z.maxLength(30, 'Name is too long')),
  email: z
    .email('Invalid email address')
    .check(z.minLength(1, 'Email is required'), z.trim(), z.toLowerCase()),
  message: z
    .string()
    .check(z.minLength(1, 'Message is required'), z.maxLength(500, 'Message is too long')),
  token: z.string().check(z.minLength(1, 'Token is required')),
});

export type ValidationSchema = z.infer<typeof validationSchema>;
