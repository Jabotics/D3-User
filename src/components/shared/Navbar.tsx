import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

import logo from "/images/Logo.svg";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SlLocationPin } from "react-icons/sl";
import { MdCall } from "react-icons/md";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { FaMouse } from "react-icons/fa";
import { MdContactSupport, MdOutlineReviews } from "react-icons/md";
import { RiNewspaperLine } from "react-icons/ri";
// import { IoIosArrowForward } from "react-icons/io";

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
import React, { useEffect, useRef, useState } from "react";
import { setTitle } from "@/store/actions/slices/profileSlice";
// import { APIEndPoints } from "@/APIEndpoint";

import { FaRegBuilding } from "react-icons/fa";
import { ToggleOptions } from "../toggle-options";
import {
  setParams,
  setSelectedSportsStore,
} from "@/store/actions/slices/groundSlice";
import {
  setSelectedSports,
  useGetSportQuery,
} from "@/store/actions/slices/sportSlice";

import { FaRegUser } from "react-icons/fa";

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const pathName = useLocation();

  useGetSportQuery({});
  const mobileRef = useRef<HTMLDivElement>(null);

  const isLarge = window.innerWidth >= 1024;
  // const isSix20 = window.innerWidth >= 620;

  const [showMobile, setShowMobile] = useState(false);
  const { userData, hasToken } = useAppSelector(
    (state: RootState) => state.auth
  );
  const { selectedSportsStore } = useAppSelector(
    (state: RootState) => state.ground
  );
  const [search, setSearch] = useState<string>("");
  const { sports } = useAppSelector((state: RootState) => state.sport);
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

  const handleClickSport = (item: { id: string; name: string }) => {
    dispatch(
      setSelectedSports({
        sportId: item.id,
      })
    );
    const updatedIds = selectedSportsStore.includes(item.id)
      ? selectedSportsStore.filter((id) => id !== item.id)
      : [...selectedSportsStore, item.id];

    dispatch(
      setParams({
        key: "supported_sports",
        data: updatedIds,
      })
    );
    dispatch(setSelectedSportsStore(item.id));

    navigate("/play");
  };

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
    <div className="fixed top-0 left-0 w-full z-30 border-b-2 shadow-md border-[#f3faf1] shadow-[#dbebd7]">
      <div className="w-full border-slate-200 border-solid bg-white py-4">
        <div className="container">
          <div className="grid-container grid grid-cols-12 gap-1 md:gap-3 lg:gap-7 items-center">
            {/* LOGO */}
            <div className="col-span-12 lg:col-span-3 xl:col-span-2 gap-4">
              <div
                className="logo text-center flex items-center justify-between px-4"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              >
                {window.innerWidth > 1023 ? (
                  <img
                    src={logo}
                    alt="logo"
                    className="h-8 md:h-9 cursor-pointer"
                    onClick={() => navigate("/")}
                  />
                ) : (
                  <>
                    <ToggleOptions
                      mobile={showMobile}
                      setMobile={setShowMobile}
                    />
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
                        <div
                          className="w-full flex items-center justify-center"
                          onClick={() => {
                            dispatch(setTitle("My Booking"));
                            navigate("/profile");
                          }}
                        >
                          {userData?.profile_img !== undefined &&
                          userData?.profile_img?.length > 0 ? (
                            <div
                              className={`w-8 h-8 bg-gray-600 rounded-full cursor-pointer aspect-auto ${
                                pathName.pathname === "/profile"
                                  ? "border-4 border-[#53a53fbe]"
                                  : "border-[1px] border-gray-300"
                              }`}
                              style={{
                                backgroundImage: `url('${userData?.profile_img}')`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }}
                            ></div>
                          ) : (
                            <div
                              className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer aspect-auto ${
                                pathName.pathname === "/profile"
                                  ? "border-2 border-[#53a53fbe]"
                                  : "border-[1px] border-gray-300"
                              } text-[#53a53f]`}
                            >
                              <FaRegUser size={20} />
                            </div>
                          )}
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
            <div
              className={`col-span-4 sm:col-span-5 max-[290px]:col-span-4 hidden max-[350px]:col-span-5 lg:col-span-7 xl:col-span-8 gap-4 lg:flex lg:justify-start xl:justify-center items-center custome-break sm:mr-2`}
            >
              {isLarge && (
                <div className="max-lg:hidden flex items-center justify-start gap-2">
                  <div className="group relative">
                    <Button
                      variant="outline"
                      className={`px-4 2xl:px-12 h-7 border rounded-3xl ${
                        pathName.pathname === "/play"
                          ? "bg-[#53a53f] text-gray-50 hover:bg-[#53a53fcb] hover:text-white"
                          : "text-gray-500 hover:text-gray-900 hover:font-bold"
                      }`}
                      onClick={() => {
                        navigate("/play");
                      }}
                    >
                      <p className="outfit">Pay & Play</p>
                    </Button>

                    {pathName.pathname !== "/play" && (
                      <div className="relative group">
                        <div className="absolute left-0 w-[100%] top-[65%] pt-3 hidden transform translate-y-2 transition-all duration-300 ease-out group-hover:block group-hover:translate-y-0 group-hover:delay-300">
                          <div className="w-full flex flex-col gap-5 bg-white shadow-sm shadow-gray-200 rounded-md p-3">
                            <div className="relative w-full h-fit booked-slot flex flex-col gap-3 items-start py-1">
                              {sports.length > 0 ? (
                                sports.map((item, index) => (
                                  <React.Fragment key={index}>
                                    <div
                                      className="text-[#53a53f] group pl-5 flex items-center w-full cursor-pointer"
                                      onClick={() => {
                                        handleClickSport(item);
                                      }}
                                    >
                                      <span className="no-underline group-hover:underline group-hover:-translate-x-2 transition-transform duration-300">
                                        {item.name}
                                      </span>
                                      {/* <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <IoIosArrowForward />
                                      </span> */}
                                    </div>
                                  </React.Fragment>
                                ))
                              ) : (
                                <p>No Sports Available</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <Button
                    variant={"outline"}
                    className={`px-4 2xl:px-12 h-7 rounded-3xl ${
                      pathName.pathname === "/academy"
                        ? "bg-[#53a53f] text-gray-50 hover:bg-[#53a53fcb] hover:text-white"
                        : "text-gray-500 hover:text-gray-900 hover:font-bold"
                    } outfit`}
                    onClick={() => {
                      navigate("/academy");
                    }}
                  >
                    Academy
                  </Button>
                  <Button
                    variant={"outline"}
                    className={`px-4 2xl:px-12 h-7 rounded-3xl ${
                      pathName.pathname === "/membership"
                        ? "bg-[#53a53f] text-gray-50 hover:bg-[#53a53fcb] hover:text-white"
                        : "text-gray-500 hover:text-gray-900 hover:font-bold"
                    } outfit`}
                    onClick={() => {
                      navigate("/membership");
                    }}
                  >
                    Membership
                  </Button>

                  <div className="group relative">
                    <Button
                      variant="outline"
                      className="px-4 2xl:px-12 text-xs h-7 rounded-3xl"
                    >
                      <p className="outfit text-gray-500 group-hover:text-gray-900 group-hover:font-bold tracking-wide">
                        More
                      </p>
                      <IoIosArrowDropdownCircle
                        size={15}
                        className="ml-1 text-gray-300 transition-transform duration-300 group-hover:text-gray-900 group-hover:rotate-180 transform origin-center"
                      />
                    </Button>

                    <div className="relative group">
                      <div className="absolute left-0 w-[200%] top-[65%] pt-3 transition-all duration-500 ease-out hidden translate-y-2 group-hover:block group-hover:translate-y-0 group-hover:delay-300">
                        <div className="w-full flex flex-col gap-1 bg-white rounded-md py-5 px-5">
                          <Link
                            to="/about"
                            target="_blank"
                            rel="noreferrer noopener"
                            className="px-3 text-[#53a53f] py-1 hover:bg-[#ebffe5] font-medium flex flex-row items-center gap-2"
                          >
                            <FaRegBuilding size={15} className="w-5" />
                            <span>About Us</span>
                          </Link>
                          <Link
                            to="/terms-of-use"
                            target="_blank"
                            rel="noreferrer noopener"
                            className="px-3 text-[#53a53f] py-1 hover:bg-[#ebffe5] font-medium flex flex-row items-center gap-2"
                          >
                            <FaMouse size={15} className="w-5" />
                            <span>Terms Of Use</span>
                          </Link>
                          <Link
                            to="/contact"
                            target="_blank"
                            rel="noreferrer noopener"
                            className="px-3 text-[#53a53f] py-1 hover:bg-[#ebffe5] font-medium flex flex-row items-center gap-2"
                          >
                            <MdContactSupport size={20} className="w-5" />
                            <span>Contact</span>
                          </Link>
                          <div className="h-[1px] bg-gray-200 my-1"></div>
                          <Link
                            to="/blogs"
                            target="_blank"
                            rel="noreferrer noopener"
                            className="px-3 text-[#53a53f] py-1 hover:bg-[#ebffe5] font-medium flex flex-row items-center gap-2"
                          >
                            <RiNewspaperLine size={20} className="w-5" />
                            Blogs
                          </Link>
                          <Link
                            to="/contact/customer-review"
                            target="_blank"
                            rel="noreferrer noopener"
                            className="px-3 text-[#53a53f] py-1 hover:bg-[#ebffe5] font-medium flex flex-row items-center gap-2"
                          >
                            <MdOutlineReviews size={20} className="w-5" />
                            Give Review
                          </Link>
                          <div className="h-[1px] bg-gray-200 my-1"></div>
                          <Link
                            to="/privacy-policy"
                            target="_blank"
                            rel="noreferrer noopener"
                            className="px-3 text-[#53a53f] py-1 hover:bg-[#ebffe5] font-medium flex flex-col"
                          >
                            <p>Privacy policy</p>
                            <p className="text-xs text-[#53a53fd8]">
                              Read about our privacy notice
                            </p>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
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
                      selectedCityName
                        ? "w-36 lg:w-16 ml-3 lg:ml-0 border border-gray-300/50 text-[#53a53f]"
                        : "w-32 "
                    } h-6 lg:h-7 rounded-3xl hover:bg-[#53a53f] hover:text-gray-100`}
                    onClick={() => setOpen(true)}
                  >
                    <span
                      className={`flex items-center justify-center text-[11px] md:text-[10px] font-base ${
                        selectedCityName &&
                        "tracking-wider lg:tracking-normal font-extrabold josephine"
                      }`}
                    >
                      {selectedCityName ? (
                        selectedCityName
                      ) : (
                        <SlLocationPin
                          size={15}
                          className="text-[#53a53f] hover:text-gray-100"
                        />
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
                    <div
                      className="w-full flex items-center justify-center"
                      onClick={() => {
                        dispatch(setTitle("My Booking"));
                        navigate("/profile");
                      }}
                    >
                      {userData?.profile_img !== undefined &&
                      userData?.profile_img?.length > 0 ? (
                        <div
                          className={`w-8 h-8 bg-gray-600 rounded-full cursor-pointer aspect-auto ${
                            pathName.pathname === "/profile"
                              ? "border-4 border-[#53a53fbe]"
                              : "border-[1px] border-gray-300"
                          }`}
                          style={{
                            backgroundImage: `url('${userData?.profile_img}')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        ></div>
                      ) : (
                        <div
                          className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer aspect-auto ${
                            pathName.pathname === "/profile"
                              ? "border-2 border-[#53a53fbe]"
                              : "border-[1px] border-gray-300"
                          } text-[#53a53f]`}
                        >
                          <FaRegUser size={20} />
                        </div>
                      )}
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
                <span className="-mb-[3px] -ml-[3px]">9874-475-988</span>
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
