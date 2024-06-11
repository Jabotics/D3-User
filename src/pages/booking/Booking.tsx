import BookingDetail from '@/components/booking/booking-details'
import BookingSummary from '@/components/booking/booking-details/BookingSummary';
import CacelationPolicy from '@/components/booking/booking-details/CacelationPolicy';
import Coupan from '@/components/booking/booking-details/Coupan';
import SlotBooking from '@/components/booking/booking-slots'
import { useEffect, useState } from 'react'


const Booking = () => {
    const [isHidden,setIsHidden] = useState(true);
    const handleResize = () => {
        if (window.innerWidth > 640) {
          setIsHidden(true);
        } 
      };
    
      useEffect(() => {
        handleResize(); // Check the screen size on initial render
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);
    const handleBook = ()=>{
        setIsHidden(false)
    }
   
  return (
    <div className='flex flex-row gap-8 bg-[#F3F4F5] min-h-screen p-4 sm:px-8 sm:py-16 justify-center'>
    {isHidden?<SlotBooking handleBook={handleBook}/>:<div className="self-center sm:hidden flex flex-col gap-4 w-[90%] xs:w-[80%] p-0  ">
          <Coupan/>
          <BookingSummary/>
          <CacelationPolicy/>
       </div>}
    <BookingDetail/>
  </div>
  )
}

export default Booking