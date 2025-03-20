'use client';

import { useState, useEffect } from 'react';

// Mock location data
const mockLocations = [
  {
    id: 1,
    name: 'Downtown Branch',
    type: 'Restaurant',
    address: '123 Main St, Downtown',
    status: 'Active',
    capacity: 100,
    currentOccupancy: 65,
    lastUpdated: '2024-02-20 14:30',
  },
  {
    id: 2,
    name: 'Highway Toll Plaza',
    type: 'Toll',
    address: 'Highway 101, Mile 45',
    status: 'Active',
    capacity: 500,
    currentOccupancy: 230,
    lastUpdated: '2024-02-20 14:35',
  },
  {
    id: 3,
    name: 'City Mall Branch',
    type: 'Business',
    address: '789 Shopping Ave, City Mall',
    status: 'Maintenance',
    capacity: 200,
    currentOccupancy: 0,
    lastUpdated: '2024-02-20 14:20',
  },
  {
    id: 4,
    name: 'Airport Terminal',
    type: 'Taxi Stand',
    address: 'International Airport, Terminal 3',
    status: 'Active',
    capacity: 50,
    currentOccupancy: 28,
    lastUpdated: '2024-02-20 14:40',
  },
];

export default function LocationServices() {
  const [locations, setLocations] = useState(mockLocations);
  const [userType, setUserType] = useState<string>('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLocation, setNewLocation] = useState({
    name: '',
    type: '',
    address: '',
    capacity: '',
  });

  useEffect(() => {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      const user = JSON.parse(userJson);
      setUserType(user.type);
      // Filter locations based on user type
      setLocations(mockLocations.filter(loc => 
        user.type === 'toll' ? true : loc.type.toLowerCase() === user.type
      ));
    }
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = mockLocations.filter(location =>
      location.name.toLowerCase().includes(term.toLowerCase()) ||
      location.address.toLowerCase().includes(term.toLowerCase())
    );
    setLocations(filtered);
  };

  const handleFilterChange = (status: string) => {
    setFilter(status);
    if (status === 'all') {
      setLocations(mockLocations);
    } else {
      setLocations(mockLocations.filter(loc => loc.status.toLowerCase() === status.toLowerCase()));
    }
  };

  const handleAddLocation = () => {
    // Mock adding a new location
    const newLoc = {
      id: locations.length + 1,
      ...newLocation,
      status: 'Active',
      currentOccupancy: 0,
      lastUpdated: new Date().toISOString().slice(0, 16).replace('T', ' '),
      capacity: parseInt(newLocation.capacity),
    };
    setLocations([...locations, newLoc]);
    setShowAddModal(false);
    setNewLocation({ name: '', type: '', address: '', capacity: '' });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Location Services
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Add Location
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex justify-between items-center space-x-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search locations..."
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
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
            onClick={() => handleFilterChange('active')}
            className={`px-3 py-1 rounded ${
              filter === 'active' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => handleFilterChange('maintenance')}
            className={`px-3 py-1 rounded ${
              filter === 'maintenance' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700'
            }`}
          >
            Maintenance
          </button>
        </div>
      </div>

      {/* Locations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location) => (
          <div key={location.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{location.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{location.address}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                location.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {location.status}
              </span>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Type:</span>
                <span className="text-gray-900 dark:text-white">{location.type}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Capacity:</span>
                <span className="text-gray-900 dark:text-white">{location.capacity}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Current Occupancy:</span>
                <span className="text-gray-900 dark:text-white">{location.currentOccupancy}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Last Updated:</span>
                <span className="text-gray-900 dark:text-white">{location.lastUpdated}</span>
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                Edit
              </button>
              <button className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Location Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Location</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600"
                  value={newLocation.name}
                  onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Type
                </label>
                <select
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600"
                  value={newLocation.type}
                  onChange={(e) => setNewLocation({ ...newLocation, type: e.target.value })}
                >
                  <option value="">Select Type</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Toll">Toll</option>
                  <option value="Business">Business</option>
                  <option value="Taxi Stand">Taxi Stand</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600"
                  value={newLocation.address}
                  onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Capacity
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600"
                  value={newLocation.capacity}
                  onChange={(e) => setNewLocation({ ...newLocation, capacity: e.target.value })}
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
                onClick={handleAddLocation}
                className="px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Add Location
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}