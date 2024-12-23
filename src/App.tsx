import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from '../../contexts/AuthContext';
import { Layout } from '../../components/Layout';
import { Toaster } from 'react-hot-toast';
import { ErrorBoundary } from '../../utils/monitoring';
import PaymentRoutes from '../../routes/paymentRoutes'; // Import PaymentRoutes

// Pages
import { LoginPage } from '../../pages/Auth/LoginPage';
import { RegisterPage } from '../../pages/Auth/RegisterPage';
import { AdminDashboard } from '../../pages/Admin/Dashboard';
import { ClientDashboard } from '../../pages/Client/Dashboard';
import { FreelancerDashboard } from '../../pages/Freelancer/Dashboard';
import { Leads } from '../../pages/Leads';
import { PremiumLeads } from '../../pages/PremiumLeads';
import { Settings } from '../../pages/Settings';
import { Support } from '../../pages/Support';
import NotFoundPage from '../../pages/NotFoundPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function Loading() {
  return <div className="h-screen flex items-center justify-center">Loading...</div>;
}

function AuthenticatedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

function RoleBasedDashboard() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'client':
      return <ClientDashboard />;
    case 'freelancer':
      return <FreelancerDashboard />;
    default:
      return <Navigate to="/login" />;
  }
}

export default function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong!</div>}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <Suspense fallback={<Loading />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Authenticated Routes */}
                <Route
                  element={
                    <AuthenticatedRoute>
                      <Layout />
                    </AuthenticatedRoute>
                  }
                >
                  <Route path="/" element={<RoleBasedDashboard />} />
                  <Route path="/leads" element={<Leads />} />
                  <Route path="/premium-leads" element={<PremiumLeads />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/support" element={<Support />} />

                  {/* Payment Routes */}
                  <Route path="/payments/*" element={<PaymentRoutes />} />
                </Route>

                {/* 404 Route */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
          <Toaster position="top-right" />
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
