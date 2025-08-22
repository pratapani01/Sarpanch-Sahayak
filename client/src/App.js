import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Add Navigate
//import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage'; // Import the new HomePage
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

// ... imports

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Updated Protected Routes */}
          <Route element={<PrivateRoute />}>
            {/* Redirect /dashboard to /dashboard/all by default */}
            <Route path="/dashboard" element={<Navigate to="/dashboard/all" replace />} />
            <Route path="/dashboard/:status" element={<Dashboard />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;