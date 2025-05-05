import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import Sidebar from './sidebar';

const Layout: React.FC = () => {
  useEffect(() => {
    toast.success('欢迎使用校友管理系统！');
  }, []);

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
