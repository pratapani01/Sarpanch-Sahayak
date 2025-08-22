import React from 'react';
import { NavLink } from 'react-router-dom';

// The component now accepts props to handle being open/closed
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navLinkStyles = ({ isActive }) => ({
    fontWeight: isActive ? 'bold' : 'normal',
    backgroundColor: isActive ? '#eef2ff' : '',
    color: isActive ? '#4f46e5' : '#4b5563',
  });

  return (
    // Use transform and transition for a smooth slide-in effect
    // The sidebar is hidden off-screen on mobile by default (`-translate-x-full`)
    // It becomes visible when `isOpen` is true
    // On medium screens and larger (`md:`), it's always visible
    <div
      className={`fixed inset-y-0 left-0 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-white h-full shadow-md z-30`}
    >
      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-800">Filter by Status</h2>
        <nav className="mt-5">
          {/* When a link is clicked, close the sidebar on mobile */}
          <NavLink onClick={toggleSidebar} to="/dashboard/all" style={navLinkStyles} className="block py-2.5 px-4 rounded">
            All Complaints
          </NavLink>
          <NavLink onClick={toggleSidebar} to="/dashboard/pending" style={navLinkStyles} className="block py-2.5 px-4 rounded">
            Pending
          </NavLink>
          <NavLink onClick={toggleSidebar} to="/dashboard/in-progress" style={navLinkStyles} className="block py-2.5 px-4 rounded">
            In Progress
          </NavLink>
          <NavLink onClick={toggleSidebar} to="/dashboard/resolved" style={navLinkStyles} className="block py-2.5 px-4 rounded">
            Resolved
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;