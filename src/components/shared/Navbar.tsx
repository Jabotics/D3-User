import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/selectOption";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

// import { ModeToggle } from "../mode-toggle";
import logo from "/images/Logo.svg";
import { logout } from "@/store/actions/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { SlLocationPin } from "react-icons/sl";
import { ToggleOptions } from "../toggle-options";
import { FaCircle, FaUnlock } from "react-icons/fa";
import { Separator } from "../ui/separator";
import { RootState } from "@/store";

export const Navbar = () => {
  const dispatch = useAppDispatch();

  const isLarge = window.innerWidth > 1024;
  const isSix20 = window.innerWidth > 620;

  const { hasToken } = useAppSelector((state: RootState) => state.auth);

  return (
    <div className="fixed top-0 left-0 w-full z-20">
      <div className="w-full border-b border-slate-200 border-solid bg-white py-4">
        <div className="container">
          <div className="grid-container grid grid-cols-12 gap-7 items-center">
            {/* LOGO */}
            <div className="col-span-12 lg:col-span-2 gap-4">
              <div className="logo text-center flex items-center justify-center">
                <img src={logo} alt="logo" className="max-lg:h-8 h-10" />
              </div>
            </div>

            {/* LOCATION */}
            <div className="ml-2 lg:ml-0 max-[290px]:col-span-5 max-[350px]:col-span-4 col-span-6 sm:col-span-6 lg:col-span-4 gap-4 custome-break max-[390px]:text-xs">
              <Select>
                <SelectTrigger className="w-full h-8 border border-gray-200 text-gray-400 focus:border-transparent focus:ring-0 hover:border-transparent active:border-transparent">
                  <SelectValue
                    placeholder={
                      <span className="flex items-center">
                        <SlLocationPin className="mr-2 text-green-500" /> Select
                        Location
                      </span>
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="location1">Location 1</SelectItem>
                    <SelectItem value="location2">Location 2</SelectItem>
                    <SelectItem value="location3">Location 3</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* BUTTONS */}
            <div className="col-span-4 sm:col-span-5 max-[290px]:col-span-4  max-[350px]:col-span-5 lg:col-span-6 gap-4 flex flex-row justify-end  items-center custome-break sm:mr-2">
              {isLarge && (
                <div className="max-lg:hidden flex items-center gap-2">
                  <Button
                    variant={"outline"}
                    className="w-20 text-xs h-8 rounded-xl"
                  >
                    Pay & Play
                  </Button>
                  <Button
                    variant={"outline"}
                    className="w-20 text-xs h-8 rounded-xl"
                  >
                    Academy
                  </Button>
                  <Button
                    variant={"outline"}
                    className="w-20 text-xs h-8 rounded-xl"
                  >
                    Membership
                  </Button>
                </div>
              )}
              <div className="cta flex items-center gap-2">
                <Button
                  variant={"outline"}
                  className="w-21 text-xs h-8 rounded-xl"
                  onClick={() => {
                    dispatch(logout());
                    window.open("/login", "_self");
                  }}
                >
                  <LogIn className="mr-2 text-green-500" size={14} />
                  {hasToken ? isLarge && "Logout" : isLarge && "Login"}
                </Button>

                <Button
                  variant={"theme"}
                  className="w-21 text-xs h-8 rounded-xl"
                  onClick={() => window.open("/", "_self")}
                >
                  {!isLarge ? (
                    <>
                      <FaUnlock />
                    </>
                  ) : (
                    "Book Now"
                  )}
                </Button>
              </div>
            </div>

            {/* THEME */}
            <div className="col-span-2 sm:col-span-1 lg:hidden flex flex-row  items-center justify-end  gap-4 custome-break mr-2 lg:mr-0">
              {/* <div className="hidden lg:block"><ModeToggle /></div> */}
              <div className="block lg:hidden">
                <ToggleOptions />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="  bg-white w-full">
        <div className="container text-gray-400 pb-2 pt-1 flex items-center justify-between">
          <div className="flex items-center text-xs font-normal">
            {[
              { title: isSix20 ? "About Us" : "About" },
              { title: isSix20 ? "My Account" : "Account" },
              { title: "Favourites" },
              { title: "Contact" },
            ].map((item, index) => {
              return (
                <div
                  className={`flex h-3 items-center justify-center ${
                    isSix20 ? "space-x-2" : "space-x-0"
                  }`}
                  key={index}
                >
                  <Button
                    variant={"ghost"}
                    className={`${isSix20 ? "ml-2" : "ml-0"} w-[4rem] h-2 ${
                      isSix20 ? "text-[12px]" : "text-[11px]"
                    } ${isSix20 ? "tracking-tight" : "tracking-tighter"}`}
                  >
                    {item.title}
                  </Button>
                  {item.title !== "Contact" && (
                    <Separator orientation="vertical" />
                  )}
                </div>
              );
            })}
          </div>

          {isSix20 ? (
            <div className="flex items-center text-xs">
              Need help? Call Us &nbsp;
              <FaCircle size={6} />
              &nbsp;
              <span className="font-semibold text-theme">1800 900 567</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
