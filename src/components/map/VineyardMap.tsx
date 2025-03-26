/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import type { ComponentType } from 'react';

// Définir des types pour les composants Leaflet
type LeafletComponent<P> = ComponentType<P>;

// Import Leaflet dynamiquement pour éviter les erreurs SSR
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
) as LeafletComponent<any>;

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
) as LeafletComponent<any>;

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
) as LeafletComponent<any>;

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
) as LeafletComponent<any>;

const Circle = dynamic(
  () => import('react-leaflet').then((mod) => mod.Circle),
  { ssr: false }
) as LeafletComponent<any>;

// Données de démo pour les stations
const stations = [
  { id: 1, name: "Station 1", lat: 47.2430, lng: 6.0234, status: "active", temperature: 2.4 },
  { id: 2, name: "Station 2", lat: 47.2480, lng: 6.0287, status: "active", temperature: 2.1 },
  { id: 3, name: "Station 3", lat: 47.2510, lng: 6.0180, status: "warning", temperature: 1.2 },
  { id: 4, name: "Station 4", lat: 47.2550, lng: 6.0240, status: "alert", temperature: 0.3 },
  { id: 5, name: "Station 5", lat: 47.2505, lng: 6.0320, status: "active", temperature: 2.8 },
];

// Données de démo pour les zones de chauffage
const heatingZones = [
  { id: 1, name: "Zone A", lat: 47.2430, lng: 6.0234, radius: 120, active: true },
  { id: 2, name: "Zone B", lat: 47.2480, lng: 6.0287, radius: 150, active: true },
  { id: 3, name: "Zone C", lat: 47.2510, lng: 6.0180, radius: 100, active: false },
  { id: 4, name: "Zone D", lat: 47.2550, lng: 6.0240, radius: 180, active: false },
];

export function VineyardMap() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Importation dynamique de la feuille de style Leaflet
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);
    
    setLeafletLoaded(true);
  }, []);

  if (!mounted || !leafletLoaded) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">Chargement de la carte...</p>
        </div>
      </div>
    );
  }

  const tileUrl = theme === 'dark'
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  return (
    <div className="h-full w-full overflow-hidden">
      <div className="h-full w-full relative">
        <MapContainer
          center={[47.2500, 6.0250]}
          zoom={14}
          style={{ 
            height: '90%', 
            width: '100%', 
            borderRadius: '0.5rem'
          }}
        >
          <TileLayer
            url={tileUrl}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          
          {/* Zones de chauffage */}
          {heatingZones.map((zone) => (
            <Circle
              key={zone.id}
              center={[zone.lat, zone.lng]}
              radius={zone.radius}
              pathOptions={{
                color: zone.active ? '#17cc17' : '#e11d48',
                fillColor: zone.active ? '#a2f9a2' : '#fda4af',
                fillOpacity: 0.3,
              }}
            >
              <Popup>
                <div className="text-center">
                  <h3 className="font-medium">{zone.name}</h3>
                  <p>Statut: {zone.active ? 'Active' : 'Inactive'}</p>
                </div>
              </Popup>
            </Circle>
          ))}
          
          {/* Stations */}
          {stations.map((station) => (
            <Marker
              key={station.id}
              position={[station.lat, station.lng]}
            >
              <Popup>
                <div className="text-center">
                  <h3 className="font-medium">{station.name}</h3>
                  <p className={`${
                    station.status === 'active' 
                      ? 'text-primary-600' 
                      : station.status === 'warning' 
                        ? 'text-warning-600' 
                        : 'text-danger-600'
                  }`}>
                    {station.temperature}°C
                  </p>
                  <p>Statut: {
                    station.status === 'active' 
                      ? 'Normal' 
                      : station.status === 'warning' 
                        ? 'Attention' 
                        : 'Alerte'
                  }</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
} 