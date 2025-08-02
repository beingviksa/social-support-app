import { mockCountries } from "@mocks/location.mock";

export const genderOptions = [
  { value: "male", labelKey: "gender.male" },
  { value: "female", labelKey: "gender.female" },
  { value: "other", labelKey: "gender.other" },
];

export const maritalOptions = [
  { value: "single", labelKey: "step2.options.single" },
  { value: "married", labelKey: "step2.options.married" },
  { value: "divorced", labelKey: "step2.options.divorced" },
  { value: "widowed", labelKey: "step2.options.widowed" },
];

export const employmentOptions = [
  { value: "employed", labelKey: "step2.options.employed" },
  { value: "unemployed", labelKey: "step2.options.unemployed" },
  { value: "student", labelKey: "step2.options.student" },
  { value: "retired", labelKey: "step2.options.retired" },
];

export const housingOptions = [
  { value: "rented", labelKey: "step2.options.rented" },
  { value: "owned", labelKey: "step2.options.owned" },
  { value: "with_family", labelKey: "step2.options.with_family" },
  { value: "homeless", labelKey: "step2.options.homeless" },
];

export const getCountryOptions = () =>
  mockCountries.map((c) => ({
    value: c.code,
    label: c.name,
  }));
