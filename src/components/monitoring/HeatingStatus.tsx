'use client';

import { useState } from 'react';
import { 
  FireIcon, 
  CircleStackIcon, 
  BeakerIcon as TemperatureIcon,
  CheckCircleIcon, 
  XCircleIcon 
} from '@heroicons/react/24/outline';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip 
} from 'recharts';

interface HeatingZone {
  id: number;
  name: string;
  active: boolean;
  power: number;
  consumption: number;
  temperature: number;
  status: 'functional' | 'faulty';
}

interface GlobalConsumption {
  currentPower: number;
  totalConsumption: number;
  activeSince: string;
}

interface HeatingStatusProps {
  zones: HeatingZone[];
  globalConsumption: GlobalConsumption;
}

export function HeatingStatus({ zones, globalConsumption }: HeatingStatusProps) {
  const [selectedZone, setSelectedZone] = useState<HeatingZone | null>(null);
  
  // Calcul du temps écoulé depuis l'activation
  const calculateActiveDuration = () => {
    try {
      const activationDate = new Date(globalConsumption.activeSince);
      const now = new Date();
      const diffMs = now.getTime() - activationDate.getTime();
      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      
      return `${diffHrs}h ${diffMins}min`;
    } catch {
      return "Durée inconnue";
    }
  };
  
  // Données pour le diagramme circulaire de consommation par zone
  const pieData = zones.map(zone => ({
    name: zone.name,
    value: zone.consumption,
    active: zone.active
  }));
  
  const COLORS = ['#17cc17', '#3399ff', '#f7821f', '#e11d48'];
  
  // Total de la consommation des zones actives
  const activeZonesCount = zones.filter(zone => zone.active).length;
  
  return (
    <div className="space-y-6">
      {/* Consommation globale */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <FireIcon className="h-5 w-5 text-danger-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Puissance actuelle
            </h3>
          </div>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">
            {globalConsumption.currentPower} kW
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Zones actives: {activeZonesCount}
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <CircleStackIcon className="h-5 w-5 text-warning-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Consommation totale
            </h3>
          </div>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">
            {globalConsumption.totalConsumption} kWh
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Actif depuis: {calculateActiveDuration()}
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg flex items-center justify-center">
          <div className="w-full h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.active ? COLORS[index % COLORS.length] : '#9CA3AF'} 
                      stroke="none" 
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${value} kWh`, `Consommation`]}
                  labelFormatter={(label) => `Zone ${label}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Liste des zones de chauffage */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Zone
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Statut
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Puissance
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Consommation
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Température
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Diagnostic
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
            {zones.map((zone) => (
              <tr 
                key={zone.id} 
                className={`hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer ${
                  selectedZone?.id === zone.id 
                    ? 'bg-primary-50 dark:bg-gray-800' 
                    : ''
                }`}
                onClick={() => setSelectedZone(zone)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900 dark:text-white">{zone.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {zone.active ? (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                      Actif
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                      Inactif
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {zone.power} kW
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {zone.consumption} kWh
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <TemperatureIcon className={`h-5 w-5 mr-1 ${
                      zone.temperature > 10 
                        ? 'text-danger-500' 
                        : 'text-info-500'
                    }`} />
                    <span className="text-sm text-gray-900 dark:text-white">
                      {zone.temperature}°C
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {zone.status === 'functional' ? (
                    <div className="flex items-center text-primary-500">
                      <CheckCircleIcon className="h-5 w-5 mr-1" />
                      <span>Fonctionnel</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-danger-500">
                      <XCircleIcon className="h-5 w-5 mr-1" />
                      <span>Défaillant</span>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Détails de la zone sélectionnée */}
      {selectedZone && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Détails de la zone {selectedZone.name}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">État</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {selectedZone.active ? 'Actif' : 'Inactif'}
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">Diagnostic</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {selectedZone.status === 'functional' ? 'Fonctionnel' : 'Défaillant'}
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">Température</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {selectedZone.temperature}°C
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 