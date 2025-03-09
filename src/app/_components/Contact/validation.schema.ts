import { z } from 'zod';

export const validationSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).max(30, 'Name is to long'),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Sorry, invalid format here' }),
  message: z.string().min(1, { message: 'Message is required' }),
});

export type ValidationSchema = z.infer<typeof validationSchema>;

export const serverValidationSchema = validationSchema.extend({
  token: z.string().min(1, { message: 'Token is required' }),
});
