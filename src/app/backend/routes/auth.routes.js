// // auth.routes.js
// const express = require('express');
// const router = express.Router();
// const User = require('../models/user'); // Import your User model

// router.post('/authenticate', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     // Find the user by username
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Directly compare the provided password with the stored plain text password
//     if (password !== user.password) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // If the user is an admin, return isAdmin as true
//     res.json({ isAdmin: user.role === 'admin' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;



// auth.routes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import your User model

router.post('/authenticate', async (req, res) => {
  const { username, password } = req.body;

  console.log('Request body:', req.body); // Log incoming request data

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    console.log('User from database:', user); // Log user data from database

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Directly compare the provided password with the stored plain text password
    if (password !== user.password) {
        console.log('Provided password:', password); // Check this
        console.log('Stored password:', user.password); // Check this
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      

    // If the user is an admin, return isAdmin as true
    res.json({ isAdmin: user.role === 'admin' });
  } catch (error) {
    console.error('Server error:', error); // Log any server errors
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
