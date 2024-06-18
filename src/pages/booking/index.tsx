import BookingDetail from "@/components/booking/booking-details";
import BookingSummary from "@/components/booking/booking-details/BookingSummary";
import CacelationPolicy from "@/components/booking/booking-details/CacelationPolicy";
import Coupan from "@/components/booking/booking-details/Coupan";
import SlotBooking from "@/components/booking/booking-slots";
import { useEffect, useState } from "react";

import { IoIosArrowDropleftCircle } from "react-icons/io";

const Booking = () => {
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
  const handleBook = () => {
    setIsHidden(false);
  };

  return (
    <div className="flex px-2 sm:px-40 pt-8 border-t-[1px] gap-4 pb-12 w-full">
      <div className="w-full sm:w-4/5">
        {isHidden ? (
          <SlotBooking handleBook={handleBook} />
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
            <BookingSummary />
            <CacelationPolicy />
          </div>
        )}
      </div>
      <div className="hidden sm:block w-1/5">
        <BookingDetail />
      </div>
    </div>
  );
};

export default Booking;
