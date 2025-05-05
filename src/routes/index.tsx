import { RouteObject } from 'react-router-dom';
import Layout from '../components/layout';
import AlumniManagement from '../pages/alumni-management';
import Login from '../pages/auth/login';
import Register from '../pages/auth/register';
import CampusNewsManagement from '../pages/campus-news-management';
import DonationManagement from '../pages/donation-management';
import EventManagement from '../pages/event-management';
import Home from '../pages/home';
import NotFound from '../pages/not-found';
import OrganizationManagement from '../pages/organization-management';
import PartnershipManagement from '../pages/partnership-management';

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
        element: <EventManagement />,
      },
      {
        path: 'campus-news',
        element: <CampusNewsManagement />,
      },
      {
        path: 'donations',
        element: <DonationManagement />,
      },
      {
        path: 'partnerships',
        element: <PartnershipManagement />,
      },
    ],
  },
];

export default routes;
