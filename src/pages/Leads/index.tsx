import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { freelancerApi } from '../../api';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { LeadDetails } from './LeadDetails';
import { useTranslation } from '../../contexts/TranslationContext';
import { formatDistanceToNow } from 'date-fns';
import { DollarSign, Users } from 'lucide-react';

export function Leads() {
  const [selectedLead, setSelectedLead] = React.useState(null);
  const t = useTranslation();

  const { data: leads = [], isLoading } = useQuery({
    queryKey: ['leads'],
    queryFn: freelancerApi.getLeads,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
      </div>
    );
  }

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold text-gray-900">
            {t.leads.available}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leads.map((lead) => (
          <Card
            key={lead.id}
            className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={() => setSelectedLead(lead)}
          >
            <Card.Body>
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium text-gray-900">{lead.client_name}</h3>
                <Badge status={lead.status} />
              </div>
              
              <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                {lead.project_description}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center text-sm text-gray-500">
                  <DollarSign className="h-4 w-4 mr-1" />
                  €{lead.budget.toLocaleString()}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-1" />
                  {lead.current_responses}/{lead.max_responses}
                </div>
              </div>

              <div className="mt-4 text-xs text-gray-400">
                {formatDistanceToNow(new Date(lead.created_at))} ago
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      {selectedLead && (
        <LeadDetails
          lead={selectedLead}
          isOpen={!!selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      )}
    </div>
  );
}