import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { saveSituation } from "../../features/form/formSlice";
import { completeStep } from "../../features/formProgress/formProgressSlice";

import Button from "../common/Button";
import SuggestionModal from "../common/SuggestionModal";
import ControlledTextarea from "../form/ControlledTextarea";
import HelpMeWriteButton from "../common/HelpMeWriteButton";

import { getGPTSuggestion } from "../../utils/gptService";

const StepThree = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const savedData = useSelector((state) => state.form.situation);

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: savedData || {},
  });

  const [activeField, setActiveField] = useState(null);
  const [loadingField, setLoadingField] = useState(null);
  const [suggestion, setSuggestion] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Restore saved state
  useEffect(() => {
    if (savedData) {
      Object.entries(savedData).forEach(([key, val]) => {
        if (val !== undefined) {
          setValue(key, val);
        }
      });
    }
  }, [savedData, setValue]);

  // AI HelpMeWrite logic
  const getPromptForField = (field) => {
    switch (field) {
      case "financialSituation":
        return t("step3.prompts.financial");
      case "employmentCircumstances":
        return t("step3.prompts.employment");
      case "reasonForApplying":
        return t("step3.prompts.reason");
      default:
        return "";
    }
  };

  const handleHelpMeWrite = async (field) => {
    setLoadingField(field);
    setError("");
    try {
      const prompt = getPromptForField(field);
      const suggestion = await getGPTSuggestion(prompt);
      setSuggestion(suggestion);
      setActiveField(field);
    } catch (error) {
      setError(t("step3.ai.error", error));
    } finally {
      setLoadingField(null);
    }
  };

  const onAcceptSuggestion = (text) => {
    setValue(activeField, text, { shouldValidate: true });
    setActiveField(null);
  };

  const onSubmit = async (data) => {
    setIsSaving(true);
    await new Promise((res) => setTimeout(res, 1000));
    dispatch(saveSituation(data));
    dispatch(completeStep("step3"));

    navigate("/thank-you");
  };

  const situationFields = [
    {
      name: "financialSituation",
      titleKey: "step3.financial",
      placeholderKey: "step3.financialPlaceholder",
    },
    {
      name: "employmentCircumstances",
      titleKey: "step3.employment",
      placeholderKey: "step3.employmentPlaceholder",
    },
    {
      name: "reasonForApplying",
      titleKey: "step3.reason",
      placeholderKey: "step3.reasonPlaceholder",
    },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      aria-label="Step 3 - Situation Info"
    >
      <div className="space-y-6">
        {situationFields.map(({ name, titleKey, placeholderKey }) => (
          <div key={name}>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor={name} className="font-medium">
                {t(titleKey)}
              </label>
              <HelpMeWriteButton
                field={name}
                onClick={handleHelpMeWrite}
                isLoading={loadingField === name}
              />
            </div>
            <ControlledTextarea
              name={name}
              control={control}
              placeholderKey={t(placeholderKey)}
              rules={{
                required: t("step3.required"),
                minLength: {
                  value: 20,
                  message: t("step3.minLength"),
                },
              }}
            />
          </div>
        ))}

        {/* Error */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Buttons */}
        <div className="mt-8 flex justify-between flex-wrap gap-4">
          <Button variant="text" onClick={() => navigate("/form/step-2")}>
            ← {t("buttons.back")}
          </Button>
          <Button type="submit" isLoading={isSaving}>
            {t("buttons.submit")}
          </Button>
        </div>
      </div>

      {activeField && (
        <SuggestionModal
          content={suggestion}
          onAccept={onAcceptSuggestion}
          onClose={() => setActiveField(null)}
        />
      )}
    </form>
  );
};

export default StepThree;
