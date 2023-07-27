import mail from '@sendgrid/mail';
import { NextResponse } from 'next/server';

type ReCAPTCHAResponse = {
  success: boolean;
  status_code: number;
  error_codes?: Array<string>;
};

mail.setApiKey(process.env.SENDGRID_API_KEY);

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const { name, email, message, token } = await request.json();

  if (!name || !email || !message || !token) {
    return new NextResponse(
      JSON.stringify({ name: 'Unproccesable request, please provide the required fields' }),
      { status: 422 }
    );
  }

  const templateMessage = `
      Name: ${name}\r\n
      Email: ${email}\r\n
      Message: ${message}
     `;

  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
        method: 'POST',
      }
    );
    const captchaValidation = (await response.json()) as ReCAPTCHAResponse;

    if (captchaValidation.success) {
      try {
        await mail.send({
          to: 'hello@hugomendez.dev',
          from: 'hello@hugomendez.dev',
          subject: 'New message from portfolio contact form!',
          text: templateMessage,
          html: templateMessage.replace(/\r\n/g, '<br>'),
        });
      } catch (error) {
        if (error instanceof Error) {
          return new NextResponse(JSON.stringify({ name: error.message }), { status: 500 });
        }
      }
      return new NextResponse(JSON.stringify({ name: 'Ok' }), { status: 200 });
    } else {
      return new NextResponse(
        JSON.stringify({ name: 'Unproccesable request, Invalid captcha code' }),
        { status: 422 }
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(JSON.stringify({ name: error.message }), { status: 500 });
    }
  }
}
