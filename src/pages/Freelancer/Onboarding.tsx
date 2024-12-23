import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { User, Mail, Phone, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const onboardingSchema = z.object({
  name: z.string().min(2, 'Naam is verplicht'),
  email: z.string().email('Ongeldig e-mailadres'),
  phone: z.string().optional(),
  hourly_rate: z.string().min(1, 'Uurtarief is verplicht'),
  bio: z.string().min(10, 'Bio is verplicht'),
  skills: z.string().min(2, 'Skills zijn verplicht'),
  experience_years: z.string().min(1, 'Ervaring is verplicht'),
  portfolio_url: z.string().url('Ongeldige portfolio URL').optional(),
});

type OnboardingData = z.infer<typeof onboardingSchema>;

export function FreelancerOnboarding() {
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
          <h2 className="text-2xl font-bold text-gray-900">Voltooi uw freelancer profiel</h2>
          <p className="mt-1 text-sm text-gray-500">
            Help ons u te koppelen aan de juiste projecten door uw profiel te voltooien.
          </p>
        </Card.Header>
        <Card.Body>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Volledige naam"
              error={errors.name?.message}
              icon={<User className="h-5 w-5 text-gray-400" />}
              {...register('name')}
            />

            <Input
              label="E-mailadres"
              type="email"
              error={errors.email?.message}
              icon={<Mail className="h-5 w-5 text-gray-400" />}
              {...register('email')}
            />

            <Input
              label="Telefoonnummer"
              error={errors.phone?.message}
              icon={<Phone className="h-5 w-5 text-gray-400" />}
              {...register('phone')}
            />

            <Input
              label="Uurtarief (€)"
              type="number"
              error={errors.hourly_rate?.message}
              icon={<DollarSign className="h-5 w-5 text-gray-400" />}
              {...register('hourly_rate')}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700">Bio</label>
              <textarea
                {...register('bio')}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Vertel ons over uzelf en uw expertise..."
              />
              {errors.bio && (
                <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Skills</label>
              <Input
                error={errors.skills?.message}
                {...register('skills')}
                placeholder="bijv. React, Node.js, WordPress"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Jaren ervaring</label>
              <Input
                type="number"
                error={errors.experience_years?.message}
                {...register('experience_years')}
              />
            </div>

            <Input
              label="Portfolio URL"
              error={errors.portfolio_url?.message}
              {...register('portfolio_url')}
              placeholder="https://..."
            />

            <Button type="submit" className="w-full">
              Profiel voltooien
            </Button>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}