'use client';

import { useState } from 'react';
import { XCircleIcon, ChartBarIcon, BoltIcon, CalendarIcon } from '@heroicons/react/24/outline';

interface SystemSettingsProps {
  settings: any;
  onUpdateSettings: (settings: any) => void;
}

export function SystemSettings({ settings, onUpdateSettings }: SystemSettingsProps) {
  const [localSettings, setLocalSettings] = useState(settings);
  
  const saveSettings = () => {
    onUpdateSettings(localSettings);
  };
  
  return (
    <div className="space-y-8">
      {/* Seuils d'alerte */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-4">
          <XCircleIcon className="h-5 w-5 text-danger-500 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Seuils d&apos;alerte
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-base font-medium text-gray-700 dark:text-gray-300 mb-3">
              Température
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Avertissement (°C)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={localSettings.alertThresholds.temperatureWarning}
                  onChange={(e) => {
                    setLocalSettings({
                      ...localSettings,
                      alertThresholds: {
                        ...localSettings.alertThresholds,
                        temperatureWarning: parseFloat(e.target.value)
                      }
                    });
                  }}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Danger (°C)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={localSettings.alertThresholds.temperatureDanger}
                  onChange={(e) => {
                    setLocalSettings({
                      ...localSettings,
                      alertThresholds: {
                        ...localSettings.alertThresholds,
                        temperatureDanger: parseFloat(e.target.value)
                      }
                    });
                  }}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modèle prédictif */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-4">
          <ChartBarIcon className="h-5 w-5 text-info-500 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Modèle prédictif
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Sensibilité (%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={localSettings.predictiveModel.sensitivity}
                onChange={(e) => {
                  setLocalSettings({
                    ...localSettings,
                    predictiveModel: {
                      ...localSettings.predictiveModel,
                      sensitivity: parseInt(e.target.value)
                    }
                  });
                }}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Périodes à risque */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-4">
          <CalendarIcon className="h-5 w-5 text-primary-500 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Périodes à risque
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Nom
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date de début
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date de fin
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actif
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              {localSettings.riskPeriods.map((period) => (
                <tr key={period.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {period.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(period.startDate).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(period.endDate).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span 
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        period.active 
                          ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                      }`}
                    >
                      {period.active ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Enregistrer les paramètres */}
      <div className="flex justify-end">
        <button
          onClick={saveSettings}
          className="flex items-center px-6 py-3 rounded-lg font-medium bg-primary-500 text-white hover:bg-primary-600 shadow-sm"
        >
          Enregistrer les paramètres
        </button>
      </div>
    </div>
  );
} 