import { RouteObject } from 'react-router-dom';
import Dashboard from '../pages/Admin/Dashboard';
import LeadApproval from '../components/AdminPanel/LeadApproval';
import FreelancerApproval from '../components/AdminPanel/FreelancerApproval';
import SubscriptionPlans from '../components/AdminPanel/SubscriptionPlans';

const adminRoutes: RouteObject[] = [
  {
    path: '/admin/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/admin/leads/approval',
    element: <LeadApproval />,
  },
  {
    path: '/admin/freelancers/approval',
    element: <FreelancerApproval />,
  },
  {
    path: '/admin/subscriptions',
    element: <SubscriptionPlans />,
  },
];

export default adminRoutes;
