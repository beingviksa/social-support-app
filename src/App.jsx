import { useEffect, useMemo } from "react";
import { useRoutes, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { getTitleMap } from "@utils/pageTitles";
import { ROUTES } from "./routes";

const App = () => {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const element = useRoutes(ROUTES);

  useEffect(() => {
    const updateHtmlAttributes = (lang) => {
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lang;
    };

    updateHtmlAttributes(i18n.language);
    i18n.on("languageChanged", updateHtmlAttributes);

    return () => {
      i18n.off("languageChanged", updateHtmlAttributes);
    };
  }, [i18n]);

  const titleMap = useMemo(() => getTitleMap(t), [t]);

  useEffect(() => {
    document.title =
      titleMap[location.pathname] || t("formTitle", "Application Form");
  }, [location.pathname, titleMap, t]);

  return element;
};

export default App;
