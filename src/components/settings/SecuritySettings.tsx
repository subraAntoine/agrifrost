'use client';

import { useState } from 'react';
import { LockClosedIcon, KeyIcon, DevicePhoneMobileIcon, ClockIcon } from '@heroicons/react/24/outline';

type AuthMethod = 'password' | 'sms' | 'email' | 'authenticator';

interface SecurityDevice {
  id: string;
  name: string;
  type: string;
  lastUsed: Date;
  isCurrent: boolean;
}

export function SecuritySettings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [authMethods, setAuthMethods] = useState<AuthMethod[]>(['password']);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  
  const [devices, setDevices] = useState<SecurityDevice[]>([
    {
      id: '1',
      name: 'MacBook Pro',
      type: 'Desktop',
      lastUsed: new Date(),
      isCurrent: true
    },
    {
      id: '2',
      name: 'iPhone 13',
      type: 'Mobile',
      lastUsed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      isCurrent: false
    },
    {
      id: '3',
      name: 'iPad Pro',
      type: 'Tablet',
      lastUsed: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      isCurrent: false
    }
  ]);
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setNewPassword(password);
    
    // Simple password strength calculation
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    setPasswordStrength(strength);
  };
  
  const toggleAuthMethod = (method: AuthMethod) => {
    setAuthMethods(prev => 
      prev.includes(method)
        ? prev.filter(m => m !== method)
        : [...prev, method]
    );
  };
  
  const getStrengthColor = () => {
    if (passwordStrength < 2) return 'bg-red-500';
    if (passwordStrength < 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  const getStrengthLabel = () => {
    if (passwordStrength < 2) return 'Faible';
    if (passwordStrength < 4) return 'Moyen';
    return 'Fort';
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const removeDevice = (deviceId: string) => {
    setDevices(devices.filter(device => device.id !== deviceId));
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Sécurité
      </h2>
      
      {/* Mot de passe */}
      <div className="space-y-4 p-4 bg-white dark:bg-gray-800 shadow-sm rounded-lg">
        <div className="flex items-center gap-3">
          <KeyIcon className="h-6 w-6 text-gray-400" />
          <h3 className="text-base font-medium text-gray-900 dark:text-white">
            Mot de passe
          </h3>
        </div>
        
        <p className="ml-9 text-sm text-gray-500 dark:text-gray-400">
          Changez votre mot de passe régulièrement pour assurer la sécurité de votre compte.
        </p>
        
        <div className="ml-9 space-y-4 mt-4">
          <div>
            <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Mot de passe actuel
            </label>
            <input
              type="password"
              id="current-password"
              name="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-800 dark:text-white"
            />
          </div>
          
          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nouveau mot de passe
            </label>
            <input
              type="password"
              id="new-password"
              name="new-password"
              value={newPassword}
              onChange={handlePasswordChange}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-800 dark:text-white"
            />
            
            {newPassword && (
              <div className="mt-2">
                <div className="flex items-center justify-between">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`${getStrengthColor()} h-2 rounded-full`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span className="ml-3 text-xs text-gray-500 dark:text-gray-400 w-16">
                    {getStrengthLabel()}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Utilisez au moins 8 caractères, avec des majuscules, des minuscules, des chiffres et des caractères spéciaux.
                </p>
              </div>
            )}
          </div>
          
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-800 dark:text-white"
            />
            
            {confirmPassword && newPassword !== confirmPassword && (
              <p className="mt-1 text-xs text-red-500">
                Les mots de passe ne correspondent pas.
              </p>
            )}
          </div>
          
          <div>
            <button
              type="button"
              className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Mettre à jour le mot de passe
            </button>
          </div>
        </div>
      </div>
      
      {/* Authentification à deux facteurs */}
      <div className="space-y-4 p-4 bg-white dark:bg-gray-800 shadow-sm rounded-lg">
        <div className="flex items-center gap-3">
          <LockClosedIcon className="h-6 w-6 text-gray-400" />
          <h3 className="text-base font-medium text-gray-900 dark:text-white">
            Authentification à deux facteurs
          </h3>
        </div>
        
        <p className="ml-9 text-sm text-gray-500 dark:text-gray-400">
          Ajoutez une couche de sécurité supplémentaire à votre compte.
        </p>
        
        <div className="ml-9 space-y-3 mt-4">
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="auth-password"
                name="auth-password"
                type="checkbox"
                checked={authMethods.includes('password')}
                onChange={() => toggleAuthMethod('password')}
                className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
                disabled
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="auth-password" className="font-medium text-gray-700 dark:text-gray-300">
                Mot de passe (requis)
              </label>
              <p className="text-gray-500 dark:text-gray-400">
                Votre mot de passe est toujours requis pour vous connecter.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="auth-sms"
                name="auth-sms"
                type="checkbox"
                checked={authMethods.includes('sms')}
                onChange={() => toggleAuthMethod('sms')}
                className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="auth-sms" className="font-medium text-gray-700 dark:text-gray-300">
                Code par SMS
              </label>
              <p className="text-gray-500 dark:text-gray-400">
                Recevez un code unique par SMS sur votre téléphone.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="auth-email"
                name="auth-email"
                type="checkbox"
                checked={authMethods.includes('email')}
                onChange={() => toggleAuthMethod('email')}
                className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="auth-email" className="font-medium text-gray-700 dark:text-gray-300">
                Code par email
              </label>
              <p className="text-gray-500 dark:text-gray-400">
                Recevez un code unique par email.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="auth-authenticator"
                name="auth-authenticator"
                type="checkbox"
                checked={authMethods.includes('authenticator')}
                onChange={() => toggleAuthMethod('authenticator')}
                className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="auth-authenticator" className="font-medium text-gray-700 dark:text-gray-300">
                Application d&apos;authentification
              </label>
              <p className="text-gray-500 dark:text-gray-400">
                Utilisez une application comme Google Authenticator ou Authy.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Délai d'expiration de session */}
      <div className="space-y-4 p-4 bg-white dark:bg-gray-800 shadow-sm rounded-lg">
        <div className="flex items-center gap-3">
          <ClockIcon className="h-6 w-6 text-gray-400" />
          <h3 className="text-base font-medium text-gray-900 dark:text-white">
            Délai d&apos;expiration de session
          </h3>
        </div>
        
        <p className="ml-9 text-sm text-gray-500 dark:text-gray-400">
          Définissez la durée d&apos;inactivité après laquelle vous serez automatiquement déconnecté.
        </p>
        
        <div className="ml-9 mt-4">
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="5"
              max="120"
              step="5"
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(e.target.value)}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-16">
              {sessionTimeout} min
            </span>
          </div>
        </div>
      </div>
      
      {/* Appareils connectés */}
      <div className="space-y-4 p-4 bg-white dark:bg-gray-800 shadow-sm rounded-lg">
        <div className="flex items-center gap-3">
          <DevicePhoneMobileIcon className="h-6 w-6 text-gray-400" />
          <h3 className="text-base font-medium text-gray-900 dark:text-white">
            Appareils connectés
          </h3>
        </div>
        
        <p className="ml-9 text-sm text-gray-500 dark:text-gray-400">
          Gérez les appareils connectés à votre compte.
        </p>
        
        <div className="ml-9 space-y-4 mt-4">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {devices.map(device => (
              <li key={device.id} className="py-3 flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {device.name} {device.isCurrent && <span className="text-xs text-primary-600">(Cet appareil)</span>}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {device.type} • Dernière utilisation: {formatDate(device.lastUsed)}
                  </p>
                </div>
                {!device.isCurrent && (
                  <button
                    type="button"
                    onClick={() => removeDevice(device.id)}
                    className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                  >
                    Déconnecter
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Bouton de sauvegarde */}
      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            Enregistrer les paramètres
          </button>
        </div>
      </div>
    </div>
  );
} 