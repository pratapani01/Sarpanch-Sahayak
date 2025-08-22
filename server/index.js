const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const complaintRoutes = require('./routes/complaintRoutes');

// --- DEBUGGING LOGS START ---
console.log("Starting server...");
console.log(`MONGO_URI Loaded: ${process.env.MONGO_URI ? 'Yes' : 'No'}`);
console.log(`JWT_SECRET Loaded: ${process.env.JWT_SECRET ? 'Yes' : 'No'}`);
console.log(`CLOUDINARY_CLOUD_NAME Loaded: ${process.env.CLOUDINARY_CLOUD_NAME ? 'Yes' : 'No'}`);
// --- DEBUGGING LOGS END ---

// Connect to the database
connectDB();

const app = express();

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://sarpanch-sahayak.vercel.app'
  ],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.json({ message: "Welcome to the Sarpanch Sahayak API!" });
});

app.use('/api/users', userRoutes);
app.use('/api/complaints', complaintRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});