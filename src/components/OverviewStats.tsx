import React from 'react';
import { Users, DollarSign, CheckSquare, TrendingUp } from 'lucide-react';

const stats = [
  {
    label: 'Total Agents',
    value: '2,345',
    change: '+12%',
    icon: Users,
    color: 'blue'
  },
  {
    label: 'Monthly Revenue',
    value: '$234,567',
    change: '+23%',
    icon: DollarSign,
    color: 'green'
  },
  {
    label: 'Active Tasks',
    value: '189',
    change: '-5%',
    icon: CheckSquare,
    color: 'purple'
  },
  {
    label: 'Performance',
    value: '94%',
    change: '+2%',
    icon: TrendingUp,
    color: 'orange'
  }
];

const OverviewStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
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
        </div>
      ))}
    </div>
  );
};

export default OverviewStats;