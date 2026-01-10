# AI Question Generator

An AI-powered web application that generates exam-oriented questions from user-uploaded study notes.

This project is built to help students practice smarter by converting notes into relevant questions that are likely to be asked in exams.

---

## 🚀 Features

- Upload study notes (PDF or text)
- Automatically generates questions based on the content
- Focused on exam-style and concept-based questions
- Simple and clean user interface
- Backend API for AI processing

---

## 🛠️ Tech Stack

### Frontend
- React
- HTML, CSS, JavaScript

### Backend
- Node.js
- Express.js

### AI / Processing
- AI API for question generation
- PDF text extraction for scanned and digital notes

---

## 📂 How It Works

1. User uploads a note (PDF or text).
2. The backend extracts text from the file.
3. The extracted content is sent to the AI model.
4. AI generates relevant questions based on the notes.
5. Questions are returned and displayed to the user.

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/ai-question-generator.git
cd ai-question-generator

2. Install backend dependencies
cd backend
npm install

3. Install frontend dependencies
cd frontend
npm install

4. Environment Variables
Create a .env file in the backend folder and add:
AI_API_KEY=your_api_key_here
PORT=8080

5. Run the project
backend - npm run dev
forntend - npm run dev

📌 Use Cases

Exam preparation

Quick revision from notes

Generating practice questions

Learning how AI can be integrated into education tools

🤝 Feedback & Contributions

This is a learning project, and feedback is highly appreciated.
Feel free to open an issue or suggest improvements.


👤 Author

Suryansu Jha