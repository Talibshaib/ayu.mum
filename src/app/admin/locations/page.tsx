'use client';

import { useState } from 'react';

// Mock location data
const mockLocations = [
  {
    id: 'LOC-001',
    name: 'City Mall',
    type: 'Shopping',
    address: '123 Main Street, City Center',
    coordinates: { lat: 28.6139, lng: 77.2090 },
    status: 'Active',
    services: ['Parking', 'Food Court', 'Shopping'],
    operatingHours: '10:00 AM - 10:00 PM',
    capacity: 1000,
    currentOccupancy: 450,
  },
  {
    id: 'LOC-002',
    name: 'Central Station',
    type: 'Transport',
    address: '456 Railway Road, Transit Hub',
    coordinates: { lat: 28.6288, lng: 77.2089 },
    status: 'Active',
    services: ['Parking', 'Food Stalls', 'Ticket Counter'],
    operatingHours: '24/7',
    capacity: 5000,
    currentOccupancy: 2300,
  },
  {
    id: 'LOC-003',
    name: 'Tech Park',
    type: 'Business',
    address: '789 Tech Avenue, Business District',
    coordinates: { lat: 28.6129, lng: 77.2295 },
    status: 'Active',
    services: ['Parking', 'Cafeteria', 'Conference Rooms'],
    operatingHours: '8:00 AM - 8:00 PM',
    capacity: 3000,
    currentOccupancy: 1800,
  },
];

const locationTypes = ['All', 'Shopping', 'Transport', 'Business', 'Restaurant', 'Entertainment'];
const statusOptions = ['All', 'Active', 'Inactive', 'Maintenance'];

interface Location {
  id: string;
  name: string;
  type: string;
  address: string;
  coordinates: { lat: number; lng: number };
  status: string;
  services: string[];
  operatingHours: string;
  capacity: number;
  currentOccupancy: number;
}

export default function LocationManagement() {
  const [locations, setLocations] = useState<Location[]>(mockLocations);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddLocation, setShowAddLocation] = useState(false);
  const [showEditLocation, setShowEditLocation] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Filter locations based on selected filters
  const filteredLocations = locations.filter(location => {
    if (selectedType !== 'All' && location.type !== selectedType) return false;
    if (selectedStatus !== 'All' && location.status !== selectedStatus) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        location.name.toLowerCase().includes(query) ||
        location.address.toLowerCase().includes(query) ||
        location.type.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const showNotification = (message: string, type: string) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const handleAddLocation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newLocation: Location = {
        id: `LOC-${String(locations.length + 1).padStart(3, '0')}`,
        name: 'New Location',
        type: 'Shopping',
        address: '',
        coordinates: { lat: 0, lng: 0 },
        status: 'Active',
        services: [],
        operatingHours: '9:00 AM - 9:00 PM',
        capacity: 1000,
        currentOccupancy: 0,
      };
      
      setLocations([...locations, newLocation]);
      showNotification('Location added successfully!', 'success');
      setShowAddLocation(false);
    } catch (error) {
      showNotification('Failed to add location', 'error');
    }
  };

  const handleUpdateLocation = async (location: Location) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedLocations = locations.map(loc => 
        loc.id === location.id ? location : loc
      );
      setLocations(updatedLocations);
      showNotification('Location updated successfully!', 'success');
      setShowEditLocation(false);
    } catch (error) {
      showNotification('Failed to update location', 'error');
    }
  };

  const handleDeleteLocation = async (locationId: string) => {
    if (!window.confirm('Are you sure you want to delete this location?')) return;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedLocations = locations.filter(loc => loc.id !== locationId);
      setLocations(updatedLocations);
      showNotification('Location deleted successfully!', 'success');
    } catch (error) {
      showNotification('Failed to delete location', 'error');
    }
  };

  const handleToggleStatus = async (locationId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedLocations = locations.map(location => {
        if (location.id === locationId) {
          return {
            ...location,
            status: location.status === 'Active' ? 'Inactive' : 'Active'
          };
        }
        return location;
      });
      setLocations(updatedLocations);
      showNotification('Location status updated successfully!', 'success');
    } catch (error) {
      showNotification('Failed to update location status', 'error');
    }
  };

  const handleUpdateServices = async (locationId: string, services: string[]) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedLocations = locations.map(location => {
        if (location.id === locationId) {
          return {
            ...location,
            services
          };
        }
        return location;
      });
      setLocations(updatedLocations);
      showNotification('Services updated successfully!', 'success');
      setShowServiceModal(false);
    } catch (error) {
      showNotification('Failed to update services', 'error');
    }
  };

  const handleUpdateOccupancy = async (locationId: string, newOccupancy: number) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedLocations = locations.map(location => {
        if (location.id === locationId) {
          return {
            ...location,
            currentOccupancy: Math.min(Math.max(0, newOccupancy), location.capacity)
          };
        }
        return location;
      });
      setLocations(updatedLocations);
      showNotification('Occupancy updated successfully!', 'success');
    } catch (error) {
      showNotification('Failed to update occupancy', 'error');
    }
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
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Location Management</h1>
        <button
          onClick={() => setShowAddLocation(true)}
          className="btn-primary"
        >
          Add New Location
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location Type</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {locationTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Search</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800"
              placeholder="Search locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Locations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLocations.map(location => (
          <div key={location.id} className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{location.name}</h3>
                <button
                  onClick={() => handleToggleStatus(location.id)}
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    location.status === 'Active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}
                >
                  {location.status}
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{location.address}</p>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Type:</span>
                  <span className="text-gray-900 dark:text-white">{location.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Operating Hours:</span>
                  <span className="text-gray-900 dark:text-white">{location.operatingHours}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Occupancy:</span>
                  <span className="text-gray-900 dark:text-white">
                    {location.currentOccupancy} / {location.capacity}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">Services:</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {location.services.map(service => (
                    <span
                      key={service}
                      className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 text-xs"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setSelectedLocation(location);
                    setShowEditLocation(true);
                  }}
                  className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteLocation(location.id)}
                  className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Location Modal */}
      {(showAddLocation || showEditLocation) && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full p-6">
            <h2 className="text-xl font-semibold mb-4">
              {showAddLocation ? 'Add New Location' : 'Edit Location'}
            </h2>
            {/* Add your form fields here */}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowAddLocation(false);
                  setShowEditLocation(false);
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (showAddLocation) {
                    handleAddLocation(new Event('submit') as any);
                  } else if (selectedLocation) {
                    handleUpdateLocation(selectedLocation);
                  }
                }}
                className="btn-primary"
              >
                {showAddLocation ? 'Add Location' : 'Update Location'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}