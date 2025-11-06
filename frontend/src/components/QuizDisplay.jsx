export default function QuizDisplay({ quiz }) {
  if (!quiz) return <p>No quiz selected.</p>;

  // Defensive checks for missing fields
  const title = quiz.title || "Untitled Quiz";
  const summary = quiz.summary || "No summary available.";
  const questions = Array.isArray(quiz.questions) ? quiz.questions : [];

  return (
    <div>
      <h2>{title}</h2>
      <p>{summary}</p>

      {questions.length === 0 ? (
        <p style={{ color: "gray" }}>No questions found for this quiz.</p>
      ) : (
        questions.map((q, index) => (
          <div key={index} className="question-card">
            <h3>
              Q{index + 1}. {q.question}
            </h3>
            <ul>
              {Array.isArray(q.options)
                ? q.options.map((opt, i) => (
                    <li
                      key={i}
                      className={
                        opt === q.answer ? "correct" : "option"
                      }
                    >
                      {opt}
                    </li>
                  ))
                : null}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
