// models/HighScore.js
const mongoose = require('mongoose');

const highScoreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  timeTaken: { type: String, required: true },
  points: { type: Number, required: true },
});

const HighScore = mongoose.model('highScores', highScoreSchema);
module.exports = HighScore;
