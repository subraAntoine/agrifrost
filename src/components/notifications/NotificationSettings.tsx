'use client';

import { useState } from 'react';

type NotificationChannel = 'email' | 'sms' | 'app' | 'push';
type NotificationSeverity = 'info' | 'warning' | 'error';

type NotificationSetting = {
  id: string;
  label: string;
  description: string;
  channels: Record<NotificationChannel, boolean>;
  severity: NotificationSeverity;
};

// Données de démonstration
const initialSettings: NotificationSetting[] = [
  {
    id: 'frost-alert',
    label: 'Alertes de gel',
    description: 'Notifications lorsqu\'un risque de gel est détecté',
    channels: { email: true, sms: true, app: true, push: true },
    severity: 'warning'
  },
  {
    id: 'system-errors',
    label: 'Erreurs système',
    description: 'Notifications en cas de défaillance du système',
    channels: { email: true, sms: true, app: true, push: true },
    severity: 'error'
  },
  {
    id: 'sensor-offline',
    label: 'Capteurs hors ligne',
    description: 'Notifications lorsqu\'un capteur ne répond plus',
    channels: { email: true, sms: false, app: true, push: false },
    severity: 'warning'
  },
  {
    id: 'maintenance',
    label: 'Maintenance',
    description: 'Notifications concernant la maintenance programmée',
    channels: { email: true, sms: false, app: true, push: false },
    severity: 'info'
  },
  {
    id: 'battery-low',
    label: 'Batterie faible',
    description: 'Notifications lorsque la batterie d\'un appareil est faible',
    channels: { email: false, sms: false, app: true, push: true },
    severity: 'info'
  }
];

export function NotificationSettings() {
  const [settings, setSettings] = useState<NotificationSetting[]>(initialSettings);
  
  const handleToggleChannel = (settingId: string, channel: NotificationChannel) => {
    setSettings(settings.map(setting => 
      setting.id === settingId 
        ? { 
            ...setting, 
            channels: { 
              ...setting.channels, 
              [channel]: !setting.channels[channel] 
            } 
          } 
        : setting
    ));
  };
  
  const getSeverityColor = (severity: NotificationSeverity) => {
    switch(severity) {
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-amber-100 text-amber-800';
      case 'error': return 'bg-red-100 text-red-800';
    }
  };
  
  const getSeverityLabel = (severity: NotificationSeverity) => {
    switch(severity) {
      case 'info': return 'Information';
      case 'warning': return 'Avertissement';
      case 'error': return 'Erreur';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Configuration des notifications
      </h2>
      
      <div className="border-b border-gray-200 dark:border-gray-700 -mx-4 px-4">
        <div className="grid grid-cols-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
          <div className="col-span-2">Type de notification</div>
          <div className="text-center">Email</div>
          <div className="text-center">SMS</div>
          <div className="text-center">Dans l&apos;application</div>
          <div className="text-center">Notifications push</div>
        </div>
      </div>
      
      <div className="space-y-4">
        {settings.map(setting => (
          <div key={setting.id} className="py-4 border-b border-gray-200 dark:border-gray-700 -mx-4 px-4">
            <div className="grid grid-cols-6 gap-4 items-center">
              <div className="col-span-2">
                <div className="flex items-start gap-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{setting.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{setting.description}</p>
                    <span className={`inline-flex mt-2 px-2 py-0.5 rounded text-xs font-medium ${getSeverityColor(setting.severity)}`}>
                      {getSeverityLabel(setting.severity)}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Email toggle */}
              <div className="flex justify-center">
                <button
                  onClick={() => handleToggleChannel(setting.id, 'email')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    setting.channels.email ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                  } transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
                >
                  <span
                    className={`${
                      setting.channels.email ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  />
                </button>
              </div>
              
              {/* SMS toggle */}
              <div className="flex justify-center">
                <button
                  onClick={() => handleToggleChannel(setting.id, 'sms')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    setting.channels.sms ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                  } transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
                >
                  <span
                    className={`${
                      setting.channels.sms ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  />
                </button>
              </div>
              
              {/* App toggle */}
              <div className="flex justify-center">
                <button
                  onClick={() => handleToggleChannel(setting.id, 'app')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    setting.channels.app ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                  } transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
                >
                  <span
                    className={`${
                      setting.channels.app ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  />
                </button>
              </div>
              
              {/* Push toggle */}
              <div className="flex justify-center">
                <button
                  onClick={() => handleToggleChannel(setting.id, 'push')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    setting.channels.push ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                  } transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
                >
                  <span
                    className={`${
                      setting.channels.push ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-end">
        <button
          type="button"
          className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          Enregistrer les préférences
        </button>
      </div>
    </div>
  );
} 