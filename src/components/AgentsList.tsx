import React from 'react';
import { MoreVertical } from 'lucide-react';

const agents = [
  {
    name: 'Sarah Chen',
    role: 'Senior Agent',
    region: 'East Coast',
    performance: 98,
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Michael Johnson',
    role: 'Field Agent',
    region: 'West Coast',
    performance: 85,
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Junior Agent',
    region: 'Midwest',
    performance: 92,
    status: 'training',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

const AgentsList = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Top Performing Agents</h2>
        <button className="text-sm text-blue-600 hover:text-blue-700">View all</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
              <th className="pb-4 font-medium">Agent</th>
              <th className="pb-4 font-medium">Role</th>
              <th className="pb-4 font-medium">Region</th>
              <th className="pb-4 font-medium">Performance</th>
              <th className="pb-4 font-medium">Status</th>
              <th className="pb-4 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent, index) => (
              <tr key={index} className="border-b border-gray-100 last:border-0">
                <td className="py-4">
                  <div className="flex items-center">
                    <img src={agent.avatar} alt={agent.name} className="w-8 h-8 rounded-full mr-3" />
                    <span className="font-medium text-gray-900">{agent.name}</span>
                  </div>
                </td>
                <td className="py-4 text-gray-500">{agent.role}</td>
                <td className="py-4 text-gray-500">{agent.region}</td>
                <td className="py-4">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900">{agent.performance}%</span>
                    <div className="w-24 h-1.5 bg-gray-200 rounded-full ml-3">
                      <div 
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${agent.performance}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    agent.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {agent.status}
                  </span>
                </td>
                <td className="py-4">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentsList;