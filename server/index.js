const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const complaintRoutes = require('./routes/complaintRoutes');

// Connect to the database
connectDB();

const app = express();

// Enable CORS to allow your frontend to communicate with the backend
const corsOptions = {
  origin: [
    'http://localhost:3000', // For your local machine
    'https://sarpanch-sahayak.vercel.app' // Your live frontend URL
  ],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
// Middleware to accept JSON data in requests
app.use(express.json());

const PORT = process.env.PORT || 5000;

// A simple test route
app.get('/', (req, res) => {
  res.json({ message: "Welcome to the Sarpanch Sahayak API!" });
});

// Use the user routes for any URL starting with /api/users
app.use('/api/users', userRoutes);

app.use('/api/users', userRoutes);
app.use('/api/complaints', complaintRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});