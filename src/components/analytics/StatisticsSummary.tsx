'use client';

import { 
  BoltIcon, 
  ClockIcon, 
  ArrowTrendingDownIcon, 
  BanknotesIcon 
} from '@heroicons/react/24/outline';

interface StatisticsSummaryProps {
  period: string;
}

// Données de démo pour les statistiques
const statisticsData = {
  '24h': {
    operatingHours: 8.5,
    energyConsumed: 42.3,
    savings: 18.7,
    frostEpisodes: 1
  },
  '7d': {
    operatingHours: 42.8,
    energyConsumed: 215.6,
    savings: 95.3,
    frostEpisodes: 4
  },
  '30d': {
    operatingHours: 128.5,
    energyConsumed: 645.8,
    savings: 320.7,
    frostEpisodes: 12
  }
};

export function StatisticsSummary({ period }: StatisticsSummaryProps) {
  // Obtenir les statistiques en fonction de la période sélectionnée
  const stats = statisticsData[period as keyof typeof statisticsData] || statisticsData['24h'];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Heures de fonctionnement */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-4">
          <div className="bg-primary-100 dark:bg-primary-900 p-3 rounded-lg mr-4">
            <ClockIcon className="h-6 w-6 text-primary-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Heures de fonctionnement
          </h3>
        </div>
        <p className="text-3xl font-semibold text-gray-900 dark:text-white">
          {stats.operatingHours} h
        </p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Durée totale d&apos;activation des câbles chauffants
        </p>
      </div>
      
      {/* Énergie consommée */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-4">
          <div className="bg-info-100 dark:bg-info-900 p-3 rounded-lg mr-4">
            <BoltIcon className="h-6 w-6 text-info-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Énergie consommée
          </h3>
        </div>
        <p className="text-3xl font-semibold text-gray-900 dark:text-white">
          {stats.energyConsumed} kWh
        </p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Consommation totale d&apos;énergie
        </p>
      </div>
      
      {/* Économies réalisées */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-4">
          <div className="bg-primary-100 dark:bg-primary-900 p-3 rounded-lg mr-4">
            <BanknotesIcon className="h-6 w-6 text-primary-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Économies réalisées
          </h3>
        </div>
        <p className="text-3xl font-semibold text-gray-900 dark:text-white">
          {stats.savings} €
        </p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Par rapport aux méthodes traditionnelles
        </p>
      </div>
      
      {/* Épisodes de gel évités */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-4">
          <div className="bg-danger-100 dark:bg-danger-900 p-3 rounded-lg mr-4">
            <ArrowTrendingDownIcon className="h-6 w-6 text-danger-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Épisodes de gel évités
          </h3>
        </div>
        <p className="text-3xl font-semibold text-gray-900 dark:text-white">
          {stats.frostEpisodes}
        </p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Basé sur les données de température
        </p>
      </div>
    </div>
  );
} 