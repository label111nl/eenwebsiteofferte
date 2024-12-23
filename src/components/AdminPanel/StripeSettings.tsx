import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { CreditCard, Key, DollarSign, Plus, Trash2 } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const stripeSchema = z.object({
  publishableKey: z.string().min(1, 'Publishable key is required'),
  secretKey: z.string().min(1, 'Secret key is required'),
  webhookSecret: z.string().min(1, 'Webhook secret is required'),
});

const subscriptionSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.number().min(1, 'Price must be greater than 0'),
  interval: z.enum(['month', 'year']),
  features: z.array(z.string()),
  trialDays: z.number().optional(),
});

type StripeFormData = z.infer<typeof stripeSchema>;
type SubscriptionFormData = z.infer<typeof subscriptionSchema>;

export function StripeSettings() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [features, setFeatures] = React.useState<string[]>([]);
  const [newFeature, setNewFeature] = React.useState('');

  const { register: registerStripe, handleSubmit: handleStripeSubmit, formState: { errors: stripeErrors } } = useForm<StripeFormData>({
    resolver: zodResolver(stripeSchema),
  });

  const { register: registerSubscription, handleSubmit: handleSubscriptionSubmit, formState: { errors: subscriptionErrors } } = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      interval: 'month',
      trialDays: 14,
    },
  });

  const stripeMutation = useMutation({
    mutationFn: async (data: StripeFormData) => {
      // API call to save Stripe settings
      console.log('Stripe settings:', data);
      return new Promise(resolve => setTimeout(resolve, 1000));
    },
    onSuccess: () => {
      toast.success(t('admin.stripe.settingsSaved'));
      queryClient.invalidateQueries({ queryKey: ['stripe-settings'] });
    },
    onError: () => {
      toast.error(t('admin.stripe.settingsError'));
    },
  });

  const subscriptionMutation = useMutation({
    mutationFn: async (data: SubscriptionFormData) => {
      // API call to create subscription plan
      console.log('Subscription plan:', { ...data, features });
      return new Promise(resolve => setTimeout(resolve, 1000));
    },
    onSuccess: () => {
      toast.success(t('admin.stripe.planCreated'));
      queryClient.invalidateQueries({ queryKey: ['subscription-plans'] });
    },
    onError: () => {
      toast.error(t('admin.stripe.planError'));
    },
  });

  const addFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  return (
    <Tabs defaultValue="settings" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="settings" className="flex items-center gap-2">
          <Key className="h-4 w-4" />
          {t('admin.stripe.apiSettings')}
        </TabsTrigger>
        <TabsTrigger value="subscriptions" className="flex items-center gap-2">
          <DollarSign className="h-4 w-4" />
          {t('admin.stripe.subscriptions')}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="settings">
        <Card>
          <Card.Header>
            <div className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-indigo-500" />
              <h3 className="text-lg font-medium text-gray-900">
                {t('admin.stripe.title')}
              </h3>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              {t('admin.stripe.description')}
            </p>
          </Card.Header>
          <Card.Body>
            <form onSubmit={handleStripeSubmit((data) => stripeMutation.mutate(data))} className="space-y-6">
              <Input
                label={t('admin.stripe.publishableKey')}
                icon={<Key className="h-5 w-5 text-gray-400" />}
                error={stripeErrors.publishableKey?.message}
                {...registerStripe('publishableKey')}
              />

              <Input
                label={t('admin.stripe.secretKey')}
                type="password"
                icon={<Key className="h-5 w-5 text-gray-400" />}
                error={stripeErrors.secretKey?.message}
                {...registerStripe('secretKey')}
              />

              <Input
                label={t('admin.stripe.webhookSecret')}
                type="password"
                icon={<Key className="h-5 w-5 text-gray-400" />}
                error={stripeErrors.webhookSecret?.message}
                {...registerStripe('webhookSecret')}
              />

              <Button 
                type="submit" 
                className="w-full"
                isLoading={stripeMutation.isPending}
              >
                {t('admin.stripe.save')}
              </Button>
            </form>
          </Card.Body>
        </Card>
      </TabsContent>

      <TabsContent value="subscriptions">
        <Card>
          <Card.Header>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-indigo-500" />
              <h3 className="text-lg font-medium text-gray-900">
                {t('admin.stripe.subscriptionPlans')}
              </h3>
            </div>
          </Card.Header>
          <Card.Body>
            <form onSubmit={handleSubscriptionSubmit((data) => subscriptionMutation.mutate({ ...data, features }))} className="space-y-6">
              <Input
                label={t('admin.stripe.planName')}
                error={subscriptionErrors.name?.message}
                {...registerSubscription('name')}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label={t('admin.stripe.price')}
                  type="number"
                  icon={<DollarSign className="h-5 w-5 text-gray-400" />}
                  error={subscriptionErrors.price?.message}
                  {...registerSubscription('price', { valueAsNumber: true })}
                />

                <Input
                  label={t('admin.stripe.trialDays')}
                  type="number"
                  error={subscriptionErrors.trialDays?.message}
                  {...registerSubscription('trialDays', { valueAsNumber: true })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('admin.stripe.interval')}
                </label>
                <select
                  {...registerSubscription('interval')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="month">{t('admin.stripe.monthly')}</option>
                  <option value="year">{t('admin.stripe.yearly')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('admin.stripe.features')}
                </label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder={t('admin.stripe.addFeature')}
                  />
                  <Button
                    type="button"
                    onClick={addFeature}
                    icon={<Plus className="h-4 w-4" />}
                  >
                    Add
                  </Button>
                </div>
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span>{feature}</span>
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                type="submit" 
                className="w-full"
                isLoading={subscriptionMutation.isPending}
              >
                {t('admin.stripe.createPlan')}
              </Button>
            </form>
          </Card.Body>
        </Card>
      </TabsContent>
    </Tabs>
  );
}