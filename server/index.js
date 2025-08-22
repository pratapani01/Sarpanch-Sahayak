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

// CORS configuration to allow requests from your live frontend
const corsOptions = {
  origin: [
    'https://sarpanch-sahayak.vercel.app', // For the live site
    'http://localhost:3000'                 // For local development
  ],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());

// Set the port for Render's environment, default to 5000 for local dev
const PORT = process.env.PORT || 5000;

// Root route (can also serve as a health check)
app.get('/', (req, res) => {
  res.json({ message: "Welcome to the Sarpanch Sahayak API! Status: Healthy" });
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/complaints', complaintRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});