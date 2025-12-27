import * as z from 'zod';

export const validationSchema = z.object({
  name: z.string().min(1, 'Name is required').max(30, 'Name is to long'),
  email: z
    .string()
    .min(1, 'Email is required')
    .trim()
    .toLowerCase()
    .pipe(z.email('Invalid email address')),
  message: z.string().min(1, 'Message is required'),
});

export type ValidationSchema = z.infer<typeof validationSchema>;

export const serverValidationSchema = z.object({
  ...validationSchema.shape,
  token: z.string().min(1, 'Token is required'),
});
