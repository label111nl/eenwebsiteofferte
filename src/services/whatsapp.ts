import { Twilio } from 'twilio';

const client = new Twilio(
  import.meta.env.VITE_TWILIO_ACCOUNT_SID,
  import.meta.env.VITE_TWILIO_AUTH_TOKEN
);

const TWILIO_WHATSAPP_NUMBER = import.meta.env.VITE_TWILIO_WHATSAPP_NUMBER;

interface WhatsAppMessage {
  to: string;
  body: string;
}

export async function sendWhatsAppNotification({ to, body }: WhatsAppMessage) {
  try {
    const message = await client.messages.create({
      from: `whatsapp:${TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${to}`,
      body,
    });

    return {
      success: true,
      messageId: message.sid,
    };
  } catch (error) {
    console.error('Error sending WhatsApp notification:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export function formatLeadNotification(lead: any) {
  return `
🔔 Nieuwe Lead Beschikbaar!

Project: ${lead.title}
Budget: €${lead.budget.toLocaleString()}
Lead Prijs: €${lead.price.toLocaleString()}

Beschrijving:
${lead.description}

Reageer snel via het platform om deze lead niet te missen!
`;
}