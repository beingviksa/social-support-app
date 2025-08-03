import { useCallback } from "react";

const useFocusFirstError = () => {
  const onError = useCallback((errors) => {
    const firstField = Object.keys(errors)?.[0];
    const el = document.querySelector(`[name="${firstField}"]`);

    if (el?.focus) {
      el.focus();
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  return onError;
};

export default useFocusFirstError;
