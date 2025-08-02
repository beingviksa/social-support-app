import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { saveFinancial } from "../../features/form/formSlice";
import { completeStep } from "../../features/formProgress/formProgressSlice";

import Button from "../common/Button";
import ControlledInput from "../form/ControlledInput";
import ControlledDropdown from "../form/ControlledDropdown";

const StepTwo = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSaving, setIsSaving] = useState(false);

  const savedData = useSelector((state) => state.form.financial);

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: savedData || {},
  });

  // Restore all saved values on load
  useEffect(() => {
    if (savedData) {
      Object.entries(savedData).forEach(([key, value]) => {
        if (value !== undefined) {
          setValue(key, value);
        }
      });
    }
  }, [savedData, setValue]);

  const onSubmit = async (data) => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    dispatch(saveFinancial(data));
    dispatch(completeStep("step2"));
    navigate("/form/step-3");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      aria-label="Family & Financial Info Form"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Marital Status */}
        <ControlledDropdown
          name="maritalStatus"
          control={control}
          labelKey="step2.maritalStatus"
          placeholderKey="step1.select"
          options={[
            { value: "single", labelKey: "step2.options.single" },
            { value: "married", labelKey: "step2.options.married" },
            { value: "divorced", labelKey: "step2.options.divorced" },
            { value: "widowed", labelKey: "step2.options.widowed" },
          ]}
          rules={{ required: t("step2.maritalRequired") }}
        />

        {/* Number of Dependents */}
        <ControlledInput
          name="dependents"
          control={control}
          labelKey="step2.dependents"
          inputMode="numeric"
          type="number"
          rules={{ required: t("step2.dependentsRequired") }}
        />

        {/* Employment Status */}
        <ControlledDropdown
          name="employmentStatus"
          control={control}
          labelKey="step2.employment"
          placeholderKey="step1.select"
          options={[
            { value: "employed", labelKey: "step2.options.employed" },
            { value: "unemployed", labelKey: "step2.options.unemployed" },
            { value: "student", labelKey: "step2.options.student" },
            { value: "retired", labelKey: "step2.options.retired" },
          ]}
          rules={{ required: t("step2.employmentRequired") }}
        />

        {/* Monthly Income */}
        <ControlledInput
          name="income"
          control={control}
          labelKey="step2.income"
          type="number"
          inputMode="numeric"
          rules={{ required: t("step2.incomeRequired") }}
        />

        {/* Housing Status */}
        <ControlledDropdown
          name="housing"
          control={control}
          labelKey="step2.housing"
          placeholderKey="step1.select"
          options={[
            { value: "rented", labelKey: "step2.options.rented" },
            { value: "owned", labelKey: "step2.options.owned" },
            { value: "with_family", labelKey: "step2.options.with_family" },
            { value: "homeless", labelKey: "step2.options.homeless" },
          ]}
          rules={{ required: t("step2.housingRequired") }}
        />
      </div>

      {/* Buttons */}
      <div className="mt-8 flex justify-between items-center flex-wrap gap-4">
        <Button variant="text" onClick={() => navigate("/form/step-1")}>
          ← {t("buttons.back")}
        </Button>

        <Button type="submit" isLoading={isSaving}>
          {t("buttons.saveAndContinue")}
        </Button>
      </div>
    </form>
  );
};

export default StepTwo;
