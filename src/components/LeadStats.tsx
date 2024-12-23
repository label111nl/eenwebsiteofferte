import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { wordpressApi } from '../api/wordpress';
import { Users, DollarSign, CheckCircle } from 'lucide-react';

export function LeadStats() {
  const { data: forms } = useQuery({
    queryKey: ['wordpress-forms'],
    queryFn: wordpressApi.getForms,
  });

  const { data: submissions } = useQuery({
    queryKey: ['form-submissions', forms?.[0]?.id],
    queryFn: () => forms?.[0]?.id ? wordpressApi.getFormSubmissions(forms[0].id) : null,
    enabled: !!forms?.[0]?.id,
  });

  const stats = [
    {
      name: 'Total Leads',
      value: submissions?.length ?? 0,
      icon: Users,
      change: '+4.75%',
      changeType: 'positive',
    },
    {
      name: 'Conversion Rate',
      value: `${((submissions?.filter(s => s.data.status === 'converted')?.length ?? 0) / 
        (submissions?.length ?? 1) * 100).toFixed(1)}%`,
      icon: CheckCircle,
      change: '+54.02%',
      changeType: 'positive',
    },
    {
      name: 'Average Lead Value',
      value: submissions?.reduce((acc, s) => acc + (parseFloat(s.data.budget) || 0), 0) ?? 0 / 
        (submissions?.length ?? 1),
      icon: DollarSign,
      change: '+12.05%',
      changeType: 'positive',
    },
  ];

  return (
    <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
      {stats.map((item) => (
        <div
          key={item.name}
          className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
        >
          <dt>
            <div className="absolute rounded-md bg-indigo-500 p-3">
              <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500">
              {item.name}
            </p>
          </dt>
          <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900">
              {typeof item.value === 'number' && item.name === 'Average Lead Value'
                ? `$${item.value.toLocaleString()}`
                : item.value}
            </p>
            <p
              className={`ml-2 flex items-baseline text-sm font-semibold ${
                item.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {item.change}
            </p>
          </dd>
        </div>
      ))}
    </dl>
  );
}