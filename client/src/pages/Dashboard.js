import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import SubmitComplaint from './SubmitComplaint'; // Citizen's view
import ComplaintList from '../components/ComplaintList'; // Sarpanch's view

const Dashboard = () => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        // Token se user ka role nikalein
        setUserRole(decodedToken.user.role); 
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
    setLoading(false);
  }, []);

  // Jab tak role load ho raha hai, loading message dikhayein
  if (loading) {
    return <div className="text-center p-10">Loading Dashboard...</div>;
  }

  // Role ke aadhar par sahi component dikhayein
  if (userRole === 'sarpanch') {
    return <ComplaintList />;
  } else if (userRole === 'citizen') {
    return <SubmitComplaint />;
  } else {
    // Agar kisi wajah se role nahi milta, toh ek error message dikhayein
    return <div className="text-center p-10 text-red-500">Could not determine user role. Please log in again.</div>;
  }
};

export default Dashboard;