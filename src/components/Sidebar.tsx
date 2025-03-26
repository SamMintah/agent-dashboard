import React, { useState } from 'react';
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
  FileText,
  UserPlus,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { 
    icon: Users, 
    label: 'Agents', 
    path: '/agents',
    hasSubmenu: true,
    submenuItems: [
      { label: 'Active Agents', path: '/agents' },
      { label: 'Achieved Agents', path: '/agents/achieved' }
    ]
  },
  { icon: UserPlus, label: 'Recruitment', path: '/recruitment' },
  { icon: BookOpen, label: 'Training', path: '/training' },
  { icon: DollarSign, label: 'Financials', path: '/financials' },
  { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
  { icon: BarChart3, label: 'Performance', path: '/performance' },
  { icon: FileText, label: 'Reports', path: '/reports' },
  { icon: FileText, label: 'Commodities', path: '/commodities' },
];

const Sidebar = () => {
  const location = useLocation();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleSubmenu = (label: string) => {
    setExpandedMenu(expandedMenu === label ? null : label);
  };

  const isSubmenuActive = (item: any) => {
    if (item.hasSubmenu && item.submenuItems) {
      return item.submenuItems.some((subItem: any) => isActive(subItem.path));
    }
    return false;
  };

  return (
    <div className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200">
      <div className="p-6">
        <Link to="/" className="text-2xl font-bold text-blue-600">AgentHub</Link>
      </div>

      <nav className="flex-1 px-4">
        {menuItems.map((item, index) => (
          <div key={index}>
            {item.hasSubmenu ? (
              <div>
                <div
                  className={`flex items-center justify-between w-full px-4 py-3 text-gray-700 rounded-lg transition-colors cursor-pointer ${
                    isSubmenuActive(item) || expandedMenu === item.label
                      ? 'bg-blue-50 text-blue-600'
                      : 'hover:bg-blue-50 hover:text-blue-600'
                  }`}
                  onClick={() => toggleSubmenu(item.label)}
                >
                  <div className="flex items-center">
                    <item.icon className="w-5 h-5 mr-3" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {expandedMenu === item.label ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </div>
                {expandedMenu === item.label && item.submenuItems && (
                  <div className="ml-6 mt-1">
                    {item.submenuItems.map((subItem: any, subIndex: number) => (
                      <Link
                        key={subIndex}
                        to={subItem.path}
                        className={`flex items-center w-full px-4 py-2 text-gray-700 rounded-lg transition-colors ${
                          isActive(subItem.path)
                            ? 'bg-blue-50 text-blue-600'
                            : 'hover:bg-blue-50 hover:text-blue-600'
                        }`}
                      >
                        <span className="font-medium">{subItem.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
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
            )}
          </div>
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
