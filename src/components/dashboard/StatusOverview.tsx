'use client';

import { ShieldCheckIcon, ShieldExclamationIcon, BoltIcon } from '@heroicons/react/24/outline';

interface StatusOverviewProps {
  status: 'active' | 'standby' | 'alert';
  riskLevel: 'safe' | 'warning' | 'danger';
  operatingHours: number;
}

export function StatusOverview({ status, riskLevel, operatingHours }: StatusOverviewProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Statut du système
      </h2>
      
      <div className="space-y-4">
        {/* Statut du système */}
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400">État global:</span>
          <div className="flex items-center">
            <span 
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                status === 'active' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                  : status === 'standby' 
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}
            >
              {status === 'active' ? (
                <>
                  <BoltIcon className="h-4 w-4 mr-1" />
                  Actif
                </>
              ) : status === 'standby' ? (
                <>
                  <ShieldCheckIcon className="h-4 w-4 mr-1" />
                  En veille
                </>
              ) : (
                <>
                  <ShieldExclamationIcon className="h-4 w-4 mr-1" />
                  Alerte
                </>
              )}
            </span>
          </div>
        </div>
        
        {/* Niveau de risque */}
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400">Risque de gel:</span>
          <div 
            className={`h-4 w-24 rounded-full ${
              riskLevel === 'safe' 
                ? 'bg-green-500' 
                : riskLevel === 'warning' 
                  ? 'bg-yellow-500' 
                  : 'bg-red-500'
            }`}
          />
        </div>
        
        {/* Heures de fonctionnement */}
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400">Heures de fonctionnement:</span>
          <span className="font-medium text-gray-900 dark:text-white">{operatingHours} h</span>
        </div>
      </div>
    </div>
  );
} 