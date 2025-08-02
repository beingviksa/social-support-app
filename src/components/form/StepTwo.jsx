import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import useRestoreSavedValues from "@hooks/useRestoreSavedValues";

import { saveFinancial } from "@features/form/formSlice";
import { completeStep } from "@features/formProgress/formProgressSlice";

import { financialFormSchema } from "@validations/financialFormSchema";

import Button from "@common/Button";
import ControlledInput from "@form/ControlledInput";
import ControlledDropdown from "@form/ControlledDropdown";

import {
  maritalOptions,
  employmentOptions,
  housingOptions,
} from "@constants/dropdownoptions";

const StepTwo = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const savedData = useSelector((state) => state.form.financial);
  const [isSaving, setIsSaving] = useState(false);

  const schema = financialFormSchema(t);

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: savedData || {},
  });

  useRestoreSavedValues(savedData, setValue);

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
      aria-label="Step 2 - Financial Info"
      className={isSaving ? "opacity-50 pointer-events-none" : ""}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ControlledDropdown
          name="maritalStatus"
          control={control}
          labelKey="step2.maritalStatus"
          placeholderKey="step1.select"
          options={maritalOptions}
          rules={schema.maritalStatus}
        />

        <ControlledInput
          name="dependents"
          control={control}
          labelKey="step2.dependents"
          inputMode="numeric"
          type="number"
          rules={schema.dependents}
        />

        <ControlledDropdown
          name="employmentStatus"
          control={control}
          labelKey="step2.employment"
          placeholderKey="step1.select"
          options={employmentOptions}
          rules={schema.employmentStatus}
        />

        <ControlledInput
          name="income"
          control={control}
          labelKey="step2.income"
          type="number"
          inputMode="numeric"
          rules={schema.income}
        />

        <ControlledDropdown
          name="housing"
          control={control}
          labelKey="step2.housing"
          placeholderKey="step1.select"
          options={housingOptions}
          rules={schema.housing}
        />
      </div>

      <div className="mt-8 flex justify-between flex-wrap gap-4">
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
