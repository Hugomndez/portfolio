import { createEnv } from '@t3-oss/env-nextjs';
import { vercel } from '@t3-oss/env-nextjs/presets-zod';
import { minLength, string } from 'zod/mini';

export const env = createEnv({
  server: {
    CONTENTFUL_DELIVERY_ACCESS_TOKEN: string().check(minLength(1)),
    CONTENTFUL_ENVIRONMENT: string().check(minLength(1)),
    CONTENTFUL_PREVIEW_ACCESS_TOKEN: string().check(minLength(1)),
    CONTENTFUL_REVALIDATE_SECRET: string().check(minLength(1)),
    CONTENTFUL_SPACE_ID: string().check(minLength(1)),
    MS_GRAPH_CLIENT_ID: string().check(minLength(1)),
    MS_GRAPH_CLIENT_SECRET: string().check(minLength(1)),
    MS_GRAPH_SENDER_EMAIL: string().check(minLength(1)),
    MS_GRAPH_TENANT_ID: string().check(minLength(1)),
    TURNSTILE_SECRET_KEY: string().check(minLength(1)),
  },
  extends: [vercel()],
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: process.env,
});
