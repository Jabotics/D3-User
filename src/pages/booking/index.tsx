import BookingDetail from "@/components/booking/booking-details";
import BookingSummary from "@/components/booking/booking-details/BookingSummary";
import CacelationPolicy from "@/components/booking/booking-details/CacelationPolicy";
import Coupan from "@/components/booking/booking-details/Coupan";
import SlotBooking from "@/components/booking/booking-slots";
import { useEffect, useState } from "react";

const Booking = () => {
  const [isHidden, setIsHidden] = useState(true);
  const handleResize = () => {
    if (window.innerWidth > 640) {
      setIsHidden(true);
    }
  };

  useEffect(() => {
    handleResize(); // Check the screen size on initial render
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleBook = () => {
    setIsHidden(false);
  };

  return (
    <div className="flex px-40 pt-8 border-t-[1px] gap-4 pb-12">
      {isHidden ? (
        <SlotBooking handleBook={handleBook} />
      ) : (
        <div className="">
          <Coupan />
          <BookingSummary />
          <CacelationPolicy />
        </div>
      )}
      <BookingDetail />
    </div>
  );
};

export default Booking;
