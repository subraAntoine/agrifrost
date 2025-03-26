'use client';

import { useState } from 'react';
import { GraphView } from './GraphView';
import { StatisticsSummary } from './StatisticsSummary';
import { 
  ArrowDownTrayIcon, 
  AdjustmentsVerticalIcon 
} from '@heroicons/react/24/outline';

// Périodes pour les graphiques
const TIME_PERIODS = [
  { id: '24h', name: '24 heures' },
  { id: '7d', name: '7 jours' },
  { id: '30d', name: '30 jours' }
];

// Types de graphiques
const GRAPH_TYPES = [
  { id: 'temperature', name: 'Température' },
  { id: 'frost', name: 'Épisodes de gel' },
  { id: 'consumption', name: 'Consommation énergétique' },
  { id: 'correlation', name: 'Température/Humidité/Activation' }
];

export function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('24h');
  const [selectedGraph, setSelectedGraph] = useState('temperature');
  
  // Fonction pour exporter les données
  const exportData = (format: 'csv' | 'pdf') => {
    console.log(`Exporting data in ${format} format`);
    // Implémentation de l'exportation ici
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Analyses et historiques
        </h1>
        
        <div className="flex flex-wrap gap-2">
          <button
            className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            onClick={() => exportData('csv')}
          >
            <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
            Exporter CSV
          </button>
          <button
            className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            onClick={() => exportData('pdf')}
          >
            <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
            Exporter PDF
          </button>
        </div>
      </div>
      
      {/* Filtres et contrôles */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-center">
            <AdjustmentsVerticalIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Période:
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {TIME_PERIODS.map((period) => (
              <button
                key={period.id}
                className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                  selectedPeriod === period.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => setSelectedPeriod(period.id)}
              >
                {period.name}
              </button>
            ))}
          </div>
          
          <div className="flex items-center ml-0 md:ml-6">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
              Type:
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {GRAPH_TYPES.map((graph) => (
              <button
                key={graph.id}
                className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                  selectedGraph === graph.id
                    ? 'bg-info-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => setSelectedGraph(graph.id)}
              >
                {graph.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Graphiques */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <GraphView 
          graphType={selectedGraph} 
          period={selectedPeriod} 
        />
      </div>
      
      {/* Statistiques */}
      <StatisticsSummary period={selectedPeriod} />
    </div>
  );
} 