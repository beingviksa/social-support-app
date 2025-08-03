import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import withAuth from "@hoc/withAuth";

import StepOne from "@form/StepOne";
import StepTwo from "@form/StepTwo";
import StepThree from "@form/StepThree";
import ProgressBar from "@form/ProgressBar";

const steps = [
  {
    path: "/form/step-1",
    component: StepOne,
    titleKey: "step1.title",
    fallback: "Personal Information",
  },
  {
    path: "/form/step-2",
    component: StepTwo,
    titleKey: "step2.title",
    fallback: "Family & Financial Info",
  },
  {
    path: "/form/step-3",
    component: StepThree,
    titleKey: "step3.title",
    fallback: "Describe Your Situation",
  },
];

const FormWizard = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const currentStepIndex = steps.findIndex(
    (step) => step.path === location.pathname
  );
  const currentStep = currentStepIndex + 1;

  const heading = steps[currentStepIndex]
    ? t(steps[currentStepIndex].titleKey, steps[currentStepIndex].fallback)
    : t("formTitle", "Application Form");

  const StepRoutes = steps.map((step, index) => {
    const ProtectedComponent = withAuth(step.component);
    return (
      <Route
        key={index}
        path={`step-${index + 1}`}
        element={<ProtectedComponent />}
      />
    );
  });

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{heading}</h1>

      <ProgressBar step={currentStep} totalSteps={steps.length} />

      <Routes>
        <Route path="/" element={<Navigate to="step-1" replace />} />
        {StepRoutes}
      </Routes>
    </main>
  );
};

export default FormWizard;
