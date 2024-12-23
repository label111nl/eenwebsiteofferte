import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import { register as registerUser } from '../../api/auth';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Mail, Lock, User } from 'lucide-react';
import { useTranslation } from '../../contexts/TranslationContext';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['freelancer', 'client']),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const t = useTranslation();

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      navigate(data.user.role === 'client' ? '/client/onboarding' : '/freelancer/onboarding');
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {t.auth.register}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {t.auth.alreadyHaveAccount}{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            {t.auth.login}
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <Card.Body>
            <form className="space-y-6" onSubmit={handleSubmit((data) => mutation.mutate(data))}>
              <Input
                label={t.auth.name}
                error={errors.name?.message}
                icon={<User className="h-5 w-5 text-gray-400" />}
                {...register('name')}
              />

              <Input
                label={t.auth.email}
                type="email"
                error={errors.email?.message}
                icon={<Mail className="h-5 w-5 text-gray-400" />}
                {...register('email')}
              />

              <Input
                label={t.auth.password}
                type="password"
                error={errors.password?.message}
                icon={<Lock className="h-5 w-5 text-gray-400" />}
                {...register('password')}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t.auth.role}
                </label>
                <select
                  {...register('role')}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="freelancer">{t.auth.freelancer}</option>
                  <option value="client">{t.auth.client}</option>
                </select>
                {errors.role && (
                  <p className="mt-2 text-sm text-red-600">{errors.role.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                isLoading={mutation.isPending}
              >
                {t.auth.registerButton}
              </Button>

              {mutation.isError && (
                <p className="text-sm text-red-600 text-center">
                  Registration failed. Please try again.
                </p>
              )}
            </form>

            <div className="mt-4 text-center">
              <Link to="/login" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                &larr; {t.auth.backToLogin}
              </Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
