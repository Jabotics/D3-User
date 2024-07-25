import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

import logo from "/images/Logo.svg";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SlLocationPin } from "react-icons/sl";
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
import { useEffect, useRef, useState } from "react";
import { setTitle } from "@/store/actions/slices/profileSlice";
import { APIEndPoints } from "@/APIEndpoint";

// import { RiArrowDropDownLine } from "react-icons/ri";
import { ToggleOptions } from "../toggle-options";

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const pathName = useLocation();

  const mobileRef = useRef<HTMLDivElement>(null);

  const isLarge = window.innerWidth >= 1024;
  // const isSix20 = window.innerWidth >= 620;

  const [showMobile, setShowMobile] = useState(false);

  const { userData, hasToken } = useAppSelector(
    (state: RootState) => state.auth
  );

  const [search, setSearch] = useState<string>("");

  const { cities, selectedCity } = useAppSelector(
    (state: RootState) => state.city
  );
  const [open, setOpen] = useState(selectedCity ? false : true);

  useGetCitiesQuery(
    {
      search,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const selectedCityName = cities.find((i) => i.id === selectedCity)?.name;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileRef.current &&
        !mobileRef.current.contains(event.target as Node)
      ) {
        setShowMobile(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleCitySelect = (cityId: string) => {
    setSearch("");
    dispatch(setSelectedCity(cityId));
    setOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-20 border-b-2 shadow-md border-[#f3faf1] shadow-[#dbebd7]">
      <div className="w-full border-slate-200 border-solid bg-white py-4">
        <div className="container">
          <div className="grid-container grid grid-cols-12 gap-1 md:gap-3 lg:gap-7 items-center">
            {/* LOGO */}
            <div className="col-span-12 lg:col-span-3 xl:col-span-2 gap-4">
              <div className="logo text-center flex items-center justify-between px-4">
                {window.innerWidth > 1023 ? (
                  <img
                    src={logo}
                    alt="logo"
                    className="h-8 md:h-9 cursor-pointer"
                    onClick={() => navigate("/")}
                  />
                ) : (
                  // <span className="flex items-center">
                  //   <img
                  //     src={logo}
                  //     alt="logo"
                  //     className="h-8 md:h-9 cursor-pointer"
                  //     onClick={() => navigate("/")}
                  //   />
                  //   <RiArrowDropDownLine size={20} />
                  // </span>
                  <>
                    <ToggleOptions mobile={showMobile} setMobile={setShowMobile} />
                  </>
                )}
                <div className="flex items-center gap-3">
                  <div
                    ref={mobileRef}
                    className={`flex items-center gap-1 lg:hidden transition-all duration-300 h-6 bg-[#d4f0cc] lg:bg-white px-1 rounded-xl border-[1px] lg:border-none border-[#b0cca9] ${
                      showMobile ? "fade-in-15" : "fade-out-15"
                    }`}
                    onClick={() => {
                      if (window.innerWidth < 1023) {
                        setShowMobile(!showMobile);
                      }
                    }}
                  >
                    <MdCall
                      size={window.innerWidth < 768 ? 20 : 18}
                      className="text-green-700"
                    />
                    <span
                      className={`${
                        window.innerWidth > 1023 || showMobile
                          ? "block"
                          : "hidden"
                      } text-sm lg:text-[12px] font-[900] tracking-tighter `}
                    >
                      9987 878 878
                    </span>
                  </div>
                  <div className="cta flex lg:hidden items-center gap-2">
                    <>
                      {hasToken ? (
                        <div className="w-full flex items-center justify-center">
                          <div
                            className={`w-7 h-7 lg:w-8 lg:h-8 bg-gray-600 rounded-full cursor-pointer aspect-auto ${
                              pathName.pathname === "/profile"
                                ? "border-4 border-[#53a53fbe]"
                                : "border-[1px] border-gray-300"
                            }`}
                            style={{
                              backgroundImage: `url('${
                                userData?.profile_img !== undefined &&
                                userData?.profile_img?.length > 0
                                  ? userData?.profile_img.includes("blob")
                                    ? userData?.profile_img
                                    : `${APIEndPoints.BackendURL}/${userData?.profile_img}`
                                  : "/images/male.png"
                              }')`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                            onClick={() => {
                              dispatch(setTitle("My Booking"));
                              navigate("/profile");
                            }}
                          />
                        </div>
                      ) : (
                        <Button
                          variant={"default"}
                          className="w-21 text-sm h-6 lg:h-7 rounded-3xl bg-[#53a53f] text-gray-50 hover:bg-[#53a53fcb]"
                          onClick={() => {
                            navigate("/login");
                          }}
                        >
                          <LogIn className="mr-2 text-white" size={14} />
                          {isLarge && "Login"}
                        </Button>
                      )}
                    </>
                  </div>
                </div>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="col-span-4 sm:col-span-5 max-[290px]:col-span-4 hidden max-[350px]:col-span-5 lg:col-span-7 xl:col-span-8 gap-4 lg:flex lg:justify-start xl:justify-center 2xl:justify-end items-center custome-break sm:mr-2">
              {isLarge && (
                <div className="max-lg:hidden flex items-center justify-start gap-2">
                  <Link to={"/about"} target="_blank" rel="noreferrer noopener">
                    <Button
                      variant={"outline"}
                      className={`px-4 2xl:px-12 text-xs h-7 rounded-3xl ${
                        pathName.pathname === "/about"
                          ? "bg-[#53a53f] text-gray-50 hover:bg-[#53a53fcb] hover:text-white"
                          : ""
                      }`}
                    >
                      About Us
                    </Button>
                  </Link>

                  <Button
                    variant={"outline"}
                    className={`px-4 2xl:px-12 text-xs h-7 rounded-3xl ${
                      pathName.pathname === "/play"
                        ? "bg-[#53a53f] text-gray-50 hover:bg-[#53a53fcb] hover:text-white"
                        : ""
                    }`}
                    onClick={() => {
                      navigate("/play");
                    }}
                  >
                    Pay & Play
                  </Button>
                  <Button
                    variant={"outline"}
                    className={`px-4 2xl:px-12 text-xs h-7 rounded-3xl ${
                      pathName.pathname === "/academy"
                        ? "bg-[#53a53f] text-gray-50 hover:bg-[#53a53fcb] hover:text-white"
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
                        ? "bg-[#53a53f] text-gray-50 hover:bg-[#53a53fcb] hover:text-white"
                        : ""
                    }`}
                    onClick={() => {
                      navigate("/membership");
                    }}
                  >
                    Membership
                  </Button>

                  <Link
                    to={"/contact"}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <Button
                      variant={"outline"}
                      className={`px-4 2xl:px-12 text-xs h-7 rounded-3xl ${
                        pathName.pathname === "/contact"
                          ? "bg-[#53a53f] text-gray-50 hover:bg-[#53a53fcb] hover:text-white"
                          : ""
                      }`}
                    >
                      Contact
                    </Button>
                  </Link>
                </div>
              )}
              <div />
            </div>

            {/* LOCATION */}
            <div className="ml-3 lg:-ml-12 max-[290px]:col-span-6 max-[350px]:col-span-5 col-span-7 sm:col-span-7 lg:col-span-2 gap-4 flex items-center justify-start lg:justify-end max-[390px]:text-xs">
              <Dialog
                open={open}
                onOpenChange={() => {
                  if (selectedCity) {
                    setOpen(!open);
                  }
                }}
              >
                <DialogTrigger
                  asChild
                  className=""
                  onClick={() => setOpen(!open)}
                >
                  <Button
                    variant="outline"
                    className={`${
                      selectedCityName ? "w-36 lg:w-16 ml-3 lg:ml-0 border border-gray-300/50 text-[#53a53f]" : "w-32 "
                    } h-6 lg:h-7 rounded-3xl hover:bg-[#53a53f] hover:text-gray-100`}
                    onClick={() => setOpen(true)}
                  >
                    <span
                      className={`flex items-center justify-center text-[11px] md:text-[10px] font-base ${
                        selectedCityName && "tracking-wider lg:tracking-tight font-extrabold"
                      }`}
                    >
                      {selectedCityName ? (
                        selectedCityName
                      ) : (
                        <SlLocationPin size={15} className="text-[#53a53f]" />
                      )}
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[725px] h-[320px] z-[100]">
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
                          className="w-20 h-20 rounded-full flex items-center justify-center text-sm border-2 border-dashed border-gray-300 font-normal bg-[#469b30] text-white cursor-pointer"
                          onClick={() => handleCitySelect(item.id)}
                        >
                          {item.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <div className="cta hidden lg:flex items-center gap-2">
                <>
                  {hasToken ? (
                    <div className="w-full flex items-center justify-center">
                      <div
                        className={`w-8 h-8 bg-gray-600 rounded-full cursor-pointer aspect-auto ${
                          pathName.pathname === "/profile"
                            ? "border-4 border-[#53a53fbe]"
                            : "border-[1px] border-gray-300"
                        }`}
                        style={{
                          backgroundImage: `url('${
                            userData?.profile_img !== undefined &&
                            userData?.profile_img?.length > 0
                              ? userData?.profile_img.includes("blob")
                                ? userData?.profile_img
                                : `${APIEndPoints.BackendURL}/${userData?.profile_img}`
                              : "/images/male.png"
                          }')`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                        onClick={() => {
                          dispatch(setTitle("My Booking"));
                          navigate("/profile");
                        }}
                      />
                    </div>
                  ) : (
                    <Button
                      variant={"default"}
                      className="w-21 text-sm h-6 lg:h-7 rounded-3xl bg-[#53a53f] text-gray-50 hover:bg-[#53a53fcb]"
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      <LogIn className="mr-2 text-white" size={14} />
                      {isLarge && "Login"}
                    </Button>
                  )}
                </>
              </div>
              <span className="font-medium hidden lg:inline-flex text-[15px] items-end w-fit justify-start gap-2 tracking-tighter whitespace-nowrap mr-4">
                <MdCall size={20} className="text-[#53A53F]" />
                <span className="-mb-[3px] -ml-[3px]">9874 475 988</span>
              </span>
            </div>

            {/* THEME */}
            {/* <div className="col-span-2 sm:col-span-1 lg:hidden flex flex-row items-center justify-end  gap-4 custome-break mr-2 lg:mr-0">
              <div className="block lg:hidden">
                <ToggleOptions />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
