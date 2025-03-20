'use client';

import { useState, useEffect } from 'react';

interface Settings {
  general: {
    language: string;
    timezone: string;
    dateFormat: string;
    darkMode: boolean;
  };
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    orderUpdates: boolean;
    paymentAlerts: boolean;
    securityAlerts: boolean;
  };
  security: {
    twoFactorAuth: boolean;
    sessionTimeout: number;
    passwordExpiry: number;
    loginAttempts: number;
  };
  payment: {
    defaultCurrency: string;
    autoWithdrawal: boolean;
    minWithdrawalAmount: number;
    paymentMethod: string;
  };
}

const defaultSettings: Settings = {
  general: {
    language: 'English',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    darkMode: false,
  },
  notifications: {
    email: true,
    push: true,
    sms: false,
    orderUpdates: true,
    paymentAlerts: true,
    securityAlerts: true,
  },
  security: {
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAttempts: 3,
  },
  payment: {
    defaultCurrency: 'USD',
    autoWithdrawal: false,
    minWithdrawalAmount: 100,
    paymentMethod: 'Bank Transfer',
  },
};

const languages = ['English', 'Spanish', 'French', 'German', 'Chinese'];
const timezones = ['UTC', 'UTC+1', 'UTC+2', 'UTC+3', 'UTC-1', 'UTC-2', 'UTC-3'];
const dateFormats = ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'];
const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD'];
const paymentMethods = ['Bank Transfer', 'PayPal', 'Credit Card', 'Crypto'];

export default function Settings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('userSettings', JSON.stringify(settings));
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Language
        </label>
        <select
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-3"
          value={settings.general.language}
          onChange={(e) => setSettings({
            ...settings,
            general: { ...settings.general, language: e.target.value }
          })}
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Timezone
        </label>
        <select
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-3"
          value={settings.general.timezone}
          onChange={(e) => setSettings({
            ...settings,
            general: { ...settings.general, timezone: e.target.value }
          })}
        >
          {timezones.map((tz) => (
            <option key={tz} value={tz}>{tz}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Date Format
        </label>
        <select
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-3"
          value={settings.general.dateFormat}
          onChange={(e) => setSettings({
            ...settings,
            general: { ...settings.general, dateFormat: e.target.value }
          })}
        >
          {dateFormats.map((format) => (
            <option key={format} value={format}>{format}</option>
          ))}
        </select>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="darkMode"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          checked={settings.general.darkMode}
          onChange={(e) => setSettings({
            ...settings,
            general: { ...settings.general, darkMode: e.target.checked }
          })}
        />
        <label htmlFor="darkMode" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
          Dark Mode
        </label>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="emailNotif"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          checked={settings.notifications.email}
          onChange={(e) => setSettings({
            ...settings,
            notifications: { ...settings.notifications, email: e.target.checked }
          })}
        />
        <label htmlFor="emailNotif" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
          Email Notifications
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="pushNotif"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          checked={settings.notifications.push}
          onChange={(e) => setSettings({
            ...settings,
            notifications: { ...settings.notifications, push: e.target.checked }
          })}
        />
        <label htmlFor="pushNotif" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
          Push Notifications
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="smsNotif"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          checked={settings.notifications.sms}
          onChange={(e) => setSettings({
            ...settings,
            notifications: { ...settings.notifications, sms: e.target.checked }
          })}
        />
        <label htmlFor="smsNotif" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
          SMS Notifications
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="orderUpdates"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          checked={settings.notifications.orderUpdates}
          onChange={(e) => setSettings({
            ...settings,
            notifications: { ...settings.notifications, orderUpdates: e.target.checked }
          })}
        />
        <label htmlFor="orderUpdates" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
          Order Updates
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="paymentAlerts"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          checked={settings.notifications.paymentAlerts}
          onChange={(e) => setSettings({
            ...settings,
            notifications: { ...settings.notifications, paymentAlerts: e.target.checked }
          })}
        />
        <label htmlFor="paymentAlerts" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
          Payment Alerts
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="securityAlerts"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          checked={settings.notifications.securityAlerts}
          onChange={(e) => setSettings({
            ...settings,
            notifications: { ...settings.notifications, securityAlerts: e.target.checked }
          })}
        />
        <label htmlFor="securityAlerts" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
          Security Alerts
        </label>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="twoFactorAuth"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          checked={settings.security.twoFactorAuth}
          onChange={(e) => setSettings({
            ...settings,
            security: { ...settings.security, twoFactorAuth: e.target.checked }
          })}
        />
        <label htmlFor="twoFactorAuth" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
          Two-Factor Authentication
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Session Timeout (minutes)
        </label>
        <input
          type="number"
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-3"
          value={settings.security.sessionTimeout}
          onChange={(e) => setSettings({
            ...settings,
            security: { ...settings.security, sessionTimeout: parseInt(e.target.value) }
          })}
          min="5"
          max="120"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Password Expiry (days)
        </label>
        <input
          type="number"
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-3"
          value={settings.security.passwordExpiry}
          onChange={(e) => setSettings({
            ...settings,
            security: { ...settings.security, passwordExpiry: parseInt(e.target.value) }
          })}
          min="30"
          max="365"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Max Login Attempts
        </label>
        <input
          type="number"
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-3"
          value={settings.security.loginAttempts}
          onChange={(e) => setSettings({
            ...settings,
            security: { ...settings.security, loginAttempts: parseInt(e.target.value) }
          })}
          min="3"
          max="10"
        />
      </div>
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Default Currency
        </label>
        <select
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-3"
          value={settings.payment.defaultCurrency}
          onChange={(e) => setSettings({
            ...settings,
            payment: { ...settings.payment, defaultCurrency: e.target.value }
          })}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="autoWithdrawal"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          checked={settings.payment.autoWithdrawal}
          onChange={(e) => setSettings({
            ...settings,
            payment: { ...settings.payment, autoWithdrawal: e.target.checked }
          })}
        />
        <label htmlFor="autoWithdrawal" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
          Automatic Withdrawal
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Minimum Withdrawal Amount
        </label>
        <input
          type="number"
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-3"
          value={settings.payment.minWithdrawalAmount}
          onChange={(e) => setSettings({
            ...settings,
            payment: { ...settings.payment, minWithdrawalAmount: parseInt(e.target.value) }
          })}
          min="10"
          max="1000"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Payment Method
        </label>
        <select
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-3"
          value={settings.payment.paymentMethod}
          onChange={(e) => setSettings({
            ...settings,
            payment: { ...settings.payment, paymentMethod: e.target.value }
          })}
        >
          {paymentMethods.map((method) => (
            <option key={method} value={method}>{method}</option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Settings</h1>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`px-4 py-2 rounded-md text-white ${
            isSaving ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {showSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          Settings saved successfully!
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px">
            {['general', 'notifications', 'security', 'payment'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === tab
                    ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'general' && renderGeneralSettings()}
          {activeTab === 'notifications' && renderNotificationSettings()}
          {activeTab === 'security' && renderSecuritySettings()}
          {activeTab === 'payment' && renderPaymentSettings()}
        </div>
      </div>
    </div>
  );
} 