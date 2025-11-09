import { useState } from "react";
import GenerateQuizTab from "./tabs/GenerateQuizTab";
import HistoryTab from "./tabs/HistoryTab";
import "./App.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("generate");

  return (
    <div className="app-container">
      <header className="header">
        <h1>AI Wiki Quiz Generator 🧠</h1>
      </header>

      <div className="tab-buttons">
        <button
          className={activeTab === "generate" ? "active" : ""}
          onClick={() => setActiveTab("generate")}
        >
          Generate Quiz
        </button>
        <button
          className={activeTab === "history" ? "active" : ""}
          onClick={() => setActiveTab("history")}
        >
          History
        </button>
      </div>

      <main className="main-content">
        {activeTab === "generate" && <GenerateQuizTab />}
        {activeTab === "history" && <HistoryTab />}
      </main>

      <footer className="text-center py-4 text-sm text-gray-500">
        Built by Manoj S | Powered by FastAPI + Gemini + React ⚡
      </footer>

    </div>
  );
}
