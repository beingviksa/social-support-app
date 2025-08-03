import { useTranslation } from "react-i18next";
import Button from "./Button";

const HelpMeWriteButton = ({ field, onClick, isLoading }) => {
  const { t } = useTranslation();

  return (
    <Button
      type="button"
      variant="text"
      onClick={() => onClick(field)}
      isLoading={isLoading}
      loadingText={t("step3.ai.generating")}
      aria-busy={isLoading}
      aria-label={t(
        "step3.helpMeWriteAriaLabel",
        "Let AI help you write this section"
      )}
      className="text-sm text-blue-600 hover:underline disabled:text-gray-400"
    >
      {t("step3.helpMeWrite")}
    </Button>
  );
};

export default HelpMeWriteButton;
