const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const cloudinary = require('../config/cloudinary');
const Complaint = require('../models/Complaint');

// @route   POST /api/complaints
// @desc    Submit a new complaint
// @access  Private
router.post(
  '/',
  [auth, upload.single('image')],
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'Image is required' });
      }

      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'sarpanch_sahayak' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(req.file.buffer);
      });
      
      const { category, description, latitude, longitude } = req.body;
      
      const newComplaint = new Complaint({
        submittedBy: req.user.id,
        category,
        description,
        imageUrl: result.secure_url,
        location: {
          latitude,
          longitude,
        },
      });

      const complaint = await newComplaint.save();
      res.status(201).json(complaint);
    } catch (err) {
      console.error('Error submitting complaint:', err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET /api/complaints
// @desc    Get all complaints
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // Find all complaints and sort them by the newest first
    const complaints = await Complaint.find()
      .sort({ createdAt: -1 })
      .populate('submittedBy', 'name email'); // Get the name and email of the user who submitted

    res.json(complaints);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   PUT /api/complaints/:id/status
// @desc    Update the status of a complaint
// @access  Private (for Sarpanch)
router.put('/:id/status', auth, async (req, res) => {
  // We'll add a check here later to ensure only a sarpanch can do this
  if (req.user.role !== 'sarpanch') {
    return res.status(403).json({ message: 'User not authorized' });
  }

  try {
    const { status } = req.body;

    // Find the complaint by its ID
    let complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Update the status and save
    complaint.status = status;
    await complaint.save();

    // To return the updated complaint with user info, we need to populate it again
    complaint = await complaint.populate('submittedBy', 'name email');

    res.json(complaint);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;