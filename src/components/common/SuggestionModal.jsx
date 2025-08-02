import { useState } from "react";

const SuggestionModal = ({ content, onAccept, onClose }) => {
  const [editableContent, setEditableContent] = useState(content);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl">
        <h2 className="text-xl font-semibold mb-4">AI Suggestion</h2>

        <textarea
          className="w-full h-40 p-2 border rounded resize-none"
          value={editableContent}
          onChange={(e) => setEditableContent(e.target.value)}
        />

        <div className="flex justify-end mt-4 gap-3">
          <button className="text-gray-500 hover:underline" onClick={onClose}>
            Discard
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => onAccept(editableContent)}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuggestionModal;
