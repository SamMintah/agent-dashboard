import React from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

const tasks = [
  {
    title: 'Review Q1 Performance Reports',
    dueDate: 'Today',
    status: 'urgent',
    assignee: 'Sarah Chen'
  },
  {
    title: 'Update Training Materials',
    dueDate: 'Tomorrow',
    status: 'in-progress',
    assignee: 'Mike Johnson'
  },
  {
    title: 'Agent Onboarding Session',
    dueDate: 'Next Week',
    status: 'completed',
    assignee: 'Alex Smith'
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

const TasksList = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Tasks</h2>
        <button className="text-sm text-blue-600 hover:text-blue-700">View all</button>
      </div>

      <div className="space-y-4">
        {tasks.map((task, index) => (
          <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
            <div className="flex items-center space-x-4">
              {getStatusIcon(task.status)}
              <div>
                <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
                <p className="text-sm text-gray-500">Assigned to {task.assignee}</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">{task.dueDate}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksList;