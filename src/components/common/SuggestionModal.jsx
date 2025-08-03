import { useState, useEffect, useRef } from "react";
import Button from "./Button";
import { t } from "i18next";

const SuggestionModal = ({ content, onAccept, onClose }) => {
  const [editableContent, setEditableContent] = useState(content);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const textarea = modalRef.current?.querySelector("textarea");
    textarea?.focus();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-xl border border-gray-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ai-suggestion-title"
      >
        <h2
          id="ai-suggestion-title"
          className="text-xl font-semibold mb-4 text-gray-800"
        >
          {t("step3.aiSuggestion")}
        </h2>

        <label htmlFor="ai-suggestion-textarea" className="sr-only">
          AI Suggested Text (Editable)
        </label>

        <textarea
          id="ai-suggestion-textarea"
          className="w-full h-40 p-3 border rounded resize-none text-sm focus:ring focus:ring-blue-300"
          value={editableContent}
          onChange={(e) => setEditableContent(e.target.value)}
        />

        <div className="flex justify-end mt-4 gap-3">
          <Button
            type="button"
            variant="text"
            onClick={onClose}
            className="text-gray-600 hover:underline"
          >
            {t("buttons.discard")}
          </Button>

          <Button
            type="button"
            onClick={() => onAccept(editableContent)}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            {t("buttons.accept")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuggestionModal;
