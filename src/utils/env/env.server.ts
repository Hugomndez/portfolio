import { createEnv } from '@t3-oss/env-nextjs';
import { vercel } from '@t3-oss/env-nextjs/presets-zod';
import { z } from 'zod';

export const env = createEnv({
  server: {
    TURNSTILE_SECRET_KEY: z.string().min(1),
    SENDGRID_API_KEY: z.string().min(1),
    CONTENTFUL_SPACE_ID: z.string().min(1),
    CONTENTFUL_ENVIRONMENT: z.string().min(1),
    CONTENTFUL_PREVIEW_ACCESS_TOKEN: z.string().min(1),
    CONTENTFUL_DELIVERY_ACCESS_TOKEN: z.string().min(1),
  },
  extends: [vercel()],
  experimental__runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
