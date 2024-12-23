import React, { useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { Lead } from '../../types';
import { formatDistanceToNow } from 'date-fns';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { freelancerApi } from '../../api';
import { useTranslation } from '../../contexts/TranslationContext';
import { ChatWindow } from '../../components/Chat/ChatWindow';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { PaymentModal } from '../../components/LeadPayment/PaymentModal';

interface LeadDetailsProps {
  lead: Lead;
  isOpen: boolean;
  onClose: () => void;
}

export function LeadDetails({ lead, isOpen, onClose }: LeadDetailsProps) {
  const t = useTranslation();
  const [showChat, setShowChat] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: any) => freelancerApi.respondToLead(lead.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      setShowChat(true);
    },
  });

  const canRespond = lead.status === 'new' && lead.current_responses < lead.max_responses;

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    mutation.mutate({ message: 'Interested in this project' });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title={t.leads.newLead}>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">{t.leads.description}</h4>
            <p className="mt-1 text-sm text-gray-900">{lead.project_description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">{t.leads.budget}</h4>
              <p className="mt-1 text-sm text-gray-900">€{lead.budget.toLocaleString()}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">{t.leads.leadPrice}</h4>
              <p className="mt-1 text-sm text-gray-900">€{lead.price.toLocaleString()}</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">{t.leads.responses}</h4>
            <div className="mt-1 flex items-center space-x-2">
              <span className="text-sm text-gray-900">
                {lead.current_responses} / {lead.max_responses}
              </span>
              <Badge status={lead.status} />
            </div>
          </div>

          {canRespond && (
            <Button
              onClick={() => setShowPayment(true)}
              className="w-full"
            >
              {t.leads.respond} (€{lead.price})
            </Button>
          )}

          {!canRespond && (
            <p className="text-sm text-gray-500">
              {lead.current_responses >= lead.max_responses
                ? t.leads.maxResponses
                : t.leads.unavailable}
            </p>
          )}
        </div>
      </Modal>

      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        leadId={lead.id}
        leadPrice={lead.price}
        onSuccess={handlePaymentSuccess}
      />

      {showChat && (
        <ChatWindow
          roomId={`lead-${lead.id}`}
          onClose={() => setShowChat(false)}
        />
      )}
    </>
  );
}