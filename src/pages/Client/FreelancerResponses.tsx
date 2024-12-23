import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { MessageCircle } from 'lucide-react';

export function FreelancerResponses() {
  const { data: responses } = useQuery({
    queryKey: ['freelancer-responses'],
    queryFn: async () => ([
      {
        id: '1',
        freelancer: {
          id: '1',
          name: 'John Doe',
          avatar: 'https://ui-avatars.com/api/?name=John+Doe',
        },
        project: {
          id: '1',
          title: 'E-commerce Website',
        },
        message: 'I have extensive experience with similar projects...',
        status: 'pending',
        created_at: new Date().toISOString(),
      }
    ]),
  });

  return (
    <div className="space-y-4">
      {responses?.map((response) => (
        <div key={response.id} className="border rounded-lg p-4">
          <div className="flex items-start space-x-4">
            <img
              src={response.freelancer.avatar}
              alt={response.freelancer.name}
              className="h-10 w-10 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <p className="text-sm font-medium text-gray-900">
                  {response.freelancer.name}
                </p>
                <Badge status={response.status} />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {response.project.title}
              </p>
              <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                {response.message}
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(response.created_at))} ago
            </div>
            <Button
              variant="outline"
              size="sm"
              icon={<MessageCircle className="h-4 w-4" />}
            >
              Chat
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}