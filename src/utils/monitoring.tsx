import * as Sentry from '@sentry/react';
import React from 'react';

export const initializeMonitoring = () => {
  if (import.meta.env.PROD) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      integrations: [
        new Sentry.BrowserTracing({
          tracePropagationTargets: [
            "localhost",
            /^https:\/\/freelancerhub\.nl/,
          ],
        }),
        new Sentry.Replay(),
      ],
      tracesSampleRate: 1.0,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      environment: import.meta.env.MODE,
      beforeSend(event) {
        if (event.user) {
          delete event.user.ip_address;
          delete event.user.email;
        }
        return event;
      },
    });
  }
};

export const ErrorFallback = ({ error }: { error: Error }) => (
  <div style={{
    minHeight: '100vh',
    backgroundColor: '#F9FAFB',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '3rem 1.5rem'
  }}>
    <div style={{
      margin: '0 auto',
      maxWidth: '28rem',
      width: '100%',
      backgroundColor: 'white',
      padding: '2rem 1rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      borderRadius: '0.5rem',
      textAlign: 'center'
    }}>
      <h3 style={{
        fontSize: '1.125rem',
        fontWeight: 500,
        color: '#111827',
        marginBottom: '0.5rem'
      }}>
        Something went wrong
      </h3>
      <p style={{
        fontSize: '0.875rem',
        color: '#6B7280',
        marginBottom: '1rem'
      }}>
        {error?.message || 'An unexpected error occurred'}
      </p>
      <button
        onClick={() => window.location.reload()}
        style={{
          backgroundColor: '#4F46E5',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '0.375rem',
          fontSize: '0.875rem',
          fontWeight: 500,
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Refresh Page
      </button>
    </div>
  </div>
);

export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>
): React.ComponentType<P> => {
  return Sentry.withErrorBoundary(Component, {
    fallback: ErrorFallback,
  });
};

export const ErrorBoundary = Sentry.ErrorBoundary;
