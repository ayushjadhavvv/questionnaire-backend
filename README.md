# Interactive Questionnaire App Backend

This is the backend implementation for the Interactive Questionnaire App, designed to provide dynamic question support, user progress tracking, and efficient data retrieval for a seamless user experience.


## Prerequisites

- **Node.js**: [Download and install Node.js](https://nodejs.org/).
- **MongoDB**: A MongoDB instance, such as [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or a local MongoDB server.


## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```
2. **Navigate into the project directory**:
   ```bash
   cd questionnaire-backend
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```

Replace `<repository-url>` with your GitHub repository link, which you can copy from GitHub after creating the repository.

#### 4. **Environment Setup**
- Describe setting up the `.env` file and what variables are needed (without showing sensitive information).
- Mention the `.env.example` file as a reference for the user.

```markdown
## Environment Setup

1. Create a `.env` file in the root directory.
2. Copy the values from `.env.example` and fill in your specific configuration.

Example `.env` structure:
```plaintext
MONGODB_URI=<Your MongoDB URI>
PORT=5000

#### 5. **Usage**
- Explain how to start the project and run the server.
- You can also include any sample API requests or links to a Postman collection for testing.

```markdown
## Usage

To start the server, run:
```bash
npm start


#### 6. **Endpoints**
- Provide a brief description of each available endpoint, listing the path and purpose.

```markdown
## API Endpoints

- `GET /api/questions` - Retrieve a paginated list of questions.
- `POST /api/questions` - Create a new question in the database.
- `POST /api/submit-answer` - Submit user answer for a specific question.
- `GET /api/progress/:userId` - Retrieve progress for a user.
