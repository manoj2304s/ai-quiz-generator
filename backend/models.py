# models.py
from pydantic import BaseModel, Field, ConfigDict
from typing import List


# ✅ Individual quiz question schema
class QuizQuestion(BaseModel):
    question: str = Field(...)
    options: List[str] = Field(...)
    answer: str = Field(...)

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "question": "Who developed the Python programming language?",
                "options": ["Guido van Rossum", "James Gosling", "Dennis Ritchie", "Bjarne Stroustrup"],
                "answer": "Guido van Rossum",
            }
        }
    )


# ✅ Full quiz schema
class QuizOutput(BaseModel):
    title: str = Field(...)
    summary: str = Field(...)
    questions: List[QuizQuestion]

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "title": "Python Programming Language",
                "summary": "Python is a popular programming language emphasizing readability and versatility.",
                "questions": [
                    {
                        "question": "Who developed the Python programming language?",
                        "options": ["Guido van Rossum", "James Gosling", "Dennis Ritchie", "Bjarne Stroustrup"],
                        "answer": "Guido van Rossum",
                    }
                ],
            }
        }
    )
