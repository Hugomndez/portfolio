import { createEnv } from '@t3-oss/env-nextjs';
import * as z from 'zod/mini';

export const env = createEnv({
  client: {
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().check(z.minLength(1)),
  },
  runtimeEnv: {
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  },
  emptyStringAsUndefined: true,
});
