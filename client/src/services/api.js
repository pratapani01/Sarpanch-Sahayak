import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  baseURL: 'https://sarpanch-sahayak-api.onrender.com', // Your backend server URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;