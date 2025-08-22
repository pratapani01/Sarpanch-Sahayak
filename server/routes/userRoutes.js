const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

// @route   POST /api/users/register
// @desc    Register a new user
router.post('/register', async (req, res) => {
  console.log('--- ENTERED /api/users/register ROUTE ---');
  try {
    const { name, email, password } = req.body;
    console.log('Request body received:', { name, email });

    console.log('Step 1: Checking if user exists...');
    let user = await User.findOne({ email });
    if (user) {
      console.log('Result: User found. Aborting registration.');
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    console.log('Result: User does not exist. Proceeding.');

    user = new User({ name, email, password });

    console.log('Step 2: Hashing password...');
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    console.log('Result: Password hashed.');

    console.log('Step 3: Saving user to database...');
    await user.save();
    console.log('Result: User saved successfully.');

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('!!! CRITICAL ERROR IN REGISTER ROUTE !!!:', error);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/users/login
// @desc    Login a user and get a token
router.post('/login', async (req, res) => {
  console.log('--- ENTERED /api/users/login ROUTE ---');
  try {
    const { email, password } = req.body;
    console.log('Request body received:', { email });

    console.log('Step 1: Finding user in database...');
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Result: User not found.');
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    console.log('Result: User found.');

    console.log('Step 2: Comparing passwords...');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Result: Passwords do not match.');
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    console.log('Result: Passwords match.');

    console.log('Step 3: Creating JWT...');
    const payload = {
      user: { id: user.id, role: user.role },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5h' },
      (err, token) => {
        if (err) throw err;
        console.log('Result: JWT created successfully.');
        res.json({ token });
      }
    );
  } catch (error) {
    console.error('!!! CRITICAL ERROR IN LOGIN ROUTE !!!:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;