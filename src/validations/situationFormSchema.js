export const situationFormSchema = (t) => ({
  input: {
    required: t("step3.required"),
    minLength: {
      value: 20,
      message: t("step3.minLength", { count: 20 }),
    },
  },
});
