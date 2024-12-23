export interface Freelancer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: 'active' | 'inactive' | 'pending';
  subscription_type: 'per_lead' | 'monthly';
  bio?: string;
  hourly_rate?: number;
  avatar_url?: string;
  portfolio_items?: PortfolioItem[];
  services?: Service[];
  created_at: string;
}

export interface Lead {
  id: string;
  client_name: string;
  client_email: string;
  project_description: string;
  budget: number;
  status: 'new' | 'assigned' | 'completed' | 'cancelled';
  freelancer_id?: string;
  max_responses: number;
  current_responses: number;
  price: number;
  created_at: string;
}

export interface LeadResponse {
  id: string;
  lead_id: string;
  freelancer: Freelancer;
  message: string;
  proposed_budget: number;
  estimated_delivery: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
}

export interface Payment {
  id: string;
  freelancer_id: string;
  amount: number;
  type: 'lead' | 'subscription';
  status: 'pending' | 'completed' | 'failed';
  lead_id?: string;
  created_at: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  project_url?: string;
  technologies: string[];
  completion_date: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price_range: {
    min: number;
    max: number;
  };
  delivery_time: string;
}