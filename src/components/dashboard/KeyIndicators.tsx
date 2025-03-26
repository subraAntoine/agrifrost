'use client';

import { ArrowTrendingDownIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

interface KeyIndicatorsProps {
  humidity: number;
  dewPoint: number;
  temperatureTrend: number;
  windSpeed: number;
  windDirection: string;
  frostRisk: number;
}

export function KeyIndicators({ 
  humidity, 
  dewPoint, 
  temperatureTrend, 
  windSpeed, 
  windDirection,
  frostRisk
}: KeyIndicatorsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Indicateurs clés
      </h2>
      
      <div className="space-y-4">
        {/* Humidité */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-500 dark:text-gray-400">Humidité</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{humidity}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-info-500 h-2 rounded-full" 
              style={{ width: `${humidity}%` }}
            />
          </div>
        </div>
        
        {/* Point de rosée */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-500 dark:text-gray-400">Point de rosée</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{dewPoint}°C</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                dewPoint <= 0 ? 'bg-danger-500' : dewPoint < 3 ? 'bg-warning-500' : 'bg-primary-500'
              }`}
              style={{ width: `${Math.min(Math.max((dewPoint + 5) * 10, 0), 100)}%` }}
            />
          </div>
        </div>
        
        {/* Tendance de température */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">Tendance (2h)</span>
          <div className="flex items-center">
            {temperatureTrend < 0 ? (
              <>
                <ArrowTrendingDownIcon className="h-4 w-4 text-danger-500 mr-1" />
                <span className="text-sm font-medium text-danger-500">{temperatureTrend}°C</span>
              </>
            ) : (
              <>
                <ArrowTrendingUpIcon className="h-4 w-4 text-primary-500 mr-1" />
                <span className="text-sm font-medium text-primary-500">+{temperatureTrend}°C</span>
              </>
            )}
          </div>
        </div>
        
        {/* Vent */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">Vent</span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {windSpeed} km/h {windDirection}
          </span>
        </div>
        
        {/* Risque de gel */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-500 dark:text-gray-400">Risque de gel</span>
            <span className={`text-sm font-medium ${
              frostRisk > 70 ? 'text-danger-500' : 
              frostRisk > 30 ? 'text-warning-500' : 
              'text-primary-500'
            }`}>{frostRisk}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                frostRisk > 70 ? 'bg-danger-500' : 
                frostRisk > 30 ? 'bg-warning-500' : 
                'bg-primary-500'
              }`}
              style={{ width: `${frostRisk}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 