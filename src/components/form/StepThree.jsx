import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { getGPTSuggestion } from "@services/openai";

import { saveSituation } from "@features/form/formSlice";
import { completeStep } from "@features/formProgress/formProgressSlice";

import SuggestionModal from "@common/SuggestionModal";
import SituationField from "@form/SituationField";
import FormNavigationButtons from "@form/FormNavigationButtons";

import {
  getPromptForField,
  situationFields,
} from "@/constants/situationFields";

const StepThree = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const savedData = useSelector((state) => state.form.situation);

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: savedData || {},
  });

  const [activeField, setActiveField] = useState(null);
  const [loadingField, setLoadingField] = useState(null);
  const [suggestion, setSuggestion] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleHelpMeWrite = async (field) => {
    setLoadingField(field);
    setError("");

    try {
      const prompt = getPromptForField(field);
      const suggestion = await getGPTSuggestion(prompt);
      setSuggestion(suggestion);
      setActiveField(field);
    } catch {
      setError(t("step3.ai.error"));
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

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow overflow-y-auto">
        <form
          id="step3Form"
          onSubmit={handleSubmit(onSubmit)}
          aria-label="Step 3 - Situation Info"
          className={`px-4 pb-32 pt-6 ${isSaving ? "opacity-50 pointer-events-none" : ""}`}
        >
          <div className="space-y-6">
            {situationFields.map((field) => (
              <SituationField
                key={field.name}
                {...field}
                control={control}
                loadingField={loadingField}
                onHelpClick={handleHelpMeWrite}
                t={t}
              />
            ))}

            {error && <p className="text-red-500">{error}</p>}
          </div>
        </form>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md p-4 z-50">
          <FormNavigationButtons
            isSaving={isSaving}
            onBackClick={() => navigate("/form/step-2")}
            nextLabelKey="buttons.submit"
            formId="step3Form"
          />
        </div>
        {activeField && (
          <SuggestionModal
            content={suggestion}
            onAccept={onAcceptSuggestion}
            onClose={() => setActiveField(null)}
          />
        )}
      </div>
    </div>
  );
};

export default StepThree;
