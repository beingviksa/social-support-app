import { useId } from "react";
import { useTranslation } from "react-i18next";

const TextInput = ({
  label,
  labelKey,
  placeholder = "",
  placeholderKey,
  name,
  value,
  onChange,
  onBlur,
  type = "text",
  error,
  required = false,
  disabled = false,
  autoComplete,
  inputMode,
}) => {
  const id = useId();
  const { t } = useTranslation();

  return (
    <div className="w-full">
      {(label || labelKey) && (
        <label
          htmlFor={id}
          className="block font-medium mb-1 text-sm text-gray-700"
        >
          {labelKey ? t(labelKey) : label}
        </label>
      )}

      <input
        id={id}
        name={name}
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholderKey ? t(placeholderKey) : placeholder}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className={`w-full rounded-md border py-2 px-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          error ? "border-red-500" : "border-gray-300 focus:border-blue-500"
        } ${disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "text-gray-800"}`}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TextInput;
