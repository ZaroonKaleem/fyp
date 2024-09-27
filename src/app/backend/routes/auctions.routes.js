// // routes/auction.routes.js

// const express = require('express');
// const multer = require('multer');
// const Auction = require('../models/auctions');
// const router = express.Router();

// // Multer setup to handle image file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads'); // folder where images are stored
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname); // unique file names
//   },
// });

// const upload = multer({ storage: storage });

// // // Route to create a new auction
// // router.post('/add', upload.single('productImage'), async (req, res) => {
// //   try {
// //     const { name, startingPrice, description, duration } = req.body;
// //     const productImage = req.file.path; // Path where the image is stored

// //     const Auction = new Auction({
// //         name: req.body.name,
// //         description: req.body.description,
// //         startingPrice: req.body.startingPrice,
// //         duration: req.body.duration,
// //         // productImage: `http://localhost:3000/uploads/${req.file.filename}`, // Set the full URL to access the image
// //       });

// //     await Auction.save();
// //     res.status(201).json({ message: 'Auction created successfully', Auction });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Error creating auction', error });
// //   }
// // });

// router.post('/add', upload.single('productImage'), async (req, res) => {
//   try {
//     // Validate the file is uploaded
//     if (!req.file) {
//       return res.status(400).json({ message: 'No image file uploaded' });
//     }

//     const { name, startingPrice, description, duration } = req.body;
//     const productImage = `http://localhost:3000/uploads/${req.file.filename}`;

//     const newAuction = new Auction({
//       name,
//       description,
//       startingPrice,
//       duration,
//       productImage,
//     });

//     await newAuction.save();
//     res.status(201).json({ message: 'Auction created successfully', newAuction });
//   } catch (error) {
//     console.error('Error creating auction:', error);  // Log the error
//     res.status(500).json({ message: 'Error creating auction', error });
//   }
// });



// router.get('/all', async (req, res) => {
//     try {
//       const auctions = await Auction.find(); // Fetch all auctions from MongoDB
//       res.status(200).json(auctions);        // Send the auctions back to the frontend
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching auctions', error });
//     }
//   });


// module.exports = router;


const express = require('express');
const multer = require('multer');
const Auction = require('../models/auctions'); // Ensure Auction model is imported
const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // folder where images are stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // unique file names
  },
});

const upload = multer({ storage: storage });

// Route to create a new auction
router.post('/add', upload.single('productImage'), async (req, res) => {
  try {
    // Validate the file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }

    const { name, startingPrice, description, duration } = req.body;
    const productImage = `http://localhost:3000/uploads/${req.file.filename}`;

    const newAuction = new Auction({
      name,
      description,
      startingPrice,
      duration,
      productImage,
    });

    await newAuction.save();
    res.status(201).json({ message: 'Auction created successfully', newAuction });
  } catch (error) {
    console.error('Error creating auction:', error); // Log the error
    res.status(500).json({ message: 'Error creating auction', error });
  }
});

// Route to fetch all auctions
router.get('/all', async (req, res) => {
  try {
    const auctions = await Auction.find(); // Fetch all auctions from MongoDB
    res.status(200).json(auctions);        // Send the auctions back to the frontend
  } catch (error) {
    res.status(500).json({ message: 'Error fetching auctions', error });
  }
});

// Route to delete an auction by its ID
router.delete('/:id', async (req, res) => {
  try {
    const auctionId = req.params.id;
    const deletedAuction = await Auction.findByIdAndDelete(auctionId);

    if (!deletedAuction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    res.status(200).json({ message: 'Auction deleted successfully', deletedAuction });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting auction', error });
  }
});

module.exports = router;
