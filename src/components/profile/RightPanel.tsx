import React from "react";
import { useAppSelector } from "@/store/hooks";
import { Academy, Booking, Favorites, Memberships } from "./components";
import { RootState } from "@/store";
import { useVerifySessionQuery } from "@/store/actions/slices/authSlice";

const tabInfo: {
  title: "Academy" | "My Booking" | "Memberships" | "Favorite" | "Logout";
  component: React.JSX.Element;
}[] = [
  {
    title: "My Booking",
    component: <Booking />,
  },
  {
    title: "Academy",
    component: <Academy />,
  },
  {
    title: "Memberships",
    component: <Memberships />,
  },
  {
    title: "Favorite",
    component: <Favorites />,
  },
];

const RightPanel = () => {

  useVerifySessionQuery({})
  
  const { title } = useAppSelector((state: RootState) => state.profile);
  const currentTabIndex = tabInfo.findIndex((i) => i.title === title);

  if (currentTabIndex === -1) {
    return (
      <>
        <Booking />
      </>
    ); //Error handling
  }

  return <>{tabInfo[currentTabIndex].component}</>;
};

export default RightPanel;
