import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, CreditCard } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { toast } from 'react-hot-toast';

export function PaymentPage() {
  const { user } = useAuth();
  const [amount, setAmount] = useState('');

  // Placeholder mutation function for processing payment
  const mutation = useMutation({
    mutationFn: async (paymentData: { amount: string }) => {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error('Payment failed');
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success('Payment successful!');
      setAmount('');
    },
    onError: () => {
      toast.error('Payment failed. Please try again.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount) {
      mutation.mutate({ amount });
    } else {
      toast.error('Please enter an amount.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <Card.Header>
            <h2 className="text-2xl font-bold text-center">Make a Payment</h2>
          </Card.Header>
          <Card.Body>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <Input
                label="Email"
                type="email"
                value={user?.email || ''}
                readOnly
                icon={<Mail className="h-5 w-5 text-gray-400" />}
              />

              <Input
                label="Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                icon={<CreditCard className="h-5 w-5 text-gray-400" />}
              />

              <Button
                type="submit"
                className="w-full"
                isLoading={mutation.isPending}
              >
                Pay Now
              </Button>

              {mutation.isError && (
                <p className="text-sm text-red-600 text-center">
                  Payment failed. Please try again.
                </p>
              )}
            </form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
