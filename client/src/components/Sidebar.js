import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  // Helper for styling the active link
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? 'bold' : 'normal',
      backgroundColor: isActive ? '#eef2ff' : '',
      color: isActive ? '#4f46e5' : '#4b5563',
    };
  };

  return (
    <div className="w-64 bg-white h-full shadow-md">
      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-800">Filter by Status</h2>
        <nav className="mt-5">
          <NavLink to="/dashboard/all" style={navLinkStyles} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100">
            All Complaints
          </NavLink>
          <NavLink to="/dashboard/pending" style={navLinkStyles} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100">
            Pending
          </NavLink>
          <NavLink to="/dashboard/in-progress" style={navLinkStyles} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100">
            In Progress
          </NavLink>
          <NavLink to="/dashboard/resolved" style={navLinkStyles} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100">
            Resolved
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;