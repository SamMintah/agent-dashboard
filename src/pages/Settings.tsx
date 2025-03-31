import React, { useState } from 'react';
import { Bell, Lock, User, Globe, Moon, Users, UserPlus, Shield, Edit, Trash } from 'lucide-react';
import Pagination from '../components/Pagination';

// Sample admin data
const admins = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@example.com',
    role: 'Super Admin',
    status: 'Active',
    lastLogin: '2025-03-28T10:30:00',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 2,
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2025-03-29T14:45:00',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 3,
    name: 'Michael Johnson',
    email: 'michael.j@example.com',
    role: 'Editor',
    status: 'Inactive',
    lastLogin: '2025-03-15T09:20:00',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 4,
    name: 'Emma Wilson',
    email: 'emma.w@example.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2025-03-30T11:10:00',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 5,
    name: 'David Lee',
    email: 'david.lee@example.com',
    role: 'Editor',
    status: 'Active',
    lastLogin: '2025-03-27T16:35:00',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

const Settings = () => {
  // Tab state
  const [activeMainTab, setActiveMainTab] = useState('account');
  
  // Admin management state
  const [activeAdminTab, setActiveAdminTab] = useState('create');
  const [currentPage, setCurrentPage] = useState(1);
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Editor'
  });
  
  const itemsPerPage = 3;
  const indexOfLastAdmin = currentPage * itemsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - itemsPerPage;
  const currentAdmins = admins.slice(indexOfFirstAdmin, indexOfLastAdmin);
  
  const handleAdminTabChange = (tab: string) => {
    setActiveAdminTab(tab);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewAdmin(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    console.log('New admin data:', newAdmin);
    // Reset form after submission
    setNewAdmin({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'Editor'
    });
    alert('Admin created successfully!');
  };
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        {/* Main Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveMainTab('account')}
            className={`px-6 py-3 text-sm font-medium ${
              activeMainTab === 'account'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Account Settings
          </button>
          <button
            onClick={() => setActiveMainTab('admin')}
            className={`px-6 py-3 text-sm font-medium ${
              activeMainTab === 'admin'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Admin Management
          </button>
        </div>
        
        <div className="space-y-6">
          {activeMainTab === 'account' && (
            <>
            <div className="pb-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="john@example.com"
                />
              </div>
            </div>
          </div>

          <div className="pb-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Push Notifications</p>
                    <p className="text-sm text-gray-500">Receive notifications about updates</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive email about your activity</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="pb-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Security</h2>
            <div className="space-y-4">
              <button className="flex items-center space-x-3 text-sm font-medium text-blue-600 hover:text-blue-700">
                <Lock className="w-5 h-5" />
                <span>Change Password</span>
              </button>
              <button className="flex items-center space-x-3 text-sm font-medium text-blue-600 hover:text-blue-700">
                <User className="w-5 h-5" />
                <span>Two-Factor Authentication</span>
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Appearance</h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Moon className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Dark Mode</p>
                  <p className="text-sm text-gray-500">Switch between light and dark mode</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Save Changes
            </button>
          </div>
            </>
          )}

          {activeMainTab === 'admin' && (
            <div>
            
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                onClick={() => handleAdminTabChange('create')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeAdminTab === 'create'
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <UserPlus className="w-5 h-5 mr-2" />
                  Create Admin
                </div>
              </button>
              <button
                onClick={() => handleAdminTabChange('list')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeAdminTab === 'list'
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  All Admins
                </div>
              </button>
            </div>
            
            {/* Tab Content */}
            {activeAdminTab === 'create' && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newAdmin.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={newAdmin.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={newAdmin.password}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={newAdmin.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <select
                      name="role"
                      value={newAdmin.role}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Super Admin">Super Admin</option>
                      <option value="Admin">Admin</option>
                      <option value="Editor">Editor</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Create Admin
                  </button>
                </div>
              </form>
            )}
            
            {activeAdminTab === 'list' && (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
                        <th className="pb-4 font-medium">Admin</th>
                        <th className="pb-4 font-medium">Role</th>
                        <th className="pb-4 font-medium">Status</th>
                        <th className="pb-4 font-medium">Last Login</th>
                        <th className="pb-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentAdmins.map((admin) => (
                        <tr key={admin.id} className="border-b border-gray-100 last:border-0">
                          <td className="py-4">
                            <div className="flex items-center">
                              <img 
                                src={admin.avatar} 
                                alt={admin.name} 
                                className="w-8 h-8 rounded-full mr-3" 
                              />
                              <div>
                                <div className="font-medium text-gray-900">{admin.name}</div>
                                <div className="text-sm text-gray-500">{admin.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center text-gray-700">
                              <Shield className="w-4 h-4 mr-1" />
                              <span>{admin.role}</span>
                            </div>
                          </td>
                          <td className="py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              admin.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {admin.status}
                            </span>
                          </td>
                          <td className="py-4 text-sm text-gray-500">
                            {new Date(admin.lastLogin).toLocaleString()}
                          </td>
                          <td className="py-4">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-800">
                                <Edit className="w-5 h-5" />
                              </button>
                              <button className="text-red-600 hover:text-red-800">
                                <Trash className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(admins.length / itemsPerPage)}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
