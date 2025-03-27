import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Package, ShoppingCart, Activity, ArrowUp, ArrowDown, DollarSign, X, CheckCircle, Clock, AlertTriangle, Truck } from 'lucide-react';

// Union type for modal content
type ModalContentType = InventoryItem | AgentCommodity | AgentOrder | null;

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  price: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  lastUpdated: string;
  image: string;
}

interface AgentCommodity {
  id: number;
  productName: string;
  image: string;
  agentName: string;
  agentAvatar: string;
  price: number;
  quantity: number;
  unit: string;
  dateAdded: string;
  status: 'Available' | 'Pending' | 'Sold';
  description: string;
}

interface OrderRequest {
  id: number;
  itemName: string;
  quantity: number;
  requestedBy: string;
  requestDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  priority: 'High' | 'Medium' | 'Low';
}

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
  status: 'Completed' | 'Processing' | 'Cancelled';
}

const inventory: InventoryItem[] = [
  {
    id: 1,
    name: 'Fertilizer NPK',
    category: 'Fertilizers',
    quantity: 500,
    unit: 'kg',
    price: 45.99,
    status: 'In Stock',
    lastUpdated: '2024-03-20',
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80'
  },
  {
    id: 2,
    name: 'Pesticide X-100',
    category: 'Pesticides',
    quantity: 50,
    unit: 'liters',
    price: 89.99,
    status: 'Low Stock',
    lastUpdated: '2024-03-19',
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80'
  },
  {
    id: 3,
    name: 'Organic Compost',
    category: 'Fertilizers',
    quantity: 0,
    unit: 'kg',
    price: 29.99,
    status: 'Out of Stock',
    lastUpdated: '2024-03-18',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80'
  },
  {
    id: 4,
    name: 'Herbicide Z-200',
    category: 'Herbicides',
    quantity: 150,
    unit: 'liters',
    price: 59.99,
    status: 'In Stock',
    lastUpdated: '2024-03-22',
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80'
  },
  {
    id: 5,
    name: 'Soil Conditioner',
    category: 'Conditioners',
    quantity: 300,
    unit: 'kg',
    price: 39.99,
    status: 'Low Stock',
    lastUpdated: '2024-03-21',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80'
  }
];

const agentCommodities: AgentCommodity[] = [
  {
    id: 1,
    productName: 'Fresh Tomatoes',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80',
    agentName: 'Sarah Chen',
    agentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    price: 3.99,
    quantity: 200,
    unit: 'kg',
    dateAdded: '2024-03-22',
    status: 'Available',
    description: 'Organically grown fresh tomatoes from local farms. Perfect for salads and cooking.'
  },
  {
    id: 2,
    productName: 'Maize',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80',
    agentName: 'Michael Johnson',
    agentAvatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    price: 2.50,
    quantity: 500,
    unit: 'kg',
    dateAdded: '2024-03-21',
    status: 'Pending',
    description: 'High-quality maize harvested from sustainable farming practices. Great for animal feed and processing.'
  },
  {
    id: 3,
    productName: 'Coffee Beans',
    image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80',
    agentName: 'Emma Wilson',
    agentAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    price: 12.99,
    quantity: 100,
    unit: 'kg',
    dateAdded: '2024-03-20',
    status: 'Available',
    description: 'Premium Arabica coffee beans from highland farms. Medium roast with rich flavor profile.'
  },
  {
    id: 4,
    productName: 'Organic Rice',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80',
    agentName: 'David Lee',
    agentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    price: 4.75,
    quantity: 350,
    unit: 'kg',
    dateAdded: '2024-03-23',
    status: 'Available',
    description: 'Locally grown organic rice. Pesticide-free and sustainably farmed with traditional methods.'
  },
  {
    id: 5,
    productName: 'Fresh Cassava',
    image: 'https://images.unsplash.com/photo-1598030304671-5aa1d6f13fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80',
    agentName: 'Amara Okafor',
    agentAvatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    price: 1.99,
    quantity: 450,
    unit: 'kg',
    dateAdded: '2024-03-24',
    status: 'Pending',
    description: 'Freshly harvested cassava roots. High quality and perfect for various traditional dishes.'
  }
];

const requests: OrderRequest[] = [
  {
    id: 1,
    itemName: 'Fertilizer NPK',
    quantity: 100,
    requestedBy: 'Sarah Chen',
    requestDate: '2024-03-20',
    status: 'Pending',
    priority: 'High'
  },
  {
    id: 2,
    itemName: 'Pesticide X-100',
    quantity: 25,
    requestedBy: 'Michael Johnson',
    requestDate: '2024-03-19',
    status: 'Approved',
    priority: 'Medium'
  }
];

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
  }
];

interface AgentOrderStats {
  totalOrders: number;
  totalSpent: number;
  completedOrders: number;
  processingOrders: number;
  cancelledOrders: number;
  inTransitOrders: number;
  deliveredOrders: number;
  lastOrderDate: string | null;
}

const calculateAgentOrderStats = (orders: AgentOrder[]): AgentOrderStats => {
  const stats: AgentOrderStats = {
    totalOrders: orders.length,
    totalSpent: 0,
    completedOrders: 0,
    processingOrders: 0,
    cancelledOrders: 0,
    inTransitOrders: 0,
    deliveredOrders: 0,
    lastOrderDate: null
  };

  // Calculate statistics
  orders.forEach(order => {
    // Add to total spent
    stats.totalSpent += order.totalAmount;

    // Count by status
    switch (order.status) {
      case 'Completed':
        stats.completedOrders++;
        break;
      case 'Processing':
        stats.processingOrders++;
        break;
      case 'Cancelled':
        stats.cancelledOrders++;
        break;
      case 'In Transit':
        stats.inTransitOrders++;
        break;
      case 'Delivered':
        stats.deliveredOrders++;
        break;
    }
  });

  // Find the most recent order date
  if (orders.length > 0) {
    const sortedOrders = [...orders].sort((a, b) => 
      new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
    );
    stats.lastOrderDate = sortedOrders[0].orderDate;
  }

  return stats;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'In Stock':
      return 'bg-green-100 text-green-800';
    case 'Low Stock':
      return 'bg-yellow-100 text-yellow-800';
    case 'Out of Stock':
      return 'bg-red-100 text-red-800';
    case 'Completed':
      return 'bg-green-100 text-green-800';
    case 'Processing':
      return 'bg-blue-100 text-blue-800';
    case 'Cancelled':
      return 'bg-gray-100 text-gray-800';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'Approved':
      return 'bg-green-100 text-green-800';
    case 'Rejected':
      return 'bg-red-100 text-red-800';
    case 'Available':
      return 'bg-green-100 text-green-800';
    case 'Sold':
      return 'bg-blue-100 text-blue-800';
    case 'In Transit':
      return 'bg-indigo-100 text-indigo-800';
    case 'Delivered':
      return 'bg-teal-100 text-teal-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const Commodities = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('inventory');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCommodity, setSelectedCommodity] = useState<ModalContentType>(null);
  
  const openCommodityModal = (item: ModalContentType) => {
    console.log('Opening modal for item:', item);
    setSelectedCommodity(item);
    setIsModalOpen(true);
  };

  // Log modal state changes for debugging
  useEffect(() => {
    console.log('Modal open state changed:', isModalOpen);
  }, [isModalOpen]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Commodities</h1>
      
      {/* Horizontal tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex space-x-4">
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'inventory'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('inventory')}
          >
            <div className="flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Inventory
            </div>
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'requests'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('requests')}
          >
            <div className="flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
              New Requests
            </div>
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'orders'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('orders')}
          >
            <div className="flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Order Activity
            </div>
          </button>
        </div>
      </div>
      
      {/* Main content area */}
      <div>


      {/* Commodity Detail Modal */}
      {isModalOpen && selectedCommodity && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" 
          onClick={() => {
            console.log('Modal backdrop clicked, closing modal');
            setIsModalOpen(false);
          }}
        >
          <div 
            className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 relative" 
            onClick={(e) => {
              console.log('Modal content clicked, preventing propagation');
              e.stopPropagation();
            }}
          >
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="flex flex-col md:flex-row gap-6">
              {/* Inventory Item or Agent Commodity */}
              {'image' in selectedCommodity && (
                <div className="md:w-1/2">
                  <img 
                    src={selectedCommodity.image} 
                    alt={'name' in selectedCommodity ? selectedCommodity.name : 'productName' in selectedCommodity ? selectedCommodity.productName : 'Item'}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}
              
              <div className="md:w-1/2">
                {/* Title based on item type */}
                {'name' in selectedCommodity && (
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedCommodity.name}</h2>
                )}
                {'productName' in selectedCommodity && (
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedCommodity.productName}</h2>
                )}
                {'item' in selectedCommodity && (
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedCommodity.item}</h2>
                )}
                
                {/* Agent info for AgentCommodity */}
                {'agentName' in selectedCommodity && (
                  <div className="flex items-center mb-4">
                    <img 
                      src={selectedCommodity.agentAvatar} 
                      alt={selectedCommodity.agentName}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="text-gray-700">Supplied by {selectedCommodity.agentName}</span>
                  </div>
                )}
                
                {/* Agent info for AgentOrder */}
                {'agent' in selectedCommodity && (
                  <div className="flex items-center mb-4">
                    <img 
                      src={selectedCommodity.agent.avatar} 
                      alt={selectedCommodity.agent.name}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="text-gray-700">Ordered by {selectedCommodity.agent.name}</span>
                  </div>
                )}
                
                <div className="space-y-3 mb-4">
                  {/* Price info */}
                  {'price' in selectedCommodity && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-medium text-gray-900">
                        GHS {selectedCommodity.price}
                        {'unit' in selectedCommodity ? ` per ${selectedCommodity.unit}` : ''}
                      </span>
                    </div>
                  )}
                  
                  {/* Total Amount for orders */}
                  {'totalAmount' in selectedCommodity && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Amount:</span>
                      <span className="font-medium text-gray-900">GHS {selectedCommodity.totalAmount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  {/* Quantity info */}
                  {'quantity' in selectedCommodity && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quantity:</span>
                      <span className="font-medium text-gray-900">
                        {selectedCommodity.quantity} 
                        {'unit' in selectedCommodity ? selectedCommodity.unit : ''}
                      </span>
                    </div>
                  )}
                  
                  {/* Date info */}
                  {'lastUpdated' in selectedCommodity && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Updated:</span>
                      <span className="font-medium text-gray-900">{new Date(selectedCommodity.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  )}
                  
                  {'dateAdded' in selectedCommodity && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date Added:</span>
                      <span className="font-medium text-gray-900">{new Date(selectedCommodity.dateAdded).toLocaleDateString()}</span>
                    </div>
                  )}
                  
                  {'orderDate' in selectedCommodity && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order Date:</span>
                      <span className="font-medium text-gray-900">{new Date(selectedCommodity.orderDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  
                  {/* Category for inventory items */}
                  {'category' in selectedCommodity && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium text-gray-900">{selectedCommodity.category}</span>
                    </div>
                  )}
                  
                  {/* Status - only show for InventoryItem and AgentOrder, not for AgentCommodity */}
                  {('status' in selectedCommodity && !('agentName' in selectedCommodity)) && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedCommodity.status)}`}>
                        {selectedCommodity.status}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Description for AgentCommodity */}
                {'description' in selectedCommodity && (
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-700">{selectedCommodity.description}</p>
                  </div>
                )}
                
                <div className="flex space-x-3">
                  <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                    Contact Agent
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex space-x-4">
            {activeTab === 'inventory' && (
              <>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  <option value="Fertilizers">Fertilizers</option>
                  <option value="Pesticides">Pesticides</option>
                </select>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </>
            )}
          </div>
        </div>

        {activeTab === 'inventory' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
                  <th className="pb-4 font-medium">Image</th>
                  <th className="pb-4 font-medium">Item Name</th>
                  <th className="pb-4 font-medium">Category</th>
                  <th className="pb-4 font-medium">Quantity</th>
                  <th className="pb-4 font-medium">Price</th>
                  <th className="pb-4 font-medium">Status</th>
                  <th className="pb-4 font-medium">Last Updated</th>
                  <th className="pb-4 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr 
                    key={item.id} 
                    className="border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-50"
                    onClick={() => openCommodityModal(item)}
                  >
                    <td className="py-4">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-12 h-12 rounded-md object-cover"
                      />
                    </td>
                    <td className="py-4">
                      <span className="font-medium text-gray-900">{item.name}</span>
                    </td>
                    <td className="py-4 text-gray-500">{item.category}</td>
                    <td className="py-4">
                      <span className="font-medium text-gray-900">
                        {item.quantity} {item.unit}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="font-medium text-gray-900">
                        GHS {item.price}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 text-gray-500">
                      {new Date(item.lastUpdated).toLocaleDateString()}
                    </td>
                    <td className="py-4">
                      <button 
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click event
                        }}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}


        {activeTab === 'requests' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
                  <th className="pb-4 font-medium">Image</th>
                  <th className="pb-4 font-medium">Product Name</th>
                  <th className="pb-4 font-medium">Agent</th>
                  <th className="pb-4 font-medium">Price</th>
                  <th className="pb-4 font-medium">Quantity</th>
                  <th className="pb-4 font-medium">Date Added</th>
                  <th className="pb-4 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {agentCommodities.map((commodity) => (
                  <tr 
                    key={commodity.id} 
                    className="border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-50"
                    onClick={() => openCommodityModal(commodity)}
                  >
                    <td className="py-4">
                      <img 
                        src={commodity.image} 
                        alt={commodity.productName} 
                        className="w-12 h-12 rounded-md object-cover cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => openCommodityModal(commodity)}
                      />
                    </td>
                    <td className="py-4">
                      <span 
                        className="font-medium text-gray-900 cursor-pointer hover:text-blue-600"
                        onClick={() => openCommodityModal(commodity)}
                      >
                        {commodity.productName}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <img 
                          src={commodity.agentAvatar} 
                          alt={commodity.agentName} 
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <span className="text-gray-700">{commodity.agentName}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="font-medium text-gray-900">
                        GHS {commodity.price}/{commodity.unit}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="font-medium text-gray-900">
                        {commodity.quantity} {commodity.unit}
                      </span>
                    </td>
                    <td className="py-4 text-gray-500">
                      {new Date(commodity.dateAdded).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Calculate and display agent order statistics */}
              {(() => {
                const stats = calculateAgentOrderStats(orders);
                return (
                  <>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-medium text-gray-900">Total Orders</h3>
                        <ShoppingCart className="w-6 h-6 text-blue-500" />
                      </div>
                      <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
                      <p className="text-sm text-gray-500 mt-1">All time purchases</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-medium text-gray-900">Total Purchase Value</h3>
                        <DollarSign className="w-6 h-6 text-green-500" />
                      </div>
                      <p className="text-3xl font-bold text-gray-900">GHS {stats.totalSpent.toFixed(2)}</p>
                      <p className="text-sm text-gray-500 mt-1">Total value of all orders</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-medium text-gray-900">Completed</h3>
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      </div>
                      <p className="text-3xl font-bold text-gray-900">{stats.completedOrders + stats.deliveredOrders}</p>
                      <p className="text-sm text-gray-500 mt-1">Delivered orders</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-medium text-gray-900">Processing</h3>
                        <Clock className="w-6 h-6 text-blue-500" />
                      </div>
                      <p className="text-3xl font-bold text-gray-900">{stats.processingOrders}</p>
                      <p className="text-sm text-gray-500 mt-1">Orders being processed</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-medium text-gray-900">In Transit</h3>
                        <Truck className="w-6 h-6 text-indigo-500" />
                      </div>
                      <p className="text-3xl font-bold text-gray-900">{stats.inTransitOrders}</p>
                      <p className="text-sm text-gray-500 mt-1">Orders on the way</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-medium text-gray-900">Cancelled</h3>
                        <AlertTriangle className="w-6 h-6 text-red-500" />
                      </div>
                      <p className="text-3xl font-bold text-gray-900">{stats.cancelledOrders}</p>
                      <p className="text-sm text-gray-500 mt-1">Orders cancelled</p>
                    </div>
                    
                  </>
                );
              })()}
            </div>
            
            <div className="flex justify-between items-center mt-6 mb-3">
              <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
              <button 
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                onClick={() => navigate('/commodities/orders')}
              >
                View All
              </button>
            </div>
            <div className="space-y-4">
              {orders.map((order) => (
                <div 
                  key={order.id} 
                  className="flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-white cursor-pointer hover:bg-gray-50"
                  onClick={() => openCommodityModal(order)}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={order.agent.avatar}
                      alt={order.agent.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{order.agent.name}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="mr-4">{order.item}</span>
                        <span className="mr-4">Quantity: {order.quantity}</span>
                        <span>Total: GHS {order.totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
          </div>
      </div>
    </div>
  );
};

export default Commodities;
