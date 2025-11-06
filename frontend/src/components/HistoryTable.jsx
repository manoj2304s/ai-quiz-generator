export default function HistoryTable({ history, onView }) {
  if (!history.length) return <p>No quizzes generated yet.</p>;

  return (
    <table className="history-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>URL</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {history.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.title}</td>
            <td className="url-cell">
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.url}
              </a>
            </td>
            <td>{new Date(item.date_generated).toLocaleString()}</td>
            <td>
              <button type="button" onClick={() => onView(item.id)}>
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
