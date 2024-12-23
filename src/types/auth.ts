export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'freelancer' | 'client';
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'freelancer' | 'client';
}

export interface LoginCredentials {
  email: string;
  password: string;
}
