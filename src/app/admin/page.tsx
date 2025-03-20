'use client';

import { useState, useEffect } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Mock data for real-time updates
const generateMockData = () => ({
  totalUsers: Math.floor(Math.random() * 1000) + 5000,
  activeUsers: Math.floor(Math.random() * 500) + 1000,
  totalRevenue: Math.floor(Math.random() * 50000) + 100000,
  dailyRevenue: Math.floor(Math.random() * 5000) + 10000,
  totalTransactions: Math.floor(Math.random() * 1000) + 2000,
  pendingTransactions: Math.floor(Math.random() * 50) + 10,
  failedTransactions: Math.floor(Math.random() * 20) + 5,
  tollsProcessed: Math.floor(Math.random() * 500) + 1000,
});

// Initial static data to prevent hydration mismatch
const initialData = {
  totalUsers: 5000,
  activeUsers: 1000,
  totalRevenue: 100000,
  dailyRevenue: 10000,
  totalTransactions: 2000,
  pendingTransactions: 10,
  failedTransactions: 5,
  tollsProcessed: 1000,
};

// Mock data for recent activities
const initialActivities = [
  { id: 1, type: 'transaction', message: 'New payment received', amount: 1500, time: '2 minutes ago', status: 'success' },
  { id: 2, type: 'user', message: 'New user registered', time: '5 minutes ago', status: 'info' },
  { id: 3, type: 'toll', message: 'Toll booth maintenance scheduled', location: 'City Express Toll', time: '10 minutes ago', status: 'warning' },
  { id: 4, type: 'transaction', message: 'Payment failed', amount: 800, time: '15 minutes ago', status: 'error' },
  { id: 5, type: 'location', message: 'New location added', name: 'Central Mall', time: '20 minutes ago', status: 'success' },
];

// Chart options
const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Revenue Trend',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const doughnutChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Transaction Distribution',
    },
  },
};

// Initial chart data
const initialLineChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue',
      data: [10000, 20000, 15000, 25000, 30000, 35000],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
    {
      label: 'Transactions',
      data: [100, 200, 150, 250, 300, 350],
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.1,
    },
  ],
};

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState(initialData);
  const [recentActivities, setRecentActivities] = useState(initialActivities);
  const [selectedTimeRange, setSelectedTimeRange] = useState('today');
  const [isLoading, setIsLoading] = useState(false);
  const [lineChartData, setLineChartData] = useState(initialLineChartData);
  const [doughnutChartData, setDoughnutChartData] = useState({
    labels: ['Successful', 'Pending', 'Failed'],
    datasets: [
      {
        data: [initialData.totalTransactions, initialData.pendingTransactions, initialData.failedTransactions],
        backgroundColor: [
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(255, 99, 132, 0.8)',
        ],
      },
    ],
  });

  // Handle initial mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Start real-time updates only after initial mount
  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      const newStats = generateMockData();
      setStats(newStats);
      
      // Update doughnut chart data
      setDoughnutChartData({
        labels: ['Successful', 'Pending', 'Failed'],
        datasets: [
          {
            data: [newStats.totalTransactions, newStats.pendingTransactions, newStats.failedTransactions],
            backgroundColor: [
              'rgba(75, 192, 192, 0.8)',
              'rgba(255, 206, 86, 0.8)',
              'rgba(255, 99, 132, 0.8)',
            ],
          },
        ],
      });

      // Update line chart data
      setLineChartData(prev => ({
        ...prev,
        datasets: [
          {
            ...prev.datasets[0],
            data: Array.from({ length: 6 }, () => Math.floor(Math.random() * 50000) + 10000),
          },
          {
            ...prev.datasets[1],
            data: Array.from({ length: 6 }, () => Math.floor(Math.random() * 1000) + 100),
          },
        ],
      }));

      // Update activities
      setRecentActivities(prev => {
        const newActivity = {
          id: Date.now(),
          type: ['transaction', 'user', 'toll', 'location'][Math.floor(Math.random() * 4)],
          message: 'New activity detected',
          time: 'Just now',
          status: ['success', 'info', 'warning', 'error'][Math.floor(Math.random() * 4)],
        };
        return [newActivity, ...prev.slice(0, 4)];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [mounted]);

  // Simulate data loading
  const handleTimeRangeChange = async (range: string) => {
    setIsLoading(true);
    setSelectedTimeRange(range);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newStats = generateMockData();
    setStats(newStats);
    setIsLoading(false);
  };

  // Don't render anything until after hydration
  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => handleTimeRangeChange('today')}
            className={`px-4 py-2 rounded-md ${
              selectedTimeRange === 'today'
                ? 'bg-indigo-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => handleTimeRangeChange('week')}
            className={`px-4 py-2 rounded-md ${
              selectedTimeRange === 'week'
                ? 'bg-indigo-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => handleTimeRangeChange('month')}
            className={`px-4 py-2 rounded-md ${
              selectedTimeRange === 'month'
                ? 'bg-indigo-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            This Month
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Total Users</h3>
            <span className="text-green-500 text-sm">↑ 12%</span>
          </div>
          <p className="mt-2 text-3xl font-semibold text-indigo-600 dark:text-indigo-400">
            {stats.totalUsers.toLocaleString()}
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Active Now: {stats.activeUsers.toLocaleString()}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Total Revenue</h3>
            <span className="text-green-500 text-sm">↑ 8%</span>
          </div>
          <p className="mt-2 text-3xl font-semibold text-indigo-600 dark:text-indigo-400">
            ₹{stats.totalRevenue.toLocaleString()}
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Today: ₹{stats.dailyRevenue.toLocaleString()}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Transactions</h3>
            <span className="text-yellow-500 text-sm">↑ 5%</span>
          </div>
          <p className="mt-2 text-3xl font-semibold text-indigo-600 dark:text-indigo-400">
            {stats.totalTransactions.toLocaleString()}
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Pending: {stats.pendingTransactions}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Tolls Processed</h3>
            <span className="text-green-500 text-sm">↑ 15%</span>
          </div>
          <p className="mt-2 text-3xl font-semibold text-indigo-600 dark:text-indigo-400">
            {stats.tollsProcessed.toLocaleString()}
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Success Rate: 98.5%
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <Line options={lineChartOptions} data={lineChartData} />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <Doughnut options={doughnutChartOptions} data={doughnutChartData} />
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'error' ? 'bg-red-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                </div>
                {activity.amount && (
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    ₹{activity.amount.toLocaleString()}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        </div>
      )}
    </div>
  );
} 