# FreelancerHub - Lead Management Platform

## Project Overview
FreelancerHub is a comprehensive platform connecting freelancers with clients through a lead-based system. The platform features role-based access (Admin, Freelancer, Client), smart lead matching, and integrated payment processing.

## Quick Start

### Installation
```bash
npm install
npm run dev
```

### Test Accounts
- Admin: admin@freelancerhub.com / admin123
- Freelancer: freelancer@test.com / admin123
- Client: business@test.com / admin123

## Project Structure

### Core Components
- `/src/components/` - Reusable UI components
  - `/AdminPanel/` - Admin-specific components
  - `/Chat/` - Real-time chat functionality
  - `/LeadPayment/` - Payment processing components
  - `/ui/` - Base UI components (Button, Card, Input, etc.)

### Features

#### Authentication & Authorization
- Location: `/src/contexts/AuthContext.tsx`
- Handles user authentication and role-based access
- JWT-based authentication

#### Lead Management
- Location: `/src/pages/Leads/`
- Features:
  - Lead listing and filtering
  - Lead response system
  - Payment integration
  - Maximum response limits

#### Chat System
- Location: `/src/components/Chat/`
- Features:
  - Real-time messaging
  - Unread message indicators
  - Emoji support
  - Message history

#### Smart Lead Matching
- Location: `/src/components/SmartLeadMatching/`
- Matches leads with freelancers based on:
  - Skills compatibility
  - Budget range
  - Success rate

#### Notification System
- Location: `/src/services/notifications.ts`
- Supports:
  - WhatsApp notifications (Twilio)
  - Zapier integration
  - Make.com integration
  - Custom webhooks

#### KvK Integration
- Location: `/src/services/kvk.ts`
- Dutch Chamber of Commerce verification
- Automatic company data fetching

### Key Files

#### API Integration
- `/src/api/index.ts` - Core API functions
- `/src/api/auth.ts` - Authentication endpoints
- `/src/api/mockData.ts` - Development mock data

#### Context Providers
- `/src/contexts/AuthContext.tsx` - Authentication state
- `/src/contexts/ChatContext.tsx` - Chat functionality
- `/src/contexts/TranslationContext.tsx` - Internationalization

#### Services
- `/src/services/socket.ts` - WebSocket management
- `/src/services/notifications.ts` - Notification handling
- `/src/services/whatsapp.ts` - WhatsApp integration
- `/src/services/kvk.ts` - KvK API integration

## Development Guidelines

### Adding New Features
1. Create components in appropriate directories
2. Update types in `/src/types/`
3. Add API endpoints in `/src/api/`
4. Update translations in `/src/translations/`

### Styling
- Uses Tailwind CSS for styling
- Custom components in `/src/components/ui/`
- Consistent spacing and color schemes

### State Management
- React Query for server state
- Context for global state
- Local state for component-specific data

### Testing
- Component testing with Vitest
- API mocking for development
- End-to-end testing (TODO)

## Environment Variables
```env
VITE_API_URL=
VITE_WS_URL=
VITE_STRIPE_PUBLIC_KEY=
VITE_KVK_API_KEY=
VITE_TWILIO_ACCOUNT_SID=
VITE_TWILIO_AUTH_TOKEN=
VITE_TWILIO_WHATSAPP_NUMBER=
```

## Deployment
- Build command: `npm run build`
- Output directory: `dist/`
- Static file hosting required
- Environment variable configuration needed

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License
Proprietary software. All rights reserved.