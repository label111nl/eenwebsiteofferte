import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { freelancerApi } from '../../api';

const responseSchema = z.object({
  message: z.string().min(1, 'Message is required'),
  proposedBudget: z.number().min(1, 'Budget must be greater than 0'),
  estimatedDelivery: z.string().min(1, 'Estimated delivery is required'),
});

type ResponseFormData = z.infer<typeof responseSchema>;

interface LeadResponseFormProps {
  leadId: string;
  onSuccess: () => void;
}

export function LeadResponseForm({ leadId, onSuccess }: LeadResponseFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<ResponseFormData>({
    resolver: zodResolver(responseSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: ResponseFormData) => freelancerApi.respondToLead(leadId, data),
    onSuccess,
  });

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Your Message
        </label>
        <textarea
          {...register('message')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Introduce yourself and explain why you're a good fit for this project..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Proposed Budget
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">€</span>
            </div>
            <input
              type="number"
              {...register('proposedBudget', { valueAsNumber: true })}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          {errors.proposedBudget && (
            <p className="mt-1 text-sm text-red-600">{errors.proposedBudget.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Estimated Delivery
          </label>
          <input
            type="text"
            {...register('estimatedDelivery')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="e.g., 2-3 weeks"
          />
          {errors.estimatedDelivery && (
            <p className="mt-1 text-sm text-red-600">{errors.estimatedDelivery.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
      >
        {mutation.isPending ? 'Sending Response...' : 'Send Response'}
      </button>
    </form>
  );
}