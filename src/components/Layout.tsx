import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, Users, FileText, Settings, Menu, X, LogOut, Globe } from 'lucide-react';
import { Notifications } from './Notifications';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from '../contexts/TranslationContext';
import clsx from 'clsx';

const getNavigation = (role: string) => {
  switch (role) {
    case 'admin':
      return [
        { name: 'Dashboard', href: '/', icon: Home },
        { name: 'Lead Approval', href: '/admin/leads', icon: Users },
        { name: 'Freelancer Approval', href: '/admin/freelancers', icon: Users },
        { name: 'Settings', href: '/settings', icon: Settings },
      ];
    case 'client':
      return [
        { name: 'Dashboard', href: '/', icon: Home },
        { name: 'My Projects', href: '/projects', icon: FileText },
        { name: 'Settings', href: '/settings', icon: Settings },
      ];
    default: // freelancer
      return [
        { name: 'Dashboard', href: '/', icon: Home },
        { name: 'Leads', href: '/leads', icon: Users },
        { name: 'Settings', href: '/settings', icon: Settings },
      ];
  }
};

export function Layout() {
  const { user, clearAuth } = useAuth();
  const { setLanguage, currentLanguage } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const navigation = getNavigation(user?.role || 'freelancer');

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  const toggleLanguage = () => {
    setLanguage(currentLanguage === 'nl' ? 'en' : 'nl');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-16 fixed w-full top-0 z-50 bg-white shadow-sm">
        <div className="flex-1 px-4 flex justify-between">
          <div className="flex-1 flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="hidden lg:flex lg:items-center lg:space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={clsx(
                    'text-gray-900 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium',
                    location.pathname === item.href && 'bg-gray-50'
                  )}
                >
                  <item.icon className="h-5 w-5 inline-block mr-2" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full text-gray-500 hover:text-gray-900"
            >
              <Globe className="h-5 w-5" />
              <span className="ml-1">{currentLanguage.toUpperCase()}</span>
            </button>
            <Notifications />
            <button
              onClick={handleLogout}
              className="p-2 rounded-full text-gray-500 hover:text-gray-900"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="pt-16 lg:pl-64">
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 flex flex-col w-64 bg-white border-r border-gray-200">
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
              <span className="text-xl font-semibold">Menu</span>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={clsx(
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                    location.pathname === item.href
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-3 h-6 w-6" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}