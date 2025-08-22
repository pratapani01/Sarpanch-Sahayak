import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import SubmitComplaint from './SubmitComplaint';
import ComplaintList from '../components/ComplaintList';
import Sidebar from '../components/Sidebar'; // Import the Sidebar

const Dashboard = () => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

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
    // Sarpanch gets the Sidebar + Complaint List layout
    return (
      <div className="flex h-[calc(100vh-64px)]"> {/* Full height minus navbar */}
        <Sidebar />
        <ComplaintList />
      </div>
    );
  } else if (userRole === 'citizen') {
    return <SubmitComplaint />;
  } else {
    // If no role, redirect to login
    return <Navigate to="/login" />;
  }
};

export default Dashboard;