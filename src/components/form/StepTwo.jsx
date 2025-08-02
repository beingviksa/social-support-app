import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import useRestoreSavedValues from "@hooks/useRestoreSavedValues";

import { saveFinancial } from "@features/form/formSlice";
import { completeStep } from "@features/formProgress/formProgressSlice";

import { financialFormSchema } from "@validations/financialFormSchema";

import ControlledInput from "@form/ControlledInput";
import ControlledDropdown from "@form/ControlledDropdown";
import FormNavigationButtons from "@form/FormNavigationButtons";

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
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow overflow-y-auto">
        <form
          id="step2Form"
          onSubmit={handleSubmit(onSubmit)}
          aria-label="Step 2 - Financial Info"
          className={`px-4 pb-32 pt-6 ${isSaving ? "opacity-50 pointer-events-none" : ""}`}
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
        </form>
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md p-4 z-50">
          <FormNavigationButtons
            isSaving={isSaving}
            onBackClick={() => navigate("/form/step-1")}
            formId="step2Form"
          />
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
