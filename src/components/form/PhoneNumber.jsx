import { Controller, useWatch } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useTranslation } from "react-i18next";

const PhoneNumber = ({ control, name = "phone", selectedCountry }) => {
  const { t, i18n } = useTranslation();
  const phoneValue = useWatch({ control, name });

  return (
    <div className="w-full">
      <label
        htmlFor="phone-input"
        className="block font-medium mb-1 text-sm text-gray-700"
      >
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
              disableDropdown={true}
              enableSearch={false}
              specialLabel=""
              inputProps={{
                id: "phone-input",
                name,
                autoComplete: "tel",
              }}
              containerClass={`!w-full !rounded-md !border 
    ${error ? "!border-red-500" : "!border-gray-300"} 
    focus-within:!ring-2 focus-within:!ring-blue-500
  `}
              inputClass="!w-full !py-2 !pl-14 !text-sm !border-0 focus:!outline-none"
              buttonClass="!border-0 !bg-transparent !pointer-events-none"
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
