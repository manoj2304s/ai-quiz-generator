import { useState, useEffect } from "react";
import { getQuizHistory, getQuizById } from "../services/api";  // ✅ updated names
import HistoryTable from "../components/HistoryTable";
import QuizDisplay from "../components/QuizDisplay";
import Modal from "../components/Modal";

export default function HistoryTab() {
  const [quizHistory, setQuizHistory] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadHistory = async () => {
      const data = await getQuizHistory(); // ✅ updated
      setQuizHistory(data);
    };
    loadHistory();
  }, []);

  const handleViewDetails = async (id) => {
    const quizData = await getQuizById(id);
    console.log("🎯 QUIZ DATA RECEIVED:", quizData); 
    setSelectedQuiz(quizData);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto text-center mt-8">
      <h2 className="text-2xl font-bold mb-4">Quiz History</h2>
      <HistoryTable history={quizHistory} onView={handleViewDetails} />

      {isModalOpen && selectedQuiz && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <QuizDisplay quiz={selectedQuiz} />
        </Modal>
      )}
    </div>
  );
}
