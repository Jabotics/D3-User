import BookingSummary from "./BookingSummary";
import CacelationPolicy from "./CacelationPolicy";
import Coupan from "./Coupan";

const BookingDetail = () => {

  return (
    <div className="w-0 sm:w-full flex flex-col gap-3">
      <BookingSummary />
      <Coupan />
      <CacelationPolicy />
    </div>
  );
};

export default BookingDetail;
