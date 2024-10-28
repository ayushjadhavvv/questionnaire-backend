const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
  userId: String, // Unique identifier for the user
  questionId: String, // Tracks the question being answered
  answer: mongoose.Schema.Types.Mixed, // Stores answer; flexible type
  completed: { type: Boolean, default: false }, // Mark if user completed the questionnaire
  timestamp: { type: Date, default: Date.now }, // For tracking answer time
});

module.exports = mongoose.model('UserProgress', userProgressSchema);
