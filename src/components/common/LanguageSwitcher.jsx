import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  return (
    <button
      onClick={toggleLanguage}
      className="absolute top-4 right-4 text-sm px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 focus:outline-none focus:ring focus:ring-blue-300"
      aria-label={
        i18n.language === "en" ? "Switch to Arabic" : "Switch to English"
      }
    >
      {i18n.language === "en" ? "عربي" : "EN"}
    </button>
  );
};

export default LanguageSwitcher;
