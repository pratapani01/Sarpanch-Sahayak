import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. useNavigate ko import karein
import api from '../services/api';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate(); // 2. Hook ko initialize karein

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = {
        email,
        password,
      };

      const res = await api.post('/users/login', user);

      console.log('Login successful! Token:', res.data.token);
      localStorage.setItem('token', res.data.token);
      
      // 3. Alert ki jagah, user ko dashboard par redirect karein
      navigate('/dashboard'); 

    } catch (err) {
      if (err.response) {
        console.error('Login error:', err.response.data);
        alert('Error: ' + err.response.data.message);
      } else {
        console.error('Network or other error:', err.message);
        alert('Network Error: Could not connect to the server.');
      }
    }
  };

  // ... baaki ka form code waisa hi rahega ...
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login to Your Account</h2>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;