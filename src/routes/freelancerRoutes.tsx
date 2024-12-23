import { RouteObject } from 'react-router-dom';
import Dashboard from '../pages/Freelancer/Dashboard';
import Onboarding from '../pages/Freelancer/Onboarding';
import OnboardingQuiz from '../pages/Freelancer/OnboardingQuiz';
import LeadList from '../pages/Leads/LeadList';
import LeadDetails from '../pages/Leads/LeadDetails';

const freelancerRoutes: RouteObject[] = [
  {
    path: '/freelancer/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/freelancer/onboarding',
    element: <Onboarding />,
  },
  {
    path: '/freelancer/onboarding-quiz',
    element: <OnboardingQuiz />,
  },
  {
    path: '/freelancer/leads',
    element: <LeadList />,
  },
  {
    path: '/freelancer/leads/:id',
    element: <LeadDetails />,
  },
];

export default freelancerRoutes;
