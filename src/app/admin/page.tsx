'use client';

import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useRouter } from 'next/navigation';
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

// Mock data for different users
const userSpecificData = {
  // Restaurant users
  1: {
    stats: {
      totalOrders: 1250,
      activeOrders: 45,
      totalRevenue: 85000,
      dailyRevenue: 7500,
      averageRating: 4.5,
      totalCustomers: 850,
    },
    chartData: {
      labels: ['10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM'],
      datasets: [
        {
          label: 'Orders',
          data: [20, 35, 45, 30, 50, 40],
          borderColor: 'rgb(75, 192, 192)',
        },
        {
          label: 'Revenue',
          data: [2000, 3500, 4500, 3000, 5000, 4000],
          borderColor: 'rgb(255, 99, 132)',
        },
      ],
    },
    recentOrders: [
      { id: 1, customer: 'John Doe', items: 3, total: 850, status: 'Delivered' },
      { id: 2, customer: 'Jane Smith', items: 2, total: 450, status: 'Preparing' },
      { id: 3, customer: 'Mike Johnson', items: 4, total: 1200, status: 'Pending' },
    ],
  },
  2: {
    stats: {
      totalOrders: 980,
      activeOrders: 32,
      totalRevenue: 65000,
      dailyRevenue: 5500,
      averageRating: 4.2,
      totalCustomers: 620,
    },
    chartData: {
      labels: ['10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM'],
      datasets: [
        {
          label: 'Orders',
          data: [15, 25, 35, 28, 40, 30],
          borderColor: 'rgb(75, 192, 192)',
        },
        {
          label: 'Revenue',
          data: [1500, 2500, 3500, 2800, 4000, 3000],
          borderColor: 'rgb(255, 99, 132)',
        },
      ],
    },
    recentOrders: [
      { id: 1, customer: 'Alice Brown', items: 2, total: 450, status: 'Delivered' },
      { id: 2, customer: 'Bob Wilson', items: 1, total: 250, status: 'Preparing' },
      { id: 3, customer: 'Carol Davis', items: 3, total: 800, status: 'Pending' },
    ],
  },
  // Toll users
  3: {
    stats: {
      totalVehicles: 2500,
      activeBooths: 8,
      totalRevenue: 125000,
      dailyRevenue: 15000,
      pendingMaintenance: 2,
      successRate: 98.5,
    },
    chartData: {
      labels: ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'],
      datasets: [
        {
          label: 'Vehicles',
          data: [150, 280, 320, 290, 350, 220],
          borderColor: 'rgb(75, 192, 192)',
        },
        {
          label: 'Revenue',
          data: [7500, 14000, 16000, 14500, 17500, 11000],
          borderColor: 'rgb(255, 99, 132)',
        },
      ],
    },
    recentTransactions: [
      { id: 1, vehicle: 'MH01AB1234', type: 'Car', amount: 100, status: 'Completed' },
      { id: 2, vehicle: 'MH02CD5678', type: 'Truck', amount: 300, status: 'Completed' },
      { id: 3, vehicle: 'MH03EF9012', type: 'Bus', amount: 200, status: 'Failed' },
    ],
  },
  4: {
    stats: {
      totalVehicles: 1800,
      activeBooths: 6,
      totalRevenue: 95000,
      dailyRevenue: 12000,
      pendingMaintenance: 1,
      successRate: 97.8,
    },
    chartData: {
      labels: ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'],
      datasets: [
        {
          label: 'Vehicles',
          data: [120, 220, 280, 250, 300, 180],
          borderColor: 'rgb(75, 192, 192)',
        },
        {
          label: 'Revenue',
          data: [6000, 11000, 14000, 12500, 15000, 9000],
          borderColor: 'rgb(255, 99, 132)',
        },
      ],
    },
    recentTransactions: [
      { id: 1, vehicle: 'MH04XY5678', type: 'Car', amount: 100, status: 'Completed' },
      { id: 2, vehicle: 'MH05WZ9012', type: 'Bus', amount: 200, status: 'Completed' },
      { id: 3, vehicle: 'MH06UV3456', type: 'Truck', amount: 300, status: 'Failed' },
    ],
  },
  // Business users
  5: {
    stats: {
      totalSales: 850,
      activeSales: 35,
      totalRevenue: 250000,
      dailyRevenue: 25000,
      customerSatisfaction: 92,
      employeeCount: 25,
    },
    chartData: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [
        {
          label: 'Sales',
          data: [45, 52, 38, 60, 55, 48],
          borderColor: 'rgb(75, 192, 192)',
        },
        {
          label: 'Revenue',
          data: [25000, 28000, 22000, 32000, 30000, 26000],
          borderColor: 'rgb(255, 99, 132)',
        },
      ],
    },
    recentSales: [
      { id: 1, product: 'Product A', quantity: 5, total: 2500, status: 'Completed' },
      { id: 2, product: 'Product B', quantity: 3, total: 1800, status: 'Processing' },
      { id: 3, product: 'Product C', quantity: 2, total: 1200, status: 'Pending' },
    ],
  },
  6: {
    stats: {
      totalSales: 720,
      activeSales: 28,
      totalRevenue: 180000,
      dailyRevenue: 18000,
      customerSatisfaction: 88,
      employeeCount: 18,
    },
    chartData: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [
        {
          label: 'Sales',
          data: [38, 45, 32, 50, 48, 42],
          borderColor: 'rgb(75, 192, 192)',
        },
        {
          label: 'Revenue',
          data: [19000, 22000, 18000, 25000, 24000, 21000],
          borderColor: 'rgb(255, 99, 132)',
        },
      ],
    },
    recentSales: [
      { id: 1, product: 'Service X', quantity: 2, total: 1600, status: 'Completed' },
      { id: 2, product: 'Service Y', quantity: 1, total: 1200, status: 'Processing' },
      { id: 3, product: 'Service Z', quantity: 3, total: 2400, status: 'Pending' },
    ],
  },
  // Taxi users
  7: {
    stats: {
      activeDrivers: 120,
      totalRides: 1500,
      totalRevenue: 175000,
      dailyRevenue: 18000,
      averageRating: 4.7,
      completionRate: 95,
    },
    chartData: {
      labels: ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'],
      datasets: [
        {
          label: 'Rides',
          data: [80, 150, 130, 140, 180, 120],
          borderColor: 'rgb(75, 192, 192)',
        },
        {
          label: 'Revenue',
          data: [8000, 15000, 13000, 14000, 18000, 12000],
          borderColor: 'rgb(255, 99, 132)',
        },
      ],
    },
    recentRides: [
      { id: 1, passenger: 'Alice Brown', distance: '5.2 km', fare: 250, status: 'Completed' },
      { id: 2, passenger: 'Bob Wilson', distance: '3.8 km', fare: 180, status: 'In Progress' },
      { id: 3, passenger: 'Carol Davis', distance: '7.5 km', fare: 350, status: 'Scheduled' },
    ],
  },
  8: {
    stats: {
      activeDrivers: 85,
      totalRides: 1200,
      totalRevenue: 142000,
      dailyRevenue: 14500,
      averageRating: 4.5,
      completionRate: 93,
    },
    chartData: {
      labels: ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'],
      datasets: [
        {
          label: 'Rides',
          data: [60, 120, 110, 130, 150, 100],
          borderColor: 'rgb(75, 192, 192)',
        },
        {
          label: 'Revenue',
          data: [6000, 12000, 11000, 13000, 15000, 10000],
          borderColor: 'rgb(255, 99, 132)',
        },
      ],
    },
    recentRides: [
      { id: 1, passenger: 'David Lee', distance: '4.8 km', fare: 220, status: 'Completed' },
      { id: 2, passenger: 'Eva Green', distance: '3.2 km', fare: 160, status: 'In Progress' },
      { id: 3, passenger: 'Frank White', distance: '6.5 km', fare: 320, status: 'Scheduled' },
    ],
  },
};

export default function Dashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    const userJson = localStorage.getItem('currentUser');

    if (!userJson) {
      router.push('/login');
      return;
    }

    const user = JSON.parse(userJson);
    setUserData(user);
    setStats(userSpecificData[user.id as keyof typeof userSpecificData]);
  }, [router]);

  if (!mounted || !stats || !userData) {
    return null;
  }

  const renderStats = () => {
    switch (userData.type) {
      case 'restaurant':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <StatCard title="Total Orders" value={stats.stats.totalOrders} />
              <StatCard title="Active Orders" value={stats.stats.activeOrders} />
              <StatCard title="Total Revenue" value={`₹${stats.stats.totalRevenue}`} />
              <StatCard title="Daily Revenue" value={`₹${stats.stats.dailyRevenue}`} />
              <StatCard title="Average Rating" value={stats.stats.averageRating} />
              <StatCard title="Total Customers" value={stats.stats.totalCustomers} />
            </div>
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard title="Orders & Revenue Trend">
                <Line data={stats.chartData} options={chartOptions} />
              </ChartCard>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-lg font-medium mb-4">Recent Orders</h3>
                <div className="space-y-4">
                  {stats.recentOrders.map((order: any) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>
              </div>
            </div>
          </>
        );

      case 'toll':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <StatCard title="Total Vehicles" value={stats.stats.totalVehicles} />
              <StatCard title="Active Booths" value={stats.stats.activeBooths} />
              <StatCard title="Total Revenue" value={`₹${stats.stats.totalRevenue}`} />
              <StatCard title="Daily Revenue" value={`₹${stats.stats.dailyRevenue}`} />
              <StatCard title="Pending Maintenance" value={stats.stats.pendingMaintenance} />
              <StatCard title="Success Rate" value={`${stats.stats.successRate}%`} />
            </div>
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard title="Traffic & Revenue Trend">
                <Line data={stats.chartData} options={chartOptions} />
              </ChartCard>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-lg font-medium mb-4">Recent Transactions</h3>
                <div className="space-y-4">
                  {stats.recentTransactions.map((transaction: any) => (
                    <TransactionCard key={transaction.id} transaction={transaction} />
                  ))}
                </div>
              </div>
            </div>
          </>
        );

      case 'business':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <StatCard title="Total Sales" value={stats.stats.totalSales} />
              <StatCard title="Active Sales" value={stats.stats.activeSales} />
              <StatCard title="Total Revenue" value={`₹${stats.stats.totalRevenue}`} />
              <StatCard title="Daily Revenue" value={`₹${stats.stats.dailyRevenue}`} />
              <StatCard title="Customer Satisfaction" value={`${stats.stats.customerSatisfaction}%`} />
              <StatCard title="Employee Count" value={stats.stats.employeeCount} />
            </div>
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard title="Sales & Revenue Trend">
                <Line data={stats.chartData} options={chartOptions} />
              </ChartCard>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-lg font-medium mb-4">Recent Sales</h3>
                <div className="space-y-4">
                  {stats.recentSales.map((sale: any) => (
                    <SaleCard key={sale.id} sale={sale} />
                  ))}
                </div>
              </div>
            </div>
          </>
        );

      case 'taxi':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <StatCard title="Active Drivers" value={stats.stats.activeDrivers} />
              <StatCard title="Total Rides" value={stats.stats.totalRides} />
              <StatCard title="Total Revenue" value={`₹${stats.stats.totalRevenue}`} />
              <StatCard title="Daily Revenue" value={`₹${stats.stats.dailyRevenue}`} />
              <StatCard title="Average Rating" value={stats.stats.averageRating} />
              <StatCard title="Completion Rate" value={`${stats.stats.completionRate}%`} />
            </div>
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard title="Rides & Revenue Trend">
                <Line data={stats.chartData} options={chartOptions} />
              </ChartCard>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-lg font-medium mb-4">Recent Rides</h3>
                <div className="space-y-4">
                  {stats.recentRides.map((ride: any) => (
                    <RideCard key={ride.id} ride={ride} />
                  ))}
                </div>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {userData.name} Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Welcome back! Here's your business overview.
          </p>
        </div>
        <button
          onClick={() => {
            localStorage.clear();
            router.push('/login');
          }}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Sign Out
        </button>
      </div>

      {renderStats()}
    </div>
  );
}

// Utility Components
const StatCard = ({ title, value }: { title: string; value: string | number }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
    <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
  </div>
);

const ChartCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
    <h3 className="text-lg font-medium mb-4">{title}</h3>
    {children}
  </div>
);

const OrderCard = ({ order }: { order: any }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
    <div>
      <p className="font-medium">{order.customer}</p>
      <p className="text-sm text-gray-500">{order.items} items</p>
    </div>
    <div className="text-right">
      <p className="font-medium">₹{order.total}</p>
      <p className={`text-sm ${
        order.status === 'Delivered' ? 'text-green-500' :
        order.status === 'Preparing' ? 'text-yellow-500' : 'text-blue-500'
      }`}>{order.status}</p>
    </div>
  </div>
);

const TransactionCard = ({ transaction }: { transaction: any }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
    <div>
      <p className="font-medium">{transaction.vehicle}</p>
      <p className="text-sm text-gray-500">{transaction.type}</p>
    </div>
    <div className="text-right">
      <p className="font-medium">₹{transaction.amount}</p>
      <p className={`text-sm ${
        transaction.status === 'Completed' ? 'text-green-500' : 'text-red-500'
      }`}>{transaction.status}</p>
    </div>
  </div>
);

const SaleCard = ({ sale }: { sale: any }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
    <div>
      <p className="font-medium">{sale.product}</p>
      <p className="text-sm text-gray-500">Qty: {sale.quantity}</p>
    </div>
    <div className="text-right">
      <p className="font-medium">₹{sale.total}</p>
      <p className={`text-sm ${
        sale.status === 'Completed' ? 'text-green-500' :
        sale.status === 'Processing' ? 'text-yellow-500' : 'text-blue-500'
      }`}>{sale.status}</p>
    </div>
  </div>
);

const RideCard = ({ ride }: { ride: any }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
    <div>
      <p className="font-medium">{ride.passenger}</p>
      <p className="text-sm text-gray-500">{ride.distance}</p>
    </div>
    <div className="text-right">
      <p className="font-medium">₹{ride.fare}</p>
      <p className={`text-sm ${
        ride.status === 'Completed' ? 'text-green-500' :
        ride.status === 'In Progress' ? 'text-yellow-500' : 'text-blue-500'
      }`}>{ride.status}</p>
    </div>
  </div>
);

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
}; 