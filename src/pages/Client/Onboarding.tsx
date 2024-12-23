import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Building2, Mail, Phone, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const onboardingSchema = z.object({
  company_name: z.string().min(2, 'Bedrijfsnaam is verplicht'),
  contact_email: z.string().email('Ongeldig e-mailadres'),
  phone: z.string().optional(),
  website: z.string().url('Ongeldige website URL').optional(),
  industry: z.string().min(2, 'Industrie is verplicht'),
  company_size: z.string(),
  project_description: z.string().min(10, 'Projectbeschrijving is verplicht'),
  estimated_budget: z.string().min(1, 'Budget is verplicht'),
});

type OnboardingData = z.infer<typeof onboardingSchema>;

export function ClientOnboarding() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<OnboardingData>({
    resolver: zodResolver(onboardingSchema),
  });

  const onSubmit = (data: OnboardingData) => {
    // Here we would normally submit to the API
    console.log(data);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card>
        <Card.Header>
          <h2 className="text-2xl font-bold text-gray-900">Voltooi uw bedrijfsprofiel</h2>
          <p className="mt-1 text-sm text-gray-500">
            Help ons uw bedrijf beter te begrijpen om u te koppelen aan de juiste freelancers.
          </p>
        </Card.Header>
        <Card.Body>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Bedrijfsnaam"
              error={errors.company_name?.message}
              icon={<Building2 className="h-5 w-5 text-gray-400" />}
              {...register('company_name')}
            />

            <Input
              label="Zakelijk e-mailadres"
              error={errors.contact_email?.message}
              icon={<Mail className="h-5 w-5 text-gray-400" />}
              {...register('contact_email')}
            />

            <Input
              label="Telefoonnummer"
              error={errors.phone?.message}
              icon={<Phone className="h-5 w-5 text-gray-400" />}
              {...register('phone')}
            />

            <Input
              label="Website"
              error={errors.website?.message}
              icon={<Globe className="h-5 w-5 text-gray-400" />}
              {...register('website')}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700">Industrie</label>
              <select
                {...register('industry')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Selecteer Industrie</option>
                <option value="technology">Technologie</option>
                <option value="ecommerce">E-commerce</option>
                <option value="healthcare">Gezondheidszorg</option>
                <option value="education">Onderwijs</option>
                <option value="other">Anders</option>
              </select>
              {errors.industry && (
                <p className="mt-1 text-sm text-red-600">{errors.industry.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Bedrijfsgrootte</label>
              <select
                {...register('company_size')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="1-10">1-10 medewerkers</option>
                <option value="11-50">11-50 medewerkers</option>
                <option value="51-200">51-200 medewerkers</option>
                <option value="201+">201+ medewerkers</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Projectbeschrijving</label>
              <textarea
                {...register('project_description')}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Beschrijf uw project en wat voor freelancer u zoekt..."
              />
              {errors.project_description && (
                <p className="mt-1 text-sm text-red-600">{errors.project_description.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Geschat Budget</label>
              <Input
                type="number"
                error={errors.estimated_budget?.message}
                {...register('estimated_budget')}
                placeholder="€"
              />
            </div>

            <Button type="submit" className="w-full">
              Profiel voltooien
            </Button>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}