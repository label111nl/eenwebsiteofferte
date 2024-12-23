import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { Modal } from '../ui/Modal';
import { CreditCard, Lock } from 'lucide-react';
import { Button } from '../ui/Button';
import { useTranslation } from '../../hooks/useTranslation';
import { createPaymentSession } from '../../utils/stripe';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadId: string;
  leadPrice: number;
  onSuccess: () => void;
}

export function PaymentModal({ isOpen, onClose, leadId, leadPrice, onSuccess }: PaymentModalProps) {
  const { t } = useTranslation();
  
  const mutation = useMutation({
    mutationFn: () => createPaymentSession(leadId, leadPrice),
    onSuccess,
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('leads.payment.title')}>
      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">{t('leads.payment.price')}</span>
            <span className="text-lg font-semibold text-indigo-600">€{leadPrice}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center text-sm text-gray-600">
            <Lock className="h-4 w-4 mr-2" />
            {t('leads.payment.secure')}
          </div>

          <Button
            onClick={() => mutation.mutate()}
            isLoading={mutation.isPending}
            className="w-full"
            icon={<CreditCard className="h-4 w-4" />}
          >
            {mutation.isPending ? t('leads.payment.processing') : t('leads.payment.pay')}
          </Button>
        </div>

        <p className="text-xs text-gray-500 text-center">
          {t('leads.payment.disclaimer')}
        </p>
      </div>
    </Modal>
  );
}