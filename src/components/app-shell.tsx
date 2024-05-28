import { Outlet } from "react-router-dom";

import { Navbar } from "./shared/Navbar";
import { ModeToggle } from "./mode-toggle";

const AppShell = () => {
  return (
    <div className="overflow-x-hidden">
      <ModeToggle />
      <Outlet />
      <Navbar />
    </div>
  );
};

export default AppShell;
