import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  baseURL: 'https://sarpanch-sahayak-api.onrender.com/api', // Your backend server URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;