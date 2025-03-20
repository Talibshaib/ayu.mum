'use client';

import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Mock toll booth data
const mockTollBooths = [
  {
    id: 1,
    name: 'Booth A1',
    location: 'Highway 101, Mile 45',
    status: 'Active',
    operator: 'John Smith',
    lastMaintenance: '2024-02-15',
    nextMaintenance: '2024-03-15',
    todayCollection: 25000,
    todayVehicles: 250,
  },
  {
    id: 2,
    name: 'Booth A2',
    location: 'Highway 101, Mile 45',
    status: 'Maintenance',
    operator: 'Jane Doe',
    lastMaintenance: '2024-02-18',
    nextMaintenance: '2024-03-18',
    todayCollection: 0,
    todayVehicles: 0,
  },
  {
    id: 3,
    name: 'Booth B1',
    location: 'Highway 101, Mile 46',
    status: 'Active',
    operator: 'Mike Johnson',
    lastMaintenance: '2024-02-10',
    nextMaintenance: '2024-03-10',
    todayCollection: 28000,
    todayVehicles: 280,
  },
];

// Mock transaction data
const mockTransactions = [
  {
    id: 1,
    boothId: 1,
    vehicleType: 'Car',
    amount: 100,
    timestamp: '2024-02-20 14:30:00',
    paymentMethod: 'Card',
    status: 'Completed',
  },
  {
    id: 2,
    boothId: 3,
    vehicleType: 'Truck',
    amount: 300,
    timestamp: '2024-02-20 14:25:00',
    paymentMethod: 'Cash',
    status: 'Completed',
  },
  {
    id: 3,
    boothId: 1,
    vehicleType: 'Bus',
    amount: 200,
    timestamp: '2024-02-20 14:20:00',
    paymentMethod: 'UPI',
    status: 'Failed',
  },
];

const chartData = {
  labels: ['6 AM', '8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM'],
  datasets: [
    {
      label: 'Vehicle Count',
      data: [50, 80, 120, 160, 140, 180, 160, 120],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
    {
      label: 'Revenue (₹100)',
      data: [50, 85, 125, 165, 145, 185, 165, 125],
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.1,
    },
  ],
};

export default function TollManagement() {
  const [tollBooths, setTollBooths] = useState(mockTollBooths);
  const [transactions, setTransactions] = useState(mockTransactions);
  const [selectedBooth, setSelectedBooth] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBooth, setNewBooth] = useState({
    name: '',
    location: '',
    operator: '',
  });

  const stats = {
    totalRevenue: '₹53,000',
    totalVehicles: '530',
    activeBooths: '2',
    maintenanceBooths: '1',
  };

  const handleAddBooth = () => {
    const booth = {
      id: tollBooths.length + 1,
      ...newBooth,
      status: 'Active',
      lastMaintenance: new Date().toISOString().slice(0, 10),
      nextMaintenance: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      todayCollection: 0,
      todayVehicles: 0,
    };
    setTollBooths([...tollBooths, booth]);
    setShowAddModal(false);
    setNewBooth({ name: '', location: '', operator: '' });
  };

  const handleToggleStatus = (boothId: number) => {
    setTollBooths(tollBooths.map(booth => {
      if (booth.id === boothId) {
        return {
          ...booth,
          status: booth.status === 'Active' ? 'Maintenance' : 'Active',
          lastMaintenance: booth.status === 'Active' ? new Date().toISOString().slice(0, 10) : booth.lastMaintenance,
        };
      }
      return booth;
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Toll Management
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Add Toll Booth
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Today's Revenue</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">{stats.totalRevenue}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Vehicles</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">{stats.totalVehicles}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Booths</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">{stats.activeBooths}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">In Maintenance</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">{stats.maintenanceBooths}</p>
        </div>
      </div>

      {/* Traffic Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Today's Traffic & Revenue</h2>
        <div className="h-80">
          <Line data={chartData} options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }} />
        </div>
      </div>

      {/* Toll Booths Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tollBooths.map((booth) => (
          <div key={booth.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{booth.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{booth.location}</p>
              </div>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  booth.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {booth.status}
              </span>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Operator:</span>
                <span className="text-gray-900 dark:text-white">{booth.operator}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Today's Collection:</span>
                <span className="text-gray-900 dark:text-white">₹{booth.todayCollection}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Vehicles Today:</span>
                <span className="text-gray-900 dark:text-white">{booth.todayVehicles}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Last Maintenance:</span>
                <span className="text-gray-900 dark:text-white">{booth.lastMaintenance}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Next Maintenance:</span>
                <span className="text-gray-900 dark:text-white">{booth.nextMaintenance}</span>
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => handleToggleStatus(booth.id)}
                className={`px-3 py-1 text-sm rounded ${
                  booth.status === 'Active'
                    ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {booth.status === 'Active' ? 'Set Maintenance' : 'Set Active'}
              </button>
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium">Recent Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Booth
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Vehicle Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    #{transaction.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {tollBooths.find(b => b.id === transaction.boothId)?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {transaction.vehicleType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    ₹{transaction.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {transaction.paymentMethod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {transaction.timestamp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Toll Booth Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Toll Booth</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600"
                  value={newBooth.name}
                  onChange={(e) => setNewBooth({ ...newBooth, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600"
                  value={newBooth.location}
                  onChange={(e) => setNewBooth({ ...newBooth, location: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Operator
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600"
                  value={newBooth.operator}
                  onChange={(e) => setNewBooth({ ...newBooth, operator: e.target.value })}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAddBooth}
                className="px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Add Booth
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 