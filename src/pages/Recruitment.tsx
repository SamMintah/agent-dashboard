import React, { useState } from 'react';
import { Search, Filter, CheckCircle, XCircle, MapPin, Briefcase, GraduationCap, Clock } from 'lucide-react';

interface Applicant {
  id: number;
  name: string;
  email: string;
  avatar: string;
  location: string;
  experience: string;
  appliedDate: string;
  projects: string[];
  status: 'pending' | 'approved' | 'rejected';
  education: string;
  skills: string[];
}

interface DeactivatedAgent {
  id: number;
  name: string;
  email: string;
  avatar: string;
  region: string;
  deactivationDate: string;
  reason: string;
  projects: string[];
  performance: number;
}

const applicants: Applicant[] = [
  {
    id: 1,
    name: 'Alex Thompson',
    email: 'alex.t@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    location: 'Eastern District',
    experience: '5 years in agriculture',
    appliedDate: '2024-03-18',
    projects: ['Spring Planting', 'Crop Monitoring'],
    status: 'pending',
    education: 'B.S. in Agricultural Science',
    skills: ['Crop Management', 'Soil Analysis', 'Farm Planning']
  },
  {
    id: 2,
    name: 'Maria Garcia',
    email: 'maria.g@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    location: 'Western District',
    experience: '3 years in farm management',
    appliedDate: '2024-03-19',
    projects: ['Harvest Planning'],
    status: 'pending',
    education: 'M.S. in Agribusiness',
    skills: ['Team Leadership', 'Project Management', 'Data Analysis']
  }
];

const deactivatedAgents: DeactivatedAgent[] = [
  {
    id: 1,
    name: 'David Brown',
    email: 'david.b@example.com',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    region: 'Southern District',
    deactivationDate: '2024-02-15',
    reason: 'Voluntary Resignation',
    projects: ['Crop Monitoring', 'Farm Assessment'],
    performance: 85
  },
  {
    id: 2,
    name: 'Sarah Wilson',
    email: 'sarah.w@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    region: 'Northern District',
    deactivationDate: '2024-01-30',
    reason: 'Contract Completion',
    projects: ['Spring Planting'],
    performance: 92
  }
];

const deactivationReasons = ['All Reasons', 'Voluntary Resignation', 'Contract Completion', 'Performance Issues', 'Other'];
const regions = ['All Regions', 'Eastern District', 'Western District', 'Southern District', 'Northern District'];

const Recruitment = () => {
  const [activeTab, setActiveTab] = useState('applicants');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReason, setSelectedReason] = useState('All Reasons');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Recruitment</h1>
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'applicants'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab('applicants')}
          >
            Pending Applicants
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'deactivated'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab('deactivated')}
          >
            Deactivated Agents
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={activeTab === 'applicants' ? "Search applicants..." : "Search deactivated agents..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          {activeTab === 'deactivated' && (
            <div className="flex space-x-4">
              <select
                value={selectedReason}
                onChange={(e) => setSelectedReason(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {deactivationReasons.map((reason) => (
                  <option key={reason} value={reason}>{reason}</option>
                ))}
              </select>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {regions.map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {activeTab === 'applicants' ? (
          <div className="space-y-4">
            {applicants.map((applicant) => (
              <div key={applicant.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <img
                      src={applicant.avatar}
                      alt={applicant.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{applicant.name}</h3>
                      <p className="text-sm text-gray-500">{applicant.email}</p>
                      <div className="flex items-center mt-2 space-x-4">
                        <span className="flex items-center text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-1" />
                          {applicant.location}
                        </span>
                        <span className="flex items-center text-sm text-gray-500">
                          <Briefcase className="w-4 h-4 mr-1" />
                          {applicant.experience}
                        </span>
                        <span className="flex items-center text-sm text-gray-500">
                          <GraduationCap className="w-4 h-4 mr-1" />
                          {applicant.education}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                      <CheckCircle className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">Skills</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {applicant.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">Interested Projects</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {applicant.projects.map((project, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full"
                      >
                        {project}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  Applied on {new Date(applicant.appliedDate).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {deactivatedAgents.map((agent) => (
              <div key={agent.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <img
                      src={agent.avatar}
                      alt={agent.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{agent.name}</h3>
                      <p className="text-sm text-gray-500">{agent.email}</p>
                      <div className="flex items-center mt-2 space-x-4">
                        <span className="flex items-center text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-1" />
                          {agent.region}
                        </span>
                        <span className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          Deactivated: {new Date(agent.deactivationDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {agent.reason}
                    </span>
                    <div className="mt-2 text-sm text-gray-500">
                      Performance: {agent.performance}%
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">Previous Projects</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {agent.projects.map((project, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full"
                      >
                        {project}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Recruitment;