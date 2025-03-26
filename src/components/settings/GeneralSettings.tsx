'use client';

import { useState } from 'react';
import { LanguageIcon, SunIcon, MoonIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

interface ThemeOption {
  id: 'light' | 'dark' | 'system';
  label: string;
  icon: React.ReactNode;
}

interface LanguageOption {
  id: 'fr' | 'en' | 'es';
  label: string;
  nativeName: string;
}

export function GeneralSettings() {
  const [theme, setTheme] = useState<ThemeOption['id']>('system');
  const [language, setLanguage] = useState<LanguageOption['id']>('fr');
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [dataRefreshRate, setDataRefreshRate] = useState('60');
  
  const themeOptions: ThemeOption[] = [
    { id: 'light', label: 'Clair', icon: <SunIcon className="h-5 w-5" /> },
    { id: 'dark', label: 'Sombre', icon: <MoonIcon className="h-5 w-5" /> },
    { id: 'system', label: 'Système', icon: <Cog6ToothIcon className="h-5 w-5" /> }
  ];
  
  const languageOptions: LanguageOption[] = [
    { id: 'fr', label: 'Français', nativeName: 'Français' },
    { id: 'en', label: 'Anglais', nativeName: 'English' },
    { id: 'es', label: 'Espagnol', nativeName: 'Español' }
  ];
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Configuration générale
      </h2>
      
      {/* Thème */}
      <div className="space-y-2">
        <h3 className="text-base font-medium text-gray-900 dark:text-white">Thème</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Choisissez comment l&apos;interface du système s&apos;affiche.
        </p>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {themeOptions.map((option) => (
            <div
              key={option.id}
              className={`relative flex items-center space-x-3 rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 shadow-sm hover:border-gray-400 ${
                theme === option.id 
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10 ring-1 ring-primary-500' 
                  : 'bg-white dark:bg-gray-800'
              }`}
              onClick={() => setTheme(option.id)}
            >
              <div className={`flex-shrink-0 ${theme === option.id ? 'text-primary-500' : 'text-gray-500 dark:text-gray-400'}`}>
                {option.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className={`text-sm font-medium ${theme === option.id ? 'text-primary-900 dark:text-primary-100' : 'text-gray-900 dark:text-white'}`}>
                  {option.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Langue */}
      <div className="space-y-2 pt-5 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-base font-medium text-gray-900 dark:text-white">Langue</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Sélectionnez la langue d&apos;affichage de l&apos;interface.
        </p>
        <div className="mt-3">
          <select
            id="language"
            name="language"
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-base dark:bg-gray-800 dark:text-white py-2 px-3"
            value={language}
            onChange={(e) => setLanguage(e.target.value as LanguageOption['id'])}
          >
            {languageOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label} ({option.nativeName})
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Système d'unités */}
      <div className="space-y-2 pt-5 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-base font-medium text-gray-900 dark:text-white">Système d&apos;unités</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Choisissez le système d&apos;unités à utiliser pour les mesures.
        </p>
        <div className="mt-3 flex items-center space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio h-4 w-4 text-primary-600 focus:ring-primary-500"
              name="unit-system"
              value="metric"
              checked={unitSystem === 'metric'}
              onChange={() => setUnitSystem('metric')}
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Métrique (°C, km/h)</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio h-4 w-4 text-primary-600 focus:ring-primary-500"
              name="unit-system"
              value="imperial"
              checked={unitSystem === 'imperial'}
              onChange={() => setUnitSystem('imperial')}
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Impérial (°F, mph)</span>
          </label>
        </div>
      </div>
      
      {/* Taux de rafraîchissement */}
      <div className="space-y-2 pt-5 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-base font-medium text-gray-900 dark:text-white">Rafraîchissement des données</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Définissez la fréquence de mise à jour des données (en secondes).
        </p>
        <div className="mt-3 flex items-center space-x-4">
          <input
            type="range"
            min="10"
            max="300"
            step="10"
            value={dataRefreshRate}
            onChange={(e) => setDataRefreshRate(e.target.value)}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-16">
            {dataRefreshRate}s
          </span>
        </div>
      </div>
      
      {/* Bouton de sauvegarde */}
      <div className="pt-5 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-end">
          <button
            type="button"
            className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            Enregistrer les préférences
          </button>
        </div>
      </div>
    </div>
  );
} 