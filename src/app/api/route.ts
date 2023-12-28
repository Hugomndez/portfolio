import { NextResponse } from 'next/server';
import { validateRecaptcha } from 'services/captchaService';
import { sendEmail } from 'services/emailService';
import { z } from 'zod';

const requestSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
  token: z.string(),
});

function handleError(error: any): NextResponse {
  if (error instanceof Error) {
    return new NextResponse(JSON.stringify({ name: error.message }), { status: 500 });
  }
  return new NextResponse(JSON.stringify({ name: 'Unknown error' }), { status: 500 });
}

export async function POST(request: Request) {
  const requestData = await request.json();

  const validationResult = requestSchema.safeParse(requestData);

  if (!validationResult.success) {
    return new NextResponse(
      JSON.stringify({ name: 'Invalid request data: Please provide the required fields' }),
      { status: 422 }
    );
  }

  const { name, email, message, token } = validationResult.data;

  try {
    const captchaValidation = await validateRecaptcha(token);

    if (!captchaValidation.success) {
      return new NextResponse(JSON.stringify({ name: 'Invalid captcha code. Please try again.' }), {
        status: 422,
      });
    }

    await sendEmail(name, email, message);
    return new NextResponse(JSON.stringify({ name: 'Ok' }), { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}
