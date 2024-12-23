import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '../../components/ui/Badge';
import type { PremiumLead } from '../../types';

export function PremiumLeadsList() {
  const { data: leads, isLoading } = useQuery({
    queryKey: ['premium-leads'],
    queryFn: async () => {
      // API call to fetch premium leads
      return [] as PremiumLead[];
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Available Premium Leads
        </h3>
        <div className="mt-6 flow-root">
          <ul role="list" className="-my-5 divide-y divide-gray-200">
            {leads?.map((lead) => (
              <li key={lead.id} className="py-5">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {lead.company_name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">{lead.industry}</p>
                    <p className="text-sm text-gray-500">
                      Budget: ${lead.estimated_budget.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <Badge status={lead.status} />
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{lead.description}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Posted {formatDistanceToNow(new Date(lead.created_at))} ago
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}