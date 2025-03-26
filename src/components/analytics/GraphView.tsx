'use client';

import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

interface GraphViewProps {
  graphType: string;
  period: string;
}

// Données de démo pour les différents graphiques
const temperatureData = [
  { time: '00:00', temp20cm: 1.2, temp150cm: 3.5 },
  { time: '02:00', temp20cm: 0.5, temp150cm: 2.8 },
  { time: '04:00', temp20cm: 0.1, temp150cm: 2.2 },
  { time: '06:00', temp20cm: 0.2, temp150cm: 2.1 },
  { time: '08:00', temp20cm: 1.5, temp150cm: 3.0 },
  { time: '10:00', temp20cm: 2.8, temp150cm: 4.5 },
  { time: '12:00', temp20cm: 3.5, temp150cm: 5.5 },
  { time: '14:00', temp20cm: 3.0, temp150cm: 5.8 },
  { time: '16:00', temp20cm: 2.5, temp150cm: 5.2 },
  { time: '18:00', temp20cm: 2.0, temp150cm: 4.5 },
  { time: '20:00', temp20cm: 1.5, temp150cm: 3.8 },
  { time: '22:00', temp20cm: 1.0, temp150cm: 3.2 },
];

const frostEpisodesData = [
  { date: '01/03', duration: 0 },
  { date: '02/03', duration: 0 },
  { date: '03/03', duration: 2.5 },
  { date: '04/03', duration: 4.2 },
  { date: '05/03', duration: 0 },
  { date: '06/03', duration: 0 },
  { date: '07/03', duration: 0 },
  { date: '08/03', duration: 1.8 },
  { date: '09/03', duration: 3.5 },
  { date: '10/03', duration: 0 },
];

const consumptionData = [
  { date: '01/03', energy: 28.5 },
  { date: '02/03', energy: 12.3 },
  { date: '03/03', energy: 42.8 },
  { date: '04/03', energy: 50.2 },
  { date: '05/03', energy: 15.7 },
  { date: '06/03', energy: 10.2 },
  { date: '07/03', energy: 8.5 },
  { date: '08/03', energy: 35.6 },
  { date: '09/03', energy: 46.1 },
  { date: '10/03', energy: 20.9 },
];

const correlationData = [
  { time: '00:00', temperature: 1.2, humidity: 85, active: false },
  { time: '02:00', temperature: 0.5, humidity: 88, active: true },
  { time: '04:00', temperature: 0.1, humidity: 90, active: true },
  { time: '06:00', temperature: 0.2, humidity: 89, active: true },
  { time: '08:00', temperature: 1.5, humidity: 82, active: true },
  { time: '10:00', temperature: 2.8, humidity: 75, active: false },
  { time: '12:00', temperature: 3.5, humidity: 70, active: false },
  { time: '14:00', temperature: 3.0, humidity: 68, active: false },
  { time: '16:00', temperature: 2.5, humidity: 72, active: false },
  { time: '18:00', temperature: 2.0, humidity: 78, active: false },
  { time: '20:00', temperature: 1.5, humidity: 82, active: false },
  { time: '22:00', temperature: 1.0, humidity: 84, active: true },
];

export function GraphView({ graphType, period }: GraphViewProps) {
  // Fonction pour obtenir les données correctes en fonction du type de graphique et de la période
  const getGraphData = () => {
    switch (graphType) {
      case 'temperature':
        return temperatureData;
      case 'frost':
        return frostEpisodesData;
      case 'consumption':
        return consumptionData;
      case 'correlation':
        return correlationData;
      default:
        return [];
    }
  };
  
  // Fonction pour rendre le graphique approprié
  const renderGraph = () => {
    const data = getGraphData();
    
    switch (graphType) {
      case 'temperature':
        return (
          <>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Température (période: {period})
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
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
          </>
        );
      
      case 'frost':
        return (
          <>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Épisodes de gel (période: {period})
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [`${value} heures`, '']}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Legend />
                  <Bar 
                    dataKey="duration" 
                    name="Durée du gel" 
                    fill="#f43f5e" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        );
      
      case 'consumption':
        return (
          <>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Consommation énergétique (période: {period})
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [`${value} kWh`, '']}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Legend />
                  <Bar 
                    dataKey="energy" 
                    name="Consommation (kWh)" 
                    fill="#f7821f" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        );
      
      case 'correlation':
        return (
          <>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Corrélation Température/Humidité/Activation (période: {period})
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="temperature" 
                    name="Température (°C)" 
                    stroke="#3399ff" 
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="humidity" 
                    name="Humidité (%)" 
                    stroke="#17cc17" 
                  />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey={(entry) => entry.active ? 1 : 0} 
                    name="Système actif" 
                    stroke="#f43f5e"
                    strokeWidth={2}
                    dot={{ strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        );
      
      default:
        return (
          <div className="flex justify-center items-center h-80">
            <p className="text-gray-500 dark:text-gray-400">
              Données non disponibles
            </p>
          </div>
        );
    }
  };
  
  return (
    <div>
      {renderGraph()}
    </div>
  );
} 