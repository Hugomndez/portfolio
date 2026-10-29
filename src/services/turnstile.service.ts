import 'server-only';

import env from '@/utils/env/env.server';
import type { TurnstileServerValidationResponse } from '@marsidev/react-turnstile';

const verifyEndpoint = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const TURNSTILE_TIMEOUT_MS = 5000;

export default async function validateTurnstileToken(
  token: string,
): Promise<TurnstileServerValidationResponse> {
  const formData = new FormData();
  formData.append('secret', env.TURNSTILE_SECRET_KEY);
  formData.append('response', token);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TURNSTILE_TIMEOUT_MS);

  try {
    const result = await fetch(verifyEndpoint, {
      body: formData,
      method: 'POST',
      signal: controller.signal,
    });

    if (!result.ok) {
      const text = await result.text().catch(() => '<unreadable>');
      console.error('Turnstile verify returned non-2xx', result.status, text);
      throw new Error('verification service error');
    }

    const outcome = (await result.json()) as TurnstileServerValidationResponse;

    if (!outcome.success) {
      console.warn('Turnstile verification failed', { errors: outcome['error-codes'] });
      throw new Error('Invalid captcha token');
    }

    return outcome;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('Turnstile verification timed out');
      throw new Error('Captcha verification timed out', { cause: error });
    }
    console.error('Turnstile verification error', error);
    throw new Error('Captcha verification failed', { cause: error });
  } finally {
    clearTimeout(timeout);
  }
}
