import type { ValidationSchema } from './validation.schema';

const initFormValues = {
  name: '',
  email: '',
  message: '',
  token: '',
} as const satisfies ValidationSchema;

export default initFormValues;
