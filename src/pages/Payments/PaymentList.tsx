import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { freelancerApi } from '../../api';
import { Payment } from '../../types';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '../../components/ui/Badge';

export function PaymentList() {
  const { data: payments = [], isLoading } = useQuery<Payment[]>({
    queryKey: ['payments'],
    queryFn: freelancerApi.getPayments,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {payments.map((payment) => (
          <li key={payment.id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="truncate">
                  <div className="flex text-sm">
                    <p className="font-medium text-indigo-600 truncate">
                      ${payment.amount.toLocaleString()}
                    </p>
                    <p className="ml-1 flex-shrink-0 text-gray-500">
                      {formatDistanceToNow(new Date(payment.created_at))} ago
                    </p>
                  </div>
                </div>
                <div className="ml-2 flex flex-shrink-0">
                  <Badge status={payment.status} />
                </div>
              </div>
              <div className="mt-2">
                <div className="sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      Type: {payment.type}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}