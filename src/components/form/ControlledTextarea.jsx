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

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <div>
          <textarea
            id={name}
            {...field}
            rows={rows}
            className={`input resize-none ${error ? "border-red-500" : ""}`}
            placeholder={placeholderKey ? t(placeholderKey) : ""}
          />
          {error && (
            <p className="text-red-500 text-sm mt-1">{error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default ControlledTextarea;
