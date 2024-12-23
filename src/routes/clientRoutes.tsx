import { RouteObject } from 'react-router-dom';
import Dashboard from '../pages/Client/Dashboard';
import Onboarding from '../pages/Client/Onboarding';
import NewProject from '../pages/Client/NewProject';
import ProjectList from '../pages/Client/ProjectList';
import FreelancerResponses from '../pages/Client/FreelancerResponses';
import ProjectStats from '../pages/Client/ProjectStats';

const clientRoutes: RouteObject[] = [
  {
    path: '/client/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/client/onboarding',
    element: <Onboarding />,
  },
  {
    path: '/client/new-project',
    element: <NewProject />,
  },
  {
    path: '/client/projects',
    element: <ProjectList />,
  },
  {
    path: '/client/freelancer-responses',
    element: <FreelancerResponses />,
  },
  {
    path: '/client/project-stats',
    element: <ProjectStats />,
  },
];

export default clientRoutes;
