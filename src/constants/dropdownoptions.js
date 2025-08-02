import { mockCountries } from "@mocks/location.mock";

export const genderOptions = [
  { value: "male", labelKey: "gender.male" },
  { value: "female", labelKey: "gender.female" },
  { value: "other", labelKey: "gender.other" },
];

export const getCountryOptions = () =>
  mockCountries.map((c) => ({
    value: c.code,
    label: c.name,
  }));
