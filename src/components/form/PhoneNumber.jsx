import { Controller, useWatch } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useTranslation } from "react-i18next";

const PhoneNumber = ({ control, name = "phone", selectedCountry }) => {
  const { t, i18n } = useTranslation();
  const phoneValue = useWatch({ control, name });

  return (
    <div className="w-full">
      <label htmlFor={name} className="block font-medium mb-1">
        {t("step1.phone", "Phone Number")}
      </label>

      <Controller
        name={name}
        control={control}
        rules={{
          required: t("step1.phoneRequired"),
          minLength: {
            value: 10,
            message: t("step1.phoneLength"),
          },
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <PhoneInput
              country={selectedCountry?.toLowerCase() || "ae"}
              value={value || phoneValue || ""}
              onChange={(val) => onChange(val)}
              enableSearch
              specialLabel=""
              inputProps={{
                name,
                autoComplete: "tel",
              }}
              containerClass="!w-full"
              inputClass={`!w-full !py-2 !pl-14 !text-sm !border-gray-300 rounded-md ${
                error ? "!border-red-500" : ""
              }`}
              buttonClass="!border-gray-300"
              placeholder={t("step1.phonePlaceholder")}
              isRTL={i18n.dir() === "rtl"}
            />
            {error && (
              <p className="text-red-500 text-sm mt-1" id={`${name}-error`}>
                {error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default PhoneNumber;
