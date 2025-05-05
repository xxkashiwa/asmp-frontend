import { RouteObject } from 'react-router-dom';
import Layout from '../components/layout';
import About from '../pages/about';
import Home from '../pages/home';
import NotFound from '../pages/not-found';
import Login from '../pages/login';
import Register from '../pages/register';
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
        path: 'about',
        element: <About />,
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
      }
    ],
  },
];

export default routes;
