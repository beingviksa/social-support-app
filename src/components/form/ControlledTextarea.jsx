import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

const ControlledTextarea = ({
  name,
  control,
  placeholderKey,
  rules,
  rows = 5,
}) => {
  const { t } = useTranslation();
  const errorId = `${name}-error`;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full">
          <textarea
            id={name}
            {...field}
            rows={rows}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            placeholder={placeholderKey ? t(placeholderKey) : ""}
            className={`input resize-none w-full rounded-md border py-2 px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />

          {error && (
            <p id={errorId} className="text-red-500 text-sm mt-1">
              {error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default ControlledTextarea;
