'use client';

import { useState } from 'react';
import { 
  LightBulbIcon, 
  BoltIcon, 
  ArrowPathIcon 
} from '@heroicons/react/24/outline';

interface Zone {
  id: number;
  name: string;
  active: boolean;
  powerLevel: number;
}

interface ManualControlProps {
  zones: Zone[];
  disabled: boolean;
  onToggleZone: (zoneId: number) => void;
  onAdjustPower: (zoneId: number, power: number) => void;
}

export function ManualControl({ zones, disabled, onToggleZone, onAdjustPower }: ManualControlProps) {
  const [testing, setTesting] = useState(false);
  
  // Fonction pour simuler un test du système
  const testSystem = () => {
    if (disabled) return;
    
    setTesting(true);
    
    // Simuler un test de 3 secondes
    setTimeout(() => {
      setTesting(false);
    }, 3000);
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Activation des zones
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {zones.map((zone) => (
            <div 
              key={zone.id} 
              className={`border rounded-lg p-4 ${
                disabled
                  ? 'border-gray-200 dark:border-gray-700 opacity-60'
                  : zone.active
                    ? 'border-primary-500 dark:border-primary-400'
                    : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {zone.name}
                </h3>
                <button
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    disabled
                      ? 'bg-gray-200 dark:bg-gray-700 cursor-not-allowed'
                      : zone.active
                        ? 'bg-primary-500'
                        : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                  onClick={() => !disabled && onToggleZone(zone.id)}
                  disabled={disabled}
                >
                  <span
                    className={`${
                      zone.active ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </button>
              </div>
              
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500 dark:text-gray-400">Puissance</span>
                  <span className="text-gray-900 dark:text-white">{zone.powerLevel}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={zone.powerLevel}
                  onChange={(e) => onAdjustPower(zone.id, parseInt(e.target.value))}
                  disabled={disabled || !zone.active}
                  className={`w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer ${
                    disabled || !zone.active ? 'opacity-60 cursor-not-allowed' : ''
                  }`}
                />
              </div>
              
              <div className="flex items-center text-sm">
                <LightBulbIcon className={`h-4 w-4 mr-1 ${
                  zone.active && !disabled
                    ? 'text-primary-500'
                    : 'text-gray-400 dark:text-gray-600'
                }`} />
                <span className={`${
                  zone.active && !disabled
                    ? 'text-primary-500'
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {zone.active && !disabled ? 'Activé' : 'Désactivé'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Test du système
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4 border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">
              Test de communication
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Vérifie la communication avec toutes les stations et les câbles chauffants.
            </p>
            <button
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
                testing || disabled
                  ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-info-500 text-white hover:bg-info-600'
              }`}
              onClick={testSystem}
              disabled={testing || disabled}
            >
              {testing ? (
                <>
                  <ArrowPathIcon className="h-4 w-4 mr-2 animate-spin" />
                  Test en cours...
                </>
              ) : (
                <>
                  <BoltIcon className="h-4 w-4 mr-2" />
                  Lancer le test
                </>
              )}
            </button>
          </div>
          
          <div className="border rounded-lg p-4 border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">
              Résultats du dernier test
            </h3>
            {testing ? (
              <div className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
                Test en cours...
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Date</span>
                  <span className="text-gray-900 dark:text-white">26/03/2025 11:30</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Stations actives</span>
                  <span className="text-primary-500">5/5</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Zones opérationnelles</span>
                  <span className="text-warning-500">3/4</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Qualité du signal</span>
                  <span className="text-primary-500">Bonne</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 