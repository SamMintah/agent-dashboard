import React from 'react';
import { FileText, UserPlus, DollarSign } from 'lucide-react';

const activities = [
  {
    icon: FileText,
    title: 'New Report Submitted',
    description: 'Sarah Chen submitted Q1 performance report',
    time: '2 hours ago',
    color: 'blue'
  },
  {
    icon: UserPlus,
    title: 'New Agent Onboarded',
    description: 'Alex Thompson completed onboarding',
    time: '4 hours ago',
    color: 'green'
  },
  {
    icon: DollarSign,
    title: 'Commission Paid',
    description: 'Monthly commissions processed for 125 agents',
    time: '6 hours ago',
    color: 'purple'
  }
];

const RecentActivities = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
        <button className="text-sm text-blue-600 hover:text-blue-700">View all</button>
      </div>

      <div className="space-y-6">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className={`p-2 rounded-lg bg-${activity.color}-100`}>
              <activity.icon className={`w-5 h-5 text-${activity.color}-600`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
              <p className="text-sm text-gray-500">{activity.description}</p>
              <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;