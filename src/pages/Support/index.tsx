import React from 'react';
import { NewTicket } from './NewTicket';
import { TicketList } from './TicketList';
import { PlusCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useTranslation } from '../../hooks/useTranslation';

export function Support() {
  const [showNewTicket, setShowNewTicket] = React.useState(false);
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {t('support.title')}
          </h2>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <Button
            onClick={() => setShowNewTicket(!showNewTicket)}
            icon={<PlusCircle className="h-4 w-4" />}
          >
            {t('support.createTicket')}
          </Button>
        </div>
      </div>

      {showNewTicket ? (
        <NewTicket />
      ) : (
        <TicketList />
      )}
    </div>
  );
}