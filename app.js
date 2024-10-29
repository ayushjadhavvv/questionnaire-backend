const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser'); // Import body-parser
const connectDB = require('./config/database'); // Ensure this path is correct
const questionnaireRoutes = require('./routes/questionnaire'); // Ensure this path is correct
const answerRoutes = require('./routes/answer'); // Adjust path as necessary
const Answer = require('./models/answer'); // This should be the model file

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();

// Middleware to parse JSON requests
app.use(express.json()); // Using express's built-in JSON parser
app.use(bodyParser.json()); // For parsing application/json

// Enable all CORS requests, or configure as needed
app.use(cors());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Questionnaire API!'); // You can customize this message
});

// Use our defined routes for questionnaire and answer handling
app.use('/api', questionnaireRoutes); // Ensure questionnaireRoutes is an Express Router instance
app.use('/api', answerRoutes); // Register the router for answer-related routes

// Set the port for the application
const PORT = process.env.PORT || 5000;

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
