import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import SubmitComplaint from './SubmitComplaint';
import ComplaintList from '../components/ComplaintList';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar visibility

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserRole(decodedToken.user.role);
      } catch (error) { console.error('Invalid token:', error); }
    }
    setLoading(false);
  }, []);

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  if (userRole === 'sarpanch') {
    return (
      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col">
          {/* Hamburger Button - only visible on mobile */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-4 text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <ComplaintList />
        </div>
      </div>
    );
  } else if (userRole === 'citizen') {
    return <SubmitComplaint />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default Dashboard;