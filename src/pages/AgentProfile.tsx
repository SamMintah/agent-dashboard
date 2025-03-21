import React from 'react';
import { useParams } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Calendar, Briefcase, Shield, PenTool as Tool, Users as UsersIcon, FileText, CheckCircle, AlertCircle, Clock, ChevronLeft, MapPinned } from 'lucide-react';
import { Link } from 'react-router-dom';

// This would typically come from an API
const agent = {
  id: 1,
  name: 'Sarah Chen',
  email: 'sarah.chen@example.com',
  phone: '+1 (555) 123-4567',
  region: 'East Coast',
  district: 'Eastern District',
  status: 'Active',
  verificationStatus: 'Verified',
  performance: 98,
  revenue: '$125,430',
  tasks: 15,
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  contractType: 'Full-time',
  joinDate: '2023-06-15',
  supervisor: 'John Smith',
  lastLocation: {
    latitude: 40.7128,
    longitude: -74.0060,
    lastUpdated: '2024-03-20 13:45',
    address: '123 Farm Road, Agricultural District'
  },
  projects: [
    {
      id: 1,
      name: 'Spring Planting Initiative',
      status: 'In Progress',
      deadline: '2024-04-15'
    },
    {
      id: 2,
      name: 'Crop Monitoring Program',
      status: 'Active',
      deadline: '2024-06-30'
    },
    {
      id: 3,
      name: 'Harvest Planning',
      status: 'Pending',
      deadline: '2024-08-15'
    }
  ],
  assignedFarmers: [
    { id: 1, name: 'Robert Wilson', location: 'Eastern Farm', crops: 'Corn, Soybeans' },
    { id: 2, name: 'Maria Garcia', location: 'Riverside Fields', crops: 'Wheat' },
    { id: 3, name: 'James Brown', location: 'Highland Ranch', crops: 'Cotton' }
  ],
  issuedTools: [
    { name: 'Tablet', issueDate: '2023-06-15', status: 'Active' },
    { name: 'GPS Device', issueDate: '2023-06-15', status: 'Active' },
    { name: 'Soil Testing Kit', issueDate: '2023-07-01', status: 'Active' }
  ],
  documents: [
    { name: 'Contract Agreement', type: 'PDF', uploadDate: '2023-06-15' },
    { name: 'ID Verification', type: 'PDF', uploadDate: '2023-06-15' },
    { name: 'Training Certificate', type: 'PDF', uploadDate: '2023-07-15' }
  ],
  activityLog: [
    { date: '2024-03-15', activity: 'Completed farmer visit', status: 'completed' },
    { date: '2024-03-14', activity: 'Submitted monthly report', status: 'completed' },
    { date: '2024-03-13', activity: 'Updated farmer records', status: 'in-progress' }
  ]
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'in-progress':
      return <Clock className="w-5 h-5 text-blue-500" />;
    default:
      return <AlertCircle className="w-5 h-5 text-yellow-500" />;
  }
};

const AgentProfile = () => {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/agents"
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Agents</span>
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900">Agent Profile</h1>
        </div>
        <div className="flex space-x-4">
          <button className="px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            Edit Profile
          </button>
          <button className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700">
            Remove Agent
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {agent.activityLog.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                {getStatusIcon(activity.status)}
                <div className="ml-3">
                  <div className="font-medium text-gray-900">{activity.activity}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(activity.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                activity.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {activity.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="text-center mb-6">
              <img
                src={agent.avatar}
                alt={agent.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-900">{agent.name}</h2>
              <p className="text-gray-500">{agent.contractType} Agent</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center text-gray-500">
                <Mail className="w-5 h-5 mr-3" />
                <span>{agent.email}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <Phone className="w-5 h-5 mr-3" />
                <span>{agent.phone}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <MapPin className="w-5 h-5 mr-3" />
                <span>{agent.district}, {agent.region}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <Calendar className="w-5 h-5 mr-3" />
                <span>Joined {new Date(agent.joinDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <Briefcase className="w-5 h-5 mr-3" />
                <span>Reports to {agent.supervisor}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Last Known Location</h3>
              <div className="flex items-start space-x-3">
                <MapPinned className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-900">{agent.lastLocation.address}</p>
                  <p className="text-xs text-gray-500">Last updated: {agent.lastLocation.lastUpdated}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Verification Status</h3>
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-sm font-medium text-green-500">Verified Agent</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Projects */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Assigned Projects</h3>
            <div className="space-y-4">
              {agent.projects.map((project) => (
                <div key={project.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{project.name}</h4>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      project.status === 'Active' ? 'bg-green-100 text-green-800' :
                      project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Deadline: {new Date(project.deadline).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Overview */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Performance Score</div>
                <div className="text-2xl font-semibold text-gray-900">{agent.performance}%</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Revenue Generated</div>
                <div className="text-2xl font-semibold text-gray-900">{agent.revenue}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Active Tasks</div>
                <div className="text-2xl font-semibold text-gray-900">{agent.tasks}</div>
              </div>
            </div>
          </div>

          {/* Assigned Farmers */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Assigned Farmers</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
            </div>
            <div className="space-y-4">
              {agent.assignedFarmers.map((farmer) => (
                <div key={farmer.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{farmer.name}</div>
                    <div className="text-sm text-gray-500">{farmer.location}</div>
                    <div className="text-sm text-gray-500">Crops: {farmer.crops}</div>
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Issued Tools */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Issued Tools</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700">Issue New Tool</button>
            </div>
            <div className="space-y-4">
              {agent.issuedTools.map((tool, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Tool className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">{tool.name}</div>
                      <div className="text-sm text-gray-500">
                        Issued on {new Date(tool.issueDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {tool.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Documents</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700">Upload Document</button>
            </div>
            <div className="space-y-4">
              {agent.documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">{doc.name}</div>
                      <div className="text-sm text-gray-500">
                        Uploaded on {new Date(doc.uploadDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;