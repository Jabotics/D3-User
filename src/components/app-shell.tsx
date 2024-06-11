import { Outlet, useLocation } from "react-router-dom";

import { Navbar } from "./shared/Navbar";
import { Footer } from "./shared/footer";

const AppShell = () => {
  const location = useLocation();

  const hiddenRoutes = ["/login", "/register", "/otp"];
  const shouldHideNavbarFooter = hiddenRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col gap-0">
      {!shouldHideNavbarFooter && <Navbar />}
      <Outlet />
      {!shouldHideNavbarFooter && <Footer />}
    </div>
  );
};

export default AppShell;
