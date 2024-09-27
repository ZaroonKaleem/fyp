// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const auctionRoutes = require('./routes/auctions.routes');
const PORT = process.env.PORT || 3000;

// Middleware
// app.use(bodyParser.json());

// Routes
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/auctions', auctionRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/FYP', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useCreateIndex: true,
})
.then(() => console.log('MongoDB connected'))
.catch((error) => console.log('MongoDB connection error:', error));


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
