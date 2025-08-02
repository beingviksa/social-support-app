import { useEffect } from "react";
import { useRoutes } from "react-router-dom";

import { ROUTES } from "./routes";
import i18n from "./i18n";

const App = () => {
  useEffect(() => {
    const updateDir = (lang) => {
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    };

    updateDir(i18n.language);
    i18n.on("languageChanged", updateDir);

    return () => {
      i18n.off("languageChanged", updateDir);
    };
  }, []);

  return useRoutes(ROUTES);
};

export default App;
