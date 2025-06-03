declare namespace NodeJS {
  export interface ProcessEnv {
    readonly VERCEL_ENV: string;
    readonly NEXTAUTH_URL: string;
    readonly SENDGRID_API_KEY: string;
    readonly NEXT_PUBLIC_TURNSTILE_SITE_KEY: string;
    readonly TURNSTILE_SECRET_KEY: string;
  }
}
