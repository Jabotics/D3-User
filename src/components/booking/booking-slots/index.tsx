import { Button } from "@/components/ui/button"
import SelectBookingDate from "./SelectBookingDate"
import SelectSport from "./SelectSport"
import SlotsDetail from "./SlotsDetail"


const SlotBooking=({handleBook}:{handleBook:() => void})=>{
  
    const handleClick = ()=>{
        handleBook()
    }
   
 return (
    <div className="flex flex-col gap-4 w-[100%] sm:w-[60%] border rounded-lg bg-[#FFFFFF] pb-8 ">
       <SelectBookingDate/>
       <SlotsDetail/>
       <SelectSport/>
       <div className="flex flex-row justify-center items-center self-center mt-auto w-[90%] lg:w-[70%] xl:w-[60%] bg-[#B2E8A5] p-2 border-[#53A53F] rounded-md">
          <p className="p-0 m-0 text-[#53A53F] text-[12px] ">Offer 10% additional discount for 3 hours booking on weekdays only</p>
       </div>
       <Button className="sm:hidden w-[90%] self-center bg-[#53A53F] text-[16px] font-bold" onClick={handleClick}>Next</Button> 
    </div>
    
 )
}

export default SlotBooking