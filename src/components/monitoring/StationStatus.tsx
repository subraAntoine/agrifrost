'use client';

import { 
  Battery100Icon as BatteryFullIcon, 
  BoltIcon, 
  SignalIcon, 
  ClockIcon, 
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Station {
  id: number;
  name: string;
  batteryLevel: number;
  solarPower: number;
  signalQuality: number;
  lastTransmission: string;
  sensorStatus: 'ok' | 'warning' | 'error';
  location: string;
}

interface StationStatusProps {
  stations: Station[];
}

export function StationStatus({ stations }: StationStatusProps) {
  // Formatage de la date de dernière transmission
  const formatLastTransmission = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true, locale: fr });
    } catch (_) {
      return "Date inconnue";
    }
  };

  // Rendu de l'état du capteur avec la couleur appropriée
  const renderSensorStatus = (status: 'ok' | 'warning' | 'error') => {
    switch (status) {
      case 'ok':
        return <span className="text-primary-500">Normal</span>;
      case 'warning':
        return (
          <div className="flex items-center text-warning-500">
            <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
            Vérification requise
          </div>
        );
      case 'error':
        return (
          <div className="flex items-center text-danger-500">
            <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
            Défaillant
          </div>
        );
      default:
        return <span>Inconnu</span>;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Station
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Batterie
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Puissance solaire
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Signal LoRa
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Dernière transmission
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              État capteurs
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
          {stations.map((station) => (
            <tr key={station.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900 dark:text-white">{station.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{station.location}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <BatteryFullIcon className={`h-5 w-5 mr-2 ${
                    station.batteryLevel > 60 
                      ? 'text-primary-500' 
                      : station.batteryLevel > 20 
                        ? 'text-warning-500' 
                        : 'text-danger-500'
                  }`} />
                  <div className="w-24">
                    <div className="text-sm text-gray-900 dark:text-white">{station.batteryLevel}%</div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                      <div 
                        className={`h-2 rounded-full ${
                          station.batteryLevel > 60 
                            ? 'bg-primary-500' 
                            : station.batteryLevel > 20 
                              ? 'bg-warning-500' 
                              : 'bg-danger-500'
                        }`}
                        style={{ width: `${station.batteryLevel}%` }}
                      />
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <BoltIcon className="h-5 w-5 mr-2 text-yellow-500" />
                  <span className="text-sm text-gray-900 dark:text-white">
                    {station.solarPower} W
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <SignalIcon className={`h-5 w-5 mr-2 ${
                    station.signalQuality > 70 
                      ? 'text-primary-500' 
                      : station.signalQuality > 40 
                        ? 'text-warning-500' 
                        : 'text-danger-500'
                  }`} />
                  <div className="w-24">
                    <div className="text-sm text-gray-900 dark:text-white">{station.signalQuality}%</div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                      <div 
                        className={`h-2 rounded-full ${
                          station.signalQuality > 70 
                            ? 'bg-primary-500' 
                            : station.signalQuality > 40 
                              ? 'bg-warning-500' 
                              : 'bg-danger-500'
                        }`}
                        style={{ width: `${station.signalQuality}%` }}
                      />
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 mr-2 text-info-500" />
                  <span className="text-sm text-gray-900 dark:text-white">
                    {formatLastTransmission(station.lastTransmission)}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {renderSensorStatus(station.sensorStatus)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 