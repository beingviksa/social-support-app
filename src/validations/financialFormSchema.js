export const financialFormSchema = (t) => ({
  maritalStatus: { required: t("step2.maritalRequired") },
  dependents: { required: t("step2.dependentsRequired") },
  employmentStatus: { required: t("step2.employmentRequired") },
  income: { required: t("step2.incomeRequired") },
  housing: { required: t("step2.housingRequired") },
});
