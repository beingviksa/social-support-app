import { useTranslation } from "react-i18next";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const VerifiedBadge = ({ className = "" }) => {
  const { t, i18n } = useTranslation();

  return (
    <div
      className={`inline-flex items-center text-green-600 text-sm font-medium gap-1 ${
        i18n.dir() === "rtl" ? "flex-row-reverse" : ""
      } ${className}`}
      role="status"
      aria-live="polite"
    >
      <CheckCircleIcon className="w-4 h-4" aria-hidden="true" />
      <span>{t("step1.otp.verified")}</span>
    </div>
  );
};

export default VerifiedBadge;
