'use client';

import { useState } from 'react';
import { 
  UserIcon, 
  Cog6ToothIcon, 
  BellIcon, 
  ShieldCheckIcon, 
  LanguageIcon,
  WrenchIcon
} from '@heroicons/react/24/outline';
import { GeneralSettings } from './GeneralSettings';
import { UserProfileSettings } from './UserProfileSettings';
import { NotificationPreferences } from './NotificationPreferences';
import { SecuritySettings } from './SecuritySettings';
import { SystemMaintenance } from './SystemMaintenance';

type SettingsTab = 'general' | 'profile' | 'notifications' | 'security' | 'system';

export function SettingsPanel() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Paramètres
      </h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Navigation latérale */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
            <nav className="flex flex-col">
              <button
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium text-left ${
                  activeTab === 'general'
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border-l-4 border-primary-500'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('general')}
              >
                <Cog6ToothIcon className="h-5 w-5" />
                Configuration générale
              </button>
              
              <button
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium text-left ${
                  activeTab === 'profile'
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border-l-4 border-primary-500'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('profile')}
              >
                <UserIcon className="h-5 w-5" />
                Profil utilisateur
              </button>
              
              <button
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium text-left ${
                  activeTab === 'notifications'
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border-l-4 border-primary-500'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('notifications')}
              >
                <BellIcon className="h-5 w-5" />
                Préférences de notification
              </button>
              
              <button
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium text-left ${
                  activeTab === 'security'
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border-l-4 border-primary-500'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('security')}
              >
                <ShieldCheckIcon className="h-5 w-5" />
                Sécurité
              </button>
              
              <button
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium text-left ${
                  activeTab === 'system'
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border-l-4 border-primary-500'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('system')}
              >
                <WrenchIcon className="h-5 w-5" />
                Maintenance système
              </button>
            </nav>
          </div>
        </div>
        
        {/* Contenu des onglets */}
        <div className="flex-1 bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
          {activeTab === 'general' && <GeneralSettings />}
          {activeTab === 'profile' && <UserProfileSettings />}
          {activeTab === 'notifications' && <NotificationPreferences />}
          {activeTab === 'security' && <SecuritySettings />}
          {activeTab === 'system' && <SystemMaintenance />}
        </div>
      </div>
    </div>
  );
} 