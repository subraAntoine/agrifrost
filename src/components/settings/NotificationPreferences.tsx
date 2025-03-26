'use client';

import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';

interface NotificationCategory {
  id: string;
  name: string;
  description: string;
}

type NotificationMethods = {
  email: boolean;
  sms: boolean;
  push: boolean;
  inApp: boolean;
};

type NotificationPreference = {
  categoryId: string;
  methods: NotificationMethods;
  enabled: boolean;
};

export function NotificationPreferences() {
  const categories: NotificationCategory[] = [
    {
      id: 'frost_alerts',
      name: 'Alertes de gel',
      description: 'Notifications lorsqu\'un risque de gel est détecté'
    },
    {
      id: 'system_alerts',
      name: 'Alertes système',
      description: 'Problèmes techniques ou défaillances du système'
    },
    {
      id: 'sensor_status',
      name: 'Statut des capteurs',
      description: 'Mise à jour sur l\'état des capteurs (batterie faible, hors ligne, etc.)'
    },
    {
      id: 'maintenance',
      name: 'Maintenance',
      description: 'Mises à jour planifiées et interventions de maintenance'
    },
    {
      id: 'weather_updates',
      name: 'Mises à jour météo',
      description: 'Prévisions et changements importants des conditions météorologiques'
    }
  ];
  
  const [preferences, setPreferences] = useState<NotificationPreference[]>([
    {
      categoryId: 'frost_alerts',
      methods: { email: true, sms: true, push: true, inApp: true },
      enabled: true
    },
    {
      categoryId: 'system_alerts',
      methods: { email: true, sms: false, push: true, inApp: true },
      enabled: true
    },
    {
      categoryId: 'sensor_status',
      methods: { email: false, sms: false, push: true, inApp: true },
      enabled: true
    },
    {
      categoryId: 'maintenance',
      methods: { email: true, sms: false, push: false, inApp: true },
      enabled: true
    },
    {
      categoryId: 'weather_updates',
      methods: { email: false, sms: false, push: true, inApp: true },
      enabled: false
    }
  ]);
  
  const toggleMethod = (categoryId: string, method: keyof NotificationMethods) => {
    setPreferences(
      preferences.map(pref => 
        pref.categoryId === categoryId
          ? { ...pref, methods: { ...pref.methods, [method]: !pref.methods[method] } }
          : pref
      )
    );
  };
  
  const toggleEnabled = (categoryId: string) => {
    setPreferences(
      preferences.map(pref => 
        pref.categoryId === categoryId
          ? { ...pref, enabled: !pref.enabled }
          : pref
      )
    );
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Préférences de notification
      </h2>
      
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Configurez vos préférences de notification pour différentes catégories d&apos;alertes.
      </p>
      
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">
                Catégorie
              </th>
              <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 dark:text-white">
                Email
              </th>
              <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 dark:text-white">
                SMS
              </th>
              <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 dark:text-white">
                Push
              </th>
              <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 dark:text-white">
                Dans l&apos;app
              </th>
              <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 dark:text-white">
                Activer
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
            {categories.map(category => {
              const pref = preferences.find(p => p.categoryId === category.id);
              if (!pref) return null;
              
              return (
                <tr key={category.id} className={!pref.enabled ? 'bg-gray-50 dark:bg-gray-800/50' : ''}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                    <div className="font-medium text-gray-900 dark:text-white">{category.name}</div>
                    <div className="text-gray-500 dark:text-gray-400">{category.description}</div>
                  </td>
                  
                  <td className="whitespace-nowrap px-3 py-4 text-center">
                    <button
                      type="button"
                      disabled={!pref.enabled}
                      className={`${
                        pref.methods.email && pref.enabled
                          ? 'bg-primary-600 text-white hover:bg-primary-700'
                          : 'bg-white dark:bg-gray-800 text-gray-400 border border-gray-300 dark:border-gray-600'
                      } ${!pref.enabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} inline-flex items-center justify-center h-6 w-6 rounded-md`}
                      onClick={() => toggleMethod(category.id, 'email')}
                    >
                      {pref.methods.email && <CheckIcon className="h-4 w-4" />}
                    </button>
                  </td>
                  
                  <td className="whitespace-nowrap px-3 py-4 text-center">
                    <button
                      type="button"
                      disabled={!pref.enabled}
                      className={`${
                        pref.methods.sms && pref.enabled
                          ? 'bg-primary-600 text-white hover:bg-primary-700'
                          : 'bg-white dark:bg-gray-800 text-gray-400 border border-gray-300 dark:border-gray-600'
                      } ${!pref.enabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} inline-flex items-center justify-center h-6 w-6 rounded-md`}
                      onClick={() => toggleMethod(category.id, 'sms')}
                    >
                      {pref.methods.sms && <CheckIcon className="h-4 w-4" />}
                    </button>
                  </td>
                  
                  <td className="whitespace-nowrap px-3 py-4 text-center">
                    <button
                      type="button"
                      disabled={!pref.enabled}
                      className={`${
                        pref.methods.push && pref.enabled
                          ? 'bg-primary-600 text-white hover:bg-primary-700'
                          : 'bg-white dark:bg-gray-800 text-gray-400 border border-gray-300 dark:border-gray-600'
                      } ${!pref.enabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} inline-flex items-center justify-center h-6 w-6 rounded-md`}
                      onClick={() => toggleMethod(category.id, 'push')}
                    >
                      {pref.methods.push && <CheckIcon className="h-4 w-4" />}
                    </button>
                  </td>
                  
                  <td className="whitespace-nowrap px-3 py-4 text-center">
                    <button
                      type="button"
                      disabled={!pref.enabled}
                      className={`${
                        pref.methods.inApp && pref.enabled
                          ? 'bg-primary-600 text-white hover:bg-primary-700'
                          : 'bg-white dark:bg-gray-800 text-gray-400 border border-gray-300 dark:border-gray-600'
                      } ${!pref.enabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} inline-flex items-center justify-center h-6 w-6 rounded-md`}
                      onClick={() => toggleMethod(category.id, 'inApp')}
                    >
                      {pref.methods.inApp && <CheckIcon className="h-4 w-4" />}
                    </button>
                  </td>
                  
                  <td className="whitespace-nowrap px-3 py-4 text-center">
                    <button
                      type="button"
                      className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                        pref.enabled ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                      onClick={() => toggleEnabled(category.id)}
                    >
                      <span
                        className={`${
                          pref.enabled ? 'translate-x-5' : 'translate-x-0'
                        } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                      >
                        <span
                          className={`${
                            pref.enabled ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'
                          } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                          aria-hidden="true"
                        >
                          <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                            <path
                              d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span
                          className={`${
                            pref.enabled ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'
                          } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                          aria-hidden="true"
                        >
                          <svg className="h-3 w-3 text-primary-600" fill="currentColor" viewBox="0 0 12 12">
                            <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                          </svg>
                        </span>
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Préférences de temps et fréquence */}
      <div className="space-y-4 pt-5 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-base font-medium text-gray-900 dark:text-white">Préférences de temps et fréquence</h3>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="quiet-hours" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Heures silencieuses
            </label>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Pendant cette période, vous ne recevrez pas de notifications sauf pour les alertes critiques.
            </p>
            <div className="mt-2 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="quiet-start" className="block text-xs text-gray-500 dark:text-gray-400">
                  Début
                </label>
                <input
                  type="time"
                  id="quiet-start"
                  name="quiet-start"
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-800 dark:text-white"
                  defaultValue="22:00"
                />
              </div>
              <div>
                <label htmlFor="quiet-end" className="block text-xs text-gray-500 dark:text-gray-400">
                  Fin
                </label>
                <input
                  type="time"
                  id="quiet-end"
                  name="quiet-end"
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-800 dark:text-white"
                  defaultValue="06:00"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bouton de sauvegarde */}
      <div className="pt-5 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-end">
          <button
            type="button"
            className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            Enregistrer les préférences
          </button>
        </div>
      </div>
    </div>
  );
} 