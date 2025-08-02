import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

import { startForm } from "@features/formProgress/formProgressSlice";

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
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white px-6 pt-6 pb-12 text-gray-800">
      <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 max-w-6xl mx-auto mt-10 mb-8">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            {t("appTitle", "Social Support Assistance Portal")}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8">
            {t(
              "appDesc",
              "Apply for financial aid with confidence. Our guided application helps you explain your situation clearly with optional AI assistance."
            )}
          </p>
          <Button
            onClick={handleStart}
            className="text-lg px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white inline-flex items-center gap-2"
          >
            {t("startNow", "Start Application")}
            <ArrowRightIcon className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex-1">
          <img
            src="/assets/illustration.svg"
            alt={t("heroAltText", "Illustration showing support")}
            className="w-full max-w-md mx-auto"
            loading="lazy"
          />
        </div>
      </section>

      <section
        aria-labelledby="how-it-works"
        className="w-full max-w-5xl mx-auto mt-10"
      >
        <h2
          id="how-it-works"
          className="text-2xl sm:text-3xl font-semibold text-center mb-10"
        >
          {t("howItWorks", "How It Works")}
        </h2>

        <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <li className="bg-white rounded shadow p-5 border-l-4 border-blue-500">
            <h3 className="font-bold text-lg mb-2">
              1. {t("step1Title", "Personal Information")}
            </h3>
            <p className="text-sm text-gray-700">
              {t(
                "step1Desc",
                "Provide your personal details including ID, contact, and location. All fields are validated."
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
    </main>
  );
};

export default Home;
