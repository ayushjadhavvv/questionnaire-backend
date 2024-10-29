const express = require('express');
const router = express.Router();
const Answer = require('../models/answer'); // Adjust the path as necessary

// POST route to submit an answer
router.post('/answers', async (req, res) => {
    try {
        const { questionId, userId, answer, timestamp } = req.body; // Ensure you're destructuring 'answer'
        
        // Create a new answer document
        const newAnswer = new Answer({
            questionId,
            userId,
            answer, // Save the answer here
            submittedAt: timestamp ? new Date(timestamp) : new Date(), // Use provided timestamp or current time
        }); 

        // Save to the database
        await newAnswer.save();

        // Respond with the saved answer data
        res.status(201).json(newAnswer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while saving the answer.' });
    }
});

module.exports = router;