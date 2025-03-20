'use client';

import { useState } from 'react';

// Mock toll data
const mockTolls = [
  {
    id: 'TOLL-001',
    name: 'City Express Toll',
    location: 'Highway 1, KM 23',
    coordinates: { lat: 28.6139, lng: 77.2090 },
    status: 'Active',
    vehicleTypes: ['Car', 'Truck', 'Bus'],
    rates: {
      Car: 100,
      Truck: 300,
      Bus: 200
    },
    todayCollection: 25600,
    todayVehicles: 234,
    operatingHours: '24/7',
    lastMaintenance: '2024-03-10',
  },
  {
    id: 'TOLL-002',
    name: 'Metro Bridge Toll',
    location: 'Ring Road South, Bridge 3',
    coordinates: { lat: 28.6288, lng: 77.2089 },
    status: 'Active',
    vehicleTypes: ['Car', 'Truck', 'Bus', 'Motorcycle'],
    rates: {
      Car: 80,
      Truck: 250,
      Bus: 180,
      Motorcycle: 40
    },
    todayCollection: 18900,
    todayVehicles: 312,
    operatingHours: '24/7',
    lastMaintenance: '2024-03-12',
  },
  {
    id: 'TOLL-003',
    name: 'Industrial Zone Toll',
    location: 'Industrial Bypass, Exit 5',
    coordinates: { lat: 28.6129, lng: 77.2295 },
    status: 'Maintenance',
    vehicleTypes: ['Car', 'Truck', 'Bus'],
    rates: {
      Car: 120,
      Truck: 350,
      Bus: 250
    },
    todayCollection: 12400,
    todayVehicles: 145,
    operatingHours: '6:00 AM - 10:00 PM',
    lastMaintenance: '2024-03-15',
  },
];

// Mock transaction data
const mockTransactions = [
  {
    id: 'TRX-001',
    tollId: 'TOLL-001',
    vehicleType: 'Car',
    amount: 100,
    timestamp: '2024-03-15T10:30:00',
    vehicleNumber: 'MH01AB1234',
    paymentMethod: 'QR-less',
    status: 'Completed'
  },
  {
    id: 'TRX-002',
    tollId: 'TOLL-002',
    vehicleType: 'Truck',
    amount: 250,
    timestamp: '2024-03-15T10:35:00',
    vehicleNumber: 'MH02CD5678',
    paymentMethod: 'QR-less',
    status: 'Completed'
  },
  {
    id: 'TRX-003',
    tollId: 'TOLL-001',
    vehicleType: 'Bus',
    amount: 200,
    timestamp: '2024-03-15T10:40:00',
    vehicleNumber: 'MH03EF9012',
    paymentMethod: 'QR-less',
    status: 'Failed'
  },
];

interface Toll {
  id: string;
  name: string;
  location: string;
  coordinates: { lat: number; lng: number };
  status: string;
  vehicleTypes: string[];
  rates: Record<string, number>;
  todayCollection: number;
  todayVehicles: number;
  operatingHours: string;
  lastMaintenance: string;
}

interface Transaction {
  id: string;
  tollId: string;
  vehicleType: string;
  amount: number;
  timestamp: string;
  vehicleNumber: string;
  paymentMethod: string;
  status: string;
}

export default function TollManagement() {
  const [tolls, setTolls] = useState<Toll[]>(mockTolls);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedToll, setSelectedToll] = useState<Toll | null>(null);
  const [showEditToll, setShowEditToll] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const showNotification = (message: string, type: string) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const handleUpdateToll = async (toll: Toll) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedTolls = tolls.map(t => 
        t.id === toll.id ? toll : t
      );
      setTolls(updatedTolls);
      showNotification('Toll updated successfully!', 'success');
      setShowEditToll(false);
    } catch (error) {
      showNotification('Failed to update toll', 'error');
    }
  };

  const handleToggleStatus = async (tollId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedTolls = tolls.map(toll => {
        if (toll.id === tollId) {
          return {
            ...toll,
            status: toll.status === 'Active' ? 'Inactive' : 'Active'
          };
        }
        return toll;
      });
      setTolls(updatedTolls);
      showNotification('Toll status updated successfully!', 'success');
    } catch (error) {
      showNotification('Failed to update toll status', 'error');
    }
  };

  const getTotalCollection = () => {
    return tolls.reduce((sum, toll) => sum + toll.todayCollection, 0);
  };

  const getTotalVehicles = () => {
    return tolls.reduce((sum, toll) => sum + toll.todayVehicles, 0);
  };

  const getActiveTolls = () => {
    return tolls.filter(toll => toll.status === 'Active').length;
  };

  return (
    <div className="space-y-6 p-6">
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          {notification.message}
        </div>
      )}

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Toll Management</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`btn ${activeTab === 'overview' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`btn ${activeTab === 'transactions' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Transactions
          </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <>
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Total Collection Today</h3>
              <p className="mt-2 text-3xl font-semibold text-indigo-600 dark:text-indigo-400">
                ₹{getTotalCollection().toLocaleString()}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Total Vehicles Today</h3>
              <p className="mt-2 text-3xl font-semibold text-indigo-600 dark:text-indigo-400">
                {getTotalVehicles()}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Active Toll Booths</h3>
              <p className="mt-2 text-3xl font-semibold text-indigo-600 dark:text-indigo-400">
                {getActiveTolls()} / {tolls.length}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Success Rate</h3>
              <p className="mt-2 text-3xl font-semibold text-indigo-600 dark:text-indigo-400">
                {((transactions.filter(t => t.status === 'Completed').length / transactions.length) * 100).toFixed(1)}%
              </p>
            </div>
          </div>

          {/* Toll Booths */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tolls.map(toll => (
              <div key={toll.id} className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{toll.name}</h3>
                    <button
                      onClick={() => handleToggleStatus(toll.id)}
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        toll.status === 'Active'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}
                    >
                      {toll.status}
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{toll.location}</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Today's Collection:</span>
                      <span className="text-gray-900 dark:text-white">₹{toll.todayCollection.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Vehicles Today:</span>
                      <span className="text-gray-900 dark:text-white">{toll.todayVehicles}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Operating Hours:</span>
                      <span className="text-gray-900 dark:text-white">{toll.operatingHours}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Vehicle Types:</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {toll.vehicleTypes.map(type => (
                        <span
                          key={type}
                          className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 text-xs"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      onClick={() => {
                        setSelectedToll(toll);
                        setShowEditToll(true);
                      }}
                      className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'transactions' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Transaction ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Vehicle</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Time</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {transaction.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900 dark:text-white">{transaction.vehicleNumber}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{transaction.vehicleType}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    ₹{transaction.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(transaction.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.status === 'Completed'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Toll Modal */}
      {showEditToll && selectedToll && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full p-6">
            <h2 className="text-xl font-semibold mb-4">Edit Toll Booth</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                  value={selectedToll.name}
                  onChange={(e) => setSelectedToll({ ...selectedToll, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                  value={selectedToll.location}
                  onChange={(e) => setSelectedToll({ ...selectedToll, location: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Operating Hours</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                  value={selectedToll.operatingHours}
                  onChange={(e) => setSelectedToll({ ...selectedToll, operatingHours: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowEditToll(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateToll(selectedToll)}
                className="btn-primary"
              >
                Update Toll
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}