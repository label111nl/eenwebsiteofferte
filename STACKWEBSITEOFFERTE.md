# FreelancerHub - Technical Documentation

## Project Structure

### Core Components

```
src/
├── components/           # Reusable components
│   ├── AdminPanel/      # Admin dashboard components
│   ├── Chat/           # Real-time chat components
│   ├── LeadPayment/    # Payment processing components
│   └── ui/             # Base UI components
├── contexts/           # React contexts
├── hooks/             # Custom React hooks
├── pages/             # Page components
├── services/          # External services integration
├── translations/      # i18n files
├── types/            # TypeScript types
└── utils/            # Utility functions
```

### Dashboard Flows

1. Admin Dashboard
   - Location: `/src/pages/Admin/Dashboard.tsx`
   - Components:
     - Analytics (`/components/AdminPanel/Analytics.tsx`)
     - FreelancerApproval (`/components/AdminPanel/FreelancerApproval.tsx`)
     - StripeSettings (`/components/AdminPanel/StripeSettings.tsx`)
     - SubscriptionPlans (`/components/AdminPanel/SubscriptionPlans.tsx`)

2. Freelancer Dashboard
   - Location: `/src/pages/Freelancer/Dashboard.tsx`
   - Components:
     - LeadList (`/components/LeadList.tsx`)
     - MarketIntelligence (`/components/MarketIntelligence/MarketDashboard.tsx`)
     - Chat (`/components/Chat/ChatWindow.tsx`)

3. Client Dashboard
   - Location: `/src/pages/Client/Dashboard.tsx`
   - Components:
     - ProjectList (`/components/Client/ProjectList.tsx`)
     - FreelancerResponses (`/components/Client/FreelancerResponses.tsx`)

## Installation on VPS

1. Prerequisites
```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Install PM2
npm install -g pm2
```

2. Project Setup
```bash
# Clone repository
git clone [repository-url]
cd freelancerhub

# Install dependencies
npm install

# Build project
npm run build

# Start with PM2
pm2 start npm --name "freelancerhub" -- start
```

3. Nginx Configuration
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## WordPress Integration

1. Install Required WordPress Plugins
   - Advanced Custom Fields PRO
   - Fluent Forms
   - WP GraphQL
   - WP GraphQL for Advanced Custom Fields

2. Configure WordPress REST API
```php
// Add to functions.php
add_action('rest_api_init', function () {
    register_rest_route('freelancerhub/v1', '/leads', array(
        'methods' => 'GET',
        'callback' => 'get_leads',
        'permission_callback' => function () {
            return current_user_can('edit_posts');
        }
    ));
});
```

3. Set up ACF Fields
   - Create field group for leads
   - Add fields: title, description, budget, deadline
   - Enable GraphQL for the field group

4. Configure Fluent Forms
   - Create lead submission form
   - Set up webhook notifications
   - Configure email templates

5. Frontend Integration
```typescript
// src/services/wordpress.ts
export const fetchLeads = async () => {
  const response = await fetch(`${WORDPRESS_API_URL}/wp-json/freelancerhub/v1/leads`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.json();
};
```

## Security Considerations

1. API Security
   - JWT authentication
   - Rate limiting
   - CORS configuration
   - Input validation

2. WordPress Security
   - Limit login attempts
   - Use security plugins
   - Keep plugins updated
   - Configure firewall rules

3. Data Protection
   - Encrypt sensitive data
   - Regular backups
   - GDPR compliance
   - Secure file uploads

## Monitoring

1. Error Tracking
   - Sentry integration
   - Error boundaries
   - Custom error logging

2. Performance Monitoring
   - Server metrics
   - API response times
   - User interactions

3. Analytics
   - User behavior
   - Conversion rates
   - Lead statistics

## Deployment Checklist

1. Environment Setup
   - Configure environment variables
   - Set up SSL certificates
   - Configure domain DNS

2. Build Process
   - Run tests
   - Build frontend
   - Optimize assets

3. Database
   - Run migrations
   - Verify backups
   - Check indexes

4. Post-Deployment
   - Verify all features
   - Check monitoring
   - Test notifications