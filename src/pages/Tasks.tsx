import React, { useState } from 'react';
import { Plus, CheckCircle, Clock, AlertCircle, Users, Edit } from 'lucide-react';
import Modal from '../components/Modal';

// Sample data for agents and farmers
const agents = [
  { id: 1, name: 'Sarah Chen' },
  { id: 2, name: 'Michael Johnson' },
  { id: 3, name: 'Emily Rodriguez' }
];

const farmers = [
  { id: 1, name: 'John Smith', assigned: true, agentId: 1, region: 'North', district: 'Central' },
  { id: 2, name: 'Maria Garcia', assigned: true, agentId: 2, region: 'South', district: 'Eastern' },
  { id: 3, name: 'David Lee', assigned: false, agentId: null, region: 'West', district: 'Western' },
  { id: 4, name: 'Priya Patel', assigned: true, agentId: 3, region: 'East', district: 'Northern' },
  { id: 5, name: 'Carlos Mendez', assigned: true, agentId: 1, region: 'North', district: 'Central' },
  { id: 6, name: 'Emma Wilson', assigned: false, agentId: null, region: 'South', district: 'Southern' },
  { id: 7, name: 'James Brown', assigned: false, agentId: null, region: 'East', district: 'Eastern' },
  { id: 8, name: 'Sophia Chen', assigned: false, agentId: null, region: 'West', district: 'Western' }
];

const projects = [
  { id: 1, name: 'Corn Harvest 2024' },
  { id: 2, name: 'Sustainable Farming Initiative' },
  { id: 3, name: 'Irrigation System Upgrade' }
];

const tasks = [
  {
    id: 1,
    title: 'Review Q1 Performance Reports',
    description: 'Complete quarterly performance review for East Coast agents',
    assignedTo: 'Sarah Chen',
    agentId: 1,
    dueDate: '2024-03-20',
    status: 'urgent',
    priority: 'High',
    projectId: 1,
    projectName: 'Corn Harvest 2024',
    assignedFarmers: [
      { id: 1, name: 'John Smith' },
      { id: 5, name: 'Carlos Mendez' }
    ]
  },
  {
    id: 2,
    title: 'Update Training Materials',
    description: 'Revise onboarding documentation with new compliance requirements',
    assignedTo: 'Michael Johnson',
    agentId: 2,
    dueDate: '2024-03-25',
    status: 'in-progress',
    priority: 'Medium',
    projectId: 2,
    projectName: 'Sustainable Farming Initiative',
    assignedFarmers: [
      { id: 2, name: 'Maria Garcia' }
    ]
  },
  {
    id: 3,
    title: 'Agent Onboarding Session',
    description: 'Conduct virtual onboarding for new agents',
    assignedTo: 'Emily Rodriguez',
    agentId: 3,
    dueDate: '2024-03-22',
    status: 'completed',
    priority: 'High',
    projectId: 3,
    projectName: 'Irrigation System Upgrade',
    assignedFarmers: [
      { id: 4, name: 'Priya Patel' }
    ]
  },
  {
    id: 4,
    title: 'Quarterly Farmer Check-in',
    description: 'Schedule and conduct quarterly check-in meetings with assigned farmers',
    assignedTo: 'Sarah Chen',
    agentId: 1,
    dueDate: '2024-04-05',
    status: 'in-progress',
    priority: 'Medium',
    projectId: 1,
    projectName: 'Corn Harvest 2024',
    assignedFarmers: [
      { id: 1, name: 'John Smith' },
      { id: 5, name: 'Carlos Mendez' }
    ]
  },
  {
    id: 5,
    title: 'Equipment Inventory Audit',
    description: 'Complete inventory audit of all farming equipment and submit report',
    assignedTo: 'Michael Johnson',
    agentId: 2,
    dueDate: '2024-04-10',
    status: 'urgent',
    priority: 'High',
    projectId: 3,
    projectName: 'Irrigation System Upgrade',
    assignedFarmers: [
      { id: 2, name: 'Maria Garcia' }
    ]
  },
  {
    id: 6,
    title: 'Sustainability Workshop',
    description: 'Prepare and conduct workshop on sustainable farming practices',
    assignedTo: 'Emily Rodriguez',
    agentId: 3,
    dueDate: '2024-04-15',
    status: 'in-progress',
    priority: 'Low',
    projectId: 2,
    projectName: 'Sustainable Farming Initiative',
    assignedFarmers: [
      { id: 4, name: 'Priya Patel' }
    ]
  },
  {
    id: 7,
    title: 'Budget Planning for Q2',
    description: 'Develop budget plan for Q2 operations and submit for approval',
    assignedTo: 'Sarah Chen',
    agentId: 1,
    dueDate: '2024-03-30',
    status: 'completed',
    priority: 'Medium',
    projectId: 1,
    projectName: 'Corn Harvest 2024',
    assignedFarmers: []
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
  const [filterProject, setFilterProject] = useState('all');
  
  // Modal states
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [showAssignFarmersModal, setShowAssignFarmersModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [showDetailedTaskModal, setShowDetailedTaskModal] = useState(false);
  const [selectedDetailedTask, setSelectedDetailedTask] = useState<any>(null);
  
  // Farmer filter states
  const [filterRegion, setFilterRegion] = useState('all');
  const [filterDistrict, setFilterDistrict] = useState('all');
  
  // Form states
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'in-progress',
    priority: 'Medium',
    projectId: '',
    agentId: ''
  });
  
  // Assignment states
  const [selectedAgent, setSelectedAgent] = useState('');
  const [selectedFarmers, setSelectedFarmers] = useState<number[]>([]);

  // Handler for creating a new task
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would make an API call to create the task
    console.log('Creating new task:', newTask);
    setShowCreateTaskModal(false);
    // Reset form
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      status: 'in-progress',
      priority: 'Medium',
      projectId: '',
      agentId: ''
    });
  };
  
  // Handler for assigning farmers
  const handleAssignFarmers = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would make an API call to update assignments
    console.log('Assigning farmers to agent:', selectedAgent);
    console.log('Selected farmers:', selectedFarmers);
    setShowAssignFarmersModal(false);
    // Reset selections
    setSelectedAgent('');
    setSelectedFarmers([]);
    setFilterRegion('all');
    setFilterDistrict('all');
  };
  
  // Open detailed task modal
  const openDetailedTask = (task: any) => {
    setSelectedDetailedTask(task);
    setShowDetailedTaskModal(true);
  };
  
  // Close detailed task modal
  const closeDetailedTaskModal = () => {
    setShowDetailedTaskModal(false);
    setSelectedDetailedTask(null);
  };
  
  // Open assign farmers modal
  const openAssignFarmersModal = () => {
    setSelectedFarmers([]);
    setSelectedAgent('');
    setShowAssignFarmersModal(true);
  };
  
  // Get unique regions from farmers data
  const getUniqueRegions = () => {
    const regions = farmers.map(farmer => farmer.region);
    return [...new Set(regions)];
  };
  
  // Get unique districts from farmers data based on selected region
  const getUniqueDistricts = () => {
    const districts = farmers
      .filter(farmer => filterRegion === 'all' || farmer.region === filterRegion)
      .map(farmer => farmer.district);
    return [...new Set(districts)];
  };
  
  // Filter tasks based on selected filters
  const filteredTasks = tasks.filter(task => {
    const statusMatch = filterStatus === 'all' || task.status === filterStatus;
    const priorityMatch = filterPriority === 'all' || task.priority === filterPriority;
    const projectMatch = filterProject === 'all' || task.projectId.toString() === filterProject;
    return statusMatch && priorityMatch && projectMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
        <div className="flex space-x-3">
          <button 
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            onClick={openAssignFarmersModal}
          >
            <Users className="w-5 h-5 mr-2" />
            Assign Farmers to Agents
          </button>
          <button 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={() => setShowCreateTaskModal(true)}
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Task
          </button>
        </div>
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
          <select
            value={filterProject}
            onChange={(e) => setFilterProject(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Projects</option>
            {projects.map(project => (
              <option key={project.id} value={project.id.toString()}>{project.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div 
              key={task.id} 
              className="flex items-start justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => openDetailedTask(task)}
            >
              <div className="flex items-start space-x-4">
                {getStatusIcon(task.status)}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                  <div className="flex flex-wrap items-center mt-2 gap-2">
                    <span className="text-xs text-gray-500">Assigned to: {task.assignedTo}</span>
                    <span className="text-xs text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                    <span className="text-xs bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full">
                      {task.projectName}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Users className="w-3 h-3 mr-1" /> 
                      {task.assignedFarmers.length} farmer{task.assignedFarmers.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  <Edit className="w-4 h-4 mr-1 inline" />
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

      {/* Create Task Modal */}
      <Modal isOpen={showCreateTaskModal} title="Create New Task" onClose={() => setShowCreateTaskModal(false)}>
          <div className="p-6">
            <form onSubmit={handleCreateTask}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                    <input
                      type="date"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newTask.status}
                      onChange={(e) => setNewTask({...newTask, status: e.target.value})}
                    >
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newTask.priority}
                      onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newTask.projectId}
                      onChange={(e) => setNewTask({...newTask, projectId: e.target.value})}
                    >
                      <option value="">Select a project</option>
                      {projects.map(project => (
                        <option key={project.id} value={project.id}>{project.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assign to Agent</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newTask.agentId}
                    onChange={(e) => setNewTask({...newTask, agentId: e.target.value})}
                  >
                    <option value="">Select an agent</option>
                    {agents.map(agent => (
                      <option key={agent.id} value={agent.id}>{agent.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowCreateTaskModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Create Task
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal>

      {/* Assign Farmers Modal */}
      <Modal isOpen={showAssignFarmersModal} title="Assign Farmers to Agents" onClose={() => setShowAssignFarmersModal(false)}>
        <div className="p-6">
          <form onSubmit={handleAssignFarmers}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Region</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filterRegion}
                    onChange={(e) => {
                      setFilterRegion(e.target.value);
                      setFilterDistrict('all');
                    }}
                  >
                    <option value="all">All Regions</option>
                    {getUniqueRegions().map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Filter by District</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filterDistrict}
                    onChange={(e) => setFilterDistrict(e.target.value)}
                  >
                    <option value="all">All Districts</option>
                    {getUniqueDistricts().map(district => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Agent</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedAgent}
                  onChange={(e) => setSelectedAgent(e.target.value)}
                  required
                >
                  <option value="">Select an agent</option>
                  {agents.map(agent => (
                    <option key={agent.id} value={agent.id}>{agent.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Select Unassigned Farmers</label>
                  <span className="text-xs text-gray-500">
                    {selectedFarmers.length} farmer(s) selected
                  </span>
                </div>
                <div className="max-h-60 overflow-y-auto border border-gray-300 rounded-md p-2">
                  {farmers
                    .filter(farmer => 
                      (!farmer.assigned || farmer.agentId === null) && 
                      (filterRegion === 'all' || farmer.region === filterRegion) &&
                      (filterDistrict === 'all' || farmer.district === filterDistrict)
                    )
                    .map(farmer => (
                      <div key={farmer.id} className="flex items-center py-2 border-b border-gray-100">
                        <input
                          type="checkbox"
                          id={`farmer-${farmer.id}`}
                          checked={selectedFarmers.includes(farmer.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedFarmers([...selectedFarmers, farmer.id]);
                            } else {
                              setSelectedFarmers(selectedFarmers.filter(id => id !== farmer.id));
                            }
                          }}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`farmer-${farmer.id}`} className="ml-2 block text-sm text-gray-900">
                          {farmer.name} - {farmer.region}, {farmer.district}
                        </label>
                      </div>
                    ))}
                </div>
                {farmers.filter(farmer => 
                  (!farmer.assigned || farmer.agentId === null) && 
                  (filterRegion === 'all' || farmer.region === filterRegion) &&
                  (filterDistrict === 'all' || farmer.district === filterDistrict)
                ).length === 0 && (
                  <p className="text-sm text-gray-500 mt-2 text-center py-2">
                    No unassigned farmers found with the selected filters.
                  </p>
                )}
              </div>
                
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  onClick={() => setShowAssignFarmersModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  disabled={selectedFarmers.length === 0 || !selectedAgent}
                >
                  Assign to Agent
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>

      {/* Detailed Task Modal */}
      <Modal isOpen={showDetailedTaskModal} title="Task Details" onClose={closeDetailedTaskModal}>
        {selectedDetailedTask && (
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{selectedDetailedTask.title}</h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedDetailedTask.status)}`}>
                  {selectedDetailedTask.status}
                </span>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">Description</h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">{selectedDetailedTask.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Due Date</h4>
                  <p className="text-sm text-gray-600">{new Date(selectedDetailedTask.dueDate).toLocaleDateString()}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Priority</h4>
                  <p className="text-sm text-gray-600">{selectedDetailedTask.priority}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Assigned To</h4>
                  <p className="text-sm text-gray-600">{selectedDetailedTask.assignedTo}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Project</h4>
                  <p className="text-sm text-gray-600">{selectedDetailedTask.projectName}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">Assigned Farmers</h4>
                {selectedDetailedTask.assignedFarmers.length > 0 ? (
                  <div className="mt-2 space-y-2">
                    {selectedDetailedTask.assignedFarmers.map((farmer: any) => (
                      <div key={farmer.id} className="flex items-center p-2 bg-gray-50 rounded-md">
                        <Users className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-600">{farmer.name}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">No farmers assigned to this task</p>
                )}
              </div>
              
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  onClick={closeDetailedTaskModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={() => {
                    closeDetailedTaskModal();
                    // In a real implementation, you might want to open the edit modal here
                    console.log('Edit task:', selectedDetailedTask.id);
                  }}
                >
                  Edit Task
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Tasks;
