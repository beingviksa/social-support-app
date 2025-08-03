import { useTranslation } from "react-i18next";

export const usePromptBuilder = () => {
  const { t } = useTranslation();

  const getPrompt = (field, context) => {
    const {
      name,
      city,
      country,
      maritalStatus,
      dependents,
      income,
      housing,
      employmentStatus,
    } = context;

    const prompts = {
      financialSituation: t("step3.prompts.financial", {
        name,
        city,
        country,
        maritalStatus,
        dependents,
        income,
        housing,
      }),
      employmentCircumstances: t("step3.prompts.employment", {
        name,
        employmentStatus,
        income,
      }),
      reasonForApplying: t("step3.prompts.reason", {
        name,
        country,
        maritalStatus,
        dependents,
        housing,
      }),
    };

    return prompts[field] || "";
  };

  return { getPrompt };
};
