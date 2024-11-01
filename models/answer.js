const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
    userId: { type: String, required: true },
    answer: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Answer', answerSchema);