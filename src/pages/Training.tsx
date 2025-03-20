import React from 'react';
import { Play, FileText, HelpCircle, Plus, CheckCircle, Clock } from 'lucide-react';

const trainingModules = [
  {
    id: 1,
    title: 'Introduction to Agronomy',
    type: 'video',
    duration: '50 mins',
    progress: 100,
    status: 'completed',
    icon: Play
  },
  {
    id: 2,
    title: 'Farm Management Basics',
    type: 'document',
    duration: '1.5 hours',
    progress: 60,
    status: 'in-progress',
    icon: FileText
  },
  {
    id: 3,
    title: 'Agent-Farmer Communication Strategies',
    type: 'quiz',
    duration: '45 mins',
    progress: 0,
    status: 'not-started',
    icon: HelpCircle
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'in-progress':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'in-progress':
      return <Clock className="w-5 h-5 text-blue-500" />;
    default:
      return null;
  }
};

const Training = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Agronomic Training</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-5 h-5 mr-2" />
          New Training
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainingModules.map((module) => (
          <div key={module.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-2 rounded-lg ${
                module.type === 'video' ? 'bg-blue-100' :
                module.type === 'document' ? 'bg-purple-100' : 'bg-orange-100'
              }`}>
                <module.icon className={`w-5 h-5 ${
                  module.type === 'video' ? 'text-blue-600' :
                  module.type === 'document' ? 'text-purple-600' : 'text-orange-600'
                }`} />
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(module.status)}`}>
                {module.status}
              </span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">{module.title}</h3>
            <p className="text-sm text-gray-500 mb-4">Duration: {module.duration}</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Progress</span>
                <span className="font-medium text-gray-900">{module.progress}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${module.progress}%` }}
                ></div>
              </div>
            </div>
            <button className="mt-4 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium">
              {module.status === 'completed' ? 'Review' : 'Continue'}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Certificates</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
            <div className="flex items-center space-x-4">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">Agricultural Best Practices Certification</h3>
                <p className="text-sm text-gray-500">Completed on March 15, 2024</p>
              </div>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Training;
