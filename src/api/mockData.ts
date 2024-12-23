import { Freelancer, Lead, Payment } from '../types';
import { WordPressForm, FormSubmission } from '../types/wordpress';
import { User } from '../types/auth';

// Mock users with different roles
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@freelancerhub.com',
    name: 'Admin User',
    role: 'admin',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    email: 'freelancer@test.com',
    name: 'John Doe',
    role: 'freelancer',
    created_at: '2024-02-20T12:00:00Z'
  },
  {
    id: '3',
    email: 'business@test.com',
    name: 'Jane Smith',
    role: 'client',
    created_at: '2024-02-21T12:00:00Z'
  }
];

export const mockFreelancer: Freelancer = {
  id: '2',
  name: 'John Doe',
  email: 'freelancer@test.com',
  phone: '+31612345678',
  status: 'active',
  subscription_type: 'monthly',
  bio: 'Experienced web developer specializing in React and Node.js',
  hourly_rate: 85,
  portfolio_items: [
    {
      id: '1',
      title: 'E-commerce Platform',
      description: 'Built a full-featured e-commerce platform using React and Node.js',
      image_url: 'https://images.unsplash.com/photo-1661956602116-aa6865609028',
      project_url: 'https://example.com',
      technologies: ['React', 'Node.js', 'MongoDB'],
      completion_date: '2024-01-15'
    }
  ],
  services: [
    {
      id: '1',
      name: 'Web Development',
      description: 'Custom web applications using modern technologies',
      price_range: {
        min: 5000,
        max: 15000
      },
      delivery_time: '4-6 weeks'
    }
  ],
  created_at: '2024-02-20T12:00:00Z'
};

export const mockLeads: Lead[] = [
  {
    id: '1',
    client_name: 'Acme Corp',
    client_email: 'contact@acme.com',
    project_description: 'E-commerce website redesign',
    budget: 15000,
    status: 'new',
    max_responses: 5,
    current_responses: 2,
    price: 250,
    created_at: '2024-02-20T10:00:00Z'
  },
  {
    id: '2',
    client_name: 'Tech Startup',
    client_email: 'hello@techstartup.com',
    project_description: 'Mobile app development',
    budget: 25000,
    status: 'assigned',
    freelancer_id: '2',
    max_responses: 5,
    current_responses: 5,
    price: 350,
    created_at: '2024-02-19T15:30:00Z'
  }
];

export const mockPayments: Payment[] = [
  {
    id: '1',
    freelancer_id: '2',
    amount: 250,
    type: 'lead',
    status: 'completed',
    lead_id: '1',
    created_at: '2024-02-20T14:00:00Z'
  },
  {
    id: '2',
    freelancer_id: '2',
    amount: 99,
    type: 'subscription',
    status: 'completed',
    created_at: '2024-02-01T00:00:00Z'
  }
];

export const mockForms: WordPressForm[] = [
  {
    id: 1,
    title: 'Project Request Form',
    fields: [
      {
        id: 'name',
        name: 'client_name',
        type: 'text',
        label: 'Your Name',
        required: true
      },
      {
        id: 'email',
        name: 'client_email',
        type: 'email',
        label: 'Email Address',
        required: true
      },
      {
        id: 'budget',
        name: 'budget',
        type: 'number',
        label: 'Project Budget',
        required: true
      }
    ],
    created_at: '2024-01-01T00:00:00Z'
  }
];

export const mockSubmissions: FormSubmission[] = [
  {
    id: 1,
    form_id: 1,
    data: {
      client_name: 'Jane Smith',
      client_email: 'jane@example.com',
      budget: '10000',
      status: 'new',
      message: 'Looking for a new website design'
    },
    created_at: '2024-02-20T09:00:00Z'
  },
  {
    id: 2,
    form_id: 1,
    data: {
      client_name: 'Bob Johnson',
      client_email: 'bob@example.com',
      budget: '5000',
      status: 'new',
      message: 'Need help with SEO optimization'
    },
    created_at: '2024-02-19T16:45:00Z'
  }
];