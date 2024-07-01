import { Outlet, useLocation } from "react-router-dom";

import { Navbar } from "./shared/Navbar";
import { Footer } from "./shared/footer";

const AppShell = () => {
  const location = useLocation();

  const hiddenRoutesNav = ["/login"];
  const hiddenRoutesFooter = ["/login", "/academy", "/pay_play"];

  const shouldHideNavbarNavbar = hiddenRoutesNav.includes(location.pathname);
  const shouldHideNavbarFooter = hiddenRoutesFooter.includes(location.pathname);

  return (
    <div className="flex flex-col gap-0 overflow-hidden">
      {!shouldHideNavbarNavbar && <Navbar />}
      <Outlet />
      {!shouldHideNavbarFooter && <Footer />}
    </div>
  );
};

export default AppShell;
