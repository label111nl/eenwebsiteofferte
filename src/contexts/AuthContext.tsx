import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User, LoginCredentials } from '../types/auth';
import { jwtDecode } from 'jwt-decode';
import { login as loginApi } from '../api/auth'; // Import the login function from auth.ts

interface AuthContextType {
  user: User | null;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decoded = jwtDecode<User>(storedToken);
        setUser(decoded);
      } catch (error) {
        console.error('Invalid or expired token:', error);
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false);
  }, []);

  const setAuth = (token: string, newUser: User) => {
    localStorage.setItem('token', token);
    setUser(newUser);
  };

  const clearAuth = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      const data = await loginApi(credentials);
      setAuth(data.token, data.user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, setAuth, clearAuth, isLoading, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
