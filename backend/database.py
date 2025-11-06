# database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
from sqlalchemy import Column, Integer, String, Text, DateTime, func
import json
import os

# Load environment variables
load_dotenv()

# ✅ Database URL Format (MySQL)
DATABASE_URL = os.getenv("DATABASE_URL", "mysql+mysqldb://root:2304@localhost:3306/quizdb")

# ✅ Create Engine
engine = create_engine(DATABASE_URL, echo=True)

# ✅ Create a configured "Session" class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# ✅ Base class for models
Base = declarative_base()

class Quiz(Base):
    __tablename__ = "quizzes"

    id = Column(Integer, primary_key=True, index=True)
    url = Column(String(512), nullable=False)
    title = Column(String(256), nullable=False)
    date_generated = Column(DateTime(timezone=True), server_default=func.now())
    scraped_content = Column(Text, nullable=True)
    full_quiz_data = Column(Text, nullable=False)  # JSON stored as text

    def set_quiz_data(self, data: dict):
        """Serialize quiz data into JSON string."""
        self.full_quiz_data = json.dumps(data)

    def get_quiz_data(self) -> dict:
        """Deserialize quiz data back into a Python dictionary."""
        try:
            return json.loads(self.full_quiz_data)
        except json.JSONDecodeError:
            return {}

# ✅ Create tables (only when run directly)
if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)
    print("✅ Database and tables created successfully.")
