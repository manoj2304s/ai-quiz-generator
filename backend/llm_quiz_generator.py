# llm_quiz_generator.py
import os
import json
from dotenv import load_dotenv
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import PydanticOutputParser
from models import QuizOutput
from fastapi import HTTPException

# ✅ Load environment variables
load_dotenv()

# ✅ Prepare Pydantic output parser
parser = PydanticOutputParser(pydantic_object=QuizOutput)

# ✅ Prompt Template (kept global for reuse)
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

# ✅ Main function (Gemini is initialized here, not globally)
def generate_quiz_from_text(title: str, content: str):
    from langchain_google_genai import ChatGoogleGenerativeAI  # lazy import

    try:
        GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
        if not GEMINI_API_KEY:
            raise ValueError("Missing GEMINI_API_KEY in .env")

        # ✅ Initialize Gemini only when needed
        llm = ChatGoogleGenerativeAI(
            model="gemini-2.5-flash",
            temperature=0.3,
            api_key=GEMINI_API_KEY,
        )

        # ✅ Format prompt and get response
        prompt = quiz_prompt.format(title=title, content=content)
        response = llm.invoke(prompt)

        # ✅ Extract clean text
        text_output = ""
        if hasattr(response, "content"):
            raw = response.content
            if isinstance(raw, (list, tuple)):
                text_output = getattr(raw[0], "text", str(raw[0]))
            else:
                text_output = getattr(raw, "text", str(raw))
        else:
            text_output = str(response)

        text_output = text_output.strip()

        # ✅ Parse the model’s JSON to QuizOutput
        quiz_data = parser.parse(text_output)
        return quiz_data.model_dump()

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Quiz generation failed: {str(e)}")


# ✅ Optional standalone test
if __name__ == "__main__":
    sample_title = "Python Programming Language"
    sample_text = (
        "Python is a high-level programming language created by Guido van Rossum in 1991. "
        "It emphasizes code readability and supports multiple paradigms."
    )

    result = generate_quiz_from_text(sample_title, sample_text)
    print(json.dumps(result, indent=2))
