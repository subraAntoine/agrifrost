'use client';

import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

interface TemperatureStatsProps {
  temperature20cm: number;
  temperature150cm: number;
}

// Données de démo pour le graphique
const mockTemperatureData = [
  { hour: '00:00', temp20cm: 1.2, temp150cm: 3.5 },
  { hour: '01:00', temp20cm: 0.8, temp150cm: 3.2 },
  { hour: '02:00', temp20cm: 0.5, temp150cm: 2.8 },
  { hour: '03:00', temp20cm: 0.3, temp150cm: 2.5 },
  { hour: '04:00', temp20cm: 0.1, temp150cm: 2.2 },
  { hour: '05:00', temp20cm: 0.0, temp150cm: 2.0 },
  { hour: '06:00', temp20cm: 0.2, temp150cm: 2.1 },
  { hour: '07:00', temp20cm: 0.8, temp150cm: 2.4 },
  { hour: '08:00', temp20cm: 1.5, temp150cm: 3.0 },
  { hour: '09:00', temp20cm: 2.2, temp150cm: 3.8 },
  { hour: '10:00', temp20cm: 2.8, temp150cm: 4.5 },
  { hour: '11:00', temp20cm: 3.2, temp150cm: 5.0 },
  { hour: '12:00', temp20cm: 3.5, temp150cm: 5.5 },
  { hour: '13:00', temp20cm: 3.2, temp150cm: 6.0 },
  { hour: '14:00', temp20cm: 3.0, temp150cm: 5.8 },
  { hour: '15:00', temp20cm: 2.8, temp150cm: 5.5 },
  { hour: '16:00', temp20cm: 2.5, temp150cm: 5.2 },
  { hour: '17:00', temp20cm: 2.2, temp150cm: 4.8 },
  { hour: '18:00', temp20cm: 2.0, temp150cm: 4.5 },
  { hour: '19:00', temp20cm: 1.8, temp150cm: 4.2 },
  { hour: '20:00', temp20cm: 1.5, temp150cm: 3.8 },
  { hour: '21:00', temp20cm: 1.2, temp150cm: 3.5 },
  { hour: '22:00', temp20cm: 1.0, temp150cm: 3.2 },
  { hour: '23:00', temp20cm: 0.8, temp150cm: 3.0 },
];

export function TemperatureStats({ temperature20cm, temperature150cm }: TemperatureStatsProps) {
  // Calcul du différentiel de température
  const temperatureDifferential = temperature150cm - temperature20cm;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 h-full">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Températures
      </h2>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">20 cm</div>
          <div className="text-xl font-semibold text-gray-900 dark:text-white">
            {temperature20cm}°C
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">150 cm</div>
          <div className="text-xl font-semibold text-gray-900 dark:text-white">
            {temperature150cm}°C
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Différentiel</div>
          <div className={`text-xl font-semibold ${temperatureDifferential >= 3 
            ? 'text-danger-500' 
            : temperatureDifferential >= 1.5 
              ? 'text-warning-500' 
              : 'text-primary-500'}`}>
            {temperatureDifferential.toFixed(1)}°C
          </div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={mockTemperatureData}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => [`${value}°C`, '']}
              labelFormatter={(label) => `Heure: ${label}`}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="temp20cm" 
              name="20 cm" 
              stroke="#3de93d" 
              activeDot={{ r: 8 }} 
            />
            <Line 
              type="monotone" 
              dataKey="temp150cm" 
              name="150 cm" 
              stroke="#3399ff" 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 