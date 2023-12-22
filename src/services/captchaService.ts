type ReCAPTCHAResponse = {
  success: boolean;
  status_code: number;
  error_codes?: Array<string>;
};

export async function validateRecaptcha(token: string): Promise<ReCAPTCHAResponse> {
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      method: 'POST',
    }
  );
  return response.json() as Promise<ReCAPTCHAResponse>;
}
