import React, { useState } from 'react';
import { Play, FileText, HelpCircle, Plus, CheckCircle, Clock, Users, BookOpen, AlertTriangle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TrainingStats {
  total: number;
  completed: number;
  pending: number;
  failed: number;
  lastUpdate: string;
}

interface TrainingMaterial {
  id: number;
  title: string;
  type: 'video' | 'document' | 'quiz';
  duration: string;
  progress: number;
  status: 'completed' | 'in-progress' | 'not-started' | 'failed';
  icon: any;
  category: string;
  completionRate: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  startedCount: number;
  completedCount: number;
}

const stats: TrainingStats = {
  total: 45,
  completed: 32,
  pending: 8,
  failed: 5,
  lastUpdate: '2024-03-20 14:30'
};

const trainingMaterials: TrainingMaterial[] = [
  {
    id: 1,
    title: 'Introduction to Agronomy',
    type: 'video',
    duration: '50 mins',
    progress: 100,
    status: 'completed',
    icon: Play,
    category: 'General Knowledge',
    completionRate: 85,
    difficulty: 'Easy',
    startedCount: 150,
    completedCount: 128
  },
  {
    id: 2,
    title: 'Farm Management Basics',
    type: 'document',
    duration: '1.5 hours',
    progress: 60,
    status: 'in-progress',
    icon: FileText,
    category: 'Project Based',
    completionRate: 65,
    difficulty: 'Medium',
    startedCount: 120,
    completedCount: 78
  },
  {
    id: 3,
    title: 'Agent-Farmer Communication Strategies',
    type: 'quiz',
    duration: '45 mins',
    progress: 0,
    status: 'failed',
    icon: HelpCircle,
    category: 'General Knowledge',
    completionRate: 45,
    difficulty: 'Hard',
    startedCount: 90,
    completedCount: 40
  }
];

const categories = ['All Categories', 'General Knowledge', 'Project Based', 'Technical Skills'];
const difficulties = ['All Difficulties', 'Easy', 'Medium', 'Hard'];
const statuses = ['All Status', 'Completed', 'In Progress', 'Not Started', 'Failed'];

const Training = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Difficulties');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Training</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-5 h-5 mr-2" />
          New Training
        </button>
      </div>

      {/* Training Overview Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate('/training/materials')}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-blue-100">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-600">View All</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.total}</h3>
          <p className="text-sm text-gray-500">Total Training Materials</p>
          <div className="mt-3 flex items-center text-xs text-gray-400">
            <Clock className="w-4 h-4 mr-1" />
            <span>Last updated: {new Date(stats.lastUpdate).toLocaleString()}</span>
          </div>
        </div>

        <div
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate('/training/completed')}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-green-100">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+8</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.completed}</h3>
          <p className="text-sm text-gray-500">Completed Trainings</p>
          <div className="mt-3 flex items-center text-xs text-gray-400">
            <Clock className="w-4 h-4 mr-1" />
            <span>Last updated: {new Date(stats.lastUpdate).toLocaleString()}</span>
          </div>
        </div>

        <div
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate('/training/pending')}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-yellow-100">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-sm font-medium text-yellow-600">+3</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.pending}</h3>
          <p className="text-sm text-gray-500">Pending Trainings</p>
          <div className="mt-3 flex items-center text-xs text-gray-400">
            <Clock className="w-4 h-4 mr-1" />
            <span>Last updated: {new Date(stats.lastUpdate).toLocaleString()}</span>
          </div>
        </div>

        <div
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate('/training/failed')}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-red-100">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-sm font-medium text-red-600">-2</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.failed}</h3>
          <p className="text-sm text-gray-500">Failed Trainings</p>
          <div className="mt-3 flex items-center text-xs text-gray-400">
            <Clock className="w-4 h-4 mr-1" />
            <span>Last updated: {new Date(stats.lastUpdate).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search training materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>{difficulty}</option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {/* Training Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainingMaterials.map((material) => (
            <div key={material.id} className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg ${
                    material.type === 'video' ? 'bg-blue-100' :
                    material.type === 'document' ? 'bg-purple-100' : 'bg-orange-100'
                  }`}>
                    <material.icon className={`w-5 h-5 ${
                      material.type === 'video' ? 'text-blue-600' :
                      material.type === 'document' ? 'text-purple-600' : 'text-orange-600'
                    }`} />
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    material.status === 'completed' ? 'bg-green-100 text-green-800' :
                    material.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    material.status === 'failed' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {material.status}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{material.title}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-medium text-gray-900">{material.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Category:</span>
                    <span className="font-medium text-gray-900">{material.category}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Difficulty:</span>
                    <span className="font-medium text-gray-900">{material.difficulty}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Completion Rate</span>
                    <span className="font-medium text-gray-900">{material.completionRate}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${material.completionRate}%` }}
                    ></div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Started: {material.startedCount}</span>
                    <span>Completed: {material.completedCount}</span>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-xl">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                  {material.status === 'completed' ? 'Review' : 'Continue'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Training;