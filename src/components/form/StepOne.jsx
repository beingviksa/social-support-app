import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { savePersonal, resetForm } from "../../features/form/formSlice";
import { completeStep } from "../../features/formProgress/formProgressSlice";

import Button from "../common/Button";
import ControlledInput from "../form/ControlledInput";
import ControlledDropdown from "../form/ControlledDropdown";
import NationalIdVerifier from "./NationalIdVerifier";
import PhoneNumber from "./PhoneNumber";
import DateOfBirth from "./DateOfBirth";

import {
  mockCountries,
  statesByCountry,
  citiesByState,
} from "../../utils/mockData";

const StepOne = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const savedData = useSelector((state) => state.form.personal);

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [dialCode, setDialCode] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const { control, handleSubmit, watch, setValue, trigger } = useForm({
    defaultValues: {
      ...savedData,
      dob: savedData?.dob || { day: "", month: "", year: "" },
    },
  });

  const selectedCountry = watch("country");
  const selectedState = watch("state");

  // Populate states/cities based on saved data
  useEffect(() => {
    if (savedData?.country) {
      const country = mockCountries.find((c) => c.code === savedData.country);
      setDialCode(country?.dialCode || "");
      setStates(statesByCountry[savedData.country] || []);
    }
    if (savedData?.state) {
      setCities(citiesByState[savedData.state] || []);
    }
  }, [savedData]);

  useEffect(() => {
    if (selectedCountry) {
      const country = mockCountries.find((c) => c.code === selectedCountry);
      setDialCode(country?.dialCode || "");
      setStates(statesByCountry[selectedCountry] || []);
      setValue("state", "");
      setCities([]);
      setValue("city", "");
    }
  }, [selectedCountry, setValue]);

  useEffect(() => {
    if (selectedState) {
      setCities(citiesByState[selectedState] || []);
    }
  }, [selectedState]);

  // Restore state value after states are populated
  useEffect(() => {
    if (
      states.length > 0 &&
      savedData?.state &&
      states.includes(savedData.state)
    ) {
      setValue("state", savedData.state);
    }
  }, [states, savedData?.state, setValue]);

  // Restore city value after cities are populated
  useEffect(() => {
    if (
      cities.length > 0 &&
      savedData?.city &&
      cities.includes(savedData.city)
    ) {
      setValue("city", savedData.city);
    }
  }, [cities, savedData?.city, setValue]);

  useEffect(() => {
    if (savedData?.phone) {
      setValue("phone", savedData.phone);
    }
  }, [savedData?.phone, setValue]);

  useEffect(() => {
    if (typeof savedData?.dob === "string" && savedData.dob.includes("-")) {
      const [year, month, day] = savedData.dob.split("-");
      setValue("dob", {
        day: day.padStart(2, "0"),
        month: month.padStart(2, "0"),
        year: year,
      });
    }
  }, [savedData?.dob, setValue]);

  const handleGoHome = () => {
    dispatch(resetForm());
    localStorage.removeItem("persist:root");
    navigate("/");
  };

  const onSubmit = async (data) => {
    setIsSaving(true);

    const { day, month, year } = data.dob;
    const dobFormatted = `${year}-${month}-${day}`;

    await new Promise((res) => setTimeout(res, 1000));
    dispatch(
      savePersonal({ ...data, dialCode, isVerified: true, dob: dobFormatted })
    );
    dispatch(completeStep("step1"));
    navigate("/form/step-2");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} aria-label="Step 1 - Personal Info">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <ControlledInput
          name="name"
          placeholderKey="step1.namePlaceholder"
          control={control}
          labelKey="step1.name"
          rules={{ required: t("step1.nameRequired") }}
        />

        {/* National ID */}
        <NationalIdVerifier
          control={control}
          setValue={setValue}
          watch={watch}
          trigger={trigger}
          defaultVerified={savedData?.isVerified}
        />

        {/* DOB */}
        <Controller
          name="dob"
          control={control}
          rules={{
            required: t("step1.dobRequired"),
            validate: (value) => {
              if (!value || !value.day || !value.month || !value.year) {
                return t("step1.dobRequired");
              }
              return true;
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <DateOfBirth
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />

        {/* Gender */}
        <ControlledDropdown
          name="gender"
          control={control}
          labelKey="step1.gender"
          placeholderKey="step1.select"
          options={[
            { value: "male", labelKey: "gender.male" },
            { value: "female", labelKey: "gender.female" },
            { value: "other", labelKey: "gender.other" },
          ]}
          rules={{ required: t("step1.genderRequired") }}
        />

        {/* Address */}
        <ControlledInput
          name="address"
          control={control}
          labelKey="step1.address"
          placeholderKey="step1.addressPlaceholder"
        />

        {/* Country */}
        <ControlledDropdown
          name="country"
          control={control}
          labelKey="step1.country"
          placeholderKey="step1.select"
          options={mockCountries.map((c) => ({
            value: c.code,
            label: c.name,
          }))}
          rules={{ required: t("step1.countryRequired") }}
        />

        {/* State */}
        <ControlledDropdown
          name="state"
          control={control}
          labelKey="step1.state"
          placeholderKey="step1.select"
          options={states.map((s) => ({ value: s, label: s }))}
          disabled={!states.length}
          rules={{ required: t("step1.stateRequired") }}
        />

        {/* City */}
        <ControlledDropdown
          name="city"
          control={control}
          labelKey="step1.city"
          placeholderKey="step1.select"
          options={cities.map((c) => ({ value: c, label: c }))}
          disabled={!cities.length}
          rules={{ required: t("step1.cityRequired") }}
        />

        {/* Phone Number */}
        <PhoneNumber
          control={control}
          setValue={setValue}
          selectedCountry={watch("country")}
          initialPhone={savedData?.phone}
        />

        {/* Email */}
        <ControlledInput
          name="email"
          control={control}
          placeholderKey="step1.emailPlaceholder"
          labelKey="step1.email"
          rules={{
            required: t("step1.emailRequired"),
            pattern: {
              value: /^\S+@\S+$/i,
              message: t("step1.emailInvalid"),
            },
          }}
        />
      </div>

      {/* Buttons */}
      <div className="mt-8 flex justify-between flex-wrap gap-4">
        <Button variant="text" onClick={handleGoHome}>
          ← {t("buttons.backToHome")}
        </Button>
        <Button type="submit" isLoading={isSaving}>
          {t("buttons.saveAndContinue")}
        </Button>
      </div>
    </form>
  );
};

export default StepOne;
