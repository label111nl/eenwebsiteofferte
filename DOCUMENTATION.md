# FreelancerHub - Technical Documentation

## Project Overview

FreelancerHub is a platform connecting freelancers with clients through a lead-based system. The platform features:

- Role-based access (Admin, Freelancer, Client)
- Smart lead matching
- Real-time chat
- Payment processing
- Multi-language support (NL/EN)
- Notification system with multiple channels

## Core Features

### 1. Authentication & User Management

Location: `/src/contexts/AuthContext.tsx`
- JWT-based authentication
- Role-based access control
- Session management

Test Accounts:
```
Admin: admin@freelancerhub.com / admin123
Freelancer: freelancer@test.com / admin123
Client: business@test.com / admin123
```

### 2. Lead Management System

#### Freelancer View
- Available leads listing
- Lead response system
- Payment integration
- Maximum response limits

#### Client View
- Project posting
- Freelancer response management
- Chat with freelancers

#### Admin View
- Lead approval system
- Lead pricing
- Response limit management

### 3. Smart Features

#### Lead Matching
Location: `/src/components/SmartLeadMatching/`
- Skills compatibility matching
- Budget range analysis
- Success rate tracking

#### Trust & Verification
Location: `/src/components/TrustVerification/`
- KvK verification
- Portfolio verification
- Skills assessment

#### Market Intelligence
Location: `/src/components/MarketIntelligence/`
- Market trend analysis
- Competitive insights
- Rate recommendations

### 4. Communication System

#### Chat System
Location: `/src/components/Chat/`
- Real-time messaging
- Unread indicators
- Emoji support
- Message history

#### Notification System
Location: `/src/services/notifications.ts`
- WhatsApp integration (Twilio)
- Zapier webhooks
- Make.com integration
- Custom webhook support

## Technical Implementation

### Frontend Architecture

1. **State Management**
   - React Query for server state
   - Context API for global state
   - Local state for component-specific data

2. **UI Components**
   - Custom component library in `/src/components/ui/`
   - Tailwind CSS for styling
   - Framer Motion for animations

3. **API Integration**
   - Axios for HTTP requests
   - Socket.io for real-time features
   - Mock data for development

### Key Integrations

1. **KvK Integration**
Location: `/src/services/kvk.ts`
```typescript
interface KvKCompany {
  kvkNumber: string;
  tradeNames: {
    businessName: string;
    shortBusinessName: string;
  };
  addresses: Array<{
    type: string;
    street: string;
    houseNumber: string;
    postalCode: string;
    city: string;
    country: string;
  }>;
}
```

2. **WhatsApp Notifications**
Location: `/src/services/whatsapp.ts`
```typescript
interface WhatsAppMessage {
  to: string;
  body: string;
}
```

3. **Payment Processing**
Location: `/src/components/LeadPayment/`
- Stripe integration
- Payment verification
- Invoice generation

### Folder Structure

```
src/
├── api/                 # API integration
├── components/          # Reusable components
│   ├── AdminPanel/     # Admin-specific components
│   ├── Chat/           # Chat components
│   ├── LeadPayment/    # Payment components
│   └── ui/             # Base UI components
├── contexts/           # React contexts
├── pages/              # Page components
│   ├── Admin/         # Admin pages
│   ├── Client/        # Client pages
│   └── Freelancer/    # Freelancer pages
├── services/          # External services
├── translations/      # i18n files
└── types/            # TypeScript types
```

## Environment Variables

Required environment variables:
```env
VITE_API_URL=                 # Backend API URL
VITE_WS_URL=                  # WebSocket URL
VITE_STRIPE_PUBLIC_KEY=       # Stripe public key
VITE_KVK_API_KEY=            # KvK API key
VITE_TWILIO_ACCOUNT_SID=     # Twilio account SID
VITE_TWILIO_AUTH_TOKEN=      # Twilio auth token
VITE_TWILIO_WHATSAPP_NUMBER= # Twilio WhatsApp number
```

## Development Guidelines

### Adding New Features

1. Create components in appropriate directories
2. Update types in `/src/types/`
3. Add API endpoints in `/src/api/`
4. Update translations in `/src/translations/`

### Code Style

- Use TypeScript for type safety
- Follow React hooks best practices
- Implement proper error handling
- Add comments for complex logic
- Use consistent naming conventions

### Testing

- Component testing with Vitest
- API mocking for development
- End-to-end testing (planned)

## Deployment

Build command: `npm run build`
Output directory: `dist/`

Requirements:
- Node.js 18+
- Environment variables configured
- Static file hosting
- WebSocket support

## Future Improvements

1. Enhanced Lead Matching
   - AI-powered matching
   - Historical data analysis
   - Success rate predictions

2. Advanced Analytics
   - Revenue tracking
   - Conversion metrics
   - User behavior analysis

3. Additional Integrations
   - More payment providers
   - Additional notification channels
   - CRM integrations

## Support

For technical support or feature requests:
1. Check existing documentation
2. Contact technical team
3. Submit detailed bug reports

## License

Proprietary software. All rights reserved.