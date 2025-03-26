'use client';

import { useState, useEffect } from 'react';
import { SunIcon, CloudIcon, CloudIcon as CloudRainIcon } from '@heroicons/react/24/outline';

// Données de démo pour la météo
const mockWeather = {
  temperature: 4.2,
  condition: 'cloudy', // 'sunny', 'cloudy', 'rainy'
  humidity: 78,
  windSpeed: 3.2,
  forecast: [
    { day: "Aujourd'hui", temp: 4.2, condition: 'cloudy' },
    { day: "Demain", temp: 5.8, condition: 'sunny' },
    { day: "Après-demain", temp: 3.5, condition: 'rainy' },
  ],
};

export function WeatherCard() {
  const [weather] = useState(mockWeather);
  const [time, setTime] = useState('');

  // Mise à jour de l'heure actuelle
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Météo locale
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">{time}</span>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          {weather.condition === 'sunny' ? (
            <SunIcon className="h-10 w-10 text-yellow-500" />
          ) : weather.condition === 'cloudy' ? (
            <CloudIcon className="h-10 w-10 text-gray-500" />
          ) : (
            <CloudRainIcon className="h-10 w-10 text-blue-500" />
          )}
          <span className="ml-3 text-3xl font-semibold text-gray-900 dark:text-white">
            {weather.temperature}°C
          </span>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Humidité: {weather.humidity}%
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Vent: {weather.windSpeed} km/h
          </div>
        </div>
      </div>
      
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Prévisions
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {weather.forecast.map((day) => (
          <div key={day.day} className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{day.day}</div>
            <div className="flex justify-center mb-1">
              {day.condition === 'sunny' ? (
                <SunIcon className="h-5 w-5 text-yellow-500" />
              ) : day.condition === 'cloudy' ? (
                <CloudIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <CloudRainIcon className="h-5 w-5 text-blue-500" />
              )}
            </div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">{day.temp}°C</div>
          </div>
        ))}
      </div>
    </div>
  );
} 