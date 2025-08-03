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

export const getPromptForField = (
  field,
  t,
  name,
  city,
  country,
  dependents,
  employmentStatus,
  housing,
  income,
  maritalStatus
) => {
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
