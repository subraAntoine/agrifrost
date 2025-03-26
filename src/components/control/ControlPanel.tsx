'use client';

import { useState } from 'react';
import { 
  ExclamationTriangleIcon, 
  PowerIcon, 
  AdjustmentsHorizontalIcon, 
  ScaleIcon 
} from '@heroicons/react/24/outline';
import { ManualControl } from './ManualControl';
import { SystemSettings } from './SystemSettings';

// Données de démo pour les zones de chauffage
const mockHeatingZones = [
  { id: 1, name: 'Zone A', active: true, powerLevel: 80 },
  { id: 2, name: 'Zone B', active: true, powerLevel: 60 },
  { id: 3, name: 'Zone C', active: false, powerLevel: 0 },
  { id: 4, name: 'Zone D', active: false, powerLevel: 0 },
];

// Données de démo pour les paramètres système
const mockSystemSettings = {
  alertThresholds: {
    temperatureWarning: 3.0,
    temperatureDanger: 1.0,
    batteryWarning: 30,
    batteryDanger: 15,
    signalWarning: 50,
    signalDanger: 25
  },
  predictiveModel: {
    sensitivity: 70,
    predictionHorizon: 6,
    useMeteorological: true
  },
  powerModulation: {
    automaticAdjustment: true,
    maxPower: 25,
    energySaving: 'medium' // 'low', 'medium', 'high'
  },
  riskPeriods: [
    { id: 1, name: 'Débourrement', startDate: '2025-04-01', endDate: '2025-04-15', active: true },
    { id: 2, name: 'Floraison', startDate: '2025-05-01', endDate: '2025-05-20', active: true }
  ]
};

export function ControlPanel() {
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'manual' | 'settings'>('manual');
  const [heatingZones, setHeatingZones] = useState(mockHeatingZones);
  const [systemSettings, setSystemSettings] = useState(mockSystemSettings);
  
  // Fonction pour activer/désactiver le mode d'urgence
  const toggleEmergencyMode = () => {
    const newMode = !emergencyMode;
    setEmergencyMode(newMode);
    
    // Si mode d'urgence activé, désactiver toutes les zones
    if (newMode) {
      setHeatingZones(zones => 
        zones.map(zone => ({ ...zone, active: false, powerLevel: 0 }))
      );
    }
  };
  
  // Fonction pour activer/désactiver une zone
  const toggleZone = (zoneId: number) => {
    setHeatingZones(zones => 
      zones.map(zone => 
        zone.id === zoneId 
          ? { ...zone, active: !zone.active, powerLevel: !zone.active ? 50 : 0 } 
          : zone
      )
    );
  };
  
  // Fonction pour ajuster la puissance d'une zone
  const adjustZonePower = (zoneId: number, power: number) => {
    setHeatingZones(zones => 
      zones.map(zone => 
        zone.id === zoneId 
          ? { ...zone, powerLevel: power, active: power > 0 } 
          : zone
      )
    );
  };
  
  // Fonction pour mettre à jour les paramètres
  const updateSettings = (newSettings: typeof systemSettings) => {
    setSystemSettings(newSettings);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Contrôle manuel et paramètres
        </h1>
        
        {/* Bouton d'urgence */}
        <button
          className={`flex items-center px-4 py-2 rounded-lg font-medium shadow-sm ${
            emergencyMode
              ? 'bg-primary-500 text-white hover:bg-primary-600'
              : 'bg-danger-500 text-white hover:bg-danger-600'
          }`}
          onClick={toggleEmergencyMode}
        >
          {emergencyMode ? (
            <>
              <PowerIcon className="h-5 w-5 mr-2" />
              Réactiver le système
            </>
          ) : (
            <>
              <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
              Arrêt d'urgence
            </>
          )}
        </button>
      </div>
      
      {/* Message d'alerte si mode urgence activé */}
      {emergencyMode && (
        <div className="bg-danger-50 dark:bg-danger-900 border-l-4 border-danger-500 p-4 rounded-lg">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="h-6 w-6 text-danger-500 mr-3" />
            <div>
              <h3 className="text-lg font-medium text-danger-800 dark:text-danger-200">
                Mode d'urgence activé
              </h3>
              <p className="text-sm text-danger-700 dark:text-danger-300 mt-1">
                Toutes les zones de chauffage ont été désactivées. Vous pouvez réactiver le système avec le bouton ci-dessus.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Onglets */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'manual'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('manual')}
          >
            <AdjustmentsHorizontalIcon className="h-5 w-5 inline-block mr-2" />
            Contrôles manuels
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'settings'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('settings')}
          >
            <ScaleIcon className="h-5 w-5 inline-block mr-2" />
            Paramètres configurables
          </button>
        </nav>
      </div>
      
      {/* Contenu des onglets */}
      <div>
        {activeTab === 'manual' ? (
          <ManualControl
            zones={heatingZones}
            disabled={emergencyMode}
            onToggleZone={toggleZone}
            onAdjustPower={adjustZonePower}
          />
        ) : (
          <SystemSettings
            settings={systemSettings}
            onUpdateSettings={updateSettings}
          />
        )}
      </div>
    </div>
  );
} 