import { env } from '@/utils/env/env.server';
import mail from '@sendgrid/mail';

mail.setApiKey(env.SENDGRID_API_KEY);

export async function sendEmail(name: string, email: string, message: string): Promise<void> {
  const templateMessage = `
    Name: ${name}\r\n
    Email: ${email}\r\n
    Message: ${message}
  `;

  await mail.send({
    to: 'hello@hugomendez.dev',
    from: 'hello@hugomendez.dev',
    subject: 'New message from portfolio contact form!',
    text: templateMessage,
    html: templateMessage.replace(/\r\n/g, '<br>'),
  });
}
