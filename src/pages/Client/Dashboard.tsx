import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { PlusCircle, Users, MessageCircle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProjectStats } from './ProjectStats';
import { ProjectList } from './ProjectList';
import { FreelancerResponses } from './FreelancerResponses';

export function ClientDashboard() {
  const navigate = useNavigate();
  
  const { data: stats } = useQuery({
    queryKey: ['project-stats'],
    queryFn: async () => ({
      totalProjects: 1,
      activeProjects: 1,
      totalResponses: 3,
    }),
  });

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold text-gray-900">Project Dashboard</h2>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <Button
            onClick={() => navigate('/projects/new')}
            icon={<PlusCircle className="h-4 w-4" />}
          >
            Nieuw Project Plaatsen
          </Button>
        </div>
      </div>

      <ProjectStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <Card.Header>
            <h3 className="text-lg font-medium text-gray-900">Actieve Projecten</h3>
          </Card.Header>
          <Card.Body>
            <ProjectList />
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <h3 className="text-lg font-medium text-gray-900">Recente Reacties</h3>
          </Card.Header>
          <Card.Body>
            <FreelancerResponses />
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}