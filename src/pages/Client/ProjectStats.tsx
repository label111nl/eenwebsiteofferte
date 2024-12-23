import React from 'react';
import { Card } from '../../components/ui/Card';
import { FileText, Users, CheckCircle } from 'lucide-react';

interface ProjectStatsProps {
  stats?: {
    totalProjects: number;
    activeProjects: number;
    totalResponses: number;
  };
}

export function ProjectStats({ stats }: ProjectStatsProps) {
  const items = [
    {
      name: 'Total Projects',
      value: stats?.totalProjects ?? 0,
      icon: FileText,
      color: 'text-blue-600',
    },
    {
      name: 'Active Projects',
      value: stats?.activeProjects ?? 0,
      icon: CheckCircle,
      color: 'text-green-600',
    },
    {
      name: 'Total Responses',
      value: stats?.totalResponses ?? 0,
      icon: Users,
      color: 'text-purple-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <Card key={item.name}>
          <Card.Body>
            <div className="flex items-center">
              <div className={`rounded-md p-3 ${item.color} bg-opacity-10`}>
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{item.value}</p>
              </div>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}