const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Contact = require('../models/Contact');

// @route   GET /api/contacts
// @desc    Get all contacts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ name: 1 }); // Sort alphabetically
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/contacts
// @desc    Add a new contact
// @access  Private (Sarpanch only)
router.post('/', auth, async (req, res) => {
  // Check if the user is a Sarpanch
  if (req.user.role !== 'sarpanch') {
    return res.status(403).json({ message: 'User not authorized' });
  }

  const { name, phone } = req.body;

  try {
    const newContact = new Contact({
      name,
      phone,
      addedBy: req.user.id,
    });

    const contact = await newContact.save();
    res.status(201).json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/contacts/:id
// @desc    Delete a contact
// @access  Private (Sarpanch only)
router.delete('/:id', auth, async (req, res) => {
  if (req.user.role !== 'sarpanch') {
    return res.status(403).json({ message: 'User not authorized' });
  }

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    await Contact.findByIdAndDelete(req.params.id);

    res.json({ message: 'Contact removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;