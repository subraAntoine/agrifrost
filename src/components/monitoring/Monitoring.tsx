'use client';

import { useState } from 'react';
import { StationStatus } from './StationStatus';
import { HeatingStatus } from './HeatingStatus';

// Données de démo pour les stations
const mockStations = [
  {
    id: 1,
    name: "Station 1",
    batteryLevel: 85, 
    solarPower: 12.4,
    signalQuality: 92,
    lastTransmission: "2025-03-26T11:42:01",
    sensorStatus: "ok",
    location: "Coteau Est"
  },
  {
    id: 2,
    name: "Station 2",
    batteryLevel: 72, 
    solarPower: 8.2,
    signalQuality: 86,
    lastTransmission: "2025-03-26T11:40:15",
    sensorStatus: "ok",
    location: "Coteau Sud"
  },
  {
    id: 3,
    name: "Station 3",
    batteryLevel: 45, 
    solarPower: 5.1,
    signalQuality: 63,
    lastTransmission: "2025-03-26T11:21:33",
    sensorStatus: "warning",
    location: "Bas du coteau"
  },
  {
    id: 4,
    name: "Station 4",
    batteryLevel: 18, 
    solarPower: 1.2,
    signalQuality: 41,
    lastTransmission: "2025-03-26T10:55:07",
    sensorStatus: "error",
    location: "Zone Nord"
  },
  {
    id: 5,
    name: "Station 5",
    batteryLevel: 95, 
    solarPower: 14.8,
    signalQuality: 97,
    lastTransmission: "2025-03-26T11:43:22",
    sensorStatus: "ok",
    location: "Plateau central"
  }
];

// Données de démo pour les zones de chauffage
const mockHeatingZones = [
  {
    id: 1,
    name: "Zone A",
    active: true,
    power: 5.4,
    consumption: 2.1,
    temperature: 15.2,
    status: "functional"
  },
  {
    id: 2,
    name: "Zone B",
    active: true,
    power: 6.2,
    consumption: 2.4,
    temperature: 14.8,
    status: "functional"
  },
  {
    id: 3,
    name: "Zone C",
    active: false,
    power: 0,
    consumption: 0,
    temperature: 7.3,
    status: "functional"
  },
  {
    id: 4,
    name: "Zone D",
    active: false,
    power: 0,
    consumption: 0,
    temperature: 6.9,
    status: "faulty"
  }
];

// Données de démo pour la consommation globale
const mockGlobalConsumption = {
  currentPower: 11.6, // kW
  totalConsumption: 45.3, // kWh
  activeSince: "2025-03-26T08:15:00"
};

export function Monitoring() {
  const [stations] = useState(mockStations);
  const [heatingZones] = useState(mockHeatingZones);
  const [globalConsumption] = useState(mockGlobalConsumption);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Monitoring des équipements</h1>
      
      {/* État des stations */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          État des stations
        </h2>
        <StationStatus stations={stations} />
      </div>
      
      {/* État du système de chauffage */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          État du système de chauffage
        </h2>
        <HeatingStatus 
          zones={heatingZones} 
          globalConsumption={globalConsumption} 
        />
      </div>
    </div>
  );
} 