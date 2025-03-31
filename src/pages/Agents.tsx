import React, { useState } from 'react';
import { Search, Filter, Plus, MapPin, Calendar, Briefcase, Shield, PenTool as Tool, Users as UsersIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';

interface Project {
  id: number;
  name: string;
  status: string;
}

interface Agent {
  id: number;
  name: string;
  email: string;
  region: string;
  district: string;
  status: string;
  verificationStatus: 'Verified' | 'Unverified' | 'Pending';
  performance: number;
  revenue: string;
  tasks: number;
  avatar: string;
  contractType: 'Full-time' | 'Part-time' | 'Short-term';
  joinDate: string;
  supervisor: string;
  assignedFarmers: number;
  issuedTools: string[];
  projects: Project[];
  archived?: boolean;
}

const agents: Agent[] = [
  {
    id: 1,
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
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
    assignedFarmers: 45,
    issuedTools: ['Tablet', 'GPS Device', 'Soil Testing Kit'],
    projects: [
      { id: 1, name: 'Spring Planting', status: 'Active' },
      { id: 2, name: 'Crop Monitoring', status: 'In Progress' }
    ]
  },
  {
    id: 2,
    name: 'Michael Johnson',
    email: 'michael.j@example.com',
    region: 'West Coast',
    district: 'Western District',
    status: 'Active',
    verificationStatus: 'Verified',
    performance: 85,
    revenue: '$98,750',
    tasks: 12,
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    contractType: 'Full-time',
    joinDate: '2023-08-01',
    supervisor: 'Emma Wilson',
    assignedFarmers: 38,
    issuedTools: ['Tablet', 'Moisture Meter'],
    projects: [
      { id: 3, name: 'Harvest Planning', status: 'Pending' }
    ]
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    email: 'emily.r@example.com',
    region: 'Midwest',
    district: 'Central District',
    status: 'Inactive',
    verificationStatus: 'Pending',
    performance: 92,
    revenue: '$78,300',
    tasks: 8,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    contractType: 'Part-time',
    joinDate: '2023-09-15',
    supervisor: 'David Brown',
    assignedFarmers: 25,
    issuedTools: ['Tablet'],
    projects: []
  }
];

const regions = ['All Regions', 'East Coast', 'West Coast', 'Midwest', 'South'];
const districts = ['All Districts', 'Eastern District', 'Western District', 'Central District', 'Southern District'];
const statuses = ['All Status', 'Active', 'Inactive', 'Pending'];
const verificationStatuses = ['All Verification', 'Verified', 'Unverified', 'Pending'];
const contractTypes = ['All Contracts', 'Full-time', 'Part-time', 'Short-term'];

const AgentTable = ({ agents, title }: { agents: Agent[], title?: string }) => {
  const navigate = useNavigate();

  const handleAgentClick = (agentId: number) => {
    navigate(`/agents/${agentId}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      {title && <h2 className="text-lg font-semibold text-gray-900 mb-6">{title}</h2>}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
              <th className="pb-4 font-medium">Agent</th>
              <th className="pb-4 font-medium">Location</th>
              <th className="pb-4 font-medium">Contract</th>
              <th className="pb-4 font-medium">Status</th>
              <th className="pb-4 font-medium">Verification</th>
              <th className="pb-4 font-medium">Performance</th>
              <th className="pb-4 font-medium">Projects</th>
              <th className="pb-4 font-medium">Farmers</th>
              <th className="pb-4 font-medium">Tools</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr 
                key={agent.id} 
                className="border-b border-gray-100 last:border-0 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleAgentClick(agent.id)}
              >
                <td className="py-4">
                  <div className="flex items-center">
                    <img src={agent.avatar} alt={agent.name} className="w-8 h-8 rounded-full mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">{agent.name}</div>
                      <div className="text-sm text-gray-500">{agent.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{agent.district}</span>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center text-gray-500">
                    <Briefcase className="w-4 h-4 mr-1" />
                    <span>{agent.contractType}</span>
                  </div>
                </td>
                <td className="py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    agent.status === 'Active' ? 'bg-green-100 text-green-800' : 
                    agent.status === 'Archived' ? 'bg-gray-100 text-gray-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {agent.status}
                  </span>
                </td>
                <td className="py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    agent.verificationStatus === 'Verified' ? 'bg-blue-100 text-blue-800' :
                    agent.verificationStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {agent.verificationStatus}
                  </span>
                </td>
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
                  <div className="flex flex-col gap-1">
                    {agent.projects.map((project) => (
                      <span key={project.id} className="text-sm text-gray-500">
                        {project.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center text-gray-500">
                    <UsersIcon className="w-4 h-4 mr-1" />
                    <span>{agent.assignedFarmers}</span>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center text-gray-500">
                    <Tool className="w-4 h-4 mr-1" />
                    <span>{agent.issuedTools.length}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Agents = () => {
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedVerification, setSelectedVerification] = useState('All Verification');
  const [selectedContract, setSelectedContract] = useState('All Contracts');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  
  const filteredAgents = agents.filter(agent => 
    agent.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const indexOfLastAgent = currentPage * itemsPerPage;
  const indexOfFirstAgent = indexOfLastAgent - itemsPerPage;
  const currentAgents = filteredAgents.slice(indexOfFirstAgent, indexOfLastAgent);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Agents</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-5 h-5 mr-2" />
          Add New Agent
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search agents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {regions.map((region) => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {districts.map((district) => (
                <option key={district} value={district}>{district}</option>
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
            <select
              value={selectedVerification}
              onChange={(e) => setSelectedVerification(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {verificationStatuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <select
              value={selectedContract}
              onChange={(e) => setSelectedContract(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {contractTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <AgentTable agents={currentAgents} />
      {filteredAgents.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredAgents.length / itemsPerPage)}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default Agents;
