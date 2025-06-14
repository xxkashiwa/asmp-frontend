import ActivityManagement from '@/pages/activity-management';
import { RouteObject } from 'react-router-dom';
import Layout from '../components/layout';
import AlumniManagement from '../pages/alumni-management';
import Login from '../pages/auth/login';
import Register from '../pages/auth/register';
import NoticeManagement from '../pages/notice-management';
import DonationsManagement from '../pages/donations-management';
import EnterpriseManagement from '../pages/enterprise-management';
import Home from '../pages/home';
import NotFound from '../pages/not-found';
import OrganizationManagement from '../pages/organization-management';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'alumni',
        element: <AlumniManagement />,
      },
      {
        path: 'organizations',
        element: <OrganizationManagement />,
      },
      {
        path: 'events',
        element: <ActivityManagement />,
      },
      {
        path: 'notices',
        element: <NoticeManagement />,
      },
      {
        path: 'donations',
        element: <DonationsManagement />,
      },
      {
        path: 'enterprises',
        element: <EnterpriseManagement />,
      },
    ],
  },
];

export default routes;
