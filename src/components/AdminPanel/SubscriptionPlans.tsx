import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PlusCircle, Edit2, Trash2 } from 'lucide-react';
import { Modal } from '../ui/Modal';

interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  active: boolean;
}

export function SubscriptionPlans() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (plan: Plan) => {
      // API call to update/create plan
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscription-plans'] });
      setIsModalOpen(false);
      setEditingPlan(null);
    },
  });

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">Subscription Plans</h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Plan
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Example Plan Card */}
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-medium">Premium</h4>
                <p className="text-gray-500">€99/month</p>
              </div>
              <div className="flex space-x-2">
                <button className="text-gray-400 hover:text-gray-500">
                  <Edit2 className="h-4 w-4" />
                </button>
                <button className="text-red-400 hover:text-red-500">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center text-sm text-gray-600">
                <span className="mr-2">•</span>
                Unlimited leads
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <span className="mr-2">•</span>
                LinkedIn Scanner
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingPlan(null);
        }}
        title={editingPlan ? 'Edit Plan' : 'Add Plan'}
      >
        {/* Plan form */}
      </Modal>
    </div>
  );
}