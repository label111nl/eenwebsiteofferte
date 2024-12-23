import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PaymentPage } from '../pages/Payments/PaymentPage';
import { AuthenticatedRoute } from '../components/AuthenticatedRoute';
import { Layout } from '../components/Layout';
import NotFoundPage from '../pages/NotFoundPage';

// Payment routes for authenticated users
export default function PaymentRoutes() {
  return (
    <Routes>
      <Route
        element={
          <AuthenticatedRoute>
            <Layout />
          </AuthenticatedRoute>
        }
      >
        <Route path="/payments" element={<PaymentPage />} />
      </Route>

      {/* Fallback for unmatched routes */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
