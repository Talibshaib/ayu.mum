'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Mock service provider types
const serviceTypes = [
  { id: 'restaurant', name: 'Restaurant Owner', 
    fields: ['Restaurant Name', 'Area Radius', 'Cuisine Type', 'Opening Hours'] },
  { id: 'toll', name: 'Toll Management', 
    fields: ['Toll Plaza Name', 'Highway Location', 'Number of Lanes', 'Operating Hours'] },
  { id: 'business', name: 'Business Owner', 
    fields: ['Business Name', 'Business Type', 'Service Area', 'Operating Hours'] },
  { id: 'taxi', name: 'Taxi Service', 
    fields: ['Company Name', 'Fleet Size', 'Service Area', 'Operating Hours'] }
];

interface FormData {
  [key: string]: string;
}

export default function ServiceProviderSelection() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState('');
  const [formData, setFormData] = useState<FormData>({});
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setShowForm(true);
    setFormData({});
    setError('');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const selectedProvider = serviceTypes.find(type => type.id === selectedType);
    const hasEmptyFields = selectedProvider?.fields.some(field => !formData[field]);

    if (hasEmptyFields) {
      setError('Please fill in all fields');
      return;
    }

    // Store provider type and data in localStorage for persistence
    localStorage.setItem('serviceProviderType', selectedType);
    localStorage.setItem('serviceProviderData', JSON.stringify(formData));

    // Redirect to appropriate dashboard
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Service Provider Dashboard
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Select your service type to continue
          </p>
        </div>

        {!showForm ? (
          <div className="grid gap-4">
            {serviceTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handleTypeSelect(type.id)}
                className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-lg font-medium text-gray-900 dark:text-white">{type.name}</span>
                <svg className="h-5 w-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm space-y-4">
              {serviceTypes.find(type => type.id === selectedType)?.fields.map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {field}
                  </label>
                  <input
                    type="text"
                    id={field}
                    name={field}
                    required
                    value={formData[field] || ''}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
                  />
                </div>
              ))}
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Back
              </button>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Continue
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
