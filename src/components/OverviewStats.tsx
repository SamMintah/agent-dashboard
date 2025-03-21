import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, DollarSign, FileText, Trophy, Package, Clock } from 'lucide-react';

const stats = [
  {
    label: 'Total Sales',
    value: '234,567',
    change: '+12%',
    icon: Trophy,
    color: 'blue',
    path: '/sales',
    lastUpdate: '2024-03-20 14:30'
  },
  {
    label: 'Active Agents',
    value: '2,345',
    change: '+23%',
    icon: Users,
    color: 'green',
    path: '/agents',
    lastUpdate: '2024-03-20 14:30'
  },
  {
    label: 'Unread Reports',
    value: '28',
    change: '+5',
    icon: FileText,
    color: 'purple',
    path: '/reports',
    lastUpdate: '2024-03-20 14:30'
  },
  {
    label: 'Input Overview',
    value: '1,234',
    change: '+8%',
    icon: Package,
    color: 'orange',
    path: '/inputs',
    lastUpdate: '2024-03-20 14:30'
  }
];

const OverviewStats = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate(stat.path)}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
              <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
            </div>
            <span className={`text-sm font-medium ${
              stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {stat.value}
          </h3>
          <p className="text-sm text-gray-500">{stat.label}</p>
          <div className="mt-3 flex items-center text-xs text-gray-400">
            <Clock className="w-4 h-4 mr-1" />
            <span>Last updated: {new Date(stat.lastUpdate).toLocaleString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverviewStats;