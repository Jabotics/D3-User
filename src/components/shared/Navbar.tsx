import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

import logo from "/images/Logo.svg";
import { useAppSelector } from "@/store/hooks";
import { useNavigate } from "react-router-dom";
import { SlLocationPin } from "react-icons/sl";
import { ToggleOptions } from "../toggle-options";
import { FaCircle, FaUnlock } from "react-icons/fa";

import { IconHeadset } from "@tabler/icons-react";

import { RootState } from "@/store";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "../ui/separator";

export const Navbar = () => {
  const navigate = useNavigate();

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
              <div className="logo text-center flex items-center justify-between px-4">
                <img
                  src={logo}
                  alt="logo"
                  className="h-7 sm:h-8 lg:h-10 cursor-pointer"
                  onClick={() => navigate("/")}
                />
                <div className="flex items-center gap-1 lg:hidden">
                  <IconHeadset size={18} />
                  <span className="text-[14px] font-[900] tracking-tighter text-green-700">
                    9987 878 878
                  </span>
                </div>
              </div>
            </div>

            {/* LOCATION */}
            <div className="ml-2 lg:ml-0 max-[290px]:col-span-5 max-[350px]:col-span-4 col-span-6 sm:col-span-6 lg:col-span-4 gap-4 custome-break max-[390px]:text-xs">
              <Dialog>
                <DialogTrigger asChild className="">
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-start h-6 lg:h-9"
                  >
                    <span className="flex items-center justify-start text-[11px] md:text-[14px]">
                      <SlLocationPin className="mr-2 text-green-500" /> Select
                      Location
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Search your location</DialogTitle>
                    <DialogDescription>
                      Type few letters to see the location in active.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4 h-[45vh]">
                    <div className="grid grid-cols-4 items-center h-4 gap-4">
                      <Input
                        id="name"
                        defaultValue="Gulmohar"
                        className="col-span-4"
                      />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* BUTTONS */}
            <div className="col-span-4 sm:col-span-5 max-[290px]:col-span-4  max-[350px]:col-span-5 lg:col-span-6 gap-4 flex flex-row justify-end  items-center custome-break sm:mr-2">
              {isLarge && (
                <div className="max-lg:hidden flex items-center gap-2">
                  <Button
                    variant={"outline"}
                    className="w-20 text-xs h-8 rounded-xl"
                    onClick={() => {
                      navigate("/pay_play");
                    }}
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
                <>
                  {hasToken ? (
                    <div className="w-full flex items-center justify-center">
                      <div
                        className="w-8 h-8 bg-gray-600 rounded-full cursor-pointer aspect-auto border-[1px] border-gray-300"
                        style={{
                          backgroundImage: "url('/images/viewers.webp')",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                        onClick={() => {
                          navigate("/profile");
                        }}
                      />
                    </div>
                  ) : (
                    <Button
                      variant={"outline"}
                      className="w-21 text-xs h-6 lg:h-8 rounded-xl"
                      onClick={() => {
                        // window.open("/login", "_self");
                        navigate("/login");
                      }}
                    >
                      <LogIn className="mr-2 text-green-500" size={14} />
                      {isLarge && "Login"}
                    </Button>
                  )}
                </>

                <Button
                  variant={"theme"}
                  className="w-21 text-xs h-6 lg:h-8 rounded-xl"
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
                    onClick={() => {
                      if (item.title === "My Account" || "Account") {
                        navigate("/profile");
                      }
                    }}
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
