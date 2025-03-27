import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ArrowLeft, CheckCircle, Clock, AlertTriangle, Truck } from 'lucide-react';

interface AgentOrder {
  id: number;
  agent: {
    name: string;
    avatar: string;
  };
  item: string;
  quantity: number;
  totalAmount: number;
  orderDate: string;
  status: 'Completed' | 'Processing' | 'Cancelled' | 'In Transit' | 'Delivered';
}

// Sample orders data (same as in Commodities.tsx)
const orders: AgentOrder[] = [
  {
    id: 1,
    agent: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    item: 'Fertilizer NPK',
    quantity: 50,
    totalAmount: 2299.50,
    orderDate: '2024-03-20',
    status: 'Completed'
  },
  {
    id: 2,
    agent: {
      name: 'Michael Johnson',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    item: 'Pesticide X-100',
    quantity: 10,
    totalAmount: 899.90,
    orderDate: '2024-03-19',
    status: 'Processing'
  },
  {
    id: 3,
    agent: {
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    item: 'Fresh Tomatoes',
    quantity: 75,
    totalAmount: 299.25,
    orderDate: '2024-03-22',
    status: 'Completed'
  },
  {
    id: 4,
    agent: {
      name: 'David Lee',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    item: 'Maize',
    quantity: 200,
    totalAmount: 500.00,
    orderDate: '2024-03-21',
    status: 'Processing'
  },
  {
    id: 5,
    agent: {
      name: 'Amara Okafor',
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    item: 'Herbicide Z-200',
    quantity: 30,
    totalAmount: 1799.70,
    orderDate: '2024-03-23',
    status: 'Completed'
  },
  {
    id: 6,
    agent: {
      name: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    item: 'Organic Compost',
    quantity: 100,
    totalAmount: 1499.00,
    orderDate: '2024-03-18',
    status: 'Delivered'
  },
  {
    id: 7,
    agent: {
      name: 'Lisa Wong',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    item: 'Soil Conditioner',
    quantity: 45,
    totalAmount: 899.55,
    orderDate: '2024-03-17',
    status: 'In Transit'
  },
  {
    id: 8,
    agent: {
      name: 'Robert Garcia',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    item: 'Pesticide X-100',
    quantity: 15,
    totalAmount: 1349.85,
    orderDate: '2024-03-16',
    status: 'Cancelled'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800';
    case 'Processing':
      return 'bg-blue-100 text-blue-800';
    case 'Cancelled':
      return 'bg-gray-100 text-gray-800';
    case 'In Transit':
      return 'bg-indigo-100 text-indigo-800';
    case 'Delivered':
      return 'bg-teal-100 text-teal-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Completed':
    case 'Delivered':
      return <CheckCircle className="w-4 h-4 mr-1" />;
    case 'Processing':
      return <Clock className="w-4 h-4 mr-1" />;
    case 'Cancelled':
      return <AlertTriangle className="w-4 h-4 mr-1" />;
    case 'In Transit':
      return <Truck className="w-4 h-4 mr-1" />;
    default:
      return null;
  }
};

const AllOrders = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  // Filter orders based on search query and selected status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.agent.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/commodities')}
            className="mr-4 p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5 text-gray-500" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">All Orders</h1>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search orders by item or agent..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="Completed">Completed</option>
              <option value="Processing">Processing</option>
              <option value="Cancelled">Cancelled</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
                <th className="pb-4 font-medium">Agent</th>
                <th className="pb-4 font-medium">Item</th>
                <th className="pb-4 font-medium">Quantity</th>
                <th className="pb-4 font-medium">Total Amount</th>
                <th className="pb-4 font-medium">Order Date</th>
                <th className="pb-4 font-medium">Status</th>
                <th className="pb-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="py-4">
                    <div className="flex items-center">
                      <img 
                        src={order.agent.avatar} 
                        alt={order.agent.name} 
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <span className="font-medium text-gray-900">{order.agent.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-gray-700">{order.item}</td>
                  <td className="py-4 text-gray-700">{order.quantity}</td>
                  <td className="py-4 font-medium text-gray-900">GHS {order.totalAmount.toFixed(2)}</td>
                  <td className="py-4 text-gray-500">{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-500">
              Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, filteredOrders.length)} of {filteredOrders.length} orders
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${
                  currentPage === 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOrders;