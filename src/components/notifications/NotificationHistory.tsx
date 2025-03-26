'use client';

import { useState } from 'react';
import { 
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

type NotificationType = 'info' | 'warning' | 'error' | 'success';
type Notification = {
  id: string;
  type: NotificationType;
  message: string;
  timestamp: Date;
  read: boolean;
  zone?: string;
  details?: string;
};

// Données de démonstration
const demoNotifications: Notification[] = [
  {
    id: '1',
    type: 'warning',
    message: 'Risque de gel détecté dans la zone Est',
    timestamp: new Date(2023, 11, 10, 22, 30),
    read: true,
    zone: 'Est',
    details: 'Température prévue: -2°C à 3h du matin'
  },
  {
    id: '2',
    type: 'error',
    message: 'Défaillance du capteur #A245',
    timestamp: new Date(2023, 11, 9, 14, 15),
    read: true,
    zone: 'Nord',
    details: 'Le capteur ne répond plus depuis 14h15'
  },
  {
    id: '3',
    type: 'info',
    message: 'Maintenance du système programmée',
    timestamp: new Date(2023, 11, 15, 9, 0),
    read: false,
    details: 'Mise à jour logicielle prévue le 15/12/2023'
  },
  {
    id: '4',
    type: 'success',
    message: 'Protection antigel activée avec succès',
    timestamp: new Date(2023, 11, 8, 2, 45),
    read: true,
    zone: 'Ouest'
  },
  {
    id: '5',
    type: 'warning',
    message: 'Niveau de batterie faible sur station #S342',
    timestamp: new Date(2023, 11, 7, 18, 22),
    read: false,
    zone: 'Sud',
    details: 'Batterie à 15%, rechargement nécessaire'
  }
];

const getIconForType = (type: NotificationType) => {
  switch(type) {
    case 'info':
      return <InformationCircleIcon className="h-5 w-5 text-blue-500" />;
    case 'warning':
      return <ExclamationTriangleIcon className="h-5 w-5 text-amber-500" />;
    case 'error':
      return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
    case 'success':
      return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
  }
};

export function NotificationHistory() {
  const [notifications, setNotifications] = useState<Notification[]>(demoNotifications);
  const [filter, setFilter] = useState<NotificationType | 'all'>('all');

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === filter);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Historique des alertes
        </h2>
        
        <div className="relative">
          <button className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            <FunnelIcon className="h-4 w-4" />
            Filtrer
          </button>
          
          <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <button 
                className={`block px-4 py-2 text-sm w-full text-left ${filter === 'all' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                onClick={() => setFilter('all')}
              >
                Toutes
              </button>
              <button 
                className={`block px-4 py-2 text-sm w-full text-left ${filter === 'info' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                onClick={() => setFilter('info')}
              >
                Informations
              </button>
              <button 
                className={`block px-4 py-2 text-sm w-full text-left ${filter === 'warning' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                onClick={() => setFilter('warning')}
              >
                Avertissements
              </button>
              <button 
                className={`block px-4 py-2 text-sm w-full text-left ${filter === 'error' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                onClick={() => setFilter('error')}
              >
                Erreurs
              </button>
              <button 
                className={`block px-4 py-2 text-sm w-full text-left ${filter === 'success' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                onClick={() => setFilter('success')}
              >
                Succès
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {filteredNotifications.length === 0 ? (
          <li className="py-4 text-center text-gray-500 dark:text-gray-400">
            Aucune notification
          </li>
        ) : (
          filteredNotifications.map(notification => (
            <li 
              key={notification.id}
              className={`py-4 hover:bg-gray-50 dark:hover:bg-gray-800 ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0 pt-1">
                  {getIconForType(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {notification.message}
                  </p>
                  {notification.zone && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Zone: {notification.zone}
                    </p>
                  )}
                  {notification.details && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {notification.details}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {formatDate(notification.timestamp)}
                  </p>
                </div>
                {!notification.read && (
                  <div className="flex-shrink-0">
                    <span className="inline-flex h-2 w-2 rounded-full bg-blue-600"></span>
                  </div>
                )}
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
} 