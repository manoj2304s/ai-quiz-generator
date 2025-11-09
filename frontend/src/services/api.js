// src/services/api.js

const BASE_URL = "https://ai-quiz-generator-backend-l0c0.onrender.com"; // ✅ your FastAPI backend URL

// ✅ Generic fetch helper
async function request(endpoint, options = {}) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`HTTP ${res.status}: ${err}`);
    }

    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

// ✅ Generate Quiz (POST /generate_quiz)
export async function generateQuiz(url) {
  return request("/generate_quiz", {
    method: "POST",
    body: JSON.stringify({ url }),
  });
}

// ✅ Fetch all history (GET /history)
export async function getQuizHistory() {
  return request("/history");
}

// ✅ Fetch specific quiz by ID (GET /quiz/{id})
export async function getQuizById(id) {
  return request(`/quiz/${id}`);
}
