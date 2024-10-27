// server.js
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const highScoreRoutes = require('./src/routes/highScoreRoutes');
const HighScore = require('./src/models/HighScore')

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use Routes
app.use(highScoreRoutes);

app.get('/getscores', (req, res) => {
    HighScore.find()
    .then(scores => res.json(scores))
    .catch(err => res.json(err))
})

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
