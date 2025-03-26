'use client';

import { useState } from 'react';
import { NotificationHistory } from './NotificationHistory';
import { NotificationSettings } from './NotificationSettings';
import { SystemLog } from './SystemLog';
import { 
  BellIcon, 
  Cog6ToothIcon, 
  ClipboardDocumentListIcon 
} from '@heroicons/react/24/outline';

export function NotificationsPanel() {
  const [activeTab, setActiveTab] = useState<'history' | 'settings' | 'log'>('history');
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Notifications et alertes
      </h1>
      
      {/* Onglets */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'history'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('history')}
          >
            <BellIcon className="h-5 w-5 inline-block mr-2" />
            Historique des alertes
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'settings'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('settings')}
          >
            <Cog6ToothIcon className="h-5 w-5 inline-block mr-2" />
            Configuration des notifications
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'log'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('log')}
          >
            <ClipboardDocumentListIcon className="h-5 w-5 inline-block mr-2" />
            Journal du système
          </button>
        </nav>
      </div>
      
      {/* Contenu des onglets */}
      <div>
        {activeTab === 'history' && <NotificationHistory />}
        {activeTab === 'settings' && <NotificationSettings />}
        {activeTab === 'log' && <SystemLog />}
      </div>
    </div>
  );
} 