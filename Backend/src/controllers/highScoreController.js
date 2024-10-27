// controllers/highScoreController.js
const HighScore = require('../models/HighScore');

// Controller function to handle high score submissions
const saveHighScore = async (req, res) => {
  const { name, timeTaken, points } = req.body;
  try {
    const newScore = new HighScore({ name, timeTaken, points });
    await newScore.save();
    res.status(201).json({ message: 'Score saved successfully' });
  } catch (error) {
    console.error("Error saving score:", error);
    res.status(500).json({ message: 'Error saving score', error });
  }
};

module.exports = { saveHighScore };
