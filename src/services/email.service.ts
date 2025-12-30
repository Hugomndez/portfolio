import { env } from '@/utils/env/env.server';
import * as msal from '@azure/msal-node';

const msalClient = new msal.ConfidentialClientApplication({
  auth: {
    clientId: env.MS_GRAPH_CLIENT_ID,
    clientSecret: env.MS_GRAPH_CLIENT_SECRET,
    authority: `https://login.microsoftonline.com/${env.MS_GRAPH_TENANT_ID}`,
  },
});

async function getAccessToken(): Promise<string> {
  const response = await msalClient.acquireTokenByClientCredential({
    scopes: ['https://graph.microsoft.com/.default'],
  });

  if (!response || !response.accessToken) {
    throw new Error('Failed to acquire access token for Microsoft Graph API');
  }

  return response.accessToken;
}

export async function sendEmail(name: string, email: string, message: string): Promise<void> {
  const accessToken = await getAccessToken();
  const emailAdminAddress = env.MS_GRAPH_SENDER_EMAIL;

  const emailMessage = {
    message: {
      subject: 'New Portfolio Contact Form Submission',
      body: {
        contentType: 'Text',
        content: `Name: ${name}\r\nEmail: ${email}\r\nMessage: ${message}`,
      },
      toRecipients: [
        {
          emailAddress: {
            address: emailAdminAddress,
          },
        },
      ],
      replyTo: [
        {
          emailAddress: {
            address: email,
          },
        },
      ],
    },
    saveToSentItems: false,
  };

  const response = await fetch(
    `https://graph.microsoft.com/v1.0/users/${emailAdminAddress}/sendMail`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(emailMessage),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to send email via Microsoft Graph API');
  }
}
