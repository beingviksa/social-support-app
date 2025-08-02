import { useTranslation } from "react-i18next";

const ProgressBar = ({ step, totalSteps }) => {
  const { t } = useTranslation();

  const progressPercent = ((step - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="mb-8">
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
          aria-valuenow={step}
          aria-valuemin={1}
          aria-valuemax={totalSteps}
          role="progressbar"
        />
      </div>
      <div className="text-sm mt-2 text-center text-gray-600">
        {t("stepProgress", { current: step, total: totalSteps })}
      </div>
    </div>
  );
};

export default ProgressBar;
