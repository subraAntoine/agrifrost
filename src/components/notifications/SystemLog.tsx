'use client';

import React, { useState } from 'react';
import { 
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  ClockIcon,
  ServerIcon,
  CodeBracketIcon
} from '@heroicons/react/24/outline';

type LogEntry = {
  id: string;
  timestamp: Date;
  level: 'info' | 'warning' | 'error' | 'debug';
  component: string;
  message: string;
  details?: string;
};

// Données de démonstration
const demoLogs: LogEntry[] = [
  {
    id: '1',
    timestamp: new Date(2023, 11, 10, 22, 36, 15),
    level: 'info',
    component: 'SensorSystem',
    message: 'Données de température reçues pour la zone Est',
    details: 'Température: -1.5°C, Humidité: 85%, ID Capteur: S125'
  },
  {
    id: '2',
    timestamp: new Date(2023, 11, 10, 22, 35, 45),
    level: 'warning',
    component: 'FrostProtection',
    message: 'Risque de gel détecté dans la zone Est',
    details: 'Température prévue: -2°C à 3h du matin, Probabilité: 85%'
  },
  {
    id: '3',
    timestamp: new Date(2023, 11, 10, 22, 35, 30),
    level: 'debug',
    component: 'ApiService',
    message: 'Appel API effectué: GET /api/sensors/readings',
    details: 'Response time: 245ms, Status: 200 OK'
  },
  {
    id: '4',
    timestamp: new Date(2023, 11, 10, 22, 34, 20),
    level: 'error',
    component: 'SensorSystem',
    message: 'Erreur de connexion avec le capteur #A245',
    details: 'Connection timeout after 30s, Zone: Nord'
  },
  {
    id: '5',
    timestamp: new Date(2023, 11, 10, 22, 30, 10),
    level: 'info',
    component: 'System',
    message: 'Système de protection contre le gel démarré',
    details: 'Mode: automatique, Zones actives: Est, Nord, Ouest, Sud'
  },
  {
    id: '6',
    timestamp: new Date(2023, 11, 10, 22, 15, 30),
    level: 'debug',
    component: 'DatabaseService',
    message: 'Sauvegarde des données effectuée',
    details: 'Records: 1250, Duration: 1.2s'
  },
  {
    id: '7',
    timestamp: new Date(2023, 11, 10, 22, 0, 0),
    level: 'info',
    component: 'System',
    message: 'Vérification périodique du système terminée',
    details: 'Tous les systèmes fonctionnent normalement'
  }
];

export function SystemLog() {
  const [logs] = useState<LogEntry[]>(demoLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedLogs, setExpandedLogs] = useState<string[]>([]);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };
  
  const toggleExpand = (id: string) => {
    setExpandedLogs(prevExpanded => 
      prevExpanded.includes(id)
        ? prevExpanded.filter(logId => logId !== id)
        : [...prevExpanded, id]
    );
  };
  
  const getLevelColor = (level: LogEntry['level']) => {
    switch(level) {
      case 'info': return 'text-blue-500';
      case 'warning': return 'text-amber-500';
      case 'error': return 'text-red-500';
      case 'debug': return 'text-gray-500';
    }
  };
  
  const getLevelIcon = (level: LogEntry['level']) => {
    switch(level) {
      case 'info':
        return <ServerIcon className="h-4 w-4 text-blue-500" />;
      case 'warning':
        return <ClockIcon className="h-4 w-4 text-amber-500" />;
      case 'error':
        return <ServerIcon className="h-4 w-4 text-red-500" />;
      case 'debug':
        return <CodeBracketIcon className="h-4 w-4 text-gray-500" />;
    }
  };
  
  const filteredLogs = logs.filter(log => 
    log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.component.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (log.details && log.details.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Journal du système
        </h2>
        
        <div className="flex gap-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Rechercher dans les logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button 
            type="button"
            className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-700 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
            Exporter
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Horodatage</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Niveau</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Composant</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Message</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-500 dark:text-gray-400">
                  Aucun log correspondant à votre recherche
                </td>
              </tr>
            ) : (
              filteredLogs.map(log => (
                <React.Fragment key={log.id}>
                  <tr 
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                    onClick={() => toggleExpand(log.id)}
                  >
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(log.timestamp)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <div className="flex items-center gap-1">
                        {getLevelIcon(log.level)}
                        <span className={`font-medium ${getLevelColor(log.level)}`}>
                          {log.level.toUpperCase()}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {log.component}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {log.message}
                    </td>
                  </tr>
                  {expandedLogs.includes(log.id) && log.details && (
                    <tr className="bg-gray-50 dark:bg-gray-800">
                      <td colSpan={4} className="px-3 py-3 text-sm text-gray-500 dark:text-gray-400">
                        <div className="font-mono whitespace-pre-wrap border-l-4 border-gray-300 dark:border-gray-600 pl-3">
                          {log.details}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 