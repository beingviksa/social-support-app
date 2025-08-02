import { Outlet } from "react-router-dom";
import LanguageSwitcher from "@components/common/LanguageSwitcher";
import ScrollToTop from "@components/common/ScrollToTop";

const Layout = () => {
  return (
    <div className="flex flex-col bg-white">
      <ScrollToTop />
      <main className="flex-1">
        <LanguageSwitcher />
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
