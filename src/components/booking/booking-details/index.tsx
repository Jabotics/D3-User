import BookingSummary from "./BookingSummary"
import CacelationPolicy from "./CacelationPolicy"
import Coupan from "./Coupan"

const BookingDetail=()=>{
    return (
        <div className="hidden sm:flex flex-col gap-4 sm:w-[35%] md:w-[30%] lg:w-[20%]  p-0  ">
          <Coupan/>
          <BookingSummary/>
          <CacelationPolicy/>
       </div>
    )
   }
   
   export default BookingDetail