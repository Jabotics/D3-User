import { useLocation, useNavigate } from "react-router-dom";
import logo from "/images/logo-blog.svg";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useRef, useState } from "react";
import { RootState } from "@/store";
import { MdCall } from "react-icons/md";
import { APIEndPoints } from "@/APIEndpoint";
import { setTitle } from "@/store/actions/slices/profileSlice";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { ToggleOptions } from "@/components/toggle-options";

const BlogNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const pathName = useLocation();

  const mobileRef = useRef<HTMLDivElement>(null);

  const [showMobile, setShowMobile] = useState(false);

  const { userData, hasToken } = useAppSelector(
    (state: RootState) => state.auth
  );
  const isLarge = window.innerWidth >= 1024;

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

  return (
    <div className="fixed top-0 left-0 w-full z-30 border-b-2 shadow-lg border-[#9bdd8a63] shadow-[#9bdd8a63]">
      <div className="w-full border-slate-200 border-solid bg-[#53A53F] py-4">
        <div className="px-4 lg:container">
          <div className="flex items-center justify-between w-full">
            {/* LOGO */}
            <div className="">
              <div className="logo text-center">
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
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div
                ref={mobileRef}
                className={`flex items-center gap-1 lg:hidden transition-all duration-300 h-6 bg-[#53A53F] lg:bg-white px-1 rounded-xl border-[1px] lg:border-none border-[#b0cca9] ${
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
                  className="text-[#9add8a]"
                />
                <span
                  className={`${
                    window.innerWidth > 1023 || showMobile ? "block" : "hidden"
                  } text-sm lg:text-[12px] font-[900] tracking-tighter text-white`}
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

              <div className="flex items-center gap-2">
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
                        className="w-21 text-sm h-6 lg:h-7 rounded-3xl bg-[#9add8a] text-gray-50 hover:bg-[#53a53fcb]"
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
                  <MdCall size={20} className="text-[#9add8a]" />
                  <span className="-mb-[3px] -ml-[3px] text-white">9874-475-988</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogNavbar;
