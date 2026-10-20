import { createEnv } from '@t3-oss/env-nextjs';
import { vercel } from '@t3-oss/env-nextjs/presets-zod';
import * as z from 'zod/mini';

export const env = createEnv({
  server: {
    CONTENTFUL_SPACE_ID: z.string().check(z.minLength(1)),
    CONTENTFUL_ENVIRONMENT: z.string().check(z.minLength(1)),
    CONTENTFUL_PREVIEW_ACCESS_TOKEN: z.string().check(z.minLength(1)),
    CONTENTFUL_DELIVERY_ACCESS_TOKEN: z.string().check(z.minLength(1)),
    CONTENTFUL_REVALIDATE_SECRET: z.string().check(z.minLength(1)),
    TURNSTILE_SECRET_KEY: z.string().check(z.minLength(1)),
    MS_GRAPH_CLIENT_ID: z.string().check(z.minLength(1)),
    MS_GRAPH_CLIENT_SECRET: z.string().check(z.minLength(1)),
    MS_GRAPH_TENANT_ID: z.string().check(z.minLength(1)),
    MS_GRAPH_SENDER_EMAIL: z.string().check(z.minLength(1)),
  },
  extends: [vercel()],
  experimental__runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
