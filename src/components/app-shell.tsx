import { Outlet } from "react-router-dom"
import Navbar from "./shared/Navbar"

const AppLayout = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default AppLayout