import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Bell, Smartphone, Webhook, Send } from 'lucide-react';
import { useTranslation } from '../../contexts/TranslationContext';
import { testNotificationChannel, updateNotificationPreferences } from '../../services/notifications';
import { useMutation } from '@tanstack/react-query';

const notificationSchema = z.object({
  whatsapp: z.string()
    .regex(/^\+[1-9]\d{1,14}$/, 'Voer een geldig telefoonnummer in met landcode (bijv. +31612345678)')
    .optional(),
  zapier_webhook: z.string().url('Voer een geldige webhook URL in').optional(),
  make_webhook: z.string().url('Voer een geldige webhook URL in').optional(),
});

type NotificationFormData = z.infer<typeof notificationSchema>;

export function NotificationPreferences() {
  const t = useTranslation();
  const [testStatus, setTestStatus] = useState<{
    channel: string;
    status: 'success' | 'error';
    message: string;
  } | null>(null);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<NotificationFormData>({
    resolver: zodResolver(notificationSchema),
  });

  const mutation = useMutation({
    mutationFn: updateNotificationPreferences,
    onSuccess: () => {
      // Show success message
    },
  });

  const handleTest = async (channel: string, value: string) => {
    if (!value) return;

    try {
      await testNotificationChannel(channel, value);
      setTestStatus({
        channel,
        status: 'success',
        message: 'Test notificatie verzonden!',
      });
    } catch (error) {
      setTestStatus({
        channel,
        status: 'error',
        message: 'Fout bij versturen test notificatie',
      });
    }
  };

  return (
    <Card>
      <Card.Header>
        <div className="flex items-center space-x-2">
          <Bell className="h-5 w-5 text-indigo-500" />
          <h3 className="text-lg font-medium text-gray-900">
            Notificatie Voorkeuren
          </h3>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Kies hoe je op de hoogte wilt blijven van nieuwe leads
        </p>
      </Card.Header>

      <Card.Body>
        <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                WhatsApp Notificaties
              </label>
              <div className="mt-1 flex space-x-2">
                <div className="flex-1">
                  <Input
                    type="tel"
                    placeholder="+31612345678"
                    icon={<Smartphone className="h-5 w-5 text-gray-400" />}
                    error={errors.whatsapp?.message}
                    {...register('whatsapp')}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleTest('whatsapp', watch('whatsapp'))}
                  icon={<Send className="h-4 w-4" />}
                >
                  Test
                </Button>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Ontvang direct WhatsApp berichten bij nieuwe leads
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Zapier Webhook
              </label>
              <div className="mt-1 flex space-x-2">
                <div className="flex-1">
                  <Input
                    type="url"
                    placeholder="https://hooks.zapier.com/..."
                    icon={<Webhook className="h-5 w-5 text-gray-400" />}
                    error={errors.zapier_webhook?.message}
                    {...register('zapier_webhook')}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleTest('webhook', watch('zapier_webhook'))}
                  icon={<Send className="h-4 w-4" />}
                >
                  Test
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Make Webhook
              </label>
              <div className="mt-1 flex space-x-2">
                <div className="flex-1">
                  <Input
                    type="url"
                    placeholder="https://hook.make.com/..."
                    icon={<Webhook className="h-5 w-5 text-gray-400" />}
                    error={errors.make_webhook?.message}
                    {...register('make_webhook')}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleTest('webhook', watch('make_webhook'))}
                  icon={<Send className="h-4 w-4" />}
                >
                  Test
                </Button>
              </div>
            </div>
          </div>

          {testStatus && (
            <div className={`p-4 rounded-md ${
              testStatus.status === 'success' ? 'bg-green-50' : 'bg-red-50'
            }`}>
              <p className={`text-sm ${
                testStatus.status === 'success' ? 'text-green-700' : 'text-red-700'
              }`}>
                {testStatus.message}
              </p>
            </div>
          )}

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900">Webhook Data</h4>
            <p className="mt-1 text-sm text-gray-500">
              De webhook ontvangt de volgende informatie:
            </p>
            <pre className="mt-2 text-sm text-gray-600 bg-gray-100 p-2 rounded">
{`{
  "type": "lead",
  "data": {
    "id": "123",
    "title": "Project titel",
    "description": "Project beschrijving",
    "budget": 5000,
    "created_at": "2024-02-25T12:00:00Z"
  }
}`}
            </pre>
          </div>

          <Button
            type="submit"
            className="w-full"
            icon={<Bell className="h-4 w-4" />}
            isLoading={mutation.isPending}
          >
            Voorkeuren Opslaan
          </Button>
        </form>
      </Card.Body>
    </Card>
  );
}