import Button from "@common/Button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const FormNavigationButtons = ({
  isSaving,
  onBackClick,
  formId = "",
  backLabelKey = "buttons.back",
  showBack = true,
  nextLabelKey = "buttons.saveAndContinue",
  isSubmit = true,
  className = "",
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBackClick) return onBackClick();
    navigate(-1);
  };

  return (
    <div className={`flex justify-between flex-wrap gap-4 ${className}`}>
      {showBack && (
        <Button variant="text" onClick={handleBack}>
          ← {t(backLabelKey)}
        </Button>
      )}
      <Button
        type={isSubmit ? "submit" : "button"}
        form={formId}
        isLoading={isSaving}
      >
        {t(nextLabelKey)}
      </Button>
    </div>
  );
};

export default FormNavigationButtons;
