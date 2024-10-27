// routes/highScoreRoutes.js
const express = require('express');
const { saveHighScore } = require('../controllers/highScoreController');

const router = express.Router();

// POST route for submitting high scores
router.post('/api/highscores', saveHighScore);

module.exports = router;
