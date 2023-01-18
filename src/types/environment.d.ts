declare namespace NodeJS {
  export interface ProcessEnv {
    readonly VERCEL_ENV: string;

    readonly NEXTAUTH_URL: string;

    readonly SENDGRID_API_KEY: string;

    readonly NEXT_PUBLIC_RECAPTCHA_SITE_KEY: string;
    readonly RECAPTCHA_SECRET_KEY: string;
  }
}
