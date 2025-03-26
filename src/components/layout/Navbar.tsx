'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, ChartBarIcon, BellIcon, CogIcon, BeakerIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import { ThemeToggle } from './ThemeToggle';

const NAV_ITEMS = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Monitoring', href: '/monitoring', icon: BeakerIcon },
  { name: 'Contrôle', href: '/control', icon: LightBulbIcon },
  { name: 'Analyses', href: '/analytics', icon: ChartBarIcon },
  { name: 'Notifications', href: '/notifications', icon: BellIcon },
  { name: 'Paramètres', href: '/settings', icon: CogIcon },
];

// Ajouter un lien vers la landing page en haut de la barre de navigation
const BRAND_LINK = { name: 'AgriFrost', href: '/landing' };

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center font-semibold text-xl text-primary-600 dark:text-primary-400">
              <Link href={BRAND_LINK.href}>
                <span className="hidden sm:inline">AgriFrost</span>
                <span className="sm:hidden">AF</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive
                        ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    <item.icon className="h-5 w-5 mr-1" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <div className="sm:hidden">
        <div className="pt-2 pb-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 text-base font-medium ${
                  isActive
                    ? 'bg-primary-50 border-l-4 border-primary-500 text-primary-700 dark:bg-gray-800 dark:border-primary-500 dark:text-primary-400'
                    : 'border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                }`}
              >
                <item.icon className="h-6 w-6 mr-2" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
} 