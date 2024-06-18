import { GiTicket } from "react-icons/gi";
import { MdKeyboardArrowRight } from "react-icons/md";
const Coupan = () => {
  return (
    <div className="flex flex-row items-center border rounded-lg bg-[#FFFFFF] p-4 gap-4">
       <GiTicket size={24}/>
       <div className="flex flex-col me-auto">
           <span className="inline-block text-[16px] text-[#000000] font-semibold">Apply Coupon</span>
           <span className="inline-block text-xs text-gray-400">Get Discount by Applying Coupon</span>
       </div>
       <MdKeyboardArrowRight size={20}/>
    </div>
  )
}

export default Coupan