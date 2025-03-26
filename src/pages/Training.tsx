import React, { useState } from 'react';
import { Play, FileText, HelpCircle, Plus, CheckCircle, Clock, Users, BookOpen, AlertTriangle, XCircle, X, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';

interface TrainingStats {
  total: number;
  completed: number;
  pending: number;
  failed: number;
  lastUpdate: string;
}

interface Agent {
  id: number;
  name: string;
  avatar: string;
  status: 'active' | 'inactive' | 'pending';
  performance: number;
  lastActive: string;
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
  level: 'Easy' | 'Medium' | 'Hard';
  startedCount: number;
  completedCount: number;
  startedAgents: Agent[];
  completedAgents: Agent[];
}

// Sample agents data
const sampleAgents: Agent[] = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    status: "active",
    performance: 92,
    lastActive: "2024-03-25"
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    status: "active",
    performance: 88,
    lastActive: "2024-03-24"
  },
  {
    id: 3,
    name: "Michael Johnson",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    status: "inactive",
    performance: 75,
    lastActive: "2024-03-20"
  },
  {
    id: 4,
    name: "Emily Davis",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    status: "active",
    performance: 95,
    lastActive: "2024-03-25"
  },
  {
    id: 5,
    name: "Robert Wilson",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    status: "pending",
    performance: 60,
    lastActive: "2024-03-22"
  },
  {
    id: 6,
    name: "Sarah Brown",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    status: "active",
    performance: 85,
    lastActive: "2024-03-24"
  },
  {
    id: 7,
    name: "David Miller",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    status: "inactive",
    performance: 70,
    lastActive: "2024-03-18"
  },
  {
    id: 8,
    name: "Lisa Taylor",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    status: "active",
    performance: 90,
    lastActive: "2024-03-25"
  }
];

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
    level: 'Easy',
    startedCount: 150,
    completedCount: 128,
    startedAgents: [
      sampleAgents[0],
      sampleAgents[1],
      sampleAgents[2],
      sampleAgents[3],
      sampleAgents[4],
      sampleAgents[5]
    ],
    completedAgents: [
      sampleAgents[0],
      sampleAgents[1],
      sampleAgents[3],
      sampleAgents[5],
      sampleAgents[7]
    ]
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
    level: 'Medium',
    startedCount: 120,
    completedCount: 78,
    startedAgents: [
      sampleAgents[0],
      sampleAgents[2],
      sampleAgents[4],
      sampleAgents[6]
    ],
    completedAgents: [
      sampleAgents[0],
      sampleAgents[4]
    ]
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
    level: 'Beginner',
    startedCount: 90,
    completedCount: 40,
    startedAgents: [
      sampleAgents[1],
      sampleAgents[3],
      sampleAgents[5],
      sampleAgents[7]
    ],
    completedAgents: [
      sampleAgents[3],
      sampleAgents[7]
    ]
  }
];

const categories = ['All Categories', 'General Knowledge', 'Project Based', 'Technical Skills'];
const levels = ['All Levels', 'Easy', 'Medium', 'Hard'];
const statuses = ['All Status', 'Completed', 'In Progress', 'Not Started', 'Failed'];

const Training = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLevel, setSelectedDifficulty] = useState('All levels');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal state
  const [isNewTrainingModalOpen, setIsNewTrainingModalOpen] = useState(false);
  const [isTrainingDetailModalOpen, setIsTrainingDetailModalOpen] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState<TrainingMaterial | null>(null);
  
  // Form state
  const [newTrainingForm, setNewTrainingForm] = useState({
    title: '',
    description: '',
    category: 'General Knowledge',
    mediaFile: null as File | null,
  });

  // Handle form input changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTrainingForm({
      ...newTrainingForm,
      [name]: value,
    });
  };

  // Handle file input changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewTrainingForm({
        ...newTrainingForm,
        mediaFile: e.target.files[0],
      });
    }
  };

  // Handle form submission
  const handleSubmitTraining = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting new training:', newTrainingForm);
    // In a real app, this would send a request to a service
    
    // Reset form and close modal
    setNewTrainingForm({
      title: '',
      description: '',
      category: 'General Knowledge',
      mediaFile: null,
    });
    setIsNewTrainingModalOpen(false);
  };

  // Open training detail modal
  const handleOpenTrainingDetail = (material: TrainingMaterial) => {
    setSelectedTraining(material);
    setIsTrainingDetailModalOpen(true);
  };

  // Assign training to agent
  const handleAssignTraining = () => {
    if (selectedTraining) {
      console.log(`Assigning training "${selectedTraining.title}" to agent`);
      // In a real app, this would open an agent selection form or send a request
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Training</h1>
        <button 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => setIsNewTrainingModalOpen(true)}
        >
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
          <p className="text-sm text-gray-500">Incomplete Trainings</p>
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
            value={selectedLevel}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {levels.map((level) => (
              <option key={level} value={level}>{level}</option>
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
            <div 
              key={material.id} 
              className="bg-white rounded-xl shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleOpenTrainingDetail(material)}
            >
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
                    <span className="text-gray-500">Level:</span>
                    <span className="font-medium text-gray-900">{material.level}</span>
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
                <div className="text-center text-sm text-gray-500">
                  Click to view details
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* New Training Modal */}
      <Modal isOpen={isNewTrainingModalOpen} onClose={() => setIsNewTrainingModalOpen(false)}>
        <div className="p-6 max-w-6xl w-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Create New Training Material</h2>
            <button 
              onClick={() => setIsNewTrainingModalOpen(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmitTraining} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={newTrainingForm.title}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter training title"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={newTrainingForm.description}
                onChange={handleFormChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter training description"
              />
            </div>
            
            <div>
              <label htmlFor="mediaFile" className="block text-sm font-medium text-gray-700 mb-1">
                Upload Media
              </label>
              <input
                type="file"
                id="mediaFile"
                name="mediaFile"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                accept="video/*,application/pdf"
              />
              <p className="mt-1 text-xs text-gray-500">
                Supported formats: MP4, PDF
              </p>
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={newTrainingForm.category}
                onChange={handleFormChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="General Knowledge">General Knowledge</option>
                <option value="Project Based">Project Based</option>
              </select>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setIsNewTrainingModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Training
              </button>
            </div>
          </form>
        </div>
      </Modal>
      
      {/* Training Detail Modal */}
      {selectedTraining && (
        <Modal isOpen={isTrainingDetailModalOpen} onClose={() => setIsTrainingDetailModalOpen(false)}>
          <div className="p-6 w-full max-w-[90vw] mx-auto max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">{selectedTraining.title}</h2>
              <button 
                onClick={() => setIsTrainingDetailModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Media Preview - Always at the top */}
              <div className="w-full bg-gray-100 rounded-lg p-4">
                {selectedTraining.type === 'video' ? (
                  <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                    <Play className="w-12 h-12 text-white opacity-70" />
                    <p className="text-white text-sm">Video preview would appear here</p>
                  </div>
                ) : (
                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                    <FileText className="w-12 h-12 text-gray-400" />
                    <p className="text-gray-500 text-sm ml-2">Document preview</p>
                  </div>
                )}
              </div>
              
              {/* Training details and agent lists */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Column 1: Training Details */}
                <div className="space-y-6">
                  
                  {/* Training Details */}
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Training Details</h3>
                  <div className="grid grid-cols-1 gap-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Category</h3>
                    <p className="text-gray-900">{selectedTraining.category}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Type</h3>
                    <p className="text-gray-900 capitalize">{selectedTraining.type}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Duration</h3>
                    <p className="text-gray-900">{selectedTraining.duration}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Level</h3>
                    <p className="text-gray-900">{selectedTraining.level}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Completion Rate</h3>
                    <div className="flex items-center mt-1">
                      <div className="w-full h-2 bg-gray-100 rounded-full mr-2">
                        <div
                          className="h-50 bg-blue-600 rounded-full"
                          style={{ width: `${selectedTraining.completionRate}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{selectedTraining.completionRate}%</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Agents Started</h3>
                    <div className="flex items-center mt-1">
                      <Users className="w-6 h-4 text-gray-400 mr-1" />
                      <span className="text-gray-900">{selectedTraining.startedCount}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Agents Completed</h3>
                    <div className="flex items-center mt-1">
                      <CheckCircle className="w-6 h-4 text-green-500 mr-1" />
                      <span className="text-gray-900">{selectedTraining.completedCount}</span>
                    </div>
                  </div>
                </div>
                  </div>
                </div>
                
                {/* Column 2: Agents Started - Only visible on large screens */}
                <div className="hidden lg:block space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">Agents Started</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {selectedTraining.startedAgents.length}
                    </span>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 max-h-80 overflow-y-auto">
                    {selectedTraining.startedAgents.length > 0 ? (
                      <div className="space-y-3">
                        {selectedTraining.startedAgents.map((agent) => (
                          <div key={agent.id} className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                            <div className="flex items-center">
                              <div className="flex-shrink-0">
                                <img 
                                  src={agent.avatar} 
                                  alt={agent.name} 
                                  className="w-10 h-10 rounded-full"
                                />
                              </div>
                              <div className="ml-3 flex-1">
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-medium text-gray-900">{agent.name}</p>
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                    agent.status === 'active' ? 'bg-green-100 text-green-800' :
                                    agent.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                                    'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {agent.status}
                                  </span>
                                </div>
                                <div className="mt-1">
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-500">Performance</span>
                                    <span className="font-medium text-gray-900">{agent.performance}%</span>
                                  </div>
                                  <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1">
                                    <div
                                      className={`h-full rounded-full ${
                                        agent.performance >= 80 ? 'bg-green-500' :
                                        agent.performance >= 60 ? 'bg-yellow-500' :
                                        'bg-red-500'
                                      }`}
                                      style={{ width: `${agent.performance}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <User className="w-10 h-10 text-gray-300 mx-auto" />
                        <p className="mt-2 text-sm text-gray-500">No agents have started this training</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Column 3: Agents Completed - Only visible on large screens */}
                <div className="hidden lg:block space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">Agents Completed</h3>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      {selectedTraining.completedAgents.length}
                    </span>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 max-h-80 overflow-y-auto">
                    {selectedTraining.completedAgents.length > 0 ? (
                      <div className="space-y-3">
                        {selectedTraining.completedAgents.map((agent) => (
                          <div key={agent.id} className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                            <div className="flex items-center">
                              <div className="flex-shrink-0">
                                <img 
                                  src={agent.avatar} 
                                  alt={agent.name} 
                                  className="w-10 h-10 rounded-full"
                                />
                              </div>
                              <div className="ml-3 flex-1">
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-medium text-gray-900">{agent.name}</p>
                                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                    Completed
                                  </span>
                                </div>
                                <div className="mt-1">
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-500">Performance</span>
                                    <span className="font-medium text-gray-900">{agent.performance}%</span>
                                  </div>
                                  <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1">
                                    <div
                                      className={`h-full rounded-full ${
                                        agent.performance >= 80 ? 'bg-green-500' :
                                        agent.performance >= 60 ? 'bg-yellow-500' :
                                        'bg-red-500'
                                      }`}
                                      style={{ width: `${agent.performance}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <CheckCircle className="w-10 h-10 text-gray-300 mx-auto" />
                        <p className="mt-2 text-sm text-gray-500">No agents have completed this training</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
        
              {/* Assign to Agent */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Assign to Agent</h3>
                <div className="flex space-x-3">
                  <select
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue=""
                  >
                    <option value="" disabled>Select an agent</option>
                    <option value="agent1">John Doe</option>
                    <option value="agent2">Jane Smith</option>
                    <option value="agent3">Michael Johnson</option>
                  </select>
                  <button
                    onClick={handleAssignTraining}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Assign
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Training;
