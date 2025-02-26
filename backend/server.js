const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const storiesRouter = require('./routes/stories');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/motivational-stories', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/api/stories', storiesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 