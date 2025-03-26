'use client';

import { useState } from 'react';
import { StatusOverview } from './StatusOverview';
import { WeatherCard } from './WeatherCard';
import { TemperatureStats } from './TemperatureStats';
import { VineyardMap } from '../map/VineyardMap';
import { KeyIndicators } from './KeyIndicators';

// Données de démo
const mockData = {
  systemStatus: 'active', // 'active', 'standby', 'alert'
  temperature20cm: 2.5,
  temperature150cm: 5.8,
  riskLevel: 'warning', // 'safe', 'warning', 'danger'
  operatingHours: 124.5,
  humidity: 78,
  dewPoint: 1.2,
  temperatureTrend: -0.8,
  windSpeed: 3.2,
  windDirection: 'NE',
  frostRisk: 65,
};

export function Dashboard() {
  const [data] = useState(mockData);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard AgriFrost</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Carte du vignoble */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 h-96">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Carte du vignoble
          </h2>
          <VineyardMap />
        </div>
        
        {/* Statut et températures */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <StatusOverview 
            status={data.systemStatus as "active" | "standby" | "alert"} 
            riskLevel={data.riskLevel as "safe" | "warning" | "danger"}
            operatingHours={data.operatingHours} 
          />
          <WeatherCard />
        </div>
      </div>
      
      {/* Indicateurs clés et graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <KeyIndicators 
          humidity={data.humidity}
          dewPoint={data.dewPoint}
          temperatureTrend={data.temperatureTrend}
          windSpeed={data.windSpeed}
          windDirection={data.windDirection}
          frostRisk={data.frostRisk}
        />
        <div className="lg:col-span-2">
          <TemperatureStats 
            temperature20cm={data.temperature20cm}
            temperature150cm={data.temperature150cm}
          />
        </div>
      </div>
    </div>
  );
} 