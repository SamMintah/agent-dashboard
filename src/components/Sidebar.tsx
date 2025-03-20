import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  CheckSquare, 
  BarChart3,
  Settings,
  HelpCircle,
  Home,
  FileText
} from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Agents', path: '/agents' },
  { icon: BookOpen, label: 'Training', path: '/training' },
  { icon: DollarSign, label: 'Financials', path: '/financials' },
  { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
  { icon: BarChart3, label: 'Performance', path: '/performance' },
  { icon: FileText, label: 'Reports', path: '/reports' },
];

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200">
      <div className="p-6">
        <Link to="/" className="text-2xl font-bold text-blue-600">AgentHub</Link>
      </div>

      <nav className="flex-1 px-4">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center w-full px-4 py-3 text-gray-700 rounded-lg transition-colors ${
              isActive(item.path) 
                ? 'bg-blue-50 text-blue-600' 
                : 'hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <Link
          to="/settings"
          className={`flex items-center w-full px-4 py-3 text-gray-700 rounded-lg transition-colors ${
            isActive('/settings') 
              ? 'bg-blue-50 text-blue-600' 
              : 'hover:bg-blue-50 hover:text-blue-600'
          }`}
        >
          <Settings className="w-5 h-5 mr-3" />
          <span className="font-medium">Settings</span>
        </Link>
        <Link
          to="/help"
          className={`flex items-center w-full px-4 py-3 text-gray-700 rounded-lg transition-colors ${
            isActive('/help') 
              ? 'bg-blue-50 text-blue-600' 
              : 'hover:bg-blue-50 hover:text-blue-600'
          }`}
        >
          <HelpCircle className="w-5 h-5 mr-3" />
          <span className="font-medium">Help</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
