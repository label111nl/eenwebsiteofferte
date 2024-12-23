import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { TrendingUp, Users, DollarSign } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '../ui/Card';

const mockData = [
  { month: 'Jan', demand: 65 },
  { month: 'Feb', demand: 70 },
  { month: 'Mar', demand: 75 },
  { month: 'Apr', demand: 80 },
  { month: 'May', demand: 85 },
  { month: 'Jun', demand: 90 },
];

export function MarketIntelligence() {
  const { data: marketData } = useQuery({
    queryKey: ['market-intelligence'],
    queryFn: async () => ({
      trends: mockData,
      skills: ['React', 'Node.js', 'WordPress', 'Laravel', 'Vue.js', 'Angular'],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    }),
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <Card.Body>
            <div className="flex items-center">
              <div className="bg-indigo-100 rounded-full p-3">
                <TrendingUp className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <h4 className="text-sm font-medium text-gray-900">Market Trends</h4>
                <p className="mt-1 text-2xl font-semibold text-indigo-600">+24%</p>
                <p className="text-sm text-gray-500">Growth in your sector</p>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full p-3">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h4 className="text-sm font-medium text-gray-900">Competition Level</h4>
                <p className="mt-1 text-2xl font-semibold text-green-600">Moderate</p>
                <p className="text-sm text-gray-500">12 active competitors</p>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <div className="flex items-center">
              <div className="bg-yellow-100 rounded-full p-3">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <h4 className="text-sm font-medium text-gray-900">Average Rates</h4>
                <p className="mt-1 text-2xl font-semibold text-yellow-600">€85/hr</p>
                <p className="text-sm text-gray-500">Industry average</p>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      <Card>
        <Card.Header>
          <h4 className="text-lg font-medium text-gray-900">Demand Trends</h4>
        </Card.Header>
        <Card.Body>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={marketData?.trends ?? mockData}>
                <defs>
                  <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="demand"
                  stroke="#4F46E5"
                  fillOpacity={1}
                  fill="url(#colorDemand)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}