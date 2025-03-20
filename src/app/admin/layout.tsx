'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

// Define menu items for each user type
const menuItems = {
  restaurant: [
    { path: '/admin', label: 'Dashboard', icon: '🏠' },
    { path: '/admin/payment', label: 'Payment Management', icon: '💳' },
    { path: '/admin/users', label: 'User Management', icon: '👥' },
    { path: '/admin/settings', label: 'Settings', icon: '⚙️' },
  ],
  toll: [
    { path: '/admin', label: 'Dashboard', icon: '🏠' },
    { path: '/admin/payment', label: 'Payment Management', icon: '💳' },
    { path: '/admin/locations', label: 'Location Services', icon: '📍' },
    { path: '/admin/toll', label: 'Toll Management', icon: '🛣️' },
    { path: '/admin/users', label: 'User Management', icon: '👥' },
    { path: '/admin/settings', label: 'Settings', icon: '⚙️' },
  ],
  business: [
    { path: '/admin', label: 'Dashboard', icon: '🏠' },
    { path: '/admin/payment', label: 'Payment Management', icon: '💳' },
    { path: '/admin/locations', label: 'Location Services', icon: '📍' },
    { path: '/admin/users', label: 'User Management', icon: '👥' },
    { path: '/admin/settings', label: 'Settings', icon: '⚙️' },
  ],
  taxi: [
    { path: '/admin', label: 'Dashboard', icon: '🏠' },
    { path: '/admin/payment', label: 'Payment Management', icon: '💳' },
    { path: '/admin/locations', label: 'Location Services', icon: '📍' },
    { path: '/admin/users', label: 'User Management', icon: '👥' },
    { path: '/admin/settings', label: 'Settings', icon: '⚙️' },
  ],
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [userType, setUserType] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const userJson = localStorage.getItem('currentUser');
    if (!userJson) {
      router.push('/login');
      return;
    }

    const user = JSON.parse(userJson);
    setUserType(user.type);
    setUserName(user.name);
  }, [router]);

  if (!userType) return null;

  const currentUserMenuItems = menuItems[userType as keyof typeof menuItems] || [];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
              <span className="text-xl">Q</span>
            </div>
            <span className="text-xl font-semibold">QR-less Admin</span>
          </div>
          <div className="text-sm text-gray-400 mb-4">
            Welcome, {userName}
          </div>
        </div>
        <nav className="space-y-1">
          {currentUserMenuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center space-x-2 px-4 py-3 text-sm ${
                pathname === item.path
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-100 dark:bg-gray-900">
        {children}
      </div>
    </div>
  );
} 