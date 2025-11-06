import { useState } from "react";
import QuizDisplay from "../components/QuizDisplay";

export default function GenerateQuizTab() {
  const [url, setUrl] = useState("");
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!url.trim()) {
      setError("Please enter a valid Wikipedia URL.");
      return;
    }

    setError("");
    setLoading(true);
    setQuiz(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/generate_quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) throw new Error("Failed to generate quiz");

      const data = await res.json();
      setQuiz(data);
    } catch (err) {
      setError("Something went wrong while generating the quiz.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Generate Quiz from Wikipedia</h2>
      <div className="generate-form">
        <input
          type="text"
          placeholder="Enter Wikipedia article URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={handleGenerate}>Generate</button>
      </div>

      {error && <p className="error">{error}</p>}
      {loading && <p className="loading">Generating quiz... Please wait ⏳</p>}
      {quiz && <QuizDisplay quiz={quiz} />}
    </div>
  );
}
