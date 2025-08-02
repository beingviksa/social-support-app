import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { getGPTSuggestion } from "@services/openai";

import { saveSituation } from "@features/form/formSlice";
import { completeStep } from "@features/formProgress/formProgressSlice";

import Button from "@common/Button";
import SuggestionModal from "@common/SuggestionModal";
import SituationField from "@form/SituationField";

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      aria-label="Step 3 - Situation Info"
      className={isSaving ? "opacity-50 pointer-events-none" : ""}
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
