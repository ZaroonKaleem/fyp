// routes/user.routes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// POST route to create a new user
router.post('/users', async (req, res) => {
    try {
      const { userid, password, username, role } = req.body;
  
      // Check if all fields are provided
      if (!userid || !password || !username || !role) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const newUser = new User({
        userid,
        password,
        username,
        role
      });
  
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

  router.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  });

module.exports = router;
