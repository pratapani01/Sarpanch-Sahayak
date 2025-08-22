import React, { useState, useEffect, useRef } from 'react'; // Import useRef
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import useClickOutside from '../hooks/useClickOutside'; // Import the new hook

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const token = localStorage.getItem('token');

  const dropdownRef = useRef(null); // Create a ref for the dropdown
  useClickOutside(dropdownRef, () => setIsDropdownOpen(false)); // Use the hook

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken.user);
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
      }
    } else {
      setUser(null);
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsDropdownOpen(false);
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to={user ? "/dashboard/all" : "/"} className="text-white text-2xl font-bold">
          Sarpanch Sahayak
        </Link>
        <div className="space-x-6 flex items-center">
          {user ? (
            <>
              <Link to="/dashboard/all" className="text-gray-300 hover:text-white hidden md:block">
                Dashboard
              </Link>
              <div className="relative" ref={dropdownRef}> {/* Attach the ref */}
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center text-white">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 rounded-full bg-gray-600 p-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                    <div className="px-4 py-2 text-sm text-gray-700">
                      Signed in as... <br/>
                      <span className="font-semibold">{user.name}</span>
                    </div>
                    <div className="border-t border-gray-100"></div>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/register" className="text-gray-300 hover:text-white">Register</Link>
              <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;