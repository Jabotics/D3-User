import AcademyCheckoutDetails from "@/components/academy/academy-checkout-details";
import AcademyCheckoutSummary from "@/components/academy/academy-checkout-summary";
import CacelationPolicy from "@/components/booking/booking-details/CacelationPolicy";
import Coupan from "@/components/booking/booking-details/Coupan";
import { Button } from "@/components/ui/button";
import { RootState } from "@/store";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { IoIosArrowDropleftCircle } from "react-icons/io";

const AcademyCheckout = () => {
  const { registrationFormDetails } = useAppSelector(
    (state: RootState) => state.academy
  );

  const [isHidden, setIsHidden] = useState(true);
  const handleResize = () => {
    if (window.innerWidth > 640) {
      setIsHidden(true);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // const handleBook = () => {
  //   setIsHidden(false);
  // };
  return (
    <div className="flex px-2 sm:px-40 pt-8 border-t-[1px] gap-4 pb-12 w-full h-screen">
      <div className="w-full sm:w-4/5">
        {isHidden ? (
          <div className="flex flex-col gap-3 sm:-ml-10 h-[90%]">
            <div className="flex flex-col gap-4 w-full h-16 sm:h-24 mt-10 sm:mt-0 border rounded-lg bg-[#FFFFFF]">
              <img
                src="/images/check.jpeg"
                alt=""
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="flex-1">
              <AcademyCheckoutDetails
                registrationFormDetails={registrationFormDetails}
              />
            </div>

            <div className="flex flex-col gap-4 w-full border rounded-lg bg-[#FFFFFF]">
              <div className="flex flex-row justify-center items-center self-center mt-auto w-full px-2 ">
                <p className="p-0 m-0 text-[#53a53f9d] text-[10px] ">
                  Offer 10% additional discount for 3 hours booking on weekdays
                  only
                </p>
              </div>
            </div>

            <Button
              className="sm:hidden w-[90%] self-center bg-[#53A53F] h-7 text-[16px] mt-5 -mb-8 font-bold"
              onClick={() => {}}
            >
              Next
            </Button>
            <div className="sm:hidden h-1"></div>
          </div>
        ) : (
          <div className="mt-10 flex flex-col gap-4">
            <div
              className="flex gap-2 items-center text-xs"
              onClick={() => {
                setIsHidden(true);
              }}
            >
              <IoIosArrowDropleftCircle size={20} />
              <span className="text-gray-600 mt-[4px]">Go Back</span>
            </div>
            <Coupan />
            <AcademyCheckoutSummary />
            <CacelationPolicy />
          </div>
        )}
      </div>
      <div className="hidden sm:block w-1/5">
        <div className="w-0 sm:w-full flex flex-col gap-3">
          <Coupan />
          <AcademyCheckoutSummary />
          <CacelationPolicy />
        </div>
      </div>
    </div>
  );
};

export default AcademyCheckout;
