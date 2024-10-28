# Interactive Questionnaire App Backend

This backend implementation supports the Interactive Questionnaire App. It provides various question types, user progress tracking, and efficient data retrieval with pagination.

## Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) (MongoDB Atlas or local installation)

## Installation

### Clone the Repository
```bash
git clone <repository-url>
cd questionnaire-backend

## Install Dependencies
Run the following command to install the required dependencies:

```bash
npm install


## Environment Setup

1. Create a `.env` file in the root directory.

### Configure Environment Variables

Copy values from `.env.example` and fill in specific configuration details.

### Example `.env` Structure:
```plaintext
MONGODB_URI=<Your MongoDB URI>
PORT=5000


## Usage

To start the server, run the following command:

```bash
npm start


# Testing
You can test the API using Postman or similar API clients. For easy testing, a Postman collection can be provided upon request.

## API Endpoints

Below are the key API endpoints:

### GET /api/questions
- **Description:** Retrieve a paginated list of questions.
- **Parameters:** 
  - `page` (optional) for pagination.
- **Details:** Fetches a paginated list of available questions from the database.

---

### POST /api/questions
- **Description:** Create a new question in the database.
- **Payload:**
```json
{
  "type": "multiple_choice",
  "questionText": "What is your favorite fruit?",
  "options": ["Apple", "Banana", "Cherry"]
}

Description: Adds a new question with specified type, text, and options.

### POST /api/submit-answer
- **Description:** Submit user answer for a specific question.

- **Payload:**
```json
{
  "userId": "user123",
  "questionId": "question123",
  "answer": "Banana"
}

Description: Saves the user’s answer to the specified question in the database.


### GET /api/progress/
- **Description:** Retrieve progress for a user.

- **Parameters:**
  - `userId` (in URL path)

- **Details:** Fetches saved progress for the user to allow resuming where they left off.
