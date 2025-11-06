import { useEffect, useState } from "react";
import HistoryTable from "../components/HistoryTable";
import QuizDisplay from "../components/QuizDisplay";

export default function HistoryTab() {
  const [history, setHistory] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/history");
        if (!res.ok) throw new Error("Failed to load quiz history");
        const data = await res.json();
        setHistory(data);
      } catch (err) {
        console.error(err);
        setError("Unable to fetch quiz history. Please try again.");
      }
    };
    fetchHistory();
  }, []);

  const handleView = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`http://127.0.0.1:8000/quiz/${id}`);
      if (!res.ok) throw new Error("Failed to load quiz details");
      const data = await res.json();
      setSelectedQuiz(data);
    } catch (err) {
      console.error(err);
      setError("Unable to fetch quiz details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Quiz History</h2>
      {error && <p className="error">{error}</p>}
      {loading && <p className="loading">Loading quiz details...</p>}

      {history.length > 0 ? (
        <HistoryTable history={history} onView={handleView} />
      ) : (
        <p>No quizzes found. Generate one first!</p>
      )}

      {selectedQuiz && (
        <div style={{ marginTop: "30px" }}>
          <h3>Quiz Details</h3>
          <QuizDisplay quiz={selectedQuiz} />
        </div>
      )}
    </div>
  );
}
