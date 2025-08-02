import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

import { startForm } from "@features/formProgress/formProgressSlice";

import LanguageSwitcher from "@common/LanguageSwitcher";
import Button from "@common/Button";

const Home = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleStart = () => {
    dispatch(startForm());
    navigate("/form/step-1");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-6 py-12 flex flex-col items-center justify-center text-gray-800">
      <LanguageSwitcher />

      {/* Header */}
      <header className="text-center max-w-3xl mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          {t("appTitle", "Social Support Assistance Portal")}
        </h1>
        <p className="text-lg sm:text-xl">
          {t(
            "appDesc",
            "Apply for financial aid with confidence. Our accessible, step-by-step application helps you describe your situation with optional AI assistance."
          )}
        </p>
      </header>

      {/* Hero Image */}
      <div className="w-full max-w-xl mb-10">
        <img
          src="/assets/illustration.svg"
          alt={t("heroAltText", "Illustration showing support")}
          className="w-full h-auto"
        />
      </div>

      {/* Steps */}
      <section
        aria-labelledby="how-it-works"
        className="w-full max-w-4xl mb-12"
      >
        <h2
          id="how-it-works"
          className="text-2xl font-semibold text-center mb-6"
        >
          {t("howItWorks", "How It Works")}
        </h2>

        <ol className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <li className="bg-white rounded shadow p-5 border-l-4 border-blue-500">
            <h3 className="font-bold text-lg mb-2">
              1. {t("step1Title", "Personal Information")}
            </h3>
            <p className="text-sm text-gray-700">
              {t(
                "step1Desc",
                "Provide your personal de tails including ID, contact, and location. All fields are validated."
              )}
            </p>
          </li>

          <li className="bg-white rounded shadow p-5 border-l-4 border-blue-500">
            <h3 className="font-bold text-lg mb-2">
              2. {t("step2Title", "Family & Financial Info")}
            </h3>
            <p className="text-sm text-gray-700">
              {t(
                "step2Desc",
                "Tell us about your employment, income, housing, and dependents to assess your eligibility."
              )}
            </p>
          </li>

          <li className="bg-white rounded shadow p-5 border-l-4 border-blue-500">
            <h3 className="font-bold text-lg mb-2">
              3. {t("step3Title", "Describe Your Situation")}
            </h3>
            <p className="text-sm text-gray-700">
              {t(
                "step3Desc",
                "Use our AI-powered assistant to help you describe your current challenges in clear language."
              )}
            </p>
          </li>
        </ol>
      </section>

      {/* CTA Button */}
      <Button onClick={handleStart} className="text-lg px-6 py-3">
        {t("startNow", "Start Application")}
        <ArrowRightIcon className="w-5 h-5 ml-2" />
      </Button>
    </main>
  );
};

export default Home;
