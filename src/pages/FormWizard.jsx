import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import StepOne from "../components/form/StepOne";
import StepTwo from "../components/form/StepTwo";
import StepThree from "../components/form/StepThree";
import ProgressBar from "../components/form/ProgressBar";
import withAuth from "../hoc/withAuth";

const FormWizard = () => {
  const { t } = useTranslation();

  const location = useLocation();

  const stepMap = {
    "/form/step-1": 1,
    "/form/step-2": 2,
    "/form/step-3": 3,
  };

  const currentStep = stepMap[location.pathname] || 1;

  const ProtectedStep1 = withAuth(StepOne);
  const ProtectedStep2 = withAuth(StepTwo);
  const ProtectedStep3 = withAuth(StepThree);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{t("formTitle")}</h1>

      {/* Step Indicator */}
      <ProgressBar step={currentStep} totalSteps={3} />

      {/* Step Content */}
      <Routes>
        <Route path="/" element={<Navigate to="step-1" replace />} />
        <Route path="step-1" element={<ProtectedStep1 />} />
        <Route path="step-2" element={<ProtectedStep2 />} />
        <Route path="step-3" element={<ProtectedStep3 />} />
      </Routes>
    </main>
  );
};

export default FormWizard;
