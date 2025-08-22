const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Our new auth middleware
const upload = require('../middleware/upload'); // Our multer middleware
const cloudinary = require('../config/cloudinary'); // Our cloudinary config
const Complaint = require('../models/Complaint'); // Complaint model

// @route   POST /api/complaints
// @desc    Submit a new complaint
// @access  Private
router.post(
  '/',
  [auth, upload.single('image')], // Use both middleware
  async (req, res) => {
    try {
      // 1. Check if an image was uploaded
      if (!req.file) {
        return res.status(400).json({ message: 'Image is required' });
      }

      // 2. Upload image to Cloudinary from memory buffer
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'sarpanch_sahayak' }, // Optional: saves to a specific folder
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(req.file.buffer);
      });
      
      // 3. Get other data from the request body
      const { category, description, latitude, longitude } = req.body;
      
      // 4. Create a new complaint object
      const newComplaint = new Complaint({
        submittedBy: req.user.id, // Get user ID from the auth middleware
        category,
        description,
        imageUrl: result.secure_url, // Get the image URL from Cloudinary
        location: {
          latitude,
          longitude,
        },
      });

      // 5. Save the complaint to the database
      const complaint = await newComplaint.save();

      res.status(201).json(complaint);
    } catch (err) {
      console.error('Error submitting complaint:', err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;