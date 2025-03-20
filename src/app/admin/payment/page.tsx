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

// Mock transaction data
const mockTransactions = [
  { id: 1, date: '2024-02-20', amount: 1500, status: 'Completed', type: 'Credit', customer: 'John Doe' },
  { id: 2, date: '2024-02-19', amount: 2300, status: 'Pending', type: 'Debit', customer: 'Jane Smith' },
  { id: 3, date: '2024-02-18', amount: 1800, status: 'Completed', type: 'Credit', customer: 'Mike Johnson' },
  { id: 4, date: '2024-02-17', amount: 3200, status: 'Failed', type: 'Credit', customer: 'Sarah Wilson' },
  { id: 5, date: '2024-02-16', amount: 2100, status: 'Completed', type: 'Debit', customer: 'Tom Brown' },
];

const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue',
      data: [30000, 35000, 32000, 38000, 42000, 45000],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
    {
      label: 'Transactions',
      data: [150, 180, 160, 190, 210, 225],
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.1,
    },
  ],
};

export default function PaymentManagement() {
  const [userType, setUserType] = useState<string>('');
  const [transactions, setTransactions] = useState(mockTransactions);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      const user = JSON.parse(userJson);
      setUserType(user.type);
    }
  }, []);

  const stats = {
    totalRevenue: '₹152,000',
    monthlyRevenue: '₹45,000',
    totalTransactions: '850',
    successRate: '95%',
  };

  const handleFilterChange = (status: string) => {
    setFilter(status);
    if (status === 'all') {
      setTransactions(mockTransactions);
    } else {
      setTransactions(mockTransactions.filter(t => t.status.toLowerCase() === status.toLowerCase()));
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Payment Management
        </h1>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          Export Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">{stats.totalRevenue}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Monthly Revenue</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">{stats.monthlyRevenue}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Transactions</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">{stats.totalTransactions}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Success Rate</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">{stats.successRate}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Revenue & Transactions Overview</h2>
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

      {/* Transactions Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Recent Transactions</h2>
            <div className="space-x-2">
              <button
                onClick={() => handleFilterChange('all')}
                className={`px-3 py-1 rounded ${
                  filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700'
                }`}
              >
                All
              </button>
              <button
                onClick={() => handleFilterChange('completed')}
                className={`px-3 py-1 rounded ${
                  filter === 'completed' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700'
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => handleFilterChange('pending')}
                className={`px-3 py-1 rounded ${
                  filter === 'pending' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => handleFilterChange('failed')}
                className={`px-3 py-1 rounded ${
                  filter === 'failed' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700'
                }`}
              >
                Failed
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
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
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {transaction.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    ₹{transaction.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {transaction.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 