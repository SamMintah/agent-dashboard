import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Trophy, TrendingUp, Target } from 'lucide-react';

const performanceData = [
  { month: 'Jan', revenue: 65000, tasks: 45 },
  { month: 'Feb', revenue: 59000, tasks: 38 },
  { month: 'Mar', revenue: 80000, tasks: 52 },
  { month: 'Apr', revenue: 81000, tasks: 57 },
  { month: 'May', revenue: 56000, tasks: 41 },
  { month: 'Jun', revenue: 55000, tasks: 36 },
];

const topAgents = [
  {
    name: 'Sarah Chen',
    revenue: 125430,
    tasks: 45,
    rating: 4.9,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Michael Johnson',
    revenue: 98750,
    tasks: 38,
    rating: 4.7,
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Emily Rodriguez',
    revenue: 78300,
    tasks: 42,
    rating: 4.8,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

const Performance = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Performance Analytics</h1>
        <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Last 6 months</option>
          <option>Last 12 months</option>
          <option>Year to date</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-green-100">
              <Trophy className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+23%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">$234,567</h3>
          <p className="text-sm text-gray-500">Total Revenue</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-blue-100">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-600">+15%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">456</h3>
          <p className="text-sm text-gray-500">Completed Tasks</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-purple-100">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-purple-600">+8%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">94%</h3>
          <p className="text-sm text-gray-500">Goal Achievement</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Revenue Trends</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Agents</h2>
          <div className="space-y-6">
            {topAgents.map((agent, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img src={agent.avatar} alt={agent.name} className="w-10 h-10 rounded-full" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{agent.name}</h3>
                    <p className="text-sm text-gray-500">${agent.revenue.toLocaleString()} revenue</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{agent.tasks} tasks</div>
                  <div className="text-sm text-gray-500">{agent.rating} rating</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;