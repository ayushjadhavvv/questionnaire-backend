const express = require('express');
const router = express.Router();
const Question = require('../models/questions');
const UserProgress = require('../models/userProgress');
const Answer = require('../models/answer');

// GET endpoint for fetching questions (with pagination)
router.get('/questions', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Pagination
    const questions = await Question.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const totalQuestions = await Question.countDocuments(); // Total count for pagination

    res.json({
      questions,
      totalPages: Math.ceil(totalQuestions / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST endpoint for creating one or more questions
router.post('/questions', async (req, res) => {
  const questionsData = req.body;

  // Validate that request body is an array
  if (!Array.isArray(questionsData)) {
    return res.status(400).json({ message: 'Request body must be an array of questions.' });
  }

  // Validate and format each question
  const validatedQuestions = questionsData.map(question => {
    if (!question.type || !question.questionText || !question.options) {
      throw new Error('Missing required fields (type, questionText, options).');
    }
    return {
      type: question.type,
      questionText: question.questionText,
      options: question.options,
      range: question.range || null, // Optional field
      answer: question.answer || null // Optional field
    };
  });

  try {
    const savedQuestions = await Question.insertMany(validatedQuestions);
    res.status(201).json(savedQuestions);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST endpoint for submitting a single answer (using upsert)
router.post('/submit-answer', async (req, res) => {
  try {
    const { userId, questionId, answer } = req.body;

    if (!userId || !questionId || answer === undefined) {
      return res.status(400).json({ message: 'Missing required fields: userId, questionId, answer.' });
    }

    // Upsert the answer (insert if not found, update if found)
    const updatedProgress = await UserProgress.findOneAndUpdate(
      { userId, questionId },
      { answer },
      { upsert: true, new: true }
    );

    res.json({ message: 'Answer submitted successfully', progress: updatedProgress });
  } catch (err) {
    console.error('Error submitting answer:', err);
    res.status(500).json({ message: 'Failed to submit answer', error: err.message });
  }
});

// GET endpoint for retrieving user progress
router.get('/progress/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch progress for the given userId
    const progress = await UserProgress.find({ userId });

    if (progress.length === 0) {
      return res.status(404).json({ message: 'No progress found for this user.' });
    }

    res.json({ userId, progress });
  } catch (err) {
    console.error('Error retrieving user progress:', err);
    res.status(500).json({ message: 'Failed to retrieve progress', error: err.message });
  }
});

// POST endpoint for submitting multiple answers
router.post('/submit-answers', async (req, res) => {
  try {
    const { answers, userId } = req.body;

    if (!Array.isArray(answers) || !userId) {
      return res.status(400).json({ message: 'Invalid request: answers must be an array and userId is required.' });
    }

    // Prepare answer records for bulk insert
    const answerRecords = answers.map(answer => ({
      questionId: answer.questionId,
      userId: userId,
      answers: answer.response
    }));

    await Answer.insertMany(answerRecords);
    res.status(201).json({ message: 'Answers submitted successfully.' });
  } catch (err) {
    console.error('Error submitting answers:', err);
    res.status(500).json({ error: 'An error occurred while saving answers.' });
  }
});

// New POST endpoint for submitting a single answer with timestamp
router.post('/answers', async (req, res) => {
  try {
    const { questionId, userId, answer, timestamp } = req.body;

    if (!questionId || !userId || answer === undefined || !timestamp) {
      return res.status(400).json({ message: 'Missing required fields: questionId, userId, answer, timestamp.' });
    }

    const newAnswer = new Answer({
      questionId,
      userId,
      answer,
      timestamp
    });

    await newAnswer.save();
    res.status(201).json({ message: 'Answer submitted successfully', answer: newAnswer });
  } catch (error) {
    console.error('Error saving answer:', error);
    res.status(500).json({ message: 'Failed to submit answer', error: error.message });
  }
});

module.exports = router;