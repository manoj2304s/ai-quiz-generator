// src/components/Modal.jsx
import { useEffect } from "react";

export default function Modal({ onClose, children }) {
  // ✅ Disable background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900 bg-opacity-80 backdrop-blur-md
 backdrop-blur-sm">
      {/* Modal Box */}
      <div className="relative bg-white text-gray-900 rounded-2xl shadow-2xl p-6 w-[90%] max-w-4xl max-h-[85vh] overflow-y-auto border border-gray-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-600 hover:text-red-600 text-2xl font-bold"
        >
          ×
        </button>

        {/* Render the quiz or other modal content */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4">
        {children}
        </div>

      </div>
    </div>
  );
}
