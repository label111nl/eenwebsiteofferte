import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { TrendingUp, Users, DollarSign } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '../ui/Card';
import { useTranslation } from '../../hooks/useTranslation';

const mockData = [
  { month: 'Jan', revenue: 12000 },
  { month: 'Feb', revenue: 19000 },
  { month: 'Mar', revenue: 15000 },
  { month: 'Apr', revenue: 22000 },
  { month: 'May', revenue: 24000 },
  { month: 'Jun', revenue: 24500 },
];

export function Analytics() {
  const { t } = useTranslation();
  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => ({
      signups: [],
      revenue: mockData,
      leads: [],
    }),
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <Card.Body>
            <div className="flex items-center">
              <div className="bg-indigo-100 rounded-full p-3">
                <DollarSign className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{t('admin.analytics.revenue')}</h3>
                <div className="text-3xl font-bold">€24,500</div>
                <div className="text-sm text-green-600">+12% from last month</div>
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
                <h3 className="text-lg font-medium text-gray-900">{t('admin.analytics.freelancers')}</h3>
                <div className="text-3xl font-bold">156</div>
                <div className="text-sm text-green-600">+8% from last month</div>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <div className="flex items-center">
              <div className="bg-yellow-100 rounded-full p-3">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{t('admin.analytics.conversion')}</h3>
                <div className="text-3xl font-bold">24.8%</div>
                <div className="text-sm text-red-600">-2% from last month</div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      <Card>
        <Card.Header>
          <h3 className="text-lg font-medium text-gray-900">{t('admin.analytics.revenueChart')}</h3>
        </Card.Header>
        <Card.Body>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats?.revenue ?? mockData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
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
                  dataKey="revenue"
                  stroke="#4F46E5"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}