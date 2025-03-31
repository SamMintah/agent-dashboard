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

const archivedAgents: Agent[] = [
  {
    id: 4,
    name: 'Robert Williams',
    email: 'robert.w@example.com',
    region: 'South',
    district: 'Southern District',
    status: 'Archived',
    verificationStatus: 'Verified',
    performance: 78,
    revenue: '$67,890',
    tasks: 0,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    contractType: 'Full-time',
    joinDate: '2022-03-10',
    supervisor: 'Emma Wilson',
    assignedFarmers: 0,
    issuedTools: ['Tablet', 'GPS Device'],
    projects: [
      { id: 5, name: 'Winter Crop Planning', status: 'Completed' }
    ],
    archived: true
  },
  {
    id: 5,
    name: 'Jessica Martinez',
    email: 'jessica.m@example.com',
    region: 'East Coast',
    district: 'Eastern District',
    status: 'Archived',
    verificationStatus: 'Verified',
    performance: 91,
    revenue: '$112,450',
    tasks: 0,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    contractType: 'Part-time',
    joinDate: '2022-08-22',
    supervisor: 'John Smith',
    assignedFarmers: 0,
    issuedTools: ['Tablet', 'Soil Testing Kit'],
    projects: [
      { id: 6, name: 'Organic Certification', status: 'Completed' },
      { id: 7, name: 'Farmer Training', status: 'Completed' }
    ],
    archived: true
  },
  {
    id: 6,
    name: 'David Thompson',
    email: 'david.t@example.com',
    region: 'Midwest',
    district: 'Central District',
    status: 'Archived',
    verificationStatus: 'Unverified',
    performance: 65,
    revenue: '$45,320',
    tasks: 0,
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    contractType: 'Short-term',
    joinDate: '2023-01-05',
    supervisor: 'David Brown',
    assignedFarmers: 0,
    issuedTools: ['Tablet'],
    projects: [],
    archived: true
  }
];

const regions = ['All Regions', 'East Coast', 'West Coast', 'Midwest', 'South'];
const districts = ['All Districts', 'Eastern District', 'Western District', 'Central District', 'Southern District'];
const statuses = ['All Status', 'Active', 'Inactive', 'Pending', 'Archived'];
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

const AchievedAgents = () => {
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedVerification, setSelectedVerification] = useState('All Verification');
  const [selectedContract, setSelectedContract] = useState('All Contracts');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Adjust the number as needed or to match other pages

  // Filter archived agents based on search query and filters
  const filteredAgents = archivedAgents.filter(agent => {
    const matchesSearch = searchQuery === '' || 
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRegion = selectedRegion === 'All Regions' || agent.region === selectedRegion;
    const matchesDistrict = selectedDistrict === 'All Districts' || agent.district === selectedDistrict;
    const matchesStatus = selectedStatus === 'All Status' || agent.status === selectedStatus;
    const matchesVerification = selectedVerification === 'All Verification' || agent.verificationStatus === selectedVerification;
    const matchesContract = selectedContract === 'All Contracts' || agent.contractType === selectedContract;
    
    return matchesSearch && matchesRegion && matchesDistrict && matchesStatus && matchesVerification && matchesContract;
  });

  // Pagination logic
  const indexOfLastAgent = currentPage * itemsPerPage;
  const indexOfFirstAgent = indexOfLastAgent - itemsPerPage;
  const currentAgents = filteredAgents.slice(indexOfFirstAgent, indexOfLastAgent);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Achieved Agents</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search archived agents..."
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

export default AchievedAgents;
