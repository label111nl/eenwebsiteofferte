import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Check, X, User, Building2, Star, Eye } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useTranslation } from '../../hooks/useTranslation';
import { toast } from 'react-hot-toast';
import { Modal } from '../ui/Modal';

interface FreelancerApprovalData {
  id: string;
  name: string;
  email: string;
  company: string;
  kvk_number?: string;
  portfolio_items: number;
  created_at: string;
  status: 'pending' | 'approved' | 'rejected';
  bio?: string;
  skills?: string[];
  hourly_rate?: number;
}

const mockFreelancers: FreelancerApprovalData[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    company: 'Web Solutions',
    kvk_number: '12345678',
    portfolio_items: 3,
    created_at: new Date().toISOString(),
    status: 'pending',
    bio: 'Experienced web developer specializing in React and Node.js',
    skills: ['React', 'Node.js', 'TypeScript'],
    hourly_rate: 85
  }
];

export function FreelancerApproval() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [selectedFreelancer, setSelectedFreelancer] = React.useState<FreelancerApprovalData | null>(null);

  const { data: freelancers = mockFreelancers, isLoading } = useQuery({
    queryKey: ['pending-freelancers'],
    queryFn: async () => mockFreelancers
  });

  const mutation = useMutation({
    mutationFn: async ({ freelancerId, approved }: { freelancerId: string; approved: boolean }) => {
      // API call to approve/reject freelancer
      return new Promise(resolve => setTimeout(resolve, 1000));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-freelancers'] });
      toast.success(t('admin.freelancers.actionSuccess'));
    },
    onError: () => {
      toast.error(t('admin.freelancers.actionError'));
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {freelancers.map((freelancer) => (
          <Card key={freelancer.id} className="hover:shadow-lg transition-shadow duration-200">
            <Card.Body>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-indigo-100 rounded-full p-2">
                    <User className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{freelancer.name}</h4>
                    <p className="text-sm text-gray-500">{freelancer.email}</p>
                  </div>
                </div>
                <Badge status={freelancer.status} />
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{freelancer.company}</p>
                    <p className="text-xs text-gray-500">KvK: {freelancer.kvk_number}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {freelancer.portfolio_items} Portfolio Items
                    </p>
                    <p className="text-xs text-gray-500">€{freelancer.hourly_rate}/hour</p>
                  </div>
                </div>

                <div className="text-sm text-gray-500">
                  Registered {formatDistanceToNow(new Date(freelancer.created_at))} ago
                </div>
              </div>

              <div className="mt-4 flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedFreelancer(freelancer)}
                  icon={<Eye className="h-4 w-4" />}
                >
                  {t('admin.freelancers.view')}
                </Button>
                {freelancer.status === 'pending' && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => mutation.mutate({ freelancerId: freelancer.id, approved: false })}
                      icon={<X className="h-4 w-4" />}
                      isLoading={mutation.isPending}
                    >
                      {t('admin.freelancers.reject')}
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => mutation.mutate({ freelancerId: freelancer.id, approved: true })}
                      icon={<Check className="h-4 w-4" />}
                      isLoading={mutation.isPending}
                    >
                      {t('admin.freelancers.approve')}
                    </Button>
                  </>
                )}
              </div>
            </Card.Body>
          </Card>
        ))}

        {freelancers.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">
              {t('admin.freelancers.noRequests')}
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              {t('admin.freelancers.checkLater')}
            </p>
          </div>
        )}
      </div>

      <Modal
        isOpen={!!selectedFreelancer}
        onClose={() => setSelectedFreelancer(null)}
        title={t('admin.freelancers.details')}
      >
        {selectedFreelancer && (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">{t('admin.freelancers.bio')}</h4>
              <p className="mt-1 text-sm text-gray-900">{selectedFreelancer.bio}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">{t('admin.freelancers.skills')}</h4>
              <div className="mt-1 flex flex-wrap gap-2">
                {selectedFreelancer.skills?.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">{t('admin.freelancers.rate')}</h4>
                <p className="mt-1 text-sm text-gray-900">€{selectedFreelancer.hourly_rate}/hour</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">{t('admin.freelancers.portfolio')}</h4>
                <p className="mt-1 text-sm text-gray-900">{selectedFreelancer.portfolio_items} items</p>
              </div>
            </div>

            {selectedFreelancer.status === 'pending' && (
              <div className="flex justify-end space-x-2 mt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    mutation.mutate({ freelancerId: selectedFreelancer.id, approved: false });
                    setSelectedFreelancer(null);
                  }}
                  icon={<X className="h-4 w-4" />}
                  isLoading={mutation.isPending}
                >
                  {t('admin.freelancers.reject')}
                </Button>
                <Button
                  onClick={() => {
                    mutation.mutate({ freelancerId: selectedFreelancer.id, approved: true });
                    setSelectedFreelancer(null);
                  }}
                  icon={<Check className="h-4 w-4" />}
                  isLoading={mutation.isPending}
                >
                  {t('admin.freelancers.approve')}
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}