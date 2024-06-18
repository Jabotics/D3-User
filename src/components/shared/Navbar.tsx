import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

import logo from "/images/Logo.svg";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { SlLocationPin } from "react-icons/sl";
import { ToggleOptions } from "../toggle-options";
import { MdCall } from "react-icons/md";

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
import {
  setSelectedCity,
  useGetCitiesQuery,
} from "@/store/actions/slices/citySlice";
import { useState } from "react";

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const pathName = useLocation();

  const [open, setOpen] = useState(false);

  const isLarge = window.innerWidth >= 1024;
  // const isSix20 = window.innerWidth >= 620;

  const { hasToken } = useAppSelector((state: RootState) => state.auth);

  const [search, setSearch] = useState<string>("");

  const { cities, selectedCity } = useAppSelector(
    (state: RootState) => state.city
  );
  useGetCitiesQuery(
    {
      search,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const selectedCityName = cities.find((i) => i.id === selectedCity)?.name;

  const handleCitySelect = (cityId: string) => {
    setSearch("");
    dispatch(setSelectedCity(cityId));
    setOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-20">
      <div className="w-full border-slate-200 border-solid bg-white py-4">
        <div className="container">
          <div className="grid-container grid grid-cols-12 gap-7 items-center">
            {/* LOGO */}
            <div className="col-span-12 lg:col-span-2 gap-4">
              <div className="logo text-center flex items-center justify-between px-4">
                <img
                  src={logo}
                  alt="logo"
                  className="h-8 md:h-9 cursor-pointer"
                  onClick={() => navigate("/")}
                />
                <div className="flex items-center gap-1 lg:hidden">
                  <MdCall size={18} className="text-green-700" />
                  <span className="text-[12px] font-[900] tracking-tighter ">
                    9987 878 878
                  </span>
                </div>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="col-span-4 sm:col-span-5 max-[290px]:col-span-4  max-[350px]:col-span-5 lg:col-span-7 gap-4 flex justify-end  items-center custome-break sm:mr-2">
              {isLarge && (
                <div className="max-lg:hidden flex items-center justify-start gap-2">
                  <Button
                    variant={"outline"}
                    className={`px-4 2xl:px-12 text-xs h-7 rounded-3xl ${
                      pathName.pathname === "/about"
                        ? "bg-green-500 text-gray-50 hover:bg-green-400"
                        : ""
                    }`}
                    onClick={() => {}}
                  >
                    About Us
                  </Button>
                  <Button
                    variant={"outline"}
                    className={`px-4 2xl:px-12 text-xs h-7 rounded-3xl ${
                      pathName.pathname === "/pay_play"
                        ? "bg-green-500 text-gray-50 hover:bg-green-400"
                        : ""
                    }`}
                    onClick={() => {
                      navigate("/pay_play");
                    }}
                  >
                    Pay & Play
                  </Button>
                  <Button
                    variant={"outline"}
                    className={`px-4 2xl:px-12 text-xs h-7 rounded-3xl ${
                      pathName.pathname === "/academy"
                        ? "bg-green-500 text-gray-50 hover:bg-green-400"
                        : ""
                    }`}
                    onClick={() => {
                      navigate("/academy");
                    }}
                  >
                    Academy
                  </Button>
                  <Button
                    variant={"outline"}
                    className={`px-4 2xl:px-12 text-xs h-7 rounded-3xl ${
                      pathName.pathname === "/membership"
                        ? "bg-green-500 text-gray-50 hover:bg-green-400"
                        : ""
                    }`}
                  >
                    Membership
                  </Button>
                  <Button
                    variant={"outline"}
                    className={`px-4 2xl:px-12 text-xs h-7 rounded-3xl ${
                      pathName.pathname === "/contact"
                        ? "bg-green-500 text-gray-50 hover:bg-green-400"
                        : ""
                    }`}
                    onClick={() => {
                      navigate("/contact");
                    }}
                  >
                    Contact
                  </Button>
                </div>
              )}
              <div />
            </div>

            {/* LOCATION */}
            <div className="ml-2 lg:ml-0 max-[290px]:col-span-5 max-[350px]:col-span-4 col-span-6 sm:col-span-6 lg:col-span-3 gap-4 flex items-center justify-end max-[390px]:text-xs">
              <Dialog open={open} onOpenChange={() => setOpen(!open)}>
                <DialogTrigger
                  asChild
                  className=""
                  onClick={() => setOpen(!open)}
                >
                  <Button
                    variant="outline"
                    className={`${
                      selectedCityName ? "w-16" : "w-32 "
                    } h-6 lg:h-7 rounded-3xl`}
                    onClick={() => setOpen(true)}
                  >
                    <span
                      className={`flex items-center justify-center text-[11px] md:text-[10px] font-base ${
                        selectedCityName && "tracking-tighter"
                      }`}
                    >
                      {selectedCityName ? (
                        selectedCityName
                      ) : (
                        <SlLocationPin size={15} className="text-green-500" />
                      )}
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[725px] h-[320px] slide-in-from-top">
                  <DialogHeader>
                    <DialogTitle>Search Your Location</DialogTitle>
                    <DialogDescription>
                      Type few letters to see the location in active.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4 h-[45vh] flex flex-col items-start justify-start gap-4 w-full">
                    <div className="h-1/12 gap-4 pr-2 w-full">
                      <Input
                        id="name"
                        className="h-8 outline-none focus:outline-none focus:ring-0 border-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search for city..."
                        autoComplete="off"
                        autoFocus
                        style={{
                          outline: "none",
                          border: "none",
                          appearance: "none",
                          boxShadow: "none",
                        }}
                      />
                    </div>
                    <div className="h-[1px] w-full bg-gray-200" />
                    <div className="h-11/12 w-full flex items-center overflow-y-hidden overflow-x-auto mt-5 gap-5">
                      {cities.map((item, index) => (
                        <div
                          key={index}
                          className="w-20 h-20 rounded-full flex items-center justify-center text-sm border-2 border-dashed border-gray-300 font-extralight bg-teal-900 text-white cursor-pointer"
                          onClick={() => handleCitySelect(item.id)}
                        >
                          {item.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

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
                      variant={"default"}
                      className="w-21 text-sm h-6 lg:h-7 rounded-3xl bg-green-500 text-gray-50 hover:bg-green-400"
                      onClick={() => {
                        // window.open("/login", "_self");
                        navigate("/login");
                      }}
                    >
                      <LogIn className="mr-2 text-white" size={14} />
                      {isLarge && "Login"}
                    </Button>
                  )}
                </>
              </div>
              <span className="font-medium hidden lg:inline-flex text-[15px] items-end w-full justify-start gap-2 tracking-tighter whitespace-nowrap mr-4">
                <MdCall size={20} className="text-[#53A53F]" />
                <span className="-mb-[3px] -ml-[3px]">9874 475 988</span>
              </span>
            </div>

            {/* THEME */}
            <div className="col-span-2 sm:col-span-1 lg:hidden flex flex-row items-center justify-end  gap-4 custome-break mr-2 lg:mr-0">
              <div className="block lg:hidden">
                <ToggleOptions />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
