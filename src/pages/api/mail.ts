import mail from '@sendgrid/mail';
import { type NextApiRequest, type NextApiResponse } from 'next';

type Data = {
  status: string;
};

type ReCAPTCHAResponse = {
  success: boolean;
  status_code: number;
  error_codes?: Array<string>;
};

mail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { name, email, message, captcha } = JSON.parse(req.body);

    if (!name || !email || !message || !captcha) {
      return res.status(422).json({
        status: 'Unproccesable request, please provide the required fields',
      });
    }

    const templateMessage = `
      Name: ${name}\r\n
      Email: ${email}\r\n
      Message: ${message}
     `;

    try {
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`,
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
            res.status(500).json({ status: error.message });
          }
        }
        res.status(200).json({ status: 'Ok' });
      } else {
        return res.status(422).json({
          status: 'Unproccesable request, Invalid captcha code',
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ status: error.message });
      }
    }
  } else {
    return res.status(400).end(`${res.statusCode} Bad Request`);
  }
}
