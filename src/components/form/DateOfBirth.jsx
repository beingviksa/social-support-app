import { useTranslation } from "react-i18next";

import Dropdown from "@common/Dropdown";

const DateOfBirth = ({ value = {}, onChange, error }) => {
  const { t } = useTranslation();

  const day = value?.day || "";
  const month = value?.month || "";
  const year = value?.year || "";

  const currentYear = new Date().getFullYear();

  const years = Array.from({ length: 100 }, (_, i) =>
    (currentYear - i).toString()
  );

  const months = Array.from({ length: 12 }, (_, i) => {
    const val = (i + 1).toString().padStart(2, "0");
    return {
      value: val,
      label: t(`step1.months.${val}`, val),
    };
  });

  const days = Array.from({ length: 31 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );

  const handleChange = (part, val) => {
    const updated = { ...value, [part]: val };
    onChange(updated);
  };

  return (
    <div className="w-full">
      <label className="block font-medium mb-1 text-sm text-gray-700">
        {t("step1.dob", "Date of Birth")}
      </label>
      <div className="flex gap-2 flex-wrap sm:flex-nowrap">
        <Dropdown
          name="dob-day"
          value={day}
          onChange={(val) => handleChange("day", val)}
          placeholderKey="step1.dobDay"
          options={days.map((d) => ({ value: d, label: d }))}
        />
        <Dropdown
          name="dob-month"
          value={month}
          onChange={(val) => handleChange("month", val)}
          placeholderKey="step1.dobMonth"
          options={months}
        />
        <Dropdown
          name="dob-year"
          value={year}
          onChange={(val) => handleChange("year", val)}
          placeholderKey="step1.dobYear"
          options={years.map((y) => ({ value: y, label: y }))}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default DateOfBirth;
