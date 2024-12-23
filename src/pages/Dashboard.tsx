import React from 'react';
import { LeadStats } from '../components/LeadStats';
import { RecentActivity } from '../components/RecentActivity';
import { SubscriptionStatus } from '../components/SubscriptionStatus';
import { SmartLeadMatching } from '../components/SmartLeadMatching/MatchingDashboard';
import { TrustVerification } from '../components/TrustVerification/VerificationDashboard';
import { MarketIntelligence } from '../components/MarketIntelligence/MarketDashboard';
import { useAuth } from '../contexts/AuthContext';

export function Dashboard() {
  const { user } = useAuth();
  const isFreelancer = user?.role === 'freelancer';

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Dashboard
          </h2>
        </div>
      </div>

      <div className="mt-4">
        <SubscriptionStatus />
      </div>

      <LeadStats />

      {isFreelancer && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SmartLeadMatching />
            <TrustVerification />
          </div>
          <MarketIntelligence />
        </>
      )}

      <div className="mt-8">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
          Recent Activity
        </h3>
        <RecentActivity />
      </div>
    </div>
  );
}