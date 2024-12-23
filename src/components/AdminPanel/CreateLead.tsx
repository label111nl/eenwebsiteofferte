import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { adminApi } from '../../api';

const leadSchema = z.object({
  client_name: z.string().min(2, 'Client name is required'),
  client_email: z.string().email('Valid email is required'),
  project_description: z.string().min(10, 'Project description is required'),
  budget: z.number().min(1, 'Budget is required'),
  price: z.number().min(1, 'Lead price is required'),
  max_responses: z.number().min(1, 'Maximum responses is required'),
});

type LeadFormData = z.infer<typeof leadSchema>;

export function CreateLead() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      max_responses: 5,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: LeadFormData) => {
      return adminApi.createLead(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      reset();
    },
  });

  return (
    <Card>
      <Card.Header>
        <h3 className="text-lg font-medium text-gray-900">Create New Lead</h3>
        <p className="mt-1 text-sm text-gray-500">
          Manually create a new lead in the system
        </p>
      </Card.Header>
      <Card.Body>
        <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
          <Input
            label="Client Name"
            error={errors.client_name?.message}
            {...register('client_name')}
          />

          <Input
            label="Client Email"
            type="email"
            error={errors.client_email?.message}
            {...register('client_email')}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Project Description
            </label>
            <textarea
              {...register('project_description')}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Describe the project requirements..."
            />
            {errors.project_description && (
              <p className="mt-1 text-sm text-red-600">{errors.project_description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <Input
              label="Budget (€)"
              type="number"
              error={errors.budget?.message}
              {...register('budget', { valueAsNumber: true })}
            />

            <Input
              label="Lead Price (€)"
              type="number"
              error={errors.price?.message}
              {...register('price', { valueAsNumber: true })}
            />

            <Input
              label="Max Responses"
              type="number"
              error={errors.max_responses?.message}
              {...register('max_responses', { valueAsNumber: true })}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={mutation.isPending}
          >
            Create Lead
          </Button>

          {mutation.isSuccess && (
            <p className="text-sm text-green-600 text-center">
              Lead created successfully!
            </p>
          )}

          {mutation.isError && (
            <p className="text-sm text-red-600 text-center">
              Failed to create lead. Please try again.
            </p>
          )}
        </form>
      </Card.Body>
    </Card>
  );
}