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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

import { FaRegBuilding } from "react-icons/fa";
import { ToggleOptions } from "../toggle-options";
import { setParams, setSelectedSportsStore } from "@/store/actions/slices/groundSlice";
import { setSelectedSports } from "@/store/actions/slices/sportSlice";

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const pathName = useLocation();

  const mobileRef = useRef<HTMLDivElement>(null);

  const isLarge = window.innerWidth >= 1024;
  // const isSix20 = window.innerWidth >= 620;

  const [showMobile, setShowMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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
  // const [open, setOpen] = useState(false);

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

  // ${pathName.pathname.split('/')[1] === '/blogs' && 'hidden max-[350px]:col-span-5 lg:col-span-7 xl:col-span-8'}
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
                    behavior: 'smooth'
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
                    <ToggleOptions
                      mobile={showMobile}
                      setMobile={setShowMobile}
                    />
                  </>
                )}
                <div className="flex items-center gap-3">
                  <div
                    ref={mobileRef}
                    className={`flex items-center gap-1 lg:hidden transition-all duration-300 h-6 bg-[#d4f0cc] lg:bg-white px-1 rounded-xl border-[1px] lg:border-none border-[#b0cca9] ${showMobile ? "fade-in-15" : "fade-out-15"
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
                      className={`${window.innerWidth > 1023 || showMobile
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
                            className={`w-7 h-7 lg:w-8 lg:h-8 bg-gray-600 rounded-full cursor-pointer aspect-auto ${pathName.pathname === "/profile"
                              ? "border-4 border-[#53a53fbe]"
                              : "border-[1px] border-gray-300"
                              }`}
                            style={{
                              backgroundImage: `url('${userData?.profile_img !== undefined &&
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
            <div
              className={`col-span-4 sm:col-span-5 max-[290px]:col-span-4 hidden max-[350px]:col-span-5 lg:col-span-7 xl:col-span-8 gap-4 lg:flex lg:justify-start xl:justify-center items-center custome-break sm:mr-2`}
            >
              {isLarge && (
                <div className="max-lg:hidden flex items-center justify-start gap-2">
                  {/* <Link to={"/about"} target="_blank" rel="noreferrer noopener">
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
                  </Link> */}

                  {/* <Button
                    variant={"outline"}
                    className={`px-4 2xl:px-12 text-xs h-7 rounded-3xl ${pathName.pathname === "/play"
                      ? "bg-[#53a53f] text-gray-50 hover:bg-[#53a53fcb] hover:text-white"
                      : ""
                      }`}
                    onClick={() => {
                      navigate("/play");
                    }}
                  >
                    Pay & Play
                  </Button> */}
                  <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                    <div
                      className="relative"
                      onMouseEnter={() => setIsOpen(true)}
                      onMouseLeave={() => setIsOpen(false)}
                      onClick={() => {
                        navigate("/play");
                      }}
                    >
                      <DropdownMenuTrigger
                        className={`px-4 2xl:px-12 text-xs h-7 border rounded-3xl ${pathName.pathname === "/play"
                          ? "bg-[#53a53f] text-gray-50 hover:bg-[#53a53fcb] hover:text-white"
                          : ""
                          }`}
                      >
                        <span>Pay & Play</span>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="mt-2">
                        {sports.length > 0 ?
                          sports?.map(
                            (
                              item: {
                                id: string;
                                name: string;
                              }
                            ) => {
                              return (
                                <DropdownMenuItem onClick={() => {
                                  dispatch(setSelectedSports({ sportId: item.id }))
                                  const updatedIds = selectedSportsStore.includes(item.id)
                                    ? selectedSportsStore.filter((id) => id !== item.id)
                                    : [...selectedSportsStore, item.id];

                                  dispatch(setParams({ key: "supported_sports", data: updatedIds }))
                                  dispatch(setSelectedSportsStore(item.id))
                                }}>
                                  <span>{item.name}</span>
                                </DropdownMenuItem>
                              );
                            }
                          ) : <DropdownMenuItem>No Sports Available</DropdownMenuItem>}
                      </DropdownMenuContent>
                    </div>
                  </DropdownMenu>

                  <Button
                    variant={"outline"}
                    className={`px-4 2xl:px-12 text-xs h-7 rounded-3xl ${pathName.pathname === "/academy"
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
                    className={`px-4 2xl:px-12 text-xs h-7 rounded-3xl ${pathName.pathname === "/membership"
                      ? "bg-[#53a53f] text-gray-50 hover:bg-[#53a53fcb] hover:text-white"
                      : ""
                      }`}
                    onClick={() => {
                      navigate("/membership");
                    }}
                  >
                    Membership
                  </Button>

                  {/* <div className="group relative">
                    <Button
                      variant={"outline"}
                      className={`px-4 2xl:px-12 text-xs h-7 rounded-3xl`}
                    >
                      <p>More</p>
                      <FaSortDown
                        size={15}
                        className="ml-1 mb-2 text-gray-300 group-hover:text-gray-900 group-hover:rotate-180"
                      />
                    </Button>

                    <div className="invisible absolute w-[200%] -bottom-24 left-0 h-fit bg-white border border-gray-300 rounded-md group-hover:flex flex-col py-2">
                      <Link
                        to={"/about"}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="mx-1 text-sm"
                      >
                        About Us
                      </Link>
                      <Link
                        to={"/contact"}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="mx-1 text-sm"
                      >
                        Contact
                      </Link>
                      <div className="h-px mx-1 bg-gray-300 my-1"></div>
                      <Link
                        to={"/contact"}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="mx-1 text-sm"
                      >
                        Blogs
                      </Link>
                      
                    </div>
                  </div> */}

                  <div className="group relative">
                    <Button
                      variant="outline"
                      className="px-4 2xl:px-12 text-xs h-7 rounded-3xl"
                    >
                      <p>More</p>
                      <IoIosArrowDropdownCircle
                        size={15}
                        className="ml-1 text-gray-300 group-hover:text-gray-900 transition-transform duration-300 group-hover:rotate-180 group-hover:mb-0 transform origin-center"
                      />
                    </Button>

                    <div className="relative group">
                      <div className="absolute left-0 w-[200%] hidden group-hover:block top-[65%] pt-3">
                        <div className="w-full flex flex-col gap-1 bg-white border border-gray-300 rounded-md py-5 transition-transform transform opacity-0 group-hover:opacity-100 translate-y-0 group-hover:translate-y-2 duration-1000 ease-out">
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
                            to="/about"
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
                            className="px-3 text-[#53a53f] py-1 hover:bg-[#ebffe5] font-medium flex flex-col "
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
                    className={`${selectedCityName
                      ? "w-36 lg:w-16 ml-3 lg:ml-0 border border-gray-300/50 text-[#53a53f]"
                      : "w-32 "
                      } h-6 lg:h-7 rounded-3xl hover:bg-[#53a53f] hover:text-gray-100`}
                    onClick={() => setOpen(true)}
                  >
                    <span
                      className={`flex items-center justify-center text-[11px] md:text-[10px] font-base ${selectedCityName &&
                        "tracking-wider lg:tracking-tight font-extrabold"
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
                    <div className="w-full flex items-center justify-center">
                      <div
                        className={`w-8 h-8 bg-gray-600 rounded-full cursor-pointer aspect-auto ${pathName.pathname === "/profile"
                          ? "border-4 border-[#53a53fbe]"
                          : "border-[1px] border-gray-300"
                          }`}
                        style={{
                          backgroundImage: `url('${userData?.profile_img !== undefined &&
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
