import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { freelancerApi } from '../../api';
import { Lead } from '../../types';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '../../components/ui/Badge';
import { LeadDetails } from './LeadDetails';

export function LeadList() {
  const [selectedLead, setSelectedLead] = React.useState<Lead | null>(null);
  const queryClient = useQueryClient();

  const { data: leads = [], isLoading } = useQuery<Lead[]>({
    queryKey: ['leads'],
    queryFn: freelancerApi.getLeads,
  });

  const mutation = useMutation({
    mutationFn: ({ leadId, accept }: { leadId: string; accept: boolean }) =>
      freelancerApi.respondToLead(leadId, accept),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      setSelectedLead(null);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {leads.map((lead) => (
            <li
              key={lead.id}
              className="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedLead(lead)}
            >
              <div className="flex items-center justify-between">
                <div className="truncate">
                  <div className="flex text-sm">
                    <p className="font-medium text-indigo-600 truncate">{lead.client_name}</p>
                    <p className="ml-1 flex-shrink-0 text-gray-500">
                      in {formatDistanceToNow(new Date(lead.created_at))}
                    </p>
                  </div>
                </div>
                <div className="ml-2 flex flex-shrink-0">
                  <Badge status={lead.status} />
                </div>
              </div>
              <div className="mt-2">
                <div className="sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      Budget: ${lead.budget.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {selectedLead && (
        <LeadDetails
          lead={selectedLead}
          isOpen={!!selectedLead}
          onClose={() => setSelectedLead(null)}
          onAccept={() => mutation.mutate({ leadId: selectedLead.id, accept: true })}
          onDecline={() => mutation.mutate({ leadId: selectedLead.id, accept: false })}
        />
      )}
    </>
  );
}