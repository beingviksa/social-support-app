import LanguageSwitcher from "../components/common/LanguageSwitcher";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/common/ScrollToTop";

const Layout = () => {
  return (
    <div className="relative min-h-screen">
      <ScrollToTop />
      <LanguageSwitcher />
      <Outlet />
    </div>
  );
};

export default Layout;
