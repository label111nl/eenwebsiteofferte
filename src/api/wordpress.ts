import axios from 'axios';
import type { WordPressForm, FormSubmission } from '../types/wordpress';
import { mockForms, mockSubmissions } from './mockData';

const wpApi = axios.create({
  baseURL: import.meta.env.VITE_WP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const MOCK_API = true;

export const wordpressApi = {
  getForms: async () => {
    if (MOCK_API) {
      return Promise.resolve(mockForms);
    }
    const response = await wpApi.get<WordPressForm[]>('/wp-json/fluent-forms/v1/forms');
    return response.data;
  },
  
  getFormSubmissions: async (formId: number) => {
    if (MOCK_API) {
      return Promise.resolve(mockSubmissions.filter(s => s.form_id === formId));
    }
    const response = await wpApi.get<FormSubmission[]>(`/wp-json/fluent-forms/v1/submissions/${formId}`);
    return response.data;
  },
  
  getAcfOptions: async () => {
    if (MOCK_API) {
      return Promise.resolve({});
    }
    const response = await wpApi.get('/wp-json/acf/v3/options/options');
    return response.data;
  },
};