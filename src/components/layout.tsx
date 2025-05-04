import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { toast, Toaster } from 'sonner';

const Layout: React.FC = () => {
  useEffect(() => {
    toast.success(
      '欢迎使用 React Router V6 + TypeScript + Vite + Sonner Toast +Shadcn  的脚手架项目！'
    );
  }, []);
  return (
    <div>
      <nav>
        <ul style={{ display: 'flex', listStyle: 'none', gap: '20px' }}>
          <li>
            <Link to="/">首页</Link>
          </li>
          <li>
            <Link to="/about">关于</Link>
          </li>
        </ul>
      </nav>
      <hr />
      <main>
        <Outlet />
        <Toaster richColors position="top-right" />
      </main>
    </div>
  );
};

export default Layout;
