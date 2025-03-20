'use client';

import { useState, useEffect } from 'react';

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john@example.com',
    role: 'Admin',
    type: 'Restaurant',
    status: 'Active',
    lastLogin: '2024-02-20 14:30',
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'jane@example.com',
    role: 'Manager',
    type: 'Toll',
    status: 'Active',
    lastLogin: '2024-02-20 13:45',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'Staff',
    type: 'Business',
    status: 'Inactive',
    lastLogin: '2024-02-19 16:20',
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    role: 'Manager',
    type: 'Taxi',
    status: 'Active',
    lastLogin: '2024-02-20 11:15',
  },
];

const roles = ['Admin', 'Manager', 'Staff'];
const types = ['Restaurant', 'Toll', 'Business', 'Taxi'];

export default function UserManagement() {
  const [users, setUsers] = useState(mockUsers);
  const [userType, setUserType] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    type: '',
  });

  useEffect(() => {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      const user = JSON.parse(userJson);
      setUserType(user.type);
      // Filter users based on user type
      setUsers(mockUsers.filter(u => 
        user.type === 'toll' ? true : u.type.toLowerCase() === user.type
      ));
    }
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = mockUsers.filter(user =>
      user.name.toLowerCase().includes(term.toLowerCase()) ||
      user.email.toLowerCase().includes(term.toLowerCase())
    );
    setUsers(filtered);
  };

  const handleFilterChange = (status: string) => {
    setFilter(status);
    if (status === 'all') {
      setUsers(mockUsers);
    } else {
      setUsers(mockUsers.filter(user => user.status.toLowerCase() === status.toLowerCase()));
    }
  };

  const handleAddUser = () => {
    const user = {
      id: users.length + 1,
      ...newUser,
      status: 'Active',
      lastLogin: 'Never',
    };
    setUsers([...users, user]);
    setShowAddModal(false);
    setNewUser({ name: '', email: '', role: '', type: '' });
  };

  const handleEditUser = () => {
    if (!selectedUser) return;
    
    setUsers(users.map(user => 
      user.id === selectedUser.id ? selectedUser : user
    ));
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleToggleStatus = (userId: number) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          status: user.status === 'Active' ? 'Inactive' : 'Active',
        };
      }
      return user;
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          User Management
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Add User
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex justify-between items-center space-x-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search users..."
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
            onClick={() => handleFilterChange('inactive')}
            className={`px-3 py-1 rounded ${
              filter === 'inactive' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700'
            }`}
          >
            Inactive
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Last Login
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">{user.role}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">{user.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-400">{user.lastLogin}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setShowEditModal(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900 dark:hover:text-indigo-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleToggleStatus(user.id)}
                    className={`${
                      user.status === 'Active'
                        ? 'text-red-600 hover:text-red-900'
                        : 'text-green-600 hover:text-green-900'
                    }`}
                  >
                    {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New User</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Role
                </label>
                <select
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600"
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                >
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Type
                </label>
                <select
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600"
                  value={newUser.type}
                  onChange={(e) => setNewUser({ ...newUser, type: e.target.value })}
                >
                  <option value="">Select Type</option>
                  {types.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
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
                onClick={handleAddUser}
                className="px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit User</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600"
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Role
                </label>
                <select
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600"
                  value={selectedUser.role}
                  onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Type
                </label>
                <select
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600"
                  value={selectedUser.type}
                  onChange={(e) => setSelectedUser({ ...selectedUser, type: e.target.value })}
                >
                  {types.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedUser(null);
                }}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleEditUser}
                className="px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
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