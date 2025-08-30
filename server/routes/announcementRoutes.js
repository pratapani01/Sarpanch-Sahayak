const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const cloudinary = require('../config/cloudinary');
const Announcement = require('../models/Announcement');

// @route   GET /api/announcements
// @desc    Get all active announcements
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Fetch announcements that are currently active
    const announcements = await Announcement.find({
      $or: [
        { endDate: { $exists: false } }, // Announcements with no end date
        { endDate: { $gte: new Date() } }, // Announcements whose end date is in the future
      ],
    }).sort({ createdAt: -1 }); // Show newest first
    res.json(announcements);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/announcements
// @desc    Create a new announcement
// @access  Private (Sarpanch only)
router.post('/', [auth, upload.single('image')], async (req, res) => {
  if (req.user.role !== 'sarpanch') {
    return res.status(403).json({ msg: 'User not authorized' });
  }

  try {
    const { title, description, startDate, endDate } = req.body;
    let imageUrl = '';

    // If an image is uploaded, send it to Cloudinary
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'sarpanch_sahayak_announcements' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(req.file.buffer);
      });
      imageUrl = result.secure_url;
    }

    const newAnnouncement = new Announcement({
      title,
      description,
      imageUrl,
      startDate,
      endDate,
      postedBy: req.user.id,
    });

    const announcement = await newAnnouncement.save();
    res.status(201).json(announcement);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// We can add DELETE and UPDATE routes here later if needed.

module.exports = router;