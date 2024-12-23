import axios from 'axios';
import { sendWhatsAppNotification, formatLeadNotification } from './whatsapp';

interface NotificationPreferences {
  whatsapp?: string;
  email?: string;
  webhook_url?: string;
  telegram?: string;
  zapier_webhook?: string;
  make_webhook?: string;
}

interface NotificationPayload {
  type: 'lead' | 'message' | 'payment';
  data: any;
}

export async function updateNotificationPreferences(preferences: NotificationPreferences) {
  try {
    const response = await axios.post('/api/notifications/preferences', preferences);
    return response.data;
  } catch (error) {
    console.error('Error updating notification preferences:', error);
    throw error;
  }
}

export async function sendNotification(payload: NotificationPayload, preferences: NotificationPreferences) {
  try {
    const notifications = [];

    // WhatsApp notification
    if (preferences.whatsapp) {
      const message = formatLeadNotification(payload.data);
      notifications.push(
        sendWhatsAppNotification({
          to: preferences.whatsapp,
          body: message,
        })
      );
    }

    // Zapier webhook
    if (preferences.zapier_webhook) {
      notifications.push(
        axios.post(preferences.zapier_webhook, payload)
      );
    }

    // Make webhook
    if (preferences.make_webhook) {
      notifications.push(
        axios.post(preferences.make_webhook, payload)
      );
    }

    // Wait for all notifications to be sent
    await Promise.all(notifications);
    return true;
  } catch (error) {
    console.error('Error sending notifications:', error);
    return false;
  }
}

export async function testNotificationChannel(channel: string, value: string) {
  try {
    switch (channel) {
      case 'whatsapp':
        return await sendWhatsAppNotification({
          to: value,
          body: '👋 Dit is een test notificatie van FreelancerHub. Als je dit bericht ontvangt, zijn je WhatsApp notificaties correct ingesteld!',
        });
      case 'webhook':
        return await axios.post(value, {
          test: true,
          timestamp: new Date().toISOString(),
        });
      default:
        throw new Error(`Unknown notification channel: ${channel}`);
    }
  } catch (error) {
    console.error(`Error testing ${channel}:`, error);
    throw error;
  }
}