import { useState } from "react";
import { useTranslation } from "react-i18next";

import Modal from "@common/Modal";
import Button from "@common/Button";

const SuggestionModal = ({ content, onAccept, onClose }) => {
  const { t } = useTranslation();
  const [editableContent, setEditableContent] = useState(content);

  return (
    <Modal isOpen={true} onClose={onClose} titleId="ai-suggestion-title">
      <h2 id="ai-suggestion-title" className="text-xl font-semibold mb-4">
        {t("step3.aiSuggestion")}
      </h2>

      <label htmlFor="ai-suggestion-textarea" className="sr-only">
        AI Suggested Text
      </label>

      <textarea
        id="ai-suggestion-textarea"
        className="w-full h-40 p-3 border rounded resize-none text-sm focus:ring focus:ring-blue-300"
        value={editableContent}
        onChange={(e) => setEditableContent(e.target.value)}
      />

      <div className="flex justify-end mt-4 gap-3">
        <Button type="button" variant="text" onClick={onClose}>
          {t("buttons.discard")}
        </Button>
        <Button type="button" onClick={() => onAccept(editableContent)}>
          {t("buttons.accept")}
        </Button>
      </div>
    </Modal>
  );
};

export default SuggestionModal;
