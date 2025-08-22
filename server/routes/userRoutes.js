const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User.js'); // Dekhiye, yahan hum aapki banayi hui User.js file ko use kar rahe hain
const jwt = require('jsonwebtoken'); // Make sure to require this at the top of the file
// @route   POST /api/users/register
// @desc    Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Create a new user instance
    user = new User({
      name,
      email,
      password,
    });

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: 'User registered successfully!' });

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});



// ... your existing /register route is here ...

// @route   POST /api/users/login
// @desc    Login a user and get a token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 2. Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 3. If passwords match, create a JWT
    const payload = {
      user: {
        id: user.id,
        role: user.role, // We can include the role for frontend logic
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5h' }, // Token expires in 5 hours
      (err, token) => {
        if (err) throw err;
        res.json({ token }); // Send the token to the client
      }
    );

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;