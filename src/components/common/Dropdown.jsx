import { useId } from "react";
import { useTranslation } from "react-i18next";

const Dropdown = ({
  label,
  labelKey,
  placeholder = "Select",
  placeholderKey,
  name,
  value,
  onChange,
  options = [],
  error,
  required = false,
  disabled = false,
}) => {
  const id = useId();
  const { t } = useTranslation();

  return (
    <div className="w-full">
      {/* Label */}
      {(label || labelKey) && (
        <label
          htmlFor={id}
          className="block font-medium mb-1 text-sm text-gray-700"
        >
          {labelKey ? t(labelKey) : label}
        </label>
      )}

      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          disabled={disabled}
          className={`appearance-none w-full rounded-md bg-white py-2 pl-4 pr-10 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            error
              ? "border border-red-500"
              : "border border-gray-300 focus:border-blue-500"
          } ${disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "text-gray-800"}`}
        >
          <option value="">
            {placeholderKey ? t(placeholderKey) : placeholder}
          </option>

          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.labelKey ? t(opt.labelKey) : opt.label}
            </option>
          ))}
        </select>

        {/* Chevron */}
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <svg
            className={`w-4 h-4 ${disabled ? "text-gray-300" : "text-gray-500"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Error */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Dropdown;
