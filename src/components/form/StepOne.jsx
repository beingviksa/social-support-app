import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { savePersonal, resetForm } from "@features/form/formSlice";
import { completeStep } from "@features/formProgress/formProgressSlice";

import useLocationDropdowns from "@hooks/useLocationDropdowns";
import useRestoreSavedValues from "@hooks/useRestoreSavedValues";

import { formatDobObjectToString, getInitialDob } from "@/utils/dateUtils";
import { personalFormSchema } from "@validations/personalFormSchema";

import ControlledInput from "@form/ControlledInput";
import ControlledDropdown from "@form/ControlledDropdown";
import NationalIdVerifier from "@form/NationalIdVerifier";
import PhoneNumber from "@form/PhoneNumber";
import DateOfBirth from "@form/DateOfBirth";
import FormNavigationButtons from "@form/FormNavigationButtons";

import { genderOptions, getCountryOptions } from "@constants/dropdownoptions";

const StepOne = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const schema = personalFormSchema(t);

  const dispatch = useDispatch();
  const savedData = useSelector((state) => state.form.personal);

  const [isSaving, setIsSaving] = useState(false);

  const { control, handleSubmit, watch, setValue, trigger } = useForm({
    defaultValues: {
      ...savedData,
      dob: getInitialDob(savedData?.dob),
    },
  });

  const selectedCountry = watch("country");
  const selectedState = watch("state");

  const { dialCode, states, cities, initializeFromSavedData } =
    useLocationDropdowns(selectedCountry, selectedState);

  useRestoreSavedValues(savedData, setValue);

  useEffect(() => {
    if (savedData) {
      initializeFromSavedData(savedData);
    }
  }, [initializeFromSavedData, savedData]);

  const handleGoHome = () => {
    dispatch(resetForm());
    localStorage.removeItem("persist:root");
    navigate("/");
  };

  const onSubmit = async (data) => {
    setIsSaving(true);
    const dobFormatted = formatDobObjectToString(data.dob);

    await new Promise((res) => setTimeout(res, 1000));

    dispatch(
      savePersonal({
        ...data,
        dialCode,
        isVerified: true,
        dob: dobFormatted,
      })
    );
    dispatch(completeStep("step1"));
    navigate("/form/step-2");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow overflow-y-auto">
        <form
          id="step1Form"
          onSubmit={handleSubmit(onSubmit)}
          aria-label="Step 1 - Personal Info"
          className={`px-4 pb-32 pt-6 ${isSaving ? "opacity-50 pointer-events-none" : ""}`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ControlledInput
              name="name"
              control={control}
              labelKey="step1.name"
              placeholderKey="step1.namePlaceholder"
              rules={schema.name}
            />

            <NationalIdVerifier
              control={control}
              setValue={setValue}
              watch={watch}
              trigger={trigger}
              defaultVerified={savedData?.isVerified}
            />

            <Controller
              name="dob"
              control={control}
              rules={schema.dob}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <DateOfBirth
                  value={value}
                  onChange={onChange}
                  error={error?.message}
                />
              )}
            />

            <ControlledDropdown
              name="gender"
              control={control}
              labelKey="step1.gender"
              placeholderKey="step1.select"
              options={genderOptions}
              rules={schema.gender}
            />

            <ControlledInput
              name="address"
              control={control}
              labelKey="step1.address"
              placeholderKey="step1.addressPlaceholder"
            />

            <ControlledDropdown
              name="country"
              control={control}
              labelKey="step1.country"
              placeholderKey="step1.select"
              options={getCountryOptions()}
              rules={schema.country}
            />

            <ControlledDropdown
              name="state"
              control={control}
              labelKey="step1.state"
              placeholderKey="step1.select"
              options={states.map((s) => ({ value: s, label: s }))}
              disabled={!states.length}
              rules={schema.state}
            />

            <ControlledDropdown
              name="city"
              control={control}
              labelKey="step1.city"
              placeholderKey="step1.select"
              options={cities.map((c) => ({ value: c, label: c }))}
              disabled={!cities.length}
              rules={schema.city}
            />

            <PhoneNumber
              control={control}
              setValue={setValue}
              selectedCountry={selectedCountry}
              initialPhone={savedData?.phone}
            />

            <ControlledInput
              name="email"
              control={control}
              placeholderKey="step1.emailPlaceholder"
              labelKey="step1.email"
              rules={schema.email}
            />
          </div>
        </form>
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md p-4 z-50">
          <FormNavigationButtons
            isSaving={isSaving}
            onBackClick={handleGoHome}
            backLabelKey="buttons.backToHome"
            formId="step1Form"
          />
        </div>
      </div>
    </div>
  );
};

export default StepOne;
