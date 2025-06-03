import type { TurnstileServerValidationResponse } from '@marsidev/react-turnstile';

const verifyEndpoint = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const secret = process.env.TURNSTILE_SECRET_KEY;

export async function validateTurnstileToken(
  token: string
): Promise<TurnstileServerValidationResponse> {
  const formData = new FormData();
  formData.append('secret', secret);
  formData.append('response', token);

  const result = await fetch(verifyEndpoint, { body: formData, method: 'POST' });

  const outcome = (await result.json()) as TurnstileServerValidationResponse;

  if (!outcome.success) throw new Error('Invalid captcha code. Please try again.');

  return outcome;
}
