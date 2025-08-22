import React, { useState, useEffect, useRef } from 'react'; // Import useRef
import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import SubmitComplaint from './SubmitComplaint';
import ComplaintList from '../components/ComplaintList';
import Sidebar from '../components/Sidebar';
import useClickOutside from '../hooks/useClickOutside'; // Import our custom hook

const Dashboard = () => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarRef = useRef(null); // Create a ref for the sidebar
  // Use the hook to close the sidebar when a click is detected outside of it
  useClickOutside(sidebarRef, () => setSidebarOpen(false));

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
      <div className="relative flex h-[calc(100vh-64px)]"> {/* Main container */}
        <div ref={sidebarRef}>
          <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(false)} />
        </div>
        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          {/* Hamburger Button that is always visible for toggling */}
          <div className="md:hidden">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-4 text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
          <ComplaintList />
        </div>
        {/* Optional: Add an overlay when sidebar is open on mobile */}
        {sidebarOpen && <div className="md:hidden fixed inset-0 bg-black opacity-50 z-20" onClick={() => setSidebarOpen(false)}></div>}
      </div>
    );
  
  } else if (userRole === 'citizen') {
    return <SubmitComplaint />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default Dashboard;