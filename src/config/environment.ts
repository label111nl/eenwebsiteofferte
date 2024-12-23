import { z } from 'zod';

const envSchema = z.object({
  VITE_API_URL: z.string().url().optional(),
  VITE_WS_URL: z.string().optional(),
  VITE_STRIPE_PUBLIC_KEY: z.string().optional(),
  VITE_KVK_API_KEY: z.string().optional(),
  VITE_TWILIO_ACCOUNT_SID: z.string().optional(),
  VITE_TWILIO_AUTH_TOKEN: z.string().optional(),
  VITE_TWILIO_WHATSAPP_NUMBER: z.string().optional(),
}).partial();

export const validateEnv = () => {
  try {
    return envSchema.parse(import.meta.env);
  } catch (error) {
    console.warn('Environment validation warning:', error);
    // In development, continue without throwing
    if (import.meta.env.DEV) {
      return {};
    }
    return {};
  }
};

export const env = validateEnv();