from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import Base, engine, SessionLocal, Quiz
from scraper import scrape_wikipedia
from llm_quiz_generator import generate_quiz_from_text
import json

app = FastAPI(title="AI Wiki Quiz Generator", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

# ✅ Proper DB session dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ✅ Fixed endpoint
@app.post("/generate_quiz")
def generate_quiz(data: dict, db: Session = Depends(get_db)):
    """
    Accepts { "url": "<Wikipedia URL>" }
    Scrapes article, generates quiz, and saves to DB.
    """
    try:
        url = data.get("url")
        if not url:
            raise HTTPException(status_code=400, detail="URL is required")

        title, content = scrape_wikipedia(url)
        quiz_data = generate_quiz_from_text(title, content)

        quiz = Quiz(
            url=url,
            title=quiz_data["title"],
            scraped_content=content,
            full_quiz_data=json.dumps(quiz_data),
        )

        db.add(quiz)
        db.commit()
        db.refresh(quiz)

        return {
            "id": quiz.id,
            "title": quiz.title,
            "summary": quiz_data["summary"],
            "questions": quiz_data["questions"],
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/history")
def get_history(db: Session = Depends(get_db)):
    quizzes = db.query(Quiz).order_by(Quiz.date_generated.desc()).all()
    return [
        {
            "id": q.id,
            "url": q.url,
            "title": q.title,
            "date_generated": q.date_generated,
        }
        for q in quizzes
    ]


@app.get("/quiz/{quiz_id}")
def get_quiz(quiz_id: int, db: Session = Depends(get_db)):
    quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")

    # ✅ Try to parse JSON safely
    try:
        quiz_data = json.loads(quiz.full_quiz_data)
    except json.JSONDecodeError:
        quiz_data = {}

    # ✅ Return combined structured response
    return {
        "id": quiz.id,
        "url": quiz.url,
        "title": quiz.title,
        "date_generated": quiz.date_generated,
        **quiz_data  # merges parsed quiz content (title, summary, questions)
    }

@app.get("/")
def root():
    return {"message": "AI Wiki Quiz Generator API is running!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

