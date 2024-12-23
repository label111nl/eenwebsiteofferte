import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../api/auth';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Mail, Lock } from 'lucide-react';
import { useTranslation } from '../../contexts/TranslationContext';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const t = useTranslation();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      navigate('/');
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {t.auth.login}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {t.auth.noAccount}{' '}
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            {t.auth.register}
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <Card.Body>
            <form className="space-y-6" onSubmit={handleSubmit((data) => mutation.mutate(data))}>
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

              <div className="flex items-center justify-between">
                <Button
                  type="submit"
                  className="w-full"
                  isLoading={mutation.isPending}
                >
                  {t.auth.loginButton}
                </Button>
              </div>

              {mutation.isError && (
                <p className="text-sm text-red-600 text-center">
                  Invalid email or password
                </p>
              )}
            </form>

            <div className="mt-4 flex justify-between">
              <Link to="/register" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                {t.auth.register}
              </Link>
              <Link to="/forgot-password" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                {t.auth.forgotPassword}
              </Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
