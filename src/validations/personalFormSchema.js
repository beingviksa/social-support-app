export const personalFormSchema = (t) => ({
  name: {
    required: t("step1.nameRequired"),
  },
  gender: {
    required: t("step1.genderRequired"),
  },
  address: {
    required: t("step1.addressRequired"),
  },
  country: {
    required: t("step1.countryRequired"),
  },
  state: {
    required: t("step1.stateRequired"),
  },
  city: {
    required: t("step1.cityRequired"),
  },
  email: {
    required: t("step1.emailRequired"),
    pattern: {
      value: /^\S+@\S+$/i,
      message: t("step1.emailInvalid"),
    },
  },
  dob: {
    required: t("step1.dobRequired"),
    validate: (value) => {
      if (!value || !value.day || !value.month || !value.year) {
        return t("step1.dobRequired");
      }
      return true;
    },
  },
});
