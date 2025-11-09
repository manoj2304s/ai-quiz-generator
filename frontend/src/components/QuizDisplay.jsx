import { useState } from "react";

export default function QuizDisplay({ quiz }) {
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);

  if (!quiz || !quiz.questions) return <p>No quiz data available.</p>;

  const handleAnswerSelect = (index, option) => {
    setUserAnswers({ ...userAnswers, [index]: option });
  };

  const handleSubmit = () => {
    let correct = 0;
    quiz.questions.forEach((q, i) => {
      if (userAnswers[i] === q.answer) correct++;
    });
    setScore(correct);
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setScore(null);
    setIsQuizMode(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl mx-auto text-left relative">
      <h3 className="text-2xl font-bold mb-3">{quiz.title}</h3>
      <p className="text-gray-600 mb-6">{quiz.summary}</p>

      {/* ✅ Mode Toggle */}
      {!isQuizMode && (
        <button
          onClick={() => setIsQuizMode(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Take Quiz 🧠
        </button>
      )}

      {isQuizMode && (
        <>
          {quiz.questions.map((q, i) => (
            <div
              key={i}
              className="border border-gray-300 rounded-lg p-4 mb-4 hover:shadow-md transition"
            >
              <h4 className="font-semibold text-gray-800">
                {i + 1}. {q.question}
              </h4>

              <div className="mt-2 space-y-1">
                {q.options.map((opt, idx) => (
                  <label
                    key={idx}
                    className={`block p-2 rounded-md cursor-pointer border ${
                      userAnswers[i] === opt
                        ? "bg-blue-100 border-blue-400"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${i}`}
                      value={opt}
                      checked={userAnswers[i] === opt}
                      onChange={() => handleAnswerSelect(i, opt)}
                      className="mr-2"
                    />
                    {opt}
                  </label>
                ))}
              </div>

              {/* ✅ Show correct answer only after submit */}
              {score !== null && (
                <p
                  className={`mt-2 font-medium ${
                    userAnswers[i] === q.answer
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  Correct Answer: {q.answer}
                </p>
              )}
            </div>
          ))}

          {/* ✅ Buttons below quiz */}
          <div className="flex justify-between items-center mt-6">
            {score === null ? (
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
              >
                Submit Quiz ✅
              </button>
            ) : (
              <button
                onClick={resetQuiz}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
              >
                Retake Quiz 🔁
              </button>
            )}

            {/* ✅ Display score */}
            {score !== null && (
              <p className="text-lg font-semibold text-gray-800">
                Score: {score} / {quiz.questions.length}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
