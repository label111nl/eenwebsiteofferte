import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { PremiumLeadsList } from './PremiumLeadsList';
import { LinkedInScanner } from './LinkedInScanner';
import { useAuth } from '../../contexts/AuthContext';

export function PremiumLeads() {
  const { user } = useAuth();
  const hasPremiumAccess = user?.subscription_tier === 'premium';

  if (!hasPremiumAccess) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Upgrade to Premium
        </h3>
        <p className="text-gray-500 mb-6">
          Get access to exclusive leads and our LinkedIn scanner
        </p>
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          onClick={() => {/* Handle upgrade */}}
        >
          Upgrade Now
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Premium Leads
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <PremiumLeadsList />
        <LinkedInScanner />
      </div>
    </div>
  );
}