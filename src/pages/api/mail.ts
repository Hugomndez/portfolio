import mail from '@sendgrid/mail';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  status: string;
};

mail.setApiKey(process.env.SENDGRID_API_KEY!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const body = JSON.parse(req.body);

    const message = `
      Name: ${body.name}\r\n
      Email: ${body.email}\r\n
      Message: ${body.message}
     `;

    try {
      await mail.send({
        to: 'hello@hugomendez.dev',
        from: 'hello@hugomendez.dev',
        subject: 'New message from portfolio contact form!',
        text: message,
        html: message.replace(/\r\n/g, '<br>'),
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ status: error.message });
      }
    }

    res.status(200).json({ status: 'Ok' });
  } else {
    return res.status(400).end(`${res.statusCode} Bad Request`);
  }
}
