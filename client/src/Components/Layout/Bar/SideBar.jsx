import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiMessageSquare, 
  FiUsers, 
  FiSettings,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight 
} from 'react-icons/fi';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const location = useLocation();

const navItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/messages', icon: FiMessageSquare, label: 'Messages' },
    { path: '/contacts', icon: FiUsers, label: 'Contacts' },
    { path: '/settings', icon: FiSettings, label: 'Settings' },
];

  return (
    <aside className={`bg-gray-800 text-white h-screen flex flex-col ${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 ease-in-out`}>
      {/* Sidebar Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        {!isCollapsed && (
          <h1 className="text-xl font-bold whitespace-nowrap">Admin Dashboard</h1>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-full hover:bg-gray-700"
        >
          {isCollapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => `
                  flex items-center p-3 rounded-lg transition-colors
                  ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'}
                  ${isCollapsed ? 'justify-center' : ''}
                `}
              >
                <item.icon className="flex-shrink-0" size={20} />
                {!isCollapsed && <span className="ml-3 whitespace-nowrap">{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className={`p-4 border-t border-gray-700 ${isCollapsed ? 'flex justify-center' : ''}`}>
        <button className="flex items-center text-gray-300 hover:text-white transition-colors">
          <FiLogOut size={20} />
          {!isCollapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;