export const situationFields = [
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

export const getPromptForField = (field, t) => {
  const prompts = {
    financialSituation: t("step3.prompts.financial"),
    employmentCircumstances: t("step3.prompts.employment"),
    reasonForApplying: t("step3.prompts.reason"),
  };

  return prompts[field] || "";
};
