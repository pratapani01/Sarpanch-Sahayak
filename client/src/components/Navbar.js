import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Check if token exists

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from storage
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Sarpanch Sahayak
        </Link>
        <div className="space-x-4">
          {token ? (
            // If user is logged in (token exists)
            <>
              <Link to="/dashboard" className="text-gray-300 hover:text-white">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="text-gray-300 hover:text-white">
                Logout
              </button>
            </>
          ) : (
            // If user is logged out (no token)
            <>
              <Link to="/register" className="text-gray-300 hover:text-white">
                Register
              </Link>
              <Link to="/login" className="text-gray-300 hover:text-white">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;