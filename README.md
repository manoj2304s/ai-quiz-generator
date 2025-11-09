# 🧠 AI Wiki Quiz Generator  
**An intelligent web app that automatically generates factual multiple-choice quizzes from Wikipedia articles using Gemini 2.5 Flash and FastAPI.**

---

## ✨ Overview

AI Wiki Quiz Generator is a full-stack application that:
- Scrapes clean content from any valid **Wikipedia article** 📰  
- Uses **Gemini 2.5 Flash (via LangChain)** to generate 5–10 factual MCQs  
- Stores results in a **MySQL database**  
- Displays generated quizzes and quiz history through a simple, clean **React + Tailwind** UI  

---

## ⚙️ Tech Stack

| Layer | Technologies |
|:------|:-------------|
| **Frontend** | React, Tailwind CSS, Vite |
| **Backend** | FastAPI, SQLAlchemy, LangChain, Gemini 2.5 Flash |
| **Database** | MySQL (via `mysqlclient`) |
| **AI Model** | Google Gemini 2.5 Flash (`langchain-google-genai`) |
| **Language** | Python 3.13, JavaScript (ESNext) |

---

## 🧩 Architecture

User → React UI → FastAPI Backend → Scraper → Gemini LLM → Database (MySQL)

- **Frontend (React):** Collects Wikipedia URL and displays generated quizzes  
- **Backend (FastAPI):** Scrapes, processes, and generates quiz content  
- **Database (MySQL):** Stores quiz data and history records  

---

## 📁 Project Structure

### Backend
```bash
backend/
├── database.py # SQLAlchemy setup and Quiz model
├── models.py # Pydantic schemas for structured validation
├── scraper.py # Wikipedia scraper (BeautifulSoup)
├── llm_quiz_generator.py # LangChain + Gemini logic
├── main.py # FastAPI app and endpoints
├── requirements.txt # Python dependencies
└── .env # Environment variables (API key, DB config)
```
### Frontend

```bash
frontend/
├── src/
│ ├── components/
│ │ ├── QuizDisplay.jsx
│ │ ├── HistoryTable.jsx
│ │ └── Modal.jsx
│ ├── tabs/
│ │ ├── GenerateQuizTab.jsx
│ │ └── HistoryTab.jsx
│ ├── services/api.js
│ ├── App.jsx
│ └── index.css
└── package.json
```
---

## ⚙️ Setup Instructions

### 🔹 Step 1: Clone Repository

```bash
git clone https://github.com/<your-username>/ai-wiki-quiz-generator.git
cd ai-wiki-quiz-generator
```

### 🔹 Step 2: Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate     # (Windows)
# or
source venv/bin/activate  # (Mac/Linux)
pip install -r requirements.txt
```
### 🔹 Create a .env file inside backend/:

```bash
GEMINI_API_KEY=your_google_gemini_api_key
DATABASE_URL=mysql+mysqldb://username:password@localhost/quizdb
```
### 🔹 Start backend:

```bash
uvicorn main:app --reload
Runs at http://127.0.0.1:8000
```
### 🔹 Step 3: Frontend Setup

```bash
cd frontend
npm install
npm run dev
Runs at http://localhost:5173
```

### 🔗 API Endpoints

```bash
Method	Endpoint	      Description
POST	  /generate_quiz	Accepts Wikipedia URL, scrapes article, generates quiz
GET	    /history	      Returns all previously generated quizzes
GET	    /quiz/{quiz_id}	Returns a specific quiz by ID
```

🧾 Example Request — /generate_quiz
POST Body:
```json
{
  "url": "https://en.wikipedia.org/wiki/Python_(programming_language)"
}
```
Sample Response:
```json
{
  "title": "Python Programming Language",
  "summary": "Python is a high-level, general-purpose programming language ...",
  "questions": [
    {
      "question": "Who developed Python?",
      "options": ["Guido van Rossum", "James Gosling", "Dennis Ritchie", "Bjarne Stroustrup"],
      "answer": "Guido van Rossum"
    }
  ]
}
```
Prompt Design
```
quiz_prompt = PromptTemplate(
    template=(
       "You are an educational quiz generator.\n\n"
        "Return JSON following these format instructions exactly:\n\n"
        "{format_instructions}\n\n"
        "Article Title: {title}\n\n"
        "Article Content:\n{content}\n\n"
        "Generate 5–10 diverse, factual multiple-choice questions."
    ),
    input_variables=["title", "content"],
    partial_variables={"format_instructions": parser.get_format_instructions()},
)
```
Ensures output grounding and JSON structure, minimizing hallucination.

🧪 Testing Instructions
1️. Start Backend
```bash
uvicorn main:app --reload
```

2️. Open FastAPI Docs
Visit: http://127.0.0.1:8000/docs

Run tests for:
/generate_quiz → Provide Wikipedia URL
/history → Check stored quizzes
/quiz/{id} → Fetch a quiz by ID

3️. Start Frontend
```bash
npm run dev
```
Paste a Wikipedia URL → Click Generate Quiz → Check History tab.

## Verify:
Title, summary, and questions render
Take Quiz mode hides answers
History modal fetches stored data correctly

⚠️ Error Handling
```
Invalid Wikipedia URLs → 400 Bad Request
Blocked requests (403) → HTTPException
LLM output errors → Quiz generation failed: ...
except Exception as e:
    raise HTTPException(status_code=500, detail=f"Quiz generation failed: {str(e)}")
```

💾 Database Schema
```bash
Field	          Type	    Description
id	            Integer	  Primary key
url	            String	  Wikipedia article URL
title	          String	  Quiz title
full_quiz_data	Text	    Serialized JSON (Gemini output)
date_generated	DateTime	Auto timestamp
```

---

| 🧩 Features Summary |
|:--------------------|
| ✅ Generate quiz from any Wikipedia link |
| ✅ Take Quiz mode (answers hidden until submitted) |
| ✅ Quiz history with modal view |
| ✅ Robust FastAPI backend |
| ✅ Clean scraping & JSON validation |
| ✅ MySQL persistence |
| ✅ Minimal, responsive UI |

---

## 📸 Demo Screenshots inside: ../Assets/screenshots/

---

👨‍💻 Author Manoj S 
🎓 Full-Stack Developer
📧 manojyadav23s04@gmail.com
🔗 https://www.linkedin.com/in/manoj-s-211a6b267/
🔗 https://github.com/manoj2304s

---
