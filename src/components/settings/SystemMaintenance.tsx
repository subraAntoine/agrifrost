'use client';

import { useState } from 'react';
import { 
  ArrowPathIcon, 
  TrashIcon, 
  ArrowDownTrayIcon, 
  DocumentDuplicateIcon,
  ArrowUpTrayIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

interface SystemVersion {
  version: string;
  lastUpdated: Date;
  currentVersion: boolean;
}

export function SystemMaintenance() {
  const [backupFrequency, setBackupFrequency] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [backupTime, setBackupTime] = useState('02:00');
  const [retentionPeriod, setRetentionPeriod] = useState('30');
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  
  const [versions, setVersions] = useState<SystemVersion[]>([
    {
      version: '2.4.1',
      lastUpdated: new Date(2023, 10, 25),
      currentVersion: true
    },
    {
      version: '2.3.5',
      lastUpdated: new Date(2023, 9, 12),
      currentVersion: false
    },
    {
      version: '2.2.0',
      lastUpdated: new Date(2023, 8, 5),
      currentVersion: false
    }
  ]);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const formatSize = (sizeInMB: number) => {
    if (sizeInMB < 1) {
      return `${Math.round(sizeInMB * 1024)} KB`;
    } else if (sizeInMB < 1024) {
      return `${Math.round(sizeInMB)} MB`;
    } else {
      return `${(sizeInMB / 1024).toFixed(2)} GB`;
    }
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Maintenance système
      </h2>
      
      {/* Mises à jour */}
      <div className="space-y-4 p-4 bg-white dark:bg-gray-800 shadow-sm rounded-lg">
        <div className="flex items-center gap-3">
          <ArrowPathIcon className="h-6 w-6 text-gray-400" />
          <h3 className="text-base font-medium text-gray-900 dark:text-white">
            Mises à jour du système
          </h3>
        </div>
        
        <p className="ml-9 text-sm text-gray-500 dark:text-gray-400">
          Vérifiez les mises à jour disponibles et gérez les versions du système.
        </p>
        
        <div className="ml-9 mt-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Version actuelle: <span className="font-medium">{versions.find(v => v.currentVersion)?.version}</span>
            </span>
            <button
              type="button"
              className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Vérifier les mises à jour
            </button>
          </div>
          
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-md">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Version
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Statut
                  </th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {versions.map((version, index) => (
                  <tr key={version.version} className={version.currentVersion ? 'bg-primary-50 dark:bg-primary-900/10' : ''}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {version.version}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(version.lastUpdated)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {version.currentVersion ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Installée
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                          Archivée
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                      {!version.currentVersion && (
                        <button
                          type="button"
                          className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
                        >
                          Restaurer
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Sauvegardes */}
      <div className="space-y-4 p-4 bg-white dark:bg-gray-800 shadow-sm rounded-lg">
        <div className="flex items-center gap-3">
          <DocumentDuplicateIcon className="h-6 w-6 text-gray-400" />
          <h3 className="text-base font-medium text-gray-900 dark:text-white">
            Sauvegardes automatiques
          </h3>
        </div>
        
        <p className="ml-9 text-sm text-gray-500 dark:text-gray-400">
          Configurez les sauvegardes automatiques du système.
        </p>
        
        <div className="ml-9 space-y-4 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="backup-frequency" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Fréquence des sauvegardes
              </label>
              <select
                id="backup-frequency"
                name="backup-frequency"
                value={backupFrequency}
                onChange={(e) => setBackupFrequency(e.target.value as any)}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-800 dark:text-white"
              >
                <option value="daily">Quotidienne</option>
                <option value="weekly">Hebdomadaire</option>
                <option value="monthly">Mensuelle</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="backup-time" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Heure de sauvegarde
              </label>
              <input
                type="time"
                id="backup-time"
                name="backup-time"
                value={backupTime}
                onChange={(e) => setBackupTime(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="retention-period" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Période de rétention (jours)
            </label>
            <div className="mt-1 flex items-center gap-4">
              <input
                type="range"
                id="retention-period"
                name="retention-period"
                min="7"
                max="365"
                step="1"
                value={retentionPeriod}
                onChange={(e) => setRetentionPeriod(e.target.value)}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-12 text-right">
                {retentionPeriod}
              </span>
            </div>
          </div>
          
          <div className="flex gap-4 pt-2">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              <CalendarIcon className="-ml-0.5 mr-1.5 h-4 w-4" />
              Planifier
            </button>
            
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <DocumentDuplicateIcon className="-ml-0.5 mr-1.5 h-4 w-4" />
              Sauvegarder maintenant
            </button>
          </div>
        </div>
      </div>
      
      {/* Exporter/Importer */}
      <div className="space-y-4 p-4 bg-white dark:bg-gray-800 shadow-sm rounded-lg">
        <div className="flex items-center gap-3">
          <ArrowDownTrayIcon className="h-6 w-6 text-gray-400" />
          <h3 className="text-base font-medium text-gray-900 dark:text-white">
            Exporter/Importer des données
          </h3>
        </div>
        
        <p className="ml-9 text-sm text-gray-500 dark:text-gray-400">
          Exportez vos données pour les sauvegarder ou importez-les depuis une sauvegarde existante.
        </p>
        
        <div className="ml-9 mt-4 flex flex-wrap gap-4">
          <div className="w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setIsExporting(!isExporting)}
              className="inline-flex items-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <ArrowDownTrayIcon className="-ml-0.5 mr-1.5 h-4 w-4" />
              Exporter des données
            </button>
            
            {isExporting && (
              <div className="mt-3 space-y-3 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                <div className="flex items-center">
                  <input
                    id="export-settings"
                    name="export-settings"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
                    defaultChecked
                  />
                  <label htmlFor="export-settings" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Paramètres ({formatSize(0.2)})
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="export-user-data"
                    name="export-user-data"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
                    defaultChecked
                  />
                  <label htmlFor="export-user-data" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Données utilisateur ({formatSize(1.5)})
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="export-sensor-data"
                    name="export-sensor-data"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
                    defaultChecked
                  />
                  <label htmlFor="export-sensor-data" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Données des capteurs ({formatSize(42.8)})
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="export-logs"
                    name="export-logs"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
                    defaultChecked
                  />
                  <label htmlFor="export-logs" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Journaux système ({formatSize(12.6)})
                  </label>
                </div>
                <button
                  type="button"
                  className="mt-2 w-full inline-flex items-center justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  Exporter la sélection
                </button>
              </div>
            )}
          </div>
          
          <div className="w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setIsImporting(!isImporting)}
              className="inline-flex items-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <ArrowUpTrayIcon className="-ml-0.5 mr-1.5 h-4 w-4" />
              Importer des données
            </button>
            
            {isImporting && (
              <div className="mt-3 space-y-3 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                <div className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600 dark:text-gray-400">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white dark:bg-gray-800 font-medium text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 hover:text-primary-500"
                      >
                        <span>Charger un fichier</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">ou glisser-déposer</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      ZIP ou JSON jusqu&apos;à 50MB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  Importer
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Nettoyage des données */}
      <div className="space-y-4 p-4 bg-white dark:bg-gray-800 shadow-sm rounded-lg">
        <div className="flex items-center gap-3">
          <TrashIcon className="h-6 w-6 text-gray-400" />
          <h3 className="text-base font-medium text-gray-900 dark:text-white">
            Nettoyage des données
          </h3>
        </div>
        
        <p className="ml-9 text-sm text-gray-500 dark:text-gray-400">
          Supprimez les données temporaires et les anciennes données pour libérer de l&apos;espace.
        </p>
        
        <div className="ml-9 mt-4">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="py-3 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Données de cache
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Données temporaires pouvant être supprimées en toute sécurité
                </p>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-700 dark:text-gray-300 mr-4">
                  {formatSize(212.5)}
                </span>
                <button
                  type="button"
                  className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300"
                >
                  Nettoyer
                </button>
              </div>
            </li>
            <li className="py-3 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Journaux système
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Enregistrements détaillés des opérations du système
                </p>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-700 dark:text-gray-300 mr-4">
                  {formatSize(547.2)}
                </span>
                <button
                  type="button"
                  className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300"
                >
                  Nettoyer
                </button>
              </div>
            </li>
            <li className="py-3 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Anciennes données de capteurs
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Données historiques de plus de 1 an
                </p>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-700 dark:text-gray-300 mr-4">
                  {formatSize(2048)}
                </span>
                <button
                  type="button"
                  className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300"
                >
                  Nettoyer
                </button>
              </div>
            </li>
          </ul>
          
          <div className="mt-4">
            <button
              type="button"
              className="w-full inline-flex items-center justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              <TrashIcon className="-ml-0.5 mr-1.5 h-4 w-4" />
              Tout nettoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 