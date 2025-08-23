import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MyComplaints from './pages/MyComplaints';
import ComplaintDetail from './pages/ComplaintDetail'; // 1. Import the new page
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Navigate to="/dashboard/all" replace />} />
            <Route path="/dashboard/:status" element={<Dashboard />} />
            <Route path="/my-complaints" element={<MyComplaints />} />
            {/* 2. Add the new route with a dynamic ID */}
            <Route path="/complaint/:id" element={<ComplaintDetail />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;