import { useTranslation } from "react-i18next";

const Button = ({
  children,
  onClick,
  type = "button",
  loadingText,
  isLoading = false,
  disabled = false,
  className = "",
  variant = "primary",
  form,
  ariaLabel,
}) => {
  const { t } = useTranslation();

  const effectiveLoadingText = loadingText || t("buttons.saving");

  const baseStyles =
    "inline-flex items-center justify-center px-4 py-2 rounded font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600 transition cursor-pointer";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200 border",
    text: "text-blue-600 hover:underline bg-transparent",
  };

  const loadingSpinner = (
    <svg className="animate-spin h-4 w-4 me-2 text-white" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );

  return (
    <button
      type={type}
      onClick={onClick}
      form={form}
      disabled={disabled || isLoading}
      aria-label={ariaLabel || undefined}
      aria-busy={isLoading}
      className={`${baseStyles} ${variants[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {isLoading && loadingSpinner}
      {isLoading ? effectiveLoadingText : children}
    </button>
  );
};

export default Button;
