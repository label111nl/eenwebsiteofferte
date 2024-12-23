import axios, { AxiosError } from 'axios';
import type { AuthResponse, LoginCredentials, RegisterData } from '../types/auth';

// Initialize the Axios instance with the API base URL
const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Ensure this is set correctly in your .env file
  headers: {
    'Content-Type': 'application/json',
  },
});

// Handle API errors consistently
const handleApiError = (error: unknown): never => {
  if (error instanceof AxiosError) {
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      throw new Error(error.response.data.message || 'An error occurred during the request');
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('No response received from the server');
    }
  }
  // For other types of errors (network errors, etc.)
  throw new Error('Network or server error');
};

// User login function
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await authApi.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// User registration function
export const register = async (data: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await authApi.post<AuthResponse>('/auth/register', data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// User logout function
export const logout = async (): Promise<void> => {
  try {
    await authApi.post('/auth/logout');
  } catch (error) {
    handleApiError(error);
  }
};

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'freelancer' | 'client';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
