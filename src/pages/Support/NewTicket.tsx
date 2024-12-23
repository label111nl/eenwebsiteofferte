import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useTranslation } from '../../hooks/useTranslation';
import { useMutation } from '@tanstack/react-query';

const ticketSchema = z.object({
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  category: z.enum(['technical', 'billing', 'account', 'other']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
});

type TicketFormData = z.infer<typeof ticketSchema>;

export function NewTicket() {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: TicketFormData) => {
      // API call to create ticket
      console.log(data);
    },
  });

  return (
    <Card>
      <Card.Header>
        <h2 className="text-lg font-medium text-gray-900">
          {t('support.newTicket')}
        </h2>
      </Card.Header>
      <Card.Body>
        <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
          <Input
            label={t('support.subject')}
            error={errors.subject?.message}
            {...register('subject')}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('support.description')}
            </label>
            <textarea
              {...register('description')}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('support.category')}
              </label>
              <select
                {...register('category')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="technical">{t('support.categories.technical')}</option>
                <option value="billing">{t('support.categories.billing')}</option>
                <option value="account">{t('support.categories.account')}</option>
                <option value="other">{t('support.categories.other')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('support.priority')}
              </label>
              <select
                {...register('priority')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="low">{t('support.priorities.low')}</option>
                <option value="medium">{t('support.priorities.medium')}</option>
                <option value="high">{t('support.priorities.high')}</option>
                <option value="urgent">{t('support.priorities.urgent')}</option>
              </select>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={mutation.isPending}
          >
            {t('support.submit')}
          </Button>
        </form>
      </Card.Body>
    </Card>
  );
}