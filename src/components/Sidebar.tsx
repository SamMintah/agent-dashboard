import React, { useState, useEffect } from 'react';
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
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [selectedSubmenuItem, setSelectedSubmenuItem] = useState<string | null>(null);

  useEffect(() => {
    // Auto-expand submenu if a submenu item is active, otherwise collapse
    let foundActiveSubmenu = false;
    
    menuItems.forEach(item => {
      if (item.hasSubmenu && item.submenuItems) {
        const isAnySubmenuActive = item.submenuItems.some((subItem: any) => 
          location.pathname === subItem.path || location.pathname.startsWith(subItem.path + '/')
        );
        
        if (isAnySubmenuActive) {
          setExpandedMenu(item.label);
          foundActiveSubmenu = true;
        }
      }
    });
    
    // If we navigated to a route that doesn't have an active submenu,
    // and it's not part of the currently expanded menu, collapse the menu
    if (!foundActiveSubmenu) {
      const currentExpandedItem = menuItems.find(item => item.label === expandedMenu);
      if (currentExpandedItem && !isActive(currentExpandedItem.path)) {
        setExpandedMenu(null);
        setSelectedMenu(null);
      }
    }
  }, [location.pathname]);

  const isActive = (path: string) => {
    // Exact match for root/dashboard
    if (path === '/') {
      return location.pathname === path;
    }
    
    // For other paths, ensure we don't get false positives from partial matches
    // For example, /agents shouldn't match /agentssomething
    if (path !== '/') {
      // Check if it's an exact match
      if (location.pathname === path) {
        return true;
      }
      
      // Check if it's a child route (has a slash after the path)
      return location.pathname.startsWith(path + '/');
    }
    
    return false;
  };

  const toggleSubmenu = (label: string, event: React.MouseEvent) => {
    event.preventDefault();
    setSelectedSubmenuItem(null);
    // Toggle selected menu: if already selected, clear it; otherwise, set to the clicked label
    setSelectedMenu(selectedMenu === label ? null : label);
    setExpandedMenu(expandedMenu === label ? null : label);
  };

  const isSubmenuActive = (item: any) => {
    if (item.hasSubmenu && item.submenuItems) {
      return item.submenuItems.some((subItem: any) => {
        // Exact match
        if (location.pathname === subItem.path) {
          return true;
        }
        
        // Child route match
        if (subItem.path !== '/' && location.pathname.startsWith(subItem.path + '/')) {
          return true;
        }
        
        return false;
      });
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
                    (!selectedSubmenuItem && (isSubmenuActive(item) || selectedMenu === item.label))
                      ? 'bg-blue-50 text-blue-600'
                      : 'hover:bg-blue-10 hover:text-blue-600'
                  }`}
                  onClick={(e) => toggleSubmenu(item.label, e)}
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
                        onClick={() => setSelectedSubmenuItem(subItem.label)}
                        className={`flex items-center w-full px-4 py-2 text-gray-700 rounded-lg transition-colors ${
                          selectedSubmenuItem === subItem.label
                            ? 'bg-blue-50 text-blue-600'
                            : 'hover:bg-blue-10 hover:text-blue-600'
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
                onClick={() => setSelectedMenu(item.label)}
                className={`flex items-center w-full px-4 py-3 text-gray-700 rounded-lg transition-colors ${
                  (isActive(item.path) && (!selectedMenu || selectedMenu === item.label))
                    ? 'bg-blue-50 text-blue-600'
                    : 'hover:bg-blue-10 hover:text-blue-600'
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
          onClick={() => setSelectedMenu('Settings')}
          className={`flex items-center w-full px-4 py-3 text-gray-700 rounded-lg transition-colors ${
            (isActive('/settings') && (!selectedMenu || selectedMenu === 'Settings'))
              ? 'bg-blue-50 text-blue-600' 
              : 'hover:bg-blue-10 hover:text-blue-600'
          }`}
        >
          <Settings className="w-5 h-5 mr-3" />
          <span className="font-medium">Settings</span>
        </Link>
        <Link
          to="/help"
          onClick={() => setSelectedMenu('Help')}
          className={`flex items-center w-full px-4 py-3 text-gray-700 rounded-lg transition-colors ${
            (isActive('/help') && (!selectedMenu || selectedMenu === 'Help'))
              ? 'bg-blue-50 text-blue-600' 
              : 'hover:bg-blue-10 hover:text-blue-600'
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
