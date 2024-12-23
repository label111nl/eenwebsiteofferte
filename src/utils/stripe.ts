import { loadStripe } from '@stripe/stripe-js';
import { env } from '../config/environment';

export const stripePromise = loadStripe(env.VITE_STRIPE_PUBLIC_KEY || '');

export const createPaymentSession = async (leadId: string, amount: number) => {
  try {
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe failed to initialize');

    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        leadId,
        amount,
      }),
    });

    if (!response.ok) {
      throw new Error('Payment session creation failed');
    }

    const session = await response.json();
    
    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (error) {
      throw error;
    }

    return session;
  } catch (error) {
    console.error('Payment error:', error);
    throw error;
  }
};

export const handlePaymentSuccess = async (sessionId: string) => {
  try {
    const response = await fetch('/api/verify-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId }),
    });

    if (!response.ok) {
      throw new Error('Payment verification failed');
    }

    return response.json();
  } catch (error) {
    console.error('Payment verification error:', error);
    throw error;
  }
};