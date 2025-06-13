import useAuthStore from '@/stores/auth-store';
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import Sidebar from './sidebar';
const Layout: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const publicRoutes = ['/login', '/register'];
    const currentPath = location.pathname;

    if (!isAuthenticated && !publicRoutes.includes(currentPath)) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate, location.pathname]);

  return (
    <div className="flex h-screen w-screen bg-gray-50">
      <Sidebar />

      <main className="flex h-full w-full p-6">
        <Outlet />
        <Toaster richColors position="top-right" />
      </main>
    </div>
  );
};

export default Layout;
