const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  type: { type: String, required: true }, // "multiple_choice", "numerical", "multiple_selections"
  questionText: { type: String, required: true },
  options: [String], // Only used for multiple choice or multiple selections
  range: { min: Number, max: Number }, // Only used for numerical input
  answer: mongoose.Schema.Types.Mixed // Flexible field for storing answers (e.g., array for multiple selections)
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
