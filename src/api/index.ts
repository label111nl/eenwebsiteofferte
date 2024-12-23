import axios from 'axios';
import type { Freelancer, Lead, Payment } from '../types';
import { mockFreelancer, mockLeads, mockPayments } from './mockData';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const MOCK_API = true;

export const adminApi = {
  getLeads: async () => {
    if (MOCK_API) {
      return Promise.resolve(mockLeads);
    }
    const response = await api.get<Lead[]>('/admin/leads');
    return response.data;
  },

  approveLead: async (leadId: string, data: { price: number; max_responses: number }) => {
    if (MOCK_API) {
      return Promise.resolve({
        ...mockLeads.find(l => l.id === leadId),
        price: data.price,
        max_responses: data.max_responses,
        status: 'approved'
      });
    }
    const response = await api.post(`/admin/leads/${leadId}/approve`, data);
    return response.data;
  },

  createLead: async (data: Partial<Lead>) => {
    if (MOCK_API) {
      return Promise.resolve({
        id: String(Date.now()),
        ...data,
        status: 'new',
        created_at: new Date().toISOString(),
      });
    }
    const response = await api.post('/admin/leads', data);
    return response.data;
  },
};

export const freelancerApi = {
  getProfile: async () => {
    if (MOCK_API) {
      return Promise.resolve(mockFreelancer);
    }
    const response = await api.get<Freelancer>('/freelancer/profile');
    return response.data;
  },
  
  updateProfile: async (data: Partial<Freelancer>) => {
    if (MOCK_API) {
      return Promise.resolve({ ...mockFreelancer, ...data });
    }
    const response = await api.put('/freelancer/profile', data);
    return response.data;
  },
  
  getLeads: async () => {
    if (MOCK_API) {
      return Promise.resolve(mockLeads);
    }
    const response = await api.get<Lead[]>('/freelancer/leads');
    return response.data;
  },
  
  respondToLead: async (leadId: string, data: any) => {
    if (MOCK_API) {
      const lead = mockLeads.find(l => l.id === leadId);
      return Promise.resolve({
        ...lead,
        status: 'assigned',
        freelancer_id: mockFreelancer.id,
      });
    }
    const response = await api.post(`/freelancer/leads/${leadId}/respond`, data);
    return response.data;
  },
  
  getPayments: async () => {
    if (MOCK_API) {
      return Promise.resolve(mockPayments);
    }
    const response = await api.get<Payment[]>('/freelancer/payments');
    return response.data;
  },
};

export const paymentApi = {
  createPaymentSession: async (leadId: string) => {
    if (MOCK_API) {
      return Promise.resolve({
        sessionId: 'mock-session-id',
        success: true
      });
    }
    const response = await api.post('/payments/create-session', { leadId });
    return response.data;
  },

  verifyPayment: async (sessionId: string) => {
    if (MOCK_API) {
      return Promise.resolve({
        success: true,
        leadId: '1'
      });
    }
    const response = await api.post('/payments/verify', { sessionId });
    return response.data;
  }
};