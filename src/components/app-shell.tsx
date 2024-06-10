import { Outlet } from "react-router-dom";

// import { Navbar } from "./shared/Navbar";
// import { Footer } from "./shared/footer";


const AppShell = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Outlet />
      {/* <Footer/> */}
    </>
  );
};

export default AppShell;
