import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { MessageCircle, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useTranslation } from '../../hooks/useTranslation';
import type { Ticket } from '../../types/ticket';

const mockTickets: Ticket[] = [
  {
    id: '1',
    subject: 'Payment Issue',
    description: 'Unable to process lead payment',
    status: 'open',
    priority: 'high',
    category: 'billing',
    created_by: '1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    messages: []
  }
];

export function TicketList() {
  const { t } = useTranslation();
  const { data: tickets = mockTickets } = useQuery({
    queryKey: ['tickets'],
    queryFn: async () => mockTickets
  });

  const getStatusIcon = (status: Ticket['status']) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'resolved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <MessageCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {t('support.tickets')}
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <ul role="list" className="divide-y divide-gray-200">
          {tickets.map((ticket) => (
            <li key={ticket.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {getStatusIcon(ticket.status)}
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{ticket.subject}</p>
                    <p className="text-sm text-gray-500">{ticket.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge status={ticket.status} />
                  <Badge status={ticket.priority} />
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    {formatDistanceToNow(new Date(ticket.created_at))} ago
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<MessageCircle className="h-4 w-4" />}
                  >
                    Reply
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}