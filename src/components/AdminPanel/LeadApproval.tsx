import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { adminApi } from '../../api';
import { Badge } from '../ui/Badge';
import { formatDistanceToNow } from 'date-fns';
import { Check, X, DollarSign } from 'lucide-react';
import { Modal } from '../ui/Modal';

export function LeadApproval() {
  const [selectedLead, setSelectedLead] = useState(null);
  const [price, setPrice] = useState('');
  const [maxResponses, setMaxResponses] = useState(5);
  const queryClient = useQueryClient();

  const { data: leads = [], isLoading } = useQuery({
    queryKey: ['pending-leads'],
    queryFn: adminApi.getLeads,
  });

  const mutation = useMutation({
    mutationFn: ({ id, price, maxResponses }) => 
      adminApi.approveLead(id, { price: Number(price), max_responses: maxResponses }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-leads'] });
      setSelectedLead(null);
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {leads.map((lead) => (
          <Card key={lead.id} className="hover:shadow-lg transition-shadow duration-200">
            <Card.Body>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium">{lead.client_name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{lead.project_description}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Budget: €{lead.budget.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    {formatDistanceToNow(new Date(lead.created_at))} ago
                  </p>
                </div>
                <Badge status={lead.status} />
              </div>
              <div className="mt-4 flex space-x-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setSelectedLead(lead)}
                  icon={<Check className="h-4 w-4" />}
                >
                  Approve
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => mutation.mutate({ id: lead.id, status: 'rejected' })}
                  icon={<X className="h-4 w-4" />}
                >
                  Reject
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={!!selectedLead}
        onClose={() => setSelectedLead(null)}
        title="Approve Lead"
      >
        <div className="space-y-4">
          <Input
            label="Lead Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            icon={<DollarSign className="h-5 w-5 text-gray-400" />}
            placeholder="Enter lead price"
          />

          <Input
            label="Maximum Responses"
            type="number"
            value={maxResponses}
            onChange={(e) => setMaxResponses(Number(e.target.value))}
            placeholder="Enter maximum responses"
          />

          <Button
            className="w-full"
            onClick={() => {
              if (selectedLead && price) {
                mutation.mutate({
                  id: selectedLead.id,
                  price: Number(price),
                  maxResponses
                });
              }
            }}
            isLoading={mutation.isPending}
          >
            Approve Lead
          </Button>
        </div>
      </Modal>
    </div>
  );
}