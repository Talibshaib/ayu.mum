'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Mock users data
const mockUsers = {
  restaurant: [
    { id: 1, email: 'taj@example.com', password: 'password123', name: 'Taj Restaurant', type: 'restaurant' },
    { id: 2, email: 'pizza@example.com', password: 'password123', name: 'Pizza Hub', type: 'restaurant' }
  ],
  toll: [
    { id: 3, email: 'highway1@example.com', password: 'password123', name: 'Highway 1 Toll Plaza', type: 'toll' },
    { id: 4, email: 'express@example.com', password: 'password123', name: 'Express Toll', type: 'toll' }
  ],
  business: [
    { id: 5, email: 'mart@example.com', password: 'password123', name: 'Smart Mart', type: 'business' },
    { id: 6, email: 'tech@example.com', password: 'password123', name: 'Tech Solutions', type: 'business' }
  ],
  taxi: [
    { id: 7, email: 'quick@example.com', password: 'password123', name: 'Quick Cabs', type: 'taxi' },
    { id: 8, email: 'city@example.com', password: 'password123', name: 'City Taxi', type: 'taxi' }
  ]
};

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Find user in mock data
    const users = selectedType ? mockUsers[selectedType as keyof typeof mockUsers] : [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      // Store user data in localStorage
      localStorage.setItem('currentUser', JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type
      }));
      router.push('/admin');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Please select your service type and login
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="service-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Service Type
              </label>
              <select
                id="service-type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
              >
                <option value="">Select a service type</option>
                <option value="restaurant">Restaurant</option>
                <option value="toll">Toll Management</option>
                <option value="business">Business</option>
                <option value="taxi">Taxi Service</option>
              </select>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>

          <div className="text-sm text-center text-gray-600 dark:text-gray-400">
            Demo accounts:<br />
            Restaurant: taj@example.com<br />
            Toll: highway1@example.com<br />
            Business: mart@example.com<br />
            Taxi: quick@example.com<br />
            (password: password123)
          </div>
        </form>
      </div>
    </div>
  );
} 