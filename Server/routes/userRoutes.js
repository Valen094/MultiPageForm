const express = require('express');
const User = require('../models/Users');
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/', async (req, res) => {
  try {
    // console.log("Data received in the backend:", req.body);

    const { name, age, email, address } = req.body;

    if (!name || !age || !email || !address) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newUser = new User({ name, age, email, address });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'Error saving user', error: error.message });
  }
});

module.exports = router;
