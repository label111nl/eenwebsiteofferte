# FreelancerHub Setup Guide

## Prerequisites

- Node.js 18 or higher
- npm 7 or higher
- A Stripe account for payment processing
- A KvK API key for Dutch business verification
- A Twilio account for WhatsApp notifications

## Installation

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your environment variables:
   ```bash
   cp .env.example .env
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

- `VITE_API_URL`: URL of your backend API
- `VITE_WS_URL`: WebSocket URL for real-time features
- `VITE_STRIPE_PUBLIC_KEY`: Your Stripe publishable key
- `VITE_KVK_API_KEY`: Your KvK API key
- `VITE_TWILIO_ACCOUNT_SID`: Your Twilio account SID
- `VITE_TWILIO_AUTH_TOKEN`: Your Twilio auth token
- `VITE_TWILIO_WHATSAPP_NUMBER`: Your Twilio WhatsApp number

## Features

### Chat System
The chat system uses WebSocket for real-time communication between freelancers and clients. Messages are stored in the database and support:
- Real-time messaging
- Read receipts
- Typing indicators
- File attachments (coming soon)

### Payment System
Payments are handled through Stripe and support:
- Lead purchases
- Subscription payments
- Automatic invoice generation
- Payment status webhooks

### Support System
The support ticket system allows:
- Creating tickets with priority levels
- File attachments
- Admin responses
- Status tracking
- Email notifications

## Development Guidelines

1. Code Style
   - Use TypeScript for type safety
   - Follow ESLint rules
   - Use Prettier for formatting

2. Git Workflow
   - Create feature branches from `main`
   - Use conventional commits
   - Submit PRs for review

3. Testing
   - Write unit tests for utilities
   - Write integration tests for components
   - Test all user flows

## Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. The build output will be in the `dist` directory

3. Configure your hosting provider with the required environment variables

4. Deploy the static files from the `dist` directory

## Troubleshooting

Common issues and solutions:

1. WebSocket Connection Failed
   - Check if the WebSocket server is running
   - Verify the `VITE_WS_URL` environment variable
   - Check for firewall issues

2. Payment Processing Issues
   - Verify Stripe configuration
   - Check webhook endpoints
   - Review Stripe dashboard for errors

3. Chat System Issues
   - Clear browser cache
   - Check WebSocket connection
   - Verify user authentication

## Support

For technical support:
1. Check the documentation
2. Create a GitHub issue
3. Contact the development team

## License

Proprietary software. All rights reserved.