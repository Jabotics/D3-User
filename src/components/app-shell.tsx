import { Outlet } from "react-router-dom"
import Navbar from "./shared/Navbar"
import { useEffect, useState } from "react";
import '../styles/globals.css'; 
import { Button } from "primereact/button";

const AppLayout = () => {
  

  return (
    <div className="overflow-x-hidden bg-white dark:bg-black"  >
      <Navbar />
      <Outlet />
    </div>
  )
}

export default AppLayout