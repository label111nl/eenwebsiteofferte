import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { freelancerApi } from '../api';
import { Badge } from './ui/Badge';

export function SubscriptionStatus() {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: freelancerApi.getProfile,
  });

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Subscription Status
            </h3>
            <div className="mt-1">
              <p className="text-sm text-gray-500">
                {profile?.subscription_type === 'monthly' ? 'Monthly Plan' : 'Pay Per Lead'}
              </p>
            </div>
          </div>
          <Badge status={profile?.status ?? 'inactive'} />
        </div>
      </div>
    </div>
  );
}