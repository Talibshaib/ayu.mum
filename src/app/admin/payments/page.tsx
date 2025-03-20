'use client';

import { useState } from 'react';

// Mock data for transactions
const mockTransactions = [
  { id: 'TRX-001', user: 'Alice Smith', amount: 54.99, location: 'Cafe Mocha', locationId: 'LOC-1234', status: 'completed', time: '10 min ago', lat: '19.0760° N', long: '72.8777° E' },
  { id: 'TRX-002', user: 'Bob Johnson', amount: 32.50, location: 'Pizza Place', locationId: 'LOC-2345', status: 'completed', time: '25 min ago', lat: '19.0760° N', long: '72.8777° E' },
  { id: 'TRX-003', user: 'Carol Williams', amount: 78.25, location: 'Book Store', locationId: 'LOC-3456', status: 'pending', time: '35 min ago', lat: '19.0760° N', long: '72.8777° E' },
  { id: 'TRX-004', user: 'David Brown', amount: 12.99, location: 'Coffee Shop', locationId: 'LOC-4567', status: 'completed', time: '45 min ago', lat: '19.0760° N', long: '72.8777° E' },
  { id: 'TRX-005', user: 'Eva Davis', amount: 128.75, location: 'Electronics Store', locationId: 'LOC-5678', status: 'failed', time: '1 hour ago', lat: '19.0760° N', long: '72.8777° E' },
  { id: 'TRX-006', user: 'Frank Miller', amount: 45.50, location: 'Restaurant XYZ', locationId: 'LOC-6789', status: 'completed', time: '1.5 hours ago', lat: '19.0760° N', long: '72.8777° E' },
  { id: 'TRX-007', user: 'Grace Wilson', amount: 22.99, location: 'Grocery Store', locationId: 'LOC-7890', status: 'completed', time: '2 hours ago', lat: '19.0760° N', long: '72.8777° E' },
  { id: 'TRX-008', user: 'Henry Taylor', amount: 89.95, location: 'Fashion Outlet', locationId: 'LOC-8901', status: 'pending', time: '3 hours ago', lat: '19.0760° N', long: '72.8777° E' },
];

// Mock location partners
const mockPartners = [
  { id: 'LOC-1234', name: 'Cafe Mocha', category: 'Food & Beverages', status: 'active', transactionCount: 234 },
  { id: 'LOC-2345', name: 'Pizza Place', category: 'Food & Beverages', status: 'active', transactionCount: 189 },
  { id: 'LOC-3456', name: 'Book Store', category: 'Retail', status: 'active', transactionCount: 112 },
  { id: 'LOC-4567', name: 'Coffee Shop', category: 'Food & Beverages', status: 'active', transactionCount: 321 },
  { id: 'LOC-5678', name: 'Electronics Store', category: 'Retail', status: 'active', transactionCount: 87 },
  { id: 'LOC-6789', name: 'Restaurant XYZ', category: 'Food & Beverages', status: 'inactive', transactionCount: 76 },
  { id: 'LOC-7890', name: 'Grocery Store', category: 'Retail', status: 'active', transactionCount: 198 },
  { id: 'LOC-8901', name: 'Fashion Outlet', category: 'Retail', status: 'active', transactionCount: 143 },
];

// Filter options
const statusOptions = ['All', 'Completed', 'Pending', 'Failed'];
const dateRangeOptions = ['Today', 'Yesterday', 'Last 7 days', 'Last 30 days', 'Custom'];

export default function PaymentsManagement() {
  const [activeTab, setActiveTab] = useState('transactions');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedDateRange, setSelectedDateRange] = useState('Last 7 days');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter transactions based on selected filters
  const filteredTransactions = mockTransactions.filter(transaction => {
    if (selectedStatus !== 'All' && transaction.status.toLowerCase() !== selectedStatus.toLowerCase()) {
      return false;
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        transaction.user.toLowerCase().includes(query) ||
        transaction.location.toLowerCase().includes(query) ||
        transaction.id.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Payment Management</h1>
        <div>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Export Data
          </button>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'transactions'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('transactions')}
          >
            Transactions
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'partners'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('partners')}
          >
            Location Partners
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'settings'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('settings')}
          >
            Payment Settings
          </button>
        </nav>
      </div>

      {activeTab === 'transactions' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                <select
                  id="status"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  {statusOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date Range</label>
                <select
                  id="dateRange"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={selectedDateRange}
                  onChange={(e) => setSelectedDateRange(e.target.value)}
                >
                  {dateRangeOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Search</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="search"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-md"
                    placeholder="Search by user, location, or transaction ID"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Transactions Table */}
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Transaction History</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Showing {filteredTransactions.length} transactions</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Transaction ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Location</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Time</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">GPS Coordinates</th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{transaction.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{transaction.user}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{transaction.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">₹{transaction.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${transaction.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                            transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 
                            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{transaction.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {transaction.lat}, {transaction.long}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300">Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                  Previous
                </button>
                <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">8</span> of{' '}
                    <span className="font-medium">24</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                      1
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 bg-indigo-50 dark:bg-indigo-900 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-800">
                      2
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                      3
                    </button>
                    <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'partners' && (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Location Partners</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Businesses integrated with QR-less payments</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Business Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Transactions</th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {mockPartners.map((partner) => (
                  <tr key={partner.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{partner.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{partner.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{partner.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${partner.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                          'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}
                      >
                        {partner.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{partner.transactionCount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 mr-3">Edit</button>
                      <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">Disable</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Payment Settings</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Configure QR-less payment options</p>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <h4 className="text-md font-medium text-gray-900 dark:text-white">Location Detection Radius</h4>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Set the radius for detecting a user's presence at a location.</p>
              <div className="mt-2 flex items-center space-x-4">
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  defaultValue="30"
                  className="w-1/2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">30 meters</span>
              </div>
            </div>
            
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-md font-medium text-gray-900 dark:text-white">Payment Gateway</h4>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Select the default payment gateway for QR-less transactions.</p>
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <input
                    id="gateway-1"
                    name="payment-gateway"
                    type="radio"
                    defaultChecked
                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <label htmlFor="gateway-1" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    RazorPay
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="gateway-2"
                    name="payment-gateway"
                    type="radio"
                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <label htmlFor="gateway-2" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    PayTM
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="gateway-3"
                    name="payment-gateway"
                    type="radio"
                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <label htmlFor="gateway-3" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Stripe
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-md font-medium text-gray-900 dark:text-white">Auto-detection Settings</h4>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Configure how the app detects and handles payment locations.</p>
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <input
                    id="auto-detect-1"
                    name="auto-detect"
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="auto-detect-1" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Auto-detect venues when user enters location
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="auto-detect-2"
                    name="auto-detect-2"
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="auto-detect-2" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Show notification when a payment venue is detected
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="auto-detect-3"
                    name="auto-detect-3"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="auto-detect-3" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Automatically open menu when user enters restaurant
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-md font-medium text-gray-900 dark:text-white">Transaction Limits</h4>
              <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="max-transaction" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Maximum Transaction Amount (₹)</label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="max-transaction"
                      id="max-transaction"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-md"
                      defaultValue="10000"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="daily-limit" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Daily Transaction Limit (₹)</label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="daily-limit"
                      id="daily-limit"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-md"
                      defaultValue="50000"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 flex justify-end">
              <button
                type="button"
                className="bg-white dark:bg-gray-700 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 