import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const projectSchema = z.object({
  title: z.string().min(2, 'Project title is required'),
  description: z.string().min(10, 'Project description is required'),
  budget: z.number().min(1, 'Budget is required'),
  deadline: z.string().optional(),
  requirements: z.string().min(10, 'Project requirements are required'),
});

type ProjectFormData = z.infer<typeof projectSchema>;

export function NewProject() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });

  const onSubmit = async (data: ProjectFormData) => {
    try {
      // Here we would submit to the API
      console.log(data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card>
        <Card.Header>
          <h2 className="text-2xl font-bold text-gray-900">Nieuw Project Plaatsen</h2>
          <p className="mt-1 text-sm text-gray-500">
            Beschrijf uw project om de beste freelancers te vinden
          </p>
        </Card.Header>
        <Card.Body>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Project Titel"
              error={errors.title?.message}
              {...register('title')}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Project Beschrijving
              </label>
              <textarea
                {...register('description')}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Beschrijf uw project in detail..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            <Input
              label="Budget (€)"
              type="number"
              error={errors.budget?.message}
              {...register('budget', { valueAsNumber: true })}
            />

            <Input
              label="Deadline"
              type="date"
              {...register('deadline')}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Project Vereisten
              </label>
              <textarea
                {...register('requirements')}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Beschrijf de specifieke vereisten en vaardigheden..."
              />
              {errors.requirements && (
                <p className="mt-1 text-sm text-red-600">{errors.requirements.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Project Plaatsen
            </Button>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}