import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Eye } from 'lucide-react';

export function ProjectList() {
  const { data: projects } = useQuery({
    queryKey: ['client-projects'],
    queryFn: async () => ([
      {
        id: '1',
        title: 'E-commerce Website',
        description: 'Modern e-commerce platform with custom features',
        budget: 15000,
        status: 'active',
        responses: 3,
        created_at: new Date().toISOString(),
      }
    ]),
  });

  return (
    <div className="space-y-4">
      {projects?.map((project) => (
        <div key={project.id} className="border rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-lg font-medium text-gray-900">{project.title}</h4>
              <p className="mt-1 text-sm text-gray-500">{project.description}</p>
            </div>
            <Badge status={project.status} />
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Posted {formatDistanceToNow(new Date(project.created_at))} ago
            </div>
            <Button
              variant="outline"
              size="sm"
              icon={<Eye className="h-4 w-4" />}
            >
              View Responses ({project.responses})
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}