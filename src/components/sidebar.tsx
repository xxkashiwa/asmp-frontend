import {
  LayoutDashboard,
  Users,
  Building2,
  Calendar,
  Newspaper,
  Gift,
  Handshake
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import useAuthStore from '@/stores/auth-store';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

type NavItem = {
  title: string;
  path: string;
  icon?: React.ReactNode; // For future icon support
};
const navItems: NavItem[] = [
  { title: '仪表盘', path: '/', icon: <LayoutDashboard className="w-4 h-4" /> },
  { title: '校友管理', path: '/alumni', icon: <Users className="w-4 h-4" /> },
  { title: '组织管理', path: '/organizations', icon: <Building2 className="w-4 h-4" /> },
  { title: '活动管理', path: '/events', icon: <Calendar className="w-4 h-4" /> },
  { title: '高校动态', path: '/campus-news', icon: <Newspaper className="w-4 h-4" /> },
  { title: '捐赠管理', path: '/donations', icon: <Gift className="w-4 h-4" /> },
  { title: '合作伙伴', path: '/enterprises', icon: <Handshake className="w-4 h-4" /> },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, setAccessToken } =
    useAuthStore();

  const handleAuthAction = () => {
    if (isAuthenticated) {
      // Handle logout
      setIsAuthenticated(false);
      setAccessToken(null);
      navigate('/');
    } else {
      // Navigate to login page
      navigate('/login');
    }
  };

  return (
    <aside
      className={cn(
        'flex h-screen w-64 flex-col border-r bg-white shadow-sm',
        className
      )}
    >
      {/* Sidebar Header with Title */}
      <div className="flex h-16 items-center justify-center border-b px-4">
        <h1 className="text-xl font-bold text-gray-800">校友管理系统</h1>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-grow space-y-2 overflow-y-auto p-4">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'flex items-center rounded-lg px-4 py-3 transition-all duration-200',
              'hover:bg-blue-50 hover:text-blue-600',
              location.pathname === item.path
                ? 'bg-blue-100 font-medium text-blue-700'
                : 'text-gray-700'
            )}
          >
            {/* Icon placeholder - can be replaced with actual icons later */}
            <div className="mr-3 flex h-5 w-5 items-center justify-center rounded-md bg-blue-100/80">
              {item.icon || ''}
            </div>
            <span>{item.title}</span>

            {/* Active indicator */}
            {location.pathname === item.path && (
              <div className="ml-auto h-5 w-1.5 rounded-full bg-blue-500"></div>
            )}
          </Link>
        ))}
      </nav>
      {/* Login/Logout Button */}
      <div className="px-4">
        <Button
          onClick={handleAuthAction}
          variant="outline"
          className="mb-5 w-full rounded-lg bg-blue-50 transition-colors hover:bg-blue-100 hover:text-blue-700"
        >
          {isAuthenticated ? '退出登录' : '登录系统'}
        </Button>
      </div>
      {/* Sidebar Footer */}
      <div className="space-y-3 border-t p-4">
        <div className="flex items-center justify-center rounded-lg bg-blue-50 p-2 text-blue-700">
          <span className="text-sm">© 2025 校友管理系统</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
