import React, { useState } from 'react';
import { Plus, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const tasks = [
  {
    id: 1,
    title: 'Review Q1 Performance Reports',
    description: 'Complete quarterly performance review for East Coast agents',
    assignedTo: 'Sarah Chen',
    dueDate: '2024-03-20',
    status: 'urgent',
    priority: 'High'
  },
  {
    id: 2,
    title: 'Update Training Materials',
    description: 'Revise onboarding documentation with new compliance requirements',
    assignedTo: 'Michael Johnson',
    dueDate: '2024-03-25',
    status: 'in-progress',
    priority: 'Medium'
  },
  {
    id: 3,
    title: 'Agent Onboarding Session',
    description: 'Conduct virtual onboarding for new agents',
    assignedTo: 'Emily Rodriguez',
    dueDate: '2024-03-22',
    status: 'completed',
    priority: 'High'
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'in-progress':
      return <Clock className="w-5 h-5 text-blue-500" />;
    case 'urgent':
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    default:
      return null;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'in-progress':
      return 'bg-blue-100 text-blue-800';
    case 'urgent':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const Tasks = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-5 h-5 mr-2" />
          Create Task
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="urgent">Urgent</option>
          </select>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-start justify-between p-4 border border-gray-100 rounded-lg">
              <div className="flex items-start space-x-4">
                {getStatusIcon(task.status)}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                  <div className="flex items-center mt-2 space-x-4">
                    <span className="text-xs text-gray-500">Assigned to: {task.assignedTo}</span>
                    <span className="text-xs text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Edit
                </button>
                <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;