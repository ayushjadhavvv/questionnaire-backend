// routes/questionnaire.js

const express = require('express');
const router = express.Router();
const Question = require('../models/questions');
const UserProgress = require('../models/userProgress');

// Existing GET endpoint for fetching questions
router.get('/questions', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Page and limit for pagination
    const questions = await Question.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const totalQuestions = await Question.countDocuments(); // Get total count for front-end tracking

    res.json({
      questions,
      totalPages: Math.ceil(totalQuestions / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/// New POST endpoint for creating one or more questions
router.post('/questions', async (req, res) => {
  const questionsData = req.body; // Expecting an array of questions

  // Validate that the request body is an array
  if (!Array.isArray(questionsData)) {
    return res.status(400).json({ message: 'Request body must be an array of questions.' });
  }

  // Validate each question before inserting
  const validatedQuestions = questionsData.map(question => {
    return {
      type: question.type,
      questionText: question.questionText,
      options: question.options,
      range: question.range, // Optional
      answer: question.answer // Optional
    };
  });

  try {
    // Use `insertMany` to save multiple questions at once
    const savedQuestions = await Question.insertMany(validatedQuestions);
    res.status(201).json(savedQuestions); // Respond with the created questions
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Existing POST endpoint for submitting answers
router.post('/submit-answer', async (req, res) => {
  try {
      const { userId, questionId, answer } = req.body;
      let progress = await UserProgress.findOne({ userId, questionId });

      if (progress) {
          progress.answer = answer;
      } else {
          progress = new UserProgress({ userId, questionId, answer });
      }

      await progress.save();
      res.json({ message: 'Answer submitted successfully' });
  } catch (err) {
      console.error('Error submitting answer:', err); // Log the error
      res.status(500).json({ message: 'Failed to submit answer', error: err.message });
  }
});

// Existing GET endpoint for user progress
router.get('/progress/:userId', async (req, res) => {
  try {
    const { userId } = req.params; // Get userId from the URL parameters

    // Fetch the progress from the UserProgress collection based on userId
    const progress = await UserProgress.find({ userId });

    // Check if any progress records were found
    if (progress.length === 0) {
      return res.status(404).json({ message: 'No progress found for this user.' });
    }

    // Send the retrieved progress records as a response
    res.json({ userId, progress });
  } catch (err) {
    console.error('Error retrieving user progress:', err); // Log the error
    res.status(500).json({ message: 'Failed to retrieve progress', error: err.message });
  }
});


module.exports = router;
