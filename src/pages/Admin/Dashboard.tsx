import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/Tabs';
import { Analytics } from '../../components/AdminPanel/Analytics';
import { SubscriptionPlans } from '../../components/AdminPanel/SubscriptionPlans';
import { AffiliateProgram } from '../../components/AdminPanel/AffiliateProgram';
import { CreateLead } from '../../components/AdminPanel/CreateLead';
import { StripeSettings } from '../../components/AdminPanel/StripeSettings';
import { FreelancerApproval } from '../../components/AdminPanel/FreelancerApproval';
import { useTranslation } from '../../hooks/useTranslation';
import { Card } from '../../components/ui/Card';
import { Toaster } from 'react-hot-toast';

export function AdminDashboard() {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {t('admin.dashboard')}
          </h2>
        </div>
      </div>

      <Card>
        <Card.Body>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="leads">Leads</TabsTrigger>
              <TabsTrigger value="freelancers">Freelancers</TabsTrigger>
              <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="affiliates">Affiliates</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Analytics />
            </TabsContent>

            <TabsContent value="leads">
              <CreateLead />
            </TabsContent>

            <TabsContent value="freelancers">
              <FreelancerApproval />
            </TabsContent>

            <TabsContent value="subscriptions">
              <SubscriptionPlans />
            </TabsContent>

            <TabsContent value="payments">
              <StripeSettings />
            </TabsContent>

            <TabsContent value="affiliates">
              <AffiliateProgram />
            </TabsContent>
          </Tabs>
        </Card.Body>
      </Card>

      <Toaster position="top-right" />
    </div>
  );
}