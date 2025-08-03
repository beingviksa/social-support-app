import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const Modal = ({
  isOpen,
  onClose,
  titleId,
  children,
  className = "",
  overlayClassName = "",
  initialFocusSelector = "textarea, input, button",
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

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
  }, [onClose, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const firstEl = modalRef.current?.querySelector(initialFocusSelector);
    firstEl?.focus();
  }, [isOpen, initialFocusSelector]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 ${overlayClassName}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div
        ref={modalRef}
        className={`bg-white p-6 rounded-lg shadow-xl w-full max-w-xl border border-gray-200 ${className}`}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
